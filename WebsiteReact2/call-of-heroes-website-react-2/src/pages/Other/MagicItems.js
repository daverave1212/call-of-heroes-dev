import React from 'react'

import { useState } from 'react'
import YAML from 'yaml'

import * as U from '../../utils'

import PageH1 from '../../components/PageH1/PageH1'
import items from '../../databases/Other/MagicItems.json'
import ManyBoxes from '../../components/Spell/ManyBoxes'
import Page from '../../containers/Page/Page'

export default function MagicItems() {

    const categories = Object.keys(items).filter(name => name != 'default')
    console.log({categories})

    document.title = 'Magic Items'

    return (
        <div>

            { categories.map(categoryName => (
                <Page key={categoryName} isSecondaryPage={true} title={categoryName}>
                    { items[categoryName].Description != null && (
                        <p>{ items[categoryName].Description }</p>
                    ) }
                    <ManyBoxes type='item' objects={ U.spellsFromObject(items[categoryName].Items) }/>
                </Page>
            )) }

        </div>
    )
}