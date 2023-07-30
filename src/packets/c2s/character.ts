import {BasePacket} from "../packets";

export interface CharacterGetProfileC2SPacket extends BasePacket {
    type: "Character/getProfile",
    data: {
        character_id: number
    }
}