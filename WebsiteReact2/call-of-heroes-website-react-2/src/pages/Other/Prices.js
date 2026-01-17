import React from 'react'
import { useState } from 'react'

import * as U from '../../utils'

import armors from '../../databases/Armors.json'

import ManyBoxes from '../../components/Spell/ManyBoxes'
import PageH2 from '../../components/PageH2/PageH2'
import PageH1 from '../../components/PageH1/PageH1'
import Page from '../../containers/Page/Page'

import prices from '../../databases/Prices.json'
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import TwoColumnsDescriptive from '../../components/TwoColumns/TwoColumnsDescriptive'
import Column from '../../components/TwoColumns/Column'
import TableNormal from '../../components/TableNormal/TableNormal'
import Icon from '../../components/Icon'
import FloatingText from '../../components/FloatingText/FloatingText'

const effectTextStyle = {
    color: 'gray',
    fontStyle: 'italic',
    fontSize: '0.9em',
    marginBottom: '0px'
}

function Tr({name, effect, price}) {

    let [isPlayingAnimation, setIsPlayingAnimation] = useState(false)
    let [floaterX, setFloaterX] = useState(0)

    function onTrClick(evt) {
        if (shouldPlayAnimationOnClick) {
            const rect = evt.target.getBoundingClientRect();
            const x = evt.clientX - rect.left; // mouse X relative to div
            setFloaterX(x)
            setIsPlayingAnimation(true)
            setTimeout(() => {
                setIsPlayingAnimation(false)
            }, 800 - 50)
        }
        onClick?.({name, effect, price})
    }

    return (
        <tr className='price-row' onClick={evt => onTrClick(evt)}>
            <td style={{position: 'relative'}}>
                { isPlayingAnimation && (
                    <FloatingText left={`${floaterX}px`}>Added to Cart!</FloatingText>
                ) }
                <span>{name}</span>
                <p style={effectTextStyle}>{effect}</p>
            </td>
            <td>{price}<Icon name="Gold"/></td>
        </tr>
    )
}
export const getItemPrice = item => item?.Price ?? item
export function normalizeItemsObject(items) {
    return U.mapObject(items, ({ key, value }) => ({ key, value: (
        value.Price != null? value: { Price: value }
    )}))
}
export function PriceTable({title, items}) {    
    if (items == null) {
        return (<p>ERROR: No items given to PriceTable.</p>)
    }

    return (
        <TableNormal type="info-reverse" columns={[title, 'Price']} tableWrapperClass='table-normal-wrapper--non-alternating'>
            { items.map(({ Name, Price, Effect }) => (
                <Tr name={Name} price={Price} effect={Effect} key={Name}/>
            )) }
        </TableNormal>
    )
}

export default function Prices({ hasNoMargins, onClick, shouldPlayAnimationOnClick=false }) {

    const allItems = Object.values(U.getAllPricesByName())

    function CategoryPriceTable({ categoryName }) {
        return <PriceTable title={categoryName} items={allItems.filter(item => item.Category == categoryName)}/>
    }

    return (
        <Page title="Prices" hasNoMargins={hasNoMargins}>
            <TwoColumns>
                <Column>
                    <CategoryPriceTable categoryName="Weapons and Equipment"/>
                    <CategoryPriceTable categoryName="Crafting"/>
                    <CategoryPriceTable categoryName="Magic and Religion"/>
                    <CategoryPriceTable categoryName="Potions and Poisons"/>
                    <CategoryPriceTable categoryName="Instruments"/>
                    <CategoryPriceTable categoryName="Mounts"/>
                    <CategoryPriceTable categoryName="Exotic Mounts"/>
                    <CategoryPriceTable categoryName="Boats"/>
                    <CategoryPriceTable categoryName="Magic Items"/>
                </Column>
                <Column>
                    <CategoryPriceTable categoryName="Adventuring Gear"/>
                    <CategoryPriceTable categoryName="General Goods"/>
                    <CategoryPriceTable categoryName="Services"/>
                    <CategoryPriceTable categoryName="Metals (Per 100grams)"/>
                    <CategoryPriceTable categoryName="Tools"/>
                    <CategoryPriceTable categoryName="Other Items"/>
                    <CategoryPriceTable categoryName="Vehicles"/>
                    <CategoryPriceTable categoryName="Houses"/>
                </Column>
            </TwoColumns>
        </Page>
    )
}