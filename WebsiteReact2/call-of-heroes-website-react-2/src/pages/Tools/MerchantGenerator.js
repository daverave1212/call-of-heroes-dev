import { useState } from "react";
import PageH1 from "../../components/PageH1/PageH1";
import Page from "../../containers/Page/Page";
import { QGTitle1 } from "./TitleGenerator";
import { filterObject, flattenObjectOnce, getAllMagicItemsAsArray, getAllMagicItemsByName, getAllPricesByName, getDaysSinceLast, getISOWeekNumber, getNumberFromString, groupBy, hasSpellVariants, isNumber, mapObject, mapObjectToArray, parseAndNormalizeSpell, percentChance, randomInt, SeededRNG, spellsFromObject, WEDNESDAY } from "../../utils";
import TwoColumns from "../../components/TwoColumns/TwoColumns";
import Column from "../../components/TwoColumns/Column";
import { getItemPrice, PriceTable } from "../Other/Prices";
import prices from './../../databases/Prices.json'
import Spell, { getSpellTags } from "../../components/Spell/Spell";

const MERCHANT_TYPE_LETTER_MAP = {
    'b': 'Blacksmith',
    'g': 'General Goods',
    'c': 'Church'
}
const MERCHANT_TYPES = {
    'Blacksmith': {
        itemCategories: ['Weapons and Equipment', 'Metals (Per 100grams)'],
        tags: ['Weapon', 'Armor', 'Metal', 'Ammo'],
        specificItems: [
            "Smith's Tools"
        ]
    },
    'General Goods': {
        itemCategories: ['Adventuring Gear', 'General Goods', 'Other Items', 'Instruments'],
        tags: [
            'Trinket', 'Clothes', 'Jewelry', 'Potion', 'Scroll', 'Consumable', 'Poison', 'Toy'
        ]
    },
    'Religion': {
        itemCategories: ['Magic and Religion', 'Mounts'],
        tags: [
            'Church', 'Scribe', 'Religion'
        ]
    },
    'Nature': {
        itemCategories: ['General Goods', 'Potions and Poisons', 'Vehicles', 'Mounts', 'Exotic Mounts', 'Trinket', 'Nature'],

    }
}
const PRODUCT_DIVERSITY_TO_CHANCE_FOR_ITEM = {
    1: 30,
    2: 50,
    3: 70,
    4: 100,
    5: 100
}
const PRODUCT_DIVERSITY_TO_CHANCE_FOR_MAGIC_ITEM = {
    1: 5,
    2: 10,
    3: 15,
    4: 20,
    5: 25
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
        return possibleItems
    }
    function getNormalItemsIHaveAsArray(merchant, productDiversity, rng) {
        const possibleItems = getNormalItemsICanHaveAsArray(merchant)
        const chanceToHaveItem = PRODUCT_DIVERSITY_TO_CHANCE_FOR_ITEM[productDiversity]
        const maxPrice = PRODUCT_DIVERSITY_TO_NORMAL_ITEM_MAX_PRICE[productDiversity]

        const allNormalItemsIHave = possibleItems.filter(item => rng.percentChance(chanceToHaveItem) && getItemPrice(item) <= maxPrice)
        return allNormalItemsIHave
    }
    function getMagicItemsIHaveAsArray(merchant, productDiversity, rng) {
        const hasAnyOfMyTags = item => getSpellTags(item).some(tag => merchant.tags.includes(tag))
        const possibleItems = getAllMagicItemsAsArray().filter(item => hasAnyOfMyTags(item))
        const chanceToHaveItem = PRODUCT_DIVERSITY_TO_CHANCE_FOR_MAGIC_ITEM[productDiversity]
        const maxPrice = PRODUCT_DIVERSITY_TO_NORMAL_ITEM_MAX_PRICE[productDiversity]
        const allMagicItemsIHave = possibleItems.filter(item => rng.percentChance(chanceToHaveItem) && getItemPrice(item) <= maxPrice)
        const magicItemsParsed = allMagicItemsIHave.map(item => parseAndNormalizeSpell(item, { isItem: true }))
        for (const item of magicItemsParsed) {
            if (item.Variants != null) {
                item.DefaultVariantIndex = randomInt(0, item.Variants.length - 1)
            }
        }
        return magicItemsParsed
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
        
        if (merchant == null) {
            return [[], []]
        }
        
        const rng = new SeededRNG(getRNGSeed(name))
        const daysSinceLastWednesday = getDaysSinceLast(WEDNESDAY)
        
        const allNormalItemsIHave = getNormalItemsIHaveAsArray(merchant, productDiversity, rng)
        const allNormalItemsAfterSales = makeItemsOutOfStock(allNormalItemsIHave, daysSinceLastWednesday, rng)
        const allMagicItemsIHave = getMagicItemsIHaveAsArray(merchant, productDiversity, rng)

        return [allNormalItemsAfterSales, allMagicItemsIHave]
    }
    function seeMerchant() {}


    const [normalItems, magicItems] = getShop()
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
                    <PriceTable title={"Magic Items"} items={magicItems} hasDescriptions={false}/>
                )}
            </Column>
            <Column>
                { magicItems.map(item => <Spell spell={item} isItem={true} canChangeVariant={false}/>) }
            </Column>
        </TwoColumns>
    </Page>

}