import { $SKILLS, capitalizeFirstLetter, filterObject, getAlternativesAsArray, includesAll, includesAny, joinObjectValues, last, mapObject, mergeObjectsContainingArrays, onlyUniqueFilter, parseTextWithSymbols, percentChance, randomInt, randomOf, randomOfArrayWeighted, shuffle, spellsFromObject, stringReplaceAllMany } from "../../utils";
import MagicItemProperties from '../../databases/Other/MagicItemProperties.json'
import Weapons from '../../databases/Weapons.json'
import Armors from '../../databases/Armors.json'
import Item from "../../components/Spell/Item";
import Page from "../../containers/Page/Page";
import TwoColumns from "../../components/TwoColumns/TwoColumns";
import Column from "../../components/TwoColumns/Column";
import { useState } from "react";
import HeroButton from "../../components/HeroButton/HeroButton";
import Spell from '../../components/Spell/Spell'
import { isString } from "markdown-it/lib/common/utils";
const ALL_WEAPONS_ARRAY = [
    ...spellsFromObject(Weapons['One-Handed Melee']).map(item => ({...item, type: 'One-Handed Melee'})),
    ...spellsFromObject(Weapons['Two-Handed Melee']).map(item => ({...item, type: 'Two-Handed Melee'})),
    ...spellsFromObject(Weapons['One-Handed Ranged']).map(item => ({...item, type: 'One-Handed Ranged'})),
    ...spellsFromObject(Weapons['Two-Handed Ranged']).map(item => ({...item, type: 'Two-Handed Ranged'}))
]


function getRandomSoulboundCurse(item, armorOrWeapon) {
    const possibilities =
        item.Type == 'Armor' || item.Type == 'Shield'?
            MagicItemProperties.Soulbound.Armor
        :MagicItemProperties.Soulbound.Weapon
    const randomPossibility = randomOf(...possibilities)
    return randomPossibility
}
function parseItemText(text, thisText='#####') {
    const randomElement = () => randomOf('Slash', 'Pierce', 'Smash', 'Pulse', 'Fire', 'Cold', 'Shock', 'Poison', 'Acid', 'Divine', 'Scourge')
    const preferredElement = randomElement()

    let customSymbols = {
        'This': { tag: 'span', text: thisText },
        'Color': { tag: 'span', text: randomOf('red', 'crimson-red', 'amber', 'turquoise', 'emerald-green', 'green', 'sapphire-blue', 'blue', 'ethereal-blue', 'orange', 'yellow', 'purple', 'teal', 'black', 'white', 'celsetial silver')},
        'DamageType': { tag: 'span', text: (percentChance(75)? preferredElement: randomElement())},
        'Soulbound': { tag: 'span', text: 'CURSED TO DO' },
        'Stat': { tag: 'span', text: randomOf('Might', 'Dexterity', 'Intelligence', 'Sense', 'Charisma')},
        'Skill': { tag: 'span', text: randomOf(...$SKILLS)},
        'WeaponType': { tag: 'span', text: randomOf('1-Handed Melee', '2-Handed Melee', '1-Handed Ranged', '2-Handed Ranged')},
        'CrowdControl': { tag: 'span', text: randomOf('Slowed', 'Fumbling', 'Rooted', 'Blinded', 'Crippled', 'Silenced', 'Stunned', 'Feared', 'Dazed')},
        'SpellSchool': { tag: 'span', text: randomOf('Bloodshed', 'Warfare', 'Elemental', 'Arcane', 'Mysticism', 'Nature', 'Divine', 'Eldritch')},
        'MonsterType': { tag: 'span', text: randomOf('Person', 'Beast', 'Undead', 'Demon', 'Fiend', 'Celestian', 'Giant', 'Fey', 'Monster', 'Insect', 'Elemental', 'Dragon', 'Construct')},
        'Language': { tag: 'span', text: randomOf('Elvish', 'Dwarvish', 'Orcish', 'Dragonspeak', 'Whispertone', "Thieves' Cant", 'Ancian', 'Gian', 'Goblan')},
    }

    return parseTextWithSymbols(text, customSymbols, { shouldReturnStringsOnly: true }).join('')
}
window.parseItemText = parseItemText
function tryNameItem(item) {

    if (item.Name == null) {
        console.log({item})
        throw `tryNameItem: item has no Name property. Printed above.`
    }

    const MAX_NAME_LENGTH = 30
    function getAnyTextByKeywordsOrFallback(text, keywords, fallbackArray) {
        const keysRandomized = shuffle(Object.keys(keywords))
        for (const key of keysRandomized) {
            if (text.includes(key)) return randomOf(...keywords[key])
        }
        return randomOf(...fallbackArray)
    }
    function maybeGetAnyKeyordByConditions(text, matchConditions, fallbackArray=[null]) {
        const allAffixesClumped = Object.keys(matchConditions)
        const possibleAffixesClumped = allAffixesClumped.filter(conditionKey => matchConditions[conditionKey](text))
        const possibleAffixes = possibleAffixesClumped.map(str => str.split('|')).flat()
        return randomOf(...possibleAffixes)
    }
    const prefixConditions = {
        "Colossus": text => text.includes('Might'),
        "Airwielder": s => s.includes('floats'),
        "Man Slayer": s => s.includes('Person'),
        "Man|Simpleton": s => s.includes('average'),
        "Dragon Slayer|Drakeslayer": s => s.includes('Dragon'),
        "Dead Slayer|Deadstriker": s => s.includes('Undead'),
        "Demon Slayer's": s => s.includes('Demon'),
        "Monster Hunter's": s => s.includes('Monster'),
        "Beast Hunter|Hunter": s => s.includes('Beast'),
        "Magehunter|Faehunter|Fae Slayer": s => s.includes('Fae'),
        "Shapeshifter|Mimic": s => s.includes('transformed into any other weapon'),
        "Cat": text => text.includes('no falling Damage'),
        "Waterway": text => text.includes('swim'),
        "Icestepper": text => text.includes('walk on water'),
        "Dancer": text => text.includes('dodge'),
        "Woundkeeper": text => text.includes("can't be healed"),
        "Aspects|Chameleon": text => text.includes('transformed into any other weapon'),
        "Necromancer|Wraithcaller|Tombstone": text => text.includes('Zombie'),
    }
    const midfixConditions = {
        "Fathom|Depth": s => s.includes('tentacle'),
        "Bloodbound|Fleshbound": s => s.includes('damages you'),
        "Hollow": s => s.includes('hollow'),
        "Withholding": s => s.includes('whenever you unequip it'),
        'Steelplated|Titanforged|Ironclad|Dreadnought|Warborn|Obsidian|Stormforged|Runefused|Ironblood': s => includesAny(s, ['+1 defense', '+2 defense']),
        "Slaying|Slashing|Sharp|Slay": s => s.includes('Slash'),
        "Stinger|Spiked|Serrated|Jagged": s => s.includes('Pierce'),
        "Lumbering": s => s.includes('Smash'),
        "Arcanic|Night's|Night": s => s.includes('Pulse'),
        "Flaming|Scorching|Ember|Ashen|Burning|Searing|Smouldering": s => s.includes('Fire'),
        "Frost|Frozen|Rime|Ice": s => s.includes('Cold'),
        "Static|Lightning": s => s.includes('Shock'),
        "Toxic|Nox|Noxious|Viper's|Viper": s => s.includes('Poison'),
        "Septic": s => s.includes('Acid'),
        "Divine|Holy|Celestian|Reckoning|Retribution": s => s.includes('Divine'),
        "Deathly|Unholy|Eldritch|Death": s => s.includes('Scourge'),
        "Elusive": s => s.includes("can't be targeted"),
        "Realmcutting|Realm": s => s.includes('glitch'),
        "Fearing|Frightening|Dooming|Doom": s => s.includes('Feared'),
        "Blinding|Flaring|Flare": s => s.includes('Blinded'),
        "Weakening|Breathtaking": s => s.includes('Crippled'),
        "Slowing|Slow": s => s.includes('Slowed'),
        "Rooting|Snaring|Unmoving|Root|Grasp": s => s.includes('Rooted'),
        "Unleashing|Ravaging": s => s.includes('Damage you deal by'),
        "Skillful|Skill": s => s.includes('Skill'),
        "Runic|Rune": s => s.includes('Rune'),
        "Stoic|Unmoving": s => s.includes('stuck'),
        "Even-Strike|Rebalanced|Reforged|Man": s => s.includes('average'),
        "Drake": s => s.includes('Dragon'),
        "Demon|Demonic": s => s.includes('Demon'),
        "Beastly": s => s.includes('Beast'),
        "Fae": s => s.includes('Fae'),
        "Fiendsbane|Fiend": s => s.includes('Fiend'),
        "Returning|Homecoming|Lodestone|Galechaser|Echoing": s => s.includes('thrown'),
        "Longshot|Arced|Skystrike|Horizon's|Cloudborne|Veilbreaker's|Arc|Reach": s => s.includes('range'),
        "Necrotic|Mortal|Necro": s => s.includes("can't be healed"),
        "Echoing|Everlasting|Ceaseless|Resonating|Secular|Enduring|Cascading": s => s.includes('deals exactly as much Damage'),
        "Veilpiercer|Ghoststepper|The Unseen|The Piercing|Obscurite|Ghost|Hide": s => s.includes('ignore Cover'),
        "Morphing|Shiftsteel|Formiron|Mercurial|Mimic": s => s.includes('transformed into any other weapon'),
        "Gust|Blasting|Cyclon's|Hurricane|Thundering|Boom": s => s.includes('pushes the target'),
        "Empowered|High-Tide|Apex|Rend|Rending|Unrestrained|Maximal|Max": s => s.includes('Units at full Health'),
        "Slay|Ender's|Ender|Sanguine|Reaper's|End|Reap": s => s.includes('Units below'),
        "Corpsebursting|Necroburst|Cadaver|Corpse": s => s.includes('corpse explodes'),
        "Spellblade|Hex": s => s.includes('your next Spell this turn deals'),
        "Quantic|Savage|Barbarian's": s => s.includes('second attack'),
        "Vampiric|Lifestealer|Lifestealer's": s => s.includes('heal for all the Damage dealt')
    }
    const suffixConditions = {
        "Might|Fortitude": text => text.includes('Might'),
        "Dexterity|Agility": text => text.includes('Dexterity'),
        "Intelligence": text => text.includes('Intelligence'),
        "Sense|Resolve|Will": text => text.includes('Sense'),
        "Charisma": text => text.includes('Charisma'),
        "Immunity": text => text.includes('immune'),
        "Unmoving": text => text.includes('minimum Movement'),
        "Resilience": text => text.includes('being pushed'),
        "Slowfall": text => text.includes('no falling Damage'),
        "Accuracy": text => text.includes('minimum Damage'),
        "Levitation": text => text.includes('levitate'),
        "Vitality|Vigor": text => text.includes('Max Health'),
        "Restoration": text => text.includes('Health Regen'),
        "Speed|the Wind|Swiftness|Haste": text => text.includes('Movement Speed'),
        "Initiative|Quickstep": text => text.includes('Initiative'),
        "Shielding": text => text.includes('Shielding'),
        "Ambushing|Quickness": text => text.includes('Ambushing Initiative'),
        "Bracing": text => text.includes('arrows'),
        "Retaliation": text => text.includes('Whenever you are hit by a monster'),
        "Homesafe|Recalling|the Hearth": text => text.includes('you are instantly teleported'),
        "Mana": text => text.includes('gain 1 Mana'),
        "Phasing": text => text.includes('phase in and out'),
        "Mirage": text => text.includes('you can dodge'),
        "Magic|Arcane|Spell|Evocation|Wrath": text => text.includes('Ability every Turn'),
        "the Ink|Vanishing": text => text.includes('tattoo'),
        "Fluency|Tongues": text => text.includes('fluent'),
        "Booming|the Vault Breaker": text => text.includes('obstacle'),
        "Invisibility|Vanishing": text => text.includes('invisible'),
        "Critting|Lethality|Deathstriking|Murdering|Culling|Bloodletting|Bloodbathing": text => text.includes('on at least one die'),
        "Elusion|Evasion|the Dancer": text => text.includes('dodge'),
        "the Woundkeeper|Baning|Wounding|Pain": text => text.includes("can't be healed"),
        "Aspects|the Chameleon": text => text.includes('transformed into any other weapon'),
        "Tombstones": text => text.includes('Zombie'),
    }

    const itemNameShortened = last(item.Name.split(' '))
    const itemName = itemNameShortened
    const aPrefix = maybeGetAnyKeyordByConditions(item._AllText, prefixConditions, [null])
    const aMidfix = maybeGetAnyKeyordByConditions(item._AllText, midfixConditions, [null])
    const aSuffix = maybeGetAnyKeyordByConditions(item._AllText, suffixConditions, [null])
    const fullNameSoFar = `${aPrefix} ${aMidfix} ${itemName} of ${aSuffix}`

    let finalMid
    let hasAlreadyUsedOf = false

    const affixesWithTypes = [['prefix', aPrefix], ['midfix', aMidfix], ['suffix', aSuffix]]
        .filter(([type, affix]) => affix != null)

    let usedAffixes = []
    if (affixesWithTypes.length <= 2) {
        usedAffixes = affixesWithTypes
    } else if (fullNameSoFar.length < MAX_NAME_LENGTH) {
        usedAffixes = affixesWithTypes
    } else if (affixesWithTypes.length == 3) {
        const shuffledAffixes = shuffle(affixesWithTypes)
        if (percentChance(90)) {
            usedAffixes = shuffledAffixes.slice(0, 2)
        } else {
            usedAffixes = shuffledAffixes.slice(0, 1)
        }
    }

    const prefix = usedAffixes.find(([type, affix]) => type == 'prefix')?.[1]
    const midfix = usedAffixes.find(([type, affix]) => type == 'midfix')?.[1]
    const suffix = usedAffixes.find(([type, affix]) => type == 'suffix')?.[1]

    const prefixWithPossessive =  `${prefix}${prefix?.endsWith("s")? "": "s"}`
    const getMidfixAndItemName = () => midfix.length <= 6 && itemNameShortened.length <= 6? `${midfix}${itemName.toLowerCase()}`: `${midfix} ${itemName}`
    const allCombinations = [
        {
            requires: [prefix],                     // Slayer's Axe
            name: () => `${prefixWithPossessive} ${itemName}`
        },
        {
            requires: [prefix],                     // Axe of the Slayer
            name: () => `${itemName} of the ${prefix}`
        },
        {
            requires: [midfix],                     // Rune Axe
            name: () => `${getMidfixAndItemName()}`
        },
        {
            requires: [suffix],                     // Axe of Mana
            name: () => `${itemName} of ${suffix}`
        },
        {
            requires: [prefix, midfix],             // Slayer's Rune Axe
            name: () => `${prefixWithPossessive} ${getMidfixAndItemName()}`
        },
        {
            requires: [prefix, midfix],             // Rune Axe of the Slayer
            name: () => `${getMidfixAndItemName()} of the ${prefix}`
        },
        {
            requires: [prefix, suffix],             // Slayer's Axe of Mana
            name: () => `${prefix} ${itemName} of ${suffix}`
        },
        {
            requires: [prefix, suffix],             // Axe of Slayer's Mana
            name: () => `${itemName} of ${prefixWithPossessive} ${suffix}`
        },
        {
            requires: [midfix, suffix],             // Rune Axe of Mana
            name: () => `${getMidfixAndItemName()} of ${suffix}`
        },
        {
            requires: [midfix, suffix],             // Axe of Rune Mana
            name: () => `${itemName} of ${midfix} ${suffix.replace('the')}`
        }
    ]

    const possibilities = allCombinations.filter(c => !c.requires.includes(null) && !c.requires.includes(undefined))
    const possibilitiesText = possibilities.map(c => c.name())
    const randomName = randomOf(...possibilitiesText)
    
    return randomName
}


function getBaselineItemByType(xp, itemType) {
    if (itemType.includes('Shield')) {
        return {
            Name: randomOf(...SHIELD_NAMES),
            Price: (xp <= 75? randomInt(10, 30): randomInt(30, 70)) * 10,
            Type: itemType
        }
    }
    if (itemType.includes('Armor')) {
        const name = randomOf(...Object.keys(ARMOR_TO_BODY_PART))
        return {
            Name: name,
            Price: getArmorBasePriceByBodyPart(ARMOR_TO_BODY_PART[name]),
            Type: itemType
        }
    }

    const range = itemType.includes('Ranged')? `3-${randomInt(1, 2) * 5} meters`: '1 meter'
    const templateWeapon = randomOf(...ALL_WEAPONS_ARRAY.filter(wep => wep.type == itemType.replace(' Weapon', '')))

    const weaponNames = [
        templateWeapon.Name,
        ...(templateWeapon.Alternatives != null? templateWeapon.Alternatives.split(', '): []),
        ...(templateWeapon.MagicAlternatives != null? templateWeapon.MagicAlternatives.split(', '): [])
    ]

    return {
        Name: randomOf(...weaponNames),
        A: templateWeapon.A,
        Price: templateWeapon.Price,
        Stat: templateWeapon.Stat,
        Range: range,
        Damage: templateWeapon.Damage,
    }
}

function createItem(xp, itemType) {

    // itemType is always a full type like "One-Handed Ranged Weapon"
    // e.'Item Type' contains any of those tags
    let possibleEffects = MagicItemProperties.Effects
        possibleEffects = possibleEffects.filter(e => e['Item Type'] == 'Any' || includesAll(itemType, e['Item Type'].split(' ')))
        possibleEffects = possibleEffects.map(e => ({...e, Weight: (Math.max(e.XP, 0) + 10)}))

    const baselineItem = getBaselineItemByType(xp, itemType)


    let xpLeft = xp
    let addedEffectsByGroup = {
        'Minor': [],
        'Cursed': [],
        'Stats': [],
        'Passive': [],
        'Property': [],
        'Active': [],
        'Quirk': []
    }

    function maybeAddEffect(possibleEffects, groupName, chance, extraFilterCondition=e=>true) {
        const alreadyHasEffect = e => isString(e)? addedEffectsByGroup[groupName].includes(e): addedEffectsByGroup[groupName].some(addedE => addedE.Effect == e.Effect)
        let availableEffects = possibleEffects.filter(e => e.Group == groupName)
            availableEffects = availableEffects.filter(e => e.XP <= xpLeft)
            availableEffects = availableEffects.filter(e => !alreadyHasEffect(e))
            availableEffects = availableEffects.filter(e => extraFilterCondition(e))
        if (availableEffects.length == 0) {
            return false
        }

        const weights =
            availableEffects[0].Weight == null?
                null
            :availableEffects.map(e => e.Weight)

        if (percentChance(chance)) {
            const randomEffect =
                weights == null?
                    randomOf(...availableEffects)
                :randomOfArrayWeighted(availableEffects, weights)
            if (randomEffect == null) { // Not sure how, but it happens
                return false
            }
            addedEffectsByGroup[groupName].push(randomEffect)
            if (randomEffect.XP != null) {
                xpLeft -= randomEffect.XP
            }
            return true
        }
        return false
    }

    maybeAddEffect(possibleEffects, 'Cursed', 25)
    maybeAddEffect(possibleEffects, 'Minor', 25)
    maybeAddEffect(possibleEffects, 'Property', 15)
    maybeAddEffect(possibleEffects, 'Active', 25)
    maybeAddEffect(possibleEffects, 'Quirk', 25)

    let nFails = 0
    while (xpLeft > 0) {
        let didAddSomething = true

        const addPropertyChance =
            addedEffectsByGroup['Property'].length > 0?
                10
            :25
        
        const didAddProperty = maybeAddEffect(possibleEffects, 'Property', addPropertyChance, e => e.XP > 0)
        if (!didAddProperty) {
            const didAddStats = maybeAddEffect(possibleEffects, 'Stats', 50, e => e.XP > 0)
            if (!didAddStats) {
                const didAddPassive = maybeAddEffect(possibleEffects, 'Passive', 100, e => e.XP > 0)
                if (!didAddPassive) {
                    didAddSomething = false
                }
            }
        }

        if (!didAddSomething) {
            nFails += 1
            if (nFails >= 5) {
                break
            }
        }
    }

    const makeTextForGroup = groupName => 
        addedEffectsByGroup[groupName].length == 0?
            undefined
        :
            addedEffectsByGroup[groupName].map(e => e.Effect).join('\n')
    const textByGroups = {
        'Minor': makeTextForGroup('Minor'),
        'Cursed': makeTextForGroup('Cursed'),
        'Stats': makeTextForGroup('Stats'),
        'Passive': makeTextForGroup('Passive'),
        'Property': makeTextForGroup('Property'),
        'Active': makeTextForGroup('Active'),
        'Quirk': makeTextForGroup('Quirk'),
    }

    /* ---------- Pre-parse effects ---------- */
    /* Replace {This} with {This} so we can parse it later */
    const textByGroupsNotNull = filterObject(textByGroups, ({ key, value }) => value != null)
    const preparsedTextByGroups = mapObject(textByGroupsNotNull, ({key, value}) => ({key, value: parseItemText(value, '{This}')}))

    /* ---------- Naming ---------- */
    baselineItem._AllText = joinObjectValues(preparsedTextByGroups, '\n')
    baselineItem.Name = tryNameItem(baselineItem)

    /* ---------- Reparse ---------- */
    const reparsedTextByGroups = mapObject(preparsedTextByGroups, ({key, value}) => ({key, value: parseItemText(value, baselineItem.Name)}))

    function compileAddedEffectsArrayToText(arr) {
        if (arr == null || arr.length == 0) {
            return null
        }
        const effectsWithParsedEffect = arr.map(e => ({...e, Effect: parseItemText(e.Effect, baselineItem.Name)}))
        const effectsTexts = effectsWithParsedEffect.map(e => e.A == null? e.Effect: `{Hand}${e.A}: ${e.Effect}`)
        const text = effectsTexts.join('\n')
        return text
    }

    function reparseAndAddSuffixAndJoin(arr, suffix) {
        
        return arr
            .map(text => parseItemText(text, baselineItem.Name))
            .map(text => suffix + text)
            .join('\n')
    }

    const color = (col, text) => text == null? null: `{Color('${col}' '${text}')}`
    if (addedEffectsByGroup['Active'].length > 0) {
        console.log('GOT HERE')
    }
    let validEffects
    if (itemType == 'Armor' || itemType == 'Shield') {
        validEffects = [
            color('var(--green-text)', reparsedTextByGroups['Stats']),
            color('var(--green-text)', reparsedTextByGroups['Property']),
            reparsedTextByGroups['Passive'],
            compileAddedEffectsArrayToText(addedEffectsByGroup['Active']),
            color('var(--blue-color)', reparsedTextByGroups['Minor']),
        ]
    } else {
        validEffects = [
            color('var(--green-text)', reparsedTextByGroups['Property']),
            reparsedTextByGroups['Passive'],
            compileAddedEffectsArrayToText(addedEffectsByGroup['Active']),
            color('var(--green-text)', reparsedTextByGroups['Stats']),
            color('var(--blue-color)', reparsedTextByGroups['Minor']),
        ]
    }
    validEffects = validEffects.filter(s => s != null)
    const finalEffect = validEffects.length == 0? null: validEffects.join('\n\n')

    console.log({finalEffect})

    baselineItem.Effect = finalEffect
    baselineItem.Downside = reparsedTextByGroups['Cursed']
    baselineItem.Upgrade = reparsedTextByGroups['Quirk']

    baselineItem.XP = xp
    baselineItem.HasMixins = true
    baselineItem.Price = Math.floor(baselineItem.Price * (1 + xp / 100))
    console.log({baselineItem})
    
    return baselineItem
}

const ARMOR_TO_BODY_PART = {
    'Plate': 'upper body and legs heavy',
    'Breastplate': 'upper body heavy',
    'Scale': 'upper body heavy',
    'Lorica': 'upper body heavy',
    'Mail': 'upper body medium',
    'Hauberk': 'upper body medium',
    'Cuirass': 'upper body medium',
    'Chainmail': 'upper body medium',
    'Gambeson': 'upper body medium',
    'Tabard': 'upper body light',
    'Toga': 'upper body light',

    'Gloves': 'hands heavy',
    'Gauntlets': 'hands heavy',
    'Bracer': 'one hand heavy',
    'Vambrace': 'one hand heavy',
    'Manica': 'one hand heavy',

    'Boots': 'feet',
    'Greaves': 'feet',
    'Calcei': 'feet',
    'Moccasins': 'feet',
    'Oscreae': 'feet',
    'Cuisses': 'feet',
    'Chausses': 'feet',
    'Caligae': 'feet',
    'Sandals': 'feet',

    'Sabatons': 'legs',
    'Tassets': 'legs',
    'Fauld': 'legs',

    'Helmet': 'head heavy',
    'Hat': 'head heavy',
    'Helm': 'head heavy',
    'Sallet': 'head heavy',
    'Bascinet': 'head heavy',
    'Armet': 'head heavy',
    'Morion': 'head heavy',
    'Galea': 'head heavy',
    'Cap': 'head light',
    'Hood': 'head light',
    'Coif': 'head light',
    'Bonnet': 'head light',
    'Capuchon': 'head light',
    'Beret': 'head light',
    'Tricone': 'head light',
    'Chaperon': 'head light',
    'Circlet': 'head light',
    
    'Belt': 'belt',
    'Cingulum': 'belt',
    'Fascia': 'belt',
    'Zoster': 'belt',
    'Ceinture': 'belt',
    'Girdle': 'belt',
    'Sash': 'belt',

    'Ring': 'ring',
    'Band': 'ring',
    

    'Robe': 'upper body and legs light',
    'Robes': 'upper body and legs light',
    'Cassoc': 'upper body and legs light',
    'Alb': 'upper body and legs light',
    'Cowl': 'upper body and legs light',
    'Rainment': 'upper body and legs light',
    'Gown': 'upper body and legs light',
}
function getArmorBasePriceByBodyPart(bodyPart) {
    const heavinessModifier =
        bodyPart.includes('light')?
            1
        :bodyPart.includes('medium')?
            2
        :bodyPart.includes('heavy')?
            3
        :
            2
    const baseBodyPart = bodyPart.replace(' light', '').replace(' medium', '').replace(' heavy', '')
    const bodyPartBasePriceMap = {
        'upper body': 150,
        'legs': 120,
        'upper body and legs': 280,
        'one hand': 50,
        'hands': 100,
        'feet': 170,
        'belt': 80,
        'ring': 150
    }
    const baseBodyPartPrice = bodyPartBasePriceMap[baseBodyPart]
    return baseBodyPartPrice * heavinessModifier
}
const SHIELD_NAMES = [
    'Shield', 'Buckler', 'Kite', 'Barrier', 'Barricade', 'Bulwark', 'Aegis', 'Scutum', 'Aspis', 'Pavise', 'Adarga', 'Dhal', 'Targe', 'Hoplon', 'Rampart', 'Safeguard', 'Protector', 'Redoubt', 'Greatshield', 'Thureos', 'Clipeus', 'Door', 'Gate'
]



export default function MagicItemCreator() {
    function createAnItem() {
        let itemCategory = randomOfArrayWeighted(['Weapon', 'Armor', 'Shield'], [45, 45, 10])
        if (itemCategory == 'Weapon') {
            itemCategory = randomOf('One-Handed', 'Two-Handed') + ' ' + randomOf('Melee', 'Ranged') + ' Weapon'
        }
        return createItem(randomInt(1, 10) * 25, itemCategory)
    }
    const [item, setItem] = useState(createAnItem())

    return <Page>
        <p style={{color: 'white'}}>asdasddasdsa</p>
        <br/>
        <br/>
        <HeroButton onClick={() => setItem(createAnItem())}>Another</HeroButton>
        <br/>
        <TwoColumns>
            <Column><Spell spell={item} hasIcon={false}/></Column>
            <Column></Column>
        </TwoColumns>
    </Page>
}