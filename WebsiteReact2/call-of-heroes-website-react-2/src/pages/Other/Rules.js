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
import { TDBullet, TDSleek1, TDSleek2, TDSleek3 } from '../../components/TableNormal/TDSleek'

import rules from '../../databases/Rules/Rules.json'

const [
    questguardForBeginners,
    characterCreation,
    playingTheGame,
    coreRulesInDepth,
    gameMasterGuidelines
] = rules

const sectionNameToLinkMap = {
    'A. Questguard':                '/Other/RulesExplained/RulesSectionPages/Questguard',
    'B. Character Creation':        '/Other/RulesExplained/RulesSectionPages/CharacterCreation',
    'C. Playing the Game':          '/Other/RulesExplained/RulesSectionPages/PlayingTheGame',
    'D. Core Rules (In-Depth)':     '/Other/RulesExplained/RulesSectionPages/CoreRulesInDepth',
    'E. Game Master Guidelines':    '/Other/RulesExplained/RulesSectionPages/GameMasterGuidelines'
}

function RulesSubsection({obj}) {
    const title = U.getOnlyKey(obj)
    const subobjects = obj[title]

    function RulesH2({title, h1Title}) {
        return (
            <TDSleek2>
                <Link to={sectionNameToLinkMap[h1Title] + '#' + U.titleToId(title)}>{ title }</Link>
            </TDSleek2>
        )
    }

    function RulesH3({title, h1Title}) {
        return (
            <TDSleek3>
                <Link to={sectionNameToLinkMap[h1Title] + '#' + U.titleToId(title)}><TDBullet/>{ title }</Link>
            </TDSleek3>
        )
    }

    return <div>
        <RulesH2 title={title} h1Title={null}/>
        { subobjects.map(subsubsection => (
            <RulesH3 title={U.getOnlyKey(subsubsection)} h1Title={null}/>
        )) }
    </div>
}

function RulesSection({obj}) {

    const title = U.getOnlyKey(obj)
    const subobjects = obj[title]

    function RulesH1({title}) {
        return (
            <TDSleek1>
                <Link to={sectionNameToLinkMap[title]}>{ title }</Link>
            </TDSleek1>
        )
    }


    return (
        <div>
            <RulesH1 title={title}/>
            { subobjects.map(sectionObj => (
                <RulesSubsection obj={sectionObj}/>
            )) }
        </div>
    )
}

export default function Rules({}) {

    return (
        <Page title="Questguard Rules">
            <p style={{fontSize: '1.5em'}}>Hit <span className='keyboard-key'>CTRL</span> + <span className='keyboard-key'>F</span> to search for your rule!</p>
            <div className='rules-box'>
                <ThreeColumns>
                    <Column>
                        <RulesSection obj={questguardForBeginners}/>
                        <RulesSection obj={characterCreation}/>
                    </Column>
                    <Column>
                        <RulesSection obj={playingTheGame}/>
                        <RulesSection obj={coreRulesInDepth}/>
                    </Column>
                    <Column>
                        <RulesSection obj={gameMasterGuidelines}/>
                    </Column>
                </ThreeColumns>
            </div>
        </Page>
    )

}