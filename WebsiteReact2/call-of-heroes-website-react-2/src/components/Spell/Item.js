
import './Spell.css'
import PageH2 from './../PageH2/PageH2'
import Separator from './../Separator/Separator'
import React, { useEffect, useState } from 'react'
import Icon from '../Icon'
import { insertBetweenAll, ifOk, stringReplaceAllMany, mapObject, parseTextWithSymbols } from '../../utils'
import { SpellTopStats } from './Spell'

export default function Item({ item }) {

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

        Stat,
        Hands,
        Special,
        Requirement,
        Price,
        Damage,
        Range,

        Effect,
        Description,
        Alternatives,
        Notes,
        Downside,

        HasMixins,
        Variants
    } = item
    let DisplayName = item['Display Name'] != null? item['Display Name'] : Name
    let ArmorBonus = item['Armor Bonus']
    let hasVariants = Variants != null

    const iconName = stringReplaceAllMany(Name, [' ', '/', '%'], ['_', '_', ''])

    let extraText = 
        [
            Description,
            Notes,
            Alternatives == null? null : `Alternatives: ${Alternatives}`
        ]
        .filter(thing => thing != null && thing.length > 0)
        .join('\n\n')

    let extraMixins = {}
    if (hasVariants === true) {
        const currentVariant = Variants[variantIndex]
        const variantMixinsCorrectlyFormatted = mapObject(currentVariant, ({key, value}) => ({
            key: key,
            value: () => (<span>{value}</span>)
        }))
        extraMixins = variantMixinsCorrectlyFormatted
    }

    if (HasMixins === true || hasVariants === true) {
        try {
            Effect = parseTextWithSymbols(Effect, extraMixins)
            DisplayName = parseTextWithSymbols(DisplayName, extraMixins)
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

    return (
        <div className={`spell${hasVariants === true? ' spell--with-variants': ''}`}>
            <div className="spell__border"></div>
            <div className="spell__background"></div>
            <div className='spell__box'> {/* This has CSS to be perfectly in the bounds of the borders and banner */}
                <div className='spell-top'>
                    <div className='spell-top__icon-side'>
                        { hasVariants === true && (
                            <div className='spell-top__variant-counter' onClick={onIconClick}>
                                {variantIndex + 1}/{Variants.length}
                            </div>
                        )}
                        <img src={`/Icons/Items/${iconName}.png`}/>
                    </div>
                    <div className='spell-top__title-side'>
                        <div className='spell-top__title__wrapper'>
                            <div className='spell-top__title'>{DisplayName}</div>
                        </div>
                        <SpellTopStats tags={item}/>
                    </div>
                </div>
                <Separator hasNoMarginTop={true}/>
                { descriptionElements != null && (
                    <div className='spell-description'>
                        { descriptionElements }
                    </div>
                )}
                { extraText != null && extraText.length > 0 && (
                    <div className='spell-notes'>
                        { extraText }
                    </div>
                ) }
            </div>
        </div>
    )
}