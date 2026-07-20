
export const STAT_LIMITS_TEXT = "Your Stat limit (and non-combat Skill limit) is 2 and increases by 1 every 2 Levels (it's 2 at Levels 1-2, 3 at Levels 3-4, 4 at Levels 5-6, etc)."

export const MIGHT = 'Might'
export const DEXTERITY = 'Instinct'
export const INTELLIGENCE = 'Focus'
export const SENSE = 'Presence'
export const CHARISMA = 'Presence'

export const MAX_HEALTH = 'Max Health'
export const HEALTH_REGEN = 'Health Regen'
export const MOVEMENT_SPEED = 'Movement Speed'
export const INITIATIVE = 'Initiative'
export const EXTRA_INITIATIVE_AP = '1st Turn AP'
export const SKILL_POINT = 'Skill Point'
export const KNOWN_ABILITIES = 'Known Minor Talents'
export const SKILL_POINTS = 'Skill Points'
export const MANA = 'Mana'
export const ATTRIBUTE_NAMES = [MAX_HEALTH, HEALTH_REGEN, MOVEMENT_SPEED, INITIATIVE]

export const STAT_SHORTENED_STRING = {
    [MIGHT]: 'MIG',
    [DEXTERITY]: 'INS',
    [INTELLIGENCE]: 'FOC',
    [SENSE]: 'PRE',
    [CHARISMA]: 'PRE',
    [MAX_HEALTH]: 'HP',
    [HEALTH_REGEN]: 'Regen',
    [MOVEMENT_SPEED]: 'Speed',
}

export const STAT_NAMES = [MIGHT, DEXTERITY, INTELLIGENCE, SENSE /*, CHARISMA */]
export const DEFAULT_STAT_ARRAY = [-1, 0, 1, 2/*, 3*/]
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
    [INITIATIVE]: 'Hand',
    [EXTRA_INITIATIVE_AP]: 'Hand',
    [SKILL_POINTS]: 'Range'
}
export const ALL_ATTRIBUTES_0 = {
    [MAX_HEALTH]: 0,
    [HEALTH_REGEN]: 0,
    [MOVEMENT_SPEED]: 4,
    [KNOWN_ABILITIES]: 0,
    [INITIATIVE]: 0,
}

export const BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP = {
    [MAX_HEALTH]: `3 × ${MIGHT}`,
    [MOVEMENT_SPEED]: `0.5 for each ${DEXTERITY}`,
    [HEALTH_REGEN]: `2 × ${CHARISMA}`,
    [KNOWN_ABILITIES]: `${INTELLIGENCE}`,
    [SKILL_POINTS]: `${INTELLIGENCE}`,
    [INITIATIVE]: `0.5 for each ${INTELLIGENCE}`,
    [EXTRA_INITIATIVE_AP]: `1 for each 5 Initiative`
}

export const STAT_DESCRIPTIONS = {
    [MIGHT]: `physical strength, pain tolerance, show of dominance, and confidence`,
    [DEXTERITY]: `running speed, agility, reflexes, and connection to your primal side`,
    [INTELLIGENCE]: `knowledge, talent for magic, resilience of mind, and concentration`,
    [SENSE]: `charisma, attunement to the surrounding world, and attention to detail`
}

// No need to update these
export const MAIN_STAT_ALTERNATIVES_MAP = {
    'Might': MIGHT,
    'Strength': MIGHT,
    'Body': MIGHT,
    
    'Dexterity': DEXTERITY,
    'Heart': DEXTERITY,
    'Instinct': DEXTERITY,
    
    'Intelligence': INTELLIGENCE,
    'Mind': INTELLIGENCE,
    'Focus': INTELLIGENCE,
    
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
    'Known Basic Abilities': KNOWN_ABILITIES,   // Old, backwards compatibility
    'Known Minor Talents': KNOWN_ABILITIES,
    'Minor Talents': KNOWN_ABILITIES,
    'Class Talents': KNOWN_ABILITIES,

    'Initiative': INITIATIVE
}




function mapObject(obj, func) {
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


const mainStatsAlterantivesSymbols = mapObject(MAIN_STAT_ALTERNATIVES_MAP, ([key, value]) => ([key, { tag: 'span', text: value }]))
const statDesriptionsSymbols = mapObject(STAT_DESCRIPTIONS, ([key, value]) => ([`${key}Description`, { tag: 'span', text: value }]))
const attributeCalculationSymbols =  mapObject(BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP, ([key, value]) => ([`${key.split(' ').join('')}Calculation`, { tag: 'span', text: value }]))

export const STAT_SYMBOLS = {...mainStatsAlterantivesSymbols, ...statDesriptionsSymbols, ...attributeCalculationSymbols}