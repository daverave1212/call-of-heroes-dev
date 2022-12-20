
import './Spell.css'
import PageH2 from './../PageH2/PageH2'
import Separator from './../Separator/Separator'
import React from 'react'
import { stringReplaceAllMany } from '../../utils'

export default function Spell({ children, spell, style, hasIcon }) {

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
    if (hasIcon == null) hasIcon = true

    if (Name.startsWith('~')) Name = Name.substring(1, Name.length - 1)

    const iconName = stringReplaceAllMany(Name, [' ', '/', '%'], ['_', '_', ''])
    const iconPath = `/Icons/Spells/${iconName}.png`

    const spellNormalOrSubClass = IsSubspell == true? 'spell--subspell' : 'spell--normal'
    const spellPassiveOrActiveClass = A == 'Passive' == true? 'spell--passive' : 'spell--active'

    function SpellTopStats({className}) {
        return (
            <div className={`spell-top__stats ${className}`}>
                { A != null && (<div><img src="/Icons/UI/Hand.png" className="inline-icon--spell"/>{ A }</div>) }
                { Cost != null && (
                    <div>
                        <img src={ Cost.endsWith('Insight')? "/Icons/UI/Insight.png" : "/Icons/UI/Mana.png" } className="inline-icon--spell"/>
                        { Cost }
                    </div>
                ) }
                { Range != null && (<div><img src="/Icons/UI/Range.png" className="inline-icon--spell"/>{ Range }</div>) }
                { Cooldown != null && (<div><img src="/Icons/UI/Cooldown.png" className="inline-icon--spell"/>{ Cooldown }</div>) }
                { Requirement != null && (
                    <div>
                        <img src="/Icons/UI/Level.png" className="inline-icon--spell"/>
                        <span style={{color: '#FF5A00'}}>Requires { Requirement }</span>
                    </div>
                ) }
            </div>
        )
    }

    return (
        <div className={`spell ${spellNormalOrSubClass} ${spellPassiveOrActiveClass}`} style={style}>
            <div className="spell__border"></div>
            <div className="spell__background"></div>
            <div className='spell__box'> {/* This has CSS to be perfectly in the bounds of the borders and banner */}
                { hasIcon? (
                    <div className='spell-top'>
                        <div className='spell-top__icon-side'>
                            <img src={iconPath}/>
                        </div>
                        <div className='spell-top__title-side'>
                            <div className='spell-top__title__wrapper'>
                                <div className='spell-top__title'>{ DisplayName != null? DisplayName : Name }</div>
                            </div>
                            <SpellTopStats/>
                        </div>
                    </div>
                ) : (
                    <div className='spell-top'>
                        <div style={{width: '100%'}}>
                            <div className='spell-top--iconless__title-wrapper'>
                                <div className='spell-top--iconless__title'>{ Name }</div>
                            </div>
                            <div style={{width: '70%', margin: 'auto'}}>
                                <SpellTopStats className="spell-top__stats--no-padding-side"/>
                            </div>
                        </div>
                    </div>
                    
                )}
                
                <Separator hasNoMarginTop={true}/>
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