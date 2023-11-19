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

const sectionNameToLinkMap = {
    'A. Questguard':                '/Other/RulesExplained/RulesSectionPages/Questguard',
    'B. Character Creation':        '/Other/RulesExplained/RulesSectionPages/CharacterCreation',
    'C. Playing the Game':          '/Other/RulesExplained/RulesSectionPages/PlayingTheGame',
    'D. Core Rules (In-Depth)':     '/Other/RulesExplained/RulesSectionPages/CoreRulesInDepth',
    'E. Game Master Guidelines':    '/Other/RulesExplained/RulesSectionPages/GameMasterGuidelines'
}

export default function Rules({}) {

    function RulesSection({obj}) {

        function RulesH1({title}) {
            return (
                <div className='rules-toc-h1'>
                    <Link to={sectionNameToLinkMap[title]}>{ title }</Link>
                </div>
            )
        }
        function RulesH2({title, h1Title}) {
            return (
                <div className='rules-toc-h2'>
                    <Link to={sectionNameToLinkMap[h1Title] + '#' + U.titleToId(title)}>{ title }</Link>
                </div>
            )
        }
        function RulesH3({title, h1Title}) {
            return (
                <div className='rules-toc-h3'>
                    <Link to={sectionNameToLinkMap[h1Title] + '#' + U.titleToId(title)}><img src='/Icons/UI/BulletPoint3.png' className='rules-toc-h3-bullet'/>{ title }</Link>
                </div>
            )
        }
        return (
            <div>
                <RulesH1 title={obj.title}/>
                { obj.value.map(sectionObj => (
                    <div>
                        <RulesH2 title={sectionObj.title} h1Title={obj.title}/>
                        { sectionObj.value.map(subsubsection => (
                            <RulesH3 title={subsubsection.title} h1Title={obj.title}/>
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