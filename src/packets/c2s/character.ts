import {BaseC2SPacket} from "../packets";

export type CharacterGetProfileC2SPacket = Readonly<BaseC2SPacket & {
    type: "Character/getProfile",
    data: {
        character_id: number
    }
}>

export type CharacterSetProfileC2SPacket = Readonly<BaseC2SPacket & {
    type: "Character/setProfile",
    data: {
        icon: number | null
        title_id?: number
        achievements?: Array<string>
        text?: string
    }
}>
