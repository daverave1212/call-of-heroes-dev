import { getAllSetNamesWithPackageAsync, getSetFeatureId, isSetPremiumAsync } from "../../utils"
import { doIOwnSetAsync } from "../auth/Auth"
import { classExists, getClassLocal } from "./ClassProvider"
import { maybeUpdateSetFeatureCache } from "./content-cache-updater"
import { getRaceLocal, raceExists } from "./RaceProvider"

import cache from '../data-caching/cache'
import { useEffect, useState } from "react"
import { showToast } from "../dom/toaster"
import { getMonstersLocal, getOtherLocal } from "./OtherProvider"

export const FEATURES = {
    Races: 'races',
    Classes: 'classes',
    Other: 'other'
}


export async function featureItemExists(featureName, itemName) {
    console.log(`Checking feature item ${featureName} ${itemName} exists...`)
    switch (featureName) {
        case 'races': return raceExists(itemName)
        case 'classes': return classExists(itemName)
        case 'other': return true
        default:
            console.error(`Feature ${featureName} not implemented for featureItemExists!`)
            return false
    }
}
export function getFeatureItemLocal(featureName, itemName) {
    switch (featureName) {
        case 'races': return getRaceLocal(itemName)
        case 'classes': return getClassLocal(itemName)
        case 'other': return getOtherLocal(itemName)    // E.g. 'Monsters'
        default:
            console.error(`Feature ${featureName} not implemented for getFeatureItemLocal!`)
            return null
    }
}

// E.g: getFeatureItemAsync("races", "Dragon")
// E.g: getFeatureItemAsync("classes", "Sorcerer")
// E.g: getFeatureItemAsync("other", "Monsters")
export async function getFeatureItemAsync(featureName, name) {
    console.log(`Getting ${featureName} ${name}`)
    if (!featureItemExists(featureName, name)) {
        console.log('...not exist')
        return null
    }

    console.log(`  ✅ Exists`)
    const itemLocalVersion = getFeatureItemLocal(featureName, name)
    switch (featureName) {
        // Normal
        case 'races':
        case 'classes':
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
        
        // Composite: a feature item composed from multiple sets
        case 'other':
            let compositeFeature = {...getOtherLocal(name)}

            const setNamesWithPackage = await getAllSetNamesWithPackageAsync('Other')

            console.log({compositeFeature, setNamesWithPackage})
            for (const setName of setNamesWithPackage) {
                await maybeUpdateSetFeatureCache(setName, 'other')
                const isPremium = await isSetPremiumAsync(setName)
                const iOwnSet = await doIOwnSetAsync(setName)
                if (!isPremium || !iOwnSet) {
                    continue
                }
                const featureId = getSetFeatureId(setName, 'other')     // E.g. core-other
                const thisSetItems = await cache.getAsync(featureId)
                const thisSetItem = thisSetItems[name]
                compositeFeature = {...compositeFeature, ...thisSetItem}
            }

            return compositeFeature
    }
}


// This is the most important function, the hook
// featureName: Folder
// itemName: JSON file name
// subitemName: the immediate property of the innerItem
export function useFeatureItem(featureName, itemName, subitemName=null) {
    const [isLoading, setIsLoading] = useState(true)
    const [innerItem, setInnerItem] = useState(getFeatureItemLocal(featureName, itemName))

    useEffect(() => {
        (async () => {
            try {
                const fullItem = await getFeatureItemAsync(featureName, itemName)
                setInnerItem(fullItem)
            } catch (e) {
                console.error(e)
                showToast(e, 'red')
            } finally {
                setIsLoading(false)
            }
        })()
    }, [featureName, itemName])

    if (subitemName) {
        return [innerItem?.[subitemName], isLoading]
    }

    return [innerItem, isLoading]
}

window.getFeatureItemAsync = getFeatureItemAsync