import React, { useState } from 'react'

import attackModifiers from '../../databases/Rules/AttackModifiers.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'
import PageH3 from '../../components/PageH3/PageH3'



export default function AttackModifiers() {

    const sectionNames = Object.keys(attackModifiers)

    return (
        <Page title="Attack Modifiers">
            { sectionNames.map(name => (
                <div>
                    <PageH3>{name}</PageH3>
                    <p>{attackModifiers[name]}</p>
                </div>
            ))}
        </Page>
    )

}