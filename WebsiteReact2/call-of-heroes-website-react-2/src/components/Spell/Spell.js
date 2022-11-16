
import './Spell.css'
import PageH2 from './../PageH2/PageH2'
import Separator from './../Separator/Separator'
import React from 'react'
import { stringReplaceAllMany } from '../../utils'

export default function Spell({ children, spell, style }) {

    if (spell == null) {
        throw `Given null spell to Spell: ${spell}`
    }
    if (spell.Name == null) {
        console.log({spell})
        throw `Spell has no Name (printed above): ${spell}`
    }

    let {
        Name,
        A,
        Cost,
        Range,
        Cooldown,
        Effect,
        Notes,
        Requirement,
        IsSubspell
    } = spell
    let DisplayName = spell['Display Name']
    
    if (Name == null || (typeof Name) != 'string') {
        Name = 'Default'
    }

    if (Name.startsWith('~')) Name = Name.substring(1, Name.length - 1)

    const iconName = stringReplaceAllMany(Name, [' ', '/', '%'], ['_', '_', ''])
    const iconPath = `/Icons/Spells/${iconName}.png`

    const spellNormalOrSubClass = IsSubspell == true? 'spell--subspell' : 'spell--normal'
    const spellPassiveOrActiveClass = A == 'Passive' == true? 'spell--passive' : 'spell--active'

    return (
        <div className={`spell ${spellNormalOrSubClass} ${spellPassiveOrActiveClass}`} style={style}>
            <div className="spell__border"></div>
            <div className="spell__background"></div>
            <div className='spell__box'> {/* This has CSS to be perfectly in the bounds of the borders and banner */}
                <div className='spell-top'>
                    <div className='spell-top__icon-side'>
                        <img src={iconPath}/>
                    </div>
                    <div className='spell-top__title-side'>
                        <div className='spell-top__title__wrapper'>
                            <div className='spell-top__title'>{ DisplayName != null? DisplayName : Name }</div>
                        </div>
                        <div className='spell-top__stats'>
                            { A != null && (<div><img src="/Icons/UI/Hand.png" className="inline-icon--spell"/>{ A }</div>) }
                            { Cost != null && (<div><img src="/Icons/UI/Charge.png" className="inline-icon--spell"/>{ Cost }</div>) }
                            { Range != null && (<div><img src="/Icons/UI/Range.png" className="inline-icon--spell"/>{ Range }</div>) }
                            { Cooldown != null && (<div><img src="/Icons/UI/Cooldown.png" className="inline-icon--spell"/>{ Cooldown }</div>) }
                        </div>
                    </div>
                </div>
                <Separator/>
                <div className='spell-description'>
                    { Effect }
                </div>
                { Notes != null && (
                    <div className='spell-notes'>
                        { Notes }
                    </div>
                ) }
            </div>
        </div>
    )
}