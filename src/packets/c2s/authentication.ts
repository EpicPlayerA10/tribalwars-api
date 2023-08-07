import {BaseC2SPacket} from "../packets";

export type AuthLoginC2SPacket = Readonly<BaseC2SPacket & {
    type: "Authentication/login",
    data: {
        name: string
    } & ({ pass: string } | { token: string }) // Token or password
}>

export type AuthReconnectC2SPacket = Readonly<BaseC2SPacket & {
    type: "Authentication/reconnect",
    data: {
        character: number,
        name: string,
        world: string,
        token: string
    }
}>

export type AuthSelectCharacterC2SPacket = Readonly<BaseC2SPacket & {
    type: "Authentication/selectCharacter",
    data: {
        id: number,
        world_id: string
    }
}>