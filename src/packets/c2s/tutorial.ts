import {BaseC2SPacket} from "../packets";

export type TutorialStartC2SPacket = Readonly<BaseC2SPacket & {
    type: "Tutorial/start"
}>

export type TutorialGetVillageToAttackC2SPacket = Readonly<BaseC2SPacket & {
    type: "Tutorial/getVillageToAttack",
    data: {
        x: number
        y: number
    }
}>

export type TutorialStartTaskC2SPacket = Readonly<BaseC2SPacket & {
    type: "Tutorial/startTask"
}>