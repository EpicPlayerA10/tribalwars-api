import dotenv from "dotenv";
import {TribalWarsClient} from "../src";

dotenv.config();

let client = new TribalWarsClient();

client.on("ready", async () => {
    console.log("Ready!");

    let response = await client.sendPacket({
        type: "Map/getVillagesByArea",
        data: {
            //character_id: 906567,
            x: 500,
            y: 500,
            height: 50,
            width: 50
        }
    });

    console.log(response);

    /*let response = await client.sendPacket({
        type: "VillageBatch/getVillageData",
        data: {
            village_ids: [2904]
        }
    });

    console.log(response);*/

    /*let response2 = await client.sendPacket({
        type: "GameDataBatch/getGameData"
    });

    console.log("GAMEDATA");

    if (response2.type === "GameDataBatch/gameData") {
        console.log("validated gamedata");
        console.log(response2);
    }*/

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


