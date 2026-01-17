import { useState } from "react";
import PageH1 from "../../components/PageH1/PageH1";
import Page from "../../containers/Page/Page";
import { QGTitle1 } from "./TitleGenerator";
import { filterObject, flattenObjectOnce, getAllMagicItemsByName, getAllPricesByName, getDaysSinceLast, getISOWeekNumber, getNumberFromString, groupBy, isNumber, mapObject, mapObjectToArray, percentChance, SeededRNG, spellsFromObject, WEDNESDAY } from "../../utils";
import TwoColumns from "../../components/TwoColumns/TwoColumns";
import Column from "../../components/TwoColumns/Column";
import { getItemPrice, PriceTable } from "../Other/Prices";
import prices from './../../databases/Prices.json'

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
    'Church': {
        itemCategories: ['Magic and Religion'],
        tags: [
            'Church'
        ]
    }
}
const PRODUCT_DIVERSITY_TO_CHANCE_FOR_ITEM = {
    1: 30,
    2: 50,
    3: 70,
    4: 100,
    5: 100
}
const PRODUCT_DIVERSITY_TO_NORMAL_ITEM_MAX_PRICE = {
    1: 250,
    2: 500,
    3: 1000,
    4: 99999,
    5: 999999
}
const ITEM_OUT_OF_STOCK_CHANCE_PER_DAY = 0  // 3%
const magicItemsArray = spellsFromObject(getAllMagicItemsByName())

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
            return {}
        }
        
        const rng = new SeededRNG(getRNGSeed(name))
        const daysSinceLastWednesday = getDaysSinceLast(WEDNESDAY)
        const allNormalItemsIHave = getNormalItemsIHaveAsArray(merchant, productDiversity, rng)
        const itemsAvailableFinal = makeItemsOutOfStock(allNormalItemsIHave, daysSinceLastWednesday, rng)
        const itemsAvailableByCategory = groupBy(itemsAvailableFinal, obj => obj.Category)
        return itemsAvailableByCategory
    }
    function seeMerchant() {}

    const allMyItemsByCategory = getShop()
    
    

    return <Page>
        <div className="center-content gap-1">
            <QGTitle1 text={"Merchant"} height={40}/>
            <input value={merchantCode} placeholder="Merchant's Code" onChange={evt => setMerchantCode(evt.target.value)}/>
            <button onClick={seeMerchant}>See Merchant</button>
        </div>

        <TwoColumns>
            <Column>
                { allMyItemsByCategory && Object.keys(allMyItemsByCategory).map(categoryName => (
                    <PriceTable categoryName={categoryName} itemsArray={allMyItemsByCategory[categoryName]}/>
                )) }
            </Column>
            <Column>
            
            </Column>
        </TwoColumns>
    </Page>

}