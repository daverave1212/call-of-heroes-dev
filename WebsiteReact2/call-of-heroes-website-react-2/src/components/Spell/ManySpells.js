import React from 'react'
import TwoColumns from '../TwoColumns/TwoColumns'
import Column from '../TwoColumns/Column'
import Spell from './Spell'
import TwoSpells from './TwoSpells'
import { sortObjectArrayByKey, spellsFromObject } from '../../utils'

// Returns many TwoColumns, each fitting 2 spells.
export default function ManySpells({ spells, spellsObject, spellStyle, shouldIgnoreAlignment }) {

    if (spells == null && spellsObject != null) {
        spells = spellsFromObject(spellsObject)
    }
    spells = sortObjectArrayByKey(spells, 'OrderOnWebsite')

    if (spells.length == 0) {
        return (<div></div>)
    }
    if (spells.length == 1) {
        return (
            <TwoColumns>
                <Column>
                    <Spell spell={spells[0]}/>
                </Column>
                <Column></Column>
            </TwoColumns>
        )
    }

    let column1Spells = []
    let column2Spells = []
    let spellsRest = [...spells]
    if (shouldIgnoreAlignment !== true) {
        column1Spells = spells.filter(spell => spell.AlignOnWebsite == 'Left')
        column2Spells = spells.filter(spell => spell.AlignOnWebsite == 'Right')
        spellsRest = spells.filter(spell => spell.AlignOnWebsite == null)
    }
    
    const middleIndex = spellsRest.length % 2 === 0? (spellsRest.length / 2) : (Math.floor(spellsRest.length / 2) + 1)

    for (let i = 0; i < spellsRest.length; i++) {
        if (i < middleIndex) {
            column1Spells.push(spellsRest[i])
        } else {
            column2Spells.push(spellsRest[i])
        }
    }

    return (
        <TwoColumns>
            <Column>
                {column1Spells.map(spell => (<Spell key={spell.Name} spell={spell} style={spellStyle}/>))}
            </Column>
            <Column>
                {column2Spells.map(spell => (<Spell key={spell.Name} spell={spell} style={spellStyle}/>))}
            </Column>
        </TwoColumns>
    )

}