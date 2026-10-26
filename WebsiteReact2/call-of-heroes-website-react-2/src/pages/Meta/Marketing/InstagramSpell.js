
import { useLocation } from 'react-router-dom'
import { useConstAllSpellsByName } from '../../../services/content-providers/SpellProvider'
import './InstagramSpell.css'
import { useEffect, useState } from 'react'
import Spell from '../../../components/Spell/Spell'
import { getSpellIconPathByName } from '../../../utils'

export default function InstagramSpell() {

    const [_, spellName] = window.location.href.split('#')
    const allSpells = useConstAllSpellsByName()
    const [isRendering, setIsRendering] = useState(false)


    function play(evt) {
        setIsRendering(true)
    }

    useEffect(() => {
        window.addEventListener("keydown", play);

        return () => {
            window.removeEventListener("keydown", play);
        };
    }, []);

    return <div className='width-100 flex row gap-4' style={{paddingTop: '100px', paddingBottom: '100px'}}>
        <div style={{paddingLeft: '4rem'}}>
            <textarea>
                dasdasdsad
            </textarea>
        </div>
        <div className='ig-post relative center-content padding-left-2 padding-right-2'>
            <div className='flex-shrink z-content'>
                { isRendering && <Spell spell={allSpells[spellName]}/> }
            </div>
            <div className='absolute width-100 height-100'>
                <img className='height-100 cover z-background' style={{opacity: 0.25}} src={`${getSpellIconPathByName(spellName)}`}/>
            </div>
        </div>
    </div>
    

}