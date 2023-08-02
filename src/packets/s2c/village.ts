import {BaseS2CPacket} from "../packets";
import {PacketVillage} from "../packets-types";

export interface VillageDataS2CPacket extends BaseS2CPacket {
    type: "VillageBatch/villageData",
    data: {
        [villageId: number]: PacketVillage
    }
}