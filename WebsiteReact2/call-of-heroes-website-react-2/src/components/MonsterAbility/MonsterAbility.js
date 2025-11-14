import React from 'react'
import './MonsterAbility.css'

import { useState } from 'react'

import * as U from '../../utils'

import { SpellTopStats } from '../Spell/Spell'
import Icon from '../Icon'


// A monster ability is formatted like "- Ranged: 1d6 + 20 Slash"
export default function MonsterAbility({ability, isPassive, style}) {
    let name
    let abilityBody
    if (ability.Name != null) {
        name = ability.Name
        abilityBody = ability
    } else {
        name = Object.keys(ability)[0]
        abilityBody = ability[name]
    }

    const {
        Combo,
        EffectGreen,
        Upgrade,
        Downside
    } = abilityBody

    function AbilityEffect({children}) {
        return (<p className='monster-ability-p'>{ children }</p>)
    }

    function getAbilityBodyDiv() {
        if (U.isString(abilityBody)) {
            return <AbilityEffect>{ abilityBody }</AbilityEffect>
        }

        const effectName = U.getAnyPropNameExcept(abilityBody, ['Name', 'Damage', 'Notes', 'A', 'Special', 'Cooldown', 'Requirement', 'Range', 'Duration', 'Effect', 'ParentKey'])
        
        return (
            <div className='flex column gap-half' style={{paddingTop: '0.5rem'}}>
                { abilityBody.Damage && (
                    <p><Icon name="Damage" style={{marginTop: '2px'}}/> <span className='monster-ability_effect-desc'>{ abilityBody.Damage } Damage</span></p>
                ) }
                { abilityBody.Effect && (
                    <AbilityEffect>{ abilityBody.Effect }</AbilityEffect>
                ) }
                { effectName != null && <p style={{marginTop: '3px'}}>
                    <span className='monster-ability__effect-name'>{effectName}</span>: <span className='monster-ability__effect-desc'>{abilityBody[effectName]}</span>
                </p>}
                { Combo != null && (
                    <div className='monster-ability__effect-desc' key="Combo"><span style={{color: 'var(--blue-color)'}}>Combo: </span>{ Combo }</div>
                ) }
                { EffectGreen != null && (
                    <div className="monster-ability__effect-desc spell-green" key="EffectGreen">{ EffectGreen }</div>
                ) }
                { Downside != null && (
                    <div className="monster-ability__effect-desc spell-red" key="Downside">{ Downside }</div>
                )}
                { Upgrade != null && (
                    <div className='monster-ability__effect-desc spell-upgrade'>
                        { Upgrade }
                    </div>
                ) }
                { abilityBody.Notes != null && (
                    <div className='monster-ability__effect-desc' style={{color: 'gray', fontSize: '0.8em', marginTop: '3px'}}>
                        { abilityBody.Notes }
                    </div>
                ) }
            </div>
        )
    }

    const passiveOrActveClass = isPassive === true? 'monster-ability--passive' : 'monster-ability--active'
    const spellTopTags =
        abilityBody.A != null?
            abilityBody: 
        isPassive === true?
            abilityBody:
        {...{A: '1 Action'}, ...abilityBody}


    const topStatsComponent = <SpellTopStats tags={spellTopTags} keywords={abilityBody.Tags} className="spell-top__stats--no-padding-side spell-top__stats--less-padding-top-bottom"/>

    return (
        <div className={`monster-ability ${passiveOrActveClass}`} style={style}>
            <div className={`monster-ability__banner`}></div>
            <div className='monster-ability__body'>
                <h4 style={style}>{ name }</h4>
                { topStatsComponent }
                { getAbilityBodyDiv() }
            </div>
        </div>
    )
}