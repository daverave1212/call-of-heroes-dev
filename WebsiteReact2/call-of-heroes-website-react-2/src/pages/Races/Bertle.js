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

import { SideMenuFromRace } from '../../components/SideMenu/SideMenu'
import theRace from '../../databases/Races/Bertle.json'

import ManySpells from '../../components/Spell/ManySpells'

import { SpellCasting, StartingAbilities, ClassFeatures, LevelingUp, Spec, SpecTalents, PHealthAndArmor, Proficiencies, AbilitiesWithDescription, RaceFeatures, RaceFeatsDescription, RacialFeats, RaceDescription, RaceHeader } from '../../components/InsertableTemplates/RaceClassComponents'

// TODO: Idea - have all races/classes be a separate page with hero banners



export default function Race() {

    return (
        <div>

            <SideMenuFromRace theRace={theRace}/>
            <Page>

                <RaceHeader theRace={theRace}/>

                {/* <TwoColumnsDescriptive>
                    <Column style={{zIndex: 1}}>
                        <RaceDescription theRace={theRace}/>
                    </Column>
                    <Column style={{position: 'relative'}}>
                        <img style={{ left: '-120px', top: '-155px' }} className="class-image" src={`/Races/${theRace.Race}.png`}/>
                    </Column>
                </TwoColumnsDescriptive> */}

                <div id="abilities" style={{
                    marginTop: '-300px',
                    paddingBottom: '300px',
                    height: '0px'
                }}></div>
                <RaceFeatures theRace={theRace}/>

                <Proficiencies name={theRace.Race} theRaceOrClass={theRace}/>

                
                <AbilitiesWithDescription id="a" spellsObject={theRace['Starting Abilities']} title='Abilities' description={theRace['Starting Abilities Description']}/>

                <RacialFeats theRace={theRace}/>
                
                <p>
                    That's all from the Race! Next, choose your character's Class!
                </p>

            </Page>

            

        </div>
        )
}