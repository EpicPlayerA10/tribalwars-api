import EventEmitter from "events";
import TypedEmitter from "typed-emitter";
import {C2SPacket, S2CPacket, ResponseID, BaseInternalC2SPacket} from "./packets/packets";
import io from "socket.io-client";
import {User} from "./model/User";
import {randomUUID, UUID} from "crypto";
import {GameDataS2CPacket, MapVillageDataS2CPacket, PremiumItemsS2CPacket} from "./packets/s2c";
import axios from "axios";


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

type SendPacketReturnType<T extends boolean> = T extends true ? Promise<S2CPacket> : void;


export class TribalWarsClient extends (EventEmitter as new () => TypedEmitter<ClientEvents>) {
    public readonly socket: SocketIOClient.Socket;

    private _lang: Record<string, any> | undefined;

    private packetCounter = 1;
    private tokenEmit: string | undefined;
    private credentials: Credentials | undefined;

    // User
    private _user: User | null = null;

    // GameData
    private _gameData: Readonly<GameDataS2CPacket["data"]> | null = null;

    // Inventory
    private _inventory: Readonly<PremiumItemsS2CPacket["data"]["inventory"]> | null = null;

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
            transports: ["websocket"],
            autoConnect: false
        });
    }

    public async connect(credentials: Credentials) {
        this.credentials = credentials;

        let response = await axios.get("https://twxpl.innogamescdn.com/lang/pl_pl_33d6b6b2de.json");
        this._lang = response.data;

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

        this.socket.on("reconnecting", () => {
            this.establishedConnection = false;
            console.log("Lost connection. Reconnecting...");
        });

        // Reconnect logic
        this.socket.on("reconnect", async () => {
            await this.onReconnect();
        });

        // Second layer of reconnecting
        this.socket.on("disconnect", async (reason: string) => {
            this.establishedConnection = false;
            // Server disconnected us
            if (reason === "io server disconnect") {
                console.log("Got disconnected by the server. Reconnecting...");
                await this.reconnect();
            }
        });

        let firstWelcome = true
        // Packet receiver
        this.socket.on("msg", async (packet: S2CPacket) => {
            this.emit("onPacketReceived", packet, packet.id);

            if (firstWelcome && packet.type === "System/welcome") {
                try {
                    // Login to account
                    await this.login();

                    // Fetches data
                    await this.syncData();
                } catch (e) {
                    console.error(e);
                    await this.reconnect();
                    return;
                }

                this.establishedConnection = true;

                this.emit("ready");

                firstWelcome = false;
            } else if (packet.type === "GameGuard/secretTokenRefresh") {
                // Refresh tokenEmit
                this.tokenEmit = packet.data.secret_token;
            }
        });

        this.socket.connect();
    }

    private async login() {
        if (!this.credentials) {
            throw Error("Credentials are not initialized");
        }

        console.log("Logging in...")
        let loginResponse = await this.sendPacket({
            type: "Authentication/login",
            data: {
                name: this.credentials.login,
                pass: this.credentials.password
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
                id: this.credentials.characterId,
                world_id: this.credentials.worldId
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

    public async reconnect() {
        this.socket.disconnect();
        this.socket.connect();

        await this.onReconnect();
    }

    private async onReconnect() {
        if (this.user === null) {
            // Connection not first initialized. Let it be initialized by System/welcome packet
            return;
        }

        if (!this.credentials) {
            throw Error("Credentials are not initialized");
        }

        try {
            let authResponse = await this.sendPacket({
                type: "Authentication/reconnect",
                data: {
                    character: this.credentials.characterId,
                    name: this.credentials.login,
                    world: this.credentials.worldId,
                    token: this.user.token
                }
            });

            if (authResponse.type !== "Authentication/reconnected") {
                throw new Error("Unexpected packet while reconnecting. " + authResponse.type, {
                    cause: authResponse
                });
            }
        } catch (e) {
            console.error(e);
            await this.reconnect();
            return;
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

    /**
     * Sends a packet to the server
     *
     * @param packet A packet of type {@link C2SPacket}
     * @param response Should method return a promise with a server response
     * @param timeout Time in milliseconds in which response should time out {@default 20000}
     *
     * @return Promise<S2CPacket> A promise when response=true
     * @return void Nothing when response=false
     */
    public sendPacket<T extends boolean = true>(packet: C2SPacket, response: T = true as T, timeout=20000): SendPacketReturnType<T> {
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

        if (response) {
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
            }) as SendPacketReturnType<T>;
        }

        return undefined as SendPacketReturnType<T>;
    }

    public async getVillagesByArea(startX: number, startY: number, widthUnits: number, heightUnits: number): Promise<MapVillageDataS2CPacket["data"]["villages"]> {
        let promises: Promise<MapVillageDataS2CPacket["data"]["villages"]>[] = []

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

        let villages: MapVillageDataS2CPacket["data"]["villages"] = [];
        for (let result of results) {
            villages.push(...result);
        }

        return villages;
    }

    get user() {
        return this._user;
    }

    get gameData() {
        return this._gameData;
    }


    get inventory() {
        return this._inventory;
    }

    get lang() {
        return this._lang;
    }

    public isConnected() {
        return this.socket.connected && this.establishedConnection;
    }
}