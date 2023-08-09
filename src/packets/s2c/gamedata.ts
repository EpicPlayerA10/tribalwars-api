import {BaseS2CPacket} from "../packets";
import {Building, Officer, UnitTypes} from "../packets-types";

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
                building: Building,
                function?: number
            }
        }

        "GameData/buildings": {
            [building in Building]: {
                id: string
                image: string
                description: string
                required_level: number
                max_level: number
                min_level: number
                wood: number
                wood_factor: number
                clay: number
                clay_factor: number
                iron: number
                iron_factor: number
                food: number
                food_factor: number
                build_time: number
                build_time_factor: number
                build_time_offset: number
                hitpoints: number
                hitpoints_factor: number
                function: number
                function_factor: number
                points: number
                points_factor: number
                building_type: string
                order: number
                individual_level_costs: {
                    [level: number]: {
                        wood: string
                        clay: string
                        iron: string
                        food: string
                        build_time: string
                    }
                }
            }
        }
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
        "GameData/officers": {
            [officer in Officer]: {
                command_types: Array<string>
                exclude_unit_types?: Array<string>
                abilities: Array<{
                    type: string
                    bonus_percentage?: number
                    conditions?: {
                        target_barbarian: boolean
                    }
                    chance?: number
                }>
            }
        }
        "GameData/premium": {
            premium_boost_wood: number
            premium_boost_clay: number
            premium_boost_iron: number
            barbarian_boost_wood: number
            barbarian_boost_clay: number
            barbarian_boost_iron: number
            premium_paladin_weapon: {
                spear: Array<number>
                sword: Array<number>
                axe: Array<number>
                archer: Array<number>
                light_cavalry: Array<number>
                mounted_archer: Array<number>
                heavy_cavalry: Array<number>
                ram: Array<number>
                catapult: Array<number>
                snob: Array<number>
            }
            premium_paladin_instant: number
            premium_instant_build: {
                time_range: Array<number>
                crown_range: Array<number>
                time_fixed_price: Array<number>
                crowns_fixed_price: Array<number>
            }
            premium_instant_recruit: {
                time_range: Array<number>
                crown_range: Array<number>
                time_fixed_price: Array<number>
                crowns_fixed_price: Array<number>
            }
            premium_second_queue_job: number
            premium_build_cost_reduction: number
            premium_build_queue_slot: number
            premium_research: number
            premium_trade: number
            premium_instant_transport: number
            premium_reset_order: number
            premium_village_relocate_random: number
            premium_village_relocate_chosen: number
            premium_noob_protection: number
            premium_loot_protection: number
            daily_unit: number
            daily_unit_reroll: number
            resource_deposit_reroll: number
            premium_village_manager: number
            premium_gambling: number
            wheel_spin: number
            wheel_refill: number
        }
        "WorldConfig/config": {
            speed: number
            widget_non_pacc_slots: number
            loyalty_after_conquer: number
            church: boolean
            rally_point_speed_bonus: boolean
            rally_point_speed_bonus_vs_barbarians: Array<number>
            bathhouse: boolean
            chapel_bonus: number
            church_bonus: Array<number>
            doppelsoldner_bonus: number
            defender_superior: number
            super_value: number
            officer_mortality: number
            morale_days: number
            morale_start: number
            morale_end: number
            morale_factor: number
            farm_rule: number
            night_start_hour: number
            night_end_hour: number
            night_def_factor: number
            barbarian_spawn_rate: number
            barbarian_point_limit: number
            noob_protection_days: number
            tribe_member_limit: number
            tribe_member_limit_ranking: number
            daily_unit_deal: number
            instant_recruit: number
            resource_deposits: number
            resource_deposit_ignore_world_speed: boolean
            push_notifications: number
            second_village: boolean
            second_village_ignore_world_speed: boolean
            invite_to_map: boolean
            invite_to_map_days: number
            second_queue_job: boolean
            tribe_skills: boolean
            barbarize_inactive_percent: number
            smart_tips: boolean
            free_instant_build_seconds_per_level: number
            spy_speed_modifier: number
            spy_sabotage_speed_modifier: number
            spy_costs_1: {
                wood: number
                clay: number
                iron: number
                time: number
            }
            spy_costs_2: {
                wood: number
                clay: number
                iron: number
                time: number
            }
            spy_costs_3: {
                wood: number
                clay: number
                iron: number
                time: number
            }
            spy_costs_4: {
                wood: number
                clay: number
                iron: number
                time: number
            }
            spy_costs_5: {
                wood: number
                clay: number
                iron: number
                time: number
            }
            relocate_units: boolean
            mass_buildings: boolean
            mass_recruiting: boolean
            village_load_startup: number
            village_load_amount: number
            message_handling_tick: number
            sentry_backend: boolean
            sentry_browser: boolean
            sentry_android: boolean
            sentry_ios: boolean
            unified_game_time: boolean
            building_completion_offers: boolean
            language_selection: boolean
            dynamic_filters_for_villages: boolean
            victory_points: boolean
            forum_service_v2: boolean
            village_last_report: boolean
            affront_report_player: boolean
            affront_report_tribe: boolean
            affront_report_village: boolean
            affront_report_conversation: boolean
            affront_report_tribe_forum_post: boolean
            member_limit_1: number
            member_limit_2: number
            member_limit_3: number
            member_limit_4: number
            member_limit_5: number
            member_limit_6: number
            member_limit_7: number
            member_limit_8: number
            member_limit_9: number
            member_limit_10: number
            world_open_phase_message: string
            delete_character_feature: boolean
            push_service_v1: boolean
            max_active_mission_for_character: number
            coop: boolean
            gdpr: boolean
            sentry_browser_url: string
            sentry_android_url: string
            sentry_ios_url: string
        }
        "Achievement/all": {
            [achievement: string]: {
                name: string
                category: "milestone" | "repeatable" | "tribe" | "battle" | "ruler" | "friends" | "special" | "points"
                levels: number
                repeatable: boolean
                limits?: number[]
                points?: number[]
                rewards: any[]
                milestone: boolean
                world_level?: number
                reached_levels?: {
                    [level: string]: boolean
                }
            }
        }
    }
}>