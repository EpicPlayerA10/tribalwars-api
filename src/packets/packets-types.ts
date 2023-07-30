export interface PacketCharacter {
    character_id: number,
    character_name: string,
    world_id: string,
    maintenance: boolean,
    allow_login: boolean,
    character_owner_id: number,
    character_owner_name: string
    key_required: boolean
}

export interface PacketWorld {
    id: string,
    name: string,
    full: boolean,
    recommended: number,
    key_required: boolean
}


export interface PacketGameData {
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
    "GameData/units": {} // TODO
    "GameData/officers": {} // TODO
    "GameData/premium": {} // TODO
    "WorldConfig/config": {} // TODO
    "Achievement/all": {} // TODO
}