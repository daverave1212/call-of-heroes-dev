
import './Spell.css'
import PageH2 from './../PageH2/PageH2'
import Separator from './../Separator/Separator'
import React, { useEffect, useRef, useState } from 'react'
import { parseTextWithSymbols, stringReplaceAllMany, getSpellIconPathByName, getUniqueSpellID, mapObject, insertBetweenAll, getVariantsForEachCollection, normalizeForEachVariantsToNormalVariants, createKey, spellsFromObject, randomInt, assertCorrectSpellFormat, findBasicSpellByName, allEqual, getItemIconPathByName, removeTildes, isString, getDoubleTableTable, getDoubleTableNumberedTable, filterObject, getSpellValidTopStatsObject, hasSpellVariants, getNormalizedSpellName, getSpellOrItemIconPath, parseAndNormalizeSpell, hexColorToRgbVector, getSpellByName } from '../../utils'
import TableNormal from '../TableNormal/TableNormal'
import html2canvas from 'html2canvas'
import CopySpellButton from '../CopyButton/CopySpellButton'
import classNames from 'classnames'
import { PetOrAnimalSpell } from '../../pages/Other/PetOrAnimal'
import HeroButton from '../HeroButton/HeroButton'
import Ribbon from '../Ribbon/Ribbon'
import CoolButton from '../CoolButton/CoolButton'
import Icon from '../Icon'
import EffectTable from '../TableNormal/EffectTable'
import QuestGuardConfig from '../../QuestGuardConfig.json'

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
    SingleTable:
        - Bear
        - Fox
        - Ferret
        - Narwhal
*/


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
    showTop=true,
    
    isSelected=false,
    canChangeVariant=true,
    onClick,
    buttonText,
    
    metadata
}) {

    if (spell == null) {
        return <div>ERROR: null spell given to component Spell.</div>
    }

    const baseVariantIndex = metadata?.variantIndex ?? spell.DefaultVariantIndex ?? 0

    const [variantIndex, setVariantIndex] = useState(baseVariantIndex)
    const [thiefRolledGoldAmount, setThiefRolledGoldAmount] = useState('Click here to roll 1000d100!')

    assertCorrectSpellFormat(spell)

    let {
        CustomIconPath,
        IconName,
        IsSubspell,
        
        HasMixins,
        
        PreEffectGreen,
        Description,
        Alternatives,
        
        DoubleTableNumbered,
        DoubleTable,
        SingleTable,
        VariantsForEach,
        Monster,
        Subspells,
        RollThiefGold,
        HasSpellTableNumbers,
        SpellTable,
        Tags
    } = spell

    const parsedSpell = spell.IsAlreadyParsed? spell: parseAndNormalizeSpell(spell, {
        isItem,
        variantIndex
    })

    let {
        Name, DisplayName, A, IconPath,
        Effect, EffectGreen, Downside, Upgrade, Combo, Notes,
        Variants, SubspellName,
        Damage
    } = parsedSpell

    

    const hasVariants = hasSpellVariants(spell)
    const uniqueID = getUniqueSpellID(Name)
    const subspell = SubspellName != null? getSpellByName(SubspellName): null
    const hasButton = onClick != null
    const finalButtonText = buttonText ?? (isSelected? 'Unselect': 'Select')
    const hasEffectsOrMore = !allEqual([Effect, EffectGreen, Downside, Upgrade, Notes, Alternatives], null)

    const [tableHeaders, newTableValuePairs] =
        DoubleTable != null?
            getDoubleTableTable(DoubleTable):
        DoubleTableNumbered != null?
            getDoubleTableNumberedTable(DoubleTableNumbered):
        [null, null]

    function onButtonClick() {
        onClick?.(spell, { variantIndex })
    }

    function onIconClick() {
        if (hasVariants !== true)
            return
        if (isSelected == true) {
            return
        }
        let nextVariantIndex = variantIndex + 1
        if (nextVariantIndex >= Variants.length) {
            nextVariantIndex = 0
        }
        setVariantIndex(nextVariantIndex)
    }

    return (
        <div data-selectable={isSelected != null} id={uniqueID} style={style} className={classNames(
            'spell',
            IsSubspell == true? 'subspell' : 'spell--normal',
            A == 'Passive' == true? 'passive' : 'active',
            { 'with-variants': hasVariants === true },
        )}>
            { isSelected && <Ribbon>Selected!</Ribbon>}
            { hasBorder && <div className='spell-border'></div> } 
            <div className='spell-background'></div>

            <div className='content'> {/* This has CSS to be perfectly in the bounds of the borders and banner */}
                { showTop != false && (<>
                    <SpellTop
                        hasVariants={hasVariants && canChangeVariant} variantIndex={variantIndex} Variants={Variants}
                        onIconClick={onIconClick} iconPath={IconPath} hasIcon={hasIcon}
                        DisplayName={DisplayName} Name={Name} showTopStats={showTopStats}
                        A={A} spell={parsedSpell}
                    />
                    { showTopStats != false && <Separator hasNoMarginTop={true}/> }
                </>) }
                { showTopStats == false && <div style={{marginTop: '-1rem'}}></div>}

                { Damage && (<>
                    <div key="Damage" className='spell-description'>
                        <Icon name="Damage"/>{ Damage }
                    </div>
                    { !hasEffectsOrMore && <div style={{paddingBottom: 'calc(var(--spell-padding-bottom) / 4)'}}></div> }
                </>)}
                { PreEffectGreen != null && (
                    <div className="spell-green" key="PreEffectGreen">{ PreEffectGreen }</div>
                ) }
                { Effect != null && (
                    <div className='spell-description'>
                        { Effect }
                    </div>
                )}
                { Combo != null && (
                    <div className='spell-combo' key="Combo"><span style={{color: 'var(--blue-color)'}}>Combo: </span>{ Combo }</div>
                ) }
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
                        }} onClick={() => setThiefRolledGoldAmount(Math.floor((randomInt(1000, 100000) + randomInt(2500, 100000) + randomInt(2500, 100000)) / 3))}>{thiefRolledGoldAmount}</button>
                    </div>
                )}
                { Downside != null && (
                    <div className="spell-red" key="Downside">{ Downside }</div>
                )}
                { Upgrade != null && (
                    <div className='spell-upgrade smaller-font'>
                        { Upgrade }
                    </div>
                ) }
                { (Subspells != null) && spellsFromObject(Subspells).map(s => (
                    <div style={{paddingBottom: 'var(--spell-padding-bottom)'}} key={`subspell-${s.Name}`}>
                        <Spell spell={s} hasBorder={false}/>
                    </div>
                ))}
                { (SpellTable != null && (
                    <EffectTable nameEffectPairs={SpellTable.map((nameEffectPair, i) => {
                        const { Name, Effect } = nameEffectPair
                        const finalName = HasSpellTableNumbers? (i + 1) + '. ' + Name: Name
                        return ({ name: parseTextWithSymbols(finalName), effect: parseTextWithSymbols(Effect)})
                    })}/>
                )) }
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
                { SingleTable != null && (
                    <TableNormal hasBorder={false}>
                        { SingleTable.map(str => (
                            <tr key={str}>
                                <td style={{textAlign: 'left', paddingLeft: '0.75rem'}}>{str}</td>
                            </tr>
                        )) }
                    </TableNormal>
                )}
                { (Monster != null) && (
                    <div style={{padding: 'var(--spell-padding)', paddingTop: '0px'}}>
                        <PetOrAnimalSpell animal={Monster}/>
                    </div>
                )}
                { Notes != null && (
                    <div className='spell-notes italic smaller-font'>
                        { Notes }
                    </div>
                ) }
                { Alternatives != null && (
                    <div className='spell-notes italic smaller-font'>
                        Alternatives: { Alternatives }
                    </div>
                ) }
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
                { subspell != null && <Spell spell={{...subspell, IsSubspell: true}} hasCopyButton={false} hasBorder={false} showTopStats={false}/>}
            </div>
        </div>
    )
}



export const VALID_SPELL_TOP_STATS = [
    'A', 'DisplayA', 'Cost',
    'Range', 'Cooldown', 'Duration',
    'Requirement', 'DisplayRequirement', 'Replacement',
    'Hands', 'Stat', 'Special', 'Price', 'XP'
]

export function getSpellTags(spell) {
    const keywords = spell?.Tags ?? spell?.Tag
    if (keywords == null) {
        return []
    }
    if (Array.isArray(keywords)) {
        return keywords
    }
    if (!isString(keywords)) {
        console.log({spell})
        console.error(`Error getting tag for spell printed above.`)
        return ['Error']
    }
    return keywords.replaceAll(', ', ',').split(',')
    
}
export function SpellTopStats({className, tags, keywords}) {
    const {A, DisplayA, Cost, Range, Cooldown, Duration, Requirement, DisplayRequirement, Replacement, Hands, Stat, Special, Price, XP, Name} = tags
    const validSpellTopTags = getSpellValidTopStatsObject(tags)
    const nTopStats = Object.keys(validSpellTopTags).length

    let displayedA = DisplayA != null? DisplayA : A != null? A : null

    if (QuestGuardConfig.isActionPointsMappingEnabled) {
        if (displayedA in QuestGuardConfig.actionPointsMapping) {
            displayedA = QuestGuardConfig.actionPointsMapping[displayedA]
        }
    }

    const parsedKeywords = getSpellTags({ Tags: keywords })

    function KeywordTags() {
        return <>{ parsedKeywords.map(tag => <div className='tag smaller-font' key={tag}>{ tag }</div>) }</>
    }

    return (
        <div className='relative'>
            <div className={`spell-top-stats smaller-font ${className}`}>
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
            { keywords &&
                <div className='spell-top-stats' style={{paddingTop: 0, marginTop: '-3px', gap: '0rem'}}>
                    <KeywordTags/>
                </div>
            }
        </div>
    )
}

export function SpellTop({
    hasVariants, variantIndex, Variants,
    onIconClick, iconPath, hasIcon,
    DisplayName, Name, showTopStats=true,
    A, item, spell
}) {
    if (spell == null) {
        return <div style={{color: 'red'}}>Error</div>
    }

    const obj = item != null? item: spell
    if (hasIcon === false) {
        return (
            <div className='spell-top'>
                <div className='width-100'>
                    <div className='center-content width-100'>
                        <div className='title-wrapper no-icon'>
                            <div className='title'>{ Name }</div>
                        </div>
                    </div>
                    <div style={{width: '70%', margin: 'auto'}}>
                        { showTopStats === true && <SpellTopStats tags={{...obj, A}} keywords={spell.Tags} className="spell-top-stats--no-padding-side"/>}
                    </div>
                </div>
            </div>
        )
    }

    function SpellTopLeft() {
        const maxVariantIndex = hasVariants? Variants.length: null
        const tintColors = spell.TintColor == null? []: hexColorToRgbVector(spell.TintColor)

        return (
            <div className={`left`}>
                    
                { hasVariants === true && (
                    <div className='variant-counter' onClick={onIconClick}>
                        {variantIndex + 1}/{maxVariantIndex}
                    </div>
                )}

                <div className='spell-icon-wrapper relative'>
                    { hasVariants === true && (
                        <div className='variant-spinner'></div>
                    )}
                    <div className={`spell-img-wrapper ${spell.TintColor == null? '': 'tinted-icon-wrapper'}`} style={{'--tint-rgb': tintColors.join(' ')}}>
                        <img src={iconPath}/>  
                    </div>
                    { spell.HasUpgradeIcon === true && (
                        <div className='secondary-icon-wrapper absolute'>
                            <img src="/Icons/Spells/!UpgradeIcon.png"/>
                        </div>
                    )}
                    { spell.MiniIconName != null && (
                        <div className='secondary-icon-wrapper absolute' style={{borderTop: 'solid black 1px', borderLeft: 'solid black 1px'}}>
                            <img src={
                                spell.MiniIconType == 'Item'?
                                    getItemIconPathByName(spell.MiniIconName)
                                :
                                    getSpellIconPathByName(spell.MiniIconName)
                            }/>
                        </div>
                    ) }
                    { spell.CustomMiniIconPath != null && (
                        <div className='secondary-icon-wrapper absolute' style={{borderTop: 'solid black 1px', borderLeft: 'solid black 1px'}}>
                            <img src={spell.CustomMiniIconPath}/>
                        </div>
                    ) }
                </div>

            </div>
        )
    }

    return (
        <div className='spell-top'>
            <SpellTopLeft
                src={iconPath}
                onIconClick={onIconClick}
                hasSpinner={hasVariants} hasVariants={hasVariants}
                variantIndex={variantIndex} maxVariantIndex={hasVariants? Variants.length: null}
                hasUpgradeIcon={spell.HasUpgradeIcon}
            />

            <div className='flex-1'>
                <div className='title-wrapper'>
                    <div className='title'>{ DisplayName != null? DisplayName : Name }</div>
                </div>
                { showTopStats === true && <SpellTopStats keywords={spell.Tags} tags={{...obj, A: A == null? obj.A : A}}/>}
            </div>
        </div>
    )
}

