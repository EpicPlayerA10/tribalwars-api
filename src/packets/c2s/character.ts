import {BaseC2SPacket} from "../packets";

export type CharacterGetProfileC2SPacket = Readonly<BaseC2SPacket & {
    type: "Character/getProfile",
    data: {
        character_id: number
    }
}>