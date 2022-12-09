import React, { useState } from 'react'

import abilities from '../../databases/Abilities.json'
import spellSchoolDescriptions from '../../databases/Other/SpellSchoolDescriptions.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'



export default function Abilities() {

    const categories = Object.keys(abilities).filter(c => c != 'default')

    return (
        <div>
            { categories.map(categoryName => (
                <Page title={categoryName}>
                    <p>{ spellSchoolDescriptions[categoryName] }</p>
                    <ManySpells spellsObject={abilities[categoryName]}/>
                </Page>
            )) }
        </div>
    )

}