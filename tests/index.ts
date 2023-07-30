import dotenv from "dotenv";
import {TribalWarsClient} from "../src";

dotenv.config();

let client = new TribalWarsClient();

client.on("ready", async () => {
    console.log("Ready!")

    let response2 = await client.sendPacket({
        type: "GameDataBatch/getGameData"
    });

    console.log("GAMEDATA");

    if (response2.type === "GameDataBatch/gameData") {
        console.log("validated gamedata");
    }

});

client.on("onPacketReceived", packet => {
    console.log("[RECEIVED] "+packet.type);
})

client.connect({
    login: process.env.LOGIN as string,
    password: process.env.PASSWORD as string,
    characterId:  process.env.CHARACTER_ID as unknown as number,
    worldId: process.env.CHARACTER_WORLD_ID as string
});


