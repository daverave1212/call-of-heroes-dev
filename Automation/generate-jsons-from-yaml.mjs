

// Use this script to convert all ./Design/ files to their JSON variant in WebsiteReact/call-of-heroes-react-static/src/databases
// NOTE 1: This does NOT remove the < and ~ symbols from the spell names!
// NOTE 2: This DOES YES fix the "Inherit" spells
// NOTE 3: This DOES YES add the Name property to all Spells (or at least it should)


import fs from 'fs'
import * as yaml from 'yaml'
import path from 'path'

import STATIC_SYMBOLS from './parse-text-symbols-static.json' with { type: 'json' }
import * as STATS_STATIC from './stats-constants.mjs'
import { accessObjectProp, addError, addNameToSpellsRecursively, assertAbilityHasCorrectProps, assertObjectHas, assertObjectHasNot, findAllYAMLFiles, forEachFoundAbility, getNErrorsFound, getObjectValueByFuzzyKey, isSpellName, looksLikeSpell, objectEntriesByFuzzyKey, readAndNormalizeYamlToJson, replaceAllWithExceptions, REPLACEMENTS, replaceOnly, STATUS_EFFECTS, stringHasAnyOfChars, validateClass, validateRace } from './automation-utils.mjs'

import SETS from './sets.json' with { type: 'json' }



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
const backgrounds = []       // Polulated at runtime

// Will be modified just below, for sets
let filesToConvert = [    // Order matters
    // 'Abilities.yml',
    // 'SpellFonts.yml',
    // 'Animals.yml',
    // 'Armors.yml',
    // 'Feats.yml',
    // 'Monsters.yml',
    // 'MonsterCalculations.yml',
    // 'Proficiencies.yml',
    // 'Weapons.yml',
    // 'Prices.yml',   // Must be after Weapons
    // 'Obstacles.yml',
    
    // 'Other/MagicItems.yml',
    // 'Other/MagicItemProperties.yml',
    // 'Other/SpellSchoolDescriptions.yml',
    // 'Other/Languages.yml',
    // 'Other/Levels.yml',
    // 'Other/Encounters.yml',
    // 'Other/PatchNotes.yml',
    // 'Other/Quirks.yml',

    // 'Rules/Rules.yml',
    // 'Rules/Inventory.yml',
    // 'Rules/COHFor5e.yml',
    // 'Rules/GMGuidelines.yml',

    // 'ClassesV2/Berserker.yml',
    // 'ClassesV2/Cursewielder.yml',
    // 'ClassesV2/Druid.yml',
    // 'ClassesV2/Hunter.yml',
    // 'ClassesV2/Mystic.yml',
    // 'ClassesV2/Paladin.yml',
    // 'ClassesV2/Priest.yml',
    // 'ClassesV2/Rogue.yml',
    // 'ClassesV2/Shaman.yml',
    // 'ClassesV2/Soulwright.yml',
    // 'ClassesV2/Warlock.yml',
    // 'ClassesV2/Warrior.yml',
    // 'ClassesV2/Wickan.yml',
    // 'ClassesV2/Wizard.yml',

    // 'Core/Classes/Artificer.yml',
    // 'Core/Classes/Knight.yml',
    // 'Core/Classes/Sorcerer.yml',
    // 'Core/Classes/Swashbuckler.yml',

    // 'Races/Bertle.yml',
    // 'Races/Dwarf.yml',
    // 'Races/Elf.yml',
    // 'Races/Gnome.yml',
    // 'Races/Human.yml',
    
    // 'Core/Races/Davel.yml',
    // 'Core/Races/Dragonborn.yml',
    // 'Core/Races/Hollow.yml',
    // 'Core/Races/Orc.yml',

    // 'Book/QuestGuard Book.yml'
]

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
    const propsToCheck = ['Effect', 'Upgrade', 'Notes', 'EffectGreen', 'Downside', 'Combo']
    for (const prop of propsToCheck) {
        if (!(prop in subobj)) {
            continue
        }
        for (const [substr, value] of Object.entries(REPLACEMENTS)) {
            const { replaceWith, exceptions } = value
            subobj[prop] = replaceOnly(subobj[prop], substr, exceptions, replaceWith)
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
    }
}



function defaultOutputStrategy(obj, { fileConfig, config, fileName, fileNameNoExt, jsonString, fileDir }) {
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
        defaultOutputStrategy(obj, params)  // Write as is to the normal forlder (TODO: strip it)

        const { jsonString, fileDir, fileNameNoExt } = params
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
        
        // const lastUpdated = fs.statSync(relativePath).mtime.toString()
        // if (filesLastUpdated[fileName] == null) {
        //     filesLastUpdated[fileName] = {}
        // }

        // // console.log(`  modified: ${lastUpdated} type "${typeof lastUpdated}", updated: ${filesLastUpdated[fileName].lastUpdated}`)
        // if (!shouldGenerateAll && filesLastUpdated[fileName].lastUpdated == lastUpdated) {
        //     nFilesSkipped++
        //     continue
        // } else {
        //     filesLastUpdated[fileName].lastUpdated = lastUpdated
        // }


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
        const jsonString = JSON.stringify(dictContent, null, 4);
        const fileNameNoExt = path.parse(fileName).name;
        const fileDir = path.dirname(fileName);

        if (fileConfig.isPremium) {
            OUTPUT_STRATEGIES.premium(dictContent, { config: fileConfig, fileName, fileNameNoExt, jsonString, fileDir })
        } else {
            OUTPUT_STRATEGIES.default(dictContent, { config: fileConfig, fileName, fileNameNoExt, jsonString, fileDir })
        }
    }

    const overallData = {
        Races: races,
        Classes: classes,
        Backgrounds: backgrounds
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