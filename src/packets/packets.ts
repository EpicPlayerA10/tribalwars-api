// S2C
import {
    AuthCharacterSelectedS2CPacket,
    AuthReconnectedS2CPacket,
    CharacterProfileS2CPacket,
    ChatTribeS2CPacket, CommandCancelledS2CPacket, CommandIncomingS2CPacket, DailyUnitDealAcceptedS2CPacket,
    GameDataS2CPacket,
    GameGuardGetInfoS2CPacket, GameGuardGetMobileInfoS2CPacket,
    GameGuardSecretTokenRefreshS2CPacket,
    GameGuardSendInfoS2CPacket,
    LoginSuccessS2CPacket,
    MapVillageDataS2CPacket,
    MapVillageDetailsS2CPacket, MessageCharacterKickedS2CPacket,
    MessageErrorS2CPacket,
    MessageNewS2CPacket,
    MessageSentS2CPacket, OverviewIncomingS2CPacket,
    OverviewVillagesS2CPacket,
    PremiumItemsS2CPacket,
    PremiumItemUsedS2CPacket,
    SystemErrorS2CPacket,
    SystemWelcomeS2CPacket,
    TribeMemberListS2CPacket,
    TribeSkillDonatedS2CPacket,
    VillageDataS2CPacket, WheelEventProgressS2CPacket,
    WheelEventSpunS2CPacket
} from "./s2c";

// S2C
import {
    AuthCreateCharacterC2SPacket,
    AuthLoginC2SPacket,
    AuthReconnectC2SPacket,
    AuthSelectCharacterC2SPacket, CharacterGetInfoC2SPacket,
    CharacterGetProfileC2SPacket, CharacterSetProfileC2SPacket,
    ChatTribeC2SPacket,
    DailyUnitDealAcceptC2SPacket,
    GameGetGameDataC2SPacket,
    GameGuardSendInfoC2SPacket,
    MapGetVillageDetailsC2SPacket,
    MapGetVillagesByAreaC2SPacket, MessageAddParticipantsC2SPacket, MessageKickC2SPacket,
    MessageReplyC2SPacket,
    MessageWriteC2SPacket, OverviewGetIncomingC2SPacket,
    OverviewGetVillagesC2SPacket,
    PremiumListItemsC2SPacket,
    PremiumUseItemC2SPacket,
    TribeGetMemberListC2SPacket,
    TribeSkillDonateC2SPacket,
    TribeSkillMassDonatingC2SPacket,
    TutorialGetVillageToAttackC2SPacket,
    TutorialStartC2SPacket,
    TutorialStartTaskC2SPacket,
    VillageGetVillageDataC2SPacket,
    WheelEventGetEventC2SPacket,
    WheelEventGetProgressC2SPacket,
    WheelEventRefillC2SPacket,
    WheelEventSpinC2SPacket,
    WheelEventStartEventC2SPacket
} from "./c2s";
import {UUID} from "crypto";

// First number is a packet count
// Second parameter is a random UUID
export type ResponseID = `${number}-${UUID}`;

export interface BasePacket {
    // Response id. Game is using number but this API
    // is using UUID to avoid ID collision. The TW2 backend is simply
    // forwarding the 'id' field without type-checking
    id?: number | ResponseID;
}

export type BaseS2CPacket = BasePacket;

export type BaseInternalC2SPacket = BasePacket & {
    data: {
        tokenEmit?: string
    }
}

export type BaseC2SPacket = Omit<BaseInternalC2SPacket, "id" | "data">;


export type C2SPacket = AuthLoginC2SPacket | AuthReconnectC2SPacket | AuthSelectCharacterC2SPacket | AuthCreateCharacterC2SPacket // Authentication
        | GameGetGameDataC2SPacket // Game data
        | CharacterGetProfileC2SPacket | CharacterSetProfileC2SPacket | CharacterGetInfoC2SPacket // Character
        | TribeGetMemberListC2SPacket // Tribe
        | TribeSkillDonateC2SPacket | TribeSkillMassDonatingC2SPacket // TribeSkill
        | VillageGetVillageDataC2SPacket // Village
        | MapGetVillagesByAreaC2SPacket | MapGetVillageDetailsC2SPacket // Map
        | GameGuardSendInfoC2SPacket // GameGuard (probably game anticheat)
        | WheelEventSpinC2SPacket | WheelEventGetProgressC2SPacket | WheelEventRefillC2SPacket | WheelEventStartEventC2SPacket | WheelEventGetEventC2SPacket // Wheel Event
        | PremiumUseItemC2SPacket | PremiumListItemsC2SPacket // Premium
        | ChatTribeC2SPacket // Tribe Chat
        | MessageReplyC2SPacket | MessageWriteC2SPacket | MessageKickC2SPacket | MessageAddParticipantsC2SPacket // Messages
        | OverviewGetVillagesC2SPacket | OverviewGetIncomingC2SPacket // Overview
        | DailyUnitDealAcceptC2SPacket // DailyUnitDeal
        | TutorialStartC2SPacket | TutorialGetVillageToAttackC2SPacket | TutorialStartTaskC2SPacket // Tutorial


export type S2CPacket = MessageErrorS2CPacket | SystemWelcomeS2CPacket | SystemErrorS2CPacket // System
        | AuthReconnectedS2CPacket | AuthCharacterSelectedS2CPacket | LoginSuccessS2CPacket // Authentication
        | GameDataS2CPacket // Game Data
        | TribeSkillDonatedS2CPacket // TribeSkill
        | CharacterProfileS2CPacket // Character
        | TribeMemberListS2CPacket // Tribe
        | VillageDataS2CPacket // Village
        | MapVillageDataS2CPacket | MapVillageDetailsS2CPacket // Map
        | GameGuardSendInfoS2CPacket | GameGuardGetInfoS2CPacket | GameGuardSecretTokenRefreshS2CPacket | GameGuardGetMobileInfoS2CPacket // GameGuard (probably game anticheat)
        | PremiumItemUsedS2CPacket | PremiumItemsS2CPacket // Premium
        | WheelEventSpunS2CPacket | WheelEventProgressS2CPacket // Wheel Event
        | ChatTribeS2CPacket // Tribe Chat
        | MessageNewS2CPacket | MessageSentS2CPacket | MessageCharacterKickedS2CPacket // Messages
        | OverviewVillagesS2CPacket | OverviewIncomingS2CPacket // Overview
        | DailyUnitDealAcceptedS2CPacket // DailyUnitDeal
        | CommandIncomingS2CPacket | CommandCancelledS2CPacket // Command
