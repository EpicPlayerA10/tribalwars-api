import {BaseS2CPacket} from "../packets";
import {PacketTribeMember} from "../packets-types";

export interface TribeMemberListS2CPacket extends BaseS2CPacket {
    type: "Tribe/memberList",
    data: {
        members: Array<PacketTribeMember>
    }
}