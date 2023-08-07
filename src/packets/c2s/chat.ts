import {BaseC2SPacket} from "../packets";

export type ChatTribeC2SPacket = Readonly<BaseC2SPacket & {
    type: "Chat/tribe",
    data: {
        character_name: string
        message: string
    }
}>