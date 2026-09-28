
import BasicMonsters from './../../databases/Other/Monsters.json'

export function getOtherLocal(name) {
    if (name == 'Monsters') {
        console.log({BasicMonsters})
        return BasicMonsters
    }
}

export function otherExists(name) {
    return true
}

window.getOtherLocal = getOtherLocal