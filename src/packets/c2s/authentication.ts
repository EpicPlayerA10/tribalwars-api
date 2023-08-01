import {BaseC2SPacket} from "../packets";

export interface AuthLoginC2SPacket extends BaseC2SPacket {
    type: "Authentication/login",
    data: {
        name: string
    } & ({ pass: string } | { token: string }) // Token or password
}

export interface AuthReconnectC2SPacket extends BaseC2SPacket {
    type: "Authentication/reconnect",
    data: {
        character: number,
        name: string,
        world: string,
        token: string
    }
}

export interface AuthSelectCharacterC2SPacket extends BaseC2SPacket {
    type: "Authentication/selectCharacter",
    data: {
        id: number,
        world_id: string
    }
}