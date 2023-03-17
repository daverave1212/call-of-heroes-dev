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
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import TwoColumnsDescriptive from '../../components/TwoColumns/TwoColumnsDescriptive'
import Column from '../../components/TwoColumns/Column'
import TableNormal from '../../components/TableNormal/TableNormal'
import PageH3 from '../../components/PageH3/PageH3'

export default function Rule() {

    const location = useLocation()
    const hash = decodeURIComponent(location.hash).substring(1) // Remove the "#" at the beginning

    return (
        <Page>
            <PageH1>{ hash }</PageH1>
            <p>{ Rules[hash] }</p>

            { hash == "Line of Sight" && (
                <TwoColumns>
                    <Column>
                        <img style={{width: '100%'}} src="/Rules/LineOfSightWall.png"/>
                    </Column>
                    <Column>
                        <img style={{width: '100%'}} src="/Rules/LineOfSightNo.png"/>
                    </Column>
                </TwoColumns>
            ) }


            { hash == "Checks" && (
                <div>
                    <PageH3>Standard Check Difficulty</PageH3>
                    <TableNormal columns={['Difficulty', 'Number Needed To Succeed']}>
                        <tr>
                            <td>Easy</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>Medium</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>Hard</td>
                            <td>15</td>
                        </tr>
                        <tr>
                            <td>Very Hard</td>
                            <td>20</td>
                        </tr>
                        <tr>
                            <td>Impossible</td>
                            <td>25</td>
                        </tr>
                    </TableNormal>
                </div>
            ) }
        </Page>
    )
}
