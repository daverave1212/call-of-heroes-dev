import { $SKILLS, capitalizeFirstLetter, getAlternativesAsArray, last, mergeObjectsContainingArrays, parseTextWithSymbols, percentChance, randomInt, randomOf, randomOfArrayWeighted, shuffle, spellsFromObject, stringReplaceAllMany } from "../../utils";
import MagicItemProperties from '../../databases/Other/MagicItemProperties.json'
import Weapons from '../../databases/Weapons.json'
import Armors from '../../databases/Armors.json'
import Item from "../../components/Spell/Item";
import Page from "../../containers/Page/Page";
import TwoColumns from "../../components/TwoColumns/TwoColumns";
import Column from "../../components/TwoColumns/Column";
import { useState } from "react";
import HeroButton from "../../components/HeroButton/HeroButton";
const allWeapons = [
    ...spellsFromObject(Weapons['One-Handed Melee']).map(item => ({...item, type: 'One-Handed Melee'})),
    ...spellsFromObject(Weapons['Two-Handed Melee']).map(item => ({...item, type: 'Two-Handed Melee'})),
    ...spellsFromObject(Weapons['One-Handed Ranged']).map(item => ({...item, type: 'One-Handed Ranged'})),
    ...spellsFromObject(Weapons['Two-Handed Ranged']).map(item => ({...item, type: 'Two-Handed Ranged'}))
]
let MIPSorted


function getRandomSoulboundCurse(armorOrWeapon) {
    const possibilities = MagicItemProperties.Soulbound[capitalizeFirstLetter(armorOrWeapon)]
    const randomPossibility = randomOf(...possibilities)
    return randomPossibility
}
function parseItemText(text, funcToReplaceThisKeyword = () => 'this item') {
    const randomElement = () => randomOf('Slash', 'Pierce', 'Smash', 'Pulse', 'Fire', 'Cold', 'Shock', 'Poison', 'Acid', 'Divine', 'Scourge')
    const preferredElement = randomElement()

    const customSymbols = {
        'This': () => funcToReplaceThisKeyword(),
        'Color': () => randomOf('red', 'crimson-red', 'amber', 'turquoise', 'emerald-green', 'green', 'sapphire-blue', 'blue', 'ethereal-blue', 'orange', 'yellow', 'purple', 'teal', 'black', 'white', 'celsetial silver'),
        'DamageType': () => (percentChance(75)? preferredElement: randomElement()),
        'Soulbound': () => (getRandomSoulboundCurse()),
        'Stat': () => '^' + randomOf('Might', 'Dexterity', 'Intelligence', 'Sense', 'Charisma') + '^',
        'Skill': () => randomOf(...$SKILLS),
        'WeaponType': () => randomOf('1-Handed Melee', '2-Handed Melee', '1-Handed Ranged', '2-Handed Ranged'),
        'CrowdControl': () => '^' + randomOf('Slowed', 'Fumbling', 'Rooted', 'Blinded', 'Crippled', 'Silenced', 'Stunned', 'Feared', 'Dazed') + '^',
        'SpellSchool': () => '^' + randomOf('Bloodshed', 'Warfare', 'Elemental', 'Arcane', 'Mysticism', 'Nature', 'Divine', 'Eldritch') + '^',
        'MonsterType': () => '^' + randomOf('Person', 'Beast', 'Undead', 'Demon', 'Fiend', 'Celestian', 'Giant', 'Fey', 'Monster', 'Insect', 'Elemental', 'Dragon', 'Construct') + '^'
    }

    return parseTextWithSymbols(text, customSymbols)
        .map(str => str.trim())
        .join(' ')
}
window.parseItemText = parseItemText
function tryNameItem(item) {
    const MAX_NAME_LENGTH = 30
    function getAnyTextByKeywordsOrFallback(text, keywords, fallbackArray) {
        const keysRandomized = shuffle(Object.keys(keywords))
        for (const key of keysRandomized) {
            if (text.includes(key)) return randomOf(...keywords[key])
        }
        return randomOf(...fallbackArray)
    }
    const prefixNameByKeyword = {
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
    if (item.IsCursed === true) {
        prefix = getAnyTextByKeywordsOrFallback(item.Downside, prefixNameByKeyword, curseNames)
    }
    const possibleAlternatives = getAlternativesAsArray(item.Alternatives)
    const itemBaseName = percentChance(50) && possibleAlternatives.length > 0? randomOf(...possibleAlternatives): item.Name
    const itemNameShortened = itemBaseName.includes(' ')? last(itemBaseName.split(' ')): item.Name
    const itemName = itemNameShortened.toLowerCase().includes('sword') && percentChance(50)? randomOf('Sword', 'Blade', 'Edge'): itemNameShortened
    const midfix = getAnyTextByKeywordsOrFallback(item.Effect, midfixByKeyword, [null])
    const suffix = getAnyTextByKeywordsOrFallback(item.Effect, suffixByKeyword, [null])

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

function createItem(xp, weaponOrArmor) {
    weaponOrArmor = capitalizeFirstLetter(weaponOrArmor)

    const baselineItem = weaponOrArmor == 'Armor'?
        (percentChance(5)? ({...Armors.Shields.Shield, Name: 'Shield'}): ({ Name: 'Default', Price: 0, Effect: '', })) : 
        randomOf(...allWeapons.filter(wep => wep.Name != 'Punch' && wep.Name != 'Sling'))
    const possiblePowers =
        baselineItem.Name == 'Shield'? MIPSorted.Armor.Shield:
        weaponOrArmor == 'Armor'? MIPSorted.Armor.Any:
        baselineItem.Type == 'One-Handed Melee' || baselineItem.Type == 'One-Handed Ranged'? MIPSorted.Weapon.OneHanded:
        MIPSorted.Weapon.TwoHanded
    const possibleXPs = Object.keys(possiblePowers).map(str => parseInt(str)).sort((a,b) => b - a)
    let availableXPs = possibleXPs.filter(x => x <= xp)
    const possibleQuirks = MIPSorted.Quirk[weaponOrArmor]

    if (percentChance(22)) {
        baselineItem.IsCursed = true
        baselineItem.Downside = getRandomSoulboundCurse(weaponOrArmor)
        xp += 25
    }
    if (percentChance(50) && weaponOrArmor == 'Weapon') {   // Jumble damage
        const otherSimilarWeapons = allWeapons.filter(wep => wep.type == baselineItem.type)
        baselineItem.Damage = randomOf(...otherSimilarWeapons).Damage
    }


    let xpLeft = xp
    let powersSoFar = []
    let nFails = 0
    while (xpLeft > 0) {
        const randomXP = randomOfArrayWeighted(availableXPs, availableXPs)  // XP's have the same weights as their acutal value (e.g. 100 is 4 times more likely than 25)
        const randomPower = randomOf(...possiblePowers[randomXP])
        const isXPInvalid = randomXP > xpLeft || randomXP <= 0
        const isPowerDuplicate = powersSoFar.includes(randomPower)
        if (isXPInvalid || isPowerDuplicate) {
            nFails += 1
            if (nFails >= 10) {
                break
            }
            continue
        }
        nFails = 0
        powersSoFar.push(randomPower)
        xpLeft -= randomXP
        availableXPs = availableXPs.filter(x => x <= xpLeft)
    }

    powersSoFar = powersSoFar.sort((a, b) => possibleXPs.indexOf(b) - possibleXPs.indexOf(a))
    powersSoFar = [ // Put the easy to understand ones at beginning
        ...powersSoFar.filter(str => str.length < 30),
        '',
        ...powersSoFar.filter(str => str.length >= 30 && str.length <= 85),
        '',
        ...powersSoFar.filter(str => str.length > 85)
    ]
    if (powersSoFar[0] == '') {
        powersSoFar.shift()
    }
    if (powersSoFar[powersSoFar.length - 1] == '') {
        powersSoFar.pop()
    }
    const powerTextUnparsed = powersSoFar.join('\n')
    const powerText = parseItemText(powerTextUnparsed)

    // Order is important
    baselineItem.Type = weaponOrArmor
    baselineItem.HasMixins = true
    baselineItem.Effect = powerText
    baselineItem.XP = xp
    baselineItem.Price = weaponOrArmor == 'Armor'? xp * randomInt(7, 10): (Math.round(Math.floor((baselineItem.Price * (1 + xp / 80))), 5) * 5)
    if (baselineItem.Name == 'Default' && weaponOrArmor == 'Armor') {
        baselineItem.Name = randomOf('Plate', 'Robes', 'Cuirass', 'Chainmail', 'Gloves', 'Boots', 'Helmet', 'Hat', 'Belt', 'Ring', 'Bracer')
    }
    baselineItem.Notes = null
    baselineItem.EffectGreen = null

    baselineItem.Name = tryNameItem(baselineItem)
    baselineItem.Alternatives = null
    if (baselineItem.IsCursed) {
        baselineItem.Downside = parseItemText(baselineItem.Downside, () => baselineItem.Name)
    }
    if (percentChance(25)) {
        baselineItem.Upgrade = parseItemText(randomOf(...possibleQuirks), () => baselineItem.Name)
    }
    
    return baselineItem
}


export default function MagicItemCreator() {
    MIPSorted = {
        Armor: {
            Any: MagicItemProperties.Armor.Any,
            Shield: mergeObjectsContainingArrays(MagicItemProperties.Armor.Any, MagicItemProperties.Armor.Shield)
        },
        Weapon: {
            OneHanded: mergeObjectsContainingArrays(MagicItemProperties.Weapon.Any, MagicItemProperties.Weapon.OneHanded),
            TwoHanded: mergeObjectsContainingArrays(MagicItemProperties.Weapon.Any, MagicItemProperties.Weapon.TwoHanded)
        },
        Quirk: {
            Weapon: [...MagicItemProperties.Quirk.Any, ...MagicItemProperties.Quirk.Weapon],
            Armor: [...MagicItemProperties.Quirk.Any, ...MagicItemProperties.Quirk.Armor]
        }
    }

    function createAnItem() {
        return createItem(randomInt(3, 10) * 25, randomOf('Weapon', 'Armor'))
    }
    const [item, setItem] = useState(createAnItem())

    return <Page>
        <br/>
        <br/>
        <HeroButton onClick={() => setItem(createAnItem())}>Another</HeroButton>
        <br/>
        <TwoColumns>
            <Column><Item item={item} hasIcon={false}/></Column>
            <Column></Column>
        </TwoColumns>
    </Page>
}