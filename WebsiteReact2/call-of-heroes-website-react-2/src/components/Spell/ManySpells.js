import React, { useState } from 'react'
import TwoColumns from '../TwoColumns/TwoColumns'
import Column from '../TwoColumns/Column'
import Spell from './Spell'
import TwoSpells from './TwoSpells'
import { addAbilityOrOpenPopup, sortObjectArrayByKey, spellsFromObject, splitArrayEvenly, splitSpellsArrayInto2Columns } from '../../utils'
import { SADescription } from '../InsertableTemplates/RaceClassComponents'

// Returns many TwoColumns, each fitting 2 spells.
export default function ManySpells({ className, spells, spellStyle, shouldIgnoreAlignment, description, selectedSpellNames, areItems=false, onSpellClick, buttonText }) {

    spells = Array.isArray(spells) ? spells : spellsFromObject(spells)
    
    const [column1Spells, column2Spells] = splitSpellsArrayInto2Columns(spells, shouldIgnoreAlignment)

    function SpellsInColumn({ spells }) {
        
        const isSelected = spell => selectedSpellNames != null && spell != null && selectedSpellNames.includes(spell.Name)

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
                            onClick={onSpellClick} buttonText={buttonText}
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