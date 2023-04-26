import React, { useState } from 'react'

import abilities from '../../databases/Abilities.json'
import spellSchoolDescriptions from '../../databases/Other/SpellSchoolDescriptions.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'
import { SideMenu } from '../../components/SideMenu/SideMenu'



export default function Abilities() {

    const categories = Object.keys(abilities).filter(c => c != 'default')
    const physicalAbilities = ['Default Moves', 'Bloodshed', 'Warfare']
    const nonPhysicalSpells = categories.filter(c => physicalAbilities.includes(c) == false)

    document.title = 'Abilities (Basic)'

    return (
        <div>
            <SideMenu sections={{
                'Physical Abilities': physicalAbilities,
                'Spells': nonPhysicalSpells
            }}/>
            { categories.map(categoryName => (
                <Page title={categoryName} isSecondaryPage={true}>
                    <p>{ spellSchoolDescriptions[categoryName] }</p>
                    <ManySpells spellsObject={abilities[categoryName]}/>
                </Page>
            )) }
        </div>
    )

}