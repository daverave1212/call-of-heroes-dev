
import './Spell.css'
import Separator from '../Separator/Separator'
import { useEffect, useRef, useState } from 'react'
import { allEqual, assertCorrectSpellFormat, copyToClipboardAsync, createKey, findBasicSpellByName, getAllItemsByName, getAllSpellsByName, getAllWeaponsByName, getDoubleTableNumberedTable, getDoubleTableTable, getNormalizedSpellName, getSpellByName, getSpellOrItemIconPath, getSpellTopStatIconAndSpan, getSpellTopStatsIconsAndSpans, getUniqueSpellID, getVariantsForEachCollection, hasSpellVariants, insertBetweenAll, mapObject, mapObjectToArray, parseAndNormalizeSpell, parseTextWithSymbols, randomInt, removeTildes, spellsFromObject, stringReplaceAllMany, SYMBOLS } from '../../utils'
import TableNormal from '../TableNormal/TableNormal'
import html2canvas from 'html2canvas'
import CopySpellButton from '../CopyButton/CopySpellButton'
import classNames from 'classnames'
import { PetOrAnimalSpell } from '../../pages/Other/PetOrAnimal'
import Ribbon from '../Ribbon/Ribbon'
import Icon from '../Icon'
import EffectTable from '../TableNormal/EffectTable'
import QuestGuardConfig from '../../QuestGuardConfig.json'
import { ItemTop, SpellTop } from './HelperComponents/SpellTop'

export const VALID_SPELL_EFFECTS = [
    'Damage', 'PreEffectGreen',
    'Effect', 'Combo', 'Downside',
    'Upgrade', 'EffectOrange',
    'Notes', 'Alternatives'
]
window.getSpellTopStatIconAndSpan = getSpellTopStatIconAndSpan
window.getSpellTopStatsIconsAndSpans = getSpellTopStatsIconsAndSpans
/*
If buttonText != null:
    It will override any button text
If isSelected != null
    It will have a "Select/Unselect" button
If onClick != null:
    It will have onClick
*/

export default function Spell({
    spellName,
    itemName,

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
    onXClick,
    buttonText,
    
    metadata
}) {

    if (spell == null) {
        if (spellName != null) {
            spell = getAllSpellsByName()[spellName]
        } else if (itemName != null) {
            spell = getAllItemsByName()[itemName]
        } else {
            return <div>ERROR: null spell given to component Spell.</div>
        }
    }

    if (spell == null) {
        return <div>ERROR: spell is null! Gave spellName as {spellName} and itemName as {itemName}</div>
    }

    if (metadata == null) {
        metadata = spell.metadata
    }
    const baseVariantIndex = metadata?.variantIndex ?? spell.DefaultVariantIndex ?? 0

    const [variantIndex, setVariantIndex] = useState(baseVariantIndex)
    const [thiefRolledGoldAmount, setThiefRolledGoldAmount] = useState('Click here to roll 1000d100!')
    const [exportButtonState, setExportButtonState] = useState({
        style: {
            backgroundColor: null
        },
        text: 'Export to Clipboard'
    })

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
        Tags,
        HasExportButton
    } = spell

    const parsedSpell = spell.IsAlreadyParsed? spell: parseAndNormalizeSpell(spell, {
        isItem,
        variantIndex
    })

    let {
        Name, DisplayName, A, IconPath,
        Effect, EffectGreen, EffectOrange, Downside, Upgrade, Combo, Notes,
        Variants, SubspellName,
        Damage,
        List
    } = parsedSpell
    const SkillBonuses = parsedSpell['Skill Bonuses']

    if (PreEffectGreen != null) {
        console.log({PreEffectGreen})
        console.log(`PreEffectGreen is not null for spell ${Name}`)
    }

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

    function onIconRightClick() {
        if (hasVariants !== true)
            return
        if (isSelected == true) {
            return
        }
        let nextVariantIndex = variantIndex - 1
        if (nextVariantIndex < 0) {
            nextVariantIndex =  Variants.length - 1
        }
        setVariantIndex(nextVariantIndex)
    }
    async function exportToClipboard() {
        try {
            const spellToExport = { ...spell, metadata }    // Encapsulate the metadata within the spell, if any
            const spellJSON = JSON.stringify(spellToExport)
            await copyToClipboardAsync(spellJSON)
            setExportButtonState({
                style: {
                    backgroundColor: 'green'
                },
                text: '✔ Copied to Clipboard'
            })
        } catch (e) {
            console.error(e)
            setExportButtonState({
                style: {
                    backgroundColor: 'red'
                },
                text: 'Error'
            })
        }
        setTimeout(() => {
            setExportButtonState({
                style: {
                    backgroundColor: null
                },
                text: 'Copy to Clipboard'
            })  
        }, 3500)
    }



    return (
        <div data-selectable={isSelected != null} id={uniqueID} style={style} className={classNames(
            'spell',
            'text-font',
            IsSubspell == true? 'subspell' : 'spell--normal',
            A == 'Passive' == true? 'passive' : 'active',
            {
                'with-variants': hasVariants === true,
                'is-item': isItem === true
            },
        )}>
            { isSelected && <Ribbon>Selected!</Ribbon>}
            { hasBorder && <div className='spell-border'></div> } 
            <div className='spell-background'></div>

            { onXClick && <div className='x-button' onClick={() => onXClick(spell)}>
                ×
            </div> }

            <div className='content'> {/* This has CSS to be perfectly in the bounds of the borders and banner */}
                { showTop != false && isItem? (
                    <>
                        <SpellTop
                            hasVariants={hasVariants && canChangeVariant} variantIndex={variantIndex} Variants={Variants}
                            onIconClick={onIconClick} onIconRightClick={onIconRightClick} iconPath={IconPath} hasIcon={hasIcon}
                            DisplayName={DisplayName} Name={Name} showTopStats={showTopStats}
                            A={A} spell={parsedSpell}
                        />
                    </>
                ): (<>
                    <SpellTop
                        hasVariants={hasVariants && canChangeVariant} variantIndex={variantIndex} Variants={Variants}
                        onIconClick={onIconClick} onIconRightClick={onIconRightClick} iconPath={IconPath} hasIcon={hasIcon}
                        DisplayName={DisplayName} Name={Name} showTopStats={showTopStats}
                        A={A} spell={parsedSpell}
                    />
                    { showTopStats != false && <Separator hasNoMarginTop={true}/> }
                </>) }
                { showTopStats == false && <div style={{marginTop: '-1rem'}}></div>}

                <div className='spell-effects-box flex column gap-1'>
                    { Damage && (<>
                        <div key="Damage" className='spell-description'>
                            <Icon name="Damage"/>{ Damage }
                        </div>
                    </>)}
                    { PreEffectGreen != null && (
                        <div className="spell-green" key="PreEffectGreen">{ PreEffectGreen }</div>
                    ) }
                    { Effect != null && (
                        <div className='spell-description'>
                            { Effect }
                            { List != null && (
                                List.map(li => (
                                    <div key={li} style={{marginTop: 'var(--spell-padding-small)'}}>
                                        {SYMBOLS.Diamond.func()} {li}
                                    </div>
                                ))
                            ) }
                        </div>
                    )}
                    { Combo != null && (
                        <div className='spell-combo' key="Combo"><span style={{color: 'var(--blue-color)'}}>Combo: </span>{ Combo }</div>
                    ) }
                    { EffectGreen != null && (
                        <div className="spell-green" key="EffectGreen">{ EffectGreen }</div>
                    ) }
                    { SkillBonuses && <div className='spell-description'>
                        { Object.entries(SkillBonuses).map(([name, value], i) => (<span key={`${name}-${i}`}>
                            { value > 0?
                                <span>Skill: <span style={{color: 'var(--green-color)'}}>{name}</span><br/></span>
                            :
                                <span>Flaw: <span style={{color: 'red'}}>{name}</span><br/></span> }
                        </span>)) }
                    </div> }
                    { RollThiefGold != null && (
                        <div className='spell-description center-content'>
                            <button onClick={() => setThiefRolledGoldAmount(Math.floor((randomInt(1000, 100000) + randomInt(2500, 100000) + randomInt(2500, 100000)) / 3))}>{thiefRolledGoldAmount}</button>
                        </div>
                    )}
                    { Downside != null && (
                        <div className="spell-red" key="Downside">{ Downside }</div>
                    )}
                    { Upgrade != null && (
                        <div className='spell-upgrade smaller-font'>{ Upgrade }</div>
                    ) }
                    { EffectOrange != null && (
                        <div className='spell-upgrade smaller-font' style={{color: 'var(--orange-color)'}}>{ EffectOrange }</div>
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
                        <TableNormal columns={tableHeaders} hasBorder={false} type={DoubleTable?.IsRighty? 'info': null}>
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
                            { (Array.isArray(SingleTable)? SingleTable: SingleTable.Values).map(str => (
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
                        <div className='spell-notes italic smaller-font'>{ Notes }</div>
                    ) }
                    { Alternatives != null && (
                        <div className='spell-notes italic smaller-font'>Alternatives: { Alternatives }</div>
                    ) }
                    { HasExportButton === true && <div className='center-content'>
                        <button
                            onClick={exportToClipboard}
                            style={{
                                ...exportButtonState.style,
                                maxWidth: '50%'
                            }}
                        >
                            {exportButtonState.text}
                        </button>
                    </div> }
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
        </div>
    )
}





