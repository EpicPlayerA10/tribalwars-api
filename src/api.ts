import EventEmitter from "events";
import TypedEmitter from "typed-emitter";
import {C2SPacket, S2CPacket, BasePacket} from "./packets/packets";
import io from "socket.io-client";
import {User} from "./model/User";
import {PacketGameData} from "./packets/packets-types";


export type ClientEvents = {
    onPacketReceived: (packet: S2CPacket, responseId?: number) => void
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
    private _gameData: PacketGameData | null = null;

    constructor() {
        super();

        // Create socket
        this.socket = io("wss://pl.tribalwars2.com", {
            query: {
                platform: "desktop"
            },
            secure: true,
            transports: ["websocket", "polling", "polling-jsonp", "polling-xhr"],
        });
    }

    public async connect(credentials: Credentials) {
        // Reconnect logic
        this.socket.on("reconnect", () => {
            this.reconnect(credentials);
        });

        // Second layer of reconnecting
        this.socket.on("disconnect", (reason: string) => {
            // Server disconnects us
            if (reason === "io server disconnect") {
                this.socket.connect();
                this.reconnect(credentials);
            }
        });

        // Packet receiver
        this.socket.on("msg", async (packet: S2CPacket) => {
            this.emit("onPacketReceived", packet, packet.id);
        });

        // Login to account
        await this.login(credentials);

        // Fetches data
        await this.syncData();

        this.emit("ready");
    }

    private async login(credentials: Credentials) {
        let loginResponse = await this.sendPacket({
            type: "Authentication/login",
            data: {
                name: credentials.login,
                pass: credentials.password
            }
        });

        if (loginResponse.type === "Login/success") {
            this._user = new User(loginResponse);
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
            throw Error("Can't reconnect without authorization first!")
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
    }

    public sendPacket(packet: C2SPacket): Promise<S2CPacket> {
        let currentResponseId = this.nextResponseID++;

        // Set response id (internal value)
        (packet as BasePacket).id = currentResponseId;

        this.socket.emit("msg", packet);

        // Return promise with received response packet
        return new Promise<S2CPacket>((resolve, reject) => {
            let callback: ClientEvents["onPacketReceived"] = (packet, responseId) => {
                if (currentResponseId === responseId) {
                    resolve(packet);
                    this.removeListener("onPacketReceived", callback);
                }
            }

            this.on("onPacketReceived", callback);
        });
    }

    get user(): User | null {
        return this._user;
    }

    get gameData(): PacketGameData | null {
        return this._gameData;
    }
}