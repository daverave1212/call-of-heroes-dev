import cache from '../data-caching/cache'

import OverallData from '../../databases/OverallData.json'
import { getSetFeatureId, getSetLiveVersionAsync, getSetsConfigAsync, isNewer, isSetFreeAsync, isSetPremiumAsync } from '../../utils'
import { isSetUnavailableAsync } from '../auth/Auth'
import { getDocInCollection } from '../online-database/Database'



/*  
 *  E.g. maybeUpdateCachedFeatureFromPremiumSet('core', 'races', ...)
 *      Will take the "core-races" object from DB if it's a newer version than what is cached.
 *      Puts it in the cache as "core-races".
 */
export async function maybeUpdateSetFeatureCache(setName, featureName) {
    const featureId = getSetFeatureId(setName, featureName)

    const isFree = await isSetFreeAsync(setName)
    const isUnavailable = await isSetUnavailableAsync(setName)
    const shouldSkipSet = isFree || isUnavailable
        
    if (shouldSkipSet) {
        console.green(`    ❌ Set ${setName} should be skipped because isUnavailable=${isUnavailable}, isFree=${isFree} `)
        return
    }

    
    // Get and compare cached version with live version
    const liveSetsConifg = await getSetsConfigAsync()
    const setCfgCacheExists = await cache.existsAsync('sets-config')
    const cachedSetsConfig = setCfgCacheExists? await cache.getAsync('sets-config'): {}
    
    const setLiveVersion = liveSetsConifg[setName].version
    const setCachedVersion = cachedSetsConfig[setName]?.version

    const cachedSetExists = await cache.existsAsync(featureId)

    const shouldUpdateCache = isNewer(setLiveVersion, setCachedVersion) || !cachedSetExists

    if (!shouldUpdateCache) {
        console.green(`✔ Not newer ${setLiveVersion} than ${setCachedVersion}`)
        return
    }

    try {
        const res = await getDocInCollection('game-products', featureId)
        await cache.setAsync(featureId, res.content)
    } catch (e) {
        console.error(`ERROR: Failed to maybeUpdateCachedFeatureFromPremiumSet for set "${setName}" feature ${featureName} liveSetConfig ${liveSetsConifg} cachedSetsConfig ${cachedSetsConfig}`)
        throw e
    }
}

window.maybeUpdateCachedFeatureFromPremiumSet = maybeUpdateSetFeatureCache
