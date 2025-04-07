import React, { useState } from 'react'
import TwoColumns from '../TwoColumns/TwoColumns'
import Column from '../TwoColumns/Column'
import Spell from './Spell'
import TwoSpells from './TwoSpells'
import { sortObjectArrayByKey, spellsFromObject, splitArrayEvenly } from '../../utils'
import { SADescription } from '../InsertableTemplates/RaceClassComponents'

// Returns many TwoColumns, each fitting 2 spells.
export default function ManySpells({ spells, spellStyle, shouldIgnoreAlignment, onSpellsSelected, description }) {

    spells = Array.isArray(spells) ? spells : spellsFromObject(spells)
    spells = sortObjectArrayByKey(spells, 'OrderOnWebsite')

    let [selectedSpells, setSelectedSpells] = useState([])

    let column1Spells = []
    let column2Spells = []
    let spellsRest = [...spells]
    if (shouldIgnoreAlignment !== true) {
        column1Spells = spells.filter(spell => spell.AlignOnWebsite == 'Left')
        column2Spells = spells.filter(spell => spell.AlignOnWebsite == 'Right')
        spellsRest = spells.filter(spell => spell.AlignOnWebsite == null)
    }
    
    const [spellsLeft, spellsRight] = splitArrayEvenly(spellsRest, 2)
    column1Spells = [...column1Spells, ...spellsLeft]
    column2Spells = [...column2Spells, ...spellsRight]

    // const middleIndex = spellsRest.length % 2 === 0? (spellsRest.length / 2) : (Math.floor(spellsRest.length / 2) + 1)

    // for (let i = 0; i < spellsRest.length; i++) {
    //     if (i < middleIndex) {
    //         column1Spells.push(spellsRest[i])
    //     } else {
    //         column2Spells.push(spellsRest[i])
    //     }
    // }

    function onSpellClick(spell, isSelected) {
        if (isSelected) {
            if (selectedSpells.includes(spell)) {
                return
            } else {
                setSelectedSpells([...selectedSpells, spell])
            }
        } else {
            if (selectedSpells.includes(spell)) {
                setSelectedSpells(selectedSpells.filter(s => s != spell))
            } else {
                return
            }
        }
    }
    

    return (
        <TwoColumns>
            <Column>
                {column1Spells.map(spell => (
                    <Spell onSelected={ onSpellsSelected == null? null: isSelected => {
                        onSpellClick(spell, isSelected)
                    }} key={spell.Name} spell={spell} style={spellStyle}/>))}
            </Column>
            <Column>
                {column2Spells.map(spell => (<Spell onSelected={isSelected => {
                    onSpellClick(spell, isSelected)
                }} key={spell.Name} spell={spell} style={spellStyle}/>))}
                { description != null && (<SADescription description={description}/>) }
            </Column>
        </TwoColumns>
    )

}