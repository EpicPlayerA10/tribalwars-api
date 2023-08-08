import {BaseS2CPacket} from "../packets";

export type AuthReconnectedS2CPacket = Readonly<BaseS2CPacket & {
    type: "Authentication/reconnected"
}>

export type AuthCharacterSelectedS2CPacket = Readonly<BaseS2CPacket & {
    type: "Authentication/characterSelected",
    data: {
        id: number,
        world_id: string,
        map_name: string,
        name: string, // Nick
        owner_id: number,
        owner_name: string, // It seems that it is the same as 'name' field
        tribe_id: number,
        tokenEmit: string,
        tribe_rights: string[]
    }
}>

export type LoginSuccessS2CPacket = Readonly<BaseS2CPacket & {
    type: "Login/success",
    data: {
        player_id: number,
        name: string,
        token: string,
        characters: Array<{
            character_id: number,
            character_name: string,
            world_id: string,
            maintenance: boolean,
            allow_login: boolean,
            character_owner_id: number,
            character_owner_name: string
            key_required: boolean
        }>,
        worlds: Array<{
            id: string,
            name: string,
            full: boolean,
            recommended: number,
            key_required: boolean
        }>,
        invitations: [], // TODO
        premium: number,
        server_timestamp: number,
        first_login: boolean,
        is_guest: boolean,
        vip: boolean,
        accepted_adjust: boolean,
        accepted_pixels: boolean,
        newsletter_window: boolean,
        salt: string
    }
}>