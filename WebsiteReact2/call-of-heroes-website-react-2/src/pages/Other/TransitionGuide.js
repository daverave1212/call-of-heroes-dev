import React from 'react'

import './CharacterCreation.css'

import abilities from '../../databases/Abilities.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'

import tg from '../../databases/Rules/COHFor5e.json'
import PageH3 from '../../components/PageH3/PageH3'
import PageH2 from '../../components/PageH2/PageH2'
import SmallStat from '../../components/SmallStat/SmallStat'
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import Column from '../../components/TwoColumns/Column'


export default function TransitionGuide() {


    const titles = Object.keys(tg).filter(key => key != 'default')

    const aboutTheGame = tg['About The Game']
    const cohForDnd = tg['CoH For D&D Players']

    function Section({object, title}) {
        return (
            <div>
                <PageH3>{title}</PageH3>
                <p>{object[title]}</p>
            </div>
        )
    }
    function SectionRightContentLeft({object, title, children, type}) {
        type = type == null? 'normal' : type
        return (
            <TwoColumns type={type}>
                <Column> <Section object={object} title={title}/> </Column>
                <Column> { children } </Column>
            </TwoColumns>
        )
    }
    function ContentRightSectionLeft({object, title, children, type}) {
        type = type == null? 'normal' : type
        return (
            <TwoColumns type={type}>
                <Column> { children } </Column>
                <Column> <Section object={object} title={title}/> </Column>
            </TwoColumns>
        )
    }

    return (
        <div>
            <div className='page' style={{whiteSpace: 'pre-wrap'}}>
                <PageH1>D&D Transition Guide</PageH1>

                <PageH2>About The Game</PageH2>

                <TwoColumns>
                    <Column>
                        <Section object={aboutTheGame} title='What is Call of Heroes?'/>
                    </Column>
                    <Column>
                        <Section object={aboutTheGame} title='Is this a D&D offspin?'/>
                    </Column>
                </TwoColumns>
            </div>

            <div className='page' style={{whiteSpace: 'pre-wrap', overflow: 'hidden'}}>
                <PageH2>Basic Rules Transition</PageH2>

                <SectionRightContentLeft object={cohForDnd} title="D12 System" type="lefty">
                    <img src="/Rules/D12.png" style={{width: '55%', marginLeft: '22%', marginTop: '25%'}}/>
                </SectionRightContentLeft>

                <Section object={cohForDnd} title="Characters"/>

                <SectionRightContentLeft object={cohForDnd} title="Player Character Progression">
                    <img src="/Rules/Talents.png" style={{width: '160%', marginLeft: '-15%'}}/>
                </SectionRightContentLeft>

                <PageH3>Character Stats</PageH3>
                <p>{ cohForDnd['Character Stats'].split('\n\n')[0] }</p>
                <TwoColumns>
                    <Column>TODO</Column>
                    <Column><p>{ cohForDnd['Character Stats'].split('\n\n')[1] }</p></Column>
                </TwoColumns>

                <Section object={cohForDnd} title="Combat, Turns and Actions"/>
                <Section object={cohForDnd} title="Abilities"/>
                <Section object={cohForDnd} title="Spell Casting Systems"/>
                <Section object={cohForDnd} title="Main Stat and Other"/>

            </div>

        </div>
        
    )

}