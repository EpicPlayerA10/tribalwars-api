import {BaseS2CPacket} from "../packets";

// Acknowledge packet
export type GameGuardSendInfoS2CPacket = Readonly<BaseS2CPacket & {
    type: "GameGuard/sendInfo",
    data: {} // Seems to be empty
}>

// This packet should be called "execute any javascript code"
export type GameGuardGetInfoS2CPacket = Readonly<BaseS2CPacket & {
    type: "GameGuard/getInfo",
    data: {
        exec: string // Javascript code that is fed to eval()
    }
}>

export type GameGuardSecretTokenRefreshS2CPacket = Readonly<BaseS2CPacket & {
    type: "GameGuard/secretTokenRefresh",
    data: {
        secret_token: string
    }
}>