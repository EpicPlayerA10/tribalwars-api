import {BaseS2CPacket} from "../packets";
import {PacketTribeMember} from "../packets-types";

export type TribeMemberListS2CPacket = Readonly<BaseS2CPacket & {
    type: "Tribe/memberList",
    data: {
        members: Array<PacketTribeMember>
    }
}>