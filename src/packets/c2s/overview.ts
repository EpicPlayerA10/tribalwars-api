import {BaseC2SPacket} from "../packets";

export type OverviewGetVillagesC2SPacket = Readonly<BaseC2SPacket & {
    type: "Overview/getVillages"
    data: {
        count: number
        offset: number
        sorting: "village_name"
        reverse: number
        groups: [] // TODO
    }
}>

export type OverviewGetIncomingC2SPacket = Readonly<BaseC2SPacket & {
    type: "Overview/getIncoming"
    data: {
        count: number
        offset: number
        sorting: "target_village_name"
        reverse: number
        groups: [] // TODO
        command_types: Array<"attack" | "support" | "relocate">
        villages: [] // TODO
    }
}>
