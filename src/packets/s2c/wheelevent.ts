import {BaseS2CPacket} from "../packets";

export type WheelEventSpunS2CPacket = Readonly<BaseS2CPacket & {
    type: "WheelEvent/spun",
    data: {
        event_id: number,
        slot: number,
        next_price: number
    }
}>
