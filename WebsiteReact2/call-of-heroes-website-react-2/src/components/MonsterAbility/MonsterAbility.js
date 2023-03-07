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




// A monster ability is formatted like "- Ranged: 1d6 + 20 Slash"
export default function MonsterAbility({ability, isPassive}) {
    const name = Object.keys(ability)[0]
    const desc = ability[name]

    // Wraps sections like "1d10 + 20" in a dark red span; returns an array of text or span components
    function enspanDamageCalculations(text) {
        const words = text.split(' ')

        const isWordDamageCalcPart = (word) => {
            return U.isDice(word) || U.isOperator(word) || U.isStringNumeric(word)
        }

        let state = 'none'
        let currentPhraseWords = []
        const phrases = []
        console.log({words})
        for (let i = 0; i < words.length; i++) {
            const word = words[i]
            const nextWord = (i + 1 <= words.length - 1) ? words[i+1] : null
            switch (state) {
                case 'none':
                    currentPhraseWords.push(word)
                    if (isWordDamageCalcPart(word)) {
                        if (isWordDamageCalcPart(nextWord)) {
                            state = 'in-damage'
                        } else {
                            state = 'in-normal'
                        }
                    } else {
                        state = 'in-normal'
                    }
                    break
                case 'in-normal':
                    if (isWordDamageCalcPart(word)) {
                        if (isWordDamageCalcPart(nextWord)) {
                            phrases.push(currentPhraseWords.join(' '))
                            currentPhraseWords = [word]
                            state = 'in-damage'
                        } else {
                            currentPhraseWords.push(word)
                        }
                    } else {
                        currentPhraseWords.push(word)
                    }
                    break
                case 'in-damage':
                    if (isWordDamageCalcPart(word)) {
                        currentPhraseWords.push(word)
                    } else {
                        phrases.push(
                            (<span className='monster-ability__damage'>{currentPhraseWords.join(' ')}</span>)
                        )
                        currentPhraseWords = [word]
                        state = 'in-normal'
                    }
                    break
            }
        }
        if (currentPhraseWords.length > 0) {
            if (state == 'in-normal') {
                phrases.push(currentPhraseWords.join(' '))
            } else {
                phrases.push(
                    (<span className='monster-ability__damage'>{currentPhraseWords.join(' ')}</span>)
                )
            }
        }
        return phrases
    }
    function getAbilityBodyDiv() {
        if (U.isString(desc))
            return (<p className='monster-ability-p'>{ enspanDamageCalculations(desc) }</p>)
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
                {getAbilityBodyDiv()}
            </div>
        </div>
    )
}