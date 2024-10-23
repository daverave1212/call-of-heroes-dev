import { $SKILLS, parseTextWithSymbols, randomOf } from "../../utils";
import MagicItemProperties from '../../databases/Other/MagicItemProperties.json'

const condition = () => randomOf(
    'old-fashioned',
    'masterwork',
    'pristine',
)
const colorModifier = () => randomOf('deep', 'bright', 'faded', 'scintilating', 'silvery')
const color = () => randomOf(
    'rouge', 'blood red', 'crimson', 'scarlet', 'violet', 'lilac', 'mauve', 'amber', 'coral',
    'midnight blue', 'sapphire',
    'emerald', 'jade',
    'sepia', 'cedar',
    'obsidian', 'charcoal',
    'ivory'
)
const solidMaterial = () => randomOf(
    'moonstone',
    'sunstone',
    'primsatic glass',
    'silver',
    'gold',
    'wood',
    'titanium',
    'platinum',
    'gemstone'
)
const textile = () => randomOf(
    'silk'
)

const magicProperty = () => randomOf(
    'glows faintly in the dark',
    'has a surface that reflects light',
    'leaves behind a trail or shimmering stardust that fades after a few seconds',
    'perpetually hums quietly',
    `shifts its color between shades of ${color()} and ${colorModifier()} ${color()}`
)
const textileDescription = () => randomOf(
    `etched with flame-like patterns of ${colorModifier()} ${color()}`,
    `lined with ${color()} ${textile()}`
)




const customSymbols = {
    'This': () => (<span>This item</span>),
    'DamageType': () => (<span>{randomOf('Slash', 'Pierce', 'Smash', 'Pulse', 'Fire', 'Cold', 'Shock', 'Poison', 'Acid', 'Divine', 'Scourge')}</span>),
    'Soulbound': () => (<span>{getRandomSoulboundCurse()}</span>),
    'Stat': () => <span>{randomOf('Might', 'Dexterity', 'Intelligence', 'Sense', 'Charisma')}</span>,
    'Skill': () => <span>{randomOf(...$SKILLS)}</span>,
    'WeaponType': <span>{randomOf('1-Handed Melee', '2-Handed Melee', '1-Handed Ranged', '2-Handed Ranged')}</span>,
    'CrowdControl': <span>{randomOf('Slowed', 'Fumbling', 'Rooted', 'Blinded', 'Crippled', 'Silenced', 'Stunned', 'Feared', 'Dazed')}</span>,
    'SpellSchool': <span>{randomOf('Bloodshed', 'Warfare', 'Elemental', 'Arcane', 'Mysticism', 'Nature', 'Divine', 'Eldritch')}</span>
}

function getRandomSoulboundCurse(armorOrWeapon) {
    const possibilities = MagicItemProperties.Soulbound[armorOrWeapon]
    const randomPossibility = randomOf(...possibilities)
    const parsedText = parseTextWithSymbols(randomPossibility, customSymbols)
    return parsedText
}


export default function MagicItemCreator() {
    const unparsedArmorByXP = {...MagicItemProperties.Armor.Any}
}