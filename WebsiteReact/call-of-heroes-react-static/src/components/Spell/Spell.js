
import './Spell.css'
import PageH2 from './../PageH2/PageH2'
import Separator from './../Separator/Separator'
import React from 'react'

export default function Spell({ children, spell }) {

    let {
        Name,
        A,
        Cost,
        Range,
        Cooldown,
        Effect,
        Notes,
        Requirement
    } = spell

    if (Name.startsWith('~')) Name = Name.substring(1, Name.length - 1)

    const iconName = Name.replaceAll(' ', '_')
    const iconPath = `/Icons/Spells/${iconName}.png`

    return (
        <div className='spell'>
            <div className="spell__border"></div>
            {/* <div className="spell__banner"></div> */}
            <div className="spell__background"></div>
            <div className='spell__box'> {/* This has CSS to be perfectly in the bounds of the borders and banner */}
                <div className='spell-top'>
                    <div className='spell-top__icon-side'>
                        <img width="90" height="90" src={iconPath}/>
                    </div>
                    <div className='spell-top__title-side'>
                        <div className='spell-top__title__wrapper'>
                            <div className='spell-top__title'>{Name}</div>
                        </div>
                        <div className='spell-top__stats'>
                            { A != null && (<div><img src="/Icons/UI/Hand.png" className="inline-icon"/>{ A }</div>) }
                            { Cost != null && (<div><img src="/Icons/UI/Charge.png" className="inline-icon"/>{ Cost }</div>) }
                            { Range != null && (<div><img src="/Icons/UI/Range.png" className="inline-icon"/>{ Range }</div>) }
                            { Cooldown != null && (<div><img src="/Icons/UI/Cooldown.png" className="inline-icon"/>{ Cooldown }</div>) }
                        </div>
                    </div>
                </div>
                <Separator/>
                <div className='spell-description'>
                    { Effect }
                </div>
                <div className='spell-notes'>
                    { Notes }
                </div>
            </div>
        </div>
    )
}