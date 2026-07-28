import Bertle from '../../databases/Races/Bertle.json'
import Dwarf from '../../databases/Races/Dwarf.json'
import Elf from '../../databases/Races/Elf.json'
import Gnome from '../../databases/Races/Gnome.json'
import Human from '../../databases/Races/Human.json'

import Dragonborn from '../../databases/Core/Races/Dragonborn.json'
import Hollow from '../../databases/Core/Races/Hollow.json'
import Orc from '../../databases/Core/Races/Orc.json'

import cache from '../data-caching/cache'

import OverallData from '../../databases/OverallData.json'
import { getSetFeatureId, getSetLiveVersionAsync, getSetsConfigAsync, isNewer, isSetFreeAsync, isSetPremiumAsync } from '../../utils'
import { doIOwnSet, getMyOwnedSetsAsync, isSetUnavailableAsync } from '../auth/Auth'
import { getDocInCollection } from '../online-database/Database'
import { maybeUpdateSetFeatureCache } from './content-cache-updater'
import { classExists, getClassLocal } from './ClassProvider'
import { FEATURES, getFeatureItemAsync } from './ContentProvider'

const RacesBase = {
    Bertle,
    Dwarf,
    Elf,
    Gnome,
    Human,
}
const RacesPremium = {
    Dragon: Dragonborn,
    Hollow,
    Giant: Orc,
}
const Races = {
    ...RacesBase,
    ...RacesPremium
}


export function getAllRaceNames() {
    return OverallData.Races
}
export function getRaceLocal(raceName) {
    return Races[raceName]
}
export function raceExists(raceName) {
    return OverallData.Races.includes(raceName)
}

export async function getRaceAsync(raceName) {
    return await getFeatureItemAsync(FEATURES.Races, raceName)
}
window.getRaceAsync = getRaceAsync










window.getAllRaceNames = getAllRaceNames