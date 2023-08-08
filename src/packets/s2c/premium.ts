import {BaseS2CPacket} from "../packets";

export type PremiumItemUsedS2CPacket = Readonly<BaseS2CPacket & {
    type: "Premium/itemUsed",
    data: {
        item_id: number
    }
}>

export type PremiumItemsS2CPacket = Readonly<BaseS2CPacket & {
    type: "Premium/items",
    data: {
        inventory: Array<{
            id: number
            type: string
            amount: number
            image: any
            content?: {
                wood: number | string
                clay: number | string
                iron: number | string
                archer?: number
                coins?: string
            }
            name: any
            description: any
            last_amount: number
            usable: number
            effect: any
            coins?: number
            villages?: number
        }>
    }
}>