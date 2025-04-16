import React from 'react'
import { useState } from 'react'

import * as U from '../../utils'

import armors from '../../databases/Armors.json'

import ManyBoxes from '../../components/Spell/ManyBoxes'
import PageH2 from '../../components/PageH2/PageH2'
import PageH1 from '../../components/PageH1/PageH1'
import Page from '../../containers/Page/Page'

export default function Armors({ hasNoMargins }) {

    const armorCategories = Object.keys(armors).filter(key => key != 'default')

    console.log({armors})
    
    document.title = 'Armors'

    return (
        <div>
            {
                armorCategories.map(categoryName => (
                    <Page hasNoMargins={hasNoMargins}>
                        <PageH1>{categoryName}</PageH1>
                        <ManyBoxes objects={U.spellsFromObject(armors[categoryName])} type='armor'/>
                    </Page>
                ))
            }
        </div>
    )
}