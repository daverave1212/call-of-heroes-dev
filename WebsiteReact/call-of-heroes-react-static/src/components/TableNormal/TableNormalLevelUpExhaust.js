

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
                {/* 5 <img src="/Icons/UI/Health.png" className="inline-icon"/>Health<br/>
                1 Known Advanced Spell <br/> */}
                Talent from your Specialization (Tier 1)
            </td>
        </tr>
        <tr>
            <td>Level 3</td>
            <td>
                {/* 5 <img src="/Icons/UI/Health.png" className="inline-icon"/>Health<br/>
                1 Known Advanced Spell <br/> */}
                +1 in any Stat<br/>
                1 Weapon Training<br/>
                +1 Feat
            </td>
        </tr>
        <tr>
            <td>Level 4</td>
            <td>
                {/* 5 <img src="/Icons/UI/Health.png" className="inline-icon"/>Health<br/>
                1 Known Advanced Spell <br/> */}
                Talent from your Specialization (Tier 2)
            </td>
        </tr>
        <tr>
            <td>Level 5</td>
            <td>
                {/* 5 <img src="/Icons/UI/Health.png" className="inline-icon"/>Health<br/>
                1 Known Advanced Spell <br/> */}
                Action Surge (see below)
            </td>
        </tr>
        <tr>
            <td>Level 6</td>
            <td>
                {/* 5 <img src="/Icons/UI/Health.png" className="inline-icon"/>Health<br/>
                1 Known Advanced Spell <br/> */}
                Talent from your Specialization (Tier 3)
            </td>
        </tr>
        <tr>
            <td>Level 7</td>
            <td>
                {/* 5 <img src="/Icons/UI/Health.png" className="inline-icon"/>Health<br/>
                1 Known Advanced Spell <br/> */}
                +1 in any Stat<br/>
                1 Weapon Training<br/>
                +1 Feat
            </td>
        </tr>
        <tr>
            <td>Level 8</td>
            <td>
                {/* 5 <img src="/Icons/UI/Health.png" className="inline-icon"/>Health<br/>
                1 Known Advanced Spell <br/> */}
                Talent from your Specialization (Tier 4)
            </td>
        </tr>
        <tr>
            <td>Level 9</td>
            <td>
                {/* 5 <img src="/Icons/UI/Health.png" className="inline-icon"/>Health<br/>
                1 Known Advanced Spell <br/> */}
                Pick one more Talent from either Tier 2 or Tier 4.
                alternatively, you can get a Feat instead.
            </td>
        </tr>
        <tr>
            <td>Level 10</td>
            <td>
                {/* 5 <img src="/Icons/UI/Health.png" className="inline-icon"/>Health<br/>
                1 Known Advanced Spell <br/> */}
                Talent from your Specialization (Tier 5)
            </td>
        </tr>
    </TableNormal>
)