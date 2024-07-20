# TribalWars2 API Wrapper
API Wrapper for [TribalWars2.com](https://tribalwars2.com) in TypeScript. Missing many types for game packets, but essential components are ready to start doing something concrete with this library.

## Examples
```ts
import { TribalWarsClient } from "@epicplayera10/tribalwars-api";

let tribalClient = new TribalWarsClient();

tribalClient.on("ready", async () => {
    console.log("Tribalwars client is ready!");
});

// Connect
await tribalClient.connect({
    login: "someusername",
    password: "somepasswd",
    characterId: 123,
    worldId: 456,
});

// Send message to someone
await tribalClient.sendPacket({
    type: "Message/reply",
    data: {
        message_id: 123, // Message ID
        message: "Hello world!"
    }
}, false);
```
