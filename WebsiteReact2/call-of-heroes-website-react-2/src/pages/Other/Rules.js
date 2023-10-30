import React from 'react'
import { useState } from 'react'
import './Rules.css'

import * as U from '../../utils'

import ManyBoxes from '../../components/Spell/ManyBoxes'
import PageH2 from '../../components/PageH2/PageH2'
import PageH1 from '../../components/PageH1/PageH1'
import Page from '../../containers/Page/Page'

import rulesDataLists from '../../databases/RulesLists.json'
import TableNormal from '../../components/TableNormal/TableNormal'
import { Link } from 'react-router-dom'
import ThreeColumns from '../../components/TwoColumns/ThreeColumns'
import Column from '../../components/TwoColumns/Column'

const [
    questguardForBeginners,
    characterCreation,
    playingTheGame,
    coreRulesInDepth,
    gameMasterGuidelines
] = rulesDataLists

export default function Rules({}) {


    function RulesSection({obj}) {
        function RulesH1({children}) {
            return (
                <div className='rules-category'>
                    { children }
                </div>
            )
        }
        function RulesH2({children}) {
            return (
                <div className='rules-header'>
                    { children }
                </div>
            )
        }
        function RulesH3({children}) {
            return (
                <div className='rules-subtitle'>
                    <img src='/Icons/UI/BulletPoint3.png' className='rules-subtitle-bullet'/>{ children }
                </div>
            )
        }
        return (
            <div>
                <RulesH1>{obj.title}</RulesH1>
                { obj.value.map(sectionObj => (
                    <div>
                        <RulesH2>{sectionObj.title}</RulesH2>
                        { sectionObj.value.map(subsubsection => (
                            <RulesH3>{subsubsection.title}</RulesH3>
                        )) }
                    </div>
                )) }
            </div>
        )
    }

    return (
        <Page title="Questguard Rules">
            <div className='rules-box'>
                <ThreeColumns>
                    <Column>
                        <RulesSection obj={questguardForBeginners}/>
                        <RulesSection obj={characterCreation}/>
                    </Column>
                    <Column>
                        <RulesSection obj={playingTheGame}/>
                        <RulesSection obj={gameMasterGuidelines}/>
                    </Column>
                    <Column>
                        <RulesSection obj={coreRulesInDepth}/>
                    </Column>
                </ThreeColumns>
            </div>
        </Page>
    )

    return (
        <Page title="Rules">

            {/* <TableNormal columns={['Rule']}>
                { rulesArray.map(rule => (
                    <tr key={rule}>
                        <td><Link to={`/Other/Rule#${rule}`}>{ rule }</Link></td>
                    </tr>
                )) }
                
            </TableNormal> */}
        </Page>
    )
}