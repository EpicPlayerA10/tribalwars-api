import {BaseS2CPacket} from "../packets";

export interface MapVillageDataS2CPacket extends BaseS2CPacket {
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
}