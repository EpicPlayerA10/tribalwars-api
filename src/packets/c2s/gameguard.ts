import {BaseC2SPacket} from "../packets";

export type GameGuardSendInfoC2SPacket = Readonly<BaseC2SPacket & {
    type: "GameGuard/sendInfo",
    data: {
        checkId: number
        // domTree
        // html
    }
}>