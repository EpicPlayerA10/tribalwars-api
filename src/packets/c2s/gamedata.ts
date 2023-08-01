import {BaseC2SPacket} from "../packets";

export interface GameGetGameDataC2SPacket extends BaseC2SPacket {
    type: "GameDataBatch/getGameData"
}