import React from 'react'
import { useState } from 'react'

import * as U from '../../utils'

import armors from '../../databases/Armors.json'

import ManyBoxes from '../../components/Spell/ManyBoxes'
import PageH2 from '../../components/PageH2/PageH2'
import PageH1 from '../../components/PageH1/PageH1'
import Page from '../../containers/Page/Page'
import ManySpells from '../../components/Spell/ManySpells'
import { QGTitle1 } from '../Tools/TitleGenerator'
import { SelectorsByColumns } from './Abilities'




export default function Armors({ hasNoMargins, onClick, buttonText }) {

    let [selectedCategory, setSelectedCategory] = useState('Light')
    
    const armorCategories = Object.keys(armors).filter(key => key != 'default')
    
    const selectorData = armorCategories.map(categoryName => {
        const itemName = U.getOnlyKey(armors[categoryName])
        const src = U.getItemIconPathByName(itemName)
        return {
            name: categoryName,
            src: src
        }
    })

    document.title = 'Armors'

    return (
        <Page key={selectedCategory} isSecondaryPage={true} hasNoMargins={hasNoMargins}>
            <div className='center-content'>
                <QGTitle1 text={"Weapons"} height={60}/>
            </div>

            <SelectorsByColumns nColumns={1} selectedSelectorName={selectedCategory} setSelectedSelectorName={setSelectedCategory} selectorData={selectorData}/>

            { selectedCategory != null && (
                <div>
                    <PageH1>{selectedCategory}</PageH1>
                    <ManySpells areItems={true} onSpellClick={onClick} buttonText={buttonText} spells={ U.spellsFromObject(armors[selectedCategory]) }/>
                </div>
            )}
        </Page>
    )

    return (
        <div>
            {
                armorCategories.map(categoryName => (
                    <Page hasNoMargins={hasNoMargins}>
                        <PageH1>{categoryName}</PageH1>
                        <ManySpells buttonText={buttonText} areItems={true} onSpellClick={onClick} spells={U.spellsFromObject(armors[categoryName])}/>
                    </Page>
                ))
            }
        </div>
    )
}