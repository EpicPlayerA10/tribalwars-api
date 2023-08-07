import {BaseC2SPacket} from "../packets";

export type TribeSkillDonateC2SPacket = Readonly<BaseC2SPacket & {
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
}>