import {BaseC2SPacket} from "../packets";

export interface CharacterGetProfileC2SPacket extends BaseC2SPacket {
    type: "Character/getProfile",
    data: {
        character_id: number
    }
}