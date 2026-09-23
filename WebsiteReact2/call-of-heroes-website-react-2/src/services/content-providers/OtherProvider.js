
import BasicMonsters from './../../databases/Other/Monsters.json'

export function getOtherLocal(name) {
    if (name == 'Monsters') {
        console.log({BasicMonsters})
        return BasicMonsters
    }
}





// export function getAllClassNames() {
//     return OverallData.Classes
// }
// export function getClassLocal(name) {
//     return Classes[name]
// }
// export function classExists(name) {
//     return OverallData.Classes.includes(name)
// }
// export async function getClassAsync(name) {
//     return await getFeatureItemAsync(FEATURES.Classes, name)
// }

window.getOtherLocal = getOtherLocal