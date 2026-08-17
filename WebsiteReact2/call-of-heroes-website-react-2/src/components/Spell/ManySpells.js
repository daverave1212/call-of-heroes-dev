import React, { useState } from 'react'
import TwoColumns from '../TwoColumns/TwoColumns'
import Column from '../TwoColumns/Column'
import Spell from './Spell'
import TwoSpells from './TwoSpells'
import { addAbilityOrOpenPopup, sortObjectArrayByKey, spellsFromObject, splitArrayEvenly, splitSpellsArrayInto2Columns } from '../../utils'
import { SADescription } from '../InsertableTemplates/RaceClassComponents'
import CopySpellButton from '../CopyButton/CopySpellButton'

export const SpellSortTypes = {
    HEIGHT: 'height',
    LEVEL_REQUIREMENT: 'level requirement',
    ACTION_POINTS: 'action points'
}

export default function ManySpells({ id, className, spells, spellStyle, description, selectedSpellNames, onSpellClick, spellsMetadata={}, areItems=false, buttonText, childrenLeft, childrenRight, shouldSort=true, shouldAlignByHeight=true, hasCopyButton=false, sortCriteria=null, onXClick=null, nColumns=2 }) {

    if (hasCopyButton && id == null) {
        console.error(`ManySpells has copy button but id is ${id}`)
    }

    if (sortCriteria != null) {
        if (shouldSort == false) {
            console.warn(`Invalid Parameters Warning: ManySpells with spells printed above got shouldSort false, but a sortCriteria=${sortCriteria}.`)
        }
        shouldSort = true
    }

    spells = (Array.isArray(spells) ? spells : spellsFromObject(spells)).filter(s => s != null && s.Name != null)   // TODO: Sometimes subspells come here with no name. How does that happen?
    nColumns = nColumns ?? areItems? /*3*/ 2: 2
    
    const wideSpells = spells.filter(spell => spell.IsWide)
    const nonWideSpells = spells.filter(spell => !spell.IsWide)
    const columnsOfSpells = shouldAlignByHeight? splitSpellsArrayInto2Columns(nonWideSpells, shouldSort, sortCriteria, nColumns): splitArrayEvenly(nonWideSpells, nColumns)
    // const [column1Spells, column2Spells, column3Spells] = shouldAlignByHeight? splitSpellsArrayInto2Columns(nonWideSpells, shouldSort, sortCriteria, nColumns): splitArrayEvenly(nonWideSpells, nColumns)

    const isSelected = spell => selectedSpellNames != null && spell != null && selectedSpellNames.includes(spell.Name)
    
    function SpellsInColumn({ spells }) {
        
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
                            metadata={spellsMetadata[spell.Name] ?? null}
                            onXClick={onXClick}
                        />
                    }
                })}
            </>
        )
    }

    function SpellColumns() {
        return (
            <TwoColumns className={className}>
                { columnsOfSpells.map((spellArr, i) => <Column>
                    <SpellsInColumn spells={spellArr}/>
                    { i == 0 && childrenLeft }
                    { i == columnsOfSpells.length - 1 && childrenRight }
                </Column>) }
            </TwoColumns>
        )
    }
    
    if (wideSpells?.length > 0) {
        return <div id={id}>
            { wideSpells.map(spell => <Spell
                isItem={areItems} 
                key={spell.Name} spell={spell} style={spellStyle}
                onClick={onSpellClick} buttonText={buttonText}
                isSelected={isSelected(spell)}
                metadata={spellsMetadata[spell.Name] ?? null}
                onXClick={onXClick}
            />) }
            <SpellColumns/>
            { hasCopyButton && <CopySpellButton elementId={id}/>}
        </div>
    }

    return <div id={id}>
        <SpellColumns/>
        { hasCopyButton && <CopySpellButton elementId={id}/>}
    </div>


}