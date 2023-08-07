import {BaseC2SPacket} from "../packets";

export type TribeGetMemberListC2SPacket = Readonly<BaseC2SPacket & {
    type: "Tribe/getMemberList"
    data: {
        tribe?: number
    }
}>