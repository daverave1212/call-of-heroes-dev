
import './Spell.css'
import PageH2 from './../PageH2/PageH2'
import Separator from './../Separator/Separator'
import React, { useEffect, useState } from 'react'
import Icon from '../Icon'
import { insertBetweenAll, ifOk, stringReplaceAllMany, mapObject, parseTextWithSymbols, getUniqueSpellID, normalizeForEachVariantsToNormalVariants, spellsFromObject, findBasicSpellByName, getSpellIconPathByName, getItemIconPathByName, allEqual } from '../../utils'
import Spell, { SpellBackground, SpellBorder, SpellTop } from './Spell'
import html2canvas from 'html2canvas'
import CopySpellButton from '../CopyButton/CopySpellButton'
import classNames from 'classnames'

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

    let hasVariants = Variants != null || VariantsForEach != null

    let iconPath = CustomIconPath == null? getItemIconPathByName(Name) : CustomIconPath
    const uniqueID = getUniqueSpellID(Name)

    // let extraText = 
    //     [
    //         Description,
    //         Notes,
    //         Alternatives == null? null : `Alternatives: ${Alternatives}`
    //     ]
    //     .filter(thing => thing != null && thing.length > 0)
    //     .join('\n\n')

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
            // if (extraText.length > 0) extraText = parseTextWithSymbols(extraText)
        } catch (e) {
            // console.log({Effect, DisplayName, SubspellName, extraText})
            throw `Error in Item ${Name} parsing text: ${e} (Item object printed above)`
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
                    onIconClick={onIconClick} iconPath={iconPath} hasIcon={hasIcon}
                    DisplayName={DisplayName} Name={Name} showTopStats={showTopStats}
                    A={A} item={item}
                />

                <Separator hasNoMarginTop={true}/>
                { Damage == null? null : (
                    <div key="Damage" className='spell-description' style={{
                        paddingBottom: allEqual([Effect, EffectGreen, Downside, Upgrade, Notes, Alternatives], null)?   // Extra padding bottom if there is nothing after damage
                            'var(--spell-padding-bottom':
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
                { Downside != null && (
                    <>
                        <Separator/>
                        <div className="spell-red" key="Downside">{ Downside }</div>
                        <Separator/>
                    </>
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
                { Alternatives != null && (
                    <div className='spell-notes'>
                        Alternatives: { Alternatives }
                    </div>
                ) }
                {/* { allEqual([Effect, EffectGreen, Downside, Upgrade, Notes, Alternatives], null) && (
                    <div className='spell-notes'>
                    </div>
                ) } */}


                <CopySpellButton elementId={uniqueID} shouldAddBorder={true}/>
                { subspell != null && <Spell spell={subspell} hasCopyButton={false} showTopStats={false}/>}
            </div>
        </div>
    )
}