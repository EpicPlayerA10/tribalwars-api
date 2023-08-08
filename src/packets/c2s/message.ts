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
