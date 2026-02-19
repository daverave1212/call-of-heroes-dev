import './Spell.css'
import './BookSpell.css'
import Separator from './../Separator/Separator'
import { useEffect, useRef, useState } from 'react'
import { parseTextWithSymbols, stringReplaceAllMany, getSpellIconPathByName, getUniqueSpellID, mapObject, insertBetweenAll, getVariantsForEachCollection, createKey, spellsFromObject, randomInt, assertCorrectSpellFormat, findBasicSpellByName, allEqual, getItemIconPathByName, removeTildes, isString, getDoubleTableTable, getDoubleTableNumberedTable, filterObject, getSpellValidTopStatsObject, hasSpellVariants, getNormalizedSpellName, getSpellOrItemIconPath, parseAndNormalizeSpell, hexColorToRgbVector, getSpellByName } from '../../utils'
import TableNormal from '../TableNormal/TableNormal'
import html2canvas from 'html2canvas'
import CopySpellButton from '../CopyButton/CopySpellButton'
import classNames from 'classnames'
import { PetOrAnimalSpell } from '../../pages/Other/PetOrAnimal'
import Ribbon from '../Ribbon/Ribbon'
import Icon from '../Icon'
import EffectTable from '../TableNormal/EffectTable'
import QuestGuardConfig from '../../QuestGuardConfig.json'


export default function BookSpell({ 
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

    const variantIndex = metadata?.variantIndex ?? spell.DefaultVariantIndex ?? 0
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

    const subspell = SubspellName != null? getSpellByName(SubspellName): null
    const hasEffectsOrMore = !allEqual([Effect, EffectGreen, Downside, Upgrade, Notes, Alternatives], null)

    return <div style={style} className={classNames(
        'spell book-spell',
        IsSubspell == true? 'subspell' : 'spell--normal',
        A == 'Passive' == true? 'passive' : 'active'
    )}>
        <div className='spell-background'></div>
        <div className='spell-border'></div>
        <img className="book-spell-img fade-diagonal" src={IconPath}/>
        <div className='content relative'>
            <h2>{Name}</h2>
            <div className='h2-underline margin-bottom-1'></div>
            <p>{Effect}</p>
        </div>

    </div>
}
