

import TableNormal from './TableNormal'
import './TableNormal.css'

import React from 'react'

export default () => (
    <TableNormal type='info' columns={['Level', 'You Get...']}>
        <tr>
            <td>Level 1</td>
            <td>-</td>
        </tr>
        <tr>
            <td>Level 2</td>
            <td>
                Class Specialization
            </td>
        </tr>
        <tr>
            <td>Level 3</td>
            <td>
                Class Talent (Tier 1)
            </td>
        </tr>
        <tr>
            <td>Level 4</td>
            <td>
                +1 in any Stat (up to +4)<br/>
                1 Feat
            </td>
        </tr>
        <tr>
            <td>Level 5</td>
            <td>
                Class Talent (Tier 2)
            </td>
        </tr>
        <tr>
            <td>Level 6</td>
            <td>
                Action Surge (see below)
            </td>
        </tr>
        <tr>
            <td>Level 7</td>
            <td>
                Class Talent (Tier 3)
            </td>
        </tr>
        <tr>
            <td>Level 8</td>
            <td>
                +1 in any Stat (up to +5)<br/>
                1 Feat
            </td>
        </tr>
        <tr>
            <td>Level 9</td>
            <td>
                Class Talent (Tier 4)
            </td>
        </tr>
        <tr>
            <td>Level 10</td>
            <td>
                Ultimate Class Ability
            </td>
        </tr>
    </TableNormal>
)