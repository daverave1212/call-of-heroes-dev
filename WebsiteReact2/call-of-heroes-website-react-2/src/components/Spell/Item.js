
import './Spell.css'
import PageH2 from './../PageH2/PageH2'
import Separator from './../Separator/Separator'
import React, { useEffect, useState } from 'react'
import Icon from '../Icon'
import { insertBetweenAll, ifOk, stringReplaceAllMany, mapObject, parseTextWithSymbols, getUniqueSpellID, normalizeForEachVariantsToNormalVariants, spellsFromObject, findBasicSpellByName, getSpellIconPathByName, getItemIconPathByName } from '../../utils'
import Spell, { SpellBackground, SpellBorder, SpellTop, SpellTopStats } from './Spell'
import html2canvas from 'html2canvas'
import CopySpellButton from '../CopyButton/CopySpellButton'
import classNames from 'classnames'

window.html2canvas = html2canvas

export default function Item({ item, style, hasIcon, hasCopyButton=true, showTopStats=true }) {

    const [variantIndex, setVariantIndex] = useState(0)

    if (item == null) {
        throw `Given null item to Item: ${item}`
    }
    if (item.Name == null) {
        console.log({item})
        throw `Item has no Name (printed above): ${item}`
    }

    let {
        Name,
        A,

        Stat,
        Hands,
        Special,
        Requirement,
        Price,
        Damage,
        Upgrade,
        Range,

        Effect,
        EffectGreen,
        Description,
        Alternatives,
        Notes,
        Downside,

        HasMixins,
        CustomIconPath,
        Variants,
        VariantsForEach,
        SubspellName
    } = item
    let DisplayName = item['Display Name'] != null? item['Display Name'] : Name
    let ArmorBonus = item['Armor Bonus']
    let hasVariants = Variants != null || VariantsForEach != null

    let iconPath = CustomIconPath == null? getItemIconPathByName(Name) : CustomIconPath
    const uniqueID = getUniqueSpellID(Name)

    let extraText = 
        [
            Description,
            Notes,
            Alternatives == null? null : `Alternatives: ${Alternatives}`
        ]
        .filter(thing => thing != null && thing.length > 0)
        .join('\n\n')
    console.log(`For item ${DisplayName} extra text is:`)
    console.log({extraText})

    let extraMixins = {}
    if (hasVariants === true && VariantsForEach != null) {
        Variants = normalizeForEachVariantsToNormalVariants(VariantsForEach)
    }
    if (hasVariants === true) {
        const currentVariant = Variants[variantIndex]
        const variantMixinsCorrectlyFormatted = mapObject(currentVariant, ({key, value}) => ({
            key: key,
            value: () => value
        }))
        extraMixins = variantMixinsCorrectlyFormatted
        if (currentVariant.IconName != null) iconPath = getItemIconPathByName(currentVariant.IconName)
        if (currentVariant.DisplayA != null) A = currentVariant.DisplayA
    }
    if (HasMixins === true || hasVariants === true) {
        try {
            Effect = parseTextWithSymbols(Effect, extraMixins)
            DisplayName = parseTextWithSymbols(DisplayName, extraMixins)
            if (SubspellName != null) SubspellName = parseTextWithSymbols(SubspellName, extraMixins, true)
            if (extraText.length > 0) extraText = parseTextWithSymbols(extraText)
        } catch (e) {
            throw `Error in Item ${Name} parsing text: ${e}`
        }
    }

    let descriptionElements = [
        Damage == null? null : (
            <span key="Damage"><Icon name="Damage"/>{ Damage }</span>
        ),
        ArmorBonus == null? null : (
            <span key="ArmorBonus">{ ArmorBonus } <Icon name="Defense"/>Defense</span>
        ),
        Effect == null? null : (
            <span key="Effect">{ Effect }</span>
        ),
        Downside == null? null : (
            <span key="Downside" style={{ color: 'red' }}>{ Downside }</span>
        )
    ].filter(elem => elem != null)
    
    function onIconClick() {
        if (hasVariants !== true)
            return
        let nextVariantIndex = variantIndex + 1
        if (nextVariantIndex >= Variants.length) {
            nextVariantIndex = 0
        }
        setVariantIndex(nextVariantIndex)
    }

    let subspell
    if (SubspellName != null) {
        console.log('Subspell: ' + SubspellName)
        subspell = findBasicSpellByName(SubspellName)
    }
    

    return (
        <div id={uniqueID} className={classNames('spell', {'spell--with-variants': hasVariants === true})}>
            <SpellBorder/>
            <SpellBackground/>
            <div className='spell__box'> {/* This has CSS to be perfectly in the bounds of the borders and banner */}
                
                <SpellTop
                    hasVariants={hasVariants} Variants={Variants} variantIndex={variantIndex}
                    onIconClick={onIconClick} iconPath={iconPath} hasIcon={true}
                    DisplayName={DisplayName} Name={Name} showTopStats={showTopStats}
                    A={A} item={item}
                />

                <Separator hasNoMarginTop={true}/>
                { Damage == null? null : (
                    <div key="Damage" className='spell-description' style={{paddingBottom: 'calc(var(--spell-padding-bottom) / 2)'}}><Icon name="Damage"/>{ Damage }</div>
                )}
                { Effect != null && (
                    <div className='spell-description'>
                        { Effect }
                    </div>
                )}
                { EffectGreen != null && (
                    <div className="spell-green" key="EffectGreen">{ EffectGreen }</div>
                ) }
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


                <CopySpellButton elementId={uniqueID} shouldAddBorder={true}/>
                { subspell != null && <Spell spell={subspell} hasCopyButton={false} showTopStats={false}/>}
            </div>
        </div>
    )
}