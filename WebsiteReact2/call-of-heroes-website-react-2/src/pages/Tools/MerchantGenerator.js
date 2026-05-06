import { useState } from "react";
import PageH1 from "../../components/PageH1/PageH1";
import Page from "../../containers/Page/Page";
import { QGTitle1 } from "./TitleGenerator";
import { filterObject, flattenObjectOnce, getAllMagicItemsAsArray, getAllMagicItemsByName, getAllPricesByName, getDaysSinceLast, getISOWeekNumber, getNumberFromString, getSpellNVariants, groupBy, hasSpellVariants, isNumber, mapObject, mapObjectToArray, parseAndNormalizeSpell, percentChance, randomInt, randomOf, range, roundToNearest, SeededRNG, shuffle, spellsFromObject, WEDNESDAY } from "../../utils";
import TwoColumns from "../../components/TwoColumns/TwoColumns";
import Column from "../../components/TwoColumns/Column";
import { getItemPrice, PriceTable } from "../Other/Prices";
import prices from './../../databases/Prices.json'
import Spell, { getSpellTags } from "../../components/Spell/Spell";
import { createMagicItem } from "../Other/MagicItemCreator";

const MERCHANT_TYPE_LETTER_MAP = {
    'a': 'Apothecary',
    'b': 'Blacksmith',
    'c': 'Religion',
    'e': 'Engineer',
    'g': 'General Goods',
    'j': 'Jewelcrafter',
    'l': 'Library',
    'n': 'Nature',
    'r': 'Religion',
    't': 'General Goods',
    'u': 'Underground Market',
    
}
const MERCHANT_TYPES = {
    'Apothecary': {
        itemCategories: ['Metals (Per 100grams)', 'Potions and Poisons'],
        tags: ['Alchemy', 'Consumable'],
        specificItems: ['First Aid Kit', 'Paper (1 sheet)', 'Candle', 'Chalk', 'Mess Kit', 'Oil (500ml)', 'Soap', 'Vial (100ml)', 'Waterskin', 'Paint Pellet'],
        magicItemChanceMultiplier: 2,
        uniqueMagicItemTypes: []
    },
    'Blacksmith': {
        itemCategories: ['Weapons and Equipment', 'Metals (Per 100grams)'],
        tags: ['Weapon', 'Armor', 'Metal', 'Ammo'],
        specificItems: [
            "Smith's Tools", 'Ball Bearings', 'Caltrops', 'Bell', 'Block and Tackle', 'Chain (2 meters)', 'Crowbar', 'Hunting Trap', 'Lock and Key',
            'Mining Pick', 'Pot (iron)', 'Whetstone', 'Manacles',
        ],
        uniqueMagicItemTypes: ['Shield', 'Armor', 'Melee Weapon']
    },
    'Engineer': {
        itemCategories: ['Metals (Per 100grams)', 'Vehicles'],
        tags: ['Engineer'],
        specificItems: [
            'Ball Bearings', 'Bell', 'Block and Tackle', 'Chain (2 meters)', 'Crowbar', 'Hunting Trap', 'Lock and Key',
            'Mining Pick', 'Pot (iron)', 'Grappling Hook', 'Manacles', 'Mirror (steel)',
            'Explosive Barrel', 'Light Crossbow', 'Gunpowder for 1 encounter', 'Bolts (lifetime supply)', 'Bolts (x20)', 'Heavy Gun', 'Light Gun', 'Heavy Crossbow'
        ],
        uniqueMagicItemTypes: ['Two-Handed Melee Weapon', 'Two-Handed Ranged Weapon', 'One-Handed Ranged Weapon']
    },
    'General Goods': {
        itemCategories: ['Adventuring Gear', 'General Goods', 'Other Items', 'Instruments'],
        tags: [
            'Trinket', 'Clothes', 'Jewelry', 'Potion', 'Scroll', 'Consumable', 'Poison', 'Toy'
        ],
        uniqueMagicItemTypes: ['Shield', 'Armor', 'Weapon']
    },
    'Jewelcrafter': {
        itemCategories: ['Metals (Per 100grams)'],
        tags: ['Jewelry'],
        uniqueMagicItemTypes: [],
    },
    'Library': {
        itemCategories: ['Other Items'],
        tags: ['Scribe'],
        getExtraItems(productDiversity, rng) {
            const minScrollPower = 1
            const maxScrollPower = Math.min(productDiversity + 1, 4)
            const scrollPowerToName = {
                1: 'Lesser Scroll',
                2: 'Minor Scroll',
                3: 'Major Scroll',
                4: 'Grand Scroll',
            }
            const getRandomScrollPower = () => rng.randomInt(minScrollPower, maxScrollPower)
            const getRandomScrollName = () => scrollPowerToName[getRandomScrollPower()]
            const getScroll = () => ({...getAllMagicItemsByName()[getRandomScrollName()]})

            const nMinScrolls = Math.floor(Math.max(0.7 * productDiversity, 1))
            const nMaxScrolls = Math.max(productDiversity * 2, nMinScrolls + 1)
            const nScrolls = rng.randomInt(nMinScrolls, nMaxScrolls)
            return range(0, nScrolls).map(() => getScroll())
        },
        uniqueMagicItemTypes: [],
        specificItems: ['Bell', 'Lamp', 'Paper (1 sheet)', 'Mirror (steel)', 'Candle']
    },
    'Religion': {
        itemCategories: ['Magic and Religion', 'Mounts'],
        tags: [
            'Church', 'Scribe', 'Religion'
        ],
        uniqueMagicItemTypes: ['Armor', 'Weapon', 'Shield'],
        specificItems: ['Bell', 'Lamp', 'Paper (1 sheet)', 'Mirror (steel)', 'Candle']
    },
    'Nature': {
        itemCategories: ['General Goods', 'Potions and Poisons', 'Vehicles', 'Mounts', 'Exotic Mounts', 'Trinket', 'Nature'],
        tags: [
            'Nature', 'Consumable', 'Poison'
        ],
        uniqueMagicItemTypes: ['Armor', 'Shield'],
        specificItems: ['Torch', 'Backpack', 'Bedroll', 'First Aid Kit', 'Flask', 'Hunting Trap', 'Tent (2 people)', 'Food for 1 Day', 'Basket', 'Blanket', 'Bottle (1 liter)', 'Chest', 'Oil (500ml)', 'Soap']
    },
    'Underground Market': {
        itemCategories: ['Potions and Poisons', 'Vehicles', 'Mounts', 'Exotic Mounts'],
        specificItems: ['Torch', 'Backpack', 'Ball Bearings', 'Bedroll', 'Bell', 'Block and Tackle', 'Caltrops (set)', 'Chain', 'Grappling Hook', 'Ladder', 'Manacles', 'Paint Pellet', 'Rope', 'Tent', 'Mirror', 'Chalk', 'Pouch', 'Sack', 'Hunting Trap', 'Rope (10 meters)', 'Lock and Key', 'Common Clothes (low-class)', 'Language Course'],
        tags: ['Shady'],
        uniqueMagicItemTypes: ['One-Handed Weapon']
    }
}
const PRODUCT_DIVERSITY_TO_CHANCE_FOR_ITEM = {
    1: 30,
    2: 50,
    3: 70,
    4: 100,
    5: 100
}

function getProductDiversityToNMagicItems(productDiversity, rng) {
    const PRODUCT_DIVERSITY_TO_N_MAGIC_ITEMS = {
        1: rng.randomOf(0, 1),
        2: rng.randomOf(0, 1, 1, 2, 2),
        3: rng.randomOf(1, 1, 2, 2, 2, 2, 2, 2, 3, 3),
        4: rng.randomOf(2, 3, 3, 3, 4, 4, 4),
        5: rng.randomOf(4, 5, 6),
    }
    return PRODUCT_DIVERSITY_TO_N_MAGIC_ITEMS[productDiversity] ?? 0
}
const PRODUCT_DIVERSITY_TO_UNIQUE_MAGIC_ITEM_MAX_XP = {
    1: 150,
    2: 200,
    3: 250,
    4: 300,
    5: 350
}
const PRODUCT_DIVERSITY_TO_NORMAL_ITEM_MAX_PRICE = {
    1: 250,
    2: 500,
    3: 1000,
    4: 99999,
    5: 999999
}
const ITEM_OUT_OF_STOCK_CHANCE_PER_DAY = 0  // 3%

export default function MerchantGenerator({}) {

    const [merchantCode, setMerchantCode] = useState('')

    function getMerchantFromCode(code) {
        if (code.length == 0) {
            return {}
        }
        const productDiversity = getNumberFromString(code) ?? 2
        const codeNoNumber = code.replaceAll(`${productDiversity}`, '')
        
        const merchantTypeLetter = codeNoNumber.charAt(codeNoNumber.length - 1).toLowerCase()
        const type = MERCHANT_TYPE_LETTER_MAP[merchantTypeLetter]
        const merchant = MERCHANT_TYPES[type]        
        const name = codeNoNumber.slice(0, codeNoNumber.length - 1)

        return { productDiversity, merchant, type, name}
    }
    function getNormalItemsICanHaveAsArray(merchant) {
        const allNormalItemsArray = Object.values(getAllPricesByName())
        const possibleItems = allNormalItemsArray.filter(item => merchant.itemCategories.includes(item.Category))
        const extraNamedItems = (merchant.specificItems ?? []).map(itemName => getAllPricesByName()[itemName])
        return [...possibleItems, ...extraNamedItems]
    }
    function getNormalItemsIHaveAsArray(merchant, productDiversity, rng) {
        const possibleItems = getNormalItemsICanHaveAsArray(merchant)
        const chanceToHaveItem = PRODUCT_DIVERSITY_TO_CHANCE_FOR_ITEM[productDiversity]
        const maxPrice = PRODUCT_DIVERSITY_TO_NORMAL_ITEM_MAX_PRICE[productDiversity]

        const allNormalItemsIHave = possibleItems.filter(item => rng.percentChance(chanceToHaveItem) && getItemPrice(item) <= maxPrice)
        return allNormalItemsIHave
    }
    function getMagicItemsIHaveAsArray(merchant, productDiversity, rng) {
        const maxPrice = PRODUCT_DIVERSITY_TO_NORMAL_ITEM_MAX_PRICE[productDiversity]
        const hasAnyOfMyTags = item => getSpellTags(item).some(tag => merchant.tags.includes(tag))
        const possibleItems = getAllMagicItemsAsArray().filter(item => hasAnyOfMyTags(item)).filter(item => getItemPrice(item) <= maxPrice)
        const possibleItemsShuffled = rng.shuffle(possibleItems)
        const nItems = getProductDiversityToNMagicItems(productDiversity, rng) * (merchant.magicItemChanceMultiplier ?? 1)
        let allMagicItemsIHave = possibleItemsShuffled.slice(0, nItems)
        const extraItems = merchant.getExtraItems?.(productDiversity, rng)
        if (extraItems != null) {
            allMagicItemsIHave = [...allMagicItemsIHave, ...extraItems]
        }

        for (const item of allMagicItemsIHave) {
            const nVariants = getSpellNVariants(item)
            if (nVariants == null) {
                continue
            }
            item.DefaultVariantIndex = nVariants? rng.randomInt(0, nVariants - 1): null
            const thisParsedItem = parseAndNormalizeSpell(item, { isItem: true, variantIndex: item.DefaultVariantIndex })
            item.Name = thisParsedItem.Name
            item.DisplayName = thisParsedItem.DisplayName
        }

        return allMagicItemsIHave
    }
    function getUniqueArtefactsIHaveAsArray(merchant, productDiversity, rng) {
        if (merchant.uniqueMagicItemTypes == null || merchant.uniqueMagicItemTypes.length == 0) {
            return []
        }

        const maxXP = PRODUCT_DIVERSITY_TO_UNIQUE_MAGIC_ITEM_MAX_XP[productDiversity]
        const getAnXPValue = () => roundToNearest(rng.randomInt(25, maxXP), 5)
        
        const myItems = range(0, productDiversity).map(() => {
            const itemType = rng.randomOf(...merchant.uniqueMagicItemTypes)
            const xpValue = getAnXPValue()
            if (rng.percentChance(75)) {
                return createMagicItem(xpValue, itemType, rng)
            }
            return null
        }).filter(item => item != null)

        return myItems
    }
    function getRNGSeed(name) {
        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth() + 1
        const weekNumber = getISOWeekNumber()
        return name + year + month + weekNumber
    }
    function makeItemsOutOfStock(itemsArray, daysSinceLastWednesday, rng) {
        for (let i = 1; i <= daysSinceLastWednesday; i++) {
            itemsArray = itemsArray.filter(() => rng.percentChance(100 - ITEM_OUT_OF_STOCK_CHANCE_PER_DAY))
        }
        return itemsArray
    }

    function getShop() {
        const { merchant, type, name, productDiversity } = getMerchantFromCode(merchantCode)
        
        if (merchant == null || productDiversity < 1 || productDiversity > 5 || merchantCode.length < 3) {
            return [[], [], []]
        }

        console.log({ merchant, type, name, productDiversity })
        
        const rng = new SeededRNG(getRNGSeed(name))
        const daysSinceLastWednesday = getDaysSinceLast(WEDNESDAY)
        
        const allNormalItemsIHave = getNormalItemsIHaveAsArray(merchant, productDiversity, rng)
        const allNormalItemsAfterSales = makeItemsOutOfStock(allNormalItemsIHave, daysSinceLastWednesday, rng)
        let allMagicItemsIHave = getMagicItemsIHaveAsArray(merchant, productDiversity, rng)
        const allArtefactsIHave = getUniqueArtefactsIHaveAsArray(merchant, productDiversity, rng)

        console.log({allArtefactsIHave})
        return [allNormalItemsAfterSales, allMagicItemsIHave, allArtefactsIHave]
    }
    function seeMerchant() {}


    const [normalItems, magicItems, artefacts] = getShop()
    console.log({magicItems})
    const normalItemsByCategory = groupBy(normalItems, obj => obj.Category)
    
    

    return <Page>
        <div className="center-content gap-1">
            <QGTitle1 text={"Merchant"} height={40}/>
            <input value={merchantCode} placeholder="Merchant's Code" onChange={evt => setMerchantCode(evt.target.value)}/>
            <button onClick={seeMerchant}>See Merchant</button>
        </div>

        <TwoColumns className='margin-top-2'>
            <Column>
                { normalItemsByCategory && Object.entries(normalItemsByCategory).map(([categoryName, items]) => (
                    <PriceTable title={categoryName} items={items}/>
                )) }
                { magicItems.length > 0 && (
                    <PriceTable title={"Magic Items"} items={[...magicItems, ...artefacts]} hasDescriptions={false}/>
                )}
            </Column>
            <Column>
                { magicItems.map(item => <Spell spell={item} isItem={true} canChangeVariant={false}/>) }
                { artefacts.map(item => <Spell spell={item} isItem={true} canChangeVariant={false}/>) }
            </Column>
        </TwoColumns>
    </Page>

}