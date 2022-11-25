

import TableNormal from './TableNormal'
import './TableNormal.css'

import React from 'react'
import Icon from '../Icon'

export default () => (
    <TableNormal type='info' columns={['Level', 'You Get...']}>
        <tr>
            <td>Level 1</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Level 2</td>
            <td>
                Talent from your Specialization (Tier 1)
            </td>
        </tr>
        <tr>
            <td>Level 3</td>
            <td>
                +1 in any Stat<br/>
                1 Weapon Training<br/>
                +1 Feat<br/>
                1 Extra <Icon name="Mana"/>Mana
            </td>
        </tr>
        <tr>
            <td>Level 4</td>
            <td>
                Talent from your Specialization (Tier 2)
            </td>
        </tr>
        <tr>
            <td>Level 5</td>
            <td>
                Action Surge (see below)
            </td>
        </tr>
        <tr>
            <td>Level 6</td>
            <td>
                Talent from your Specialization (Tier 3)<br/>
                1 Extra <Icon name="Mana"/>Mana
            </td>
        </tr>
        <tr>
            <td>Level 7</td>
            <td>
                +1 in any Stat<br/>
                1 Weapon Training<br/>
                +1 Feat
            </td>
        </tr>
        <tr>
            <td>Level 8</td>
            <td>
                Talent from your Specialization (Tier 4)
            </td>
        </tr>
        <tr>
            <td>Level 9</td>
            <td>
                Pick one more Talent from either Tier 2 or Tier 4.
                Alternatively, you can get a Feat instead.<br/>
                1 Extra <Icon name="Mana"/>Mana
            </td>
        </tr>
        <tr>
            <td>Level 10</td>
            <td>
                Talent from your Specialization (Tier 5)
            </td>
        </tr>
    </TableNormal>
)