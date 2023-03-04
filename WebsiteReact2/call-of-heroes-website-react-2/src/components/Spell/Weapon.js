
import './Spell.css'
import PageH2 from './../PageH2/PageH2'
import Separator from './../Separator/Separator'
import React from 'react'
import Icon from '../Icon'
import { insertBetweenAll, ifOk, stringReplaceAllMany } from '../../utils'

export default function Weapon({ weapon, isActuallyArmor }) {

    console.log({weapon})

    if (weapon == null) {
        throw `Given null weapon to Weapon: ${weapon}`
    }
    if (weapon.Name == null) {
        console.log({weapon})
        throw `Weapon has no Name (printed above): ${weapon}`
    }

    let {
        Name,
        Stat,
        Hands,
        Special,
        Requirement,
        Damage,
        Range,
        Effect,
        Description,
        Alternatives,
        Notes,
        Downside
    } = weapon

    const ArmorBonus = weapon['Armor Bonus']

    const iconName = stringReplaceAllMany(Name, [' ', '/', '%'], ['_', '_', ''])

    let descriptionElements = [
        Damage == null? null : (
            <span key="Damage">{ Damage } <Icon name="Damage"/>Damage</span>
        ),
        ArmorBonus == null? null : (
            <span key="ArmorBonus">{ ArmorBonus } <Icon name="Defense"/>Defense</span>
        ),
        Effect == null? null : (
            <span key="Effect" style={{ color: 'rgb(0, 180, 0)' }}>{ Effect }</span>
        ),
        Downside == null? null : (
            <span key="Downside" style={{ color: 'red' }}>{ Downside }</span>
        )
    ].filter(elem => elem != null)
    descriptionElements = insertBetweenAll(descriptionElements, (key) => (<span key={key}><br/><br/></span>))

    const extraText = 
        [
            Description,
            Notes,
            Alternatives == null? null : `Alternatives: ${Alternatives}`
        ]
        .filter(thing => thing != null && thing.length > 0)
        .join('\n\n')

    return (
        <div className={`spell`}>
            <div className="spell__border"></div>
            <div className="spell__background"></div>
            <div className='spell__box'> {/* This has CSS to be perfectly in the bounds of the borders and banner */}
                <div className='spell-top'>
                    <div className='spell-top__icon-side'>
                        <img src={`/Icons/Items/${iconName}.png`}/>
                    </div>
                    <div className='spell-top__title-side'>
                        <div className='spell-top__title__wrapper'>
                            <div className='spell-top__title'>{Name}</div>
                        </div>
                        <div className='spell-top__stats'>
                            { Hands != null && (<div><img src="/Icons/UI/Special.png" className="inline-icon--spell"/>{ Hands }</div>) }
                            { Stat != null && (<div><img src="/Icons/UI/Hand.png" className="inline-icon--spell"/>{ Stat }</div>) }
                            { Special != null && (<div><img src="/Icons/UI/Hand.png" className="inline-icon--spell"/>{ Special }</div>) }
                            { Range != null && (<div><img src="/Icons/UI/Range.png" className="inline-icon--spell"/>{ Range }</div>) }
                            { Requirement != null && (<div><img src="/Icons/UI/Level.png" className="inline-icon--spell"/><span style={{color: '#FF5A00'}}>Requires { Requirement }</span></div>) }
                        </div>
                    </div>
                </div>
                <Separator/>
                <div className='spell-description'>
                    { descriptionElements }
                </div>
                <div className='spell-notes'>
                    { extraText }
                </div>
            </div>
        </div>
    )
}