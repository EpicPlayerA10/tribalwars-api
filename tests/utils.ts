import {PacketGameData, PacketVillage, TribalWarsClient, UnitTypes} from "../src";

export interface Position {
    x: number
    y: number
}

export interface Army {
    units: {
        [unit in UnitTypes]: number // Amount
    }
    officers: {
        [officer: string]: boolean // Active
    }
}

export interface OptFlags {
    officers?: boolean
    effects?: boolean
}

export function actualDistance(start: Position, end: Position) {
    let dy = start.y - end.y;
    let dx = start.x - end.x;

    if (dy % 2) {
        dx += start.y % 2 ? 0.5 : -0.5;
    }

    return Math.sqrt(dx * dx + dy * dy * 0.75);
}

/*function calculateArmy(client: TribalWarsClient, army: Army, opt_flags: OptFlags, opt_commandType: string, opt_village: PacketVillage) {
    let village				= opt_village
    let units				= client.gameData!["GameData/units"]
    let load				= 0
    let recruitingTime		= 0
    let attack				= 0
    let defArc				= 0
    let defInf				= 0
    let defCav				= 0
    let loadboost			= 1
    let loadboosts
    let effectValue
    let i;

    if (!army) {
        return;
    }

    let useOfficers = true;
    let useEffects = true;
    if (opt_flags) {
        if (opt_flags.officers) {
            useOfficers = opt_flags.officers;
        }
        if (opt_flags.effects) {
            useEffects = opt_flags.effects;
        }
    }

    // units exist in the given army
    if (army.units) {
        let unitName: keyof PacketGameData["GameData/units"];
        for (unitName in units) {
            let unit = units[unitName];

            if (army.units[unitName] > 0) {
                load           += army.units[unitName] * unit.load;
                recruitingTime += recruitingService.calculateTime(army.units[unitName], unitName);
                attack         += army.units[unitName] * unit.attack;
                defArc         += army.units[unitName] * unit.def_arc;
                defInf         += army.units[unitName] * unit.def_inf;
                defCav         += army.units[unitName] * unit.def_kav;
            }
        }
    }

    if (useOfficers) {
        //add the officer load boost
        loadboosts = modelDataService.getOfficers().getDataForType('boost_carrying_capacity', army.officers);
        for (i = 0; i < loadboosts.length; i++) {
            loadboost += (loadboosts[i].bonus_percentage / 100);
        }
    }

    if (useEffects) {
        // increased carrying capacity effect
        effectValue = effectService.getStackedEffectValue(effectTypes.INCREASED_CARRYING_CAPACITY);
        if (effectValue) {
            loadboost *= effectValue;
        }
    }

    return {
        'load': Math.floor(load * loadboost),
        'recruitingTime': recruitingTime,
        'attack': attack,
        'defArc': defArc,
        'defInf': defInf,
        'defCav': defCav,
        'costs':  calculateCost(army.units, village),
        'travelTime': calculateTravelTime(army, opt_flags, opt_commandType),
        'discipline': calculateDiscipline(army)
    };
}*/