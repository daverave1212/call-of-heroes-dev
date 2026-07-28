import { getSetFeatureId, isSetPremiumAsync } from "../../utils"
import { doIOwnSet } from "../auth/Auth"
import { classExists, getClassLocal } from "./ClassProvider"
import { maybeUpdateSetFeatureCache } from "./content-cache-updater"
import { getRaceLocal, raceExists } from "./RaceProvider"

import cache from '../data-caching/cache'

export const FEATURES = {
    Races: 'races',
    Classes: 'classes'
}


export async function featureItemExists(featureName, itemName) {
    switch (featureName) {
        case 'races': return raceExists(itemName)
        case 'classes': return classExists(itemName)
    }
}
export function getFeatureItemLocal(featureName, itemName) {
    switch (featureName) {
        case 'races': return getRaceLocal(itemName)
        case 'classes': return getClassLocal(itemName)
    }
}

// E.g: getFeatureItemAsync("races", "Dragon")
// E.g: getFeatureItemAsync("classes", "Sorcerer")
// E.g: getFeatureItemAsync("monsters", "Cyclops")
export async function getFeatureItemAsync(featureName, name) {
    console.green(`Getting ${featureName} ${name}`)
    if (!featureItemExists(featureName, name)) {
        return null
    }

    console.green(`  ✅ Exists`)
    const itemLocalVersion = getFeatureItemLocal(featureName, name)
    const setName = itemLocalVersion.Set ?? itemLocalVersion.set ?? 'basic'
    const isPremium = await isSetPremiumAsync(setName)

    if (!isPremium) {
        console.log({itemLocalVersion, Set: itemLocalVersion.Set, set: itemLocalVersion.set})
        console.green(`  ❌ Set ${setName} not premium`)
        return itemLocalVersion
    }
    if (!doIOwnSet(setName)) {
        console.green(`  ❌ I don't own set`)
        return itemLocalVersion
    }
    console.green(`  ✅ Checking cache`)
    await maybeUpdateSetFeatureCache(setName, featureName)
    const featureId = getSetFeatureId(setName, featureName)     // E.g. core-races
    const thisSetItems = await cache.getAsync(featureId)
    return thisSetItems[name]
}

window.getFeatureItemAsync = getFeatureItemAsync