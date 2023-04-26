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

export default function AbilitySheets() {

    document.title = 'Ability Sheet Maker'

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

    function queueSpell() {
        console.log(`Adding: ${currentlyTypedSpell}`)
        setSpellsAdded([...spellsAdded, currentlyTypedSpell])
    }
    function resetSpells() {
        setSpellsAdded([])
    }
    function removeSpellFromSelect() {
        if (selectedSpellIndex == -1) {
            return
        }
        if (selectedSpellIndex == 0) {
            setSpellsAdded(spellsAdded.slice(1))
            return
        }
        if (selectedSpellIndex == spellsAdded.length - 1) {
            setSpellsAdded(spellsAdded.slice(0, selectedSpellIndex))
            return
        }
        setSpellsAdded([...spellsAdded.slice(0, selectedSpellIndex), ...spellsAdded.slice(selectedSpellIndex + 1)])
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
        <Page>

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
            {/* <div className='centered-content margined-bottom'>
                <button className='Basic-button' onClick={generate} title="When you are done adding spells, click Generate! to get your awesome spell sheets!">Generate!</button>
                <button className='Basic-button' onClick={download} title="You need to generate the spell sheets first!">Download</button>
            </div> */}
            {/* <div id="Canvas-Wrapper">
                <SheetCanvas spellNames={}/>
            </div> */}

            <ManySpells spells={spellsAdded.map(spellName => allAvailableSpellsByName[spellName])}/>

            <div ref={canvasDivRef} id="Canvas-Div-Placeholder">

            </div>

        </Page>
    )
}



// function SheetCanvas({ spellNames }) {

//     const constants = {
// 		canvasWidth			: 2480,
// 		canvasHeight		: 3508,
// 		columnWidth			: 1175,

// 		columnPaddingSide	: 30,
// 		columnPaddingTop	: 30,
// 		columnPaddingMiddle	: 15,

// 		iconBoxWidth		: 300,
// 		iconWidth			: 200,
// 		iconPaddingSide		: 32,
// 		iconPaddingTop		: 32,

// 		textBoxMaxWidth		: 850,
// 		textBoxPaddingTop 	: 25,

// 		font				: "40px TextFont",
// 		lineHeight			: 40,
// 		backgroundColor		: "#FFFFFF",
// 		strokeColor			: "#222020",
// 		titleFont			: "45px TextFont",
// 	}

//     const canvasRef = useRef(null)

//     useEffect(() => {
//         const canvas = canvasRef.current
//         const context = canvas.getContext('2d')
//         drawOnCanvas(canvas, context)
//     }, [])

//     function drawOnCanvas(canvas, ctx) {
        
//         let spellsLeft = []
//         let spellsRight = []
        
//         let spellToDrawX = constants.columnPaddingSide
//         let spellToDrawY = constants.columnPaddingTop
//         let currentSide = 'LEFT'

//         function switchToRightSide() {
//             currentSide = 'RIGHT'
//             spellToDrawX = constants.columnWidth + constants.columnPaddingMiddle + constants.columnPaddingSide
//             spellToDrawY = constants.columnPaddingTop
//         }

//         const textBox = new U.TextBox(spellToDrawX, spellToDrawY, constants.textBoxMaxWidth, constants.font, canvas, constants.lineHeight)
//         textBox.setText('This is (or at least should be) quite a long description that would not normally fit into a column of the canvas, mind you.')
//         textBox.draw()

//     }

//     return (
//         <canvas ref={canvasRef} width={constants.canvasWidth} height={constants.canvasHeight}/>
//     )

// }




