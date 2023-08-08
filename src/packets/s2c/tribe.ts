import {BaseS2CPacket} from "../packets";

export type TribeMemberListS2CPacket = Readonly<BaseS2CPacket & {
    type: "Tribe/memberList",
    data: {
        members: Array<{
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
        }>
    }
}>