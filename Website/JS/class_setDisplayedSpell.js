// This script is inserted into class pages and displays spells from
// the spell list when hovered

import Abilities from './Databases/Abilities.mjs'
import { spell } from './Insertables/Components.mjs'

console.log(Abilities)

window.setDisplayedSpell = function(spellName) {
    console.log({spellName})
    let spellObject = Abilities[spellName]
    spellObject.name = spellName
    console.log(spellObject)
    let spellHTML = spell(spellObject)
    document.getElementById('Class-Spell-Display').innerHTML = spellHTML
}