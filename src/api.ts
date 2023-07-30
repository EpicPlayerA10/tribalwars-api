import EventEmitter from "events";
import TypedEmitter from "typed-emitter";
import {C2SPacket, S2CPacket} from "./packets/packets";
import io from "socket.io-client";


export type ClientEvents = {
    onPacketReceived: (packet: S2CPacket, responseId?: number) => void
    ready: () => void
}


export class TribalWarsClient extends (EventEmitter as new () => TypedEmitter<ClientEvents>) {
    private socket: SocketIOClient.Socket | undefined;

    private responseID = 1;

    private token: string | undefined;
    //public readonly tokenEmit: string = crypto.randomBytes(16).toString("hex");

    public async login(login: string, password: string, characterId: number, worldId: string) {
        this.socket = io("wss://pl.tribalwars2.com", {
            query: {
                platform: "desktop"
            },
            secure: true,
            transports: ["websocket", "polling", "polling-jsonp", "polling-xhr"],
        });

        // Reconnect
        this.socket.on("reconnect", async () => {
            if (this.token === undefined) {
                throw Error("Can't reconnect without authorization first!")
            }

            let authResponse = await this.sendPacket({
                type: "Authentication/reconnect",
                data: {
                    character: characterId,
                    name: login,
                    world: worldId,
                    token: this.token
                }
            });

            if (authResponse.type !== "Authentication/reconnected") {
                throw new Error("Unexpected packet while reconnecting. " + authResponse.type, {
                    cause: authResponse
                });
            }

            console.log("TribalWarsClient reconnected!");
        });

        // Packet receiver
        this.socket.on("msg", async (packet: S2CPacket) => {
            this.emit("onPacketReceived", packet, packet.id);
        });

        // Login to account
        let loginResponse = await this.sendPacket({
            type: "Authentication/login",
            data: {
                name: login,
                pass: password
            }
        });

        if (loginResponse.type === "Login/success") {
            this.token = loginResponse.data.token;
        } else {
            throw new Error("Unexpected packet while logging in. "+loginResponse.type, {
                cause: loginResponse
            });
        }

        // Select character
        let selectCharacterResponse = await this.sendPacket({
            type: "Authentication/selectCharacter",
            data: {
                id: characterId,
                world_id: worldId
            }
        });

        if (selectCharacterResponse.type !== "Authentication/characterSelected") {
            throw new Error("Unexpected packet while selecting character. "+loginResponse.type, {
                cause: selectCharacterResponse
            });
        }

        this.emit("ready");
    }

    public sendPacket(packet: C2SPacket): Promise<S2CPacket> {
        let currentResponseId = this.responseID++;

        packet.id = currentResponseId;

        this.socket?.emit("msg", packet);

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

    public getSocket() {
        return this.socket;
    }
}