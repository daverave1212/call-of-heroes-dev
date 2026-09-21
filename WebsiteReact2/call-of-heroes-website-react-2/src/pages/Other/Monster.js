import React from 'react'
import './Monster.css'

import { useState } from 'react'

import * as U from '../../utils'

import monsters from '../../databases/Other/Monsters.json'

import ManyBoxes from '../../components/Spell/ManyBoxes'
import PageH2 from '../../components/PageH2/PageH2'
import PageH1 from '../../components/PageH1/PageH1'
import Page from '../../containers/Page/Page'

import TableNormal from '../../components/TableNormal/TableNormal'
import { useLocation } from 'react-router-dom'
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import TwoColumnsDescriptive from '../../components/TwoColumns/TwoColumnsDescriptive'
import Column from '../../components/TwoColumns/Column'
import SmallStat from '../../components/SmallStat/SmallStat'
import Icon from '../../components/Icon'
import Separator from '../../components/Separator/Separator'
import LandingPageSeparator from '../../components/LandingPageSeparator/LandingPageSeparator'
import MonsterAbility from '../../components/MonsterAbility/MonsterAbility'

import MonsterCalculations from '../../databases/MonsterCalculations.json'

import MonsterBlock from '../../components/MonsterBlock/MonsterBlock.js'
import { useFeatureItem } from '../../services/content-providers/ContentProvider.js'
import { LoadingCenter } from '../../components/Loading/Loading.js'

export default function Monster() {

    const location = useLocation()
    const monsterName = U.getPageHashFromLocation(location)

    const [monster, isLoading] = useFeatureItem('other', 'Monsters', monsterName)

    return <Page>
        { isLoading? <LoadingCenter/>: <MonsterBlock monsterName={monsterName} monster={monster}/> }
    </Page>

}
