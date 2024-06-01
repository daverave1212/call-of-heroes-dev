import React from 'react'

import { useState } from 'react'
import YAML from 'yaml'

import * as U from '../../utils'

import PageH1 from '../../components/PageH1/PageH1'
import weapons from '../../databases/Weapons.json'
import ManyBoxes from '../../components/Spell/ManyBoxes'
import Page from '../../containers/Page/Page'
import { SideMenu } from '../../components/SideMenu/SideMenu'


const weaponsSideMenuSections = {
    'Weapons & Shields': [
        'Shields',
        'Runes',
        '1-Handed Melee',
        '2-Handed Melee',
        '1-Handed Ranged',
        '2-Handed Ranged'
    ]
}

export default function Weapons() {

    const categories = Object.keys(weapons).filter(name => name != 'default' && name != 'Descriptions')

    const {Descriptions} = weapons

    document.title = 'Weapons'

    return (
        <div>

            <SideMenu sections={weaponsSideMenuSections}/>

            { categories.map(categoryName => (
                <Page key={categoryName} isSecondaryPage={true}>
                    <PageH1>{categoryName}</PageH1>
                    <p>{ Descriptions[categoryName] }</p>
                    <ManyBoxes type='weapon' objects={ U.spellsFromObject(weapons[categoryName]) }/>
                </Page>
            )) }

        </div>
    )
}