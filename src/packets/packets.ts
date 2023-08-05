// S2C
import {
    AuthCharacterSelectedS2CPacket,
    AuthReconnectedS2CPacket,
    CharacterProfileS2CPacket,
    GameDataS2CPacket, GameGuardGetInfoS2CPacket, GameGuardSecretTokenRefreshS2CPacket, GameGuardSendInfoS2CPacket,
    LoginSuccessS2CPacket,
    MapVillageDataS2CPacket,
    MessageErrorS2CPacket, PremiumItemsS2CPacket, PremiumItemUsedS2CPacket,
    SystemErrorS2CPacket,
    SystemWelcomeS2CPacket,
    TribeMemberListS2CPacket,
    TribeSkillDonatedS2CPacket,
    VillageDataS2CPacket, WheelEventSpunS2CPacket
} from "./s2c";

// S2C
import {
    AuthLoginC2SPacket,
    AuthReconnectC2SPacket,
    AuthSelectCharacterC2SPacket,
    CharacterGetProfileC2SPacket,
    GameGetGameDataC2SPacket,
    GameGuardSendInfoC2SPacket,
    MapGetVillagesByAreaC2SPacket, PremiumListItemsC2SPacket,
    PremiumUseItemC2SPacket,
    TribeGetMemberListC2SPacket,
    TribeSkillDonateC2SPacket,
    VillageGetVillageDataC2SPacket, WheelEventGetEventC2SPacket,
    WheelEventGetProgressC2SPacket,
    WheelEventRefillC2SPacket,
    WheelEventSpinC2SPacket,
    WheelEventStartEventC2SPacket
} from "./c2s";

export interface BasePacket {
    id?: number; // Response id
}

export type BaseS2CPacket = BasePacket;

export type BaseC2SPacket = Omit<BasePacket, "id">;


export type S2CPacket = Readonly<
        MessageErrorS2CPacket | SystemWelcomeS2CPacket | SystemErrorS2CPacket // Message
        | AuthReconnectedS2CPacket | AuthCharacterSelectedS2CPacket | LoginSuccessS2CPacket // Authentication
        | GameDataS2CPacket // Game Data
        | TribeSkillDonatedS2CPacket // TribeSkill
        | CharacterProfileS2CPacket // Character
        | TribeMemberListS2CPacket // Tribe
        | VillageDataS2CPacket // Village
        | MapVillageDataS2CPacket // Map
        | GameGuardSendInfoS2CPacket | GameGuardGetInfoS2CPacket | GameGuardSecretTokenRefreshS2CPacket // GameGuard (probably game anticheat)
        | PremiumItemUsedS2CPacket | PremiumItemsS2CPacket // Premium
        | WheelEventSpunS2CPacket // Wheel Event
        >


export type C2SPacket = Readonly<
        AuthLoginC2SPacket | AuthReconnectC2SPacket | AuthSelectCharacterC2SPacket // Authentication
        | GameGetGameDataC2SPacket // Game data
        | CharacterGetProfileC2SPacket // Character
        | TribeGetMemberListC2SPacket // Tribe
        | TribeSkillDonateC2SPacket // TribeSkill
        | VillageGetVillageDataC2SPacket // Village
        | MapGetVillagesByAreaC2SPacket // Map
        | GameGuardSendInfoC2SPacket // GameGuard (probably game anticheat)
        | WheelEventSpinC2SPacket | WheelEventGetProgressC2SPacket | WheelEventRefillC2SPacket | WheelEventStartEventC2SPacket | WheelEventGetEventC2SPacket // Wheel Event
        | PremiumUseItemC2SPacket | PremiumListItemsC2SPacket // Premium
        >
