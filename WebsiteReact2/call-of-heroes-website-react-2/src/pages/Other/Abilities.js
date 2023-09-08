import React, { useState } from 'react'

import abilities from '../../databases/Abilities.json'
import spellSchoolDescriptions from '../../databases/Other/SpellSchoolDescriptions.json'

import PageH1 from '../../components/PageH1/PageH1'
import PageH3 from '../../components/PageH3/PageH3'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'
import { SideMenu } from '../../components/SideMenu/SideMenu'

import { spellsFromObject } from '../../utils.js'

function AllSpellsSeparatedInLevels({allSpellsInCategoryArray}) {
    // console.log(allSpellsInCategoryArray)
    const spells = allSpellsInCategoryArray
    const spellsWithNoRequirement = []
    const spellsByRequirement = {}

    // console.log(spells.length)
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

    return (
        <div>
            <ManySpells spells={spellsWithNoRequirement}/>
            { requirementsNamesOrder.map(req => (
                <div>
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

    console.log(spellsFromObject)
    console.log(abilities['Bloodshed'])

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