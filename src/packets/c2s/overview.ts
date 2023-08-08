import {BaseC2SPacket} from "../packets";

export type OverviewGetVillagesC2SPacket = Readonly<BaseC2SPacket & {
    type: "Overview/getVillages"
    data: {
        count: number
        offset: number
        sorting: "village_name"
        reverse: number
        groups: []
    }
}>
