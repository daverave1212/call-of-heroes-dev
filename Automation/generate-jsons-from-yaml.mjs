

// Use this script to convert all ./Design/ files to their JSON variant in WebsiteReact/call-of-heroes-react-static/src/databases
// NOTE 1: This does NOT remove the < and ~ symbols from the spell names!
// NOTE 2: This DOES YES fix the "Inherit" spells
// NOTE 3: This DOES YES add the Name property to all Spells (or at least it should)


import fs from 'fs'
import * as yaml from 'yaml'
import path from 'path'

import STATIC_SYMBOLS from './parse-text-symbols-static.json' with { type: 'json' }
import * as STATS_STATIC from './stats-constants.mjs'
import { accessObjectProp, addError, addNameToSpellsRecursively, assertAbilityHasCorrectProps, assertObjectHas, assertObjectHasNot, findAllYAMLFiles, forEachFoundAbility, getNErrorsFound, getObjectValueByFuzzyKey, isSpellName, looksLikeSpell, objectEntriesByFuzzyKey, readAndNormalizeYamlToJson, replaceAllWithExceptions, REPLACEMENTS, replaceOnly, STATUS_EFFECTS, stringHasAnyOfChars, validateClass, validateAndFixMonstersFile, validateRace, assertAbilityHasCorrectValues } from './automation-utils.mjs'

import SETS from './sets-config.json' with { type: 'json' }

const PREMIUM_KEYS_TO_STRIP = [
    'Other Abilities',
    'Utility',
    'Talents',
    'Specs',
]
const ALL_KEYS_TO_STRIP = [
    'Ideas'
]
function stripPremiumContentOfFeatures(obj, keysToStrip, { includeOnlyFileNames, config, fileName, fileNameNoExt, fileDir }) {
    const newObj = {...obj}

    function stripNormal() {
        for (const key of keysToStrip) {
            delete newObj[key]
        }
    }

    const shouldStrip =
        includeOnlyFileNames == null?
            true
        :
            includeOnlyFileNames.some(includeFileName => fileDir.includes(includeFileName))
    if (shouldStrip) {
        stripNormal()
    }

    return newObj
}


const yamlRootFolder = '../Design'
const jsonRootFolder = '../WebsiteReact2/call-of-heroes-website-react-2/src/databases'

const shouldGenerateAll = process.argv.includes('--all') || process.argv.includes('-a')


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
            if (subobj.Effect?.startsWith('When defeating people, your team loots') && substr == 'Gold') {
                console.log(`💛 Replacing Gold; before:`)
                console.log(subobj.Effect)
            }
            subobj[prop] = replaceAllWithExceptions({
                text: subobj[prop],
                substring: substr,
                exceptions,
                replaceWith
            })
            if (subobj.Effect?.startsWith('When defeating people, your team loots') && substr == 'Gold') {
                console.log(`💙 After:`)
                console.log(subobj.Effect)
            }
        }
    }
    subobj._alreadyHasSomeWordsMixins = true
}
function maybeAddStatusEffectDescriptions(subobj) {
    if (subobj == null || subobj?._alreadyHasStatusEffectDescriptions) {
        return
    }

    // if (subobj?.Effect?.includes('Cast Awe on a Unit and apply')) {
    //     console.log(`🧕Got here, adding here:`)
    //     console.log({statusEffectsItHas})
    //     console.log({allStatusEffectsText})
    // }

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



function defaultOutputStrategy(obj, params) {
    const { fileConfig, config, fileName, fileNameNoExt, fileDir } = params
    const strippedObj = stripPremiumContentOfFeatures(obj, ALL_KEYS_TO_STRIP, params)  // Strip it of things not supposed to be in production
    const jsonString = JSON.stringify(strippedObj, null, 4);
    const outputPath = path.join(jsonRootFolder, fileDir, `${fileNameNoExt}.json`);

    try {
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });
        fs.writeFileSync(outputPath, jsonString, 'utf-8');
    } catch (err) {
        console.red(`ERROR: Failed to write JSON to ${outputPath}`);
        throw err;
    }
}
const OUTPUT_STRATEGIES = {

    'default': defaultOutputStrategy,

    'premium': (obj, params) => {
        const { config, fileName, fileNameNoExt, fileDir } = params
        let strippedObj = stripPremiumContentOfFeatures(obj, PREMIUM_KEYS_TO_STRIP, {...params, includeOnlyFileNames: ['Races', 'Classes']})
        defaultOutputStrategy(strippedObj, params)  // Write as is to the normal folder (TODO: strip it)
        
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
        const fileName = filePath
        
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
            assertAbilityHasCorrectProps(name, body)
            assertAbilityHasCorrectValues(name, body)
            maybeMakeSomeWordsMixins(body)
            maybeAddStatusEffectDescriptions(body)
            const didAddHasMixins = maybeAddHasMixins(body)
            body.ParentKey = parentKey
            body.Origin = fileName

            allAbilitiesFound[name] = body
        })
        normalizeInheritAbilities(dictContent)


        // Apply the strategy
        const processStrategyFuncs = objectEntriesByFuzzyKey(PROCESS_STRATEGIES, fileName)
        for (const [fuzzyKey, func] of processStrategyFuncs) {
            func?.(dictContent, { fileName, fuzzyKey })
        }
        

        // Output
        const fileNameNoExt = path.parse(fileName).name;
        const fileDir = path.dirname(fileName);

        if (fileConfig.isPremium) {
            OUTPUT_STRATEGIES.premium(dictContent, { config: fileConfig, fileName, fileNameNoExt, fileDir })
        } else {
            OUTPUT_STRATEGIES.default(dictContent, { config: fileConfig, fileName, fileNameNoExt, fileDir })
        }
    }

    const overallData = {
        Races: races,
        Classes: classes
    };

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

        // fs.writeFileSync(
        //     path.join(jsonRootFolder, 'RulesLists.json'),
        //     JSON.stringify(rulesLists, null, 4),
        //     'utf-8'
        // );

        // fs.writeFileSync(
        //     path.join(jsonRootFolder, 'RulesDicts.json'),
        //     JSON.stringify(rulesDicts, null, 4),
        //     'utf-8'
        // );
    } catch (err) {
        console.red('ERROR: Failed to write summary JSON files:', err);
        throw err;
    }

    fs.writeFileSync('files-last-updated.json', JSON.stringify(filesLastUpdated))

    console.log(`Skipped ${nFilesSkipped} files. Run with --all to not skip.`)
}


processFiles()

if (getNErrorsFound() > 0) {
    console.log(`🔴 Found ${getNErrorsFound()} errors!`)
} else {
    console.log(`✅ No errors found`)
}