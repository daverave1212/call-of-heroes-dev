import { getAllFeatsByName, getAllFontSpellsByName } from "../../utils";
import { useConstAllClassSpellsByName } from "./ClassProvider";
import { useConstAllRaceSpellsByName } from "./RaceProvider";


export function useConstAllSpellsByName() {
    const classSpells = useConstAllClassSpellsByName()
    const raceSpells = useConstAllRaceSpellsByName()
    
    const fontSpells = getAllFontSpellsByName()
    const feats = getAllFeatsByName()

    return {
        ...classSpells,
        ...raceSpells,
        ...fontSpells,
        ...feats
    }
}