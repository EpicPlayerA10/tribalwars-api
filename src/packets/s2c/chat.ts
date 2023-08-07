import {BaseS2CPacket} from "../packets";

export type ChatTribeS2CPacket = Readonly<BaseS2CPacket & {
    type: "Chat/tribe",
    data: {
        character_name: string
        message: string
        tribe_id: number
        character_id: number
        time_send: number
    }
}>