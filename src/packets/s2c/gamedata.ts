import {BaseS2CPacket} from "../packets";
import {UnitTypes} from "../packets-types";

export type GameDataS2CPacket = Readonly<BaseS2CPacket & {
    type: "GameDataBatch/gameData",
    data: {
        "GameData/baseData": {
            resource_production: number
            storage_capacity: number
            population_limit: number
            hospital_healing_duration: number
            resource_boost_duration: number
            resource_boost_value: number
            instant_trade_ratio: number
            cancel_command_duration: number
            spy_speed: number
            loot_protection_duration: number
            loot_protection_value: number
            luck_min: number
            luck_max: number
            nobleman_effect_min: number
            nobleman_effect_max: number
            reset_order_resources: {
                wood: number
                clay: number
                iron: number
                food: number
            }
            show_daily_bonus_after_login_nr: number
            show_second_village_after_login_nr: number
            exp_to_level_exponent: number
            exp_to_level_factor: number
            crown_to_exp_exponent: number
            resource_to_exp_factor: number
            knight_relocation_time: number
        }

        "GameData/research": {
            [research_name: string]: {
                type: string
                description: string
                required_level: number
                building: "headquarter" | "barracks" | "tavern" | "hospital" | "preceptory" | "rally_point" | "statue" | "market" | "warehouse" | "wall",
                function?: number
            }
        }

        "GameData/buildings": {} // TODO
        "GameData/units": {
            [unit in UnitTypes]: {
                name: string
                building: string
                required_level: number
                wood: number
                clay: number
                iron: number
                food: number
                build_time: number
                attack: number
                def_inf: number
                def_kav: number
                def_arc: number
                speed: number
                load: number
                type: number
                points_att: number
                points_def: number
                special?: 1
            }
        }
        "GameData/officers": {} // TODO
        "GameData/premium": {} // TODO
        "WorldConfig/config": {} // TODO
        "Achievement/all": {} // TODO
    }
}>