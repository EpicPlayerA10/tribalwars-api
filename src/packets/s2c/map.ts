import {BaseS2CPacket} from "../packets";
import {UnitType} from "../packets-types";

export type MapVillageDataS2CPacket = Readonly<BaseS2CPacket & {
    type: "Map/villageData",
    data: {
        villages: Array<{
            id: number
            name: string
            x: number
            y: number
            character_id?: number
            province_name: string
            character_name?: string
            character_points?: number
            points: number
            fortress: number
            tribe_id?: number
            tribe_name?: string
            tribe_tag?: string
            tribe_points?: number
            attack_protection: number
            barbarian_boost: any
            report_time_created?: number
            report_title?: string
            report_haul?: number
            player_attack_id?: number
            report_result?: number
        }>
        x: number
        y: number
    }
}>

export type MapVillageDetailsS2CPacket = Readonly<BaseS2CPacket & {
    type: "Map/villageDetails",
    data: {
        village_id: number
        village_name: string
        village_x: number
        village_y: number
        character_id: number
        points: number
        province: {
            id: number
            name: string
            x: number
            y: number
            kingdom_id: number
            kingdom_name: string
        }
        walking_durations: {
            [unit in UnitType]: number
        }
        province_bonus: any
        icons: Array<any>
        last_reports: Array<{
            id: number
            time_created: number
            type: string
            title: string
            favourite: number
            haul: string
            result: number
            token: string
            read: number
        }>
        scouting_reports: Array<{
            id: number
            type: string
            report_body_id: number
            character_id: number
            time_created: number
            title: string
            favourite: number
            result: number
            haul: any
            start_village_id: number
            target_village_id: number
            token: string
            deleted: number
            subtype: "buildings" | "units"
        }>
        attack_protection: boolean
        morale: number
        tribe: {
            name: string
            tag: string
            points: number
        }
        commands: {
            own: Array<{
                id: number
                start_village_id: number
                start_village_name: string
                start_village_x: number
                start_village_y: number
                target_village_id: number
                target_village_name: string
                target_village_x: number
                target_village_y: number
                x: number
                y: number
                type: string
                direction: string
                time_start: number
                time_completed: number
            }>
        }
        commands_scouting: {
            own: Array<any>
        }
        commands_transport: {
            own: Array<any>
        }
        supporting_units: any
    }
}>