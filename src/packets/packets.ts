// Templates
interface BasePacket {
    id?: number; // Response id

}

interface BaseS2CPacket extends BasePacket {}
interface BaseC2SPacket extends BasePacket {}


// Message
export interface MessageErrorS2CPacket extends BaseS2CPacket {
    type: "Message/error",
    data: {
        error_code: string,
        message: string
    }
}

// System
export interface SystemWelcomeS2CPacket extends BaseS2CPacket {
    type: "System/welcome",
    data: {
        message: string,
        transport: 'websocket', // Probably only 'websocket'
        host: string,
        maintenance: boolean
    }
}

export interface SystemErrorS2CPacket extends BaseS2CPacket {
    type: "System/error",
    data: {
        cause: string,
        code: string,
        details: [],
        message: string
    }
}

// Authentication
export interface AuthReconnectedS2CPacket extends BaseS2CPacket {
    type: "Authentication/reconnected"
}

export interface AuthCharacterSelectedS2CPacket extends BaseS2CPacket {
    type: "Authentication/characterSelected",
    data: {
        id: number,
        world_id: string,
        map_name: string,
        name: string, // Nick
        owner_id: number,
        owner_name: string, // It seems that it is the same as 'name' field
        tribe_id: number,
        tribe_rights: string[]
    }
}

// Login
export interface LoginSuccessS2CPacket extends BaseS2CPacket {
    type: "Login/success",
    data: {
        player_id: number,
        name: string,
        token: string,
        characters: [], // TODO
        worlds: [], // TODO
        invitations: [], // TODO
        premium: number,
        server_timestamp: number,
        first_login: boolean,
        is_guest: boolean,
        vip: boolean,
        accepted_adjust: boolean,
        accepted_pixels: boolean,
        newsletter_window: boolean,
        salt: string
    }
}

export interface TribeSkillDonatedS2CPacket extends BaseS2CPacket {
    type: "TribeSkill/donated",
    data: {
        level: number,
        new_power: number,
        old_power: number,
        donor_id: number,
        donor_name: string,
        honor: {
            honor_total: number,
            honor_this_week: number,
            honor_last_week: number
        }
    }
}

export interface TribeSkillDonatedS2CPacket extends BaseS2CPacket {
    type: "TribeSkill/donated",
    data: {
        level: number,
        new_power: number,
        old_power: number,
        donor_id: number,
        donor_name: string,
        honor: {
            honor_total: number,
            honor_this_week: number,
            honor_last_week: number
        }
    }
}

export interface CharacterProfileS2CPacket extends BaseS2CPacket {
    type: "Character/profile",
    data: {
        character_id: number
        character_name: string
        profile_text: string
        profile_icon: number
        profile_title: string | null
        profile_achievements: [] // TODO
        tribe_id: number
        rank: number
        rank_old: number
        points: number
        victory_points: number
        villages: [] // TODO
        points_per_villages: number
        bash_points_def: number
        bash_points_off: number
        bash_points_total: number
        achievement_count: number
        achievement_points: number
        achievement_average: number
        effect_points: number
        next_effect_points: number
        tribe_name: string
        tribe_tag: string
        tribe_points: number
        num_villages: number
        profile_title_id: number
    }
}

export type S2CPacket = MessageErrorS2CPacket |
        SystemWelcomeS2CPacket | SystemErrorS2CPacket |
        AuthReconnectedS2CPacket | AuthCharacterSelectedS2CPacket |
        LoginSuccessS2CPacket |
        TribeSkillDonatedS2CPacket |
        CharacterProfileS2CPacket;

// Authentication
export interface AuthLoginC2SPacket extends BaseC2SPacket {
    type: "Authentication/login",
    data: {
        name: string,
        pass: string,
    }
}

export interface AuthReconnectC2SPacket extends BaseC2SPacket {
    type: "Authentication/reconnect",
    data: {
        character: number,
        name: string,
        world: string,
        token: string
    }
}

export interface AuthSelectCharacterC2SPacket extends BaseC2SPacket {
    type: "Authentication/selectCharacter",
    data: {
        id: number,
        world_id: string
    }
}

// Game
export interface GameGetGameDataC2SPacket extends BaseC2SPacket {
    type: "GameDataBatch/getGameData"
}


// Character
export interface CharacterGetProfileC2SPacket extends BaseC2SPacket {
    type: "Character/getProfile",
    data: {
        character_id: number
    }
}

export type C2SPacket = AuthLoginC2SPacket | AuthReconnectC2SPacket | AuthSelectCharacterC2SPacket |
        GameGetGameDataC2SPacket |
        CharacterGetProfileC2SPacket;
