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
import { getPremiumSets, getSetLiveVersionAsync, getSetsConfigAsync, isNewer, isSetPremium } from '../../utils'
import { doIOwnSet, getMyOwnedSetsAsync } from '../auth/Auth'
import { getDocInCollection } from '../online-database/Database'


export function getAllRaceNames() {
    return OverallData.Races
}
export function getRaceLocal(raceName) {
    return Races[raceName]
}
export function raceExists(raceName) {
    return OverallData.Races.includes(raceName)
}

export async function getRaceFromDatabase(raceName) {
    const raceBase = getRaceLocal(raceName)
    const raceSet = raceBase.Set ?? raceBase.set ?? 'basic'
    const isPremium = isSetPremium(raceSet)

    if (!isPremium) {
        return raceBase
    }

    let race = raceBase
    try {
        race = await getDocInCollection()
    } catch(e) {

    }
    // TODO
}
async function updateCachedRacesFromSet(setName) {
    if (!isSetPremium(setName)) {
        return
    }
    if (!(await doIOwnSet(setName))) {
        console.green(`I do not own set ${setName}`)
        return
    }


    console.green(`I own set ${setName}`)

    // Get and compare cached version with live version
    const liveSetsConifg = await getSetsConfigAsync()
    const setCfgCacheExists = await cache.existsAsync('sets-config')
    const cachedSetsConfig = setCfgCacheExists? await cache.getAsync('sets-config'): { versions: {} }

    const setLiveVersion = liveSetsConifg.versions[setName]
    const setCachedVersion = cachedSetsConfig.versions[setName]

    console.log({liveSetsConifg, setCfgCacheExists, cachedSetsConfig, setLiveVersion, setCachedVersion})

    if (isNewer(setLiveVersion, setCachedVersion)) {
        console.green(`  Yes newer ${setLiveVersion} than ${setCachedVersion}`)
        const res = await getDocInCollection('game-products', `${setName}-races`)
        const racesObj = res.content

        console.log({res, racesObj})
        for (const race of Object.values(racesObj)) {
            await cache.setAsync(race.Race, race)
        }
    } else {
        console.green(`  Not newer ${setLiveVersion} than ${setCachedVersion}`)
    }
}

async function updateCachedRaces() {
    const mySets = await getMyOwnedSetsAsync()

    for (const setName of mySets) {
        await updateCachedRacesFromSet(setName)
    }
}

window.updateCachedRaces = updateCachedRaces


export async function getRaceAsync(raceName) {
    if (!raceExists(raceName)) {
        return null
    }

    const raceBase = Races[raceName]
    const raceSet = raceBase.Set ?? raceBase.set ?? 'basic'
    const isPremium = isSetPremium(raceSet)

    if (!isPremium) {
        return Races[raceName]
    }

    if (!doIOwnSet(raceSet)) {
        return Races[raceName]
    }

    const existsInCache = await cache.existsAsync(raceName)
    if (!existsInCache) {
        await updateCachedRacesFromSet(setName)   
    }
    return await cache.getAsync(raceName)
}
window.getRaceAsync = getRaceAsync




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






window.getAllRaceNames = getAllRaceNames