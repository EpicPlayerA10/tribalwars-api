import {BaseS2CPacket, C2SPacket} from "../packets";

export type MessageErrorS2CPacket = Readonly<BaseS2CPacket & {
    type: "Message/error",
    data: {
        error_code: string,
        message: string
    }
}>

export type SystemWelcomeS2CPacket = Readonly<BaseS2CPacket & {
    type: "System/welcome",
    data: {
        message: string,
        transport: 'websocket', // Probably only 'websocket'
        host: string,
        maintenance: boolean
    }
}>

export type SystemErrorS2CPacket = Readonly<BaseS2CPacket & {
    type: "System/error",
    data: {
        cause: C2SPacket["type"],
        code: string,
        details: [],
        message: string
    }
}>