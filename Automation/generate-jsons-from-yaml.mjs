

// Use this script to convert all ./Design/ files to their JSON variant in WebsiteReact/call-of-heroes-react-static/src/databases
// NOTE 1: This does NOT remove the < and ~ symbols from the spell names!
// NOTE 3: This DOES YES add the Name property to all Spells (or at least it should)


/*
    Removed:
        - Removed inherit
        - Removed recording abilities
        - Removed OverallData
*/

import fs from 'fs'
import * as yaml from 'yaml'
import path from 'path'

import STATIC_SYMBOLS from './parse-text-symbols-static.json' with { type: 'json' }
import * as STATS_STATIC from './stats-constants.mjs'
import { accessObjectProp, addError, addNameToSpellsRecursively, assertAbilityHasCorrectProps, assertObjectHas, assertObjectHasNot, findAllYAMLFiles, forEachFoundAbility, getNErrorsFound, getObjectValueByFuzzyKey, isSpellName, looksLikeSpell, objectEntriesByFuzzyKey, readAndNormalizeYamlToJson, replaceAllWithExceptions, REPLACEMENTS, replaceOnly, STATUS_EFFECTS, stringHasAnyOfChars, validateClass, validateAndFixMonstersFile, validateRace, assertAbilityHasCorrectValues, includesAny, deleteKeys, isObject, iterateObject, isString, capitalizeFirstLetter, previewObject, getAllSetsOfContent, branchContentIntoSets, removeAllSpellTildes } from './automation-utils.mjs'

import SETS from './sets-config.json' with { type: 'json' }

const yamlRootFolder = '../Design'
const jsonRootFolder = '../WebsiteReact2/call-of-heroes-website-react-2/src/databases'

const args = process.argv.slice(2)
const shouldGenerateAll = args.includes('--all') || args.includes('-a')
const isHelpCommand = args.includes('--help') || args.includes('-h') || args.includes('help') || args.length == 0
const includeEarlyAccess = args.includes('--early-access') || args.includes('-ea')
const isLocalOnly = args.includes('--local-only') || args.includes('-lo')

if (isHelpCommand) {
    console.log(`\n🔰 Use as:`)
    console.log(`> node generate-jsons-from-yaml.mjs --all`)
    console.log(`> node generate-jsons-from-yaml.mjs Monsters Races Artificer Core (by parts of the path)`)
    process.exit()
}
console.log(`\n\n🚛 Running generate-jsons-from-yaml...`)
console.log(`🟪 NOTE: Including all early access content. Don't forget to remove them during the build!`)


function stripEarlyAccessContent(obj) {
    if (includeEarlyAccess) {
        return
    }
    const tiersToRemove = [7, 8, 9, 10].map(int => `Level ${int}`)

    deleteKeys(obj, (key, value, path) => {
        if (key == null || value == null || path == null) {
            return false
        }
        const pathParts = path.split('.')
        const level = pathParts.length

        // Talents
        if (path.includes('Talents')) {
            if (includesAny(key, tiersToRemove)) {
                return true
            }
        }

        // Generic
        if (isObject(value) && value?.IsEarlyAccess === false || value?.Tags?.toString()?.includes('Early Access') == true) {
            return true
        }
        return false
    })
}
function stripContentOfFeatures(obj, keysToStrip=[], { includeOnlyFileNames, config, fileName, fileNameNoExt, fileDir }) {
    const newObj = {...obj}

    const shouldStrip =
        includeOnlyFileNames == null?
            true
        :
            includeOnlyFileNames.some(includeFileName => fileDir.includes(includeFileName))
    
    if (shouldStrip) {
        for (const key of keysToStrip) {
            delete newObj[key]
        }
    }

    // Strip Talents -- REMOVE THIS WHEN EARLY ACCESS IS FINISHED
    stripEarlyAccessContent(obj)

    return newObj
}
function stripPremiumContentOfFeatures(obj, { config, fileName, fileNameNoExt, fileDir, filePath }) {
    let strippedObj = stripContentOfFeatures(structuredClone(obj), [
        'Other Abilities',
        'Utility',
        'Talents',
        'Specs',
    ], { config, fileName, fileNameNoExt, fileDir, filePath })

    deleteKeys(strippedObj, (key, value, path) => {
        if (key == null || value == null || path == null) {
            return false
        }
        const isFromAnyPremiumSet = value.Set != null && value.Set != 'basic'
        if (isObject(value) && isFromAnyPremiumSet) {
            return true
        }
        return false
    })

    return strippedObj
}

// Polulated at runtime
const classRaceAbilities = {} 
const weapons = {}
const armors = {}

// Will be modified just below, for sets
let filesToConvert = []

// Get files to convert
for (const [setId, config] of Object.entries(SETS)) {
    const { name, fileNames} = config
    
    filesToConvert = [...filesToConvert, ...fileNames.map(fp => ({
        setName: name,
        relativePath: path.join(yamlRootFolder, fp),
        filePath: fp,
        ...config
    }))]
}
if (!shouldGenerateAll) {
    filesToConvert = filesToConvert.filter(({setName, relativePath, config, filePath}) => process.argv.some(arg => filePath.includes(arg)))
}
function maybeMakeSomeWordsMixins(subobj, parentKey=null) {
    if (subobj == null || subobj?._alreadyHasSomeWordsMixins) {
        return
    }
    const propsToCheck = ['Effect', 'Upgrade', 'Notes', 'EffectGreen', 'Downside', 'Combo']
    for (const prop of propsToCheck) {
        if (isString(subobj)) {
            console.log(`🤍 Found string key "${parentKey}" value "${subobj}"`)
        }
        if (!(prop in subobj)) {
            continue
        }
        for (const [substr, value] of Object.entries(REPLACEMENTS)) {
            const { replaceWith, exceptions } = value
            subobj[prop] = replaceAllWithExceptions({
                text: subobj[prop],
                substring: substr,
                exceptions,
                replaceWith
            })
        }
    }
    subobj._alreadyHasSomeWordsMixins = true
}
function maybeAddStatusEffectDescriptions(subobj) {
    if (subobj == null || subobj?._alreadyHasStatusEffectDescriptions) {
        return
    }

    const propsToCheck = ['Effect', 'Upgrade', 'Notes', 'EffectGreen', 'Downside', 'Combo']
    const totalPropsText = propsToCheck.map(prop => subobj[prop]?.toString() ?? '')?.join('\n') ?? ''
    const statusEffectsItHas = STATUS_EFFECTS.filter(se => totalPropsText.includes(se))
    const allStatusEffectsText = statusEffectsItHas.map(se => STATIC_SYMBOLS[se]?.text).join('\n')
    if (allStatusEffectsText == null || allStatusEffectsText.trim().length == 0) {
        return
    }
    if (subobj.Notes == null) {
        subobj.Notes = allStatusEffectsText
    } else {
        subobj.Notes += '\n' + allStatusEffectsText
    }
    subobj._alreadyHasStatusEffectDescriptions = true
}
function maybeAddHasMixins(subobj) {
    if (subobj == null) {
        return
    }
    let didAddHasMixins = false
    const propsToCheck = ['Effect', 'Upgrade', 'Notes', 'EffectGreen', 'Downside', 'Combo']
    for (const propName of propsToCheck) {
        const propValue = subobj[propName]
        if (propValue == null || typeof(propValue) !== 'string') {
            continue
        }
        
        if (stringHasAnyOfChars(propValue || '', '{^_~')) {
            subobj.HasMixins = true
            didAddHasMixins = true
        }
    }
    if (subobj.List?.length > 0) {
        for (const li of subobj.List) {
            if (stringHasAnyOfChars(li || '', '{^_~')) {
                subobj.HasMixins = true
                didAddHasMixins = true
            }
        }
    }
    return didAddHasMixins
}

// Records if toDict isn't null (give it null so it just adds mixins)
function findAndRecordAllAbilities(fromDict, toDict, parentKey=null, origin='Unknown', debugKey=null) {
    if (fromDict == null) {
        console.red(`fromDict is ${fromDict}`)
    }
    forEachFoundAbility(fromDict, (name, body, parentKey) => {
        if (toDict != null) {
            toDict[name] = body;
        }


        // TODO: Fix the tildes cause it's making life hard.
        // TODO: For each class, list what spells it has and their path and such. Might make things easier...


    })
}





function branchCompositeMonsters(obj, params) {
    const { fileConfig, config, fileName, fileNameNoExt, fileDir, filePath } = params
    
    const foundSets = getAllSetsOfContent(obj)
    const branchesBySet = Object.fromEntries(foundSets.map(setName => ([setName, {}])))
    for (const [monsterName, monster] of Object.entries({...obj})) {
        if (monster.Set == null) {
            continue
        }
        branchesBySet[monster.Set][monsterName] = structuredClone(monster)
        const strippedMonsterObj = deleteKeys(monster, (key, value, path) => !['Set', 'Type', 'Experience', 'Degree', 'Tags'].includes(key))
        obj[monsterName] = strippedMonsterObj
    }

    return [obj, branchesBySet]
}
const PROCESS_STRATEGIES = {
    'Feats': obj => {
        const objNoTildes = removeAllSpellTildes(obj)
        return objNoTildes
    },
    'Font': obj => {
        forEachFoundAbility(obj, (name, spell) => {
            spell.ScrollPower = 'Auto'
            spell.HasMixins = true
        })
        const objNoTildes = removeAllSpellTildes(obj)
        return objNoTildes
    },
    'Armor': (obj, { fileName }) => {
        findAndRecordAllAbilities(obj, armors, null, fileName, null)
        const objNoTildes = removeAllSpellTildes(obj)
        return objNoTildes
    },
    'Weapon': (obj, { fileName }) => {
        findAndRecordAllAbilities(obj, weapons, null, fileName, null)
        const objNoTildes = removeAllSpellTildes(obj)
        return objNoTildes
    },
    'Prices': obj => {
        const weaponPricesKvp = Object.entries(weapons).map(([key, value]) => (
            [key, value.Price]
        )).filter(([key, price]) => price != null)
        const weaponPrices = Object.fromEntries(weaponPricesKvp)
        const armorPricesKvp = Object.entries(armors).map(([key, value]) => (
            [key, value.Price]
        )).filter(([key, price]) => price != null)
        const armorPrices = Object.fromEntries(armorPricesKvp)
        obj['Weapons and Equipment'] = {
            ...obj['Weapons and Equipment'],
            ...weaponPrices,
            ...armorPrices
        }
        return obj
    },

    'Class': (obj, { fileName }) => {
        validateClass(obj)
        const objNoTildes = removeAllSpellTildes(obj)
        findAndRecordAllAbilities(objNoTildes, classRaceAbilities, null, `Class/${objNoTildes.Class}`);
        return objNoTildes
    },
    'Race': (obj, { fileName }) => {
        validateRace(obj)
        const objNoTildes = removeAllSpellTildes(obj)
        findAndRecordAllAbilities(objNoTildes, classRaceAbilities, null, `Race/${objNoTildes.Race}`);
        return objNoTildes
    },
    'Monsters': (obj, { fileName }) => {
        validateAndFixMonstersFile(obj)
        return obj
    }
}
function defaultOutputStrategy(obj, params={}) {
    const { fileConfig, config, fileName, fileNameNoExt, fileDir, filePath } = params

    // Strip Talents -- REMOVE THIS WHEN EARLY ACCESS IS FINISHED
    stripEarlyAccessContent(obj)

    const jsonString = JSON.stringify(obj, null, 4);
    const outputPath = path.join(jsonRootFolder, fileDir, `${fileNameNoExt}.json`);

    try {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, jsonString, 'utf-8');
    } catch (err) {
        console.red(`ERROR: Failed to write JSON to ${outputPath}`);
        throw err;
    }
}
function outputCompositeFile(objStripped, branchesBySet, params) {
    OUTPUT_STRATEGIES['default'](objStripped, params)

    for (const [setName, objForSet] of Object.entries(branchesBySet)) {
        const newFileDir = path.join(setName, params.fileDir)
        OUTPUT_STRATEGIES['premiumOnly'](objForSet, {...params, fileDir: newFileDir})
    }
}
let OUTPUT_STRATEGIES = {}
    OUTPUT_STRATEGIES = {

    'default': defaultOutputStrategy,

    'Monsters': (obj, params) => {
        const { config, fileName, fileNameNoExt, fileDir, filePath } = params
        const [objStripped, branchesBySet] = branchCompositeMonsters(obj, params)
        if (isLocalOnly) {
            outputCompositeFile(obj, branchesBySet, params)    
        } else {
            outputCompositeFile(objStripped, branchesBySet, params)
        }
    },

    'MagicItems': (obj, params) => {
        const { config, fileName, fileNameNoExt, fileDir, filePath } = params
        const [objStripped, branchesBySet] = branchContentIntoSets(obj)
        if (isLocalOnly) {
            outputCompositeFile(obj, branchesBySet, params)    
        } else {
            outputCompositeFile(objStripped, branchesBySet, params)
        }
    },

    'premium': (obj, params) => {
        const { config, fileName, fileNameNoExt, fileDir, filePath } = params

        // Strip and output normal
        let objStripped = stripPremiumContentOfFeatures(obj, { config, fileName, fileNameNoExt, fileDir, filePath })
        if (isLocalOnly) {
            OUTPUT_STRATEGIES['default'](obj, params)
        } else {
            OUTPUT_STRATEGIES['default'](objStripped, params)
        }
        
        // Output for premium
        OUTPUT_STRATEGIES['premiumOnly'](obj, params)
    },

    'premiumOnly': (obj, params) => {
        const { setName, config, fileName, fileNameNoExt, fileDir, filePath } = params
        
        
        const jsonString = JSON.stringify(obj, null, 4);
        const premiumOutputPath = path.join('GeneratedPremiumFiles', fileDir, `${fileNameNoExt}.json`)
        console.log(`  Writing to: ${premiumOutputPath}`)
        try {
            fs.mkdirSync(path.dirname(premiumOutputPath), { recursive: true });
            fs.writeFileSync(premiumOutputPath, jsonString, 'utf-8');
        } catch (err) {
            console.red(`ERROR: Failed to write JSON to ${premiumOutputPath}`);
            throw err;
        }
    }
}



async function processFiles() {
    const filesLastUpdated = JSON.parse(fs.readFileSync('files-last-updated.json', 'utf-8'));
    let nFilesSkipped = 0

    for (const fileConfig of filesToConvert) {
        const { setId, setName, filePath, relativePath } = fileConfig
        const fileExtension = path.extname(filePath)
        const fileNameNoExt = path.parse(filePath).name;
        const fileName = fileNameNoExt + '.' + fileExtension
        const fileDir = path.dirname(filePath);
        
        // Read from file
        console.log(`Parsing ${fileName}...`);
        let dictContent
        try {
            dictContent = readAndNormalizeYamlToJson(relativePath)
        } catch (e) {
            addError()
            throw e
        }
        // Validate and normalize
        forEachFoundAbility(dictContent, (name, body, parentKey) => {
            // Validate
            assertAbilityHasCorrectProps(name, body)
            assertAbilityHasCorrectValues(name, body)

            // Normalize
            maybeMakeSomeWordsMixins(body, name)
            maybeAddStatusEffectDescriptions(body)
            const didAddHasMixins = maybeAddHasMixins(body)
            body.ParentKey = parentKey
            body.Origin = filePath
        })

        // Apply the preprocessing strategy
        const processStrategyFuncs = objectEntriesByFuzzyKey(PROCESS_STRATEGIES, filePath)
        for (const [fuzzyKey, func] of processStrategyFuncs) {
            dictContent = func?.(dictContent, { fileName, fuzzyKey })
        }

        // Output
        const writeOutput =
            fileConfig.isPremium?
                OUTPUT_STRATEGIES.premium
            :OUTPUT_STRATEGIES[fileNameNoExt] != null?
                OUTPUT_STRATEGIES[fileNameNoExt]
            :OUTPUT_STRATEGIES.default

        writeOutput(dictContent, { config: fileConfig, fileName, fileNameNoExt, fileDir, filePath })
    }

    if (shouldGenerateAll) {
        try {
            fs.writeFileSync(
                path.join(jsonRootFolder, 'ClassAndRaceAbilities.json'),
                JSON.stringify(classRaceAbilities, null, 4),
                'utf-8'
            );
        } catch (err) {
            console.red('ERROR: Failed to write summary JSON files:', err);
            throw err;
        }
    }

    fs.writeFileSync('files-last-updated.json', JSON.stringify(filesLastUpdated))

    console.log(`\nSkipped ${nFilesSkipped} files. Run with --all to not skip.`)
}


processFiles()

if (getNErrorsFound() > 0) {
    console.log(`🔴 Found ${getNErrorsFound()} errors!`)
} else {
    console.log(`✅ No errors found\n`)
}

if (includeEarlyAccess) {
    console.log(`🟪 NOTE: Included all early access content! Not for prod!`)
}
if (isLocalOnly) {
    console.log(`🟡 WARNING: All premium content generated on localhost! Run without --local-host before deploy to prod!`)
}