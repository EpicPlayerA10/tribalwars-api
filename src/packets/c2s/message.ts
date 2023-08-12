import {BaseC2SPacket} from "../packets";

export type MessageReplyC2SPacket = Readonly<BaseC2SPacket & {
    type: "Message/reply"
    data: {
        message_id: number // Conversation id
        message: string
    }
}>

export type MessageWriteC2SPacket = Readonly<BaseC2SPacket & {
    type: "Message/write"
    data: {
        to: Array<{
            type: "character"
            id: number
        }>,
        title: string
        message: string
    }
}>

export type MessageKickC2SPacket = Readonly<BaseC2SPacket & {
    type: "Message/kick"
    data: {
        message_id: number // Conversation id
        character_id: number
    }
}>

export type MessageAddParticipantsC2SPacket = Readonly<BaseC2SPacket & {
    type: "Message/addParticipants"
    data: {
        message_id: number // Conversation id
        entities: Array<{
            id: number // Character id
            name?: string
            type?: "character"
            leftIcon?: string
            $$hashKey?: string
            entity_id?: number // Same as 'id'
        }>
    }
}>
