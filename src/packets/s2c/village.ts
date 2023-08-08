import {BaseS2CPacket} from "../packets";
import {UnitTypes} from "../packets-types";

export type VillageDataS2CPacket = Readonly<BaseS2CPacket & {
    type: "VillageBatch/villageData",
    data: {
        [villageId: number]: {
            "Village/village": {
                villageId: number
                res_last_update: number
                storage: number
                base_storage: number
                resources: {
                    wood: number
                    clay: number
                    iron: number
                    food: number
                }
                building_queue_slots: number
                production_rates: {
                    wood: number
                    clay: number
                    iron: number
                }
                name: string
                x: number
                y: number
                province_id: number
                province_name: string
                continent_id: number
                max_loyalty: number
                loyalty: number
                points: number
                buildings: {} // TODO
                effects: Array<{
                    effect_id: number
                    type: string
                    name: string
                    scope: string
                    scope_value: number
                    details: {
                        type: string
                        resource_type: string
                        factor: number
                        duration: number
                    }
                    permanent: boolean
                    time_completed: number
                }>
                preceptory_order: any
            }
            "Village/unitInfo": {
                village_id: number
                available_units: {
                    [unit in UnitTypes]: {
                        in_town: number
                        support: number
                        total: number
                    }
                }
                queues: {
                    barracks: Array<any>
                    academy: Array<any>
                    statue: Array<any>
                    preceptory: Array<any>
                }
            }
            "Timeline/events": {
                village_id: number
                events: Array<{
                    type: string
                    id: number
                    time: number
                    haul?: string
                    losses?: boolean
                    report_id?: number
                    building_type?: string
                }>
            }
            "Command/ownCommands": {
                village_id: number
                commands: Array<{
                    id: number
                    type: string
                    direction: string
                    icon: number
                    preset_id: any
                    home: {
                        id: number
                        name: string
                        x: number
                        y: number
                        character_id: number
                    }
                    target: {
                        id: number
                        name: string
                        x: number
                        y: number
                        character_id: any
                    }
                    time_start: number
                    time_completed: number
                    report_id: number
                }>
            }
            "Command/foreignCommands": {
                village_id: number
                commands: Array<any>
            }
            "Scouting/info": {
                id: number
                spy_1: number
                spy_2: number
                spy_3: number
                spy_4: number
                spy_5: number
                spy_production: number
                status: number
                time_started: any
                time_completed: any
                camouflage_enabled: number
                camouflage_building: string
                camouflage_level: number
                dummies_enabled: number
                dummies_unit: string
                switch_weapons_enabled: number
                switch_weapons_unit: string
                switch_weapons_replacement: string
                exchange_enabled: number
                worker_started: number
                time_last_requeue: number
                commands: Array<any>
                spy_prices: Array<{
                    wood: number
                    clay: number
                    iron: number
                    time: number
                }>
                next_spy_price: {
                    wood: number
                    clay: number
                    iron: number
                    time: number
                }
            }
            "Building/queue": {
                village_id: number
                unlocked_slots: number
                queue: Array<{
                    id: number
                    building: string
                    level: number
                    time_started: number
                    time_completed: number
                    type: string
                }>
            }
            "Transport/list": {
                transports: []
                total: number
                village_id: number
                offset: number
                count: number
            }
            "Hospital/patients": {
                village_id: number
                patients: []
                beds_in_use: number
                beds_max: number
            }
            "Academy/info": {
                noble_limit: number
                nobles_total: number
                nobles_training: number
                coins_left: number
                has_academy: boolean
                village_id: number
                jobs: []
            }
        }
    }
}>