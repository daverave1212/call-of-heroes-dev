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
import TwoColumnsDescriptive from '../../components/TwoColumns/TwoColumnsDescriptive'
import Column from '../../components/TwoColumns/Column'

import Spell from '../../components/Spell/Spell'
import Icon from '../../components/Icon'

import Page from '../../containers/Page/Page'


import ManySpells from '../../components/Spell/ManySpells'


import theClass from '../../databases/Classes/Druid.json'

import { SpellCasting, StartingAbilities, ClassFeatures, LevelingUp, Spec, SpecTalents, PHealthAndArmor, Proficiencies, ClassFeatsDescription, } from '../../components/InsertableTemplates/RaceClassComponents'
import { SideMenuFromClass } from '../../components/SideMenu/SideMenu'

export default function Druid() {

    return (
        <div>

            <SideMenuFromClass theClass={theClass}/>

            <Page title={ theClass.Class }>

                <TwoColumnsDescriptive>
                    <Column style={{zIndex: 1}}>

                        <p>Lorem {theClass.Class} ipsum dolor sit amet.
                        Aenean blandit metus nisi, non commodo tortor volutpat ut.
                        Aenean suscipit, justo vitae faucibus viverra, lectus lacus laoreet ipsum, quis suscipit purus ex et tellus. Suspendisse congue libero sed molestie efficitur. Proin maximus sagittis nunc lacinia porttitor.
                        Maecenas fermentum lacinia mi, a elementum nibh tristique at. In eget nisl nunc.

                        <Separator/>

                        Lorem {theClass.Class} ipsum dolor sit amet.
                        Aenean blandit metus nisi, non commodo tortor volutpat ut.
                        Aenean suscipit, justo vitae faucibus viverra, lectus lacus laoreet ipsum, quis suscipit purus ex et tellus. Suspendisse congue libero sed molestie efficitur. Proin maximus sagittis nunc lacinia porttitor.
                        Maecenas fermentum lacinia mi, a elementum nibh tristique at. In eget nisl nunc.

                        <Separator/>

                        Lorem {theClass.Class} ipsum dolor sit amet.
                        Aenean blandit metus nisi, non commodo tortor volutpat ut.
                        Aenean suscipit, justo vitae faucibus viverra, lectus lacus laoreet ipsum, quis suscipit purus ex et tellus. Suspendisse congue libero sed molestie efficitur. Proin maximus sagittis nunc lacinia porttitor.
                        Maecenas fermentum lacinia mi, a elementum nibh tristique at. In eget nisl nunc.
                        Lorem {theClass.Class} ipsum dolor sit amet.
                        Aenean suscipit, justo vitae faucibus viverra, lectus lacus laoreet ipsum, quis suscipit purus ex et tellus. Suspendisse congue libero sed molestie efficitur. Proin maximus sagittis nunc lacinia porttitor.</p>

                    </Column>
                    <Column style={{position: 'relative'}}>
                        <img style={{ height: '915px', position: 'absolute', left: '-160px', top: '-175px', zIndex: '0' }} className="class-image" src={`/Classes/${theClass.Class}.png`}/>
                    </Column>
                </TwoColumnsDescriptive>

                <ClassFeatures theClass={theClass}/>
                
                <PageH3 style={{marginTop: 'var(--page-padding)'}}>Druidic</PageH3>
                <p>{theClass.Druidic}</p>

                <Proficiencies name={theClass.Class} theRaceOrClass={theClass}/>

                <LevelingUp theClass={theClass}/>
                <ClassFeatsDescription/>
         
                <SpellCasting theClass={theClass}/>

                <StartingAbilities spellsObject={theClass['Starting Abilities']} description={theClass['Starting Abilities Description']}/>

                <PageH2>Specializations</PageH2>

                <p>
                    The first time you choose a cleric domain (specialization), you must choose between two abilities.
                    For example, for Battle Cleric, you have to choose either March Ahead or Piety.
                    Choose wisely...
                </p>

            </Page>

            {
                Object.keys(theClass['Specs']).map(specName => {
                    const spec = theClass['Specs'][specName]
                    return (
                        <Spec key={specName} name={specName} spec={spec}>

                            {
                                spec.Abilities != null && (
                                    <div>
                                        <PageH3>Choose One Domain...</PageH3>
                                        <ManySpells spells={U.spellsFromObject(spec.Abilities)}/>
                                    </div>
                                )
                            }

                            <SpecTalents spec={spec}/>

                        </Spec>
                    )
                })
            }

        </div>
        )
}