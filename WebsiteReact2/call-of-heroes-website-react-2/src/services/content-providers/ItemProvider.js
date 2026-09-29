
import BasicMonsters from './../../databases/Other/Monsters.json'
import MagicItems from './../../databases/Items/MagicItems.json'
import { FEATURES, useFeatureItem } from './ContentProvider'
import { maybeNormalizeSpellForEachVariants } from '../../utils'

export function getItemsLocal(name) {
    if (name == 'MagicItems') {
        return MagicItems
    }
}
export function itemsFileExists(name) {
    return true
}