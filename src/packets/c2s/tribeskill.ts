import {BaseC2SPacket} from "../packets";

export interface TribeSkillDonateC2SPacket extends BaseC2SPacket {
    type: "TribeSkill/donate"
    data: {
        village_id: number
        crowns: number,
        resources: {
            wood: number
            clay: number
            iron: number
        }
    }
}