import React, { useState } from 'react'

import abilities from '../../databases/Abilities.json'
import spellSchoolDescriptions from '../../databases/Other/SpellSchoolDescriptions.json'

import PageH1 from '../../components/PageH1/PageH1'
import PageH3 from '../../components/PageH3/PageH3'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'
import { SideMenu } from '../../components/SideMenu/SideMenu'

import { groupBy, range, spellsFromObject, splitArrayEvenly } from '../../utils.js'
import { useLocation } from 'react-router-dom'
import TableNormal from '../../components/TableNormal/TableNormal.js'
import ThreeColumns from '../../components/TwoColumns/ThreeColumns.js'
import Selector from '../../components/Selector/Selector.js'
import { QGTitle1 } from '../Tools/TitleGenerator.js'

function SpellCategorySelector({ name, iconName, isSelected, onClick }) {
    return <Selector
        name={name}
        src={`/Icons/Spells/${iconName}.png`}
        isSelected={isSelected}
        onClick={onClick}
    />
}

function AllSpellsSeparatedInLevels({allSpellsInCategoryArray, selectedSpellNames, setSelectedSpellNames}) {
    const spells = allSpellsInCategoryArray
    const spellsWithNoRequirement = []
    const spellsByRequirement = {}
    const isDebugMode = window.location.href.includes('localhost:')

    for (const spell of spells) {
        if (spell.Requirement == null) {
            spellsWithNoRequirement.push(spell)
        } else {
            if (spellsByRequirement[spell.Requirement] == null) {
                spellsByRequirement[spell.Requirement] = []
            }
            spellsByRequirement[spell.Requirement].push(spell)
        }
    }

    const requirementsNamesOrder = Object.keys(spellsByRequirement).sort((a, b) => a.length - b.length || a.localeCompare(b))

    function SpellGroups() {
        const freeSpells = spells.filter(s => s.Cost == null)
        const manaSpells = spells.filter(s => s.Cost != null)
        const freeGroupsByTags = groupBy(freeSpells, spell => spell.Tag)
        const manaGroupsByTags = groupBy(manaSpells, spell => spell.Tag)
        return (
            <div>
                <TableNormal columns={['Tag', 'Spells']}>
                    { Object.keys(freeGroupsByTags).sort().map(tag => 
                        <tr>
                            <td>{ tag }</td>
                            <td>{ freeGroupsByTags[tag].map(s => s.Name).join(', ') }</td>
                        </tr>
                    ) }
                </TableNormal>
                <TableNormal columns={['Tag', 'Spells (Mana)']}>
                    { Object.keys(manaGroupsByTags).sort().map(tag => 
                        <tr>
                            <td>{ tag }</td>
                            <td>{ manaGroupsByTags[tag].map(s => s.Name).join(', ') }</td>
                        </tr>
                    ) }
                </TableNormal>
            </div>
        )
    }

    return (
        <div>
            { isDebugMode && <SpellGroups/> }
            <ManySpells spells={spellsWithNoRequirement} selectedSpellNames={selectedSpellNames} setSelectedSpellNames={setSelectedSpellNames}/>
            { requirementsNamesOrder.map(req => (
                <div key={req}>
                    <br/>
                    <PageH3>{req}</PageH3>
                    <br/>
                    <ManySpells spells={spellsByRequirement[req]} selectedSpellNames={selectedSpellNames} setSelectedSpellNames={setSelectedSpellNames}/>
                </div>
            )) }
        </div>
    )
}

/* selectorData: { name: string, src: string } */
export function SelectorsByColumns({ className, selectorData, nColumns, selectedSelectorName, setSelectedSelectorName, onSelectorClick, getSelectedSelectorName }) {
    
    const columns = splitArrayEvenly(selectorData, nColumns)
    const realSelectedSelectorName =
        selectedSelectorName != null?
            selectedSelectorName:
        getSelectedSelectorName != null?
            getSelectedSelectorName():
        null

    return (
        <div className={`flex-row gap-half ${className}`} style={{width: '100%'}} >
            { range(0, nColumns).map(i => (
                <div className='flex-column gap-half' style={{flex: 1}}>
                    { columns[i].map(({name, src}) => (
                        <Selector
                            name={name}
                            src={src}
                            isSelected={realSelectedSelectorName == name}
                            onClick={() => {
                                setSelectedSelectorName?.(name)
                                onSelectorClick?.(name)
                            }}
                        />
                    ))}
                </div>
            )) }
        </div>
    )
}

export default function Abilities({ selectedSpellNames, setSelectedSpellNames, hasNoMargins }) {

    let [selectedCategoryName, setSelectedCategoryName] = useState('Default Moves')

    const categoriesSrcs = {
        'Default Moves': 'Sprint',
        'Bloodshed': 'FURY',
        'Warfare': 'Row_Through',
        'Elemental': 'Prismatic_Convergence',
        'Arcane': 'North_Star',
        'Nature': 'Tree_Stride',
        'Mysticism': 'Sending',
        'Eldritch': 'Wyrd_Renewal',
        'Divine': 'Resurrection',
        'Restricted Spells': 'Duel_to_Death'
    }

    const allCategories = Object.keys(abilities).filter(c => c != 'default')
    const selectorsData = allCategories.map(category => ({ name: category, src: `/Icons/Spells/${categoriesSrcs[category]}.png` }))

    document.title = 'Abilities (Basic)'

    return (
        <div>
            <Page hasNoMargins={hasNoMargins}>
                <div className='center-content'>
                    <QGTitle1 text="Basic Abilities" height={60}/>
                </div>

                <SelectorsByColumns nColumns={3} selectorData={selectorsData} selectedSelectorName={selectedCategoryName} setSelectedSelectorName={setSelectedCategoryName}/>
            </Page>

            { selectedCategoryName != null && (
                <Page title={selectedCategoryName} isSecondaryPage={true} hasNoMargins={hasNoMargins}>
                    <p>{ spellSchoolDescriptions[selectedCategoryName] }</p>
                    <AllSpellsSeparatedInLevels allSpellsInCategoryArray={spellsFromObject(abilities[selectedCategoryName])} selectedSpellNames={selectedSpellNames} setSelectedSpellNames={setSelectedSpellNames}/>
                </Page>
            )}

        </div>
    )

}