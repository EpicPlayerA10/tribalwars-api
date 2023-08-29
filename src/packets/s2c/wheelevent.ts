import {BaseS2CPacket} from "../packets";

export type WheelEventSpunS2CPacket = Readonly<BaseS2CPacket & {
    type: "WheelEvent/spun",
    data: {
        event_id: number,
        slot: number,
        next_price: number
    }
}>

export type WheelEventProgressS2CPacket = Readonly<BaseS2CPacket & {
    type: "WheelEvent/progress",
    data: {
        event_id: number,
        next_price: number,
        refill_price: number,
        slots_collected: [
            number, number, number,
            number, number, number,
            number, number, number
        ]
    }
}>
