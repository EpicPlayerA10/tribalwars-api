import {BaseS2CPacket} from "../packets";
import {PacketGameData} from "../packets-types";

export interface GameDataS2CPacket extends BaseS2CPacket {
    type: "GameDataBatch/gameData",
    data: PacketGameData
}