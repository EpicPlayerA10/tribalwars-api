import {BaseS2CPacket} from "../packets";
import {PacketGameData} from "../packets-types";

export type GameDataS2CPacket = Readonly<BaseS2CPacket & {
    type: "GameDataBatch/gameData",
    data: PacketGameData
}>