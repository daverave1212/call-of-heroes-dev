import { Link } from "react-router-dom"
import Icon from "./components/Icon"
import Separator from "./components/Separator/Separator"

import weapons from './databases/Weapons.json'
import skills from './databases/Proficiencies.json'
import abilities from './databases/Abilities.json'
import overallData from './databases/OverallData.json'
import { Races, Classes } from './pages/Other/AllRacesAndClasses'
import { useEffect, useState } from "react"
import BasicAbilities from './databases/Abilities.json'
import Feats from './databases/Feats.json'
import ClassAndRaceAbilities from './databases/ClassAndRaceAbilities.json'

// ---------------- Spells Utilities ----------------

export function findBasicSpellByName(basicAbilityName) {
    for (let categoryName of Object.keys(abilities)) {
        const category = abilities[categoryName]
        for (let spellName of Object.keys(category)) {
            const spell = category[spellName]
            if (removeTildes(spellName) == basicAbilityName) {
                return spellWithName(removeTildes(spellName), spell)
            }
        }
    }
    return null
}

export function spellWithName(name, spellData) {
    return {...spellData, Name: removeTildes(name)}
}
function getErrorSpellObject(message) {
    return {
        'Name': 'Error',
        'A': '?',
        'Effect': `An error has occured with a spell: ${message}`
    }
}
/*  obj = {
        Push: {
            Effect: ...
        },
        ...
    }
    returns = [
        { Name: "Push", "Effect": ...},
    ]
*/
export function spellsFromObject(obj) /* : Array */ {
    if (obj == null) return getErrorSpellObject('Null obj given to spellsFromObject')

    const spellsArray = []
    for (const key of Object.keys(obj)) {
        if (key == 'default' || isNumber(key))   // Ignore it if it's the 'default' module property or array element
            continue
        const spellName = (key.startsWith('<') || key.startsWith('~')) ?
            key.substring(1, key.length - 1) :
            key
        if (obj[key] == null)
            spellsArray.push(getErrorSpellObject(`Spell ${spellName} has null obj[key]`))
        else
            spellsArray.push(spellWithName(spellName, obj[key]))
    }
    return spellsArray
}

export function removeTildes(spellName) {
    if (spellName.startsWith('~') || spellName.startsWith('<'))
        return spellName.substring(1, spellName.length - 1)
    return spellName
}
export function addTildes(spellName) {
    return `~${spellName}~`
}
let CACHED_BASIC_SPELLS_ARRAY = null
export function getAllBasicSpellsAsArray() {
    if (CACHED_BASIC_SPELLS_ARRAY == null) {
        const spellArrays = Object.keys(abilities).map(categoryName => spellsFromObject(abilities[categoryName]))
        CACHED_BASIC_SPELLS_ARRAY = spellArrays.flat()
    }
    return CACHED_BASIC_SPELLS_ARRAY
}
export function getAllSpellsFromCategoriesObject(spellCategoriesObject) {
    const categoryNames = Object.keys(spellCategoriesObject)
    let spells = []
    for (const categoryName of categoryNames) {
        const theseSpells = spellsFromObject(spellCategoriesObject[categoryName])
        spells = [...spells, ...theseSpells]
    }
    return spells
}
export function getSpellFromCategoriesObject(spellCategoriesObject, category, name) {
    const categoryIndex = spellCategoriesObject.indexOf(category)
}
export function getSpellIconPathByName(name) {
    const iconName = getUniqueSpellID(name)
    const iconPath = `/Icons/Spells/${iconName}.png`
    return iconPath
}
export function getItemIconPathByName(name) {
    const iconName = getUniqueSpellID(name)
    const iconPath = `/Icons/Items/${iconName}.png`
    return iconPath
}
export function getUniqueSpellID(name) {
    const idName = stringReplaceAllMany(name, [' ', '/', '%'], ['_', '_', ''])
    return idName
}
export function normalizeForEachVariantsToNormalVariants(VariantsForEach) {
    let allVariants = []
    for (let variant of VariantsForEach) {
        const [mixinName, collectionName] = variant.ForEach.split(':')
        const collection = getVariantsForEachCollection(collectionName)
        const subvariants = collection.map(str => ({...variant, [mixinName]: str}))
        allVariants = [...allVariants, ...subvariants]
    }
    return allVariants
}
export function getAlternativesAsArray(text) {
    if (text == null) {
        return []
    }
    const alternativesString = text.split('Alternatives: ').join('')
    const alternatives = alternativesString.split(', ')
    return alternatives
}
export function getAllSpells() {
    const allBasicSpells = getAllBasicSpellsAsArray()
    const allFeats = getAllSpellsFromCategoriesObject(Feats)
    const allClassAndRaceAbilities = spellsFromObject(ClassAndRaceAbilities)
    const allSpells = [...allBasicSpells, ...allFeats, ...allClassAndRaceAbilities]
    return allSpells
}
let allSpellsCached = {}
export function getAllSpellsByName() {
    const allSpells = getAllSpells()
    for (const spell of allSpells) {
        if (allSpellsCached[spell.Name] == null) {
            allSpellsCached[spell.Name] = spell
        }
    }
    return allSpellsCached
}




// --------------- Questguard Utilities --------------
export function isDice(str) {
    if (str == null) return false
    const parts = str.split('d')
    if (parts.length != 2)          // Must be osmething like <something>d<something>
        return false
    if (isStringNumeric(parts[0]) == false)
        return false
    if (isStringNumeric(parts[1]) == false)
        return false
    return true
}
export function isOperator(str) {
    return str == '+' || str == '-'
}
export function getMonsterStatsAsObject(statsString) {
    let monsterStatsNormalized
    if (isString(statsString) == false) monsterStatsNormalized = '?/?/?/?/?'
    else if (statsString.indexOf('/') == -1) monsterStatsNormalized = '?/?/?/?/?'
    else monsterStatsNormalized = statsString

    const monsterStatsNumbers = monsterStatsNormalized.split('/')
    const monsterStats = [
        { name: 'Mig', value: monsterStatsNumbers[0] },
        { name: 'Dex', value: monsterStatsNumbers[1] },
        { name: 'Int', value: monsterStatsNumbers[2] },
        { name: 'Wis', value: monsterStatsNumbers[3] },
        { name: 'Cha', value: monsterStatsNumbers[4] }
    ]

    return monsterStats
}
export function titleToId(title) {
    return title.toLowerCase().split(' ').join('-').split('.').join('_')
}
// A hack for GitHub pages; links in browser will look like ...github.io/?/miau/miau (returns "/miau/miau")
export function getLocationHackyPath(location) {
    if (location.href.includes('?') && location.href.includes('=') == false) {
        const qIndex = location.href.indexOf('?')
        let hackyPath = location.href.substring(qIndex + 1)
        console.log(hackyPath.startsWith('/'))
        if (hackyPath.startsWith('/') == false) {
            hackyPath = '/' + hackyPath
        }
        return hackyPath
    } else {
        return null
    }

}
// text: "250 (125 x2)" -> 2
export function extractXPMultiplierFromText(text) {
    const indexOfX = text.indexOf('x')
    if (indexOfX == null)
        return null
    const multiplierDigit = text[indexOfX + 1]
    return parseInt(multiplierDigit)
}
// text: "250 (125 x2)" -> 250;     250 -> 250
export function extractBaseXPFromText(text) {
    if (Number.isInteger(text))
        return text
    let xpSoFar = ''
    let i = 0
    while (i < text.length && isCharDigit(text[i])) {
        xpSoFar += text[i]
        i += 1
    }
    return parseInt(xpSoFar)
}
export function extractDefenseFromMonsterArmor(text) {
    if (Number.isInteger(text))
        return text
    let defenseSoFar = ''
    let i = 0
    while (i < text.length && isCharDigit(text[i])) {
        defenseSoFar += text[i]
        i += 1
    }
    return parseInt(defenseSoFar)
}
export const $LESSER_SPELLS_NAMES = getAllBasicSpellsAsArray().filter(spell => spell.Degree == 'Lesser').map(spell => spell.Name)
export const $MINOR_SPELLS_NAMES = getAllBasicSpellsAsArray().filter(spell => spell.Degree == 'Minor').map(spell => spell.Name)
export const $MAJOR_SPELLS_NAMES = getAllBasicSpellsAsArray().filter(spell => spell.Degree == 'Major').map(spell => spell.Name)
export const $GRAMD_SPELLS_NAMES = getAllBasicSpellsAsArray().filter(spell => spell.Degree == 'Grand').map(spell => spell.Name)
export const $SKILLS = Object.keys(skills).map(name => removeTildes(name))
export function getVariantsForEachCollection(collectionName) {
    switch (collectionName) {
        case '$OneHandedWeapons': return [...Object.keys(weapons['One-Handed Melee']), ...Object.keys(weapons['One-Handed Ranged'])].filter(weapon => weapon != 'Punch')
        case '$TwoHandedWeapons': return [...Object.keys(weapons['Two-Handed Melee']), ...Object.keys(weapons['Two-Handed Ranged'])]
        case '$Skills': return $SKILLS.map(name => name.slice(name.lastIndexOf(' ') + 1))
        
        // Half-Action, 0 Mana             Once / Combat
        case '$LesserSpells': return $LESSER_SPELLS_NAMES
        
        // 1 Action, 0 Mana                 Once / Adventure
        // Half-Action, 1 Mana
        case '$MinorSpells': return $MINOR_SPELLS_NAMES

        // 1 Action, 1 Mana                 Once / Adventure
        // Half-Action, 2 Mana
        case '$MajorSpells': return $MAJOR_SPELLS_NAMES

        // >>
        case '$GrandSpells': return $GRAMD_SPELLS_NAMES
    }
    return []
}
export function assertCorrectSpellFormat(spell) {
    function error(msg) {
        throw new Error(`Error: ${msg}`)
    }
    if (spell == null) {
        error('Null spell given.')
    }
    if (spell.Name == null) {
        console.log({spell})
        error('Spell has no Name (printed above).')
    }
    const { DoubleTable, DoubleTableNumbered } = spell
    if (DoubleTable != null) {
        const { Headers, Values } = DoubleTable
        if (Values == null) {
            error(`Spell ${spell.Name} has no Values property on DoubleTable`)
        }
        if (Values.length % 2 != 0) {
            error(`Spell ${spell.Name} Values property on DoubleTable has incorrect number of values (should be multiple of 2)`)
        }
    }
    if (DoubleTableNumbered != null) {
        const { Headers, Values } = DoubleTableNumbered
        if (Headers == null || Headers.length < 2) {
            error(`Spell ${spell.Name} has no Headers property on DoubleTableNumbered`)
        }
        if (Values == null) {
            error(`Spell ${spell.Name} has no Values property on DoubleTableNumbered`)
        }
        if (Values.length % 2 != 0) {
            error(`Spell ${spell.Name} Values property on DoubleTableNumbered has incorrect number of values (should be multiple of 2)`)
        }
    }

}
export function getAllClasses() {
    return Classes
}
export function getAllRaces() {
    return Races
}
export function getClassRepresentativeIconName(classObj) {
    console.log({classObj})
    const firstSpellName = Object.keys(classObj['Starting Abilities'])[0]
    const spellName = removeTildes(firstSpellName)
    return spellName
}
export function getSpecRepresentativeIconFullPath(classObj, specName) {
    const specObject = classObj.Specs[specName]
    const firstSpellName = Object.keys(specObject['Starting Abilities'])[0]
    const spellName = removeTildes(firstSpellName)
    return getSpellIconPathByName(spellName)
}
export function calculateStat(statName, value) {
    statName = statName.toLowerCase().trim()
    value = parseInt(value)
    const nameToCalc = {
        'might': value * 2,
        'dexterity': 4 + Math.ceil(value),
        'intelligence': value,
        'sense': value,
        'charisma': value * 3
    }
    return nameToCalc[statName]
}
export function calculateMaxHealth(raceName, className, level, might) {
    if (raceName == null || className == null || level == null || might == null) {
        return -1
    }
    const raceObj = getAllRaces()[raceName]
    const classObj = getAllClasses()[className]

    return raceObj.Stats['Base Health']
            + calculateStat('Might', might)
            + level * classObj['Level Up']['Every Level'].Health
}
export function calculateBaseCombatStats(raceName, className, level, stats) {
    if (raceName == null || className == null || level == null || stats == null) {
        return -1
    }
    const raceObj = getAllRaces()[raceName]
    const classObj = getAllClasses()[className]
    const [might, dexterity, intelligence, sense, charisma] = stats

    return {
        maxHealth: raceObj.Stats['Base Health'] + calculateStat('Might', might) + level * classObj['Level Up']['Every Level'].Health,
        healthRegen: raceObj.Stats['Health Regen'] + calculateStat('Sense', sense) + level * 2,
        movementSpeed: calculateStat('Dexterity', dexterity),
        initiative: calculateStat('Charisma', charisma)
    }
}
export function calculateHealthRegen(raceName, className, level, sense) {
    if (raceName == null || className == null || level == null || sense == null) {
        return -1
    }
    const raceObj = getAllRaces()[raceName]
    const classObj = getAllClasses()[className]

    return raceObj.Stats['Health Regen']
            + calculateStat('Sense', sense)
            + level * 2
}
export function calculateMovementSpeed(raceName, className, level, dexterity) {
    if (raceName == null || className == null || level == null || sense == null) {
        return -1
    }
    const raceObj = getAllRaces()[raceName]
    const classObj = getAllClasses()[className]

    return raceObj.Stats['Health Regen']
            + calculateStat('Sense', sense)
            + level * 2
}






// ---------------- Array Utilities ----------------

// Puts it at the end if it has no keyName property.
export function sortObjectArrayByKey(array, keyName) {
    if (Array.isArray(array) == false) {
        console.log({array})
        throw `Did not give an array to sortObjectArrayByKey. See object above.`
    }
    const sortedArray = [...array].sort(function(a, b) {
        const aSort = a[keyName] != null? a[keyName]: 99999
        const bSort = b[keyName] != null? b[keyName]: 99999
        return aSort - bSort
    })
    return sortedArray
}
export function sortSpellsArrayByOrderOnWebsite(array) {
    return sortObjectArrayByKey(array, 'OrderOnWebsite')
}

export function insertBetweenAll(array, insertWhat) {
    if (array.length == 0) return array;

    const newArray = [array[0]]

    for (let i = 1; i < array.length; i++) {
        newArray.push(
            typeof insertWhat === 'function'?
                insertWhat(i):
                insertWhat
        )
        newArray.push(array[i])
    }

    return newArray
}
export function areArraysEqual(a1, a2) {
    if (a1.length != a2.length) return false
    for (let i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) return false
    }
    return true
}

export function mapObject(obj, func) {
    const keys = Object.keys(obj)
    let newObj = {}
    for (const oldKey of keys) {
        const oldValue = obj[oldKey]
        const { key, value } = func({key: oldKey, value: oldValue})
        newObj = {...newObj, [key]: value }
    }
    return newObj
}

export function groupBy(arr, hashFunc) {
    const hashKeyArrayElemValuePairs = {}
    for (const elem of arr) {
        const elemHash = hashFunc(elem)
        if (elemHash == null)
            continue
        if (hashKeyArrayElemValuePairs[elemHash] == null) {
            hashKeyArrayElemValuePairs[elemHash] = []
        }
        hashKeyArrayElemValuePairs[elemHash].push(elem)
    }
    return hashKeyArrayElemValuePairs
}

export function numbersUntil(num) {
    const arr = []
    for (let i = 0; i < num; i++) {
        arr.push(i)
    }
    return arr
}
export function last(arr) {
    return arr[arr.length - 1]
}
export function allEqual(arr, val) {
    const allEqualElems = arr.filter(elem => elem == val)
    return arr.length == allEqualElems.length
}
export function splitArrayEvenly(arr, nArrays) {
    const arrays = new Array(nArrays)
    for (let i = 0; i < nArrays; i++) {
        arrays[i] = []
    }
    for (let i = 0; i < arr.length; i++) {
        const arrayI = i % nArrays
        arrays[arrayI].push(arr[i])
    }
    return arrays
}
window.splitArrayEvenly = splitArrayEvenly




// ---------------- Forms and Valdiation ----------------

export function ifOk(whatToCheck, then) {
    return (whatToCheck == null)? null : then
}

// Wraps sections like "1d10 + 20" in a dark red span; returns an array of text or span components
export function enspanDamageCalculations(text) {
    const words = text.split(' ')

    const isWordDamageCalcPart = (word) => {
        return isDice(word) || isOperator(word) || isStringNumeric(word)
    }

    let state = 'none'
    let currentPhraseWords = []
    const phrases = []
    for (let i = 0; i < words.length; i++) {
        const word = words[i]
        const nextWord = (i + 1 <= words.length - 1) ? words[i+1] : null
        switch (state) {
            case 'none':
                currentPhraseWords.push(word)
                if (isWordDamageCalcPart(word)) {
                    if (isWordDamageCalcPart(nextWord)) {
                        state = 'in-damage'
                    } else {
                        state = 'in-normal'
                    }
                } else {
                    state = 'in-normal'
                }
                break
            case 'in-normal':
                if (isWordDamageCalcPart(word)) {
                    if (isWordDamageCalcPart(nextWord)) {
                        phrases.push(currentPhraseWords.join(' '))
                        currentPhraseWords = [word]
                        state = 'in-damage'
                    } else {
                        currentPhraseWords.push(word)
                    }
                } else {
                    currentPhraseWords.push(word)
                }
                break
            case 'in-damage':
                if (isWordDamageCalcPart(word)) {
                    currentPhraseWords.push(word)
                } else {
                    phrases.push(
                        (<span className='monster-ability__damage'>{currentPhraseWords.join(' ')}</span>)
                    )
                    currentPhraseWords = [word]
                    state = 'in-normal'
                }
                break
        }
    }
    if (currentPhraseWords.length > 0) {
        if (state == 'in-normal') {
            phrases.push(currentPhraseWords.join(' '))
        } else {
            phrases.push(
                (<span className='monster-ability__damage'>{currentPhraseWords.join(' ')}</span>)
            )
        }
    }
    return phrases
}

// Returns an array of componentos
export function parseTextWithSymbols(text, customSymbols, options = {}) {
    if (text == null) {
        console.log({customSymbols, options})
        throw `Null text given to parseTextWithSymbols. Other params printed above`
    }

    const {isDebug, shouldUseOnlyCustomSymbols} = options

    let symbolToInsertion = {
        'Damage': () => (<Icon name="Damage"/>),
        'Mana': () => (<Icon name="Mana"/>),
        'Diamond': () => (<span style={{fontSize: '0.8em'}}>🔹</span>),
        'Pets and Animals': () => (<Link to="/Other/PetsAndAnimals">Pets and Animals</Link>),
        'Offensive Abilities': () => (<span>Offensive means that it deals Damage or applies hard Crowd Control (anything better than Slow and creating Hard Terrain).</span>),
        
        'Feared': () => (<span>A Feared Unit can only do <b>one</b> Act on its turn (e.g. move, make one attack, use one Ability, etc).</span>),
        'Crippled': () => (<span>A Crippled Unit deals -100% Damage.</span>),
        'Silenced': () => (<span>A Silenced Unit can't use Abilities.</span>),
        'Fumbling': () => (<span>A Fumbling Unit's next Act is completely negated (Movement, attack, spell, or anything that requires Actions).</span>),
        'Blinded': () => (<span>A Blinded Unit has -4 to all rolls.</span>),
        'Slowed': () => (<span>A Slowed Unit has -2 Movement Speed.</span>),
        'Rooted': () => (<span>A Rooted Unit has can't move from its space (but it can attack, cast Spells, etc).</span>),
        'Stunned': () => (<span>A Stunned Unit skips its turn.</span>),
        'Cover': () => (<span>If a Unit has Cover from you (e.g. is behind an obstacle), everything you do to it gets -2.</span>),
        'DiceUpgrade': () => (<span>Having <b>Dice Upgraded</b> means, for example, d6's become d8's, or d10's become d12's. D12's and d20's don't increase.</span>),
        'DiceDowngrade': () => (<span>Having <b>Dice Downgraded</b> means, for example, d8's become d6's, or d10's become d8's. D4's and d20's don't decrease.</span>),
        'Flank': () => (<span>Flanking is when you melee-attack an enemy, and an ally of yours is directly behind the enemy. As an optional rule (ask the QM), flank attacks can deal +1 Damage.</span>),
        'FoolsGold': () => (<span>Fool's Gold is an imaginary currency that can be converted to real Gold by spending 1 hour in a town or city. Fool's Gold lasts until converted to real Gold.</span>),
        'Ultimate': () => (<span>This is your Ultimate Class Ability and, after getting this Talent, you can no longer change your Talents inbetween Adventures.</span>),
        
        'Gold': () => (<Icon name="Gold"/>)
    }

    const functions = {
        'RandomOf': function(args) {
            return randomOf(...args)
        }
    }

    if (customSymbols != null) {
        if (shouldUseOnlyCustomSymbols === true) {
            symbolToInsertion = {...customSymbols}
        } else {
            symbolToInsertion = {...symbolToInsertion, ...customSymbols}
        }
    }
    
    if (isDebug === true) {
        console.log({symbolToInsertion})
    }

    const symbolToMarkup = {
        '^': text => (<b>{text}</b>),
        '_': text => (<i>{text}</i>),
        '~': text => (<span style={{color: 'var(--blue-color)'}}>{text}</span>)
    }
    const MARKUP_DELIMITERS = Object.keys(symbolToMarkup)

    let currentTextPartStart = 0
    let textParts = []

    let state = 'reading-normal-text'
    let symbolStart = null
    let markupSymbol = null
    let urlText = null
    let functionName = ''
    let isReadingFunctionString = false
    let functionStringStart = 0
    let functionStrings = []
    let stringSymbol
    for (let i = 0; i < text.length; i++) {
        const char = text[i]
        switch (state) {
            case 'reading-normal-text':
                if (char == '{') {
                    if (i > 0) {
                        textParts.push(text.substring(currentTextPartStart, i))
                    }
                    symbolStart = i
                    state = 'reading-symbol'
                }
                if (char == '`') {
                    textParts.push(text.substring(currentTextPartStart, i))
                    symbolStart = i
                    state = 'reading-url'
                }
                if (MARKUP_DELIMITERS.includes(char) && shouldUseOnlyCustomSymbols !== true) {
                    textParts.push(text.substring(currentTextPartStart, i))
                    symbolStart = i
                    state = 'reading-markup'
                    markupSymbol = char
                }
                break
            case 'reading-symbol':
                if (char == '}') {
                    const symbol = text.substring(symbolStart + 1, i)
                    if (symbolToInsertion[symbol] == null) {
                        throw `ERROR: Symbol ${symbol} not found for parsing.`
                    }
                    if (typeof(symbolToInsertion[symbol]) != 'function') {
                        console.log(symbolToInsertion[symbol])
                        throw `ERROR: Symbol ${symbol} not a function. Value above.`
                    }
                    textParts.push(symbolToInsertion[symbol]())    // Push current symbol
                    currentTextPartStart = i + 1
                    state = 'reading-normal-text'
                } else if (char == '(') {
                    functionName = text.substring(symbolStart + 1, i)
                    isReadingFunctionString = false
                    functionStrings = []
                    state = 'reading-function'
                }
                break
            case 'reading-function':
                if (char == '"' || char == "'") {
                    if (isReadingFunctionString == false) {
                        stringSymbol = char
                        functionStringStart = i + 1
                        isReadingFunctionString = true
                    } else if (isReadingFunctionString && char == stringSymbol) {
                        const str = text.substring(functionStringStart, i)
                        functionStrings.push(str)
                        isReadingFunctionString = false
                    }
                } else if (char == ')') {
                    if (isReadingFunctionString) {
                        continue
                    }
                    const func = functions[functionName]
                    const args = functionStrings
                    textParts.push(func(args))
                } else if (char == '}') {
                    currentTextPartStart = i + 1
                    state = 'reading-normal-text'
                }
                break
            case 'reading-markup':
                if (char == markupSymbol) {
                    const markupedText = text.substring(symbolStart + 1, i)
                    textParts.push(symbolToMarkup[markupSymbol](markupedText))    // Push markuped text
                    currentTextPartStart = i + 1
                    state = 'reading-normal-text'
                }
                break
            case 'reading-url':
                if (char == '$') {
                    urlText = text.substring(symbolStart + 1, i)
                    currentTextPartStart = i + 1
                }
                if (char == '`') {
                    const url = text.substring(currentTextPartStart, i)
                    textParts.push(<Link to={url}>{ urlText }</Link>)
                    currentTextPartStart = i + 1
                    state = 'reading-normal-text'
                }
        }
    }

    if (state == 'reading-normal-text') {
        if (currentTextPartStart < text.length) {
            textParts.push(text.substring(currentTextPartStart, text.length))
        }
    }

    return textParts

}
window.parseTextWithSymbols = parseTextWithSymbols

export function isFormValueNumeric(value) {
    if (value.length == 0)
        return true
    if (value.length == 1 && value[0] == '-')
        return true
    return isStringNumeric(value)
}
export function isFormValueInt(value) {
    if (value.includes('.'))
        return false
    return isFormValueNumeric(value)
}
// Tries to cast whatever is given to an int
// If it fails, returns the default value
export function asIntOr(toCast, defaultValue) {
    if (Number.isInteger(toCast))
        return toCast
    if (isNumber(toCast))
        return Math.floor(toCast)
    if (isStringNumeric(toCast))
        return parseInt(toCast)
    return defaultValue
}


export function formValueIntOr(value, orUseThis) {
    if (isFormValueInt(value))
        return value
    return orUseThis
}

export function hasAnyProperty(obj, propList) {
    for (const prop of propList) {
        if (obj[prop] != undefined) return true
    }
    return false
}
export function isCharDigit(char) {
    return '0123456789'.includes(char)
}

// ---------------- Other Small Utilities ----------------
export function logAndReturn(obj) {
    console.log(obj)
    return obj
}
export function def(val, func) {
    return func(val)
}
export function getOnlyProp(obj) {
    return getAnyPropNameExcept(obj, 'default')
}
export function stringReplaceAllMany(str, replaceWhats, replaceWiths) {
    for (let i = 0; i < replaceWhats.length; i++) {
        str = str.split(replaceWhats[i]).join(replaceWiths[i])
    }
    return str
}
export function isObject(obj) {
    return typeof obj === 'object'
}
export function isString(obj) {
    return typeof obj === 'string' || obj instanceof String;
}
export function isNumber(obj) {
    return ! isNaN(obj)
}
export function isStringNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
export function getPageHashFromLocation(location) {       // Use 'const location = useLocation()' in a component to get location (from 'react-router-dom')
    const decodedHash = decodeURIComponent(location.hash)
    if (decodedHash == null || decodedHash.length == 0)
        return ''
    return decodedHash.substring(1) // Remove the "#" at the beginning
}
export function scrollToId(id, offset) {
    offset = offset == null? 0 : offset
    const elemWithId = document.getElementById(id)
    if (elemWithId != null) {
        const elemPosition = elemWithId.getBoundingClientRect().top
        const scrollPosition = elemPosition + window.scrollY - offset
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        })
    }
}
export function getBasePathBeforeHash(linkWithHash) {
    const hashIndex = linkWithHash.indexOf('#')
    return linkWithHash.substring(0, hashIndex)
}
export function isBasePathEmpty(basepath) {
    return basepath == null || basepath.length == 0 || basepath == '/'
}
export function isHashEmpty(hash) {
    return hash == null || hash.length == 0 || hash == '#'
}
export function getAnyPropNameExcept(obj, exceptions) {
    if (Array.isArray(exceptions) == false)
        exceptions = [exceptions]
    const props = Object.keys(obj)
    const remainingProps = props.filter(propName => exceptions.includes(propName) == false)
    if (remainingProps.length == 0)
        return null
    return remainingProps[0]
}
export function getLocalStorageBool(name) {
    const value = window.localStorage.getItem(name)
    if (value == null) return false
    if (value == 'false') return false
    if (value == 'true') return true
    return false
}
export function randomInt(low, high){
    return Math.floor(Math.random() * (high - low + 1) + low);
}
export function randomOf(...args){
    return args[randomInt(0, args.length - 1)];
}
export function shuffle(array_a){
    var iRandomize;
    for(iRandomize = 0; iRandomize < array_a.length; iRandomize++){
        var randomizeArrayIndex = randomInt(0, array_a.length - 1);
        var auxRandomize = array_a[iRandomize];
        array_a[iRandomize] = array_a[randomizeArrayIndex];
        array_a[randomizeArrayIndex] = auxRandomize;
    }
    return array_a
}
export function range(fromIncluding, toExcluding) {
    const numbers = []
    for (let i = fromIncluding; i < toExcluding; i++) {
        numbers.push(i)
    }
    return numbers
}
export function takeRandomElements(fromArray, numberOfElements) {
    return shuffle([...fromArray]).slice(0, numberOfElements)
}
export function percentChance(num) {
    const roll = (1 - Math.random()) * 100
    return num >= roll
}
export function capitalizeFirstLetter(str) {
    const str2 = str.charAt(0).toUpperCase() + str.slice(1)
    return str2
}
export function isLocalhost() {
    return window.location.href.includes('localhost')
}
export function createKey(values) {
    return Array.from(values).map(value => value.substring(0, 10).split(' ').join('_')).join('-')
}
export function assert(cond, message) {
    if (message == null) {
        message = `condition given ${cond} is not true`
    }
    message = 'Assert error: ' + message
    if (cond == null) {
        throw 'Assert error: condition is null'
    }
    if (typeof cond === 'function') {
        if (cond() != true) {
            throw message
        }
    }
    if (cond != true) {
        throw message
    }
}
export function isMobile() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}



// ---------------- React Small Utilities ----------------
export const styleMargined = { marginBottom: 'var(--element-padding)' }    // Use this as style={styleMargined}
export const stylePadded   = { padding: 'var(--element-padding)' }



export function useLocalStorageState(keyName, defaultValue) {
    const existingValue = localStorage.getItem(keyName)
    if (existingValue == null) {
        localStorage.setItem(keyName, JSON.stringify(defaultValue))
    }

    const [state, setInnerState] = useState(JSON.parse(localStorage.getItem(keyName)))
    
    useEffect(() => {
        window.addEventListener('storage', evt => {
            if (evt.key == keyName) {
                setInnerState(JSON.parse(evt.newValue))
            }
        })
    }, [])

    function setState(newState) {
        localStorage.setItem(keyName, JSON.stringify(newState))
        setInnerState(newState)
    }

    return [state, setState]
}



// -------------------------- Canvas --------------------------

let ctxSettings = {
    'default': {}
}
export function saveCtxSettings(ctx, key) {
    let ctxSettingsObject
    if (key == null) {
        ctxSettingsObject = ctxSettings['default']
    } else {
        if (ctxSettings[key] == null) {
            ctxSettings[key] = {}
        }
        ctxSettingsObject = ctxSettings[key]
    }
    ctxSettingsObject.textAlign = ctx.textAlign
    ctxSettingsObject.font = ctx.font
    ctxSettingsObject.fillStyle = ctx.fillStyle
    ctxSettingsObject.globalAlpha = ctx.globalAlpha
    ctxSettingsObject.stroke = ctx.stroke
    ctxSettingsObject.lineWidth = ctx.lineWidth
}
export function loadCtxSettings(ctx, key) {
    const ctxSettingsObject = key == null? ctxSettings['default'] : ctxSettings[key]
    for (const key of Object.keys(ctxSettingsObject)) {
        ctx[key] = ctxSettingsObject[key]
    }
}

export function drawImageOnCanvasAsync(canvas, pathOrImage, x, y, width, height, alpha) {
    const ctx = canvas.getContext('2d')
    let image
    if (typeof pathOrImage === 'string' || pathOrImage instanceof String) {
        image = new Image()
        image.src = pathOrImage
    } else {
        image = pathOrImage
    }
    return new Promise((res, rej) => {
        image.onload = function() {
            saveCtxSettings(ctx)
            if (alpha != null) {
                ctx.globalAlpha = alpha
            }
            if (width == null && height != null) {
                ctx.drawImage(image, x, y, getImageRelativeWidthAtHeight(image, height), height)
            } else if (width != null && height == null) {
                ctx.drawImage(image, x, y, width)
            } else if (width != null && height != null) {
                ctx.drawImage(image, x, y, width, height)
            } else {
                ctx.drawImage(image, x, y)
            }
            loadCtxSettings(ctx)
            res()
        }
    })
}
export function getImageRelativeWidthAtHeight(image, atHeight) {
    const aspectRatio = image.naturalWidth / image.naturalHeight
    return atHeight * aspectRatio
}
export function fillCanvasColor(canvas, color) {
    const ctx = canvas.getContext('2d')
    saveCtxSettings(ctx)
    ctx.fillStyle = color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    loadCtxSettings(ctx)
}
export function clearCanvas(canvas) {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.reset()
}
export function clearRect(canvas, x, y, width, height) {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(x, y, width, height)
}
export function drawText({canvas, font, x, y, text, textAlign='center', color, strokeColor, strokeSize, rotation}) {
    const ctx = canvas.getContext('2d')
    ctx.save()
    if (color != null) {
        ctx.fillStyle = color
    }
    ctx.textAlign = textAlign
    ctx.font = font
    if (strokeColor != null) {
        ctx.strokeStyle = strokeColor
    }
    if (strokeSize != null) {
        ctx.lineWidth = strokeSize
    }
    if (rotation != null) {
        ctx.rotate(Math.PI / 180 * rotation)
    }
    if (strokeSize != null || strokeColor != null) {
        ctx.strokeText(text, x, y);
    }
    ctx.fillText(text, x, y)
    ctx.restore()
}

export function drawTextLines({canvas, font, x, y, width, text, lineHeight, textAlign='center', color, isCenteredY=true, strokeColor, strokeSize}) {
    const ctx = canvas.getContext('2d')
    saveCtxSettings(ctx, 'drawTextLines')
    ctx.font = font
    const lines = getLines(ctx, text, width)
    console.log(`Got lines as`)
    console.log({lines})
    const totalHeight = lines.length * lineHeight
    const startY = isCenteredY ? y - totalHeight / 2 : y
    for (let i = 0; i < lines.length; i++) {
        const textLine = lines[i]
        const thisY = startY + i * lineHeight
        drawText({canvas, font, x, y: thisY, text: textLine, textAlign, color, strokeColor, strokeSize})
    }
    loadCtxSettings(ctx, 'drawTextLines')
    return lines
}

export function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

export function getOnlyKey(obj) {
    return Object.keys(obj)[0]
}
export function getTextWidth(font, text) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    ctx.font = font
    const width = ctx.measureText(text).width
    return width
    
}
export function arrayUnion(a, b) {
    const fullArray = [...a]
    for (const elem of b) {
        if (a.includes(b) == false) {
            fullArray.push(elem)
        }
    }
    return fullArray
}
export function arrayDiff(arrayA, arrayB) {
    const onlyArrayA = []
    const both = []
    const onlyArrayB = []
    for (const elemA of arrayA) {
        if (arrayB.includes(elemA)) {
            both.push(elemA)
        } else {
            onlyArrayA.push(elemA)
        }
    }
    for (const elemB of arrayB) {
        if (arrayA.includes(elemB) == false) {
            onlyArrayB.push(elemB)
        }
    }
    return { left: onlyArrayA, both, right: onlyArrayB }
}
export function mergeObjectsContainingArrays(a, b) {
    console.log('Ok')
    const { left, both, right } = arrayDiff(Object.keys(a), Object.keys(b))
    const finalObject = {}
    for (const key of left) {
        finalObject[key] = a[key]
    }
    for (const key of right) {
        finalObject[key] = b[key]
    }
    for (const key of both) {
        finalObject[key] = [...a[key], ...b[key]]
    }
    console.log('yy')
    return finalObject
}
export function randomOfArrayWeighted(items, _weights) {
    let i;
    let weights = [..._weights]

    for (i = 1; i < weights.length; i++)
        weights[i] += weights[i - 1];
    
    let random = Math.random() * weights[weights.length - 1];
    
    for (i = 0; i < weights.length; i++)
        if (weights[i] > random)
            break;
    
    return items[i];
}

export function containsNumber(str) {
    for (let i = 0; i < str.length; i++) {
        if ('0123456789'.includes(str.at(i))) {
            return true
        }
    }
    return false
}
window.containsNumber = containsNumber
export function parseFloatIgnoreStrings(str) {
    const allowOnly = '0123456789.'
    const formattedStr = str.split('').filter(char => allowOnly.includes(char)).join('')
    if (formattedStr.length == 0 || formattedStr == '.') {
        throw `Invalid str given to parseFloatIgnoreStrings: "${str}"`
    }
    return parseFloat(formattedStr)
}
window.parseFloatIgnoreStrings = parseFloatIgnoreStrings

// bio = Druid Person 250 Normal
export function bioMatchesSearchText(bio, {mathClauses, textClauses}) {
    const bioNumbers = bio.split(' ').filter(str => containsNumber(str)).map(str => parseFloatIgnoreStrings(str))   // E.g: 400 2   (from "Druid 400 Epic x2")
    function containsName(bio) {
        const matches = []
        for (const clause of textClauses) {
            if (bio.includes(clause)) {
                matches.push(true)
            }
        }
        return matches.length == textClauses.length
    }
    function byNumber(bio) {
        if (containsNumber(bio) == false) {
            return true // 
        }
        for (const clause of mathClauses) {
            let compareNumberToClause = (num, cla) => num == cla
            if (clause.startsWith('>=')) {
                compareNumberToClause = (num, cla) => num >= cla
            } else if (clause.startsWith('>')) {
                compareNumberToClause = (num, cla) => num > cla
            } else if (clause.startsWith('<=')) {
                compareNumberToClause = (num, cla) => num <= cla
            } else if (clause.startsWith('<')) {
                compareNumberToClause = (num, cla) => num < cla
            }
            const clauseAsNumber = parseFloatIgnoreStrings(clause)                                                      // E.g: 250
            return bioNumbers.find(num => compareNumberToClause(num, clauseAsNumber)) != null                           // E.g. Any of [400, 2] > 250
        }
        return false
    }

    let shouldFilterNumbers = mathClauses.length > 0
    let shouldFilterStrings = textClauses.length > 0

    if (shouldFilterNumbers && shouldFilterStrings) {
        return containsName(bio) && byNumber(bio)
    }
    if (shouldFilterNumbers) {
        return byNumber(bio)
    }
    if (shouldFilterStrings) {
        return containsName(bio)
    }
}
window.bio = "Druid 400 Person x2"
window.searchText = ">250"
window.bioMatchesSearchText = bioMatchesSearchText
export function filterArrayBySearch(arr, getElemBio, searchText) {
    searchText = searchText.toLowerCase()
    const clauses = searchText.split('&').map(str => str.trim())
    const mathClauses = clauses.filter(clause => containsNumber(clause))                                            // E.g: >250    (from "Druid & >250")
    const textClauses = clauses.filter(clause => containsNumber(clause) == false)
    return arr.filter(elem => {
        const bio = getElemBio(elem).toLowerCase()
        return bioMatchesSearchText(bio, {mathClauses, textClauses})
    })
}
window.filterArrayBySearch = filterArrayBySearch