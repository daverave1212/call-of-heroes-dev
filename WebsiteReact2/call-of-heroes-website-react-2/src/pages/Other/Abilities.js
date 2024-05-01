import React, { useState } from 'react'

import abilities from '../../databases/Abilities.json'
import spellSchoolDescriptions from '../../databases/Other/SpellSchoolDescriptions.json'

import PageH1 from '../../components/PageH1/PageH1'
import PageH3 from '../../components/PageH3/PageH3'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'
import { SideMenu } from '../../components/SideMenu/SideMenu'

import { groupBy, spellsFromObject } from '../../utils.js'
import { useLocation } from 'react-router-dom'
import TableNormal from '../../components/TableNormal/TableNormal.js'

function AllSpellsSeparatedInLevels({allSpellsInCategoryArray}) {
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

    const requirementsNamesOrder = Object.keys(spellsByRequirement).sort()

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
            <ManySpells spells={spellsWithNoRequirement}/>
            { requirementsNamesOrder.map(req => (
                <div key={req}>
                    <br/>
                    <PageH3>{req}</PageH3>
                    <br/>
                    <ManySpells spells={spellsByRequirement[req]}/>
                </div>
            )) }
        </div>
    )
}

export default function Abilities() {

    const categories = Object.keys(abilities).filter(c => c != 'default')
    const physicalAbilities = ['Default Moves', 'Bloodshed', 'Warfare']
    const nonPhysicalSpells = categories.filter(c => physicalAbilities.includes(c) == false)

    document.title = 'Abilities (Basic)'

    return (
        <div>
            <SideMenu sections={{
                'Physical Abilities': physicalAbilities,
                'Spells': nonPhysicalSpells
            }}/>
            { categories.map(categoryName => (
                <Page title={categoryName} isSecondaryPage={true}>
                    <p>{ spellSchoolDescriptions[categoryName] }</p>
                    <AllSpellsSeparatedInLevels allSpellsInCategoryArray={spellsFromObject(abilities[categoryName])}/>
                </Page>
            )) }
        </div>
    )

}