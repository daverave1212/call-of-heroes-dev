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


import theClass from '../../databases/Classes/Shaman.json'

import { SpellCasting, StartingAbilities, ClassFeatures, LevelingUp, Spec, SpecTalents, PHealthAndArmor, Proficiencies, ClassFeatsDescription, Equipment, } from '../../components/InsertableTemplates/RaceClassComponents'
import { SideMenuFromClass } from '../../components/SideMenu/SideMenu'

export default function Shaman() {

    return (
        <div>

            <SideMenuFromClass theClass={theClass}/>

            <Page title={ theClass.Class }>

                <div><i>Difficulty: { theClass.Difficulty }</i></div>

                <br/>

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
                        <img style={{ position: 'absolute', left: '-220px', top: '-205px', zIndex: '0' }} className="class-image" src={`/Classes/${theClass.Class}.png`}/>
                    </Column>
                </TwoColumnsDescriptive>

                <ClassFeatures theClass={theClass}/>

                <Proficiencies name={theClass.Class} theRaceOrClass={theClass}/>

                <StartingAbilities spellsObject={theClass['Starting Abilities']} description={theClass['Starting Abilities Description']}/>

                <SpellCasting theClass={theClass}/>

                <Equipment theClass={theClass}/>
                
                <LevelingUp theClass={theClass}/>

                <PageH2>Specializations</PageH2>

                <p>
                    When you reach Level 2, you can choose one of the Specializations below.
                    This decision is permanent, so make the choice that is right for you.
                </p>

            </Page>

            {
                Object.keys(theClass['Specs']).map(specName => {
                    const spec = theClass['Specs'][specName]
                    return (
                        <Spec key={specName} name={specName} spec={spec}>

                            <SpecTalents spec={spec}/>

                        </Spec>
                    )
                })
            }

        </div>
        )
}