import React from 'react'

import TwoColumns from '../TwoColumns/TwoColumns'
import Column from '../TwoColumns/Column'

import Icon from '../Icon'

export default function PHealthAndArmor() {
    return (
        <div>
            <p>When you create your character, your total starting Health will be:</p>
            <p>
                <b><Icon name="Health"/>Race Health + <Icon name="Health"/>Class Health + Might.</b>
            </p>
            <p>You also start with an armor of choice from the Armors list, as long as you can wear it.</p>
        </div>
    )
}