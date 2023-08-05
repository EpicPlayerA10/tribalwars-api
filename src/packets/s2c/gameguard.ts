import {BaseS2CPacket} from "../packets";

// Acknowledge packet
export interface GameGuardSendInfoS2CPacket extends BaseS2CPacket {
    type: "GameGuard/sendInfo",
    data: {} // Seems to be empty
}

// This packet should be called "execute any javascript code"
export interface GameGuardGetInfoS2CPacket extends BaseS2CPacket {
    type: "GameGuard/getInfo",
    data: {
        exec: string // Javascript code that is fed to eval()
    }
}

export interface GameGuardSecretTokenRefreshS2CPacket extends BaseS2CPacket {
    type: "GameGuard/secretTokenRefresh",
    data: {
        secret_token: string
    }
}