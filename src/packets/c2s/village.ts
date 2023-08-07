import {BaseC2SPacket} from "../packets";

export type VillageGetVillageDataC2SPacket = Readonly<BaseC2SPacket & {
    type: "VillageBatch/getVillageData"
    data: {
        village_ids: number[]
    }
}>