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
import theRace from '../../databases/Races/Dragonborn.json'

import ManySpells from '../../components/Spell/ManySpells'

import { SpellCasting, StartingAbilities, ClassFeatures, LevelingUp, Spec, SpecTalents, PHealthAndArmor, Proficiencies, AbilitiesWithDescription, RaceFeatures, RacialFeats, RaceDescription, RaceHeader, RacePage } from '../../components/InsertableTemplates/RaceClassComponents'

export default function Race() {

    return <RacePage theRace={theRace}/>

    return (
        <div>

            <SideMenuFromRace theRace={theRace}/>
            <Page>

                <RaceHeader theRace={theRace}/>

                <RaceFeatures theRace={theRace}/>

                <Proficiencies name={theRace.Race} theRaceOrClass={theRace}/>

                <AbilitiesWithDescription id="abilities" spellsObject={theRace['Starting Abilities']} title='Abilities' description={theRace['Starting Abilities Description']}/>

                <AbilitiesWithDescription spellsObject={theRace['Ability Choices']} title='Ability Choice' description={theRace['Ability Choices Description']}/>

                <RacialFeats theRace={theRace}/>

            </Page>

            

        </div>
        )
}