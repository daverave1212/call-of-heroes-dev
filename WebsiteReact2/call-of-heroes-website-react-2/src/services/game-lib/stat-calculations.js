import { addArrays, addManyObjects, addObjects, calculateString, capitalizeFirstLetter, getAllClasses, isNumber, isString, MANA_BASED_SPELLCASTING, mapObject, SPECIAL_MANA_BASED_SPELLCASTING, stringReplaceAllMany } from "../../utils"
import { getRaceLocal } from "../content-providers/RaceProvider.js"
import {
    STAT_LIMITS_TEXT,
    MIGHT,
    DEXTERITY,
    INTELLIGENCE,
    SENSE,
    CHARISMA,
    MAX_HEALTH,
    HEALTH_REGEN,
    MOVEMENT_SPEED,
    INITIATIVE,
    EXTRA_INITIATIVE_AP,
    KNOWN_ABILITIES,
    SKILL_POINTS,
    MANA,
    ATTRIBUTE_NAMES,
    STAT_SHORTENED_STRING,
    STAT_NAMES,
    DEFAULT_STAT_ARRAY,
    DEFAULT_CHARACTER_BONUSES,
    STAT_ICON_NAME_MAP,
    ALL_ATTRIBUTES_0,
    BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP,
    MAIN_STAT_ALTERNATIVES_MAP,
    STAT_ALTERNATIVES_MAP,
    STAT_SYMBOLS
} from './stats-constants.js'

export * from './stats-constants.js'

export function getAvailableStatPointsByLevel(level) {
    return 3 + level
}
export function getBaseAttributes(raceObj) {
    return {
        [MAX_HEALTH]: raceObj.Stats['Base Health'],
        [MOVEMENT_SPEED]: 4,
        [HEALTH_REGEN]: raceObj.Stats[HEALTH_REGEN],
        [KNOWN_ABILITIES]: 0,
        [INITIATIVE]: 0,
        [SKILL_POINTS]: 2
    }
}
export function calculateStatsToBonusAttributesObject(statArray) {
    return {
        [MAX_HEALTH]: statArray[0] * 3,
        [HEALTH_REGEN]: statArray[3] * 2,
        [MOVEMENT_SPEED]: statArray[1] / 2,
        [INITIATIVE]: statArray[2] * 0.5,
        [KNOWN_ABILITIES]: statArray[2],
        [SKILL_POINTS]: statArray[1] + statArray[2]
    }
}
export function getAttributeBonusesFromLevel(level, classObj) {
    return {
        [MAX_HEALTH]: (level - 1) * classObj['Level Up']['Every Level'][MAX_HEALTH],
        [HEALTH_REGEN]: (level - 1) * 2,
        [MOVEMENT_SPEED]: 0,
        [INITIATIVE]: 0,
        [KNOWN_ABILITIES]: 0,
        [SKILL_POINTS]: level - 1
    }
}
export function getAttributeCalculationsByStats(statArray) {
    const bonusAttributes = calculateStatsToBonusAttributesObject(statArray)
    const signs = mapObject(bonusAttributes, ({ key, value }) => ({ key: key, value: value < 0? `-`: '+'}))
    const numbers = mapObject(bonusAttributes, ({ key, value }) => ({ key, value: Math.abs(value)}))

    return {
        [MAX_HEALTH]: { left: `Race HP`, middle: signs[MAX_HEALTH], right: numbers[MAX_HEALTH] },
        [HEALTH_REGEN]: { left: `Race Health Regen`, middle: signs[HEALTH_REGEN], right: numbers[HEALTH_REGEN] },
        [MOVEMENT_SPEED]: { left: `4`, middle: signs[MOVEMENT_SPEED], right: numbers[MOVEMENT_SPEED] },
        [INITIATIVE]: { left: ``, middle: '', right: bonusAttributes[INITIATIVE] },
        [KNOWN_ABILITIES]: { left: ``, middle: '', right: bonusAttributes[KNOWN_ABILITIES] },
        [SKILL_POINTS]: { left: `2`, middle: `+`, right: statArray[1] + statArray[2] }
    }
}
export function calculateExtraFirstTurnAPByInitiative(initiative) {
    return Math.floor(initiative / 5)
}
export function getSkillPointsByStatsAndLevel({totalStats, level}) {
    const dex = getStatValueByName(DEXTERITY, totalStats)
    const int = getStatValueByName(INTELLIGENCE, totalStats)
    return 2 + dex + int + level - 1
}

export const ATTRIBUTES_CALCULATIONS_SPANS = {
    [MAX_HEALTH]: () => <span>Your <b>{MAX_HEALTH}</b> = Race Health + {BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[MAX_HEALTH]}</span>,
    [HEALTH_REGEN]: () => <span>Your <b>{HEALTH_REGEN}</b> = Race Health Health + {BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[HEALTH_REGEN]}</span>,
    [MOVEMENT_SPEED]: () => <span>Your <b>{MOVEMENT_SPEED}</b> = 4 + {BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[MOVEMENT_SPEED]}</span>,
    [INITIATIVE]: () => <span>Your <b>{INITIATIVE}</b> = {BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[INITIATIVE]}</span>,
    [EXTRA_INITIATIVE_AP]: () => <span>On your first Turn every Combat, you have extra Action Points = {BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[EXTRA_INITIATIVE_AP]}</span>,
    [KNOWN_ABILITIES]: () => <span>Your can have a number of <br/>extra <b>{KNOWN_ABILITIES}</b> = {BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[KNOWN_ABILITIES]}</span>,
    [SKILL_POINTS]: () => <span>Your have <b>{SKILL_POINTS}</b> = {BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[SKILL_POINTS]}</span>,
}
export const ATTRIBUTES_EXPLANATIONS = {
    [MAX_HEALTH]: () => <span>Max Health determines how much you can resist in Combat. Your entire Health regenerates between Adventures.</span>,
    [HEALTH_REGEN]: () => <span>After every Combat, you automatically heal equal to your Health Regen. No need for resting!</span>,
    [MOVEMENT_SPEED]: () => <span>You can spend 1 Action Point to move this many meters (you have 3 Action Points per Turn).</span>,
    [INITIATIVE]: () => <span>On your first Turn every Combat, you have <b>extra</b> Action Points equal to your Initiative (rounded down).<br/>Note that even if your Initiative is a fraction, like 2.5, you only have 2 extra Action Points and ignore the rest of 0.5.</span>,
    [EXTRA_INITIATIVE_AP]: () => <span></span>,
    [KNOWN_ABILITIES]: () => <span>Normally, for each Class Talent tier (e.g. Level 1 Class Talents), you get 1 free Talent pick, but you get <b>extra Class Talents</b> equal to your Intelligence. For example, if your Intelligence is 2, you get 2 extra Class Talents from the Level 1 Class Talents.</span>,
    [SKILL_POINTS]: () => <span>You can spend each 1 Skill Point to get +1 in a certain activity. These can be anything from fishing and swimming, to jumping or even sight, to knowledge about specific subjects or even general knowledge. You can assign more points in a certain Skill (as long as it's at most equal to your highest Stat).</span>,
}
export function AttributeCalculationTextComponent({statName}) {
    const Comp = ATTRIBUTES_CALCULATIONS_SPANS[statName]
    if (ATTRIBUTES_CALCULATIONS_SPANS[statName] == null) {
        return <span>?</span>
    }
    return <Comp/>
}






// Special Calculations
export function getSpecialBonusesByName(name, { totalStats, attributes }) {
    const specialCalculations = {
        'Trollskin': {
            'Max Health': getStatValueByName(MIGHT, totalStats) * 3 * -1,
            'Health Regen': getStatValueByName(MIGHT, totalStats) * 2
        },
        'Embracing Humanity': {
            [HEALTH_REGEN]: getStatValueByName(CHARISMA, totalStats) * 2,
            [SKILL_POINTS]: getStatValueByName(CHARISMA, totalStats) * 2,
        }
    }
    // console.log({ location: 'getSpecialBonusesByName', totalStats, attributes, specialCalculations, return: specialCalculations[name] })
    return specialCalculations[name]
}
export function getStatLimitByLevel(level) {
    if (level <= 2) {
        return 2
    }
    if (level <= 3) {
        return 3
    }
    if (level <= 6) {
        return 4
    }
    if (level <= 9) {
        return 5
    }
    return 6
}
export function getSkillLimitByLevel(level) {
    return getStatLimitByLevel(level)
}
export function getStatBonusObjByPointsInvested(points, initialValue=0) {

    if (points <= 0) {
        return {
            value: initialValue + points,
            pointsLeft: 0,
            fraction: 0,
            costForPlus1: 1,
            number: initialValue + points
        }
    }

    let value = initialValue
    let pointsLeft = points
    let costForPlus1 = 1

    function recalculateCostForPlus1() {
        costForPlus1 = value <= 0? 1: (value + 1)
        if (costForPlus1 <= 0) {    // TODO: I was too tired to find the correct formula fix for this
            costForPlus1 = 1
        }
    }

    recalculateCostForPlus1()
    while (costForPlus1 <= pointsLeft) {
        value += 1
        pointsLeft -= costForPlus1
        recalculateCostForPlus1()
    }

    const fraction = parseFloat((pointsLeft / costForPlus1).toFixed(2))

    return {
        value,
        pointsLeft,
        fraction,
        costForPlus1,
        number: value + fraction    // TODO: Possible bug if total number is negative
    }
}
window.getStatBonusObjByPointsInvested = getStatBonusObjByPointsInvested







// Utils for Stats
export function getStatValueByName(name, statsArrOrObj) {
    const fixedName = STAT_ALTERNATIVES_MAP[name]
    if (fixedName == null) {
        console.error(`Could not find stat named ${name} in alternatives.`)
        return 0
    }
    if (Array.isArray(statsArrOrObj)) {
        const index = STAT_NAMES.indexOf(fixedName)
        if (index == -1) {
            console.error(`Could not find index for stat named ${fixedName} in STAT_NAMES ${STAT_NAMES}.`)
            return 0
        }
        return statsArrOrObj[index]
    }
    return statsArrOrObj[fixedName]
}
window.getStatValueByName = getStatValueByName
export function normalizeStatsObject(obj) { // Replaces each alternative key with its base
    const newObj = {}
    for (const key of Object.keys(obj)) {
        if (key in STAT_ALTERNATIVES_MAP) {
            const normalKey = STAT_ALTERNATIVES_MAP[key]
            newObj[normalKey] = obj[key]
        } else {
            newObj[key] = obj[key]
        }
    }
    return newObj
}
export function normalizeTextWithStats(str) {   // Replaces each alternative str with its base
    if (str == null) {
        console.error(`Null str given to normalizeTextWithStats. Returning "0".`)
        return "0"
    }
    if (isNumber(str)) {
        return str + ''
    }
    for (const key of Object.keys(STAT_ALTERNATIVES_MAP)) {
        const newStr = str.replaceAll(key, STAT_ALTERNATIVES_MAP[key])
        str = newStr
    }
    return str
}
export function getStatsArrayFromObject(obj) {
    const normalObj = normalizeStatsObject(obj)
    return STAT_NAMES.map(name => normalObj[name] ?? 0)
}





export function getAllStatBonusesYMLAsObjFromSpellsArray(spellsArray) {
    let bonuses = {}
    let sources = []

    // Get bonuses
    for (const spell of spellsArray) {
        if (spell.Bonuses == null) {
            continue
        }
        const statNames = Object.keys(spell.Bonuses)
        for (const statName of statNames) {
            if (bonuses[statName] == null) {
                bonuses[statName] = 0
            }
            sources.push({ statName, bonus: spell.Bonuses[statName], source: spell.Name })
            bonuses[statName] += spell.Bonuses[statName]
        }
    
    }
    return { bonuses, sources }
}
export function getMonsterStatsAsObject(statsString) {
    let monsterStatsNormalized
    if (isString(statsString) == false) monsterStatsNormalized = STAT_NAMES.map(_ => '?').join('/')
    else if (statsString.indexOf('/') == -1) monsterStatsNormalized = STAT_NAMES.map(_ => '?').join('/')
    else monsterStatsNormalized = statsString

    const monsterStatsNumbers = monsterStatsNormalized.split('/')
    const monsterStats = []
    for (let i = 0; i < STAT_NAMES.length; i++) {
        monsterStats[i] = { name: STAT_NAMES[i], value: monsterStatsNumbers[i] }
    }
    
    return monsterStats
}




// Stats and Bonuses
export function checkStatRequirements(stats, requirementStringCode) {
    requirementStringCode = requirementStringCode.replaceAll('or', '||')
    requirementStringCode = requirementStringCode.replaceAll('and', '&&')
    // First normalize
    for (const key of Object.keys(STAT_ALTERNATIVES_MAP)) {
        requirementStringCode = requirementStringCode.replaceAll(key, STAT_ALTERNATIVES_MAP[key])
    }
    // Then replace with numbers
    for (let i = 0; i < STAT_NAMES.length; i++) {
        requirementStringCode = requirementStringCode.replaceAll(STAT_NAMES[i], stats[i])
    }
    // Finally, eval
    const result = eval(requirementStringCode)
    return result
}
export function calculateBaseMaxManaByLevel(level=1, className) {
    const selectedClass = getAllClasses()[className]
    if (selectedClass == null) {
        console.error(`calculateBaseMaxManaByLevel: class named ${className} not found`)
        return 0
    }
    const { Spellcasting } = selectedClass
    if (Spellcasting?.Type == MANA_BASED_SPELLCASTING) {
        return (Spellcasting?.Mana?.Amount || 0) + (level - 1)
    }
    if (Spellcasting?.Type == SPECIAL_MANA_BASED_SPELLCASTING) {
        return (Spellcasting?.Mana?.Amount || 0)
    }
    return null
}
export function calculateExperienceByLevel(level) {
    return level * 100
}
export function calculateAllAtributes({raceName, className, level, totalStats, bonuses, specialBonusNames}) {
    if (raceName == null || className == null || level == null || totalStats == null) {
        return {...ALL_ATTRIBUTES_0}
    }
    const raceObj = getRaceLocal(raceName)
    const classObj = getAllClasses()[className]
    const totalStatsArray = totalStats
    
    const baseAttributes = getBaseAttributes(raceObj)
    const bonusAttributesFromStats = calculateStatsToBonusAttributesObject(totalStatsArray)
    const bonusAttributesFromLevel = getAttributeBonusesFromLevel(level, classObj)
    const attributes = addManyObjects([baseAttributes, bonusAttributesFromStats, bonusAttributesFromLevel, bonuses])
    
    let attributesWithSpecialBonuses = attributes
    let extraCalculatedBonuses
    if (specialBonusNames != null) {
        extraCalculatedBonuses = getCalculatedSpecialBonuses({ totalStats: totalStatsArray, specialBonusNames, attributes })
        attributesWithSpecialBonuses = addManyObjects([attributes, extraCalculatedBonuses])
    }

    applyMultipliersToAttributes({ attributes, bonuses })
    
    // console.log('calculateAllAtributes')    
    // console.log({ attributes, attributesWithSpecialBonuses, bonuses, totalStats, baseAttributes, bonusAttributesFromStats, bonusAttributesFromLevel, specialBonusNames, extraCalculatedBonuses})

    return attributesWithSpecialBonuses
}



function getCalculatedSpecialBonuses({ totalStats, specialBonusNames, attributes }) {
    if (specialBonusNames == null || specialBonusNames?.length == 0) {
        return {}
    }

    // ['Trollskin', 'Dwarfenhalmen']
    const namesToBonusesObjs = specialBonusNames.map(name => getSpecialBonusesByName(name, { totalStats, attributes }))
    const addedBonuses = addManyObjects(namesToBonusesObjs)
    // console.log({namesToBonusesObjs, addedBonuses})
    return addedBonuses
}
window.getCalculatedExtraBonuses = getCalculatedSpecialBonuses
function applyMultipliersToAttributes({ attributes, bonuses }) {
    if (attributes == null || bonuses == null) {
        console.error(`POSSIBLE ERROR: applyMultipliersToAttributes got null parameters ${attributes} ${bonuses}`)
        return
    }
    for (const [key, value] of Object.entries(attributes)) {
        const multiplierKey = key + ' Multiplier'
        const multiplier = bonuses[multiplierKey]

        if (multiplier == null) {
            continue
        }
        if (!isNumber(value) || !isNumber(multiplier)) {
            console.error(`POSSIBLE ERROR: applyMultipliersToAttributes got null value or multiplier at key ${key} with value ${value} and multiplier ${multiplier}`)
            continue
        }

        attributes[key] = Math.floor(attributes[key] * multiplier)
    }
}
