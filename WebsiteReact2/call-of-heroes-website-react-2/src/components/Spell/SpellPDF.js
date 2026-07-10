
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
import { getSpellTags, getSpellTopStatsIconsAndSpans, SpellTop, SpellTopStats, VALID_SPELL_TOP_STATS } from './Spell'
import PageH3 from '../PageH3/PageH3'

/*
If buttonText != null:
    It will override any button text
If isSelected != null
    It will have a "Select/Unselect" button
If onClick != null:
    It will have onClick
*/


function TempHr() {
    const style = {
        width: '100%',
        height: '0.5pt',
        background: 'linear-gradient(90deg, var(--theme-color) 0%, rgba(255, 255, 255, 0) 100%)'
    }
    return <div style={style}/>
}
function SpellPDFTopStats({ spell }) {
    const statsArray = getSpellTopStatsIconsAndSpans(spell)
    return <>
        { statsArray.map(({ name, iconPath, span }) => (
            <span>
                <img src={iconPath} className='inline-icon'/>{span}
            </span>
        )) }
    </>
}
function SpellPDFTags({ spell }) {
    const tags = getSpellTags(spell)
    const tagsText = tags.join(', ')
    return <>
        { tags.map(tag => <div className='pdfs-tag'>{tag}</div>) }
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



    return <div className='pdfs margin-top-1'>
        <div className='pdfs-top flex row gap-1'>
            <div style={{flex: 1}}>
                <div className='pdfs-icon-box'>
                    <img className='pdfs-icon' src={IconPath}/>
                </div>
            </div>
            <div style={{flex: 8}}>
                <div className='right'>
                    <h4 className='pdf-title-font'>{DisplayName}</h4>
                    <TempHr/>
                    <div>
                        <div className='flex column margin-top-half'>
                            <SpellPDFTopStats spell={parsedSpell}/>
                        </div>
                        {/* <div className='absolute top-0 right-0 flex column gap-quarter'>
                            <SpellPDFTags spell={parsedSpell}/>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
        {/* <div className='flex row gap-quarter margin-top-half'>
            <SpellPDFTags spell={parsedSpell}/>
        </div> */}
        <div className='margin-top-3q'>
            <p>{Effect}</p>
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
