import { $SKILLS, capitalizeFirstLetter, filterObject, getAlternativesAsArray, includesAll, joinObjectValues, last, mapObject, mergeObjectsContainingArrays, onlyUniqueFilter, parseTextWithSymbols, percentChance, randomInt, randomOf, randomOfArrayWeighted, shuffle, spellsFromObject, stringReplaceAllMany } from "../../utils";
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
    const prefixNameByKeyword = {
        'tentacle': ['Fathom', "Depth's"],
        'damages you instead': ['Bound', 'Fleshbound'],
        'Hollow': ['Hollowing'],
        'whenever you unequip it': ['Withholding'],
        '+1 Defense': ['Steelplated', 'Titanforged', 'Ironclad', 'Dreadnought', 'Warborn', 'Obsidian', 'Stormforged', 'Runefused', 'Ironblood'],
        'floats': ["Airwielder's"]
    }
    const curseNames = ['Ruined', 'Cursed', 'Blighted', 'Damned', 'Accursed', 'Vile', 'Afflicted', 'Burdened']
    const midfixByKeyword = {
        'Slash': ['Slaying', 'Slashing', 'Sharp', 'Slay'],
        'Pierce': ['Stinger', 'Spiked', 'Serrated', 'Jagged'],
        'Smash': ['Lumbering'],
        'Pulse': ['Arcanic', 'Night\'s', 'Night'],
        'Fire': ['Flaming', 'Scorching', 'Ember', 'Ashen', 'Burning', 'Searing', 'Smouldering'],
        'Cold': ['Frost', 'Frozen', 'Rime', 'Ice'],
        'Shock': ['Static', 'Lightning'],
        'Poison': ['Toxic', 'Nox', 'Noxious', "Viper's", 'Viper'],
        'Acid': ['Septic'],
        'Divine': ['Divine', 'Holy', 'Celestian', 'Reckoning', 'Retribution'],
        'Scourge': ['Deathly', 'Unholy', 'Eldritch', 'Death'],
        "can't be targeted": ['Elusive'],
        'glitch': ['Realmcutting', 'Realm'],
        'Feared': ['Fearing', 'Frightening', 'Dooming', 'Doom'],
        'Blinded': ['Blinding', 'Flaring', 'Flare'],
        'Crippled': ['Weakening', 'Breathtaking'],
        'Slowed': ['Slowing', 'Slow'],
        'Rooted': ['Rooting', 'Snaring', 'Unmoving', 'Root', 'Grasp'],
        'Damage you deal by': ['Unleashing', 'Ravaging'],
        'Skill': ['Skillful', 'Skill'],
        'Rune': ['Runic', 'Rune'],
        'stuck': ['Stoic', 'Unmoving'],
        'average': ["Man's", 'Even-Strike', 'Rebalanced', 'Reforged', 'Man'],
        'Person': ["Man Slayer's"],
        'Dragon': ["Dragon Slayer's", 'Drake'],
        'Undead': ["Dead Slayer's", "Deadstriker's"],
        "Demon": ["Demon Slayer's", 'Demon'],
        "Monster": ["Monster Hunter's"],
        "Beast": ["Beast Hunter's", "Hunter's", 'Beast'],
        "Fae": ["Magehunter's", "Faehunter's", "Fae Slayer's", 'Fae'],
        'Fiend': ['Fiendsbane', 'Fiend'],
        'thrown': ['Returning', 'Homecoming', 'Lodestone', 'Galechaser', 'Echoing'],
        'range': ["Reach's", "Longshot", "Arced", "Skystrike", "Horizon's", "Cloudborne", "Veilbreaker's", 'Arc', 'Reach'],
        "can't be healed": ['Necrotic', 'Mortal', 'Necro'],
        "deals exactly as much Damage": ['Echoing', "Everlasting", "Ceaseless", "Resonating", "Secular", "Enduring", "Cascading"],
        'ignore Cover': ['Veilpiercer', "Ghoststepper", "The Unseen", "The Piercing", "Obscurite", 'Ghost', 'Hide'],
        'transformed into any other weapon': ["Shapeshifter's", "Mimic's", "Morphing", "Shiftsteel", "Formiron", "Mercurial", 'Mimic'],
        'pushes the target': ['Gust', 'Blasting', "Cyclon's", 'Hurricane', 'Thundering', 'Boom'],
        'Units at full Health': ['Empowered', "High-Tide", "Apex", "Rend", "Rending", "Unrestrained", "Maximal", 'Max'],
        'Units below': ["Slayer's", "Slay", "Ender's", "Ender", "Sanguine", "Reaper's", 'End', 'Reap'],
        'corpse explodes': ['Corpsebursting', 'Necroburst', 'Cadaver', 'Corpse'],
        'your next Spell this turn deals': ['Spellblade', 'Hex'],
        'second attack': ['Quantic', 'Savage', "Barbarian's"],
        'heal for all the Damage dealt': ['Vampiric', "Lifestealer", "Lifestealer's"]
    }
    const suffixByKeyword = {
        'Might': ['Might', 'the Colossus', 'Fortitude'],
        'Dexterity': ['Dexterity', 'Agility'],
        'Intelligence': ['Intelligence'],
        'Sense': ['Sense', 'Resolve', 'Will'],
        'Charisma': ['Charisma'],
        'immune': ['Immunity'],
        'minimum Movement': ['Unmoving'],
        'being pushed': ['Resilience'],
        'no falling Damage': ['the Cat', 'Slowfall'],
        'swim': ['the Waterway'],
        'walk on water': ['the Icestepper'],
        'minimum Damage': ['Accuracy'],
        'levitate': ['Levitation'],
        'Max Health': ['Vitality', 'Vigor'],
        'Health Regen': ['Restoration'],
        'Movement Speed': ['Speed', 'the Wind', 'Swiftness', 'Haste'],
        'Initiative': ['Initiative', 'Quickstep'],
        'Shielding': ['Shielding'],
        'Ambushing Initiative': ['Ambushing', 'Quickness'],
        'arrows': ['Bracing'],
        'Whenever you are hit by a monster': ['Retaliation'],
        'you are instantly teleported': ['Homesafe', 'Recalling', 'the Hearth'],
        'gain 1 Mana': ['Mana'],
        'phase in and out': ['Phasing'],
        'you can dodge': ['Mirage'],
        'Ability every Turn': ['Magic', 'Arcane', 'Spell', 'Evocation', 'Wrath'],
        'dodge': ['Elusion', 'Evasion', 'the Dancer'],
        'tattoo': ['the Ink', 'Vanishing'],
        'fluent': ['Fluency', 'Tongues'],
        'obstacle': ['Booming', 'the Vault Breaker'],
        'invisible': ['Invisibility', 'Vanishing'],
        "can't be healed": ['the Woundkeeper', "Baning", "Wounding", "Pain"],
        'transformed into any other weapon': ["Aspects", 'the Chameleon'],
        "on at least one die": ['Critting', 'Lethality', 'Deathstriking', 'Murdering', 'Culling', 'Bloodletting', 'Bloodbathing'],
        'Zombie': ['the Necromancer', 'the Wraithcaller', 'Tombstones']
    }

    let prefix = null
    if (item.Downside != null) {
        prefix = getAnyTextByKeywordsOrFallback(item.Downside, prefixNameByKeyword, curseNames)
    }

    const itemNameShortened = last(item.Name.split(' '))
    const itemName = itemNameShortened.toLowerCase().includes('sword') && percentChance(50)? randomOf('Sword', 'Blade', 'Edge'): itemNameShortened
    const midfix = getAnyTextByKeywordsOrFallback(item._AllText, midfixByKeyword, [null])
    const suffix = getAnyTextByKeywordsOrFallback(item._AllText, suffixByKeyword, [null])

    let finalMid
    let hasAlreadyUsedOf = false
    if (midfix == null) {
        finalMid = itemName
    } else if (percentChance(50)) {
        if (midfix.length <= 5 && midfix.includes("'" == false)) {
            finalMid = midfix + itemName.toLowerCase()
        } else {
            finalMid = midfix + ' ' + itemName
        }
    } else {
        if (suffix != null && suffix.includes('the')) {
            finalMid = itemName + ' of the ' + midfix
        } else {
            finalMid = itemName + ' of ' + midfix
        }
        hasAlreadyUsedOf = true
    }

    let finalSuffix
    if (suffix == null) {
        finalSuffix = ''
    } else if (hasAlreadyUsedOf) {
        if (suffix.includes('the')) {
            finalSuffix = ' ' + suffix.split('the ').join('')
        } else {
            finalSuffix = ' ' + suffix
        }
    } else {
        finalSuffix = ' of ' + suffix
    }


    const finalPrefix = prefix != null && (prefix + finalMid + finalSuffix).length < MAX_NAME_LENGTH ? prefix + ' ': ''

    let nameSoFar = finalPrefix + finalMid + finalSuffix
    
    return nameSoFar
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
    console.log({weaponNames, ALL_WEAPONS_ARRAY, itemType})

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
        possibleEffects = possibleEffects.map(e => ({...e, Weight: (e.XP + 10)}))

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
            console.log({randomEffect, availableEffects, weights, randomPick: randomOfArrayWeighted(availableEffects, weights)})
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

    maybeAddEffect(possibleEffects, 'Minor', 25)
    maybeAddEffect(possibleEffects, 'Cursed', 25)
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

    const color = (col, text) => text == null? null: `{Color('${col}' '${text}')}`
    let validEffects
    if (itemType == 'Armor' || itemType == 'Shield') {
        validEffects = [
            color('var(--green-text)', reparsedTextByGroups['Stats']),
            color('var(--green-text)', reparsedTextByGroups['Property']),
            reparsedTextByGroups['Passive'],
            reparsedTextByGroups['Active'],
            color('var(--blue-color)', reparsedTextByGroups['Minor']),
        ]
    } else {
        validEffects = [
            color('var(--green-text)', reparsedTextByGroups['Property']),
            reparsedTextByGroups['Passive'],
            reparsedTextByGroups['Active'],
            color('var(--green-text)', reparsedTextByGroups['Stats']),
            color('var(--blue-color)', reparsedTextByGroups['Minor']),
        ]
    }
    validEffects = validEffects.filter(text => text != null)
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
        return createItem(randomInt(3, 10) * 25, itemCategory)
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