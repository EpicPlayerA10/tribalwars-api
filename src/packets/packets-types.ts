export type UnitTypes = "spear" | "sword" | "axe" | "archer" | "light_cavalry" | "mounted_archer" | "heavy_cavalry" | "ram" | "catapult" | "knight" | "snob" | "trebuchet" | "doppelsoldner"

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
    "GameData/units": {
        spear: PacketUnit
        sword: PacketUnit
        axe: PacketUnit
        archer: PacketUnit
        light_cavalry: PacketUnit
        mounted_archer: PacketUnit
        heavy_cavalry: PacketUnit
        ram: PacketUnit
        catapult: PacketUnit
        knight: PacketUnit
        snob: PacketUnit
        trebuchet: PacketUnit
        doppelsoldner: PacketUnit
    }
    "GameData/officers": {} // TODO
    "GameData/premium": {} // TODO
    "WorldConfig/config": {} // TODO
    "Achievement/all": {} // TODO
}

export interface PacketUnit {
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

export interface PacketTribeMember {
    id: number
    name: string
    title: string
    points: number
    victory_points: number
    villages: number
    global_rank: number
    honor: number
    profile_icon: number
    loyalty: number
    rights: Array<"diplomacy" | "forum" | "members" | "news" | "noble_planner" | "profile" | "quests" | "recruit" | "settings" | "skills" | "wars">
    trusted: 0 | 1
    last_login: number
    under_attack: boolean
    banned: boolean
    ban_expires: number
}

export interface PacketVillage {
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
            [unit in UnitTypes]: PacketUnit
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

export interface PacketAvailableUnits {
    in_town: number
    support: number
    total: number
}