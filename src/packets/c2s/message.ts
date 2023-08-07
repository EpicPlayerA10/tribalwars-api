import {BaseC2SPacket} from "../packets";

export type MessageReplyC2SPacket = Readonly<BaseC2SPacket & {
    type: "Message/reply"
    data: {
        message_id: number // Conversation id
        message: string
    }
}>
