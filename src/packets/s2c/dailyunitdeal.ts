import {BaseS2CPacket} from "../packets";

export type DailyUnitDealAcceptedS2CPacket = Readonly<BaseS2CPacket & {
    type: "DailyUnitDeal/accepted",
    data: {
        slot: number
        village_id: number
    }
}>