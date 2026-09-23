import React from 'react'
import './Monster.css'

import { useState } from 'react'

import * as U from '../../utils'

import Page from '../../containers/Page/Page'

import TableNormal from '../../components/TableNormal/TableNormal'
import { useLocation } from 'react-router-dom'

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
