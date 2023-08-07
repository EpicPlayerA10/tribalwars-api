import {BaseS2CPacket} from "../packets";

export type CharacterProfileS2CPacket = Readonly<BaseS2CPacket & {
    type: "Character/profile",
    data: {
        character_id: number
        character_name: string
        profile_text: string
        profile_icon: number
        profile_title: string | null
        profile_achievements: [] // TODO
        tribe_id?: number
        rank: number
        rank_old: number
        points: number
        victory_points: number
        villages: Array<{
            village_id: number
            village_name: string
            village_x: number
            village_y: number
            points: number
        }>
        points_per_villages: number
        bash_points_def: number
        bash_points_off: number
        bash_points_total: number
        achievement_count: number
        achievement_points: number
        achievement_average: number
        effect_points: number
        next_effect_points: number
        tribe_name?: string
        tribe_tag?: string
        tribe_points?: number
        num_villages: number
        profile_title_id: number
    }
}>