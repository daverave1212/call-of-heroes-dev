import React from 'react'

import { useState } from 'react'
import YAML from 'yaml'

import * as U from '../../utils'

import PageH1 from '../../components/PageH1/PageH1'
import items from '../../databases/Items/MagicItems.json'
import ManyBoxes from '../../components/Spell/ManyBoxes'
import Page from '../../containers/Page/Page'
import ManySpells from '../../components/Spell/ManySpells'
import { getMagicItemCategories, useAllMagicItemsByName } from '../../services/content-providers/ItemProvider'
import { FEATURES, getFeatureItemLocal, useFeatureItem } from '../../services/content-providers/ContentProvider'
import { QGTitle1 } from '../Tools/TitleGenerator'
import PageH2 from '../../components/PageH2/PageH2'
import { useDoIOwnSet } from '../../services/auth/Auth'
import Loading, { LoadingCenter } from '../../components/Loading/Loading'
import SetRequiredBanner from '../../components/SetRequiredBanner/SetRequiredBanner'

export default function MagicItems() {

    const [magicItems, isLoading] = useFeatureItem(FEATURES.Items, 'MagicItems')
    const [iOwnSet, authIsLoading] = useDoIOwnSet(U.SET_IDS.Core)
    const magicItemsArray = Object.values(magicItems)
    let categoriesWithDescriptions = {
        "Common": "These are simple utility magic that don't usually have much impact on the game.\nAll of these items can be sold to a merchant for 50% of the standard price. Common items, despite the name, are still in limited and rather random supply, so you may not find everything you need at a common magic shop.\n",
        "Uncommon": "These are magic items usually not found in duplicates, except for consumables. They are in limited supply in shops.\nRemember that items always take an Action Point to use, and a Potion consumer risks an Overdose if 2 Potions are consumed within 1 hour. Special ammo does not need a 1 Action Point to be loaded - a Player can simply state that they are using that ammo for an attack.\nAll of these items can be sold to a merchant for 50% of the standard price.\n",
        "Rare": "Rare items are shiny objects and expensive baubles that any Adventurere would love to put their hands on! Rare items are not often found through shops, and you're more likely to find them as loot in dungeons and monster lairs.\nAll of these items can be sold to a merchant for 50% of the standard price.\n",
        "Epic": "These advnced magic items are almost never found in shop, and often exist in unique pieces throughout a hero's adventure. Mythical as they are, only the more skilled Adventurers have the required power to find and wield Epic items.\nAll of these items can be sold to a merchant for 50% of the standard price.\n",
    }

    document.title = 'Magic Items'

    if (authIsLoading) {
        return <Page>
            <LoadingCenter/>
        </Page>
    }

    return (
        <div>
            { Object.entries(categoriesWithDescriptions).map(([categoryName, description]) => {
                const magicItemsHere = magicItemsArray.filter(item => item?.Tags?.toString()?.includes(categoryName))
                
                return <Page key={categoryName} isSecondaryPage={true}>
                    <PageH2>{categoryName}</PageH2>
                    <p>{ description }</p>
                    { magicItemsHere.length == 0? <SetRequiredBanner setName={U.SETS_NAMES.Core}/>: <ManySpells areItems={true} spells={ magicItemsHere }/> }
                </Page>
            }) }
            
        </div>
    )
}