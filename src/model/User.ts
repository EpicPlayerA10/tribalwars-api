import {LoginSuccessS2CPacket} from "../packets/s2c";

export class User {
    public readonly player_id: number;
    public readonly name: string;
    public readonly token: string;
    public readonly characters: LoginSuccessS2CPacket["data"]["characters"];

    constructor(loginSuccessPacket: LoginSuccessS2CPacket) {
        this.player_id = loginSuccessPacket.data.player_id;
        this.name = loginSuccessPacket.data.name;
        this.token = loginSuccessPacket.data.token;
        this.characters = loginSuccessPacket.data.characters;
    }
}