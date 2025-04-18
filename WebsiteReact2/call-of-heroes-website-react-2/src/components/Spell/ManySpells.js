import React, { useState } from 'react'
import TwoColumns from '../TwoColumns/TwoColumns'
import Column from '../TwoColumns/Column'
import Spell from './Spell'
import TwoSpells from './TwoSpells'
import { sortObjectArrayByKey, spellsFromObject, splitArrayEvenly } from '../../utils'
import { SADescription } from '../InsertableTemplates/RaceClassComponents'

// Returns many TwoColumns, each fitting 2 spells.
export default function ManySpells({ spells, spellStyle, shouldIgnoreAlignment, description, selectedSpellNames, setSelectedSpellNames }) {

    spells = Array.isArray(spells) ? spells : spellsFromObject(spells)
    spells = sortObjectArrayByKey(spells, 'OrderOnWebsite')

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

    // function onSpellClick(spell, newIsSelected) {
    //     const wasAlreadySelected = selectedSpells.find(s => s.Name == spell.Name) != null
    //     if (wasAlreadySelected && newIsSelected == true) {
    //         return
    //     }
    //     if (!wasAlreadySelected && newIsSelected == false) {
    //         return
    //     }
        
    //     let newSelectedSpells = []
    //     if (!wasAlreadySelected && newIsSelected == true) {
    //         newSelectedSpells = [...selectedSpells, spell]
    //     }
    //     if (wasAlreadySelected && newIsSelected == false) {
    //         newSelectedSpells = selectedSpells.filter(s => s.Name != spell.Name)
    //     }
    //     setSelectedSpells(newSelectedSpells)
    //     onSpellsSelected(newSelectedSpells)
    // }

    function SpellsInColumn({ spells }) {
        if (selectedSpellNames == null || setSelectedSpellNames == null) {
            return (
                <>
                    { spells.map(spell => <Spell key={spell.Name} spell={spell} style={spellStyle}/>) }
                </>
            )
        }

        return (
            <>
                { spells.map(spell => <Spell
                    key={spell.Name} spell={spell} style={spellStyle}
                    isSelected={selectedSpellNames.includes(spell.Name)}
                    onSelected={newIsSelected => {
                        if (newIsSelected == true) {
                            setSelectedSpellNames([...selectedSpellNames, spell.Name])
                        } else {
                            setSelectedSpellNames(selectedSpellNames.filter(spellName => spellName != spell.Name))
                        }
                    }}
                />)}
            </>
        )
    }
    
    return (
        <TwoColumns>
            <Column>
                <SpellsInColumn spells={column1Spells}/>
            </Column>
            {/* <Column> */}
                {/* {column1Spells.map(spell => (
                    <Spell onSelected={ onSpellsSelected == null? null: isSelected => {
                        onSpellClick(spell, isSelected)
                    }} key={spell.Name} spell={spell} style={spellStyle}/>))} */}
                
            {/* </Column> */}
            <Column>
                <SpellsInColumn spells={column2Spells}/>
                {/* {column2Spells.map(spell => (
                    <Spell onSelected={ onSpellsSelected == null? null: isSelected => {
                        onSpellClick(spell, isSelected)
                    }} key={spell.Name} spell={spell} style={spellStyle}/>))
                } */}
                {/* {column2Spells.map(spell => (
                    selectedSpellNames == null || setSelectedSpellNames == null ? (
                        <Spell key={spell.Name} spell={spell} style={spellStyle}/>
                    ) : (
                        <Spell
                            key={spell.Name} spell={spell} style={spellStyle}
                            isSelected={selectedSpellNames.includes(spell.Name)}
                            setIsSelected={setSelectedSpellNames(...selectedSpellNames, spell.Name)}
                        />
                    )
                ))} */}
                { description != null && (<SADescription description={description}/>) }
            </Column>
        </TwoColumns>
    )

}