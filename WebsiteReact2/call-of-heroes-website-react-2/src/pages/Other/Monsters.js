import React from 'react'
import { useState } from 'react'

import * as U from '../../utils'

import armors from '../../databases/Armors.json'

import ManyBoxes from '../../components/Spell/ManyBoxes'
import PageH2 from '../../components/PageH2/PageH2'
import PageH1 from '../../components/PageH1/PageH1'
import Page from '../../containers/Page/Page'

import monsters from '../../databases/Monsters.json'
import TableNormal from '../../components/TableNormal/TableNormal'
import { Link } from 'react-router-dom'

export default function Monsters({}) {

    const monstersArray = Object.keys(monsters)
        .map(name => ({...monsters[name], Name: name}))
        .filter(monster => monster.Name != 'Template' && monster.Name.endsWith('OLD') == false)

    return (
        <Page title="Monsters">

            <TableNormal columns={['Name', 'Type', 'Experience', 'Degree']}>
                { monstersArray.map(monster => (
                    <tr key={monster.Name}>
                        <td><Link to={`/Other/Monster#${monster.Name}`}>{ monster.Name }</Link></td>
                        <td>{ monster.Type }</td>
                        <td>{ monster.Experience }</td>
                        <td>{ monster.Degree == null? 'Normal' : monster.Degree }</td>
                    </tr>
                )) }
            </TableNormal>
        </Page>
    )
}