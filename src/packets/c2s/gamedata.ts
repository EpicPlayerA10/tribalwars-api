import {BasePacket} from "../packets";

export interface GameGetGameDataC2SPacket extends BasePacket {
    type: "GameDataBatch/getGameData"
}