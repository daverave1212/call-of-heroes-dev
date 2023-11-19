import React, { useEffect, useRef } from 'react'

import './AbilitySheets.css'

import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

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
import PageH3 from '../../components/PageH3/PageH3'

export default function AbilitySheets() {

    document.title = 'Ability Sheet Maker'
    const addedSpellsInURLJSON = new URLSearchParams(window.location.search).get('spellsAdded')
    const addedSpellsInURL = addedSpellsInURLJSON? JSON.parse(addedSpellsInURLJSON) : []
    console.log({addedSpellsInURL})
    
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

    const [spellsAdded, setSpellsAdded] = useState(addedSpellsInURL)
    const [currentlyTypedSpell, setCurrentlyTypedSpell] = useState('Fire Ball')
    const [selectedSpellIndex, setSelectedSpellIndex] = useState(-1)
    const [searchParams, setSearchParams] = useSearchParams({})

    function updateSpellsAdded(newSpellsAdded) {
        setSpellsAdded(newSpellsAdded)
        setSearchParams({ spellsAdded: JSON.stringify(newSpellsAdded) })
    }

    function queueSpell() {
        console.log(`Adding: ${currentlyTypedSpell}`)
        const newSpellsAdded = [...spellsAdded, currentlyTypedSpell]
        updateSpellsAdded(newSpellsAdded)
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
    function download() {

    }


    const canvasDivRef = useRef(null)
    useEffect(() => {
        const canvasDiv = canvasDivRef.current
    }, [])


    // To ignore a stupid warning from MUI
    function _isOptionEqualToValueIgnoreWarning(option, value) { if (value == null) return true; else return value == option }

    return (
        <Page hasNoLimits={true}>

            <PageH1 style={{ textAlign: 'center' }}>Ability Sheet Maker</PageH1>

            
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
            </div>
            <div>
                <PageH3>How To Use</PageH3>
                <p>
                    Add all your Abilities by selecting each from the dropdown menu and clicking Add.
                    Your spells will appear nicely on the page and you can keep them on a separate screen for reference.
                    To save your Abilities, just save the URL of the page (e.g. you can bookmark it). When you input that link again, your Abilities will be saved.
                    Note that there is also another similar page, but for printing your Abilities.
                </p>
            </div>

            <ManySpells spells={spellsAdded.map(spellName => allAvailableSpellsByName[spellName])}/>

        </Page>
    )
}


