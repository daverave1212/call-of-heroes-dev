import { addArrays, addManyObjects, addObjects, capitalizeFirstLetter, getAllClasses, getAllRaces, isString } from "../../utils"

export const STAT_LIMITS_TEXT = "Your Stat limit is 3 and increases by 1 every 3 Levels (it's 3 at Levels 1-3, 4 at Levels 4-6, etc)."

export const MIGHT = 'Might'
export const DEXTERITY = 'Dexterity'
export const INTELLIGENCE = 'Intelligence'
export const SENSE = 'Presence'
export const CHARISMA = 'Presence'

export const MAX_HEALTH = 'Max Health'
export const HEALTH_REGEN = 'Health Regen'
export const MOVEMENT_SPEED = 'Movement Speed'
export const INITIATIVE = 'Initiative'
export const KNOWN_ABILITIES = 'Known Minor Talents'
export const MANA = 'Mana'
export const ATTRIBUTE_NAMES = [MAX_HEALTH, HEALTH_REGEN, MOVEMENT_SPEED, INITIATIVE]

export const STAT_NAMES = [MIGHT, DEXTERITY,INTELLIGENCE, CHARISMA]
export const DEFAULT_STAT_ARRAY = [-1, 0, 1, 2]
export const DEFAULT_CHARACTER_BONUSES = {
    [MIGHT]: 0,
    [DEXTERITY]: 0,
    [INTELLIGENCE]: 0,
    [SENSE]: 0,
    [CHARISMA]: 0,

    [MAX_HEALTH]: 0,
    [HEALTH_REGEN]: 0,
    [MOVEMENT_SPEED]: 0,
    [INITIATIVE]: 0,

    [MANA]: 0,
    [KNOWN_ABILITIES]: 0,
    "Skills": 0,
    'Extras': [],
    'Combat Extras': []
}


export const STAT_ICON_NAME_MAP = {
    [MAX_HEALTH]: 'Health',
    [HEALTH_REGEN]: 'HealthRegen',
    [MOVEMENT_SPEED]: 'Speed',
    [KNOWN_ABILITIES]: 'Spell',
    [INITIATIVE]: 'Replacement',
}
export const ALL_ATTRIBUTES_0 = {
    [MAX_HEALTH]: 0,
    [HEALTH_REGEN]: 0,
    [MOVEMENT_SPEED]: 4,
    [KNOWN_ABILITIES]: 0,
    [INITIATIVE]: 0,
}
export function getBaseAttributes(raceObj) {
    return {
        [MAX_HEALTH]: raceObj.Stats['Base Health'],
        [HEALTH_REGEN]: raceObj.Stats[HEALTH_REGEN],
        [MOVEMENT_SPEED]: 4,
        [KNOWN_ABILITIES]: 0,
        [INITIATIVE]: 0,
    }
}
export function calculateStatsToAttributesObject(statArray) {
    return {
        [MAX_HEALTH]: statArray[0] * 3,
        [HEALTH_REGEN]: statArray[3] * 2,
        [MOVEMENT_SPEED]: Math.floor(statArray[1] / 2),
        [INITIATIVE]: statArray[1] + statArray[2],
        [KNOWN_ABILITIES]: statArray[2]
    }
}
export function getAttributeBonusesFromLevel(level, classObj) {
    return {
        [MAX_HEALTH]: (level - 1) * classObj['Level Up']['Every Level'].Health,
        [HEALTH_REGEN]: (level - 1) * 2,
        [MOVEMENT_SPEED]: 0,
        [INITIATIVE]: 0,
        [KNOWN_ABILITIES]: 0
    }
}
export const BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP = {
    [MAX_HEALTH]: `3 × ${MIGHT}`,
    [MOVEMENT_SPEED]: `1 for each 2 Dexterity points (or -1 for each -1 Dexterity point!)`,
    [HEALTH_REGEN]: `2 × ${SENSE}`,
    [KNOWN_ABILITIES]: `${INTELLIGENCE}`,
    [INITIATIVE]: `${DEXTERITY} + ${INTELLIGENCE}`
}
export const ATTRIBUTES_CALCULATIONS_SPANS = {
    [MAX_HEALTH]: () => <span>Your <b>{MAX_HEALTH}</b> = Race Health + {BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[MAX_HEALTH]}</span>,
    [HEALTH_REGEN]: () => <span>Your <b>{HEALTH_REGEN}</b> = Race Health Health + {BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[HEALTH_REGEN]}</span>,
    [MOVEMENT_SPEED]: () => <span>Your <b>{MOVEMENT_SPEED}</b> = 4 + {BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[MOVEMENT_SPEED]}</span>,
    [INITIATIVE]: () => <span>Your <b>{INITIATIVE}</b> = {BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[INITIATIVE]}</span>,
    [KNOWN_ABILITIES]: () => <span>Your can have a number of <br/>extra <b>{KNOWN_ABILITIES}</b> = {BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[KNOWN_ABILITIES]}</span>,
}
export function AttributeCalculationTextComponent({statName}) {
    const Comp = ATTRIBUTES_CALCULATIONS_SPANS[statName]
    if (ATTRIBUTES_CALCULATIONS_SPANS[statName] == null) {
        return <span>?</span>
    }
    return <Comp/>
}




// No need to update these
export const MAIN_STAT_ALTERNATIVES_MAP = {
    'Might': MIGHT,
    'Strength': MIGHT,
    'Body': MIGHT,
    
    'Dexterity': DEXTERITY,
    'Heart': DEXTERITY,
    
    'Intelligence': INTELLIGENCE,
    'Mind': INTELLIGENCE,
    
    'Sense': SENSE,
    'Willpower': SENSE,
    'Wisdom': SENSE,
    'Spirit': SENSE,
    'Soul': SENSE,
    
    'Presence': CHARISMA,
    'Charisma': CHARISMA,
}
export const STAT_ALTERNATIVES_MAP = {
    ...MAIN_STAT_ALTERNATIVES_MAP,

    'Max Health': MAX_HEALTH,
    'Maximum Health': MAX_HEALTH,
    'Base Health': MAX_HEALTH,
    'Health': MAX_HEALTH,

    'Health Regen': HEALTH_REGEN,
    'Regen': HEALTH_REGEN,
    'Health Regeneration': HEALTH_REGEN,
    'Regeneration': HEALTH_REGEN,

    'Movement Speed': MOVEMENT_SPEED,
    'Movement': MOVEMENT_SPEED,
    'Speed': MOVEMENT_SPEED,
    'Move Speed': MOVEMENT_SPEED,
    
    'Known Abilities': KNOWN_ABILITIES,
    'Known Basic Abilities': KNOWN_ABILITIES,
    'Known Minor Talents': KNOWN_ABILITIES,
    'Minor Talents': KNOWN_ABILITIES,

    'Initiative': INITIATIVE
}
export const STAT_SYMBOLS = {
    'Might': { tag: 'span', text: MIGHT },
    'Dexterity': { tag: 'span', text: DEXTERITY },
    'Intelligence': { tag: 'span', text: INTELLIGENCE },
    'Sense': { tag: 'span', text: SENSE },
    'Charisma': { tag: 'span', text: CHARISMA },
}






// Utils for Stats
export function getStatValueByName(name, statsArrOrObj) {
    name = STAT_ALTERNATIVES_MAP[name]
    if (Array.isArray(statsArrOrObj)) {
        return statsArrOrObj[STAT_NAMES.indexOf(name)]
    }
    return statsArrOrObj[name]
}
export function normalizeStatsObject(obj) {
    const newObj = {}
    for (const key of Object.keys(obj)) {
        const normalKey = STAT_ALTERNATIVES_MAP[key]
        newObj[normalKey] = obj[key]
    }
    return newObj
}
export function normalizeTextWithStats(str) {
    for (const key of Object.keys(STAT_ALTERNATIVES_MAP)) {
        str = str.replaceAll(key, STAT_ALTERNATIVES_MAP[key])
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
export function calculateBaseMaxManaByLevel(level, className) {
    const selectedClass = getAllClasses()[className]
    const { Spellcasting } = selectedClass
    if (Spellcasting.Type == 'Mana-based') {
        return Spellcasting.Mana.Amount + (level - 1)
    }
    if (Spellcasting.Type == 'Special Mana-based') {
        return Spellcasting.Mana.Amount + Math.floor((level / 3))        
    }
    return 0
}
export function calculateExperienceByLevel(level) {
    return level * 100
}
export function calculateAllAtributes({raceName, className, level, totalStats, bonuses}) {
    if (raceName == null || className == null || level == null || totalStats == null) {
        return {...ALL_ATTRIBUTES_0}
    }
    const raceObj = getAllRaces()[raceName]
    const classObj = getAllClasses()[className]
    
    const baseAttributes = getBaseAttributes(raceObj)
    const bonusAttributesFromStats = calculateStatsToAttributesObject(totalStats)
    const bonusAttributesFromLevel = getAttributeBonusesFromLevel(level, classObj)

    console.log('calculateAllAtributes')
    
    const finalObject = addManyObjects([baseAttributes, bonusAttributesFromStats, bonusAttributesFromLevel, bonuses])
    
    console.log({ finalObject, bonuses, totalStats, baseAttributes, bonusAttributesFromStats, bonusAttributesFromLevel})

    return finalObject

    // return {
    //     [MAX_HEALTH]:
    //         raceObj.Stats['Base Health']
    //         + bonusesFromStat[MAX_HEALTH]
    //         + (level - 1) * classObj['Level Up']['Every Level'].Health
    //         + (bonuses[MAX_HEALTH] ?? bonuses['Health'] ?? 0),
    //     [HEALTH_REGEN]:
    //         raceObj.Stats[HEALTH_REGEN]
    //         + bonusesFromStat[HEALTH_REGEN]
    //         + (level - 1) * 2
    //         + (bonuses[HEALTH_REGEN] ?? 0),
    //     [MOVEMENT_SPEED]:
    //         bonusesFromStat[MOVEMENT_SPEED]
    //         + (bonuses[MOVEMENT_SPEED] ?? bonuses['Movement'] ?? 0),
    //     [INITIATIVE]:
    //         bonusesFromStat[INITIATIVE]
    //         + (bonuses[INITIATIVE] ?? 0)
    // }
}

export function calculateNKnownAbilities(className, totalStats, bonuses) {
    const theClass = getAllClasses()[className]
    const bonusKnownAbilities =
        bonuses == null?
            0:
        bonuses['Known Abilities'] == null?
            0:
        parseInt(bonuses['Known Abilities'])
    return Math.max(1, theClass.Spellcasting.BaseKnownSpells + totalStats[2] + bonusKnownAbilities)
}