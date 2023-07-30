import {BasePacket} from "../packets";
import {PacketCharacter, PacketWorld} from "../packets-types";

export interface AuthReconnectedS2CPacket extends BasePacket {
    type: "Authentication/reconnected"
}

export interface AuthCharacterSelectedS2CPacket extends BasePacket {
    type: "Authentication/characterSelected",
    data: {
        id: number,
        world_id: string,
        map_name: string,
        name: string, // Nick
        owner_id: number,
        owner_name: string, // It seems that it is the same as 'name' field
        tribe_id: number,
        tribe_rights: string[]
    }
}

export interface LoginSuccessS2CPacket extends BasePacket {
    type: "Login/success",
    data: {
        player_id: number,
        name: string,
        token: string,
        characters: PacketCharacter[],
        worlds: PacketWorld[],
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
}