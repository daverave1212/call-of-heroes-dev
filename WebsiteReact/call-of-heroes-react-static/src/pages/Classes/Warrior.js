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

import * as classAbilities from '../../databases/ClassAbilities.json'

import ManySpells from '../../components/Spell/ManySpells'


import theClass from '../../databases/Classes/Warrior.json'

import { SpellCasting, StartingAbilities, ClassFeatures, LevelingUp, Spec, SpecTalents, PHealthAndArmor } from '../../components/InsertableTemplates/ClassComponents'


export default function Warrior() {

    return (
        <div>

            <div className='page'>

                <PageH1>{ theClass.Class }</PageH1>
                <br/>

                <TwoColumns>
                    <Column>

                        { theClass.Class } Abilities are Exhaust-based.
                        As a { theClass.Class }, you know a certain number of Advanced Abilities.
                        You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.
                        Advanced Abilities are all Abilities from the Spell Lists listed as Advanced.
                        If an Ability is not listed as Advanced, you can use it as many times as you like.

                        <Separator/>

                        { theClass.Class } Abilities are Exhaust-based.
                        As a { theClass.Class }, you know a certain number of Advanced Abilities.
                        You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.
                        Advanced Abilities are all Abilities from the Spell Lists listed as Advanced.
                        If an Ability is not listed as Advanced, you can use it as many times as you like.

                        <Separator/>

                        { theClass.Class } Abilities are Exhaust-based.
                        As a { theClass.Class }, you know a certain number of Advanced Abilities.
                        You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.
                        Advanced Abilities are all Abilities from the Spell Lists listed as Advanced.
                        If an Ability is not listed as Advanced, you can use it as many times as you like.
                        As a { theClass.Class }, you know a certain number of Advanced Abilities.
                        You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.
                        Advanced Abilities are all Abilities from the Spell Lists listed as Advanced.

                    </Column>
                    <Column>
                        <img style={{ marginLeft: '-35px', marginTop: '-25px' }} className="class-image" src={`/Classes/${theClass.Class}.png`}/>
                    </Column>
                </TwoColumns>

                <ClassFeatures theClass={theClass}/>

                <LevelingUp theClass={theClass}/>
         
                <SpellCasting theClass={theClass}/>

                <StartingAbilities spellsObject={theClass['Starting Abilities']} description={theClass['Starting Abilities Description']}/>

                <PageH2>Specialzations</PageH2>

                <p>
                    The first time you choose a cleric domain (specialization), you must choose between two abilities.
                    For example, for Battle Cleric, you have to choose either March Ahead or Piety.
                    Choose wisely...
                </p>

            </div>

            {
                Object.keys(theClass['Specs']).map(specName => {
                    const spec = theClass['Specs'][specName]
                    return (
                        <Spec name={specName} spec={spec}>

                            <SpecTalents spec={spec}/>

                        </Spec>
                    )
                })
            }

        </div>
        )
}