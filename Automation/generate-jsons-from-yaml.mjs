
import fs from 'fs'
import * as yaml from 'yaml'
import path from 'path'

import STATIC_SYMBOLS from './parse-text-symbols-static.json' with { type: 'json' }
import * as STATS_STATIC from './stats-constants.mjs'

const { STAT_SYMBOLS } = STATS_STATIC

const ALL_STATIC_SYMBOLS = {
    ...STATIC_SYMBOLS,
    ...STAT_SYMBOLS
}
const ACTION_POINTS_MAPPING = {
    '1 Action!1 Action Point': "2 Action Points",    // Replace 1 Action but not 1 Action Point
    "Half-Action": "1 Action Point",
    "0 Actions": "0 Action Points"
}
// Use this script to convert all ./Design/ files to their JSON variant in WebsiteReact/call-of-heroes-react-static/src/databases
// NOTE 1: This does NOT remove the < and ~ symbols from the spell names!
// NOTE 2: This DOES YES fix the "Inherit" spells
// NOTE 3: This DOES YES add the Name property to all Spells (or at least it should)


const yamlRootFolder = '../Design'
const jsonRootFolder = '../WebsiteReact2/call-of-heroes-website-react-2/src/databases'

const shouldGenerateAll = process.argv.includes('--all') || process.argv.includes('-a')
const isActionPointsMappingEnabled = true

let abilities = {}
let classRaceAbilities = {} 


let _nErrorsFound = 0
console.red = msg => console.log("\x1b[31m", '🔴 ' + msg, '\x1b[0m')
function accessObjectProp(obj, propPath) {
    const propsQueue = propPath.split('.')
    propsQueue.reverse()
    let currentObj = obj
    while (propsQueue.length > 0) {
        const thisProp = propsQueue.pop()
        currentObj = currentObj[thisProp]
        if (currentObj == null) {
            return null
        }
    }
    return currentObj

}
function assertObjectHas(name, obj, propNames, warnPropNames=[], recordErrorFound=true) {
    for (const prop of propNames) {
        const orOptions = prop.split(' || ')
        const hasAnyOfThem = orOptions.some(optionProp => accessObjectProp(obj, optionProp) != null)
        if (!hasAnyOfThem && recordErrorFound) {
            _nErrorsFound++
            console.red(`Object ${name} does not have propery: ${prop}`)
        }
    }
    for (const prop of warnPropNames) {
        const value = accessObjectProp(obj, prop)
        if (value == null) {
            console.warn(`Object ${name} does not have propery: ${prop}`)
        }
    }
}
function assertObjectHasNot(name, obj, propNames, recordErrorFound=true) {
    for (const prop of propNames) {
        const orOptions = prop.split(' || ')
        const hasAnyOfThem = orOptions.some(optionProp => accessObjectProp(obj, optionProp) != null)
        if (hasAnyOfThem && recordErrorFound) {
            _nErrorsFound++
            console.red(`Object ${name} has misspelled propery: ${prop}`)
        }
    }
}
function validateRace(race) {
    if (race == null) {
        _nErrorsFound++
        console.red(`Null race given to validate!`)
    }
    assertObjectHas(race.Race, race, [
        'Race',
        'Description || DescriptionLeft || DescriptionRightTop',
        'Stats',
        'Stats.Base Health',
        'Stats.Health Regen',
        'Stats.Movement',
        'Stats.Lifespan',
        'Stats.Size',
        'Language',
        'Languages',
        'Starting Abilities',
        'Starting Abilities Description',
        'Talents',
    ])
}
function validateClass(cls) {
    if (cls == null) {
        _nErrorsFound++
        console.red(`Null class given to validate!`)
    }
    assertObjectHas(cls.Class, cls, [
        'Class',
        'Description',
        'Quick Note',
        'Difficulty',
        'Level Up',
        'Level Up.Every Level',
        'Level Up.Every Level.Max Health',
        // 'Level Up.Every Level.Health Regen', // Optional, for Berserker
        'Level Up.Every Level.Skill Point',
        'Level Up.Every Level.Any Stat (up to the Stat Limit)',
        'Spellcasting',
        'Spellcasting.Type',
        'Spellcasting.SpellsOrAbilities',
        'Spellcasting.Change',
        'Starting Abilities',
        'Starting Abilities Description',
    ])
}
function validateFeat(feat) {
    if (feat == null) {
        console.red(`Null feat!`)
        _nErrorsFound++
    }
    assertObjectHas(feat?.Name, [
        'Cost'
    ])
}
function replaceAllWithExceptions({ text, substring, exceptions, replaceWith }) {
  // 1. Escape special characters in strings to prevent regex errors
  const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // 2. Sort exceptions by length (longest first) 
  // This ensures "1 Action Point" is matched before "1 Action"
  const sortedExceptions = [...exceptions].sort((a, b) => b.length - a.length);
  
  // 3. Create a pattern: (Exception1|Exception2|Target)
  const patternString = [
    ...sortedExceptions.map(escapeRegExp), 
    escapeRegExp(substring)
  ].join('|');

  const regex = new RegExp(patternString, 'g');

  // 4. Use the replacer function
  return text.replace(regex, (match) => {
    // If the match is exactly the substring (and not one of the exceptions), replace it
    if (match === substring) {
      return replaceWith;
    }
    // Otherwise, it was an exception, so return it as-is
    return match;
  });
}

const classes = []         // Polulated at runtime (Array<string>)
const races = []           // Polulated at runtime (Array<string>)
let backgrounds = []       // Polulated at runtime
let rulesLists = []        // Polulated at runtime ( title: "X", children: [...])
let rulesDicts = []        // Polulated at runtime ("X": [...])

const filesToConvert = [    // Order matters
    // 'Abilities.yml',
    'SpellFonts.yml',
    'Animals.yml',
    'Armors.yml',
    'Feats.yml',
    'Monsters.yml',
    'MonsterCalculations.yml',
    'Prices.yml',
    'Proficiencies.yml',
    'Weapons.yml',
    'Obstacles.yml',
    
    'Other/MagicItems.yml',
    'Other/MagicItemProperties.yml',
    'Other/SpellSchoolDescriptions.yml',
    'Other/Languages.yml',
    'Other/Levels.yml',
    'Other/Encounters.yml',
    'Other/PatchNotes.yml',
    'Other/Quirks.yml',

    'Rules/Rules.yml',
    'Rules/Inventory.yml',
    'Rules/COHFor5e.yml',
    'Rules/GMGuidelines.yml',

    'ClassesV2/Artificer.yml',
    'ClassesV2/Berserker.yml',
    'ClassesV2/Cursewielder.yml',
    'ClassesV2/Druid.yml',
    'ClassesV2/Hunter.yml',
    'ClassesV2/Knight.yml',
    'ClassesV2/Mystic.yml',
    'ClassesV2/Paladin.yml',
    'ClassesV2/Priest.yml',
    'ClassesV2/Rogue.yml',
    'ClassesV2/Shaman.yml',
    'ClassesV2/Sorcerer.yml',
    'ClassesV2/Soulwright.yml',
    'ClassesV2/Swashbuckler.yml',
    'ClassesV2/Warlock.yml',
    'ClassesV2/Warrior.yml',
    'ClassesV2/Wickan.yml',
    'ClassesV2/Wizard.yml',

    'Races/Bertle.yml',
    'Races/Davel.yml',
    'Races/Dragonborn.yml',
    'Races/Dwarf.yml',
    'Races/Elf.yml',
    'Races/Gnome.yml',
    'Races/Hollow.yml',
    'Races/Human.yml',
    'Races/Orc.yml',

    'Book/QuestGuard Book.yml'
]

function isSpellName(dictKey) {
    return typeof dictKey === 'string' && (dictKey.startsWith('~') || dictKey.startsWith('<'));
}
function looksLikeSpell(key, value) {
    if (isSpellName(key)) {
        return true
    }
    if (value == null) {
        return false
    }
    return value.Effect != null || value.A != null || value.Price != null || value.EffectGreen != null
}
function stringHasAnyOfChars(str, chars) {
    if (Array.isArray(chars) == false) {
        chars = chars.split('')
    }
    for (let i = 0; i < str.length; i++) {
        if (str?.charAt == null) {
            console.error(`str.charAt not found: str printed below`)
            console.log(str)
        }
        const char = str.charAt(i)
        if (chars.includes(char)) {
            return true
        }
    }
    return false
}

// If it finds an Ability and it's not 'Inherit', it adds the name of the Ability as a 'Name' property
function addNameToSpellsRecursively(dictToSearch) {
  for (const key of Object.keys(dictToSearch)) {
    const subobj = dictToSearch[key];

    if (subobj === null || typeof subobj !== 'object' || Array.isArray(subobj)) {
      continue;
    }

    if (isSpellName(key)) {
      subobj['Name'] = key;
    } else {
        addNameToSpellsRecursively(subobj);
    }
  }
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
        if (abilities[name]) {
            return abilities[name];
        }
        const swapped = getSwapTildeArrowsName(name);
        if (abilities[swapped]) {
            return abilities[swapped];
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

function maybeAddHasMixins(subobj) {
    if (subobj == null) {
        return
    }
    const propsToCheck = ['Effect', 'Upgrade', 'Notes', 'EffectGreen', 'Downside', 'Combo']
    for (const propName of propsToCheck) {
        const propValue = subobj[propName]
        if (propValue == null) {
            continue
        }
        if (stringHasAnyOfChars(propValue || '', '{^_~')) {
            subobj.HasMixins = true
            return true
        }
    }
    if (subobj.List?.length > 0) {
        for (const li of subobj.List) {
            if (stringHasAnyOfChars(li || '', '{^_~')) {
                subobj.HasMixins = true
                return true
            }
        }
    }
    return false
}

// Records if toDict isn't null (give it null so it just adds mixins)
function recordAbilitiesFrom(fromDict, toDict, parentKey=null, origin='Unknown', debugKey=null) {
    for (const key of Object.keys(fromDict)) {
        const subobj = fromDict[key];

        if (subobj === null) {
            continue;
        }

        if (looksLikeSpell(key, subobj)) {
            if (typeof subobj === 'string' && subobj.trim().toLowerCase().startsWith('inherit')) {
                continue;
            }
            assertObjectHasNot(key, subobj, [
                'Effect Green',
                'Effect Orange',
                'Effect Red',
                'DownSide',
                'Note',
                'Upgrades',
                'Effect Green',
                'Double Table',
                'Single Table',
                'Spell Table',
                'Display Name',
                'Icon Name',
                'Icon Path',
                'Subspell Name',
                'Variant',
                'Has Mixins',
                'Is Subspell',
                'Is Ignored',
                'Tag'
            ])
            const didAddHasMixins = maybeAddHasMixins(subobj)
            if (debugKey != null) {
                console.log(`⚙ For object ${key}, HasMixins: ${didAddHasMixins}`)
            }
            subobj.ParentKey = parentKey
            subobj.Origin = origin
            if (toDict != null) {
                toDict[key] = subobj;
            }
        }

        if (typeof subobj !== 'object' || Array.isArray(subobj)) {
            continue;
        }

        recordAbilitiesFrom(subobj, toDict, key, origin, debugKey);
    }
}

function normalizeFileText(text) {
    for (const [symbol, value] of Object.entries(ALL_STATIC_SYMBOLS)) {
        const symbolToReplace = `{${symbol}}`
        text = text.replaceAll(symbolToReplace, value.text)
    }

    if (!isActionPointsMappingEnabled) {
        return text
    }

    for (const [key, replaceWith] of Object.entries(ACTION_POINTS_MAPPING)) {
        const [substring, exceptionsRaw] = key.split('!')
        const exceptions = exceptionsRaw == null? []: (exceptionsRaw.split(','))
        text = replaceAllWithExceptions({text, substring, exceptions, replaceWith})
    }

    return text
}

function readAndNormalizeYamlToJson(filePath) {
    let fileContent
    try {
        fileContent = fs.readFileSync(filePath, 'utf-8');
    } catch (err) {
        console.red(`ERROR: Failed to read file ${filePath}`);
        throw err;
    }

    fileContent = normalizeFileText(fileContent)

    let dictContent = {};
    try {
        dictContent = yaml.parse(fileContent);
    } catch (err) {
        console.red(`ERROR: Failed to load YAML from file ${filePath}`);
        throw err;
    }


    return dictContent
}



async function processFiles() {
    const filesLastUpdated = JSON.parse(fs.readFileSync('files-last-updated.json', 'utf-8'));
    let nFilesSkipped = 0

    for (const fileName of filesToConvert) {
        const filePath = path.join(yamlRootFolder, fileName);
        const lastUpdated = fs.statSync(filePath).mtime.toString()

        if (filesLastUpdated[fileName] == null) {
            filesLastUpdated[fileName] = {}
        }

        // console.log(`  modified: ${lastUpdated} type "${typeof lastUpdated}", updated: ${filesLastUpdated[fileName].lastUpdated}`)
        if (!shouldGenerateAll && filesLastUpdated[fileName].lastUpdated == lastUpdated) {
            nFilesSkipped++
            continue
        } else {
            filesLastUpdated[fileName].lastUpdated = lastUpdated
        }

        console.log(`Parsing ${fileName}...`);
        let dictContent
        try {
            dictContent = readAndNormalizeYamlToJson(filePath)
        } catch (e) {
            _nErrorsFound++
            throw e
        }

        if (fileName.includes('Feats.yml')) {
            addNameToSpellsRecursively(dictContent);
            recordAbilitiesFrom(dictContent, abilities, null, 'Feats');
        }


        if (fileName.includes('Fonts')) {
            for (const [category, spellsObj] of Object.entries(dictContent)) {
                for (const [spellName, spell] of Object.entries(spellsObj)) {
                    spell.ScrollPower = 'Auto'
                    spell.ParentKey = category
                    spell.HasMixins = true
                }
            }
        }
        if (fileName.includes('Weapon') || fileName.includes('Armor')) {
            recordAbilitiesFrom(dictContent, {}, null, fileName, /*'Weapons'*/null)
        }


        if (filePath.includes('Classes')) {
            validateClass(dictContent)
            classes.push(dictContent.Class)
            recordAbilitiesFrom(dictContent, abilities, null, `Class/${dictContent.Class}`);
            normalizeInheritAbilities(dictContent);
            recordAbilitiesFrom(dictContent, classRaceAbilities, null, `Class/${dictContent.Class}`);
        }

        if (filePath.includes('Races')) {
            validateRace(dictContent)
            races.push(dictContent.Race)
            recordAbilitiesFrom(dictContent, abilities, null, `Race/${dictContent.Race}`);
            normalizeInheritAbilities(dictContent);
            recordAbilitiesFrom(dictContent, classRaceAbilities, null, `Race/${dictContent.Race}`);
        }


        const fileNameNoExt = path.parse(fileName).name;
        const fileDir = path.dirname(fileName);
        const outputPath = path.join(jsonRootFolder, fileDir, `${fileNameNoExt}.json`);

        const jsonString = JSON.stringify(dictContent, null, 4);

        try {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
            fs.writeFileSync(outputPath, jsonString, 'utf-8');
        } catch (err) {
            console.red(`ERROR: Failed to write JSON to ${outputPath}`);
            throw err;
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

if (_nErrorsFound > 0) {
    console.log(`🔴 Found ${_nErrorsFound} errors!`)
} else {
    console.log(`✅ No errors found`)
}