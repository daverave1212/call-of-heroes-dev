
import BasicMonsters from '../../databases/Other/Monsters.json'
import CoreMonsters from '../../databases/Core/Other/Monsters.json'

import { FEATURES, getFeatureItemAsync } from './ContentProvider'

export async function getCoreMonstersAsync() {
    return await getFeatureItemAsync(FEATURES.Other, 'Monsters')
}




export function getOtherLocal(name) {
    if (name == 'Monsters') {
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