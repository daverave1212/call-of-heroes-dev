
import './Spell.css'
import './SpellPDF.css'
import Separator from './../Separator/Separator'
import { useEffect, useRef, useState } from 'react'
import { parseTextWithSymbols, stringReplaceAllMany, getSpellIconPathByName, getUniqueSpellID, mapObject, insertBetweenAll, getVariantsForEachCollection, createKey, spellsFromObject, randomInt, assertCorrectSpellFormat, findBasicSpellByName, allEqual, getItemIconPathByName, removeTildes, isString, getDoubleTableTable, getDoubleTableNumberedTable, filterObject, getSpellValidTopStatsObject, hasSpellVariants, getNormalizedSpellName, getSpellOrItemIconPath, parseAndNormalizeSpell, hexColorToRgbVector, getSpellByName, SYMBOLS, isNumber, copyToClipboardAsync, getAllSpellsByName, getAllWeaponsByName, getAllItemsByName } from '../../utils'
import TableNormal from '../TableNormal/TableNormal'
import html2canvas from 'html2canvas'
import CopySpellButton from '../CopyButton/CopySpellButton'
import classNames from 'classnames'
import { PetOrAnimalSpell } from '../../pages/Other/PetOrAnimal'
import Ribbon from '../Ribbon/Ribbon'
import Icon from '../Icon'
import EffectTable from '../TableNormal/EffectTable'
import QuestGuardConfig from '../../QuestGuardConfig.json'
import { getSpellTopStatsIconsAndSpans } from '../../utils'
import { getSpellEffectsObjs } from '../../utils'
import { SpellTop } from './HelperComponents/SpellTop'
import { getSpellTags } from '../../utils'
import { RenderEffect } from './HelperComponents/RenderEffect'

/*
If buttonText != null:
    It will override any button text
If isSelected != null
    It will have a "Select/Unselect" button
If onClick != null:
    It will have onClick
*/


function TempHrA() {
    const style = {
        width: '100%',
        height: '0.5pt',
        background: 'linear-gradient(90deg, var(--theme-color) 0%, rgba(255, 255, 255, 0) 100%)'
    }
    return <div style={style}/>
}
function TempHrB() {
    const style = {
        width: '100%',
        height: '0.1pt',
        backgroundColor: 'rgba(150, 0, 200, 0.1)'
    }
    return <div style={style}/>
}

function TempHr() {
    const style = {
        width: '90%'
    }
    return <img style={style} src="/Separator A.png"/>
}
function SpellPDFTopStats({ spell }) {
    const statsArray = getSpellTopStatsIconsAndSpans(spell)
    return <>
        { statsArray.map(({ name, iconPath, span, text }) => {
            const width =
                (text?.length ?? 0) <= 15?
                    '45%'
                :
                    '90%'
            return (
                <div style={{width}} data-text-length={text.length}>
                    <img src={iconPath} className='inline-icon'/>{span}
                </div>
            )
        }) }
    </>
}
function SpellPDFTags({ spell }) {
    const tags = getSpellTags(spell).map(tag => tag.split(' ').join('\n'))
    const tagsText = tags.join(', ')
    return <>
        { tags.map(tag => <div className='pdfs-tag caps title-font' style={{lineHeight: '1.2em'}}>{tag}</div>) }
    </>
}
export default function SpellPDF({
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

    canChangeVariant=true,
    
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

    const hasVariants = hasSpellVariants(spell)
    const uniqueID = getUniqueSpellID(Name)
    const subspell = SubspellName != null? getSpellByName(SubspellName): null
    
    const [tableHeaders, newTableValuePairs] =
        DoubleTable != null?
            getDoubleTableTable(DoubleTable):
        DoubleTableNumbered != null?
            getDoubleTableNumberedTable(DoubleTableNumbered):
        [null, null]

    const effects = getSpellEffectsObjs(parsedSpell)
    const effectsLower = effects.filter(e => !['Damage', 'Effect'].includes(e.key))

    return <div className='pdfs margin-top-1 relative flex row gap-0'>
        <div className="relative" style={{width: '10mm'}}>
            <img className='absolute top-0 left-0' style={{width: '55mm'}} src="/Book/Card Corner Top Left Light.png"/>
        </div>
        <div style={{paddingTop: '3.5mm'}}>
            <div className='pdfs-top flex row gap-1'>
                <div style={{flex: 2}}>
                    <div className='pdfs-icon-box'>
                        <img className='pdfs-icon' src={IconPath}/>
                    </div>
                </div>
                <div style={{flex: 8}}>
                    <div className='right'>
                        <h4 className='name'>{DisplayName}</h4>
                        <div className='margin-top-half'/>
                        <TempHr/>
                        <div>
                            <div className='flex row column-gap-1 row-gap-half flex-wrap' style={{marginTop: '-1mm'}}>
                                <SpellPDFTopStats spell={parsedSpell}/>
                            </div>
                            {/* <div className='absolute top-0 right-0 flex column gap-quarter'>
                                <SpellPDFTags spell={parsedSpell}/>
                            </div> */}
                            {/* <div className='margin-top-1 flex row gap-1'>
                                <SpellPDFTags spell={parsedSpell}/>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='flex row gap-quarter margin-top-half'>
                <SpellPDFTags spell={parsedSpell}/>
            </div> */}
            <div className='flex row margin-top-1 gap-1 padding-bottom-3q'>
                <div style={{flex: 2}}>
                    <div className='flex column gap-quarter'>
                        <SpellPDFTags spell={parsedSpell}/>
                    </div>
                </div>
                <div style={{flex: 8}}>
                    {parsedSpell.Damage && <RenderEffect name="Damage" value={parsedSpell.Damage}/>}
                    {parsedSpell.Effect && <RenderEffect name="Effect" value={parsedSpell.Effect}/>}
                </div>
            </div>
            
            <div className='flex column margin-top-3q gap-1'>
                { effectsLower.map((e, i) => <>
                    { i != 0 && <TempHrB/> }
                    <RenderEffect name={e.key} value={e.value}/>
                </>) }
            </div>
        </div>

    </div>




    return (
        <div id={uniqueID} style={style} className={classNames(
            'spell',
            'text-font',
            IsSubspell == true? 'subspell' : 'spell--normal',
            A == 'Passive' == true? 'passive' : 'active',
            {
                'with-variants': hasVariants === true,
                'is-item': isItem === true
            },
        )}>
            { hasBorder && <div className='spell-border'></div> } 
            <div className='spell-background'></div>

            <div className='content'> {/* This has CSS to be perfectly in the bounds of the borders and banner */}
                { showTop != false && (<>
                    <SpellTop
                        hasVariants={hasVariants && canChangeVariant} variantIndex={variantIndex} Variants={Variants}
                        iconPath={IconPath} hasIcon={hasIcon}
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
                </>)}
                { PreEffectGreen != null && (
                    <div className="spell-green" key="PreEffectGreen">{ PreEffectGreen }</div>
                ) }
                { Effect != null && (
                    <div className='spell-description'>
                        { Effect }
                        { List != null && (
                            List.map(li => (
                                <div style={{marginTop: 'var(--spell-padding-small)'}}>
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
                { RollThiefGold != null && (
                    <div className='spell-description center-content'>
                        <button onClick={() => setThiefRolledGoldAmount(Math.floor((randomInt(1000, 100000) + randomInt(2500, 100000) + randomInt(2500, 100000)) / 3))}>{thiefRolledGoldAmount}</button>
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
                { EffectOrange != null && (
                    <div className='spell-upgrade smaller-font' style={{color: 'var(--orange-color)'}}>
                        { EffectOrange }
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
                <div style={{paddingBottom: 'calc(var(--spell-padding-bottom) / 4)'}}></div>
                { subspell != null && <Spell spell={{...subspell, IsSubspell: true}} hasCopyButton={false} hasBorder={false} showTopStats={false}/>}
            </div>
        </div>
    )
}
