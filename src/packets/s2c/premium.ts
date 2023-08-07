import {BaseS2CPacket} from "../packets";
import {PacketPremiumItem} from "../packets-types";

export type PremiumItemUsedS2CPacket = Readonly<BaseS2CPacket & {
    type: "Premium/itemUsed",
    data: {
        item_id: number
    }
}>

export type PremiumItemsS2CPacket = Readonly<BaseS2CPacket & {
    type: "Premium/items",
    data: {
        inventory: PacketPremiumItem[]
    }
}>