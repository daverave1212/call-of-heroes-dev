import React from 'react'
import { useState } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'

import * as U from '../../utils'

import armors from '../../databases/Armors.json'

import ManyBoxes from '../../components/Spell/ManyBoxes'
import PageH2 from '../../components/PageH2/PageH2'
import PageH1 from '../../components/PageH1/PageH1'
import Page from '../../containers/Page/Page'

import Rules from '../../databases/Rules/Rules.json'

export default function Rule() {

    const location = useLocation()
    const hash = decodeURIComponent(location.hash).substring(1) // Remove the "#" at the beginning

    return (
        <Page>
            <PageH2>{ hash }</PageH2>
            <p>{ Rules[hash] }</p>
        </Page>
    )
}
