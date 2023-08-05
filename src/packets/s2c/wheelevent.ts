import {BaseS2CPacket} from "../packets";

export interface WheelEventSpunS2CPacket extends BaseS2CPacket {
    type: "WheelEvent/spun",
    data: {
        event_id: number,
        slot: number,
        next_price: number
    }
}
