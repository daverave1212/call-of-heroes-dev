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

export default function Prices({ hasNoMargins, onClick, shouldPlayAnimationOnClick=false }) {

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

    function PriceTable({categoryName}) {
        if (prices[categoryName] == null) {
            console.log(`NOT FOUND: ${categoryName}`)
            return (<p></p>)
        }
        return (
            <TableNormal type="info-reverse" columns={[categoryName, 'Price']} tableWrapperClass='table-normal-wrapper--non-alternating'>
                { Object.keys(prices[categoryName]).map(name => (
                    typeof prices[categoryName][name] != 'object' ? (
                        <Tr name={name} price={prices[categoryName][name]} key={name}/>
                    ) : (
                        <Tr name={name} price={prices[categoryName][name].Price} effect={prices[categoryName][name].Effect} key={name}/>
                    )
                )) }
            </TableNormal>
        )
    }

    return (
        <Page title="Prices" hasNoMargins={hasNoMargins}>
            <TwoColumns>
                <Column>
                    <PriceTable categoryName="Weapons and Equipment"/>
                    <PriceTable categoryName="Magic and Religion"/>
                    <PriceTable categoryName="Potions and Poisons"/>
                    <PriceTable categoryName="Instruments"/>
                    <PriceTable categoryName="Mounts"/>
                    <PriceTable categoryName="Exotic Mounts"/>
                    <PriceTable categoryName="Boats"/>
                    <PriceTable categoryName="Magic Items"/>
                </Column>
                <Column>
                    <PriceTable categoryName="Adventuring Gear"/>
                    <PriceTable categoryName="General Goods"/>
                    <PriceTable categoryName="Services"/>
                    <PriceTable categoryName="Metals (Per 100grams)"/>
                    <PriceTable categoryName="Tools"/>
                    <PriceTable categoryName="Other Items"/>
                    <PriceTable categoryName="Vehicles"/>
                    <PriceTable categoryName="Houses"/>
                </Column>
            </TwoColumns>
        </Page>
    )
}