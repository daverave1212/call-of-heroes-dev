import React from 'react'

import { useState } from 'react'
import YAML from 'yaml'

import * as U from '../../utils'

import PageH1 from '../../components/PageH1/PageH1'
import backgrounds from '../../databases/Backgrounds.json'
import ManyBoxes from '../../components/Spell/ManyBoxes'
import PageH3 from '../../components/PageH3/PageH3'
import SmallStat from '../../components/SmallStat/SmallStat'
import ManySpells from '../../components/Spell/ManySpells'
import Icon from '../../components/Icon'
import Spell from '../../components/Spell/Spell'
import PageH2 from '../../components/PageH2/PageH2'
import Page from '../../containers/Page/Page'

export default function Backgrounds() {

    const bgNames = Object.keys(backgrounds).filter(name => name != 'default' && name != 'Custom Background')
    
    const bgs = bgNames.map(bgName => ({Name: bgName, ...backgrounds[bgName]}))

    const cbg = backgrounds['Custom Background']

    

    return (
        <Page title="Backgrounds">

            <p>
                A Background is one of the 3 components of a Character (Class, Race and Background). Even though it's the least imortant of the 3, the Background always provides you with a Proficiency in a specific skill, a Weapon Training or a Language and some starting money.
                If you have Proficiency in a certain skill, it means whenever you make a Check for that specific thing (with a 12-sided die), you add your character's Level to the roll.
                Languages are more important roleplay-wise, while Training in a weapon type means you can use it normally; otherwise, the rolled weapon damage is halved when you attack with it.
            </p>

            <PageH2>Custom Background</PageH2>
            <p>{ cbg.Description }</p>
            <div className='with-margined-children'>
                <SmallStat color="var(--dark-green)" name="Starting Money">{ cbg.Money }<Icon name="Gold"/></SmallStat>
                <SmallStat color="var(--dark-green)" name="Languages" type="vertical">{cbg.Language}</SmallStat>
                <SmallStat color="var(--dark-green)" name="Training" type="vertical">{cbg.Training}</SmallStat>
            </div>

            <PageH2>Backgrounds</PageH2>
            { bgs.map(bg => (
                <div key={bg.Name}>
                    <PageH3>{ bg.Name }</PageH3>
                    <p>{ bg.Description }</p>
                    <div className='with-margined-children'>
                        <SmallStat color="var(--dark-green)" name="Starting Money">{ bg.Money }<Icon name="Gold"/></SmallStat>
                        { bg.Language != null && (
                            <SmallStat color="var(--dark-green)" name="Languages" type="vertical">{bg.Language}</SmallStat>
                        ) }
                        { bg.Training != null && (
                            <SmallStat color="var(--dark-green)" name="Training" type="vertical">{bg.Training}</SmallStat>
                        ) }
                        { bg.Abilities != null && (
                            Object.keys(bg.Abilities).length == 1? (
                                <Spell spell={U.spellsFromObject(bg.Abilities)[0]} style={{maxWidth: '50%', marginLeft: '0px'}}/>
                            ) : (
                                <ManySpells spellsObject={bg.Abilities}/>
                            )
                        ) }
                    </div>
                </div>
            )) }
        </Page>
    )
}