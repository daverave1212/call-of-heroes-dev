import React from 'react'
import { useState } from 'react'
import YAML from 'yaml'

import * as U from '../../utils'

import PageH1 from '../../components/PageH1/PageH1'
import PageH2 from '../../components/PageH2/PageH2'
import PageH3 from '../../components/PageH3/PageH3'

import SmallStat from '../../components/SmallStat/SmallStat'
import SmallStatList from '../../components/SmallStat/SmallStatList'


import Separator from '../../components/Separator/Separator'
import TableNormal from '../../components/TableNormal/TableNormal'
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import Column from '../../components/TwoColumns/Column'

import Spell from '../../components/Spell/Spell'
import Icon from '../../components/Icon'

import theRace from '../../databases/Races/Dragonborn.json'
import * as classAbilities from '../../databases/ClassAbilities.json'

import ManySpells from '../../components/Spell/ManySpells'

import { SpellCasting, StartingAbilities, ClassFeatures, LevelingUp, Spec, SpecTalents, PHealthAndArmor, AbilitiesWithDescription, RaceFeatures } from '../../components/InsertableTemplates/RaceClassComponents'

export default function Race() {

    return (
        <div>

            <div className='page'>

                <PageH1>{ theRace.Race }</PageH1>
                <br/>

                <TwoColumns>
                    <Column>

                        { theRace.Race } Abilities are Exhaust-based.
                        As a { theRace.Race }, you know a certain number of Advanced Abilities.
                        You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.
                        Advanced Abilities are all Abilities from the Spell Lists listed as Advanced.
                        If an Ability is not listed as Advanced, you can use it as many times as you like.

                        <Separator/>

                        { theRace.Race } Abilities are Exhaust-based.
                        As a { theRace.Race }, you know a certain number of Advanced Abilities.
                        You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.
                        Advanced Abilities are all Abilities from the Spell Lists listed as Advanced.
                        If an Ability is not listed as Advanced, you can use it as many times as you like.

                        <Separator/>

                        { theRace.Race } Abilities are Exhaust-based.
                        As a { theRace.Race }, you know a certain number of Advanced Abilities.
                        You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.
                        Advanced Abilities are all Abilities from the Spell Lists listed as Advanced.
                        If an Ability is not listed as Advanced, you can use it as many times as you like.
                        As a { theRace.Race }, you know a certain number of Advanced Abilities.
                        You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.
                        Advanced Abilities are all Abilities from the Spell Lists listed as Advanced.

                    </Column>
                    <Column>
                        <img style={{ marginLeft: '-125px', marginTop: '0px' }} className="class-image" src={`/Races/${theRace.Race}.png`}/>
                    </Column>
                </TwoColumns>

                <RaceFeatures theRace={theRace}/>

                <AbilitiesWithDescription spellsObject={theRace['Starting Abilities']} title='Abilities' description={theRace['Starting Abilities Description']}/>

                <PageH3>Choose One From...</PageH3>
                <ManySpells spells={U.spellsFromObject(theRace.Talents)}/>

                <p>
                    That's all from the Race! Next, choose your character's Class!
                </p>

            </div>

            {/* {
                Object.keys(theClass['Specs']).map(specName => {
                    const spec = theClass['Specs'][specName]
                    return (
                        <Spec name={specName} spec={spec}>

                        <PageH3>Choose One...</PageH3>
                        <ManySpells spells={U.spellsFromObject(spec.Abilities)}/>

                        <SpecTalents spec={spec}/>

                        </Spec>
                    )
                })
            } */}

        </div>
        )
}