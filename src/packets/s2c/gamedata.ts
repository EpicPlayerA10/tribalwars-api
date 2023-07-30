import {BasePacket} from "../packets";
import {PacketGameData} from "../packets-types";

export interface GameDataS2CPacket extends BasePacket {
    type: "GameDataBatch/gameData",
    data: PacketGameData
}