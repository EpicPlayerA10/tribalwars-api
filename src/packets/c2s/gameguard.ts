import {BaseC2SPacket} from "../packets";

export type GameGuardSendInfoC2SPacket = Readonly<BaseC2SPacket & {
    type: "GameGuard/sendInfo",
    data: {
        // Basically in this field there are all properties of 'window' parameter. They are serialized to JSON, and this JSON is sent as a string
        domTree: string
        // Return value of this code is fed to this field: document.getElementsByTagName('html')[0].innerHTML
        html: string
        // Click Tracker: JSON.stringify(clickTrackerToSend)
        clickTracker: string
        // Some ID received from the server
        checkId: number
    }
}>