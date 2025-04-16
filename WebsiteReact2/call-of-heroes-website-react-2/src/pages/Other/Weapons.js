import React from 'react'

import { useState } from 'react'
import YAML from 'yaml'

import * as U from '../../utils'

import PageH1 from '../../components/PageH1/PageH1'
import weapons from '../../databases/Weapons.json'
import ManyBoxes from '../../components/Spell/ManyBoxes'
import Page from '../../containers/Page/Page'
import { SideMenu } from '../../components/SideMenu/SideMenu'
import ManySpells from '../../components/Spell/ManySpells'


const weaponsSideMenuSections = {
    'Weapons & Runes': [
        'Runes',
        'One-Handed Melee',
        'Two-Handed Melee',
        'One-Handed Ranged',
        'Two-Handed Ranged'
    ]
}

export default function Weapons({ hasNoMargins }) {

    const categories = Object.keys(weapons).filter(name => name != 'default' && name != 'Descriptions')

    const {Descriptions} = weapons

    document.title = 'Weapons'

    return (
        <div>

            <SideMenu sections={weaponsSideMenuSections}/>

            { categories.map(categoryName => (
                <Page key={categoryName} isSecondaryPage={true} hasNoMargins={hasNoMargins}>
                    <PageH1>{categoryName}</PageH1>
                    <p>{ Descriptions[categoryName] }</p>
                    {/* <ManySpells spells={ U.spellsFromObject(weapons[categoryName]) }/> */}
                    <ManyBoxes type='weapon' objects={ U.spellsFromObject(weapons[categoryName]) }/>
                </Page>
            )) }

        </div>
    )
}