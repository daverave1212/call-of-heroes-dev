import React from 'react'
import './MonsterAbility.css'

import { useState } from 'react'

import * as U from '../../utils'

import { SpellTopStats } from '../Spell/Spell'
import Icon from '../Icon'
import MonsterCalculations from '../../databases/MonsterCalculations.json'




// A monster ability is formatted like "- Ranged: 1d6 + 20 Slash"
export default function MonsterAbility({monster, ability, isPassive, style, className}) {
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

    const nActionPoints = 
        abilityBody.A == null || abilityBody.A == '1 Action'?
            2:
        abilityBody.A == 'Half-Action'?
            1:
        abilityBody.A == '0 Actions'?
            0:
        1


    const isEpic = U.isMonsterEpic(monster)
    const monsterUsableAP = isEpic? monster.Degree - 1: 2   // E.g. AP without moving
    const howManyMonstersIsItWorth = monsterUsableAP / 2    // E.g. 2 AP = 1, 4 AP = 2, etc
    const monsterTotalXP = U.getMonsterTotalXP(monster)
    const baseMonsterXP = monsterTotalXP / howManyMonstersIsItWorth // E.g. 250 with degree 5 -> 125
    const fixedMonsterXP = U.roundDownTo(baseMonsterXP, 25)

    const damagePer2AP = MonsterCalculations.Calculations.XPToDamageTable[fixedMonsterXP]
    const damagePer1AP = U.roundDownTo(damagePer2AP / 2, 0.5)

    const abilityDamageBase =
        nActionPoints == 2? damagePer2AP:
        nActionPoints == 1? damagePer1AP:
        nActionPoints == 0? damagePer1AP:
        damagePer1AP

    console.log(name)
    console.log({
        isEpic,
        nActionPoints,
        monsterUsableAP,
        howManyMonstersIsItWorth,
        monsterTotalXP,
        baseMonsterXP,
        fixedMonsterXP,
        damagePer1AP,
        damagePer2AP,
        abilityDamageBase
    })
    
    const CUSTOM_MONSTER_SYMBOLS = {
        'DamageAuto': { tag: 'span', text: U.numberToDiceEquivalent(abilityDamageBase) },
        'Damage-1': { tag: 'span', text: U.numberToDiceEquivalent(abilityDamageBase - 1) },
        'Damage-2': { tag: 'span', text: U.numberToDiceEquivalent(abilityDamageBase - 2) },
        'Damage-3': { tag: 'span', text: U.numberToDiceEquivalent(abilityDamageBase - 3) },
        'Damage+1': { tag: 'span', text: U.numberToDiceEquivalent(abilityDamageBase + 1) },
        'Damage+2': { tag: 'span', text: U.numberToDiceEquivalent(abilityDamageBase + 2) },
        'Damage+3': { tag: 'span', text: U.numberToDiceEquivalent(abilityDamageBase + 3) },
        'Damage1': { tag: 'span', text: U.numberToDiceEquivalent(damagePer1AP) },
        'Damage2': { tag: 'span', text: U.numberToDiceEquivalent(damagePer2AP) },
        'DamageLess': { tag: 'span', text: U.numberToDiceEquivalent(U.roundToNearest(abilityDamageBase * 0.7, 0.5)) },
        'DamageAoEAuto': { tag: 'span', text: U.numberToDiceEquivalent(U.roundToNearest(abilityDamageBase * 0.7, 0.5)) },
        'DamageAoE1': { tag: 'span', text: U.numberToDiceEquivalent(U.roundToNearest(damagePer1AP * 0.7, 0.5)) },
        'DamageAoE2': { tag: 'span', text: U.numberToDiceEquivalent(U.roundToNearest(damagePer2AP * 0.7, 0.5)) },
    }




    function AbilityEffect({children}) {
        return (<p className='monster-ability-p'>{ children }</p>)
    }

    function getAbilityBodyDiv() {
        if (U.isString(abilityBody)) {
            return <AbilityEffect>{ abilityBody }</AbilityEffect>
        }

        const effectName = U.getAnyPropNameExcept(abilityBody, ['Name', 'Damage', 'Notes', 'A', 'Special', 'Cooldown', 'Requirement', 'Range', 'Duration', 'Effect', 'Upgrade', 'Combo', 'ParentKey', 'IsSubspell', 'EffectGreen', 'Downside', 'IsUltimate'])
        
        const Effect = abilityBody.Effect == null? null: U.parseTextWithSymbols(abilityBody.Effect, CUSTOM_MONSTER_SYMBOLS)
        const Damage = abilityBody.Damage == null? null: U.parseTextWithSymbols(abilityBody.Damage, CUSTOM_MONSTER_SYMBOLS)
        const specialEffect = effectName == null? null: U.parseTextWithSymbols(abilityBody[effectName], CUSTOM_MONSTER_SYMBOLS)        

        return (
            <div className={`flex column gap-half`} style={{paddingTop: '0.5rem'}}>
                { abilityBody.Damage && (
                    <p><Icon name="Damage" style={{marginTop: '2px'}}/> <span className='monster-ability_effect-desc'>{ Damage }</span></p>
                ) }
                { abilityBody.Effect && (
                    <AbilityEffect>{ Effect }</AbilityEffect>
                ) }
                { effectName != null && <p style={{marginTop: '3px'}}>
                    <span className='monster-ability__effect-name'>{effectName}</span>: <span className='monster-ability__effect-desc'>{specialEffect}</span>
                </p>}
                { Combo != null && (
                    <div className='monster-ability__effect-desc' key="Combo"><span style={{color: 'var(--blue-color)'}}>Combo: </span>{ Combo }</div>
                ) }
                { EffectGreen != null && (
                    <div className="monster-ability__effect-desc" key="EffectGreen" style={{color: 'var(--green-text)'}}>{ EffectGreen }</div>
                ) }
                { Downside != null && (
                    <div className="monster-ability__effect-desc" key="Downside" style={{color: 'rgb(240, 0, 0)'}}>{ Downside }</div>
                )}
                { Upgrade != null && (
                    <p className='monster-ability-p smaller-font'>{Upgrade}</p>
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


    const topStatsComponent = <SpellTopStats tags={spellTopTags} keywords={abilityBody.Tags} className="spell-top-stats--no-padding-side spell-top-stats--less-padding-top-bottom"/>

    return (
        <div className={`monster-ability ${passiveOrActveClass} ${className}`} style={style}>
            <div className={`monster-ability__banner`}></div>
            <div className='monster-ability__body'>
                <h4 style={style}>{ name }</h4>
                { topStatsComponent }
                { getAbilityBodyDiv() }
            </div>
        </div>
    )
}