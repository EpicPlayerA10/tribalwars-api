import {BaseS2CPacket} from "../packets";

export type MessageNewS2CPacket = Readonly<BaseS2CPacket & {
    type: "Message/new",
    data: {
        message_id: number
        title: string
        message_count: number
        last_update: number
        participants: Array<{
            character_id: number
            character_name: string
        }>
        message: {
            content: string
            character_id: number
            character_name: string
            time_created: number
            profile_icon: number
        }
    }
}>

export type MessageSentS2CPacket = Readonly<BaseS2CPacket & {
    type: "Message/sent",
    data: {
        message_id: number
        title: string
        message_count: number
        last_update: number
        participants: Array<{
            character_id: number
            character_name: string
        }>
        message: {
            content: string
            character_id: number
            character_name: string
            time_created: number
            profile_icon: number
        }
    }
}>
