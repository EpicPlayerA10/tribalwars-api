import {BasePacket} from "../packets";

export interface AuthLoginC2SPacket extends BasePacket {
    type: "Authentication/login",
    data: {
        name: string
    } & ({ pass: string } | { token: string }) // Token or password
}

export interface AuthReconnectC2SPacket extends BasePacket {
    type: "Authentication/reconnect",
    data: {
        character: number,
        name: string,
        world: string,
        token: string
    }
}

export interface AuthSelectCharacterC2SPacket extends BasePacket {
    type: "Authentication/selectCharacter",
    data: {
        id: number,
        world_id: string
    }
}