

/*
 *  Defines what each type of file should look like
 */

let string = 'string'
let number = 'number'
let customObject = 'customObject'
let ability = 'ability'
let abilityList = 'abilityList'
let anything = 'anything'
let spec = 'spec'
let specList = 'specList'

let weapon = 'weapon'
let armor = 'armor'

export let types = { string, number, customObject, ability, abilityList, anything, spec }

export function isVarString(v) { return typeof(v) == 'string' }

export let armorMapping = {
    'Armor Bonus':  anything,
    '*Effect':      string,
    '*Downside':    string,
    'Description':  string
}

export let weaponMapping = {
    'Stat':          string,
    'Hands':         string,
    '*Special':      string,
    'Damage':        string,
    '*Effect':       string,
    '*Alternatives': string,
    '*Downside':     string,
    '*Notes':        string
}

export let abilityMapping = {
    'A':            string,
    '*Cooldown':    string,
    '*Range':       string,
    '*Cost':        string,
    'Effect':       string,
    '*Downside':    string,
    '*Notes':       string,
    '*Requirement': string,
    '*Variant':     string,
    '*Duration':    string,
    '*Variant':     string
}

export let specMapping = {
    'Description':          string,
    'Starting Abilities':   abilityList,
    '*Other':               string,
    '*Abilities':           abilityList,
    'Talents': {
        'Level 2':          abilityList,
        '*Level 4':         abilityList
    }
}

export let monsterMapping = {
    Rating: number,
    Stats: string,
    Health: number,
    Armor: number,
    Speed: anything,
    Initiative: anything,
    Attack: customObject,
    Behavior: string,
    Abilities: customObject,
    '*Suggested Obstacles': [string],
    '*Encounter Ideas': [string]
}

export let backgroundMapping = {
    Title: string,
    Description: string,
    Effect: string,
    Money: number,
    '*Language': string,
    '*Training': string,
    '*Skills': string,
    '*Skill Points': number
}

export let classMapping = {
    'Class':        string,
    'Description':  string,
    'Options': {
        'When creating your character': {
            'Choose 2': [string],
            'Saves': [string]
        }
    },

    'Skills': customObject,

    'Stats': {
        'Base Health': number
    },

    'Language': string,

    'Level Up': {
        'Every Level':  [string],
        '*Other':       string
    },

    'Spellcasting': {
        'Main Stat':    string,
        'Spell DC':     string,
        'Charges': {
            'Amount':   number,
            'Regain':   string
        },
        'Change':       string,
        '*Other':       string,
        '*Number of known maneuvers': string,
        '*Number of known spells':   string,
        '*Number of known maneuvers and spells': string,
        'Spell List': [string]
    },

    'Starting Abilities': abilityList,
    '*Abilities': abilityList,
    '*Other Ability Mentions': string,
    
    '*Other': string,

    'Specializations': {
        'Description':  string,
        'Choices':      [string]
    },

    'Specs': specList
    

}

export let raceMapping = {
    'Race':             string,
    'Description':      string,
    '*Variant':         string,

    'Options': {
        'When creating your character': {
            'Either': {
                'Choose 2': [string],
                '*Choose 1': [string]
            },
            'Saves': [string]
        }
    },

    'Skills': customObject,

    'Stats': {
        'Base Health':  number,
        'Movement':     string,
        'Lifespan':     string,
        'Languages':    string,
        '*Size':        string
    },

    '*Language':        string,
    '*Weapons':         string,

    '*Other':           string,

    'Starting Abilities': abilityList,

    'Talents': {
        'Level 0': abilityList,
        'Level 3': abilityList,
    },
    
    '*Ideas': customObject
        
}

export let abilitiesMapping = {
    Maneuvers: abilityList,
    Elemental: abilityList,
    Arcane: abilityList,
    Protection: abilityList,
    Conjuration: abilityList,
    Mysticism: abilityList,
    Restoration: abilityList,
    Eldritch: abilityList,
    Divine: abilityList
}