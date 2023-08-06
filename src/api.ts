import EventEmitter from "events";
import TypedEmitter from "typed-emitter";
import {C2SPacket, S2CPacket, BasePacket, ResponseID, BaseC2SPacket, BaseInternalC2SPacket} from "./packets/packets";
import io from "socket.io-client";
import {User} from "./model/User";
import {PacketGameData, PacketMapVillage, PacketPremiumItem} from "./packets/packets-types";
import {randomUUID, UUID} from "crypto";


export type ClientEvents = {
    onPacketReceived: (packet: S2CPacket, responseId?: number | UUID) => void
    onPacketSent: (packet: C2SPacket) => void
    ready: () => void
}

export interface Credentials {
    login: string
    password: string
    characterId: number
    worldId: string
}


export class TribalWarsClient extends (EventEmitter as new () => TypedEmitter<ClientEvents>) {
    public readonly socket: SocketIOClient.Socket;

    private packetCounter = 1;

    private tokenEmit: string | undefined;

    // User
    private _user: User | null = null;

    // GameData
    private _gameData: Readonly<PacketGameData> | null = null;

    // Inventory
    private _inventory: Readonly<PacketPremiumItem>[] | null = null;

    private establishedConnection = false;

    constructor() {
        super();

        this.setMaxListeners(100_000);

        // Create socket
        this.socket = io("wss://pl.tribalwars2.com", {
            query: {
                platform: "desktop"
            },
            secure: true,
            transports: ["websocket", "polling", "polling-jsonp", "polling-xhr"]
        });
    }

    public connect(credentials: Credentials) {
        this.socket.on("connect", () => {
            console.log("Connected");
        });

        this.socket.on("connect_error", (...args: any) => {
            console.log("connect_error");
            console.log(args);
        });

        this.socket.on("connect_timeout", (...args: any) => {
            console.log("connect_timeout");
            console.log(args);
        });

        this.socket.on("error", (...args: any) => {
            console.log("error");
            console.log(args);
        });

        this.socket.on("reconnect_error", (...args: any) => {
            console.log("reconnect_error");
            console.log(args);
        });

        this.socket.on("reconnect_failed", (...args: any) => {
            console.log("reconnect_failed");
            console.log(args);
        });

        this.socket.on("reconnecting", (...args: any) => {
            this.establishedConnection = false;
            console.log("reconnecting");
        });

        // Reconnect logic
        this.socket.on("reconnect", async () => {
            //console.log("reconnect")
            await this.reconnect(credentials);
        });

        // Second layer of reconnecting
        this.socket.on("disconnect", async (reason: string) => {
            this.establishedConnection = false;
            // Server disconnects us
            if (reason === "io server disconnect") {
                this.socket.connect();
                await this.reconnect(credentials);
            }
        });

        let firstWelcome = true
        // Packet receiver
        this.socket.on("msg", async (packet: S2CPacket) => {
            this.emit("onPacketReceived", packet, packet.id);

            if (firstWelcome && packet.type === "System/welcome") {
                // Login to account
                await this.login(credentials);

                // Fetches data
                await this.syncData();

                this.establishedConnection = true;

                this.emit("ready");

                firstWelcome = false;
            } else if (packet.type === "GameGuard/secretTokenRefresh") {
                // Refresh tokenEmit
                this.tokenEmit = packet.data.secret_token;
            }
        });
    }

    private async login(credentials: Credentials) {
        console.log("Logging in...")
        let loginResponse = await this.sendPacket({
            type: "Authentication/login",
            data: {
                name: credentials.login,
                pass: credentials.password
            }
        });

        if (loginResponse.type === "Login/success") {
            this._user = new User(loginResponse);
            console.log("Logged in!");
        } else {
            throw new Error("Unexpected packet while logging in. "+loginResponse.type, {
                cause: loginResponse
            });
        }

        // Select character
        let selectCharacterResponse = await this.sendPacket({
            type: "Authentication/selectCharacter",
            data: {
                id: credentials.characterId,
                world_id: credentials.worldId
            }
        });

        if (selectCharacterResponse.type === "Authentication/characterSelected") {
            this.tokenEmit = selectCharacterResponse.data.tokenEmit;
        } else {
            throw new Error("Unexpected packet while selecting character. "+selectCharacterResponse.type, {
                cause: selectCharacterResponse
            });
        }
    }

    private async reconnect(credentials: Credentials) {
        if (this.user === null) {
            return;
        }

        let authResponse = await this.sendPacket({
            type: "Authentication/reconnect",
            data: {
                character: credentials.characterId,
                name: credentials.login,
                world: credentials.worldId,
                token: this.user.token
            }
        });

        if (authResponse.type !== "Authentication/reconnected") {
            throw new Error("Unexpected packet while reconnecting. " + authResponse.type, {
                cause: authResponse
            });
        }

        this.establishedConnection = true;
        console.log("TribalWarsClient reconnected!");
    }

    private async syncData() {
        // Game data
        let gameDataResponse = await this.sendPacket({
            type: "GameDataBatch/getGameData"
        });

        if (gameDataResponse.type === "GameDataBatch/gameData") {
            this._gameData = gameDataResponse.data;
        } else {
            throw new Error("Unexpected packet while fetching game data. "+gameDataResponse.type, {
                cause: gameDataResponse
            });
        }

        // Inventory
        let inventoryResponse = await this.sendPacket({
            type: "Premium/listItems"
        });

        if (inventoryResponse.type === "Premium/items") {
            this._inventory = inventoryResponse.data.inventory;
        } else {
            throw new Error("Unexpected packet while fetching player's inventory. "+inventoryResponse.type, {
                cause: inventoryResponse
            });
        }
    }

    public sendPacket(packet: C2SPacket, timeout=20000): Promise<S2CPacket> {
        let currentResponseId: ResponseID = `${this.packetCounter++}-${randomUUID()}`;

        // Set some internal values
        {
            let basePacket = packet as BaseInternalC2SPacket;
            basePacket.id = currentResponseId

            if (this.tokenEmit) {
                if (basePacket.data) {
                    basePacket.data.tokenEmit = this.tokenEmit;
                } else {
                    basePacket.data = {
                        tokenEmit: this.tokenEmit
                    }
                }

            }
        }

        this.emit("onPacketSent", packet);

        this.socket.emit("msg", packet);

        // Return promise with received response packet
        return new Promise<S2CPacket>((resolve, reject) => {
            let timeoutCallback: NodeJS.Timeout | undefined;

            if (timeout !== -1) {
                timeoutCallback = setTimeout(() => {
                    this.removeListener("onPacketReceived", listener);
                    reject(Error(`Packet ${packet.type} timed out`));
                }, timeout);
            }

            let listener: ClientEvents["onPacketReceived"] = (packet, responseId) => {
                if (currentResponseId === responseId) {
                    resolve(packet);

                    if (timeoutCallback) {
                        clearTimeout(timeoutCallback);
                    }
                    this.removeListener("onPacketReceived", listener);
                }
            }

            this.on("onPacketReceived", listener);
        });
    }

    public async getVillagesByArea(startX: number, startY: number, widthUnits: number, heightUnits: number): Promise<PacketMapVillage[]> {
        let promises = []

        for (let xUnits = 0; xUnits < widthUnits; xUnits++) {
            for (let yUnits = 0; yUnits < heightUnits; yUnits++) {
                promises.push(this.sendPacket({
                    type: "Map/getVillagesByArea",
                    data: {
                        x: startX + xUnits * 50,
                        y: startY + yUnits * 50,
                        width: 50,
                        height: 50
                    }
                }).then(response => {
                    if (response.type !== "Map/villageData") {
                        throw new Error("Unexpected packet while fetching map villages. "+response.type, {
                            cause: response
                        });
                    }

                    return response.data.villages;
                }));
            }
        }

        let results = await Promise.all(promises);

        let villages: PacketMapVillage[] = [];
        for (let result of results) {
            villages.push(...result);
        }

        return villages;
    }

    get user(): User | null {
        return this._user;
    }

    get gameData(): Readonly<PacketGameData> | null {
        return this._gameData;
    }


    get inventory(): Readonly<PacketPremiumItem>[] | null {
        return this._inventory;
    }

    public isConnected() {
        return this.socket.connected && this.establishedConnection;
    }
}