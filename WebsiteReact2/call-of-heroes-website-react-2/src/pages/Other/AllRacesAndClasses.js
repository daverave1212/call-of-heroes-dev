import Bertle from '../../databases/Races/Bertle.json'
import Dwarf from '../../databases/Races/Dwarf.json'
import Dragonborn from '../../databases/Races/Dragonborn.json'
import Elf from '../../databases/Races/Elf.json'
import Gnome from '../../databases/Races/Gnome.json'
import Hollow from '../../databases/Races/Hollow.json'
import Human from '../../databases/Races/Human.json'
import Orc from '../../databases/Races/Orc.json'

// import Cleric from '../../databases/Classes/Cleric.json'
// import Druid from '../../databases/Classes/Druid.json'
// import Hunter from '../../databases/Classes/Hunter.json'
import Mage from '../../databases/Classes/Mage.json'
// import Paladin from '../../databases/Classes/Paladin.json'
// import Rogue from '../../databases/Classes/Rogue.json'
// import Shaman from '../../databases/Classes/Shaman.json'
// import Warlock from '../../databases/Classes/Warlock.json'
// import Warrior from '../../databases/Classes/Warrior.json'

import Cleric from '../../databases/ClassesV2/Priest.json'
import Druid from '../../databases/ClassesV2/Priest.json'
import Hunter from '../../databases/ClassesV2/Priest.json'
import Rogue from '../../databases/ClassesV2/Priest.json'
import Shaman from '../../databases/ClassesV2/Priest.json'
import Sorcerer from '../../databases/ClassesV2/Priest.json'
import Warlock from '../../databases/ClassesV2/Priest.json'
import Warrior from '../../databases/ClassesV2/Priest.json'
import Wizard from '../../databases/ClassesV2/Priest.json'
import Artificer from '../../databases/ClassesV2/Artificer.json'
import Berserker from '../../databases/ClassesV2/Berserker.json'
import Knight from '../../databases/ClassesV2/Knight.json'
import Mystic from '../../databases/ClassesV2/Mystic.json'
import Paladin from '../../databases/ClassesV2/Paladin.json'
import Soulwright from '../../databases/ClassesV2/Soulwright.json'
import Swashbuckler from '../../databases/ClassesV2/Swashbuckler.json'
import Wickan from '../../databases/ClassesV2/Wickan.json'
import Cursewielder from '../../databases/ClassesV2/Cursewielder.json'

export const Races = {
    Bertle,
    Dwarf,
    Dragon: Dragonborn,
    Elf,
    Gnome,
    Hollow,
    Human,
    Giant: Orc
}
export const Classes = {
    Cleric,
    Druid,
    Hunter,
    Rogue,
    Shaman,
    Sorcerer,
    Warlock,
    Warrior,
    Wizard,

    Mage,   // For fixing old classes

    Artificer,
    Knight,
}

export const ClassesBase = {
    Cleric,
    Druid,
    Hunter,
    Rogue,
    Shaman,
    Sorcerer,
    Warlock,
    Warrior,
    Wizard,
}
export const ClassesPremium = {
    Artificer,
    Knight,
}
export const ClassesLegacy = {
    Mage
}