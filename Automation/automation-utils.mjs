
import fs from 'fs'
import * as yaml from 'yaml'
import path from 'path'

import STATIC_SYMBOLS from './parse-text-symbols-static.json' with { type: 'json' }
import * as STATS_STATIC from './stats-constants.mjs'
import SETS from './sets-config.json' with { type: 'json' }
const { STAT_SYMBOLS } = STATS_STATIC



const isActionPointsMappingEnabled = true

const ALL_STATIC_SYMBOLS = {
    ...STATIC_SYMBOLS,
    ...STAT_SYMBOLS
}
const ACTION_POINTS_MAPPING = {
    '1 Action!1 Action Point': "2 Action Points",    // Replace 1 Action but not 1 Action Point
    "Half-Action": "1 Action Point",
    "0 Actions": "0 Action Points"
}

export const STATUS_EFFECTS = [
    'Lag',
    'Deafen',
    'Daze',
    'Single-Stun',
    'Double-Stun',
    'Triple-Stun',
    'Slow',
    'Frail',
    'Blind',
    'Cripple',
    'Silence',
    'Root',
    'Exhaust',
    'Hard Terrain',
]
export const REPLACEMENTS = {
    'Action Point': {
        replaceWith: '{A}Action Point',
        exceptions: [`}Action Point`]
    },
    'Gold': {
        replaceWith: '{Gold}Gold',
        exceptions: [`}Gold`]
    },
    'Mana': {
        replaceWith: '{Mana}Mana',
        exceptions: [`}Mana`]
    },
}




// ----------- ERRORS -----------
console.red = msg => console.log("\x1b[31m", '🔴 ' + msg, '\x1b[0m')
let _nErrorsFound = 0

export function getNErrorsFound() {
    return _nErrorsFound
}
export function addError() {
    _nErrorsFound++
}


// ----------- STRING ------------
export function replaceOnly(text, substring, exceptions, replacement) {
  // Escape special regex characters in the substring to prevent syntax errors
  const escapedSub = substring.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

  // Process each exception to isolate the part that comes *after* the substring
  const lookaheads = exceptions
    .filter(exp => exp.startsWith(substring))
    .map(exp => {
      const remainder = exp.slice(substring.length);
      // Escape special characters in the trailing exception text
      return remainder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    });

  // If there are valid lookahead exceptions, join them with an OR (|) operator
  const lookaheadPattern = lookaheads.length > 0 ? `(?!${lookaheads.join('|')})` : '';

  // Create the final global regex: substring + negative lookahead
  const regex = new RegExp(`${escapedSub}${lookaheadPattern}`, 'g');

  // Perform the replacement
  if (text.replace == null) {
    console.log(`TEXT`)
    console.log(text, substring, exceptions, replacement)
  }
  return text.replace(regex, replacement);
}
export function replaceAllWithExceptions({ text, substring, exceptions, replaceWith }) {
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
export function stringHasAnyOfChars(str, chars) {
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
export function capitalizeFirstLetter(str) {
  if (!str) return ""; // Handle empty string or null
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ----------- QUESTGUARD UTILS ------------
export function isSpellName(dictKey) {
    return typeof dictKey === 'string' && (dictKey.startsWith('~') || dictKey.startsWith('<'));
}
export function looksLikeSpell(key, value) {
    if (isSpellName(key)) {
        return true
    }
    if (value == null) {
        return false
    }

    if (value.Effect != null && !isString(value.Effect)) {  // If it's not a string but still looks like a spell...
        return false
    }

    return value.Effect != null || value.A != null || value.Price != null || value.EffectGreen != null
}
// If it finds an Ability and it's not 'Inherit', adds the "Name": ... prop
export function addNameToSpellsRecursively(dictToSearch) {
  for (const [key, subobj] of Object.entries(dictToSearch)) {
    if (subobj === null || typeof subobj !== 'object' || Array.isArray(subobj)) {
      continue;
    }

    if (looksLikeSpell(key, subobj)) {
      subobj['Name'] = key;
    } else {
        addNameToSpellsRecursively(subobj);
    }
  }
}
export function normalizeFileText(text) {
    let lastText = text
    do {
        lastText = text
        for (const [symbol, value] of Object.entries(ALL_STATIC_SYMBOLS)) {
            const symbolToReplace = `{${symbol}}`
            text = text.replaceAll(symbolToReplace, value.text)
        }
    } while (lastText != text)

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
export function readAndNormalizeYamlToJson(filePath) {
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

    addNameToSpellsRecursively(dictContent)

    return dictContent
}
export function readJson(filePath) {
    let fileContent
    let obj
    try {
        fileContent = fs.readFileSync(filePath, 'utf-8')
        obj = JSON.parse(fileContent)
    } catch (err) {
        console.red(`ERROR: Failed to read file ${filePath}`);
        throw err;
    }
    return obj
}
export function readAllJsonsSync(dirPath) {
  // 1. Resolve to an absolute path for safety
  const absolutePath = path.resolve(dirPath);

  // 2. Read all items inside the directory
  const files = fs.readdirSync(absolutePath);

  console.log(`Reading JSONS at ${dirPath}. Found files: ${files}`)

  // 3. Filter for .json extension and parse each file
  const jsonObjects = files
    .filter(file => path.extname(file).toLowerCase() === '.json')
    .map(file => {
      const filePath = path.join(absolutePath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      
      return JSON.parse(fileContent);
    });

  return jsonObjects;
}
export function writeJSONSync(obj, path) {
    const json = isString(obj)? obj: JSON.stringify(obj, null, 4)
    fs.writeFileSync(path, json, 'utf-8');
}
// export const FEATURES = {
//     Races: 'races',
//     Classes: 'classes',
//     Feats: 'feats',
//     Fonts: 'fonts',
//     Items: 'items',
//     Prices: 'prices'
// }
// export function getFileFeatureType(setName, relativePath) {
//     const parts = relativePath.split(/[/\\]/).filter(Boolean);
//     const maybeSetName = parts.splice(0, 1).toLowerCase()
//     if (maybeSetName == setName.toLowerCase()) {
//         if (parts.length <= 1) {            // Core/Something.yml -- no type
//             return null
//         }
//         const featureName = parts[0]
//         return featureName.toLowerCase()    // Core/Races/x... returns "races"
//     } else {
//         if (parts.length <= 1) {            // Something.yml -- no type
//             return null
//         }
//         const featureName = parts[0]
//         return featureName.toLowerCase()    // Races/x... returns "races"
//     }
// }
export function getTodayString() {
    const today = new Date().toISOString().split('T')[0]
    return today
}
export function getTimestamp() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}-${hour}${minute}`;
}

// Find all abilities in obj and call func recursively
export function forEachFoundAbility(obj, keyValueFunc, parentKey=null) {
    if (obj == null) {
        return
    }
    if (typeof obj !== 'object' || Array.isArray(obj)) {
        return
    }
    for (const [key, value] of Object.entries(obj)) {
        if (value == null || typeof value === 'string') {
            continue
        } else if (looksLikeSpell(key, value)) {
            keyValueFunc(key, value, parentKey)
        } else if (isObject(value)) {
            forEachFoundAbility(value, keyValueFunc, key)
        }
        
    }
}

export function assertAbilityHasCorrectProps(name, body) {
    assertObjectHasNot(name, body, [
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
}




// ----------- OBJECT UTILS ------------
export function accessObjectProp(obj, propPath) {
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

export function getObjectValueByFuzzyKey(obj, key) {
    for (const realKey of Object.keys(obj)) {
        if (key.includes(realKey)) {
            return obj[realKey]
        }
    }
    return null
}
export function objectEntriesByFuzzyKey(obj, key) {
    const foundEntries = []
    for (const realKey of Object.keys(obj)) {
        if (key.includes(realKey)) {
            foundEntries.push([realKey, obj[realKey]])
        }
    }
    return foundEntries
}
export function isObject(obj) {
    return typeof obj === 'object' && !Array.isArray(obj) && !isString(obj)
}
export function isNumber(obj) {
    return !isNaN(obj) && obj != null
}
export function equalsNaN(x) {
    return isNaN(x) && x !== x
}
export function isString(obj) {
    return obj != null && typeof obj === 'string' || obj instanceof String;
}


// ----------- VALIDATION ------------
export function assertObjectHas(name, obj, propNames, warnPropNames=[], recordErrorFound=true) {
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
export function assertObjectHasNot(name, obj, propNames, recordErrorFound=true) {
    for (const prop of propNames) {
        const orOptions = prop.split(' || ')
        const hasAnyOfThem = orOptions.some(optionProp => accessObjectProp(obj, optionProp) != null)
        if (hasAnyOfThem && recordErrorFound) {
            _nErrorsFound++
            console.red(`Object ${name} has misspelled propery: ${prop}`)
        }
    }
}
export function validateRace(race) {
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
export function validateClass(cls) {
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
export function validateFeat(feat) {
    if (feat == null) {
        console.red(`Null feat!`)
        _nErrorsFound++
    }
    assertObjectHas(feat?.Name, [
        'Cost'
    ])
}

// ----------- OTHER -------------
export function findAllYAMLFiles(folderName) {
  const results = [];

  function scanDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        scanDirectory(fullPath); // Recurse into subfolders
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (ext === '.yaml' || ext === '.yml') {
          results.push(fullPath);
        }
      }
    }
  }

  scanDirectory(folderName);
  return results;
}


// ------------- SETS ------------
