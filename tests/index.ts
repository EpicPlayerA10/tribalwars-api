import dotenv from "dotenv";
import {TribalWarsClient} from "../src";

dotenv.config();

let client = new TribalWarsClient(process.env.LOGIN as string, process.env.PASSWORD as string,
        process.env.CHARACTER_ID as unknown as number, process.env.CHARACTER_WORLD_ID as string);
client.on("ready", async () => {
    console.log("Ready!")

    let response2 = await client.sendPacket({
        type: "GameDataBatch/getGameData"
    });

    console.log("GAMEDATA");
    console.log(response2);
});

client.on("onPacketReceived", packet => {
    console.log("[RECEIVED] "+packet.type)
})




