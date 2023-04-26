import React from 'react'

import { useState } from 'react'
import YAML from 'yaml'

import * as U from '../../utils'

import PageH1 from '../../components/PageH1/PageH1'
import proficiencies from '../../databases/Proficiencies.json'
import backgrounds from '../../databases/Backgrounds.json'
import ManyBoxes from '../../components/Spell/ManyBoxes'
import PageH3 from '../../components/PageH3/PageH3'
import SmallStat from '../../components/SmallStat/SmallStat'
import ManySpells from '../../components/Spell/ManySpells'
import Icon from '../../components/Icon'
import Spell from '../../components/Spell/Spell'
import PageH2 from '../../components/PageH2/PageH2'
import Page from '../../containers/Page/Page'
import TableNormal from '../../components/TableNormal/TableNormal'

export default function Proficiencies() {

    return (
        <Page title="Proficiencies">
            <ManySpells spellsObject={proficiencies}/>
            <TableNormal type="info" columns={['Number', 'Proficiency']}>
                { Object.keys(proficiencies).map((prof, i) => (
                    <tr key={prof}>
                        <td>{i}</td>
                        <td>{prof}</td>
                    </tr>
                )) }
            </TableNormal>
        </Page>
    )
}