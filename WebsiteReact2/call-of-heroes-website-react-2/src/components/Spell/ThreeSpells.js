import React from 'react'
import TwoColumns from '../TwoColumns/TwoColumns'
import Column from '../TwoColumns/Column'
import Spell from './Spell'
import TwoSpells from './TwoSpells'
import { sortObjectArrayByKey, spellsFromObject } from '../../utils'
import ThreeColumns from '../TwoColumns/ThreeColumns'

// Returns many TwoColumns, each fitting 2 spells.
export default function ThreeSpells({ spells, spellsObject }) {

    if (spells == null && spellsObject != null) {
        spells = spellsFromObject(spellsObject)
    }
    spells = sortObjectArrayByKey(spells, 'OrderOnWebsite')

    if (spells.length != 3) {
        console.log({spells})
        console.warn(`Not 3 Spells given to ThreeSpells. Object above.`)
        return <div></div>
    }

    return (
        <ThreeColumns>
            <Column><Spell spell={spells[0]}/></Column>
            <Column><Spell spell={spells[1]}/></Column>
            <Column><Spell spell={spells[2]}/></Column>
        </ThreeColumns>
    )

}