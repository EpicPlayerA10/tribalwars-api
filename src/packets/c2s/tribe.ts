import {BaseC2SPacket} from "../packets";

export interface TribeGetMemberListC2SPacket extends BaseC2SPacket {
    type: "Tribe/getMemberList"
    data: {
        tribe?: number
    }
}