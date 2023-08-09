import {BaseS2CPacket} from "../packets";

export type CommandIncomingS2CPacket = Readonly<BaseS2CPacket & {
    type: "Command/incoming",
    data: {
        command_id: number
        type: "attack"
        direction: "forward"
        origin: {
            id: number
        }
        target: {
            id: number
            name: string
            x: number
            y: number
            character_id: number
        }
        id: number
        icon: number
        preset_id: any
        home: {
            id: number
            name: string
            x: number
            y: number
            character_id: number
        }
        time_start: number
        time_completed: number
        report_id?: number
    }
}>

export type CommandCancelledS2CPacket = Readonly<BaseS2CPacket & {
    type: "Command/cancelled",
    data: {
        command_id: number
        type: "attack"
        direction: "back"
        origin: {
            id: number
        }
        target: {
            id: number
        }
        origin_village_id: number
        target_village_id: number
        units: {
            spear: number
            sword: number
            axe: number
            archer: number
            light_cavalry: number
            heavy_cavalry: number
            mounted_archer: number
            ram: number
            catapult: number
            knight: number
            snob: number
            trebuchet: number
            doppelsoldner: number
        }
    }
}>