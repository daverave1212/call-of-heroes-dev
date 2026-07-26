import Bertle from '../../databases/Races/Bertle.json'
import Dwarf from '../../databases/Races/Dwarf.json'
import Elf from '../../databases/Races/Elf.json'
import Gnome from '../../databases/Races/Gnome.json'
import Human from '../../databases/Races/Human.json'

import Dragonborn from '../../databases/Core/Races/Dragonborn.json'
import Hollow from '../../databases/Core/Races/Hollow.json'
import Orc from '../../databases/Core/Races/Orc.json'

// import Cleric from '../../databases/Classes/Cleric.json'
// import Druid from '../../databases/Classes/Druid.json'
// import Hunter from '../../databases/Classes/Hunter.json'
// import Mage from '../../databases/Classes/Mage.json'
// import Paladin from '../../databases/Classes/Paladin.json'
// import Rogue from '../../databases/Classes/Rogue.json'
// import Shaman from '../../databases/Classes/Shaman.json'
// import Warlock from '../../databases/Classes/Warlock.json'
// import Warrior from '../../databases/Classes/Warrior.json'

import Cleric from '../../databases/ClassesV2/Priest.json'
import Druid from '../../databases/ClassesV2/Druid.json'
import Hunter from '../../databases/ClassesV2/Hunter.json'
import Rogue from '../../databases/ClassesV2/Rogue.json'
import Shaman from '../../databases/ClassesV2/Shaman.json'
import Sorcerer from '../../databases/Core/Classes/Sorcerer.json'
import Warlock from '../../databases/ClassesV2/Warlock.json'
import Warrior from '../../databases/ClassesV2/Warrior.json'
import Wizard from '../../databases/ClassesV2/Wizard.json'
import Artificer from '../../databases/Core/Classes/Artificer.json'
import Berserker from '../../databases/ClassesV2/Berserker.json'
import Knight from '../../databases/Core/Classes/Knight.json'
import Mystic from '../../databases/ClassesV2/Mystic.json'
import Paladin from '../../databases/ClassesV2/Paladin.json'
import Soulwright from '../../databases/ClassesV2/Soulwright.json'
import Outlaw from '../../databases/Core/Classes/Swashbuckler.json'
import Wickan from '../../databases/ClassesV2/Wickan.json'
import Cursewielder from '../../databases/ClassesV2/Cursewielder.json'

export const RacesBase = {
    Bertle,
    Dwarf,
    Elf,
    Gnome,
    Human,
}
export const RacesPremium = {
    Dragon: Dragonborn,
    Hollow,
    Giant: Orc,
}
export const Races = {
    ...RacesBase,
    ...RacesPremium
}

export const ClassesBase = {
    Cleric,
    Druid,
    Hunter,
    Rogue,
    Warlock,
    Warrior,
    Wizard,
}
export const ClassesPremium = {
    Artificer,
    Knight,
    Sorcerer,
    Outlaw,
}
export const ClassesLegacy = {
}

export const Classes = {
    ...ClassesBase,
    ...ClassesPremium,
    ...ClassesLegacy
}