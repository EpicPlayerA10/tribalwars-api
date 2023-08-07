import {BaseS2CPacket} from "../packets";

export type TribeSkillDonatedS2CPacket = Readonly<BaseS2CPacket & {
    type: "TribeSkill/donated",
    data: {
        level: number,
        new_power: number,
        old_power: number,
        donor_id: number,
        donor_name: string,
        honor: {
            honor_total: number,
            honor_this_week: number,
            honor_last_week: number
        }
    }
}>