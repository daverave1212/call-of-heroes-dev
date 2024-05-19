import React from 'react'

import proficiencies from '../../databases/Proficiencies.json'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'
import TableNormal from '../../components/TableNormal/TableNormal'

export default function Proficiencies() {

    return (
        <Page title="Skills (Non-Combat)">
            <ManySpells spellsObject={proficiencies}/>
            <TableNormal type="info" columns={['Number', 'Skill']}>
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