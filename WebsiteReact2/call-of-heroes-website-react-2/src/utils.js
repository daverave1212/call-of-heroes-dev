import { Link } from "react-router-dom"
import markdownit from 'markdown-it'

import Icon from "./components/Icon"
import Separator from "./components/Separator/Separator"

import weapons from './databases/Weapons.json'
import armors from './databases/Armors.json'
import skills from './databases/Proficiencies.json'
import abilities from './databases/Abilities.json'
import prices from './databases/Prices.json'
import magicItems from './databases/Other/MagicItems.json'
import overallData from './databases/OverallData.json'
import { Races, Classes, ClassesBase, ClassesPremium, ClassesLegacy } from './pages/Other/AllRacesAndClasses'
import { useEffect, useState } from "react"
import BasicAbilities from './databases/Abilities.json'
import SpellFonts from './databases/SpellFonts.json'
import Feats from './databases/Feats.json'
import ClassAndRaceAbilities from './databases/ClassAndRaceAbilities.json'
import { getChoiceAbilitiesObjects, setChoiceAbilitiesObjects } from "./pages/Other/CharacterCreationCalculator/CharacterData"
import { MAIN_STAT_ALTERNATIVES_MAP, STAT_LIMITS_TEXT, STAT_SYMBOLS } from "./services/game-lib/stat-calculations"
import { VALID_SPELL_TOP_STATS } from "./components/Spell/Spell"
import QuestGuardConfig from './QuestGuardConfig.json'

import STATIC_SYMBOLS from './parse-text-symbols-static.json'

// ---------------- Spells Utilities ----------------
const SPELL_PROPS_TO_PARSE = [
    'Effect', 'EffectGreen', 'Downside', 'Upgrade', 'Combo', 'Notes'
]
const SPELL_PROPS_TO_PARSE_AS_TEXT = [
    'DisplayName',
    'SubspellName',
    'CustomMiniIconPath',
    'MiniIconName'
]
export function parseAndNormalizeSpell(spell, options={
    isItem: false,
    variantIndex: 0
}) {

    const { isItem=false, variantIndex=0 } = options
    const spellModified = {...spell}
    
    // Normalize Name
    spellModified.Name = getNormalizedSpellName(spell)
    spellModified.IconPath = getSpellOrItemIconPath(spell, isItem)

    // Fix Effect
    if (QuestGuardConfig.isActionPointsMappingEnabled && spell.Effect != null) {
        spellModified.Effect = stringReplaceAllMany(spell.Effect, Object.keys(QuestGuardConfig.actionPointsMapping), Object.keys(QuestGuardConfig.actionPointsMapping).map(key => QuestGuardConfig.actionPointsMapping[key]))
    }

    // Normalize variants
    let extraMixins = {}
    maybeNormalizeSpellForEachVariants(spellModified)
    // Set spell props based on the current variant
    if (spellModified.Variants != null && spellModified.Variants.length > 0) {
        const currentVariant = spellModified.Variants[variantIndex]
        extraMixins = mapObject(currentVariant, ({key, value}) => ({
            key: key,
            value: { tag: 'span', text: value }
        }))
        spellModified.IconPath = currentVariant.IconName == null? spellModified.IconPath: getSpellIconPathByName(currentVariant.IconName)
        spellModified.A = currentVariant.DisplayA ?? spell.A
        spellModified.SubspellName = currentVariant.SubspellName ?? spellModified.SubspellName
        spellModified.Cost = currentVariant.Cost ?? spellModified.Cost
    }

    // Parse all mixins, including variants
    if (spell.HasMixins === true || hasSpellVariants(spell)) {
        for (const propName of SPELL_PROPS_TO_PARSE) {
            if (spell[propName] == null) {
                continue
            }
            try {
                spellModified[propName] = parseTextWithSymbols(spell[propName], extraMixins)
            } catch (e) {
                console.log({spell, options})
                throw `Error in Spell ${spellModified.Name} at prop ${propName} parsing text: ${spell[propName]}. Spell printed above. Error: ${e}`
            }
        }
        for (const propName of SPELL_PROPS_TO_PARSE_AS_TEXT) {
            if (spell[propName] == null) {
                continue
            }
            if (propName == 'MiniIconName') {
                console.green('Found a MIniIconName!!!')
                console.log({spell, extraMixins, propName, options, newProp: parseTextWithSymbols(spell[propName], extraMixins, { shouldReturnStringsOnly: true})?.join('')})
            }
            try {
                spellModified[propName] = parseTextWithSymbols(spell[propName], extraMixins, { shouldReturnStringsOnly: true})?.join('')
            } catch (e) {
                console.log({spell, options})
                throw `Error in Spell ${spellModified.Name} at prop as text ${propName} parsing text: ${spell[propName]}. Spell printed above. Error: ${e}`
            }
        }
    }

    spellModified.IsAlreadyParsed = true
    return spellModified
}
// Takes ForEachVariants and normalizes it into the .Variants property
export function maybeNormalizeSpellForEachVariants(spell) {
    if (spell.VariantsForEach == null) {
        return
    }
    spell.Variants = []
    for (let variant of spell.VariantsForEach) {
        const [mixinName, collectionName] = variant.ForEach.split(':')
        const collection = getVariantsForEachCollection(collectionName)
        const subvariants = collection.map(str => ({...variant, [mixinName]: str}))
        spell.Variants = [...spell.Variants, ...subvariants]  // TODO: This is incorrect!! If a spell will have multiple elements for VariantsForEach, it will not work properly!
    }
    delete spell.VariantsForEach
}
export function getSpellValidTopStatsObject(spell) {
    return filterObject(spell, ({ key, value }) => VALID_SPELL_TOP_STATS.includes(key) && value != null)
}
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
export function getAllSpellsFromCategoriesObject(spellCategoriesObject) {
    const categoryNames = Object.keys(spellCategoriesObject)
    let spells = []
    for (const categoryName of categoryNames) {
        const theseSpells = spellsFromObject(spellCategoriesObject[categoryName])
        spells = [...spells, ...theseSpells]
    }
    return spells
}
export function getSpellReplacementName(obj) {
    if (obj.Replacement == null) {
        return null
    }
    const replacementText = obj.Replacement.replaceAll('Replaces ', '')
    return replacementText
}
window.getSpellReplacementName = getSpellReplacementName
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
export function getAllFontSpellsAsArray() {
    return Object.values(SpellFonts).map(category => spellsFromObject(category)).flat()
}
let allSpellsArrayCached = null
export function getAllSpellsAsArray() {
    if (allSpellsArrayCached != null) {
        return allSpellsArrayCached
    }
    allSpellsArrayCached = []
    const allFontSpells = getAllFontSpellsAsArray()
    const allBasicSpells = getAllBasicSpellsAsArray()
    const allFeats = getAllSpellsFromCategoriesObject(Feats)
    const allClassAndRaceAbilities = spellsFromObject(ClassAndRaceAbilities)
    allSpellsArrayCached = [...allFontSpells, ...allBasicSpells, ...allFeats, ...allClassAndRaceAbilities]
    for (const spell of allSpellsArrayCached) {
        maybeAssignScrollPower(spell)
    }
    return allSpellsArrayCached
}
window.getAllSpellsAsArray = getAllSpellsAsArray
function autoAssignScrollPower(spell) {
    const actionPoints = getActionPointsByA(spell.A)
    const costNormalized = spell.Cost ?? '0 Mana'
    if (costNormalized.includes('Mana') == false) {
        console.log({spell})
        console.error(`Failed to assign ScrollPower Auto to spell with Cost without Mana printed above`)
        return
    }
    const manaCost = getNumberFromString(costNormalized)
    
    let spellLevel = spell.ParentKey ?? 'Level 0'
    if (spellLevel == 'Utility') {
        spellLevel = 'Level 1'
    } else if (spellLevel.includes('Level') == false) { // Fonts and other
        spellLevel = 'Level 1'
    }
    const spellTrueLevel = getNumberFromString(spellLevel)
    if (spellTrueLevel == null) {
        console.log({spell})
        console.error(`Failed to assign ScrollPower Auto to spell, ParentKey contains no number, spell printed above`)
        return
    }
    const extraPowerByLevel = spellTrueLevel <= 3? 0: spellTrueLevel <= 5? 1: 2
    spell.ScrollPower = Math.max(actionPoints - 1 + manaCost + extraPowerByLevel, 0)
}
export function isSpellFontSpell(spell) {
    return ['Fire', 'Lightning', 'Frost', 'Arcane'].includes(spell?.ParentKey ?? 'ahsjkdhaskjhd')
}
window.isSpellFontSpell = isSpellFontSpell
function maybeAssignScrollPower(spell) {
    if (spell.ScrollPower != null) {
        if (spell.ScrollPower == 'Auto') {
            autoAssignScrollPower(spell)
        }
    }
}
let allSpellsCached = null
export function getAllSpellsByName() {
    const allSpells = getAllSpellsAsArray()
    if (allSpellsCached != null) {
        return allSpellsCached
    }
    allSpellsCached = {}
    for (const spell of allSpells) {
        if (allSpellsCached[spell.Name] == null) {
            allSpellsCached[spell.Name] = spell
        }
    }
    return allSpellsCached
}
window.getAllSpellsByName = getAllSpellsByName
export function getSpellByName(name) {
    if (name == null) {
        throw `Null spell given by name to getSpellByName.`
    }
    if (name.startsWith('~')) {
        name = name.substring(1, name.length - 1)
    }
    return getAllSpellsByName()[name]
}
let allSkillsCached = null
export function getAllSkillsByName() {
    if (allSkillsCached != null) {
        return allSkillsCached
    }
    allSkillsCached = {}
    const skillsArray = spellsFromObject(skills)
    for (const spell of skillsArray) {
        allSkillsCached[spell.Name] = spell
    }
    return allSkillsCached
}
window.getAllSkillsByName = getAllSkillsByName
let scrollAbilitiesByPower = null
export function getAllScrollSpellNamesByPower() {
    if (scrollAbilitiesByPower != null) {
        return scrollAbilitiesByPower
    }
    const spellsThatCanBeScrolls = getAllSpellsAsArray().filter(s => s.ScrollPower != null)
    scrollAbilitiesByPower = groupBy(spellsThatCanBeScrolls, s => s.ScrollPower)
    scrollAbilitiesByPower = mapObject(scrollAbilitiesByPower, ([scrollPower, spellsArr]) => ([scrollPower, spellsArr.map(spell => spell.Name)]))
    return scrollAbilitiesByPower
}
window.getAllScrollSpellNamesByPower = getAllScrollSpellNamesByPower
let allWeaponsCached = null
function objectsWithNameFromCategoriesObjToObject(categoriesObj, exceptionCategoryNames=[]) {
    const toObj = {}
    const categoryNames = Object.keys(categoriesObj).filter(key => exceptionCategoryNames.includes(key) == false)
    for (const categoryName of categoryNames) {
        const category = categoriesObj[categoryName]
        const objNames = Object.keys(category)
        for (const objName of objNames) {
            const obj = {...category[objName]}
            obj.Name = objName
            obj.Category = categoryName
            toObj[objName] = obj
        }
    }
    return toObj
}
export function getAllWeaponsByName() {
    if (allWeaponsCached == null) {
        allWeaponsCached = objectsWithNameFromCategoriesObjToObject(weapons, ['Descriptions'])
    }
    return allWeaponsCached
}
let allArmorsCached = null
export function getAllArmorsByName() {
    if (allArmorsCached == null) {
        allArmorsCached = objectsWithNameFromCategoriesObjToObject(armors, ['Descriptions'])
    }
    return allArmorsCached
}
let magicItemsCached = null
export function getAllMagicItemsByName() {
    if (magicItemsCached != null) {
        return magicItemsCached
    }
    magicItemsCached = {}

    for (const category of Object.keys(magicItems)) {
        if (category == 'TODO') {
            continue
        }
        const itemsHere = magicItems[category].Items
        for (const [itemName, item] of Object.entries(itemsHere)) {
            item.Category = category
            item.Name = itemName
            maybeNormalizeSpellForEachVariants(item)
        }
        magicItemsCached = {...magicItemsCached, ...itemsHere}
    }
    return magicItemsCached
}
let magicItemsArrayCached = null
export function getAllMagicItemsAsArray() {
    if (magicItemsArrayCached != null) {
        return magicItemsArrayCached
    }
    magicItemsArrayCached = objectToArray(getAllMagicItemsByName(), "Name")
    return magicItemsArrayCached
}
window.getAllMagicItemsByName = getAllMagicItemsByName
window.getAllMagicItemsAsArray = getAllMagicItemsAsArray
export const normalizeItemPrice = (name, value) => isObject(value)? {...value, Name: name}: { Name: name, Price: value }
export const normalizeItemPricesInCategory = (category) => mapObject(category, ({key, value}) => ({key, value: normalizeItemPrice() }))
let pricesCached = null
export function getAllPricesByName() {
    if (pricesCached != null) {
        return pricesCached
    }
    pricesCached = {}
    for (const [categoryName, category] of Object.entries(prices)) {
        if (categoryName == 'TODO') {
            continue
        }
        for (const [itemName, itemOrPrice] of Object.entries(category)) {
            pricesCached[itemName] =
                isObject(itemOrPrice)?
                    {
                        Name: itemName,
                        Category: categoryName,
                        ...itemOrPrice,
                    }
                :
                    {
                        Name: itemName,
                        Category: categoryName,
                        Price: itemOrPrice
                    }
        }
    }
    return pricesCached
}
export function getNormalizedSpellName(spell) {
    const name = removeTildes(isString(spell.Name)? spell.Name: 'Default')
    return name
}
export function getSpellIconPathByName(name) {
    if (name == null) {
        return null
    }
    const iconName = getUniqueSpellID(name)
    const iconPath = `/Icons/Spells/${iconName}.png`
    return iconPath
}
export function getItemIconPathByName(name) {
    if (name == null) {
        return null
    }
    const iconName = getUniqueSpellID(name)
    const iconPath = `/Icons/Items/${iconName}.png`
    return iconPath
}
export function getSpellOrItemIconPath(spellOrItem, isItem=false) {
    const { CustomIconPath, IconName } = spellOrItem
    const Name = getNormalizedSpellName(spellOrItem)
    const iconPath =
        CustomIconPath != null?
            CustomIconPath:
        IconName != null? (
            isItem? getItemIconPathByName(IconName): getSpellIconPathByName(IconName)
        ):
        isItem == true?
            getItemIconPathByName(Name):    
        getSpellIconPathByName(Name)
    return iconPath
}
const STAT_ICON_PATHS = {
    'Max Health': '/Icons/UI/Health.png',
    'Health': '/Icons/UI/Health.png',
    'Mana': '/Icons/UI/Mana.png',
    'Health Regen': '/Icons/UI/HealthRegen.png',
    'Skill Point': '/Icons/UI/CharacterSetupSub.png',
    'Stat': '/Icons/UI/Level.png',
    'Any Stat': '/Icons/UI/Level.png',
    'Any Stat (up to the Stat Limit)': '/Icons/UI/Level.png',
}
export function getStatIconPathByStatName(name) {
    if (name in STAT_ICON_PATHS) {
        return STAT_ICON_PATHS[name]
    }
    return '/Icons/UI/Elemental.png'
}
export function getUniqueSpellID(name) {
    const idName = stringReplaceAllMany(name, [' ', '%', '~', '<'], ['_', '', '', ''])
    return idName
}
export function getAlternativesAsArray(text) {
    if (text == null) {
        return []
    }
    const alternativesString = text.split('Alternatives: ').join('')
    const alternatives = alternativesString.split(', ')
    return alternatives
}

export function getExtrasFromSpells(spellsArray) {
    let extras = []
    let combatExtras = []
    for (const spell of spellsArray) {
        if (spell.Extras != null) {
            extras = [...extras, ...spell.Extras]
        }
        if (spell['Combat Extras'] != null) {
            combatExtras = [...combatExtras, ...spell['Combat Extras']]
        }
    }
    return { extras, combatExtras }
}
export function addAbilityOrOpenPopup(spell, spellMetadata, selectedAbilitiesNames, setSelectedAbiltiesNames) {
    
    if (spell == null) {
        console.warn(`Null spell given to addAbilityOrOpenPopup`)
        return
    }

    const choiceBonuses = getChoiceAbilitiesObjects()

    if (selectedAbilitiesNames.includes(spell.Name)) {
        setSelectedAbiltiesNames(selectedAbilitiesNames.filter(name => name != spell.Name))
        const newChoiceBonuses = choiceBonuses.filter(obj => obj.source.name != spell.Name)
        setChoiceAbilitiesObjects(newChoiceBonuses)
    } else {
        console.log('False and let it go')
        setSelectedAbiltiesNames([...selectedAbilitiesNames, spell.Name])
    }
}
export const SortSpellsBy = {
    HEIGHT: spellsArray => {
        const spells = spellsArray.map(spell => ({...spell, Height: estimteSpellHeight(spell)}))    
        const spellsSorted = sortObjectArrayByKey(spells, 'Height').reverse()
        return spellsSorted
    },
    LEVEL_REQUIREMENT: spellsArray => {
        const newArray = [...spellsArray]
    }
}
export function splitSpellsArrayInto2Columns(spellsArray, shouldSort=true) {
    const spells = spellsArray.map(spell => ({...spell, Height: estimteSpellHeight(spell)}))
    const spellsSorted = shouldSort? (sortObjectArrayByKey(spells, 'Height').reverse()): spells

    if (spellsArray.find(s => s.Name.includes('Shapeshift')) != null) {
        console.log({spellsArray, spells, spellsSorted})
    }

    let column1Spells = []
    let column2Spells = []
    
    column1Spells.height = 0
    column2Spells.height = 0

    for (const spell of spellsSorted) {
        const columnToUse = column2Spells.height < column1Spells.height? column2Spells: column1Spells
        columnToUse.push(spell)
        columnToUse.height += spell.Height
        if (spellsArray.find(s => s.Name.includes('Shapeshift')) != null) {
            console.log([`Added ${spell.Name}`, column1Spells.height, column2Spells.height])
        }
    }

    return [column1Spells, column2Spells]
}
export function splitSpellsArrayInto2Columns_OLD(spellsArray, shouldIgnoreAlignment=false) {
    console.log(`Splitting spells array:`)
    console.log({spellsArray})
    const spells = sortObjectArrayByKey([...spellsArray], 'OrderOnWebsite')

    let column1Spells = []
    let column2Spells = []
    let spellsRest = [...spells]
    if (shouldIgnoreAlignment !== true) {
        column1Spells = spells.filter(spell => spell.AlignOnWebsite == 'Left')
        column2Spells = spells.filter(spell => spell.AlignOnWebsite == 'Right')
        spellsRest = spells.filter(spell => spell.AlignOnWebsite != 'Left' && spell.AlignOnWebsite != 'Right')
    }
    const [spellsLeft, spellsRight] = splitArrayEvenly(spellsRest, 2)
    console.log({column1Spells, column2Spells, spellsRest, spellsLeft})
    column1Spells = [...column1Spells, ...spellsLeft]
    column2Spells = [...column2Spells, ...spellsRight]
    console.log({ column1Spells, column2Spells })
    return [column1Spells, column2Spells]
}
export function isTalentTierNameMinor(tierName) {
    return tierName?.includes('Minor')
}
export function isTalentTierNameUtility(tierName) {
    return tierName?.includes('Ability Choice')
}
export function isTalentTierNameKeystone(tierName) {
    return tierName?.includes('Keystone')
}
export function isSpellMinorTalent(spell) {
    return isTalentTierNameMinor(spell?.ParentKey)
}
export function isSpellUtilityTalent(spell) {
    return isTalentTierNameUtility(spell.ParentKey)
}
export function isSpellKeystoneTalent(spell) {
    return isTalentTierNameKeystone(spell.ParentKey)
}
export function hasSpellVariants(spell) {
    return spell?.Variants != null || spell?.VariantsForEach != null
}



// --------------- Questguard Utilities --------------
export function isMonsterEpic(monster) {
    if (monster == null) {
        return false
    }
    return monster.Degree?.includes?.('Epic') || isNumber(monster.Degree)
}
export function getActionPointsByA(A, options={
    '3 Action Points': 3,
    '1 Action': 2,
    'Half-Action': 1,
    '0 Actions': 0,
    'Reaction': 0,
    'Passive': 0,
    [null]: 2
}) {
    if (!(A in options)) {
        return 2
    }
    return options[A]
}
export function getMonsterTotalXP(monster) {
    const [monsterTotalXP] = splitByNumbers(monster?.Experience ?? '0')
    return monsterTotalXP
}
export function calculateHowManyMonstersThisEpicIsWorth(monster) {
    if (!isMonsterEpic(monster)) {
        return 1
    }
    const monsterUsableAP = monster.Degree - 1
    return monsterUsableAP / 2
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
export function extractDieType(str) {
  // Regex breakdown:
  // [dD]  : Matches the letter d (case-insensitive)
  // \d+   : Matches one or more digits (the die faces)
  const diceRegex = /([dD]\d+)/;
  
  const match = str.match(diceRegex);

  // If a match is found, return the first group; otherwise, return null
  return match ? match[0].toLowerCase() : null;
}
export function extractDiceParts(str) {
    if (str.toLowerCase().includes('d') == false) {
        return []
    }
    const parts = str.toLowerCase().split('d')
    parts[1] = 'd' + parts[1]
    return parts
}
window.extractDiceParts = extractDiceParts
export function monsterXPDnDToQG(dndXP) {
  const newXP = 0.365 * dndXP + 100
  return Math.floor(newXP / 25) * 25;
}
export function dndDCToQGDC(dc) {
    return Math.floor(parseInt(dc) * 0.7)
}
const NUMBER_TO_DICE = {
    1.5:  '1d4 - 1',
    2.5:  '1d4',
    3.5:  '1d6',
    4.5:  '1d8',
    5:    '2d4',
    5.5:  '1d10',
    6.5:  '1d12',
    7:    '2d6',
    7.5:  '3d4',
    8:    '1d6 + 1d8',
    8.5:  '1d6 + 1d8',
    9:    '1d8 + 1d10',
    9.5:  '1d8 + 1d10',
    10:   '4d4',
    10.5: '3d6',
    11:   '2d10',
    11.5: '2d10',
    12:   '5d4',
    12.5: '5d4',
    13:   '2d12',
    13.5: '3d8',
    14:   '4d6',
    15:   '6d4',
    16.5: '3d10',
    17.5: '5d6',
    18:   '4d8',
    19.5: '3d12',
    22:   '4d10',
}
export function numberToDiceEquivalent(number) {
    if (!isNumber(number) || number == null) {
        console.log({number})
        throw `Number given to numberToDiceEquivalent is not a number: ${number}`
    }
    if (number in NUMBER_TO_DICE) {
        return NUMBER_TO_DICE[number]
    }
    if (Number.isInteger(number)) {
        return number
    }
    return Math.floor(number)
}


const MONSTER_TEXT_REPLACEMENTS = {
    'fall unconscious': 'become Double-Stunned',
    'frightened': 'Single-Stunned',
    'restrained': 'Rooted',
    'grappled by it': 'Rooted to it',
    'grappling it': 'near it',
    'difficult terrain': 'Hard Terrain',
    'surprised': 'Ambushed',
    'ability check': 'Roll',
    'creature': 'Unit',
    'turn': 'Turn',

    'must succeed on a': 'must roll at least',
    'spell save DC': 'Intelligence Roll',

    'saving throw': 'Roll',
    'Strength': 'Might',
    'Constitution': 'Might',
    'Wisdom': 'Sense',

    'a hostile': 'an Enemy',
    'hostile': 'Enemy',
    
    'As a bonus action': 'For 0 Action Points',

    'advantage': '+50%',
    'disadvantage': '-50%',
    'half damage': '-50% Damage',

    'radiant': 'Divine',
    'necrotic': 'Scourge',
    'blinded': 'Blinded',

}
export function dndMonsterToQGText(text) {
    // Feet replacement
    const matches = text.match(/\b\d+(?:-|\s)?(?:foot|feet)\b/g) ?? []
    const matchesReplacements = matches.map(inFeet => {
        let dashOrSpaceIndex = inFeet.indexOf('-')
        if (dashOrSpaceIndex == -1) {
            dashOrSpaceIndex = inFeet.indexOf(' ')
        }
        const nFeet = inFeet.substring(0, inFeet.indexOf('-'))
        const meters = parseInt(nFeet) / 5
        return meters + (inFeet.includes('-')? '-': ' ') + (inFeet.includes('feet')? 'meters': 'meter')
    })
    for (let i = 0; i < matches.length; i++) {
        text = text.replaceAll(matches[i], matchesReplacements[i])
    }

    // DC replacement
    const dcMatches = text.match(/DC\s*(\d+)/g) ?? []
    for (const dc of dcMatches) {
        const number = parseInt(dc.match(/\d+/g)[0])
        text = text.replaceAll(dc, 'DC ' + dndDCToQGDC(number))
    }

    // Other
    for (const key of Object.keys(MONSTER_TEXT_REPLACEMENTS)) {
        text = text.replaceAll(key, MONSTER_TEXT_REPLACEMENTS[key])
    }

    return text
}
window.dndMonsterToQGText = dndMonsterToQGText

export function estimteSpellHeight(spell) { // Height as in rem (approximately)
    if (spell.Height != null) {
        return spell.Height
    }
    if (spell.Name.includes('Celestine')) {
        console.log('Here')
    }
    const topHeight = 4
    const topMarginBottom = 2
    let height = topHeight + topMarginBottom
    if (spell.Effect != null) {
        height += Math.max(1, spell.Effect.length / 55) // Average of 60 characters per line
    }
    if (spell.Upgrade != null) {
        height += Math.max(1, spell.Upgrade.length / 60) + 1
    }
    if (spell.Notes != null) {
        height += Math.max(1, spell.Notes.length / 65) + 1
    }
    if (spell.EffectGreen != null) {
        height += Math.max(1, spell.EffectGreen.length / 55) + 1
    }
    if (spell.SingleTable != null) {
        height += Math.max(1, spell.SingleTable.length * 2) + 1
    }
    if (spell.SpellTable != null) {
        height += Math.max(1, spell.SpellTable.length * 3) + 1
    }
    return height
}
window.estimteSpellHeight = estimteSpellHeight
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
export function splitByNumbers(str) {
  return ((str ?? '') + '')
    .trim()
    .split(/(\d+)/)          // split and keep numbers
    .filter(part => part !== '') // remove empty strings
    .map(part => (isNaN(part) ? part : Number(part))); // convert numbers
}
export function splitByAnyInclusive(text, splitters) {
  // 1. Escape special regex characters and join with | (OR)
  const pattern = splitters
    .map(s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');

  // 2. Wrap in parentheses to "capture" the delimiters in the result
  const regex = new RegExp(`(${pattern})`);

  // 3. Filter out empty strings if the split happens at the start/end
  return text.split(regex).filter(part => part !== "");
}
export function damageTextToTokens(text) {
    const delimiters = [' + ', ' - ']
    const words = splitByAnyInclusive(text, delimiters)
    const isDelimiter = str => delimiters.includes(str)
    const tokens = words.map(str => ({
        word: str,
        type: isStringNumeric(str)? 'number': isDelimiter(str)? 'delimiter': isDice(str)? 'dice': 'other'
    }))
    return tokens
}
export function addBonusToDamageText(text, bonus) {
    const type = isNumber(bonus) || isStringNumeric(bonus)? 'number': isDice(bonus)? 'dice': 'other'
    const tokens = damageTextToTokens(text)
    const findLastNonOther = () => tokens.findLast(({ word, type }) => type != 'other' && type != 'delimiter')
    const findLastDice = () => tokens.findLast(({ word, type }) => type == 'dice')

    if (type == 'dice') {
        const [nDice, diceType] = extractDiceParts(bonus)
        let didAdd = false
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i]
            if (token.type != 'dice') {
                continue
            }
            const [thisNDice, thisDiceType] = extractDiceParts(token.word)
            if (thisDiceType == diceType) {
                const newNDice = parseFloat(thisNDice) + parseFloat(nDice)
                tokens[i].word = `${newNDice}${diceType}`
                didAdd = true
                break
            }
        }
        if (!didAdd) {
            const lastDice = findLastDice()
            if (lastDice != null) {
                lastDice.word += ` + ${bonus} `
            } else {
                const lastNonOther = findLastNonOther()
                lastNonOther.word += ` + ${bonus} `
            }
        }
    }

    if (type == 'number') {
        const number = parseFloat(bonus)
        const firstNumberI = tokens.findIndex(token => isStringNumeric(token.word))
        if (firstNumberI != -1) {
            tokens[firstNumberI].word = parseFloat(tokens[firstNumberI].word) + number
        } else {
            const lastNonOther = findLastNonOther()
            lastNonOther.word += ` ${getNumberWithPlusMinus(number)} `
        }
    }

    return tokens.map(token => token.word).join(' ')
}
window.addBonusToDamageText = addBonusToDamageText
window.splitByNumbers = splitByNumbers
export const $LESSER_SPELLS_NAMES = getAllBasicSpellsAsArray().filter(spell => spell.Degree == 'Lesser').map(spell => spell.Name)
export const $MINOR_SPELLS_NAMES = getAllBasicSpellsAsArray().filter(spell => spell.Degree == 'Minor').map(spell => spell.Name)
export const $MAJOR_SPELLS_NAMES = getAllBasicSpellsAsArray().filter(spell => spell.Degree == 'Major').map(spell => spell.Name)
export const $GRAMD_SPELLS_NAMES = getAllBasicSpellsAsArray().filter(spell => spell.Degree == 'Grand').map(spell => spell.Name)
export const SKILL_GROUP_BY_ELEMENT = {
    'Fire': ['Physical', 'Magic', 'Dungeons'],
    'Cold': ['Magic', 'Knowledge'],
    'Shock': ['Magic', 'Knowledge', 'Nature'],
    'Pulse': ['Magic', 'Physical', 'Dungeons'],
    'Scourge': ['Magic', 'Social', 'Dungeons'],
    'Divine': ['Knowledge', 'Social'],
    'Poison': ['Nature', 'Physical'],
    'Acid': ['Nature', 'Physical']
}
export const SKILLS_BY_GROUP = {
    'Physical': [
        'Acrobatics',
        'Athletics',
        'Intimidation',
        'Using Rope',
        'Hearing', 'Seeing', 'Sight', 'Smelling'
    ],
    'Nature': [
        'Handling Animals',
        'Biology',
        'Crafting',
        'Hearing', 'Seeing', 'Sight', 'Smelling',
        'Luck',
        'Monstrology',
        'Nature',
        'Using Rope',
        'Survival'
    ],
    'Magic': [
        'the Arcane',
        'History',
        'Memory',
        'Occultism',
        'Linguistics'
    ],
    'Trade': [
        'Cooking',
        'Crafting',
        'Luck',
        'Mechanisms',
        'Using Rope'
    ],
    'Knowledge': [
        'Sociology',
        'General Knowledge',
        'History',
        'Investigation',
        'Memory',
        'Religion',
        'Linguistics'
    ],
    'Social': [
        'Sociology',
        'Deception',
        'Investigation',
        'Persuasion',
        'Psychology',
        'Linguistics'
    ],
    'Dungeons': [
        'Dungeoneering',
        'Investigation',
        'Monstrology',
        'Occultism',
        'Stealth'
    ],
}
export const $SKILLS = [
  "Acrobatics",
  "Animals",
  "the Arcane",
  "Athletics",
  "Biology",
  "Cooking",
  "Crafting",
  "Sociology",
  "Deception",
  "Dungeons",
  "Knowledge",
  "Hearing",
  "History",
  "Intimidation",
  "Investigation",
  "Linguistics",
  "Luck",
  "Mechanisms",
  "Memory",
  "Monstrology",
  "Nature",
  "Occultism",
  "Persuasion",
  "Psychology",
  "Religion",
  "Using Rope",
  "Sleight of Hand",
  "Sight",
  "Smelling",
  "Stealth",
  "Survival"
]

export function getSpellNVariants(spell) {
    if (spell.Variants != null) {
        return spell.Variants.length
    }
    if (spell.VariantsForEach != null) {
        return getNVariantsForVariantsForEachSpell(spell)
    }
    return null
}
export function getNVariantsForVariantsForEachSpell(spell) {
    const variantClause = spell?.VariantsForEach?.[0]
    if (variantClause == null) {
        return 0
    }
    const [forElem, inCollection] = variantClause?.trim()?.split(':')
    const elemsInCollection = getVariantsForEachCollection(inCollection)
    return elemsInCollection?.length ?? 0
}
export function getVariantsForEachCollection(collectionName) {
    switch (collectionName) {
        case '$OneHandedWeapons': return [...Object.keys(weapons['One-Handed Melee']), ...Object.keys(weapons['One-Handed Ranged'])].filter(weapon => weapon != 'Punch')
        case '$TwoHandedWeapons': return [...Object.keys(weapons['Two-Handed Melee']), ...Object.keys(weapons['Two-Handed Ranged'])]
        case '$Skills': return $SKILLS.map(name => name.slice(name.lastIndexOf(' ') + 1))

        case '$SpellsWithPower0': return getAllScrollSpellNamesByPower()[0]
        case '$SpellsWithPower1': return getAllScrollSpellNamesByPower()[1]
        case '$SpellsWithPower2': return getAllScrollSpellNamesByPower()[2]
        case '$SpellsWithPower3': return getAllScrollSpellNamesByPower()[3]
        case '$SpellsWithPower4': return getAllScrollSpellNamesByPower()[4]
        case '$SpellsWithPower4+': return [...getAllScrollSpellNamesByPower()[4], ...getAllScrollSpellNamesByPower()[5], ...getAllScrollSpellNamesByPower()[6]]
        
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
export function getBaseClasses() {
    return ClassesBase
}
export function getPremiumClasses() {
    return ClassesPremium
}
export function getLegacyClasses() {
    return ClassesLegacy
}
export function getAllRaces() {
    return Races
}
export function getRace(raceName) {
    return Races[raceName]
}
export function getAllLanguages() {
    return {
        'Common': '',
        'Dwarvish': '',
        'Elvish': '',
        'Tribal Orcish': '',
        'Goblan': '',
        'Sylvan': '',
        'Gian': '',
        'Undran': '',
        'Infernan': '',
        'Celestian': '',
        'Ancian': '',
        'Eldrish': '',
        'Doublespeak': '',
        'Whistletone': '',
        'Drakan': '',
        'Sign Language': ''
    }
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
export function getAlMyRaceAndClassSpells({ raceName, className, specName, selectedClassSpellNames=[], selectedRaceSpellNames=[] }) {
    const allSpells = getAllSpellsByName()

    const myRace = getAllRaces()[raceName]
    const myClass = getAllClasses()[className]
    const mySpec = myClass?.Specs?.[specName]
    
    const myRaceBaseSpells = myRace == null? []: spellsFromObject(myRace['Starting Abilities'])
    const myRaceFeats = selectedRaceSpellNames.map(name => allSpells[name])
    const myClassBaseSpells = myClass == null? []: spellsFromObject(myClass['Starting Abilities'])
    const mySpecBaseSpells = mySpec == null? []: spellsFromObject(mySpec['Starting Abilities'])
    const myClassTalents = selectedClassSpellNames.map(name => allSpells[name])

    const allMyRaceAndClassSpells = [
        ...myRaceBaseSpells,
        ...myRaceFeats,
        ...myClassBaseSpells,
        ...mySpecBaseSpells,
        ...myClassTalents,
    ]

    return allMyRaceAndClassSpells
}
export function hasClassMana(className) {
    const classObj = getAllClasses()[className]
    const hasMana = classObj.Spellcasting.Type.toLowerCase().includes('mana')
    return hasMana
}
export function getDoubleTableNumberedTable(DoubleTableNumbered) {
    const tableHeaders = DoubleTableNumbered.Headers
    const newTableValuePairs = []
    const values = DoubleTableNumbered.Values
    for (let i = 0; i < values.length; i++) {
        if (i % 2 == 1) {
            newTableValuePairs.push({
                value1: `${i}. ${values[i-1]}`,
                value2: `${i+1}. ${values[i]}`
            })
        }
    }
    return [tableHeaders, newTableValuePairs]
}
export function getDoubleTableTable(DoubleTable) {
    const tableHeaders = DoubleTable.Headers
    const newTableValuePairs = []
    const values = DoubleTable.Values
    for (let i = 0; i < values.length; i++) {
        if (i % 2 == 1) {
            newTableValuePairs.push({
                value1: values[i-1],
                value2: values[i]
            })
        }
    }
    return [tableHeaders, newTableValuePairs]
}
export const MANA_BASED_SPELLCASTING = 'Mana-based'
export const SPECIAL_MANA_BASED_SPELLCASTING = 'Special Mana-based'
export const NO_MANA_SPELLCASTING = 'Non-Mana'
export function getClassMana(classObj) {
    if (classObj?.Spellcasting?.Type == null) {
        console.log({classObj, Spellcasting: classObj?.Spellcasting})
        console.error(`getClassMana received null something. Printed above.`)
        return 0
    }
    const mana = classObj?.Spellcasting?.Mana
    if (isNumber(mana)) {
        return mana
    }
    return mana?.Amount ?? 0
}

// ---------------- Array Utilities ----------------
export function isArrayOfObjects(arr) {
    if (!Array.isArray(arr)) {
        return false
    }
    if (arr.length == 0) {
        return false
    }
    if (isObject(arr[0])) {
        return true
    }
    return false
}
export function isArrayOfFunctions(arr) {
    if (!Array.isArray(arr)) {
        return false
    }
    if (arr.length == 0) {
        return false
    }
    if (isFunction(arr[0])) {
        return true
    }
    return false
}
export function isObjectOfObjects(obj) {
    if (!isObject(obj)) {
        return false
    }
    return isObject(getOnlyValue(obj))
}
export function isObjectOfFunctions(obj) {
    if (!isObject(obj)) {
        return false
    }
    return isFunction(getOnlyValue(obj))
}
export function popFind(arr, func) {
    const index = arr.findIndex(func)
    if (index == -1) {
        return null
    }
    const elem = arr[index]
    arr.splice(index, 1)
    return elem
}
export function matchRange(num, items, fallback = null) {
  let best = null;

  for (const item of items) {
    const [min, max] = item.range;

    // inclusive match
    if (num >= min && num <= max) {
      // pick the one with the smallest upper bound
      if (!best || max < best.range[1]) {
        best = item;
      }
    }
  }

  return best?.value ?? fallback
}

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
export function sortByHash(array, getHashFunc, reverse=false) {
  return array
    .map((item, i) => ({ item, hash: getHashFunc(item), i }))
    .sort((a, b) => {
      // Primary sort: hash
      if (a.hash < b.hash) return reverse? 1: -1;
      if (a.hash > b.hash) return reverse? -1: 1;

      // Tie-breaker: original order (stable)
      return a.i - b.i;
    })
    .map(x => x.item);
}
export function removeDuplicates(arr, getHashFunc) {
  const seen = new Set();
  const out = [];

  for (const item of arr) {
    const key = getHashFunc ? getHashFunc(item) : item;

    if (!seen.has(key)) {
      seen.add(key);
      out.push(item);
    }
  }

  return out;
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
export function areArraysEqual(a1, a2, compareElems=null) {
    if (a1 == null && a2 == null) {
        throw `Both arrays given are null`
    }
    if (a1 == null) {
        throw `First array given is null`
    }
    if (a2 == null) {
        throw `Second array given is null`
    }
    if (a1.length != a2.length) return false
    for (let i = 0; i < a1.length; i++) {
        if (compareElems != null) {
            if (compareElems(a1[i], a2[i]) == false) {
                return false
            }
        } else {
            if (a1[i] !== a2[i]) return false
        }
    }
    return true
}
window.areArraysEqual = areArraysEqual
export function mapKeysToObject(keys, func) {
    const obj = {}
    for (const key of keys) {
        obj[key] = func(key)
    }
    return obj
}
export function getAnExistingKeyOf(obj, keys) {
    for (const key of keys) {
        if (key in obj) {
            return key
        }
    }
    return null
}
export function getExistingKeysFrom(obj, keys) {
    return Object.keys(obj).filter(key => keys.includes(key))
}
export function mapObject(obj, func) {
    if (obj == null) {
        console.log({func})
        throw `Null obj given to mapObject with func printed above.`
    }
    const keys = Object.keys(obj)
    let newObj = {}
    for (const oldKey of keys) {
        const oldValue = obj[oldKey]
        const funcParam = [oldKey, oldValue]    // For both object and array destructuring
              funcParam.key = oldKey
              funcParam.value = oldValue
        
        const newKVP = func(funcParam)
        
        let newKey, newValue
        if (Array.isArray(newKVP)) {
            newKey = newKVP[0]
            newValue = newKVP[1]
        } else {
            newKey = newKVP.key
            newValue = newKVP.value
        }
        newObj = {...newObj, [newKey]: newValue }
    }
    return newObj
}
export function addObjects(a, b) {
    const isNullOrNaN = x => x == null || equalsNaN(x)
    window.isNullOrNaN = isNullOrNaN
    if (a == null || b == null) {
        console.log({a, b})
        console.error(`addObjects: a or b null! Printed above.`)
        return a ?? b ?? {}
    }
    if (a == null && b != null) {
        return b;
    }
    if (a != null && b == null) {
        return a;
    }
    const bKeys = Object.keys(b)
    let finalObject = {...a}
    for (const bKey of bKeys) {
        if (finalObject[bKey] == null) {
            finalObject[bKey] = b[bKey]
        } else {
            const aValue = finalObject[bKey]
            const bValue = b[bKey]
            if (isNullOrNaN(aValue) && !isNullOrNaN(bValue)) {
                finalObject[bKey] = bValue
            } else if (!isNullOrNaN(aValue) && isNullOrNaN(bValue)) {
                finalObject[bKey] = aValue
            } else if (isNumber(aValue) && isNumber(bValue)) {
                finalObject[bKey] = finalObject[bKey] + bValue
            } else if (Array.isArray(aValue) && Array.isArray(bValue)) {
                finalObject[bKey] = [...finalObject[bKey], ...b[bKey]]
            } else {
                console.log({a, b})
                throw `For addObject at key ${bKey} could not match types from a with b.`
            }
        }
    }
    return finalObject
}
export function filterObject(obj, func) {
    const newKeys = Object.entries(obj).filter(([key, value]) => {
        const funcParam = [key, value]
              funcParam.key = key
              funcParam.value = value
        return func(funcParam)
    }).map(([key, value]) => key)
    const newObj = {}
    for (const key of newKeys) {
        newObj[key] = obj[key]
    }
    return newObj
}
export function joinObjectValues(obj, str) {
   return Object.keys(obj).map(key => obj[key]).join(str)
}
export function mergeObjects(a, b) {
    const newA = {...a}
    for (const key of Object.keys(b)) {
        newA[key] = b[key]
    }
    return newA
}
export function mergeManyObjects(objects) {
    let soFar = {}
    for (const obj of objects) {
        soFar = mergeObjects(soFar, obj)
    }
    return soFar
}
export function flattenObjectOnce(obj, parentKey = "parentKey") {
    let newObj = {}
    for (const [categoryName, categoryObject] of Object.entries(obj)) {
        const newCategoryObject = mapObject(categoryObject, ({ key, value }) => ({ key, value: {...value, [parentKey]: categoryName}}))
        newObj = {...newObj, ...newCategoryObject}
    }

    return newObj
}
window.flattenObjectOnce = flattenObjectOnce
export function addManyObjects(arr) {
    if (arr.length == 0) {
        return {}
    }
    if (arr.length == 1) {
        return arr[0] ?? {}
    }
    let finalObject = arr[0]
    for (let i = 1; i < arr.length; i++) { 
        finalObject = addObjects(finalObject, arr[i])
    }
    return finalObject
}
export function reverseObject(obj) {
    const keys = Object.keys(obj)
    const values = Object.values(obj)
    const newObj = {}
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const value = values[i]
        newObj[value] = key
    }
    return newObj
}
export function objectToKVPArray(obj) {
    return Object.keys(obj).map(key => ({ key, value: obj[key]}))
}
export function mapObjectToArray(obj, func) {
    return Object.keys(obj).map(key => func(key, obj[key]))
}
export function objectToArray(obj, parentKey="parentKey") {
    return Object.entries(obj).map(([key, value]) => ({...value, [parentKey]: key}))
}
window.objectToArray = objectToArray
export function groupBy(arr, hashFunc) {
    const hashKey_ArrayValue_Pairs = {}
    for (const elem of arr) {
        const elemHash = hashFunc(elem)
        if (elemHash == null)
            continue
        if (hashKey_ArrayValue_Pairs[elemHash] == null) {
            hashKey_ArrayValue_Pairs[elemHash] = []
        }
        hashKey_ArrayValue_Pairs[elemHash].push(elem)
    }
    return hashKey_ArrayValue_Pairs
}
export function addArrays(a, b, c=null) {
    const newArr = [...a]
    for (let i = 0; i < a.length; i++) {
        newArr[i] += b[i]
        if (c != null) {
            newArr[i] += c[i]
        }
    }
    return newArr
}
window.addArrays = addArrays
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
export function uniqueElements(arr) {
    return [...new Set(arr)]
}
export function onlyUniqueFilter(value, index, array) {   // Use as .filter(onlyUniqueFilter)
    return array.indexOf(value) === index;
}
export function withToggledElement(arr, elem) {
    if (arr.includes(elem)) {
        return arr.filter(e => e != elem)
    } else {
        return [...arr, elem]
    }
}
export function average(arr) {
    if (arr == null || arr.length == 0) {
        return 0
    }
    return (arr.reduce((soFar, x) => soFar + parseFloat(x), 0)) / arr.length
}
window.average = average
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

function ComponentForSymbolConfig({ config, children }) {
    switch (config.tag) {
        case 'b': return <b {...config.props}>{children}</b>
        case 'i': return <i {...config.props}>{children}</i>
        case 'img': return <img {...config.props}/>
        case 'span': return <span {...config.props}>{children}</span>
        case 'Icon': return <Icon {...config.props}/>
        case 'Link': return <Link {...config.props}>{children}</Link>
        case 'a':
            console.log({config, children})
            return <a {...config.prop}>{children}</a>
        default: return <span {...config.props}>{children}</span>
    }
}
function formSymbolComponentFunc(allSymbols, symbol, shouldReturnString=false, shouldReturnConfigOnly=false) {
    const config = allSymbols[symbol]

    if (shouldReturnConfigOnly) {
        return () => config
    }

    if (shouldReturnString) {
        return () => config.text
    }

    if (config.func != null) {
        return config.func
    }

    const text = config.text ?? undefined

    return () => <ComponentForSymbolConfig config={config}>{text}</ComponentForSymbolConfig>
}
function formFunctionSymbolComponentFunc(symbol, args, customSymbols, shouldReturnString=false, shouldReturnConfigOnly=false) {
    const allSymbols = customSymbols == null? FUNCTION_SYMBOLS: {...FUNCTION_SYMBOLS, ...customSymbols}
    const configFunc = allSymbols[symbol]

    const funcResult = configFunc(args)

    if (shouldReturnConfigOnly) {
        return () => funcResult
    }

    if (shouldReturnString) {
        return () => funcResult.text
    }

    if (funcResult.func != null) {
        return funcResult.func
    }

    const text = funcResult.text ?? undefined

    return () => <ComponentForSymbolConfig config={funcResult}>{text}</ComponentForSymbolConfig>
}
export function splitBySpacesKeepingSpaces(text) {
  return text.match(/ +|[^ ]+/g) ?? [];
}

export const SYMBOLS = {
    'Template': { tag: 'Icon', props: {}, text: '🔹', func: () => (<span>A Feared Unit can only do <b>one</b> Act on its turn (e.g. move, make one attack, use one Ability, etc).</span>) },
    'Template2': {
        tag: 'Icon',            // Tag to use
        props: {},              // Tag props
        text: '🔹',             // Text inside the tag (required even if has func)
        func: () => (           // If it has a func, everything else will be replaced
            <span>A Feared Unit can only do <b>one</b> Act on its turn (e.g. move, make one attack, use one Ability, etc).</span>
        )
    },

    'StatLimit': { tag: 'span', text: STAT_LIMITS_TEXT },
    ...STAT_SYMBOLS,
    ...STATIC_SYMBOLS,

    'Hr': { tag: 'img', props: {src: '/separator.png', class: 'spell-separator' } },
    'Separator': { tag: 'img', props: {src: '/separator.png', class: 'separator'} },

    'Damage': { tag: 'Icon', props: { name: 'Damage' } },
    'Mana': { tag: 'Icon', props: { name: 'Mana' } },
    'Diamond': { tag: 'span', text: '🔹', props: { fontSize: '0.8em' } },
    'Pets and Animals': { tag: 'Link', props: { to: "/Other/PetsAndAnimals" }, text: 'Pets and Animals' },
    'Offensive Abilities': { tag: 'span', text: "Offensive means that it deals Damage or applies hard Crowd Control (anything better than Slow and creating Hard Terrain)." },
    'Action': { tag: 'Icon', props: { name: "Hand" } },
    'Hand': { tag: 'Icon', props: { name: "Hand" } },
    'Range': { tag: 'Icon', props: { name: "Range" } },
    'Cooldown': { tag: 'Icon', props: { name: "Cooldown" } },
    'Duration': { tag: 'Icon', props: { name: "Duration" } },
    'Requirement': { tag: 'Icon', props: { name: "Requirement" } },
    'Level': { tag: 'Icon', props: { name: "Level" } },
    'Gold': { tag: 'Icon', props: { name: "Gold" } },
    'Blood': { tag: 'Icon', props: { name: "Blood" } },
    

    'Chain': { tag: 'span', text: 'Chain', props: { style: { color: '#7850e1' } }, func: () => <span style={{color: '#7850e1', fontWeight: 'bold'}}><Icon name="Chain"/>Chain</span> },
    'Evoke': { tag: 'span', text: 'Evoke', props: { style: { color: '#6d00ff' } }, func: () => <span style={{color: '#6d00ff', fontWeight: 'bold'}}><Icon name="Evoke"/>Evoke</span> },
    
    
    'CoreTalent':     { tag: 'span', props: { style: { color: 'var(--orange-color)'} }, text: "This is a Core Talent. You can only have one Core Talent from this Level.", func: () => <span style={{color: 'var(--dark-red-color)'}}>This is a <b>Core Talent</b>. You can only have one <b>Core Talent</b> from this Level..</span> },
    'KeystoneTalent': { tag: 'span', props: { style: { color: 'var(--dark-red-color)'} }, text: "This is a Keystone Talent. You can only have one Keystone Talent from this Level..", func: () => <span style={{color: 'var(--orange-color)'}}>This is a <b>Keystone Talent</b>. You can only have one <b>Keystone Talent</b> from this Level..</span> },

    'Combo': { tag: 'span', props: { style: {color: 'var(--blue-color)'} }, text: "Combo:" },
}
export const FUNCTION_SYMBOLS = {
    'Link': args => ({ tag: 'Link',  props: { style: { color: '#8f0a7dff' }, to: args[1] }, text: args[0] }),
    'RandomOf': args => ({ tag: 'span', text: randomOf(...args) }),
    'Brown': args => ({ tag: 'span',  props: { style: { color: '#A52A2A' } }, text: args[0] }),
    'Orange': args => ({ tag: 'span', props: { style: { color: '#FF5500' } }, text: args[0] }),
    'Purple': args => ({ tag: 'span', props: { style: { color: '#6f00ffff' } }, text: args[0] }),
    'Green': args => ({ tag: 'span', props: { style: { color: 'var(--green-text)' } }, text: args[0] }),
    'DarkGreen': args => ({ tag: 'span', props: { style: { color: '#00a71cff' } }, text: args[0] }),
    'Teal': args => ({ tag: 'span', props: { style: { color: '#0097ab' } }, text: args[0] }),
    'Color': args => ({ tag: 'span', props: { style: { color: args[0] } }, text: args[1] }),

    'Spark': args => ({ tag: 'span', text: `On ${args[0]}:`, props: { style: { color: 'var(--orange-color)' } }, func: () => <span style={{color: 'var(--orange-color)', fontWeight: 'bold'}}><Icon name="D10"/>{args[0]}:</span> }),
    
    '^': args => ({ tag: 'b', text: args[0] }),
    '_': args => ({ tag: 'i', text: args[0] }),
    '~': args => ({ tag: 'span', props: { style: { color: 'var(--blue-color)' } }, text: args[0] }),

    'TEST': args => ({ tag: 'b', text: args[0] }),
}
export function normalizeSymbolConfigForPDF(config, defaultColorHex=null) {
    const { tag, props, text } = config

    const colorUsed =  props?.style?.color ?? defaultColorHex ?? '#000000'

    if (tag == 'img') {
        return { tag, src: props.src }
    }
    if (tag == 'Icon') {
        return { tag: 'img', src: `/Icons/UI/${props.name}.png` }
    }
    if (tag == 'b') {
        return { tag: 'span', fontSuffix: 'Bold', color: colorUsed, text: text }
    }
    if (tag == 'i') {
        return { tag: 'span', fontSuffix: 'Italic', color: colorUsed, text: text }
    }
    return { tag: 'span', fontSuffix: '', color: colorUsed, text }

}

// Returns an array of components, or an array of strings if { shouldReturnStringsOnly: true }
export function parseTextWithSymbols(...argsOriginal) {
    const args = [...argsOriginal]
    const text = popFind(args, arg => isString(arg))
    const customSymbols = popFind(args, arg => isObjectOfObjects(arg))
    const customFunctionSymbols = popFind(args, arg => isObjectOfFunctions(arg))
    const options = popFind(args, arg => isObject(arg)) ?? {}

    if (text == null) {
        console.log({customSymbols, options})
        console.error(`Null text given to parseTextWithSymbols. Other params printed above`)
        return ['Oops! An error has occured.']
    }

    const {
        isDebug,
        shouldUseOnlyCustomSymbols,
        shouldReturnStringsOnly,
        shouldReturnConfigOnly
    } = options

    let symbolToInsertion = mapObject(SYMBOLS, ({ key, value }) => ({ key, value: formSymbolComponentFunc(SYMBOLS, key, shouldReturnStringsOnly, shouldReturnConfigOnly) }))

    if (customSymbols != null) {
        const customSymbolsKeys = Object.keys(customSymbols)
        const randomValue = customSymbols[customSymbolsKeys[0]]
        
        if (typeof randomValue === 'function') {
            if (shouldUseOnlyCustomSymbols === true) {
            symbolToInsertion = {...customSymbols}
            } else {
                symbolToInsertion = {...symbolToInsertion, ...customSymbols}
            }
        } else {
            const customSymbolToInsertion = mapObject(customSymbols, ({ key, value }) => ({ key, value: formSymbolComponentFunc(customSymbols, key, shouldReturnStringsOnly, shouldReturnConfigOnly) }))
            symbolToInsertion = mergeObjects(symbolToInsertion, customSymbolToInsertion)
        }
        
    }
    
    if (isDebug === true) {
        console.log({symbolToInsertion})
    }

    const MARKUP_DELIMITERS = ['^', '_', '~']

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
    let stringQuoteChar = null
    let didJustStartReadingFuncParams = false
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
                    state = 'reading-tick'
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
                    currentTextPartStart = i + 1
                    state = 'reading-normal-text'

                    if (symbolToInsertion[symbol] == null) {
                        textParts.push('ERROR')
                        console.log(`ERROR: Symbol {${symbol}} not found for parsing: "${text}"`)
                        continue
                    }
                    if (typeof(symbolToInsertion[symbol]) != 'function') {
                        textParts.push('ERROR')
                        console.log(symbolToInsertion[symbol])
                        console.log(`ERROR: Symbol ${symbol} not a function. Value above: "${text}"`)
                        continue
                    }

                    const getComponentFromSymbol = symbolToInsertion[symbol]
                    const finalComponent = getComponentFromSymbol()
                    textParts.push(finalComponent)    // Push current symbol
                } else if (char == '(') {
                    functionName = text.substring(symbolStart + 1, i)
                    isReadingFunctionString = false
                    didJustStartReadingFuncParams = true
                    functionStrings = []
                    state = 'reading-function'
                }
                break
            case 'reading-function':
                if (didJustStartReadingFuncParams && isStringOnlySpaces(char)) {    // As long as it starts with just spaces, do nothing
                    continue
                }
                didJustStartReadingFuncParams = false
                if (char == '"' || char == "'") {
                    if (isReadingFunctionString == false) {                         // Open quotes
                        stringQuoteChar = char
                        functionStringStart = i + 1
                        isReadingFunctionString = true
                    } else if (isReadingFunctionString && char == stringQuoteChar) {   // Close quotes
                        const str = text.substring(functionStringStart, i)
                        functionStrings.push(str)
                        isReadingFunctionString = false
                        stringQuoteChar = null
                    }
                } else if (char == ')') {
                    if (isReadingFunctionString) {
                        if (stringQuoteChar != null) {  // Is inside a quoted string
                            continue
                        } else {
                            const str = text.substring(functionStringStart, i)
                            functionStrings.push(str)
                            isReadingFunctionString = false
                        }
                    }
                    const args = functionStrings
                    const getSymbolComponent = formFunctionSymbolComponentFunc(functionName, args, customFunctionSymbols, shouldReturnStringsOnly, shouldReturnConfigOnly)
                    const finalComponent = getSymbolComponent()
                    textParts.push(finalComponent)
                } else if (char == '}') {
                    currentTextPartStart = i + 1
                    state = 'reading-normal-text'
                } else if (!isReadingFunctionString && stringQuoteChar == null && !isStringOnlySpaces(char)) {
                    functionStringStart = i
                    isReadingFunctionString = true
                } else if (isReadingFunctionString && stringQuoteChar == null && isStringOnlySpaces(char)) {
                    const str = text.substring(functionStringStart, i)
                    functionStrings.push(str)
                    isReadingFunctionString = false
                }
                break
            case 'reading-markup':
                if (char == markupSymbol) {
                    const markupedText = text.substring(symbolStart + 1, i)
                    const args = [markupedText]
                    const getSymbolComponent = formFunctionSymbolComponentFunc(markupSymbol, args, customFunctionSymbols, shouldReturnStringsOnly, shouldReturnConfigOnly)
                    const finalComponent = getSymbolComponent()
                    textParts.push(finalComponent)    // Push markuped text
                    currentTextPartStart = i + 1
                    state = 'reading-normal-text'
                }
                break
            case 'reading-tick':
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
            if (text.substring == null) {
                console.log(`This is it:`)
                console.log({text})
            }
            textParts.push(text.substring(currentTextPartStart, text.length))
        }
    }

    return textParts

}
window.parseTextWithSymbols = parseTextWithSymbols
export function parseTextWithSymbolsForPDF(text, customSymbols=null) {

    function splitToken(token) {
        if (isString(token)) {
            return splitBySpacesKeepingSpaces(token)
        }
        const text = token.text
        
        if (text == null) {
            return [token]
        }

        const words = splitBySpacesKeepingSpaces(text)
        return words.map(str => ({...token, text: str}))
    }

    const tokenParts = parseTextWithSymbols(text, customSymbols, { shouldReturnConfigOnly: true })
    const tokensNotFlat = tokenParts.map(token => splitToken(token))
    return tokensNotFlat.flat().map(token => isString(token)? ({ tag: 'span', text: token }): token)
}
window.parseTextWithSymbolsForPDF = parseTextWithSymbolsForPDF

export function hexColorToRgb01(hex) {
    const clean = hex.replace(/^#/, "");

    if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
        throw new Error(`Invalid hex color: ${hex}`);
    }

    const r = parseInt(clean.slice(0, 2), 16) / 255;
    const g = parseInt(clean.slice(2, 4), 16) / 255;
    const b = parseInt(clean.slice(4, 6), 16) / 255;

    return [r, g, b];
}
export function hexColorToRgbVector(hex) {
    const clean = hex.replace(/^#/, "");

    if (!/^[0-9a-fA-F]{6}$/.test(clean)) {
        throw new Error(`Invalid hex color: ${hex}`);
    }

    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);

    return [r, g, b];
}
window.hexColorToRgb01 = hexColorToRgb01
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
console.green = str => console.log(`%c${str}`, `color: green; font-style: bold`)
export function printTimestamp(str) {
    const date = new Date()
    console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()} ${str}`)
}
export function startsWithAny(str, anyOf) {
    return anyOf.some(option => str.startsWith(option))
}
export function toFixedFloat(number, digits) {
    return parseFloat(number.toFixed(2))
}
export function roundToNearest(number, multipleOf) {
    return Math.round(number / multipleOf) * multipleOf
}
export function roundDownTo(num, step) {
    if (step <= 0) throw new Error("step must be > 0");
    return Math.floor(num / step) * step;
}
export function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
export function getNumberWithPlusMinus(num) {
    if (isStringNumeric(num)) {
        num = parseFloat(num)
    }
    if (num < 0) {
        return `- ${Math.abs(num)}`
    }
    return `+ ${num}`
}
export function getNumberFromString(str) {
    const match = str.match(/-?\d+(\.\d+)?/);
    return match ? Number(match[0]) : null;
}
export function getNumberPartsString(number, options=({ includeDotOnRight: false })) {
    if (number == null) {
        return { sign: '', left: '', right: '' }
    }
    const maybeSign = number < 0? '-': ''
    const trunk = Math.trunc(number)
    if (trunk == number) {
        return { sign: maybeSign, left: `${Math.abs(number)}`, right: '' }
    }
    let [front, digits] = `${Math.abs(number)}`.split('.')
    if (options.includeDotOnRight) {
        digits = '.' + digits
    }

    return { sign: maybeSign, left: front, right: digits}
}
window.getNumberPartsString = getNumberPartsString
export function getNumberDecimalsString(number) {
    if (number == null) {
        return ''
    }
    const floor = Math.floor(number)
    if (floor == number) {
        return `${number}`
    }
    const [front, digits] = `${number}`.split('.')

    return digits
}
export function getNumberFirstPartString(number) {
    if (number == null) {
        return ''
    }
    const [front, digits] = `${number}`.split('.')

    return front
}
window.generateUniqueId = generateUniqueId
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
    if (!isString(str)) {
        console.log({str, replaceWhats, replaceWiths})
        throw `stringReplaceAllMany: str parameter is not a string. Params printed above`
    }
    for (let i = 0; i < replaceWhats.length; i++) {
        str = str.split(replaceWhats[i]).join(replaceWiths[i])
    }
    return str
}
export function equalsNaN(x) {
    return isNaN(x) && x !== x
}
window.equalsNaN = equalsNaN
export function isObject(obj) {
    return typeof obj === 'object' && !Array.isArray(obj) && !isString(obj)
}
window.isObject = isObject
export function isFunction(obj) {
    return typeof obj === 'function'
}
window.isFunction = isFunction
export function isString(obj) {
    return obj != null && typeof obj === 'string' || obj instanceof String;
}
window.isString = isString
export function isNumber(obj) {
    return ! isNaN(obj)
}
export function isStringNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
export function isStringOnlySpaces(str) {
    return /^ *$/.test(str)
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
    if (args.length == 0) {
        return null
    }
    const arr = args.length == 1 && Array.isArray(args[0])? args[0]: args
    return arr[randomInt(0, arr.length - 1)];
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
    if (str == null) {
        return 'capitalizeFirstLetter Error'
    }
    const str2 = str.charAt(0).toUpperCase() + str.slice(1)
    return str2
}
export function uncapitalizeFirstLetter(str) {
    const str2 = str.charAt(0).toLowerCase() + str.slice(1)
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
export function objectFromKVArrays(keys, values) {
    if (keys.length != values.length) {
        console.log({keys, values})
        throw `Given keys and values to objectFromKVArrays have unequal lengths`
    }
    const obj = {}
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const value = values[i]
        obj[key] = value
    }
    return obj
}
export function htmlToJson(str) {
    const wrappedStr = `<xml>${str}</xml>`
    let xmlNode = new DOMParser().parseFromString(wrappedStr, 'text/html')
    return xmlNode.children[0]
}
window.xmlToJson = htmlToJson
export function doesSubstringFromStartWith(string, i, startingWith) {
    let withI = 0
    if (i + startingWith.length - 1 > string.length) {
        return false
    }
    while (withI < startingWith.length && i < string.length) {
        const strChar = string.charAt(i)
        const withChar = startingWith.charAt(withI)
        if (strChar != withChar) {
            return false
        }
        withI++
        i++
    }
    return true
}
export function customMarkdownToJSON(markdownText) {
    const markdown = markdownit()
    const htmlText = markdown.render(markdownText)
    console.log(htmlText)
    const customHTMLText = parseCustomMarkdownStringToString(htmlText)
    const fullHTML = htmlToJson(customHTMLText)
    const body = fullHTML.children[1]
    const xmlNode = body.childNodes[0]
    return Array.from(xmlNode.childNodes)
}
const customMappings = {
    '@@$#': () => ({ end: '@@$#', tag: 'span', attributes: 'style="color: red;"'}),
    "<p>^^^": () => ({ end: '</p>', tag: 'div', attributes: 'style="margin-top: 5rem"'}),
    '\\aside': () => ({ end: '\\aside', tag: 'div', attributes: 'class="hbc-quote"'}),
    '\\if': () => ({ end: '\\if', tag: 'div', attributes: 'class="hbc-maybe"'}),
    '\\img': (params=[]) => ({ end: '\n', tag: 'img', attributes: 
        `src="${params[0]}" style="${params[2] != 'right'? '': 'position: absolute; right: 12px;'} ${params[1] == 'null'? '': 'width: ' + params[1]};"`,
    ignoreContent: true })
}
export function parseCustomMarkdownStringToString(string) {
    function findMappingItStartsWith(i) {
        for (const key of Object.keys(customMappings)) {
            if (doesSubstringFromStartWith(string, i, key)) {
                return key
            }
        }
        return null
    }
    function getMappingAsHTML(startI, mappingName) {
        const mapping = customMappings[mappingName]()
        let i = startI + mappingName.length
        while (doesSubstringFromStartWith(string, i, mapping.end) == false) {
            i++
        }
        const parameters = []
        let htmlContents = string.substring(startI + mappingName.length, i)
        while (htmlContents.startsWith('(')) {
            const paramEnd = htmlContents.indexOf(')')
            const param = htmlContents.substring(1, paramEnd)
            parameters.push(param)
            htmlContents = htmlContents.substring(paramEnd + 1)
        }

        console.log({parameters})

        const finalMapping = customMappings[mappingName](parameters)

        const finalHTML = 
            finalMapping.ignoreContent?
                `<${finalMapping.tag} ${finalMapping.attributes}/>`
            :
                `<${finalMapping.tag} ${finalMapping.attributes}>${htmlContents}</${finalMapping.tag}>`
        return {
            string,
            html: finalHTML,
            i: i,
            newI: i + finalMapping.end.length - 1  // -1 because of the i++ in the for below
        }
    }

    let newString = ''
    for (let i = 0; i < string.length; i++) {
        const char = string.charAt(i)
        let mappingName = findMappingItStartsWith(i)
        if (mappingName == null) {
            newString += char
            continue
        }
        console.log(`Found one at i = ${i} mappingName="${mappingName}" in string: "${string}"`)
        const result = getMappingAsHTML(i, mappingName)
        console.log({result})
        newString += result.html
        i = result.newI
    }

    return newString
}
export function getDOMNodeAttributes(node) {
    if (node.attributes == null) {
        return null
    }
    return Array
        .from(node.attribute)
        .reduce((soFar, nvp) => ({ ...soFar, [nvp.name]: nvp.value }), {})
}
export function printToPDF() {
    window.print()
}
export function getISOWeekNumber(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

  // 0=Sun..6=Sat -> convert so Mon=0..Sun=6
  const dayNum = (d.getUTCDay() + 6) % 7;

  // move to Thursday of this week
  d.setUTCDate(d.getUTCDate() - dayNum + 3);

  // Jan 4 is always in week 1
  const jan4 = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));

  const diffDays = (d - jan4) / 86400000;
  return 1 + Math.floor(diffDays / 7);
}
export const MONDAY = 1
export const TUESDAY = 2
export const WEDNESDAY = 3
export const THURSDAY = 4
export const FRIDAY = 5
export const SATURDAY = 6
export const SUNDAY = 7
export function getDaysSinceLast(dayOfTheWeek) {
  const date = new Date()
  const today = date.getDay();      // 0=Sun..6=Sat
  return (today - dayOfTheWeek + 7) % 7;
}
export class SeededRNG {
  constructor(seedStr) {
    this._seedGen = this._xmur3(String(seedStr));
    this._rand = this._mulberry32(this._seedGen());
  }

  // float in [0, 1)
  next() {
    return this._rand();
  }

  // int in [min, max] (inclusive)
  randomInt(min, max) {
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      throw new Error("min and max must be finite numbers");
    }
    if (max < min) [min, max] = [max, min];
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  randomOf(...args) {
    if (args.length == 0) {
        return null
    }
    const arr = args.length == 1 && Array.isArray(args[0])? args[0]: args
    return arr[this.randomInt(0, arr.length - 1)];
  }

  shuffle(array_a){
    var iRandomize;
    for(iRandomize = 0; iRandomize < array_a.length; iRandomize++){
        var randomizeArrayIndex = this.randomInt(0, array_a.length - 1);
        var auxRandomize = array_a[iRandomize];
        array_a[iRandomize] = array_a[randomizeArrayIndex];
        array_a[randomizeArrayIndex] = auxRandomize;
    }
    return array_a
  }

  // chancePercent: <=0 => false, >=100 => true
  percentChance(chancePercent) {
    if (!Number.isFinite(chancePercent)) {
      throw new Error("chancePercent must be a finite number");
    }
    if (chancePercent <= 0) return false;
    if (chancePercent >= 100) return true;

    return this.next() < chancePercent / 100;
  }

  randomOfArrayWeighted(items, _weights) {
    if (items.length == 1) {
        return items[0]
    }

    let i;
    let weights = [..._weights]

    for (i = 1; i < weights.length; i++)
        weights[i] += weights[i - 1];
    
    let random = this.next() * weights[weights.length - 1];
    
    for (i = 0; i < weights.length; i++)
        if (weights[i] > random)
            break;
    
    return items[i];
  }

  // ---- internals ----
  _xmur3(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return () => {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      h ^= h >>> 16;
      return h >>> 0;
    };
  }

  _mulberry32(seed) {
    return () => {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
}

const DEFAULT_RNG = new SeededRNG(generateUniqueId())
window.DEFAULT_RNG = DEFAULT_RNG

// ---------------- React Small Utilities ----------------
export const styleMargined = { marginBottom: 'var(--element-padding)' }    // Use this as style={styleMargined}
export const stylePadded   = { padding: 'var(--element-padding)' }

export function getLocalStorageJSON(keyName) {
    const value = localStorage.getItem(keyName)
    if (value == null || value == 'undefined') {
        return null
    }
    try {
        return JSON.parse(value)
    } catch (e) {
        throw `${e.toString()} -- keyName: ${keyName}`
    }
}
export function setLocalStorageJSON(keyName, value) {
    if (value == null) {
        localStorage.removeItem(keyName)
    } else {
        try {
            localStorage.setItem(keyName, JSON.stringify(value))
        }  catch (e) {
            throw `${e.toString()} -- keyName: ${keyName}, value: ${value}`
        }
    }
    window.dispatchEvent(new CustomEvent('custom-storage', { detail: {
        key: keyName,
        value: value
    } }))
}
export function useLocalStorageState(keyName, defaultValue) {
    const existingValue = getLocalStorageJSON(keyName)
    if (existingValue == null) {
        localStorage.setItem(keyName, JSON.stringify(defaultValue))
    }

    const [state, setInnerState] = useState(existingValue == null? defaultValue: existingValue)
    
    useEffect(() => {
        window.addEventListener('custom-storage', evt => {
            if (evt.detail.key == keyName) {
                if (evt.detail.value == null || evt.detail.value == 'undefined') {
                    setInnerState(null)    
                } else {
                    setInnerState(evt.detail.value)
                }
            }
        })

        window.addEventListener('storage', evt => {
            if (evt.key == keyName) {
                if (evt.newValue == null || evt.newValue == 'undefined') {
                    setInnerState(null)
                } else {
                    setInnerState(JSON.parse(evt.newValue))
                }
            }
        })
    }, [])

    function setState(newState) {
        if (newState != null && newState.src != null) {
            console.log(`setState for key ${keyName} with newValue: ${JSON.stringify(newState)}`)
        }
        localStorage.setItem(keyName, JSON.stringify(newState))
        window.dispatchEvent(new CustomEvent('custom-storage', { detail: {
            key: keyName,
            value: newState
        } }))
        setInnerState(newState)
    }

    return [state, setState]
}
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export default function useConstWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

export function useConstIsPortrait() {
    const windowDimensions = useConstWindowDimensions()

    return windowDimensions.height > windowDimensions.width
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
export function loadImageAsync(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = async () => {
      try {
        if (img.decode) {
          await img.decode();
        }
      } catch (e) {
        // ignore decode errors
      }

      resolve(img);
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`));
    };

    img.src = src;
  });
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
export function getAnyKey(obj) {
    return getOnlyKey(obj)
}
export function getOnlyValue(obj) {
    return obj[getOnlyKey(obj)]
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
    if (items.length == 1) {
        return items[0]
    }

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
export function includesAll(str, strings) {
    for (const included of strings) {
        if (!str.includes(included)) {
            return false
        }
    }
    return true
}
export function includesAny(str, strings, excludesAny) {
    for (const included of strings) {
        if (str.includes(included)) {
            return included
        }
    }
    return false
}
export function includesAnyWithExceptions(text, strings, excludesAny) {
    for (const string of strings) {
        const exclusions = excludesAny[string]
        if (includesStrWithExceptions(text, string, exclusions)) {
            return true
        }
    }
    return false
}
export function includesStrWithExceptions(text, str, largerWords = []) {
  if (!str) return false;

  let t = String(text);
  const s = String(str);

  // If text doesn't contain str at all -> false
  if (!t.includes(s)) return false;

  // Remove every larger word that contains str (others don't matter)
  for (const lw of largerWords) {
    const word = String(lw);
    if (word && word.includes(s)) {
      t = t.split(word).join("");
    }
  }

  // If str still exists somewhere -> true
  return t.includes(s);
}

window.includesAll = includesAll
window.includesAny = includesAny
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






