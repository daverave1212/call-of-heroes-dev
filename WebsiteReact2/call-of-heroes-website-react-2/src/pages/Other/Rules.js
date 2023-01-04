import React from 'react'
import { useState } from 'react'

import * as U from '../../utils'

import ManyBoxes from '../../components/Spell/ManyBoxes'
import PageH2 from '../../components/PageH2/PageH2'
import PageH1 from '../../components/PageH1/PageH1'
import Page from '../../containers/Page/Page'

import rules from '../../databases/Rules/Rules.json'
import TableNormal from '../../components/TableNormal/TableNormal'
import { Link } from 'react-router-dom'

export default function Rules({}) {

    const rulesArray = Object.keys(rules)

    return (
        <Page title="Rules">

            <TableNormal columns={['Rule']}>
                { rulesArray.map(rule => (
                    <tr key={rule}>
                        <td><Link to={`/Other/Rule#${rule}`}>{ rule }</Link></td>
                    </tr>
                )) }
                
            </TableNormal>
        </Page>
    )
}