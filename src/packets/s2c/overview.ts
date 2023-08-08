import {BaseS2CPacket} from "../packets";

export type OverviewVillagesS2CPacket = Readonly<BaseS2CPacket & {
    type: "Overview/villages",
    data: {
        offset: number
        total: number
        villages: Array<{
            id: number
            village_name: string
            points: number
            x: number
            y: number
            points_current: number
            buildqueue_slots: number
            province_id: number
            province_name: string
            direction?: string
            continent_id: number
            continent_name: string
            res_wood: number
            res_clay: number
            res_iron: number
            storage: number
            res_food: number
            loyalty: number
            preceptory_order: any
            village_id: number
            scouts: number
            incoming_commands: number
            outgoing_commands: number
            camouflage_enabled: number
            dummies_enabled: number
            switch_weapons_enabled: number
            exchange_enabled: number
            faith: number
            merchants_total: number
            merchants_free: number
            effects: Array<{
                effect_id: string
                type: string
                name: string
                scope: string
                scope_value: string
                details: {
                    type: string
                    resource_type?: string
                    factor: number
                    duration: number
                }
                permanent: boolean
                time_completed: number
            }>
            build_jobs: Array<{
                building_type: string
                time_completed: string
            }>
            recruit_jobs: Array<{
                unit_type: string
                time_completed: string
            }>
            groups: Array<number>
            headquarter: number
            barracks: number
            tavern: number
            hospital: number
            preceptory: number
            church: number
            chapel: number
            academy: number
            rally_point: number
            statue: number
            market: number
            timber_camp: number
            clay_pit: number
            iron_mine: number
            farm: number
            warehouse: number
            wall: number
            fortress: number
            current_village_id: number
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
            max_food: number
        }>
    }
}>