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
import { SelectorsByColumns } from './Abilities'
import { QGTitle1 } from '../Tools/TitleGenerator'


const weaponsSideMenuSections = {
    'Weapons & Runes': [
        'Runes',
        'One-Handed Melee',
        'Two-Handed Melee',
        'One-Handed Ranged',
        'Two-Handed Ranged'
    ]
}

export default function Weapons({ hasNoMargins, onClick, buttonText }) {

    let [selectedCategory, setSelectedCategory] = useState('One-Handed Melee')

    const categories = Object.keys(weapons).filter(name => name != 'default' && name != 'Descriptions')

    const {Descriptions} = weapons

    document.title = 'Weapons'

    return (
        <Page key={selectedCategory} isSecondaryPage={true} hasNoMargins={hasNoMargins}>

            <div className='center-content'>
                <QGTitle1 text={"Weapons"} height={60}/>
            </div>

            <SelectorsByColumns nColumns={1} selectedSelectorName={selectedCategory} setSelectedSelectorName={setSelectedCategory} selectorData={[
                { name: 'One-Handed Melee', src: '/Icons/Items/Hand_Axe.png'},
                { name: 'Two-Handed Melee', src: '/Icons/Items/Ultra_Greatsword.png'},
                { name: 'One-Handed Ranged', src: '/Icons/Items/Handgun.png'},
                { name: 'Two-Handed Ranged', src: '/Icons/Items/Heavy_Crossbow.png'},
                { name: 'Weapon Runes', src: '/Icons/Items/Traditional_Rune.png'},
            ]}/>

            { selectedCategory != null && (
                <div>
                    <PageH1>{selectedCategory}</PageH1>
                    <p>{ Descriptions[selectedCategory] }</p>
                    <ManySpells areItems={true} onSpellClick={onClick} buttonText={buttonText} spells={ U.spellsFromObject(weapons[selectedCategory]) }/>
                </div>
            )}

            {/* <SideMenu sections={weaponsSideMenuSections}/> */}

        </Page>
    )
}