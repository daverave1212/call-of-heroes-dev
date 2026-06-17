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

export default function ManySpells({ id, className, spells, spellStyle, description, selectedSpellNames, onSpellClick, spellsMetadata={}, areItems=false, buttonText, childrenLeft, childrenRight, shouldSort=true, shouldAlignByHeight=true, hasCopyButton=false, sortCriteria=null, onXClick=null }) {

    if (hasCopyButton && id == null) {
        console.error(`ManySpells has copy button but id is ${id}`)
    }

    if (sortCriteria != null) {
        if (shouldSort == false) {
            console.warn(`Invalid Parameters Warning: ManySpells with spells printed above got shouldSort false, but a sortCriteria=${sortCriteria}.`)
        }
        shouldSort = true
    }

    spells = Array.isArray(spells) ? spells : spellsFromObject(spells)
    
    const wideSpells = spells.filter(spell => spell.IsWide)
    const nonWideSpells = spells.filter(spell => !spell.IsWide)
    const [column1Spells, column2Spells] = shouldAlignByHeight? splitSpellsArrayInto2Columns(nonWideSpells, shouldSort, sortCriteria): splitArrayEvenly(nonWideSpells)

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
                <Column>
                    <SpellsInColumn spells={column1Spells}/>
                    { childrenLeft }
                </Column>
                <Column>
                    <SpellsInColumn spells={column2Spells}/>
                    { description != null && (<SADescription description={description}/>) }
                    { childrenRight }
                </Column>
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