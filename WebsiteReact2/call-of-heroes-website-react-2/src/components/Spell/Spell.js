
import './Spell.css'
import PageH2 from './../PageH2/PageH2'
import Separator from './../Separator/Separator'
import React from 'react'
import { parseTextWithSymbols, stringReplaceAllMany } from '../../utils'
import TableNormal from '../TableNormal/TableNormal'

// Attached as a static function to Spell, at the end of the document
function getIconPathByName(name) {
    const iconName = stringReplaceAllMany(name, [' ', '/', '%'], ['_', '_', ''])
    const iconPath = `/Icons/Spells/${iconName}.png`
    return iconPath
}

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
        Duration,
        HasMixins,
        Effect,
        Notes,
        Requirement,
        IsSubspell,
        Upgrade,
        DoubleTableNumbered,
        DoubleTable
    } = spell
    let DisplayName = spell['Display Name']
    
    if (Name == null || (typeof Name) != 'string') {
        Name = 'Default'
    }
    if (hasIcon == null) hasIcon = true

    if (Name.startsWith('~')) Name = Name.substring(1, Name.length - 1)

    const iconPath = getIconPathByName(Name)

    const spellNormalOrSubClass = IsSubspell == true? 'spell--subspell' : 'spell--normal'
    const spellPassiveOrActiveClass = A == 'Passive' == true? 'spell--passive' : 'spell--active'

    if (HasMixins === true) {
        try {
            Effect = parseTextWithSymbols(Effect)
            if (Notes != null) Notes = parseTextWithSymbols(Notes)
        } catch (e) {
            throw `Error in Spell ${Name} parsing text: ${e}`
        }
    }

    let tableHeaders = null
    const newTableValuePairs = []
    if (DoubleTableNumbered != null) {
        tableHeaders = DoubleTableNumbered.Headers
        const values = DoubleTableNumbered.Values
        for (let i = 0; i < values.length; i++) {
            if (i % 2 == 1) {
                newTableValuePairs.push({
                    value1: `${i}. ${values[i-1]}`,
                    value2: `${i+1}. ${values[i]}`
                })
            }
        }
    }
    if (DoubleTable != null) {
        tableHeaders = DoubleTable.Headers
        const values = DoubleTable.Values
        for (let i = 0; i < values.length; i++) {
            if (i % 2 == 1) {
                newTableValuePairs.push({
                    value1: values[i-1],
                    value2: values[i]
                })
            }
        }
    }

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
                { Duration != null && (<div><img src="/Icons/UI/Duration.png" className="inline-icon--spell"/>{ Duration }</div>) }
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
                { Upgrade != null && (
                    <div className='spell-upgrade'>
                        { Upgrade }
                    </div>
                ) }
                { Notes != null && (
                    <div className='spell-notes'>
                        { Notes }
                    </div>
                ) }
                { (DoubleTable != null || DoubleTableNumbered != null) && (
                    <TableNormal columns={tableHeaders} hasBorder={false}>
                        { newTableValuePairs.map(pair => (
                            <tr>
                                <td>{ pair.value1 }</td>
                                <td>{ pair.value2 }</td>
                            </tr>
                        )) }
                    </TableNormal>
                ) }
            </div>
        </div>
    )
}

Spell.getIconPathByName = getIconPathByName