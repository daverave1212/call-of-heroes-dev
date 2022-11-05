
import Spell from './Spell'
import TwoColumns from '../TwoColumns/TwoColumns'
import Column from '../TwoColumns/Column'

import './Spell.css'

import React from 'react'

export default function TwoSpells({ spells }) {
    if (spells == null || spells.length == 0)
        throw `TwoSpells spells given should be an array of spell objects`

    return (
        <TwoColumns>
            <Column>
                <Spell spell={spells[0]}/>
            </Column>
            <Column>
                <Spell spell={spells[1]}/>
            </Column>
        </TwoColumns>
    )
}