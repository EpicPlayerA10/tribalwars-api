import {BaseC2SPacket} from "../packets";

export interface VillageGetVillageDataC2SPacket extends BaseC2SPacket {
    type: "VillageBatch/getVillageData"
    data: {
        village_ids: number[]
    }
}