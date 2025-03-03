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


import theClass from '../../databases/Classes/Rogue.json'

import { SpellCasting, StartingAbilities, ClassFeatures, LevelingUp, Spec, SpecTalents, PHealthAndArmor, Proficiencies, ClassFeatsDescription, Equipment, RaceHeader, ClassPage, } from '../../components/InsertableTemplates/RaceClassComponents'
import { SideMenuFromClass } from '../../components/SideMenu/SideMenu'
import { QGTitle1 } from '../Tools/TitleGenerator'

export default function Rogue() {

    return <ClassPage theClass={theClass}/>
}