import {BaseS2CPacket} from "../packets";
import {PacketVillage} from "../packets-types";

export type VillageDataS2CPacket = Readonly<BaseS2CPacket & {
    type: "VillageBatch/villageData",
    data: {
        [villageId: number]: PacketVillage
    }
}>