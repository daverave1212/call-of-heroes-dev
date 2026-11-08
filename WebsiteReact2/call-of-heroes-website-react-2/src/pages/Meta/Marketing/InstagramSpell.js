
import { useLocation } from 'react-router-dom'
import { useConstAllSpellsByName } from '../../../services/content-providers/SpellProvider'
import './InstagramSpell.css'
import { useEffect, useState } from 'react'
import Spell from '../../../components/Spell/Spell'
import { getSpellIconPathByName, getUniqueSpellID, styleMargined } from '../../../utils'
import { slideIn, slideInFromOpacity0 } from '../../../services/dom/dom-animations'

export default function InstagramSpell() {

    const allSpells = useConstAllSpellsByName()

    const [_, urlSpellName] = window.location.href.split('#')

    const [spellStates, setSpellStates] = useState([{
        name: 'Awe',
        isRendering: false,
        style: { opacity: 0 }
    }])

    function play(evt) {
        const inputSpellName = document.querySelector('#Spell-Name').value
        const finalSpellName = inputSpellName?.trim()?.length > 0? inputSpellName: urlSpellName

        const finalSpellNames = finalSpellName.includes(',')? finalSpellName.split(','): [finalSpellName]
        
        setSpellStates(finalSpellNames.map(name => ({
            name,
            isRendering: true,
            style: { opacity: 0 }
        })))

        for (let i = 0; i < finalSpellNames.length; i++) {
            const delay = 1000 + i * 500
            const spellName = finalSpellNames[i]
            setTimeout(() => {
                const spellId = getUniqueSpellID(spellName)
                const spellDom = document.querySelector(`#${spellId}`)

                slideIn(spellDom, 1000)
            }, delay)
        }
    }

    return <div className='width-100 flex row gap-4' style={{paddingTop: '100px', paddingBottom: '100px'}}>
        <div className='center-content column' style={{paddingLeft: '4rem'}}>
            <input type='text' id="Spell-Name"/>
            <button onClick={play}>Render</button>
        </div>
        <div className='ig-post relative center-content padding-left-2 padding-right-2'>
            <div className='flex-shrink z-content'>
                { spellStates.map(spellState => (
                    spellState.isRendering && <Spell className="shadowed rarity-glow" style={spellState.style} spell={allSpells[spellState.name]}/>
                ) ) }
            </div>
            <div className='absolute width-100 height-100'>
                <img className='height-100 cover z-background blur' style={{opacity: 0.25}} src={`${getSpellIconPathByName(spellStates[0].name)}`}/>
            </div>
        </div>
    </div>
    

}