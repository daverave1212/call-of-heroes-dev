import React from 'react'


import cohExplained from '../../databases/Rules/COHExplained.json'
import CharacterCreation from './CharacterCreation'

import abilities from '../../databases/Abilities.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'

import PageH3 from '../../components/PageH3/PageH3'
import PageH2 from '../../components/PageH2/PageH2'
import SmallStat from '../../components/SmallStat/SmallStat'
import Page from '../../containers/Page/Page'

export default function HowToPlayForNewPlayers() {

    document.title = 'How To Play (For New Players)'

    function Section({name}) {
        return (
            <div>
                <PageH3>{name}</PageH3>
                <p>{cohExplained[name]}</p>
            </div>
        )
    }
    return (
        <div>
            <Page title="Questguard" isSecondaryPage={true}>
                <Section name="What is Questguard?"/>
                <Section name="How do groups work?"/>
                <Section name="How is it different from a board game?"/>
                <Section name="What is a story or adventure like?"/>
                <Section name="What should I buy to get started?"/>
                <Section name="How do I get started?"/>
                <Section name="Learning the Rules"/>
                <Section name="Checking the Rules"/>

                <PageH2>Understanding Dice</PageH2>
                <Section name="Dice"/>
                <Section name="Dice notation and calculations"/>

                <PageH2>Game Basics</PageH2>
                <Section name="How does it play out?"/>
                <Section name="Checks"/>
                <Section name="Stats"/>
                <Section name="Checks Continued"/>
                <Section name="Combat"/>
                <Section name="Turn order (and Initiative)"/>
                <Section name="Health"/>
                <Section name="Your Turn"/>
                <Section name="Moving"/>
                <Section name="Actions"/>
                <Section name="Half-Actions"/>
                <Section name="Attacking, Weapons and Defense"/>
                <Section name="Regaining Health"/>
                <Section name="Why Your Positioning Matters"/>

                <PageH2>Abilities and Spells</PageH2>
                <Section name="Abilities"/>
                <Section name="Abilities Notes"/>
                <Section name="Spellcasting"/>
                <Section name="Mana Spellcasting"/>
                <Section name="Wrapping up the basics"/>

                <PageH2>Character Creation</PageH2>
                <Section name="Character Creation"/>
            </Page>

            <CharacterCreation isSecondaryPage={true}/>

        </div>
    )

    

    
}