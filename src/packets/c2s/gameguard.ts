import {BaseC2SPacket} from "../packets";

export interface GameGuardSendInfoC2SPacket extends BaseC2SPacket {
    type: "GameGuard/sendInfo",
    data: {
        checkId: number
        // domTree
        // html
    }
}