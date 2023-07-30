import {BasePacket} from "../packets";

export interface MessageErrorS2CPacket extends BasePacket {
    type: "Message/error",
    data: {
        error_code: string,
        message: string
    }
}

export interface SystemWelcomeS2CPacket extends BasePacket {
    type: "System/welcome",
    data: {
        message: string,
        transport: 'websocket', // Probably only 'websocket'
        host: string,
        maintenance: boolean
    }
}

export interface SystemErrorS2CPacket extends BasePacket {
    type: "System/error",
    data: {
        cause: string,
        code: string,
        details: [],
        message: string
    }
}