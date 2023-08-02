import {BaseC2SPacket} from "../packets";

export interface MapGetVillagesByAreaC2SPacket extends BaseC2SPacket {
    type: "Map/getVillagesByArea"
    data: {
        x: number,
        y: number,
        width: number,
        height: number,
        character_id?: number // Seems to be unused
    }
}