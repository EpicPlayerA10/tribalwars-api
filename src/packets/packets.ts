// S2C
import {
    AuthCharacterSelectedS2CPacket,
    AuthReconnectedS2CPacket, CharacterProfileS2CPacket, GameDataS2CPacket, LoginSuccessS2CPacket,
    MessageErrorS2CPacket,
    SystemErrorS2CPacket,
    SystemWelcomeS2CPacket, TribeMemberListS2CPacket, TribeSkillDonatedS2CPacket
} from "./s2c";

// S2C
import {
    AuthLoginC2SPacket,
    AuthReconnectC2SPacket,
    AuthSelectCharacterC2SPacket, CharacterGetProfileC2SPacket,
    GameGetGameDataC2SPacket, TribeGetMemberListC2SPacket
} from "./c2s";

export interface BasePacket {
    id?: number; // Response id
}

export type BaseS2CPacket = BasePacket;

export type BaseC2SPacket = Omit<BasePacket, "id">;


export type S2CPacket = MessageErrorS2CPacket | SystemWelcomeS2CPacket | SystemErrorS2CPacket // Message
        | AuthReconnectedS2CPacket | AuthCharacterSelectedS2CPacket | LoginSuccessS2CPacket // Authentication
        | GameDataS2CPacket // Game Data
        | TribeSkillDonatedS2CPacket // TribeSkill
        | CharacterProfileS2CPacket // Character
        | TribeMemberListS2CPacket // Tribe


export type C2SPacket = AuthLoginC2SPacket | AuthReconnectC2SPacket | AuthSelectCharacterC2SPacket // Authentication
        | GameGetGameDataC2SPacket // Game data
        | CharacterGetProfileC2SPacket // Character
        | TribeGetMemberListC2SPacket // Tribe
