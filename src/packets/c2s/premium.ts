import {BaseC2SPacket} from "../packets";

export interface PremiumUseItemC2SPacket extends BaseC2SPacket {
    type: "Premium/useItem"
    data: {
        village_id: number
        item_id: number
    }
}

export interface PremiumListItemsC2SPacket extends BaseC2SPacket {
    type: "Premium/listItems"
}
