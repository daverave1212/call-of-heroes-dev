import { getAllFeatsByName } from "../../utils";
import { getAllClassSpellsByNameAsync, getAllClassSpellsByNameLocal, useConstAllClassSpellsByName } from "./ClassProvider";
import { getAllRaceSpellsByNameAsync, getAllRaceSpellsByNameLocal, useConstAllRaceSpellsByName } from "./RaceProvider";
import SpellFonts from './../../databases/SpellFonts.json'

let _fontSpellsByNameCached = null
export function getFontSpellsByName() {
    if (_fontSpellsByNameCached != null) {
        return _fontSpellsByNameCached
    }

    let spells = {}
    for (const spellsObj of Object.values(SpellFonts)) {
        spells = {...spells, ...spellsObj}
    }

    _fontSpellsByNameCached = spells
    
    return spells
}

export function useConstAllSpellsByName() {
    const classSpells = useConstAllClassSpellsByName()
    const raceSpells = useConstAllRaceSpellsByName()
    
    const fontSpells = getFontSpellsByName()
    const feats = getAllFeatsByName()

    return {
        ...classSpells,
        ...raceSpells,
        ...fontSpells,
        ...feats
    }
}

export async function getAllSpellsByNameAsync() {
    const classSpells = await getAllClassSpellsByNameAsync()
    const raceSpells = await getAllRaceSpellsByNameAsync()

    const fontSpells = getFontSpellsByName()
    const feats = getAllFeatsByName()

    return {
        ...classSpells,
        ...raceSpells,
        ...fontSpells,
        ...feats
    }
}

export function useConstAllSpellsArray() {
    const spellsByName = useConstAllSpellsByName()
    return Object.values(spellsByName)
}


export function getAllSpellsByNameLocal() {
    const classSpells = getAllClassSpellsByNameLocal()
    const raceSpells = getAllRaceSpellsByNameLocal()

    const fontSpells = getFontSpellsByName()
    const feats = getAllFeatsByName()

    return {
        ...classSpells,
        ...raceSpells,
        ...fontSpells,
        ...feats
    }
}

export function getAllSpellsAsArrayLocal() {
    return Object.values(getAllSpellsByNameLocal())
}