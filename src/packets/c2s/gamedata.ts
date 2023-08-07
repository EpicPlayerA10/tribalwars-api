import {BaseC2SPacket} from "../packets";

export type GameGetGameDataC2SPacket = Readonly<BaseC2SPacket & {
    type: "GameDataBatch/getGameData"
}>