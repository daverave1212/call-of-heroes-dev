import React, { useState } from 'react'
import TwoColumns from '../TwoColumns/TwoColumns'
import Column from '../TwoColumns/Column'
import Spell from './Spell'
import TwoSpells from './TwoSpells'
import { addAbilityOrOpenPopup, sortObjectArrayByKey, spellsFromObject, splitArrayEvenly } from '../../utils'
import { SADescription } from '../InsertableTemplates/RaceClassComponents'

// Returns many TwoColumns, each fitting 2 spells.
export default function ManySpells({ className, spells, spellStyle, shouldIgnoreAlignment, description, selectedSpellNames, setSelectedSpellNames, areItems=false, onSpellClick, buttonText }) {

    spells = Array.isArray(spells) ? spells : spellsFromObject(spells)
    spells = sortObjectArrayByKey(spells, 'OrderOnWebsite')

    console.log({spells})

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

    function SpellsInColumn({ spells }) {
        
        const isSelected = spell => selectedSpellNames != null && spell != null && selectedSpellNames.includes(spell.Name)
        const onClick = spell => {
            if (onSpellClick != null) {
                onSpellClick(spell)
            }
            if (setSelectedSpellNames != null) {
                addAbilityOrOpenPopup(spell, selectedSpellNames, setSelectedSpellNames, null)
            }
        }

        return (
            <>
                { spells.map(spell => {
                    if (spell == null) {
                        console.warn(`Null spell in spells:`)
                        console.log({spells})
                        return null
                    } else {
                        return <Spell
                            isItem={areItems} 
                            key={spell.Name} spell={spell} style={spellStyle}
                            onClick={onClick} buttonText={buttonText}
                            isSelected={isSelected(spell)}
                        />
                    }
                })}
            </>
        )
    }
    
    return (
        <TwoColumns className={className}>
            <Column>
                <SpellsInColumn spells={column1Spells}/>
            </Column>
            <Column>
                <SpellsInColumn spells={column2Spells}/>
                { description != null && (<SADescription description={description}/>) }
            </Column>
        </TwoColumns>
    )

}