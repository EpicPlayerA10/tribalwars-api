// S2C
import {MessageErrorS2CPacket, SystemErrorS2CPacket, SystemWelcomeS2CPacket} from "./s2c/message";
import {AuthCharacterSelectedS2CPacket, AuthReconnectedS2CPacket, LoginSuccessS2CPacket} from "./s2c/authentication";
import {TribeSkillDonatedS2CPacket} from "./s2c/tribeskill";
import {CharacterProfileS2CPacket} from "./s2c/character";
import {GameDataS2CPacket} from "./s2c/gamedata";

// C2S
import {AuthLoginC2SPacket, AuthReconnectC2SPacket, AuthSelectCharacterC2SPacket} from "./c2s/authentication";
import {GameGetGameDataC2SPacket} from "./c2s/gamedata";
import {CharacterGetProfileC2SPacket} from "./c2s/character";

export interface BasePacket {
    id?: number; // Response id

}

export type S2CPacket = MessageErrorS2CPacket | SystemWelcomeS2CPacket | SystemErrorS2CPacket | // Message
        AuthReconnectedS2CPacket | AuthCharacterSelectedS2CPacket | LoginSuccessS2CPacket | // Authentication
        GameDataS2CPacket | // Game Data
        TribeSkillDonatedS2CPacket | // TribeSkill
        CharacterProfileS2CPacket; // Character


export type C2SPacket = AuthLoginC2SPacket | AuthReconnectC2SPacket | AuthSelectCharacterC2SPacket | // Authentication
        GameGetGameDataC2SPacket | // Game data
        CharacterGetProfileC2SPacket; // Character
