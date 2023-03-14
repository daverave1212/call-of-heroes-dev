import React, { useState } from 'react'

import languages from '../../databases/Other/Languages.json'
import spellSchoolDescriptions from '../../databases/Other/SpellSchoolDescriptions.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'
import PageH3 from '../../components/PageH3/PageH3'



export default function Languages() {

    const sectionNames = Object.keys(languages)

    return (
        <Page title="Languages">
            { sectionNames.map(name => (
                <div>
                    <PageH3>{name}</PageH3>
                    <p>{languages[name]}</p>
                </div>
            ))}
        </Page>
    )

}