import {BaseC2SPacket} from "../packets";

export interface WheelEventSpinC2SPacket extends BaseC2SPacket {
    type: "WheelEvent/spin"
    data: {
        event_id: number,
        price: number
    }
}

export interface WheelEventGetProgressC2SPacket extends BaseC2SPacket {
    type: "WheelEvent/getProgress"
    data: {
        event_id: number
    }
}

export interface WheelEventRefillC2SPacket extends BaseC2SPacket {
    type: "WheelEvent/refill"
    data: {
        event_id: number,
        price: number
    }
}

export interface WheelEventStartEventC2SPacket extends BaseC2SPacket {
    type: "WheelEvent/startEvent"
    data: {
        event_id: number
    }
}

export interface WheelEventGetEventC2SPacket extends BaseC2SPacket {
    type: "WheelEvent/getEvent"
    data: {
        event_id?: number
    }
}