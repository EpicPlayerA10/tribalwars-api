import {BaseS2CPacket} from "../packets";
import {PacketPremiumItem} from "../packets-types";

export interface PremiumItemUsedS2CPacket extends BaseS2CPacket {
    type: "Premium/itemUsed",
    data: {
        item_id: number
    }
}

export interface PremiumItemsS2CPacket extends BaseS2CPacket {
    type: "Premium/items",
    data: {
        inventory: PacketPremiumItem[]
    }
}