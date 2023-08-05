import EventEmitter from "events";
import TypedEmitter from "typed-emitter";
import {C2SPacket, S2CPacket, BasePacket} from "./packets/packets";
import io from "socket.io-client";
import {User} from "./model/User";
import {PacketGameData, PacketPremiumItem} from "./packets/packets-types";


export type ClientEvents = {
    onPacketReceived: (packet: S2CPacket, responseId?: number) => void
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

    private nextResponseID = 1;

    // User
    private _user: User | null = null;

    // GameData
    private _gameData: Readonly<PacketGameData> | null = null;

    // Inventory
    private _inventory: Readonly<PacketPremiumItem>[] | null = null;

    constructor() {
        super();

        // Create socket
        this.socket = io("wss://pl.tribalwars2.com", {
            query: {
                platform: "desktop"
            },
            secure: true,
            transports: ["websocket", "polling", "polling-jsonp", "polling-xhr"],
            timeout: 30000
        });
    }

    public connect(credentials: Credentials) {
        this.socket.on("connect", (...args: any) => {
            console.log("connect");
            console.log(args);
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
            console.log("reconnecting");
            console.log(args);
        });

        // Reconnect logic
        this.socket.on("reconnect", async () => {
            //console.log("reconnect")
            await this.reconnect(credentials);
        });

        // Second layer of reconnecting
        this.socket.on("disconnect", async (reason: string) => {
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

                this.emit("ready");

                firstWelcome = false;
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

        if (selectCharacterResponse.type !== "Authentication/characterSelected") {
            throw new Error("Unexpected packet while selecting character. "+loginResponse.type, {
                cause: selectCharacterResponse
            });
        }
    }

    private async reconnect(credentials: Credentials) {
        if (this.user === null) {
            await this.login(credentials);
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

    public sendPacket(packet: C2SPacket): Promise<S2CPacket> {
        let currentResponseId = this.nextResponseID++;

        // Set response id (internal value)
        (packet as BasePacket).id = currentResponseId;

        this.emit("onPacketSent", packet);

        this.socket.emit("msg", packet);

        // Return promise with received response packet
        return new Promise<S2CPacket>((resolve, reject) => {
            let gotResponse = false;

            let callback: ClientEvents["onPacketReceived"] = (packet, responseId) => {
                if (currentResponseId === responseId) {
                    resolve(packet);
                    this.removeListener("onPacketReceived", callback);

                    gotResponse = true;
                }
            }

            this.on("onPacketReceived", callback);

            setTimeout(() => {
                if (!gotResponse) {
                    this.removeListener("onPacketReceived", callback);
                    reject(Error(`Packet ${packet.type} timed out`));
                }
            }, 30000);
        });
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
}