import React from 'react'
import './MonsterAbility.css'

import { useState } from 'react'

import * as U from '../../utils'

import { SpellTopStats, VALID_SPELL_TOP_STATS } from '../Spell/Spell'
import Icon from '../Icon'
import MonsterCalculations from '../../databases/MonsterCalculations.json'
import classNames from 'classnames'

export default function MonsterAbility({monster, monsterXP, ability, isPassive, style, className}) {
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
        Downside,
        IsHeroic,
        IsUltimate
    } = abilityBody

    const nActionPoints = U.getActionPointsByA(abilityBody.A, {
        '3 Action Points': 3,
        '1 Action': 2,
        'Half-Action': 1,
        '0 Actions': 0,
        'Reaction': 1,
        'Passive': 0,
        [null]: 2
    })


    const isEpic = U.isMonsterEpic(monster)
    const monsterTotalXP = monsterXP ?? U.getMonsterTotalXP(monster)

    const monsterUsableAP = isEpic? monster.Degree - 1: 2   // E.g. AP without moving
    const howManyMonstersIsItWorth = monsterUsableAP / 2    // E.g. 2 AP = 1, 4 AP = 2, etc
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
        ability,
        isEpic,
        nActionPoints,
        howManyMonstersIsItWorth,
        monsterTotalXP,
        baseMonsterXP,
        fixedMonsterXP,
        damagePer1AP,
        damagePer2AP,
        abilityDamageBase
    })
    
    function getQuickAttackDamage() {
        return U.matchRange(baseMonsterXP, [
            { range: [-9999, 0], value: '1d4' },
            { range: [0, 25], value: '1' },
            { range: [25, 75], value: '2' },
            { range: [75, 175], value: '1d4' },
            { range: [175, 300], value: '1d6' },
            { range: [300, 99999], value: '1d8' },
        ], '1d4')
    }
    const CUSTOM_MONSTER_SYMBOLS = {
        'Auto': { tag: 'span',          text: 'Error', func: () => U.numberToDiceEquivalent(abilityDamageBase) },
        'DamageAuto': { tag: 'span',    text: 'Error', func: () => U.numberToDiceEquivalent(abilityDamageBase) },
        'Damage-1': { tag: 'span',      text: 'Error', func: () => U.numberToDiceEquivalent(abilityDamageBase - 1) },
        'Damage-2': { tag: 'span',      text: 'Error', func: () => U.numberToDiceEquivalent(abilityDamageBase - 2) },
        'Damage-3': { tag: 'span',      text: 'Error', func: () => U.numberToDiceEquivalent(abilityDamageBase - 3) },
        'Damage+1': { tag: 'span',      text: 'Error', func: () => U.numberToDiceEquivalent(abilityDamageBase + 1) },
        'Damage+2': { tag: 'span',      text: 'Error', func: () => U.numberToDiceEquivalent(abilityDamageBase + 2) },
        'Damage+3': { tag: 'span',      text: 'Error', func: () => U.numberToDiceEquivalent(abilityDamageBase + 3) },
        'Damage1': { tag: 'span',       text: 'Error', func: () => U.numberToDiceEquivalent(damagePer1AP) },
        'Damage2': { tag: 'span',       text: 'Error', func: () => U.numberToDiceEquivalent(damagePer2AP) },
        'DamageLess': { tag: 'span',    text: 'Error', func: () => U.numberToDiceEquivalent(U.roundToNearest(abilityDamageBase * 0.7, 0.5)) },
        'DamageAoE': { tag: 'span',     text: 'Error', func: () => U.numberToDiceEquivalent(U.roundToNearest(abilityDamageBase * 0.7, 0.5)) },
        'DamageAoEAuto': { tag: 'span', text: 'Error', func: () => U.numberToDiceEquivalent(U.roundToNearest(abilityDamageBase * 0.7, 0.5)) },
        'DamageAoE1': { tag: 'span',    text: 'Error', func: () => U.numberToDiceEquivalent(U.roundToNearest(damagePer1AP * 0.7, 0.5)) },
        'DamageAoE2': { tag: 'span',    text: 'Error', func: () => U.numberToDiceEquivalent(U.roundToNearest(damagePer2AP * 0.7, 0.5)) },
        'DamageHalf': { tag: 'span',    text: 'Error', func: () => U.numberToDiceEquivalent(U.roundToNearest(abilityDamageBase * 0.5, 0.5)) },
        'Damage-50%': { tag: 'span',    text: 'Error', func: () => U.numberToDiceEquivalent(U.roundToNearest(abilityDamageBase * 0.5, 0.5)) },
        'Damage+50%': { tag: 'span',    text: 'Error', func: () => U.numberToDiceEquivalent(U.roundToNearest(abilityDamageBase * 1.5, 0.5)) },
        'DamageDouble': { tag: 'span',  text: 'Error', func: () => U.numberToDiceEquivalent(U.roundToNearest(abilityDamageBase * 2, 0.5)) },
        'DamageThird': { tag: 'span',   text: 'Error', func: () => U.numberToDiceEquivalent(U.roundToNearest(abilityDamageBase * 0.35, 0.5)) },
        'DamageQuick': { tag: 'span',   text: 'Error', func: () => getQuickAttackDamage() },
    }
    const CUSTOM_MONSTER_FUNCTION_SYMBOLS = {
        'DamageTimes': args => ({ tag: 'span', text: U.numberToDiceEquivalent(U.roundToNearest(abilityDamageBase * parseFloat(args[0]), 0.5)) })
    }
    function isDamageValueAuto(damageValue) {
        if (!U.isString(damageValue)) {
            return damageValue
        }
        const possibleSymbols = Object.keys(CUSTOM_MONSTER_SYMBOLS)
        const isAuto = possibleSymbols.some(symbol => damageValue.startsWith(symbol))
        return isAuto
    }
    function parseDamgeValueAuto(damageValue) { // Assuming it's valid
        const words = damageValue.split(' ')
        const newWords = words.map(word => (word in CUSTOM_MONSTER_SYMBOLS)? CUSTOM_MONSTER_SYMBOLS[word].func(): word)
        return newWords.join(' ')
    }





    function AbilityEffect({children}) {
        return (<p className='monster-ability-p'>{ children }</p>)
    }

    function getAbilityBodyDiv() {
        if (abilityBody == 'QuickAuto' || (abilityBody == 'Auto' && name == 'Quick Attack')) {
            const diceDamage = getQuickAttackDamage()
            return <p><Icon name="Damage" style={{marginTop: '2px'}}/> <span className='monster-ability_effect-desc'>{ diceDamage }</span></p>
        }
        if (U.isString(abilityBody)) {
            return <AbilityEffect>{ U.parseTextWithSymbols(abilityBody, CUSTOM_MONSTER_SYMBOLS, CUSTOM_MONSTER_FUNCTION_SYMBOLS) }</AbilityEffect>
        }

        const effectName = U.getAnyPropNameExcept(abilityBody, ['Name', 'Damage', 'Notes', 'A', 'Special', 'Cooldown', 'Requirement', 'Range', 'Duration', 'Effect', 'Upgrade', 'Combo', 'ParentKey', 'IsSubspell', 'EffectGreen', 'Downside', 'IsUltimate', 'IsHeroic'])
        
        const Effect = abilityBody.Effect == null? null: U.parseTextWithSymbols(abilityBody.Effect, CUSTOM_MONSTER_SYMBOLS, CUSTOM_MONSTER_FUNCTION_SYMBOLS)
        const Damage =
            abilityBody.Damage == null?
                null:
            isDamageValueAuto(abilityBody.Damage)?
                U.parseTextWithSymbols(parseDamgeValueAuto(abilityBody.Damage), CUSTOM_MONSTER_SYMBOLS, CUSTOM_MONSTER_FUNCTION_SYMBOLS):
            U.parseTextWithSymbols(abilityBody.Damage, CUSTOM_MONSTER_SYMBOLS, CUSTOM_MONSTER_FUNCTION_SYMBOLS)
        const specialEffect = effectName == null? null: U.parseTextWithSymbols(abilityBody[effectName], CUSTOM_MONSTER_SYMBOLS, CUSTOM_MONSTER_FUNCTION_SYMBOLS)

        return (
            <div className={`flex column gap-half`} style={{paddingTop: '0.25rem'}}>
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
    const validSpellTopTags = U.getSpellValidTopStatsObject(spellTopTags)
    const hasTopTags = Object.keys(validSpellTopTags).length > 0

    console.log({
        spellTopTags,
        validSpellTopTags,
        hasTopTags
    })

    const topStatsComponent = <SpellTopStats tags={validSpellTopTags} keywords={abilityBody.Tags} className="spell-top-stats--no-padding-side spell-top-stats--less-padding-top-bottom"/>

    const glowColor = IsHeroic? 'rgba(168, 92, 255, 1)': IsUltimate? 'rgba(255, 128, 64, 1)': null
    const glowClass = IsUltimate || IsHeroic? 'breathing-glow': ''

    return (
        <div className={`monster-ability ${passiveOrActveClass} ${glowClass} ${className}`} style={{
            '--color-1': 'rgba(255, 255, 255, 0)',
            '--color-2': glowColor,
            ...style
        }}>
            <div className={`monster-ability__banner`}></div>
            <div className='monster-ability__body'>
                <h4 style={style}>{ name }</h4>
                { hasTopTags && topStatsComponent }
                { getAbilityBodyDiv() }
            </div>
        </div>
    )
}