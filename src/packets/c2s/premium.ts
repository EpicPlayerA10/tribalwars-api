import {BaseC2SPacket} from "../packets";

export type PremiumUseItemC2SPacket = Readonly<BaseC2SPacket & {
    type: "Premium/useItem"
    data: {
        village_id: number
        item_id: number
    }
}>

export type PremiumListItemsC2SPacket = Readonly<BaseC2SPacket & {
    type: "Premium/listItems"
}>
