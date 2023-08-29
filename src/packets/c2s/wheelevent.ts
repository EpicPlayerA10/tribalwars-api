import {BaseC2SPacket} from "../packets";

export type WheelEventSpinC2SPacket = Readonly<BaseC2SPacket & {
    type: "WheelEvent/spin"
    data: {
        event_id: number,
        price: number
    }
}>

export type WheelEventGetProgressC2SPacket = Readonly<BaseC2SPacket & {
    type: "WheelEvent/getProgress"
    data: {
        event_id: number
    }
}>

export type WheelEventRefillC2SPacket = Readonly<BaseC2SPacket & {
    type: "WheelEvent/refill"
    data: {
        event_id: number,
        price: number
    }
}>

export type WheelEventStartEventC2SPacket = Readonly<BaseC2SPacket & {
    type: "WheelEvent/startEvent"
    data: {
        event_id: number
    }
}>

export type WheelEventGetEventC2SPacket = Readonly<BaseC2SPacket & {
    type: "WheelEvent/getEvent"
}>