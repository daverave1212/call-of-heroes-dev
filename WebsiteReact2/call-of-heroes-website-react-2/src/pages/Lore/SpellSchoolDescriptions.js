import React, { useState } from 'react'

import spellSchoolDescriptions from '../../databases/Other/SpellSchoolDescriptions.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'
import PageH3 from '../../components/PageH3/PageH3'



export default function AttackModifiers() {

    const sectionNames = Object.keys(spellSchoolDescriptions)

    return (
        <Page title="Spell Schools">
            { sectionNames.map(name => (
                <div>
                    <PageH3>{name}</PageH3>
                    <p>{spellSchoolDescriptions[name]}</p>
                </div>
            ))}
        </Page>
    )

}