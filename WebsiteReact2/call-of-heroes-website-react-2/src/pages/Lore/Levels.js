import React, { useState } from 'react'

import levels from '../../databases/Other/Levels.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'
import PageH3 from '../../components/PageH3/PageH3'



export default function AttackModifiers() {

    const sectionNames = Object.keys(levels)

    return (
        <Page title="Levels">
            { sectionNames.map(name => (
                <div>
                    <PageH3>{name}</PageH3>
                    <p>{levels[name]}</p>
                </div>
            ))}
        </Page>
    )

}