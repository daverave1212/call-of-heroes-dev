import React, { useState } from 'react'

// import encounters from '../../databases/Rules/Enc.json'
import encounters from '../../databases/Other/Encounters.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'
import PageH3 from '../../components/PageH3/PageH3'
import PageH2 from '../../components/PageH2/PageH2'
import TableNormal from '../../components/TableNormal/TableNormal'



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
                <div>
                    { sectionName.startsWith('$')?
                        (<EncounterSubsection name={sectionName}/>) :
                        (<EncounterSection name={sectionName}/>) }
                    { sectionName == '$1. Calculate the Encounter Budget for the players' && (
                        <div>
                            <TableNormal columns={['Player Level', 'Player XP Worth']}>
                                <tr> <td>1</td> <td>100</td> </tr>
                                <tr> <td>2</td> <td>125</td> </tr>
                                <tr> <td>3</td> <td>150</td> </tr>
                                <tr> <td>4</td> <td>200</td> </tr>
                                <tr> <td>5</td> <td>225</td> </tr>
                                <tr> <td>6</td> <td>250</td> </tr>
                                <tr> <td>7</td> <td>300</td> </tr>
                                <tr> <td>8</td> <td>325</td> </tr>
                                <tr> <td>9</td> <td>350</td> </tr>
                                <tr> <td>10</td><td>400</td> </tr>
                            </TableNormal>
                        </div>
                    )}
                    { sectionName == 'Homebrewing Monsters' && (
                        <div>
                            <img src="/Rules/HomebrewingMonsters.png" style={{width: '100%'}}/>
                        </div>
                    )}
                </div>
            )) }
        </Page>
    )

}