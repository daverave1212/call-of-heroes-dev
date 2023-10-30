import React from 'react'
import './MonsterAbility.css'

import { useState } from 'react'

import * as U from '../../utils'

import ManyBoxes from '../../components/Spell/ManyBoxes'
import PageH2 from '../../components/PageH2/PageH2'
import PageH1 from '../../components/PageH1/PageH1'
import Page from '../../containers/Page/Page'

import TableNormal from '../../components/TableNormal/TableNormal'
import { useLocation } from 'react-router-dom'
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import TwoColumnsDescriptive from '../../components/TwoColumns/TwoColumnsDescriptive'
import Column from '../../components/TwoColumns/Column'
import SmallStat from '../../components/SmallStat/SmallStat'
import Icon from '../../components/Icon'
import Separator from '../../components/Separator/Separator'
import LandingPageSeparator from '../../components/LandingPageSeparator/LandingPageSeparator'

import { SpellTopStats } from '../Spell/Spell'


// A monster ability is formatted like "- Ranged: 1d6 + 20 Slash"
export default function MonsterAbility({ability, isPassive}) {
    const name = Object.keys(ability)[0]
    const desc = ability[name]

    function getAbilityBodyDiv() {
        if (U.isString(desc))
            return (<p className='monster-ability-p'>{ U.enspanDamageCalculations(desc) }</p>)
        const effectName = U.getAnyPropNameExcept(desc, 'Damage')
        const effectDesc = desc[effectName]
        return (
            <div>
                <p><span className='monster-ability__damage'>{ desc.Damage }</span></p>
                <p style={{marginTop: '3px'}}><span className='monster-ability__effect-name'>{effectName}</span>: <span className='monster-ability__effect-desc'>{effectDesc}</span></p>
            </div>
        )
    }

    const passiveOrActveClass = isPassive == true? 'monster-ability--passive' : 'monster-ability--active'

    return (
        <div className={`monster-ability ${passiveOrActveClass}`}>
            <div className={`monster-ability__banner`}></div>
            <div className='monster-ability__body'>
                <h4>{ name }</h4>
                { U.hasAnyProperty(ability, ['A', 'Cost', 'Cooldown', 'Range', 'Duration']) ??
                    <SpellTopStats tags={ability}/> }
                {getAbilityBodyDiv()}
            </div>
        </div>
    )
}