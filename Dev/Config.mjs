
export let designRootPath = "..\\Design\\"
export let websiteRootPath = "..\\Website\\"

/*
 *      For each type, there is a specific mapping and way to be parsed.
 */

export let files = {
    'Classes\\Cleric.yml': 'class',
    'Classes\\Druid.yml': 'class',
    'Classes\\Hunter.yml': 'class',
    'Classes\\Mage.yml': 'class',
    'Classes\\Paladin.yml': 'class',
    'Classes\\Rogue.yml': 'class',
    'Classes\\Shaman.yml': 'class',
    'Classes\\Warlock.yml': 'class',
    'Classes\\Warrior.yml': 'class',

    'Races\\Bertle.yml': 'race',
    'Races\\Dragonborn.yml': 'race',
    'Races\\Dwarf.yml': 'race',
    'Races\\Elf.yml': 'race',
    'Races\\Gnome.yml': 'race',
    'Races\\Hollow.yml': 'race',
    'Races\\Human.yml': 'race',
    'Races\\Orc.yml': 'race',

    'Weapons.yml': 'weapons',
    'Armors.yml': 'armors',
    'Prices.yml': 'shop'
}
