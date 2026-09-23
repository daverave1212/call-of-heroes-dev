

// Use this script to convert all ./Design/ files to their JSON variant in WebsiteReact/call-of-heroes-react-static/src/databases
// NOTE 1: This does NOT remove the < and ~ symbols from the spell names!
// NOTE 2: This DOES YES fix the "Inherit" spells
// NOTE 3: This DOES YES add the Name property to all Spells (or at least it should)


import fs from 'fs'
import * as yaml from 'yaml'
import path from 'path'

import STATIC_SYMBOLS from './parse-text-symbols-static.json' with { type: 'json' }
import * as STATS_STATIC from './stats-constants.mjs'
import { accessObjectProp, addError, addNameToSpellsRecursively, assertAbilityHasCorrectProps, assertObjectHas, assertObjectHasNot, findAllYAMLFiles, forEachFoundAbility, getNErrorsFound, getObjectValueByFuzzyKey, isSpellName, looksLikeSpell, objectEntriesByFuzzyKey, readAndNormalizeYamlToJson, replaceAllWithExceptions, REPLACEMENTS, replaceOnly, STATUS_EFFECTS, stringHasAnyOfChars, validateClass, validateAndFixMonstersFile, validateRace, assertAbilityHasCorrectValues, includesAny, deleteKeys, isObject, iterateObject, isString, capitalizeFirstLetter, previewObject, getAllSetsOfContent } from './automation-utils.mjs'

import SETS from './sets-config.json' with { type: 'json' }

function stripEarlyAccessContent(obj) {
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
        if (isObject(value) && value?.IsEarlyAccess === false) {
            return true
        }
        return false
    })
}
function stripContentOfFeatures(obj, keysToStrip, { includeOnlyFileNames, config, fileName, fileNameNoExt, fileDir }) {
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

const yamlRootFolder = '../Design'
const jsonRootFolder = '../WebsiteReact2/call-of-heroes-website-react-2/src/databases'

const args = process.argv.slice(2)
const shouldGenerateAll = args.includes('--all') || args.includes('-a')
const isHelpCommand = args.includes('--help') || args.includes('-h') || args.includes('help') || args.length == 0

if (isHelpCommand) {
    console.log(`\n🔰 Use as:`)
    console.log(`> node generate-jsons-from-yaml.mjs --all`)
    console.log(`> node generate-jsons-from-yaml.mjs Monsters Races Artificer Core (by parts of the path)`)
    process.exit()
}
console.log(`\n\n🚛 Running generate-jsons-from-yaml...`)

// Polulated at runtime
const allAbilitiesFound = {}
const classRaceAbilities = {} 
const weapons = {}
const armors = {}
const classes = []           // Polulated at runtime (Array<string>)
const races = []             // Polulated at runtime (Array<string>)

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

function normalizeInheritAbilities(dictToSearch) {

    function getSwapTildeArrowsName(name) {
        if (name.startsWith('<')) {
            return '~' + name.slice(1, -1) + '~';
        }
        if (name.startsWith('~')) {
            return '<' + name.slice(1, -1) + '>';
        }
        return name;
    }

    function findPreviouslyUsedAbility(name) {
        if (allAbilitiesFound[name]) {
            return allAbilitiesFound[name];
        }
        const swapped = getSwapTildeArrowsName(name);
        if (allAbilitiesFound[swapped]) {
            return allAbilitiesFound[swapped];
        }
        throw new Error(`Spell ${name} not found in previously mentioned spells [normalizeInheritAbilities].`);
    }

    for (const key of Object.keys(dictToSearch)) {
        const subobj = dictToSearch[key];

        if (subobj === null) {
            continue;
        }

        if (typeof subobj === 'string' && subobj.trim().toLowerCase().startsWith('inherit')) {
            dictToSearch[key] = findPreviouslyUsedAbility(key);
            continue;
        }

        if (typeof subobj !== 'object' || Array.isArray(subobj)) {
            continue;
        }

        normalizeInheritAbilities(subobj);
    }
}
function maybeMakeSomeWordsMixins(subobj) {
    if (subobj == null || subobj?._alreadyHasSomeWordsMixins) {
        return
    }

    if (subobj.Effect?.startsWith('When defeating people, your team loots')) {
        console.log(`Shoreraider Here!`)
    }
    const propsToCheck = ['Effect', 'Upgrade', 'Notes', 'EffectGreen', 'Downside', 'Combo']
    for (const prop of propsToCheck) {
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
        console.log(`Found monster ${monsterName} from set ${monster.Set}`)
        branchesBySet[monster.Set][monsterName] = structuredClone(monster)
        const strippedMonsterObj = deleteKeys(monster, (key, value, path) => !['Set', 'Type', 'Experience', 'Degree', 'Tags'].includes(key))
        obj[monsterName] = strippedMonsterObj
    }

    return [obj, branchesBySet]
}

// THIS DOESN'T WORK
// function branchCompositeContentForSets(obj, params) {
//     const { fileConfig, config, fileName, fileNameNoExt, fileDir, filePath } = params
//     // Find all sets
//     const foundSets = new Set()
    // iterateObject(obj, (key, value, path) => {
    //     if (value?.Set != null && isString(value?.Set)) {   // Don't check 'key', because we don't look in the base level
    //         foundSets.add(value.Set)
    //     }
    // })
//     // Make an object of clones
//     const setsArr = Array.from(foundSets)
//     const setObjPairs = setsArr.map(name => ([name, structuredClone(obj)]))
//     setObjPairs.push(['basic', structuredClone(obj)])
//     const branchesBySet = {}
//     for (const [setName, obj] of setObjPairs) {
//         if (setName == null) {  // Defensive
//             continue
//         }
//         console.log(`Deleting keys for set ${setName}`)
//         if (setName == 'basic') {
//             console.log(`    Deleting for basic keys`)
//             deleteKeys(obj, (key, value, path) => value?.Set != null)
//         } else {
//             // console.log(`    Deleting for set key keys`)
//             deleteKeys(obj, (key, value, path) => value?.Set != setName)
//         }
//         branchesBySet[setName] = obj
//     }
//     if (setsArr.length > 0) {
//         console.log('Core: ' + previewObject(branchesBySet.core))
//     }
//     return branchesBySet
// }

const PROCESS_STRATEGIES = {
    'Feats': obj => {
        findAndRecordAllAbilities(obj, allAbilitiesFound, null, 'Feats');
    },
    'Font': obj => {
        forEachFoundAbility(obj, (name, spell) => {
            spell.ScrollPower = 'Auto'
            spell.HasMixins = true
        })
    },
    'Armor': (obj, { fileName }) => {
        findAndRecordAllAbilities(obj, armors, null, fileName, null)
    },
    'Weapon': (obj, { fileName }) => {
        findAndRecordAllAbilities(obj, weapons, null, fileName, null)
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
    },

    'Class': (obj, { fileName }) => {
        validateClass(obj)
        classes.push(obj.Class)
        findAndRecordAllAbilities(obj, classRaceAbilities, null, `Class/${obj.Class}`);
    },
    'Race': (obj, { fileName }) => {
        validateRace(obj)
        races.push(obj.Race)
        findAndRecordAllAbilities(obj, classRaceAbilities, null, `Race/${obj.Race}`);
    },
    'Monsters': (obj, { fileName }) => {
        validateAndFixMonstersFile(obj)
    }
}
function defaultOutputStrategy(obj, params={}) {
    const { fileConfig, config, fileName, fileNameNoExt, fileDir, filePath } = params

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
let OUTPUT_STRATEGIES = {}
    OUTPUT_STRATEGIES = {

    'default': defaultOutputStrategy,

    'Monsters': (obj, params) => {
        const { config, fileName, fileNameNoExt, fileDir, filePath } = params
        const [objStripped, branchesBySet] = branchCompositeMonsters(obj, params)
        OUTPUT_STRATEGIES['default'](objStripped, params)

        for (const [setName, objForSet] of Object.entries(branchesBySet)) {
            const newFileDir = path.join(setName, fileDir)
            OUTPUT_STRATEGIES['premiumOnly'](objForSet, {...params, fileDir: newFileDir})
        }
    },

    'premium': (obj, params) => {
        const { config, fileName, fileNameNoExt, fileDir, filePath } = params

        // Strip and output normal
        let objStripped = stripPremiumContentOfFeatures(obj, { config, fileName, fileNameNoExt, fileDir, filePath })
        OUTPUT_STRATEGIES['default'](objStripped, params)
        
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
            maybeMakeSomeWordsMixins(body)
            maybeAddStatusEffectDescriptions(body)
            const didAddHasMixins = maybeAddHasMixins(body)
            body.ParentKey = parentKey
            body.Origin = filePath

            // Record
            allAbilitiesFound[name] = body
        })
        normalizeInheritAbilities(dictContent)

        // Apply the preprocessing strategy
        const processStrategyFuncs = objectEntriesByFuzzyKey(PROCESS_STRATEGIES, filePath)
        for (const [fuzzyKey, func] of processStrategyFuncs) {
            func?.(dictContent, { fileName, fuzzyKey })
        }

        // Output
        const writeOutput =
            fileConfig.isPremium?
                OUTPUT_STRATEGIES.premium
            :OUTPUT_STRATEGIES[fileNameNoExt] != null?
                OUTPUT_STRATEGIES[fileNameNoExt]
            :OUTPUT_STRATEGIES.default

        console.log(`  / File: ${filePath} strategy: ${writeOutput}`)

        writeOutput(dictContent, { config: fileConfig, fileName, fileNameNoExt, fileDir, filePath })
    }

    const overallData = {
        Races: races,
        Classes: classes
    };

    if (shouldGenerateAll) {
        try {
            fs.writeFileSync(
                path.join(jsonRootFolder, 'OverallData.json'),
                JSON.stringify(overallData, null, 4),
                'utf-8'
            );
    
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
    console.log(`✅ No errors found`)
}