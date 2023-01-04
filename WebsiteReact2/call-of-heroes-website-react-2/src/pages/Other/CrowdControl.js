import React, { useState } from 'react'

import crowdControl from '../../databases/Rules/CrowdControl.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'
import PageH3 from '../../components/PageH3/PageH3'



export default function CrowdControl() {

    const crowdControlNames = Object.keys(crowdControl)

    return (
        <Page title="Crowd Control">
            { crowdControlNames.map(name => (
                <div>
                    <PageH3>{name}</PageH3>
                    <p>{crowdControl[name]}</p>
                </div>
            ))}
        </Page>
    )

}