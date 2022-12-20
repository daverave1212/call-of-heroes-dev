import React from 'react'

import { useState } from 'react'
import YAML from 'yaml'

import * as U from '../../utils'

import PageH1 from '../../components/PageH1/PageH1'
import weapons from '../../databases/Weapons.json'
import ManyBoxes from '../../components/Spell/ManyBoxes'
import Page from '../../containers/Page/Page'

export default function Weapons() {

    const categories = Object.keys(weapons).filter(name => name != 'default')

    return (
        <div>

            { categories.map(categoryName => (
                <Page key={categoryName}>
                    <PageH1>{categoryName}</PageH1>
                    <ManyBoxes type='weapon' objects={ U.spellsFromObject(weapons[categoryName]) }/>
                </Page>
            )) }

        </div>
    )
}