import React from 'react'
import './MonsterAbility.css'

import { useState } from 'react'

import * as U from '../../utils'

import { SpellTopStats } from '../Spell/Spell'


// A monster ability is formatted like "- Ranged: 1d6 + 20 Slash"
export default function MonsterAbility({ability, isPassive}) {
    const name = Object.keys(ability)[0]
    const abilityBody = ability[name]

    console.log(ability)

    function getAbilityBodyDiv() {
        if (U.isString(abilityBody))
            return (<p className='monster-ability-p'>{ U.enspanDamageCalculations(abilityBody) }</p>)

        const effectName = U.getAnyPropNameExcept(abilityBody, ['Damage', 'Notes'])
        const effectDesc = abilityBody[effectName]
        return (
            <div>
                { abilityBody.Damage && (
                    <p><span className='monster-ability__damage'>{ abilityBody.Damage }</span></p>
                ) }
                <p style={{marginTop: '3px'}}><span className='monster-ability__effect-name'>{effectName}</span>: <span className='monster-ability__effect-desc'>{effectDesc}</span></p>
                { abilityBody.Notes != null && (
                    <div className='monster-ability__effect-desc' style={{color: 'gray', fontSize: '0.8em', marginTop: '3px'}}>
                        { abilityBody.Notes }
                    </div>
                ) }
            </div>
        )
    }

    const passiveOrActveClass = isPassive == true? 'monster-ability--passive' : 'monster-ability--active'

    const topStatsComponent =
        U.hasAnyProperty(ability, ['A', 'Cost', 'Cooldown', 'Range', 'Duration']) ?
            <SpellTopStats tags={ability} className="spell-top__stats--no-padding-side spell-top__stats--less-padding-top-bottom"/> :
        isPassive != true ?
            <SpellTopStats tags={{ A: '1 Action' }} className="spell-top__stats--no-padding-side spell-top__stats--less-padding-top-bottom"/>
        :
            null


    return (
        <div className={`monster-ability ${passiveOrActveClass}`}>
            <div className={`monster-ability__banner`}></div>
            <div className='monster-ability__body'>
                <h4>{ name }</h4>
                { topStatsComponent != null && topStatsComponent }
                { getAbilityBodyDiv() }
            </div>
        </div>
    )
}