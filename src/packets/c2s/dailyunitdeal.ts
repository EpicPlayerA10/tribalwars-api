import {BaseC2SPacket} from "../packets";

export type DailyUnitDealAcceptC2SPacket = Readonly<BaseC2SPacket & {
    type: "DailyUnitDeal/accept",
    data: {
        slot: number
        village_id: number
    }
}>