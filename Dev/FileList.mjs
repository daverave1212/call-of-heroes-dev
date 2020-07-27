
/*
 *      This module defines all files that will be parsed and their types.
 *      For each type, there is a specific mapping and way to be parsed.
 */

let fileTypes = ['race', 'class']

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
    'Races\\Elf.yml': 'race',
    'Races\\Gnome.yml': 'race',
    'Races\\Hollow.yml': 'race',
    'Races\\Human.yml': 'race',
    'Races\\Orc.yml': 'race',

    'Weapons.yml': 'weapons',
    'Armors.yml': 'armors'
}

export let outputFileStructure = {
    'class':    '',     // 'website-path' + '' + '\Cleric.html'
    'race':     '',
    'weapons':  '',
    'armors':   ''
}