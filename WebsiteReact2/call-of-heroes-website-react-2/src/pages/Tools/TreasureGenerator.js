import React, { useState } from 'react'

import abilities from '../../databases/Abilities.json'
import spellSchoolDescriptions from '../../databases/Other/SpellSchoolDescriptions.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'

import prices from '../../databases/Prices.json'
import { isLocalhost, randomInt, randomOf } from '../../utils'

export default function TreasureGenerator() {

    function getEquipmentInRange(maxPrice) {
        const pricesEquipment = prices['Weapons and Equipment']
        const equipmentPricesSortedAsc = Object.keys(pricesEquipment)
            .map(eqName => ({ name: eqName, price: pricesEquipment[eqName] / 4}))   // Divide by 4 because that's the sell price
            .sort((a, b) => (a.price - b.price))
        const possibilities = equipmentPricesSortedAsc.filter(eq => eq.price <= maxPrice)
        console.log(`Poses: ${possibilities.length}`)
        if (possibilities.length == 0) return null
        return randomOf(...possibilities)
    }
	function generateTrinket(maxPrice) {
        function getSimpleObject() {
            const material = randomOf(
                { name: 'wood', priceMultiplier: 1 },
                { name: 'metal', priceMultiplier: 1.5 },
                { name: 'silver', priceMultiplier: 3.5 },
                { name: 'gold', priceMultiplier: 8 },

            )
            const object = randomOf(
                { name: 'cutlery set', price: 20 },
                { name: 'toothpick set', price: 6 },
                { name: 'plate set', price: 30 },
                { name: 'tankard', price: 15 },
                { name: 'pot', price: 10 },
                { name: 'glass', price: 15 },
                { name: 'jar', price: 8 },
                { name: 'egg', price: 8 },
                { name: 'amulet', price: 25 },
                { name: 'ring', price: 14 },
                { name: 'chain', price: 18 },
            )
            return { name: `A ${material.name} ${object.name}`, price: object.price * material.priceMultiplier }
        }
		function getBottle() {
            const material = randomOf(
                { name: 'empty', priceMultiplier: 1 },
                { name: 'mead', priceMultiplier: 2 },
                { name: 'wine', priceMultiplier: 4.5 },
            )
            const price = 35
            return { name: `One ${material.name} bottle`, price: price * material.priceMultiplier }
        }
        function getCharm() {
            const material = randomOf(
                { name: 'simple', priceMultiplier: 1 },
                { name: 'ornate', priceMultiplier: 2 },
                { name: 'masterwork', priceMultiplier: 4.5 },
            )
            const object = randomOf(
                { name: 'tusk', price: 20 },
                { name: 'candle set', price: 12 },
                { name: 'whistle', price: 15 },
                { name: 'mirror', price: 10 },
                { name: 'sack', price: 15 },
                { name: 'handbag', price: 38 },
                { name: 'set of clothes', price: 22 }
            )
            return { name: `A ${material.name} ${object.name}`, price: object.price * material.priceMultiplier }
        }
        function getPrecious() {
            const amount = randomOf(
                { name: 'One', priceMultiplier: 1 },
                { name: 'A bag of', priceMultiplier: randomInt(3, 7) }
            )
            const quality = randomOf(
                { name: 'cracked', priceMultiplier: 0.75 },
                { name: 'simple', priceMultiplier: 1 },
                { name: 'masterfully cut', priceMultiplier: randomInt(2, 4) }
            )
            const object = randomOf(
                { name: 'agate', price: 11 },
                { name: 'quartz', price: 11 },
                { name: 'malachite', price: 12 },
                { name: 'tiger eye', price: 13 },
                { name: 'citrine', price: 26 },
                { name: 'jasper', price: 28 },
                { name: 'amber', price: 36 },
                { name: 'amethyst', price: 38 },
                { name: 'jade', price: 39 },
                { name: 'emerald', price: 101 },
                { name: 'sapphire', price: 102 },
                { name: 'diamond', price: 153 },
                { name: 'ruby', price: 154 },
            )
            return {
                name: `${amount.name} ${quality.name} ${object.name}`,
                price: object.price * quality.priceMultiplier * amount.priceMultiplier
            }
        }

        console.log(`Generating with maxPrice ${maxPrice}`)

        let foundLoot
        let nTries = 0
        while (true) {
            const foundLootFunc = randomOf(
                getSimpleObject,
                getBottle,
                getCharm,
                getPrecious
            )
            const maybeThisLoot = foundLootFunc()
            console.log({maybeThisLoot})
            if (maybeThisLoot.price < maxPrice) {
                foundLoot = maybeThisLoot
                break
            } else {
                nTries += 1
                if (nTries >= 35)
                    break
            }
        }
        console.log(`Returning ${foundLoot}`)
        return foundLoot
        
    }      
    function getScroll(maxPrice) {
        const spellsByPrice = {
            125: [
                'Acid Burst',
                'Burning Breath',
                'Wind Chaser',
                'Cleansing Flames',
                'Moonsun Fire (Druid)',
                'Force Pulse (Mage)',
            ],
            250: [
                'Glory Shout',
                'Frost Nova',
                'Heat Metal',
                'Fire Bolt',
                'Frostbite',
                'Thunder Clap',
                'Magic Missiles',
                'Feather Fall',
                'Flash',
                'Locust Swarm',
                'Revitalize',
                'Wild Heart',
                'Shadow Clone',
                'Fairy Fire',
                'Confusion',
                'Curse of Pain',
                'Eldritch Blast',
                'Hollow Touch',
                'Radiant Smite',
                'Radiance',
                'Restoration',
                'Expelling Bolt',
                'Spread the Awe',
                'Blessing (Cleric)',
                'Grasp',
                'Repentance',
                'Penitence (Cleric)',
                'Shapeshift (Druid)',
                'Regrowth (Druid)',
                'Black Charm (Druid)',
                'Raise Wall (Druid)',
                'Storm (Druid)',
                'Wild Roots (Druid)',
                'Hunter Mark (Hunter)',
                'Star Burst (Mage)',
                'Artificer - Autoturret (Mage)',
                'Divine Rain (Paladin)',
                'Shadowstep (Rogue)',
                'Planned Assassination (Rogue)',
                'Mind Sight (Shaman)',
                'Dream Walk (Shaman)',
                'Psyche Tether (Shaman)',
                'Jotunn (Shaman)',
            ],
            400: [
                'Chilling Shout',
                'Frost Rune',
                'Explosion Rune',
                'Fire Enchantment',
                'Flame Strike',
                'Scorching Rays',
                'Invisibility',
                'Levitate',
                'Arcane Spear',
                'Water Walk',
                'Healing Surge',
                'Spider Climb',
                'Force Wall',
                'Web',
                'Dancing Weapon',
                'Fog Cloud',
                'Locate Unit',
                'Mind Blast',
                'Deathfire Bolt',
                'Guiding Bolt',
                'Restful Soothing',
                'Rise',
                'Fearing Ward',
                'Equinox (Druid)',
                'Consacrated Zone (Paladin)',
                'Divine Reach (Paladin)',
                'Divine Blast (Paladin)',
                'Earthshattering Wave (Shaman)',
                'Ruining Shout (Shaman)',
            ],
            550: [
                'Ice Spike',
                'Fire Ball',
                'Slow',
                'Animate Dead',
                'Polymorph',
                'Black Hole (Cleric)',
                'Shadow Realm (Cleric)',
                'Tremor Wave (Hunter)',
                'Crosshair Shot (Hunter)',
                'Warden Corral (Hunter)',
                'Ravage (Hunter)',
                'Cutting Field (Mage)',
                'Arcane Comet (Mage)',
                'Sanctuary Zone (Paladin)',
                'Reckoning (Paladin)',
                'Blade Tempest (Rogue)',
            ]
        }

        const priceRanges = [
            125,
            250,
            400,
            550
        ].filter(price => price <= maxPrice)
        
        if (priceRanges.length == 0) return null

        const price = randomOf(...priceRanges)
        const spellName = randomOf(...spellsByPrice[price])
        return { name: `Scroll of ${spellName}`, price: price }
    }
    function generateTreasure(gold) {
        const totalGoldWorth = Math.floor((randomInt(80, 120) / 100 * gold))
		const goldRaw = Math.floor((randomInt(0, 35) / 100) * totalGoldWorth)
		const goldInGoods = totalGoldWorth - goldRaw

        const loot = [{ name: 'Gold', price: goldRaw }]
        
        if (isLocalhost() && totalGoldWorth > 200) {
            if (randomOf('bloodgold', 'vestige') == 'bloodgold') {
                loot.push({ name: '1 Blood Gold', price: '1 Blood Gold'})
            } else {
                loot.push({ name: '1 VESTIGE Magic Item', price: '1 Blood Gold'})
            }
        }

        let remainingGold = goldInGoods
        let nTries = 0
        while (remainingGold > 25) {
            const lootType = randomOf(1, 1, 1, 3)
            const foundLoot =
                lootType == 3? getEquipmentInRange(remainingGold):
                lootType == 2? getScroll(remainingGold):
                generateTrinket(remainingGold)
            if (foundLoot == null) {
                nTries += 1
                if (nTries >= 20)
                    break
            } else {
                loot.push(foundLoot)
                remainingGold -= foundLoot.price
            }
        }
        return loot
    }



    const [state, setState] = useState({
        loot: []
    })

    function go(amount) {
        const loot = generateTreasure(amount)
        if (loot.length == 0) {
            console.log( 'None :c')
        }
        setState({ loot: loot })
    }
    function goScrollOnly(amount) {
        const loot = [getScroll(amount)]
        setState({ loot: loot })
    }

    const buttonStyle = { minWidth: '75px', paddingLeft: '20px', paddingRight: '20px' }

    return (
        <div>
            <Page title="Treasure">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around'
                }}>
                    <button style={buttonStyle} className='button-standard' onClick={() => go(randomInt(50, 150))}>Cheap</button>
                    <button style={buttonStyle} className='button-standard' onClick={() => go(randomInt(150, 500))}>Medium</button>
                    <button style={buttonStyle} className='button-standard' onClick={() => go(randomInt(500, 1250))}>Rich</button>
                    <button style={buttonStyle} className='button-standard' onClick={() => goScrollOnly(250)}>Scroll (Cheap)</button>
                    <button style={buttonStyle} className='button-standard' onClick={() => goScrollOnly(550)}>Scroll (Expensive)</button>
                </div>
                <br/><br/><br/>
                <div style={{
                    textAlign: 'center',
                    fontSize: '2em',
                }}>
                    { state.loot.map(item => (
                        <p style={{marginBottom: '0px'}}>{
                            item.name.includes('Blood Gold') ? <span style={{color: 'red', fontWeight: 'bold'}}>{item.name} ({item.price})</span> :
                            item.name.includes('VESTIGE') ? <span style={{color: 'orange', fontWeight: 'bold'}}>{item.name} ({item.price})</span> :
                                <span>{item.name} (${item.price})</span>
                        }</p>
                    )) }
                </div>
            </Page>
        </div>
    )

}