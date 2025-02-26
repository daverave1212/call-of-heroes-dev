import React from 'react'
import './MonsterAbility.css'

import { useState } from 'react'

import * as U from '../../utils'

import { SpellTopStats } from '../Spell/Spell'


// A monster ability is formatted like "- Ranged: 1d6 + 20 Slash"
export default function MonsterAbility({ability, isPassive}) {
    const name = Object.keys(ability)[0]
    const abilityBody = ability[name]

    function AbilityEffect({children}) {
        return (<p className='monster-ability-p'>{ children }</p>)
    }

    function getAbilityBodyDiv() {
        if (U.isString(abilityBody)) {
            return <AbilityEffect>{ abilityBody }</AbilityEffect>
        }

        const effectName = U.getAnyPropNameExcept(abilityBody, ['Damage', 'Notes', 'A', 'Special', 'Cooldown', 'Requirement', 'Range', 'Duration', 'Effect'])
        
        return (
            <div>
                { abilityBody.Damage && (
                    <p><span className='monster-ability__effect-name'>Damage: </span><span className='monster-ability_effect-desc'>{ abilityBody.Damage }</span></p>
                ) }
                { abilityBody.Effect && (
                    <AbilityEffect>{ abilityBody.Effect }</AbilityEffect>
                ) }
                { effectName != null && <p style={{marginTop: '3px'}}>
                    <span className='monster-ability__effect-name'>{effectName}</span>: <span className='monster-ability__effect-desc'>{abilityBody[effectName]}</span>
                </p>}
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
    abilityBody.A != null? abilityBody : 
        isPassive === true? abilityBody :
            {...{A: '1 Action'}, ...abilityBody}


    const topStatsComponent = <SpellTopStats tags={spellTopTags} className="spell-top__stats--no-padding-side spell-top__stats--less-padding-top-bottom"/>

    return (
        <div className={`monster-ability ${passiveOrActveClass}`}>
            <div className={`monster-ability__banner`}></div>
            <div className='monster-ability__body'>
                <h4>{ name }</h4>
                { topStatsComponent }
                { getAbilityBodyDiv() }
            </div>
        </div>
    )
}