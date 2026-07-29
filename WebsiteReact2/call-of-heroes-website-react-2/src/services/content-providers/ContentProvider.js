import { getSetFeatureId, isSetPremiumAsync } from "../../utils"
import { doIOwnSetAsync } from "../auth/Auth"
import { classExists, getClassLocal } from "./ClassProvider"
import { maybeUpdateSetFeatureCache } from "./content-cache-updater"
import { getRaceLocal, raceExists } from "./RaceProvider"

import cache from '../data-caching/cache'
import { useEffect, useState } from "react"

export const FEATURES = {
    Races: 'races',
    Classes: 'classes'
}


export async function featureItemExists(featureName, itemName) {
    switch (featureName) {
        case 'races': return raceExists(itemName)
        case 'classes': return classExists(itemName)
        default:
            console.error(`Feature ${featureName} not implemented for featureItemExists!`)
            return false
    }
}
export function getFeatureItemLocal(featureName, itemName) {
    switch (featureName) {
        case 'races': return getRaceLocal(itemName)
        case 'classes': return getClassLocal(itemName)
        default:
            console.error(`Feature ${featureName} not implemented for getFeatureItemLocal!`)
            return null
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
    const iOwnSet = await doIOwnSetAsync(setName)

    if (!isPremium) {
        console.log({itemLocalVersion, Set: itemLocalVersion.Set, set: itemLocalVersion.set})
        console.green(`  ❌ Set ${setName} not premium`)
        return itemLocalVersion
    }
    if (!iOwnSet) {
        console.green(`  ❌ I don't own set`)
        return itemLocalVersion
    }
    console.green(`  ✅ Checking cache`)
    await maybeUpdateSetFeatureCache(setName, featureName)
    const featureId = getSetFeatureId(setName, featureName)     // E.g. core-races
    const thisSetItems = await cache.getAsync(featureId)
    return thisSetItems[name]
}

export function useFeatureItem(featureName, itemName) {
    const [innerItem, setInnerItem] = useState(getFeatureItemLocal(featureName, itemName))

    useEffect(() => {
        (async () => {
            const fullItem = await getFeatureItemAsync(featureName, itemName)
            setInnerItem(fullItem)
        })()
    }, [featureName, itemName])

    return innerItem
}

window.getFeatureItemAsync = getFeatureItemAsync