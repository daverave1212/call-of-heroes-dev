
import './Spell.css'
import PageH2 from './../PageH2/PageH2'
import Separator from './../Separator/Separator'
import React, { useEffect, useRef, useState } from 'react'
import { parseTextWithSymbols, stringReplaceAllMany, getSpellIconPathByName, getUniqueSpellID, mapObject, insertBetweenAll, getVariantsForEachCollection, normalizeForEachVariantsToNormalVariants, createKey, spellsFromObject, randomInt, assertCorrectSpellFormat, findBasicSpellByName, allEqual, getItemIconPathByName } from '../../utils'
import TableNormal from '../TableNormal/TableNormal'
import html2canvas from 'html2canvas'
import CopySpellButton from '../CopyButton/CopySpellButton'
import classNames from 'classnames'
import { PetOrAnimalLeftOnly } from '../../pages/Other/PetOrAnimal'
import { getIsActionPointsSystem } from '../../global-state/GlobalState'
import HeroButton from '../HeroButton/HeroButton'
import Ribbon from '../Ribbon/Ribbon'
import CoolButton from '../CoolButton/CoolButton'
import Icon from '../Icon'

const ACTION_POINTS_MAPPING = {
    '1 Action': '2 Action Points',
    'Half-Action': '1 Action Point',
    '0 Actions': '0 Action Points'
}
const ACTION_POINTS_MAPPING2 = {
    '1 Action': '⦿⦿',
    'Half-Action': '⦿',
    '0 Actions': 'Free'
}

/*
    Spell Example

<Spirit Animal>:
    _Value: 1.5
    IsIgnored: false    # For being displayed on CCC
    HasMixins: true
    
    Bonuses:
        Might: 3
        Max Health Percent: 20
    
    Skills:
        - Skilled in Stealth

    Choice Bonuses:
        - Type: stat
        - Type: reminder
          DialogText: Don't forget to look at the animals page!
          ReminderText: I looked at the animals page.

    A: Passive
    Effect: |
        A _spirit animal_ assists you and gives you a boon, depending on its type.
        You can change which spirit animal assists you while not in Combat.
    Upgrade: The spirit animal is intangible, invulnerable and invisible to most people. You can use it to scout, but can't walk through solid surfaces. You can see through its eyes, but is bound to you and won't go more than 15 meters away from you. It does not participate in combat.
    Notes: An Act counts as ranged if it's not made with a melee weapon, and the range is at least 3 meters
    DoubleTable:
        Headers:
            - Animal Spirit
            - Boon
        Values:
            - Bear
            - You are immune to Slows and Fumbling
            - Wolf
            - +1 Movement Speed
            - Owl
            - +3 Range on all ranged Acts
            - Eagle
            - +5 Initiative
*/

export function SpellTopStats({className, tags}) {
    const {A, DisplayA, Cost, Range, Cooldown, Duration, Requirement, DisplayRequirement, Replacement, Hands, Stat, Special, Price, XP} = tags
    let displayedA = DisplayA != null? DisplayA : A != null? A : null

    if (getIsActionPointsSystem()) {
        if (displayedA in ACTION_POINTS_MAPPING) {
            displayedA = ACTION_POINTS_MAPPING[displayedA]
        }
    }

    return (
        <div className={`spell-top__stats ${className}`}>
            { (displayedA != null) && (
                <div>
                    <img src="/Icons/UI/Hand.png" className="inline-icon--spell"/>{ displayedA }
                </div>
            ) }
            { Cost != null && (
                <div>
                    <img src="/Icons/UI/Mana.png" className="inline-icon--spell"/>
                    { Cost }
                </div>
            ) }
            { Hands != null && (<div><img src="/Icons/UI/Hand.png" className="inline-icon--spell"/>{ Hands }</div>) }
            { Range != null && (<div><img src="/Icons/UI/Range.png" className="inline-icon--spell"/>{ Range }</div>) }
            { Stat != null && (<div><img src="/Icons/UI/Special.png" className="inline-icon--spell"/>{ Stat }</div>) }
            { Special != null && (<div><img src="/Icons/UI/Special.png" className="inline-icon--spell"/>{ Special }</div>) }
            { Cooldown != null && (<div><img src="/Icons/UI/Cooldown.png" className="inline-icon--spell"/>{ Cooldown }</div>) }
            { Duration != null && (<div><img src="/Icons/UI/Duration.png" className="inline-icon--spell"/>{ Duration }</div>) }
            { (Requirement != null || DisplayRequirement != null) && (
                <div>
                    <img src="/Icons/UI/Level.png" className="inline-icon--spell"/>
                    <span style={{color: '#FF5A00'}}>{ Requirement != null? Requirement : DisplayRequirement }</span>
                </div>
            ) }
            { Replacement != null && (
                <div>
                    <img src="/Icons/UI/Replacement.png" className="inline-icon--spell"/>
                    <span style={{color: 'var(--blue-color)'}}>{ Replacement }</span>
                </div>
            ) }
            { Price != null && (<div><img src="/Icons/UI/Gold.png" className="inline-icon--spell-downer"/>{ Price }</div>) }
            { XP != null && (<div><img src="/Icons/UI/XP.png" className="inline-icon--spell"/>{ XP }</div>) }
        </div>
    )
}

export function SpellBorder() {
    return <div className="spell__border"></div>
}
export function SpellBackground() {
    return <div className='spell__background'></div>
}
export function SpellTop({
    hasVariants, variantIndex, Variants,
    onIconClick, iconPath, hasIcon,
    DisplayName, Name, showTopStats=true,
    A, item, spell
}) {
    const obj = item != null? item: spell
    if (hasIcon === false) {
        return (
            <div className='spell-top'>
                <div style={{width: '100%'}}>
                    <div className='spell-top--iconless__title-wrapper'>
                        <div className='spell-top--iconless__title'>{ Name }</div>
                    </div>
                    <div style={{width: '70%', margin: 'auto'}}>
                        { showTopStats === true && <SpellTopStats tags={{...obj, A}} className="spell-top__stats--no-padding-side"/>}
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='spell-top'>
            <SpellTopIconSide
                src={iconPath}
                onIconClick={onIconClick}
                hasSpinner={hasVariants} hasVariants={hasVariants}
                variantIndex={variantIndex} maxVariantIndex={hasVariants? Variants.length: null}
            />

            <div className='spell-top__title-side'>
                <div className='spell-top__title__wrapper'>
                    <div className='spell-top__title'>{ DisplayName != null? DisplayName : Name }</div>
                </div>
                { showTopStats === true && <SpellTopStats tags={{...obj, A: A == null? obj.A : A}}/>}
            </div>
        </div>
    )
}

export function SpellIconSpinner({ src, className }) {
    return (
        <div className='spell-top__icon-wrapper'>
            <div className='spell-top__variant-spinner'></div>
            <img src={iconPath}/>  
        </div>
    )
}
export function SpellTopIconSide({ src, style, className, hasSpinner, hasVariants, variantIndex, maxVariantIndex, onIconClick }) {
    return (
        <div className={`spell-top__icon-side ${className}`} style={style}>
                
            { hasVariants === true && (
                <div className='spell-top__variant-counter' onClick={onIconClick}>
                    {variantIndex + 1}/{maxVariantIndex}
                </div>
            )}

            <div className='spell-top__icon-wrapper'>
                { hasSpinner === true && (
                    <div className='spell-top__variant-spinner'></div>
                )}
                <img src={src}/>  
            </div>

        </div>
    )
}

export function IconWithSpinner({ src, className }) {
    return (
        <div className={className} style={{position: 'relative'}}>
            <img className='no-spell-icon' src={src}/>
            <div className='no-spell-spinner'></div>
        </div>
    )
}

/*
If buttonText != null:
    It will override any button text
If isSelected != null
    It will have a "Select/Unselect" button
If onClick != null:
    It will have onClick
*/

export default function Spell({ 
    spell,
    style,
    
    isItem=false,
    hasIcon=true,
    hasBorder=true,
    hasCopyButton=true,
    showTopStats=true,
    
    isSelected=false,
    onClick,
    buttonText
}) {

    const [variantIndex, setVariantIndex] = useState(0)
    const [thiefRolledGoldAmount, setThiefRolledGoldAmount] = useState('Click here to roll 1000d100!')

    assertCorrectSpellFormat(spell)

    let {
        Name,
        DisplayName,

        CustomIconPath,
        IsSubspell,
        
        A,
        Upgrades,
        Upgrade,
        Damage,
        
        HasMixins,
        
        Effect,
        EffectGreen,
        Description,
        Alternatives,
        Notes,
        Downside,
        
        DoubleTableNumbered,
        DoubleTable,
        Variants,
        VariantsForEach,
        Monster,
        Subspells,
        SubspellName,
        RollThiefGold
    } = spell

    if (getIsActionPointsSystem() && Effect != null) {
        Effect = stringReplaceAllMany(Effect, Object.keys(ACTION_POINTS_MAPPING), Object.keys(ACTION_POINTS_MAPPING).map(key => ACTION_POINTS_MAPPING[key]))
    }

    if (spell['Display Name'] != null) DisplayName = spell['Display Name']
    let hasVariants = Variants != null || VariantsForEach != null
    
    if (Name == null || (typeof Name) != 'string') {
        Name = 'Default'
    }
    if (Upgrades != null) {
        Upgrade = Upgrades
    }

    if (Name.startsWith('~')) Name = Name.substring(1, Name.length - 1)

    let iconPath =
        CustomIconPath != null?
            CustomIconPath:
        isItem == true?
            getItemIconPathByName(Name):    
        getSpellIconPathByName(Name)
    const uniqueID = getUniqueSpellID(Name)

    const spellNormalOrSubClass = IsSubspell == true? 'spell--subspell' : 'spell--normal'
    const spellPassiveOrActiveClass = A == 'Passive' == true? 'spell--passive' : 'spell--active'
    
    const subspell = SubspellName != null? findBasicSpellByName(subspell): null

    const hasButton = onClick != null
    const finalButtonText =
        buttonText != null?
            buttonText
        :isSelected != null?
            (isSelected? 'Unselect': 'Select')
        :
            'Go'
    
    function onButtonClick() {
        if (onClick != null) {
            onClick(spell)
        }
    }


    let extraMixins = {}
    if (hasVariants === true && VariantsForEach != null) {
        Variants = normalizeForEachVariantsToNormalVariants(VariantsForEach)
    }
    if (hasVariants === true && Variants != null) {
        const currentVariant = Variants[variantIndex]
        const variantMixinsCorrectlyFormatted = mapObject(currentVariant, ({key, value}) => ({
            key: key,
            value: () => (<span>{value}</span>)
        }))
        extraMixins = variantMixinsCorrectlyFormatted
        if (currentVariant.IconName != null) iconPath = getSpellIconPathByName(currentVariant.IconName)
        if (currentVariant.DisplayA != null) A = currentVariant.DisplayA
    }


    if (HasMixins === true || hasVariants === true) {
        try {
            Effect = parseTextWithSymbols(Effect, extraMixins)
            if (DisplayName != null) DisplayName = parseTextWithSymbols(DisplayName, extraMixins)
            if (Downside != null) Downside = parseTextWithSymbols(Downside, extraMixins)
            if (Upgrade != null) Upgrade = parseTextWithSymbols(Upgrade, extraMixins)
            if (Notes != null) Notes = parseTextWithSymbols(Notes, extraMixins)
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

    function onIconClick() {
        if (hasVariants !== true)
            return
        let nextVariantIndex = variantIndex + 1
        if (nextVariantIndex >= Variants.length) {
            nextVariantIndex = 0
        }
        setVariantIndex(nextVariantIndex)
    }

    return (
        <div data-selectable={isSelected != null} id={uniqueID} style={style} className={classNames(
            'spell',
            spellNormalOrSubClass,
            spellPassiveOrActiveClass,
            { 'spell--with-variants': hasVariants === true },
            { 'spell__no-border': hasBorder == false }
        )}>
            { isSelected && <Ribbon>Selected!</Ribbon>}
            { hasBorder != false && <SpellBorder/> } 
            <SpellBackground/>
            <div className='spell__box'> {/* This has CSS to be perfectly in the bounds of the borders and banner */}
                <SpellTop
                    hasVariants={hasVariants} variantIndex={variantIndex} Variants={Variants}
                    onIconClick={onIconClick} iconPath={iconPath} hasIcon={hasIcon}
                    DisplayName={DisplayName} Name={Name} showTopStats={showTopStats}
                    A={A} spell={spell}
                />
                
                <Separator hasNoMarginTop={true}/>
                { Damage == null? null : (
                    <div key="Damage" className='spell-description' style={{
                        paddingBottom: allEqual([Effect, EffectGreen, Downside, Upgrade, Notes, Alternatives], null)?   // Extra padding bottom if there is nothing after damage
                            'var(--spell-padding-bottom)':
                            'calc(var(--spell-padding-bottom) / 2)'
                    }}><Icon name="Damage"/>{ Damage }</div>
                )}
                { Effect != null && (
                    <div className='spell-description'>
                        { Effect }
                    </div>
                )}
                { EffectGreen != null && (
                    <div className="spell-green" key="EffectGreen">{ EffectGreen }</div>
                ) }
                { RollThiefGold != null && (
                    <div className='spell-description'>
                        <button style={{
                            fontFamily: 'HomeFont',
                            fontSize: 'var(--p-size)',
                            background: 'none',
                            cursor: 'pointer',
                            border: 'solid var(--hero-text-color) 3px',
                            borderRadius: '1em',
                            padding: '0.5em',
                            paddingLeft: '1em',
                            paddingRight: '1em',
                        }} onClick={() => setThiefRolledGoldAmount(Math.floor((randomInt(2500, 250000) + randomInt(2500, 250000) + randomInt(2500, 250000)) / 3))}>{thiefRolledGoldAmount}</button>
                    </div>
                )}
                { Downside != null && (
                    <div className="spell-red" key="Downside">{ Downside }</div>
                )}
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
                { Alternatives != null && (
                    <div className='spell-notes'>
                        Alternatives: { Alternatives }
                    </div>
                ) }
                { (DoubleTable != null || DoubleTableNumbered != null) && (
                    <TableNormal columns={tableHeaders} hasBorder={false}>
                        { newTableValuePairs.map(pair => (
                            <tr key={createKey([pair.value1, pair.value2])}>
                                <td>{ pair.value1 }</td>
                                <td>{ pair.value2 }</td>
                            </tr>
                        )) }
                    </TableNormal>
                ) }
                { (Subspells != null) && spellsFromObject(Subspells).map(spell => (
                    <div style={{paddingBottom: 'var(--spell-padding-bottom)'}}>
                        <Spell spell={spell} hasBorder={false}/>
                    </div>
                ))}
                { (Monster != null) && (
                    <div style={{padding: 'var(--spell-padding)'}}>
                        <PetOrAnimalLeftOnly animal={Monster}/>
                    </div>
                )}
                { hasCopyButton === true && <CopySpellButton elementId={uniqueID} shouldAddBorder={true}/> }
                { hasButton && (
                    <div>
                        <div className='center-content' onClick={onButtonClick}>
                            <button style={{
                                fontSize: '17px',
                                width: 'max(30%, 130px)',
                                height: '2.5rem'
                            }}>
                                { finalButtonText }
                            </button>
                        </div>
                        <div style={{height: '1rem'}}></div>
                    </div>
                )}
                { subspell != null && <Spell spell={subspell} hasCopyButton={false} showTopStats={false}/>}
            </div>
        </div>
    )
}
