import React, { useEffect, useRef } from 'react'

import './AbilitySheets.css'

import { useState } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'

import * as U from '../../utils'

import ManyBoxes from '../../components/Spell/ManyBoxes'
import PageH2 from '../../components/PageH2/PageH2'
import PageH1 from '../../components/PageH1/PageH1'
import Page from '../../containers/Page/Page'

import Rules from '../../databases/Rules/Rules.json'
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import TwoColumnsDescriptive from '../../components/TwoColumns/TwoColumnsDescriptive'
import Column from '../../components/TwoColumns/Column'


import BasicAbilities from '../../databases/Abilities.json'
import feats from '../../databases/Feats.json'
import classAndRaceAbilities from '../../databases/ClassAndRaceAbilities.json'

import ManySpells from '../../components/Spell/ManySpells'
import PageH0 from '../../components/PageH0/PageH0'

import { CanvasManager } from './abilitySheetsCanvas'
import Spell from '../../components/Spell/Spell'
import PageH3 from '../../components/PageH3/PageH3'

export default function AbilitySheetsPrint() {

    document.title = 'Ability Sheets (Print)'

    const allBasicAbilities = U.getAllSpellsFromCategoriesObject(BasicAbilities)
    const allFeats = U.getAllSpellsFromCategoriesObject(feats)
    const allClassAndRaceAbilities = U.spellsFromObject(classAndRaceAbilities)
    const allAvailableSpells = [...allBasicAbilities, ...allFeats, ...allClassAndRaceAbilities]
    const allAvailableSpellsByName = {}
    for (const spell of allAvailableSpells) {
        if (allAvailableSpellsByName[spell.Name] == null) {
            allAvailableSpellsByName[spell.Name] = spell
        }
    }
    const allAvailableSpellNames = Object.keys(allAvailableSpellsByName).sort()

    const [spellsAdded, setSpellsAdded] = useState([])
    const [currentlyTypedSpell, setCurrentlyTypedSpell] = useState('Fire Ball')
    const [selectedSpellIndex, setSelectedSpellIndex] = useState(-1)
    const [searchParams, setSearchParams] = useSearchParams({})

    function updateSpellsAdded(newSpellsAdded) {
        setSpellsAdded(newSpellsAdded)
        setSearchParams({ spellsAdded: JSON.stringify(newSpellsAdded) })
    }

    function queueSpell() {
        updateSpellsAdded([...spellsAdded, currentlyTypedSpell])
    }
    function resetSpells() {
        updateSpellsAdded([])
    }
    function removeSpellFromSelect() {
        if (selectedSpellIndex == -1) {
            return
        }
        if (selectedSpellIndex == 0) {
            updateSpellsAdded(spellsAdded.slice(1))
            return
        }
        if (selectedSpellIndex == spellsAdded.length - 1) {
            updateSpellsAdded(spellsAdded.slice(0, selectedSpellIndex))
            return
        }
        updateSpellsAdded([...spellsAdded.slice(0, selectedSpellIndex), ...spellsAdded.slice(selectedSpellIndex + 1)])
    }


    const canvasDivRef = useRef()
    useEffect(() => {
        const canvasDiv = canvasDivRef.current
        CanvasManager.setCanvasesParent(canvasDiv)
        CanvasManager.setIconPathGetter(name => Spell.getIconPathByName(name))
    }, [])

    function generate() {
        CanvasManager.clear()
        for (const spellName of spellsAdded) {
            const spellAdded = allAvailableSpellsByName[spellName]
            CanvasManager.addSpell(spellAdded)
        }
    }


    // To ignore a stupid warning from MUI
    function _isOptionEqualToValueIgnoreWarning(option, value) { if (value == null) return true; else return value == option }

    return (
        <Page>

            <PageH1 style={{ textAlign: 'center' }}>Ability Sheets (Print)</PageH1>

            
            <div className='centered-content margined-bottom'>
                <div style={{ width: '300px', margin: 'auto', display: 'block' }}>
                    <select className='margined-bottom' id='Spell-Choices' onChange={evt => { setCurrentlyTypedSpell(evt.target.value); console.log(evt.target.value) }}>
                        { allAvailableSpellNames.map(name => (<option value={name} key={name}>{ name }</option>)) }
                    </select>
                    <button className='Basic-button' onClick={queueSpell} style={{ margin: 'auto', display: 'block' }}>Add</button>
                </div>
            </div>

            <div className='centered-content margined-bottom'>
                <select multiple id="Added-Spells" onChange={(evt) => { setSelectedSpellIndex(evt.target.selectedIndex) }}>
                    { spellsAdded.map(name => <option key={name} value={name}>{ name }</option>) }
                </select>
            </div>

            <div className='centered-content margined-bottom'>
                <button className='Basic-button' id="Reset" onClick={resetSpells} title = "Click here to reset everything.">Reset</button>
                <button className='Basic-button' id="RemoveSpell" onClick={removeSpellFromSelect} title = "Click here to remove the selected spell">Remove Spell</button>
                <button className='Basic-button' id="Generate" onClick={generate} title = "Click here to generate your images">Generate</button>
            </div>
            <div>
                <PageH3>How To Use</PageH3>
                <p>
                    Add all your Abilities by selecting each from the dropdown menu and clicking Add.
                    After you're done, click on Generate to get your Ability Sheets. This will create some images containing your spells.
                    You can right-click on each image and hit the "Save image as" button to save them as PNG files, which you can easily print afterwards.
                    These images are very high resolution, so they will look good when printed on paper!
                </p>
            </div>

            <div ref={canvasDivRef} id="Canvas-Wrapper">

            </div>

        </Page>
    )
}


