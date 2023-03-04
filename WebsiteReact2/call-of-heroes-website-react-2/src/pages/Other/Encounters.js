import React, { useState } from 'react'

// import encounters from '../../databases/Rules/Enc.json'
import encounters from '../../databases/Other/Encounters.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'
import PageH3 from '../../components/PageH3/PageH3'
import PageH2 from '../../components/PageH2/PageH2'



export default function Encounters() {

    function EncounterSection({ name }) {
        return (
            <div>
                <PageH2>{name}</PageH2>
                <p>{encounters[name]}</p>
            </div>
        )
    }
    // In the YAML file, subsections are marked with a "$" in front of their title
    function EncounterSubsection({ name }) {
        const displayName = name.startsWith('$') ? name.substring(1) : name
        return (
            <div>
                <PageH3>{displayName}</PageH3>
                <p>{encounters[name]}</p>
            </div>
        )
    }

    console.log(Object.keys(encounters))

    return (
        <Page title="Encounters">
            <p>This page contains all the rules, necessary information and tips for how to make encounters and how to play monsters as a Game Master.</p>
            { Object.keys(encounters).map(sectionName => (
                sectionName.startsWith('$')?
                    (<EncounterSubsection name={sectionName}/>) :
                    (<EncounterSection name={sectionName}/>)
            )) }
        </Page>
    )

}