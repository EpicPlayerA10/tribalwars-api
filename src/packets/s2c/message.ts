import {BaseS2CPacket} from "../packets";

export interface MessageErrorS2CPacket extends BaseS2CPacket {
    type: "Message/error",
    data: {
        error_code: string,
        message: string
    }
}

export interface SystemWelcomeS2CPacket extends BaseS2CPacket {
    type: "System/welcome",
    data: {
        message: string,
        transport: 'websocket', // Probably only 'websocket'
        host: string,
        maintenance: boolean
    }
}

export interface SystemErrorS2CPacket extends BaseS2CPacket {
    type: "System/error",
    data: {
        cause: string,
        code: string,
        details: [],
        message: string
    }
}