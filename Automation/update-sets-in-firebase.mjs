

import { getTimestamp, getTodayString, readAllJsonsSync, readJson, writeJSONSync } from './automation-utils.mjs';
import { setDocument } from './Firebase/firebase.mjs';
import SETS from './sets.json' with { type: 'json' }
import FOLDER_STRUCTURE from './private-folder-structure.json' with { type: 'json' }
import path from 'path'


const SETS_ROOT = './GeneratedPremiumFiles'
const args = process.argv.slice(2);

if (args.length == 0 || args[0] == 'help') {
    console.log(`
    Use this script to push any modifications of premium sets to Firebase.
    Use like: node upload-sets-in-firebase.mjs core halloween cataclysm
    The script follows the data from ../sets.json.
    It can currently push the following features:
    - Races
    - Classes

    The setsConfig with versions is NOT uploaded to Firebase.
    Baseline, the config is generated in GeneratedPremiumFiles. That's its main place.
    
    Then, it is generated inside both the repo/public, and websiteRepo folders.
    It will be accessed as a static file as /setsConfig on the website.
    `)
    process.exit()
}

const today = getTimestamp()
const DEFAULT_SETS_CONFIG = {
    versions: Object.fromEntries(Object.keys(SETS).map(setId => ([setId, today])))
}
function makeConfig() {
    let setsConfig = null
    const setsConfigPath = path.join(SETS_ROOT, 'sets-config.json')
    const repoSetsConfigPath = path.join(FOLDER_STRUCTURE.repoPath, 'public', 'sets-config.json')
    const websiteRepoSetsConfigPath = path.join(FOLDER_STRUCTURE.websiteRepoPath, 'sets-config.json')
    
    try {
        setsConfig = readJson(setsConfigPath)
    } catch (e) {
        console.warn(`No sets-config found at ${SETS_ROOT}. Making one...`)
        setsConfig = DEFAULT_SETS_CONFIG
    }

    
    for (const setId of args) {
        setsConfig.versions[setId] = today
    }

    writeJSONSync(setsConfig, setsConfigPath)
    writeJSONSync(setsConfig, repoSetsConfigPath)
    writeJSONSync(setsConfig, websiteRepoSetsConfigPath)
}

async function updateSetAsync(setId) {
    const set = SETS[setId]
    const setPath = path.join(SETS_ROOT, set.name)

    if (!set.isPremium) {
        console.warn(`⚠ Set ${set.name} is not premium. Skipping.`)
        return
    }



    const uploads = []  // All these will be pushed to Firebase
    const today = getTimestamp()
    const setHasPackage = feature => set.packages.includes(feature)


    if (setHasPackage('Races')) {
        const objsArr = readAllJsonsSync(path.join(setPath, 'Races'))
        const objsEntries = objsArr.map(obj => ([obj.Race, obj]))
        const objsObj = Object.fromEntries(objsEntries)
        uploads.push({
            id: setId + '-races',
            productId: setId,
            name: set.name + ' Races',
            version: today,
            content: objsObj
        })
    }

    if (setHasPackage('Classes')) {
        const objsArr = readAllJsonsSync(path.join(setPath, 'Classes'))
        const objsEntries = objsArr.map(obj => ([obj.Class, obj]))
        const objsObj = Object.fromEntries(objsEntries)
        uploads.push({
            id: setId + '-classes',
            productId: setId,
            name: set.name + ' Classes',
            version: today,
            content: objsObj
        })
    }

    for (const upload of uploads) {
        await setDocument('game-products', upload.id, upload)
    }


}



for (const setId of args) {
    await updateSetAsync(setId)
}

makeConfig()