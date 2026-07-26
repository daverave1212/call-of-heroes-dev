import Bertle from '../../databases/Races/Bertle.json'
import Dwarf from '../../databases/Races/Dwarf.json'
import Elf from '../../databases/Races/Elf.json'
import Gnome from '../../databases/Races/Gnome.json'
import Human from '../../databases/Races/Human.json'

import Dragonborn from '../../databases/Core/Races/Dragonborn.json'
import Hollow from '../../databases/Core/Races/Hollow.json'
import Orc from '../../databases/Core/Races/Orc.json'

import OverallData from '../../databases/OverallData.json'

export function getAllRaceNames() {
    return OverallData.Races
}


export const RacesBase = {
    Bertle,
    Dwarf,
    Elf,
    Gnome,
    Human,
}
export const RacesPremium = {
    Dragon: Dragonborn,
    Hollow,
    Giant: Orc,
}
export const Races = {
    ...RacesBase,
    ...RacesPremium
}