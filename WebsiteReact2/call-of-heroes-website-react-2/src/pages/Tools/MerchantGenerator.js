import { useState } from "react";
import PageH1 from "../../components/PageH1/PageH1";
import Page from "../../containers/Page/Page";
import { QGTitle1 } from "./TitleGenerator";
import { capitalizeFirstLetter, filterObject, flattenObjectOnce, getAllMagicItemsAsArray, getAllMagicItemsByName, getAllPricesByName, getDaysSinceLast, getISOWeekNumber, getNumberFromString, getSpellNVariants, getSpellTags, groupBy, hasSpellVariants, isNumber, mapObject, mapObjectToArray, parseAndNormalizeSpell, percentChance, randomInt, randomOf, range, roundToNearest, SeededRNG, shuffle, spellsFromObject, WEDNESDAY } from "../../utils";
import TwoColumns from "../../components/TwoColumns/TwoColumns";
import Column from "../../components/TwoColumns/Column";
import { getItemPrice, PriceTable } from "../Other/Prices";
import prices from './../../databases/Items/Prices.json'
import { createMagicItem } from "../Other/MagicItemCreator";
import Spell from "../../components/Spell/Spell";

const MERCHANT_TYPE_LETTER_MAP = {
    'a': 'Apothecary',
    'b': 'Blacksmith',
    'c': 'Religion',
    'e': 'Engineer',
    'g': 'General Goods',
    'j': 'Jewelcrafter',
    'l': 'Library',
    'm': 'Magic',
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
        trashTypes: ['bottle'],
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
        trashTypes: ['simple'],
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
        trashTypes: ['bottle', 'charm', 'precious'],
        uniqueMagicItemTypes: ['Two-Handed Melee Weapon', 'Two-Handed Ranged Weapon', 'One-Handed Ranged Weapon']
    },
    'General Goods': {
        itemCategories: ['Adventuring Gear', 'General Goods', 'Other Items', 'Instruments'],
        tags: [
            'Trinket', 'Clothes', 'Jewelry', 'Potion', 'Scroll', 'Consumable', 'Poison', 'Toy'
        ],
        trashTypes: ['simple', 'bottle', 'charm', 'precious'],
        uniqueMagicItemTypes: ['Shield', 'Armor', 'Weapon']
    },
    'Jewelcrafter': {
        itemCategories: ['Metals (Per 100grams)'],
        tags: ['Jewelry'],
        uniqueMagicItemTypes: [],
        trashTypes: ['charm', 'precious'],
    },
    'Library': {
        itemCategories: ['Other Items'],
        tags: ['Scribe'],
        getExtraItems: (productDiversity, rng) => getRandomExtraScrolls(productDiversity, rng, 4),
        uniqueMagicItemTypes: [],
        specificItems: ['Bell', 'Lamp', 'Paper (1 sheet)', 'Mirror (steel)', 'Candle'],
        trashTypes: [],
    },
    'Magic': {
        itemCategories: [],
        tags: ['Magic', 'Alchemy', 'Consumable', 'Trinket'],
        getExtraItems: (productDiversity, rng) => getRandomExtraScrolls(productDiversity, rng, 4),
        specificItems: [
            'Staff', 'Rapier',
            'Elemental Wand', 'Arcane Symbol', 'Scourge Idol',
            'Robes', 'Bastion Plate',
            'Mirror', 'Book (blank) (100p)', 'Candle',
            'Ink (100ml)', 'Quill',
            'Chalk', 'Soap', 'Vial (100ml)',
            'Common Clothes (fine)',
            'Language Course',
            'Copper', 'Silver',
            'Dust of Appearance',
            'Acid (vial, 100ml)'
        ],
        magicItemChanceMultiplier: 2,
        uniqueMagicItemTypes: ['Weapon'],
        trashTypes: ['charm', 'precious'],
    },
    'Religion': {
        itemCategories: ['Magic and Religion', 'Mounts'],
        tags: [
            'Church', 'Scribe', 'Religion'
        ],
        uniqueMagicItemTypes: ['Armor', 'Weapon', 'Shield'],
        specificItems: ['Bell', 'Lamp', 'Paper (1 sheet)', 'Mirror (steel)', 'Candle'],
        trashTypes: ['simple', 'bottle', 'charm', 'precious'],
    },
    'Nature': {
        itemCategories: ['General Goods', 'Potions and Poisons', 'Vehicles', 'Mounts', 'Exotic Mounts', 'Trinket', 'Nature'],
        tags: [
            'Nature', 'Consumable', 'Poison'
        ],
        uniqueMagicItemTypes: ['Armor', 'Shield'],
        specificItems: ['Torch', 'Backpack', 'Bedroll', 'First Aid Kit', 'Flask', 'Hunting Trap', 'Tent (2 people)', 'Food for 1 Day', 'Basket', 'Blanket', 'Bottle (1 liter)', 'Chest', 'Oil (500ml)', 'Soap', 'Regular Poison Darts (full supply)', 'Staff of Nature'],
        trashTypes: ['simple', 'charm'],
    },
    'Underground Market': {
        itemCategories: ['Potions and Poisons', 'Vehicles', 'Mounts', 'Exotic Mounts'],
        specificItems: ['Torch', 'Backpack', 'Ball Bearings', 'Bedroll', 'Bell', 'Block and Tackle', 'Caltrops (set)', 'Chain', 'Grappling Hook', 'Ladder', 'Manacles', 'Paint Pellet', 'Rope', 'Tent', 'Mirror', 'Chalk', 'Pouch', 'Sack', 'Hunting Trap', 'Rope (10 meters)', 'Lock and Key', 'Common Clothes (low-class)', 'Language Course', 'Regular Poison Darts (full supply)'],
        tags: ['Shady'],
        uniqueMagicItemTypes: ['One-Handed Weapon'],
        trashTypes: ['bottle', 'charm', 'precious'],
    }
}
const PRODUCT_DIVERSITY_TO_CHANCE_FOR_ITEM = {
    1: 30,
    2: 50,
    3: 70,
    4: 100,
    5: 100
}
const TRASH_GENERATORS = {
    simple() {
        const material = randomOf(
            { name: 'wood', priceMultiplier: 1 },
            { name: 'bone', priceMultiplier: 1.1 },
            { name: 'stone', priceMultiplier: 1.1 },
            { name: 'ceramic', priceMultiplier: 1.2 },
            { name: 'glass', priceMultiplier: 1.3 },
            { name: 'copper', priceMultiplier: 1.4 },
            { name: 'bronze', priceMultiplier: 1.5 },
            { name: 'metal', priceMultiplier: 1.5 },
            { name: 'brass', priceMultiplier: 1.7 },
            { name: 'pewter', priceMultiplier: 1.8 },
            { name: 'iron', priceMultiplier: 1.8 },
            { name: 'steel', priceMultiplier: 2.2 },
            { name: 'ivory', priceMultiplier: 3 },
            { name: 'silver', priceMultiplier: 3.5 },
            { name: 'gold', priceMultiplier: 8 }
        )

        const object = randomOf(
            // Tableware
            { name: 'cutlery set', price: 20 },
            { name: 'toothpick set', price: 6 },
            { name: 'plate set', price: 30 },
            { name: 'tankard', price: 15 },
            { name: 'pot', price: 10 },
            { name: 'glass', price: 15 },
            { name: 'jar', price: 8 },
            { name: 'cup', price: 8 },
            { name: 'mug', price: 10 },
            { name: 'goblet', price: 18 },
            { name: 'chalice', price: 25 },
            { name: 'bowl', price: 10 },
            { name: 'plate', price: 12 },
            { name: 'platter', price: 20 },
            { name: 'tray', price: 16 },
            { name: 'spoon', price: 6 },
            { name: 'fork', price: 7 },
            { name: 'ladle', price: 10 },
            { name: 'pitcher', price: 16 },
            { name: 'jug', price: 14 },
            { name: 'flask', price: 12 },
            { name: 'bottle', price: 10 },
            { name: 'decanter', price: 22 },
            { name: 'teapot', price: 20 },
            { name: 'salt shaker', price: 8 },
            { name: 'pepper shaker', price: 8 },

            // Containers
            { name: 'box', price: 12 },
            { name: 'case', price: 15 },
            { name: 'casket', price: 20 },
            { name: 'canister', price: 10 },
            { name: 'vial', price: 8 },
            { name: 'urn', price: 20 },
            { name: 'vase', price: 18 },
            { name: 'inkwell', price: 12 },
            { name: 'coin box', price: 14 },
            { name: 'jewelry box', price: 25 },
            { name: 'snuffbox', price: 15 },
            { name: 'powder box', price: 12 },

            // Jewelry / Personal
            { name: 'amulet', price: 25 },
            { name: 'ring', price: 14 },
            { name: 'chain', price: 18 },
            { name: 'bracelet', price: 16 },
            { name: 'necklace', price: 22 },
            { name: 'pendant', price: 18 },
            { name: 'brooch', price: 16 },
            { name: 'earring', price: 10 },
            { name: 'anklet', price: 14 },
            { name: 'medallion', price: 20 },
            { name: 'locket', price: 22 },
            { name: 'hairpin', price: 8 },
            { name: 'cloak clasp', price: 12 },
            { name: 'belt buckle', price: 12 },
            { name: 'signet', price: 20 },

            // Everyday Objects
            { name: 'comb', price: 8 },
            { name: 'hairbrush', price: 10 },
            { name: 'mirror', price: 18 },
            { name: 'razor', price: 10 },
            { name: 'shoehorn', price: 6 },
            { name: 'key', price: 7 },
            { name: 'keyring', price: 8 },
            { name: 'padlock', price: 14 },
            { name: 'door knocker', price: 15 },
            { name: 'doorknob', price: 10 },
            { name: 'coat hook', price: 6 },
            { name: 'candle holder', price: 10 },
            { name: 'candlestick', price: 12 },
            { name: 'oil lamp', price: 18 },
            { name: 'lantern', price: 22 },
            { name: 'bell', price: 12 },
            { name: 'handbell', price: 14 },

            // Writing / Scholarly
            { name: 'pen', price: 8 },
            { name: 'stylus', price: 8 },
            { name: 'quill holder', price: 8 },
            { name: 'letter opener', price: 10 },
            { name: 'wax seal', price: 14 },
            { name: 'stamp', price: 10 },
            { name: 'paperweight', price: 10 },
            { name: 'bookmark', price: 5 },
            { name: 'magnifying glass', price: 20 },

            // Tools
            { name: 'hammer', price: 12 },
            { name: 'mallet', price: 10 },
            { name: 'chisel', price: 8 },
            { name: 'file', price: 8 },
            { name: 'tongs', price: 10 },
            { name: 'pliers', price: 10 },
            { name: 'shears', price: 12 },
            { name: 'scissors', price: 10 },
            { name: 'needle set', price: 6 },
            { name: 'thimble', price: 5 },
            { name: 'fishing hook', price: 5 },
            { name: 'small shovel', price: 10 },
            { name: 'small pick', price: 10 },

            // Decorative
            { name: 'figurine', price: 18 },
            { name: 'statuette', price: 22 },
            { name: 'idol', price: 20 },
            { name: 'ornament', price: 14 },
            { name: 'plaque', price: 18 },
            { name: 'medal', price: 15 },
            { name: 'badge', price: 10 },
            { name: 'decorative egg', price: 16 },
            { name: 'egg', price: 8 },
            { name: 'carved animal', price: 14 },
            { name: 'miniature', price: 16 },

            // Games / Toys
            { name: 'dice set', price: 10 },
            { name: 'chess piece', price: 8 },
            { name: 'game piece', price: 6 },
            { name: 'spinning top', price: 8 },
            { name: 'toy soldier', price: 10 },
            { name: 'toy horse', price: 10 },
            { name: 'puzzle box', price: 22 },

            // Religious / Ceremonial
            { name: 'holy symbol', price: 18 },
            { name: 'prayer bead set', price: 15 },
            { name: 'incense holder', price: 12 },
            { name: 'offering bowl', price: 14 },
            { name: 'ritual bell', price: 16 },
            { name: 'ritual cup', price: 18 },
            { name: 'tiny shrine', price: 28 },

            // Random Junk
            { name: 'button', price: 4 },
            { name: 'nail', price: 3 },
            { name: 'hook', price: 5 },
            { name: 'knob', price: 5 },
            { name: 'token', price: 6 },
            { name: 'counterweight', price: 8 },
            { name: 'doorstop', price: 6 },
            { name: 'backscratcher', price: 7 },
            { name: 'whistle', price: 10 },
            { name: 'rattle', price: 8 },
            { name: 'tiny spoon', price: 4 },
            { name: 'tiny bell', price: 6 },
            { name: 'tiny hammer', price: 7 },
            { name: 'mysterious disk', price: 12 }
        )

        return {
            Name: `${capitalizeFirstLetter(material.name)} ${object.name}`,
            Price: Math.floor(object.price * material.priceMultiplier)
        }
    },
    bottle() {
        const drink = randomOf(
            { name: 'empty', priceMultiplier: 0.5 },
            { name: 'water', priceMultiplier: 0.8 },
            { name: 'milk', priceMultiplier: 1 },
            { name: 'buttermilk', priceMultiplier: 1 },
            { name: 'whey', priceMultiplier: 0.8 },

            { name: 'cider', priceMultiplier: 1.3 },
            { name: 'ale', priceMultiplier: 1.4 },
            { name: 'beer', priceMultiplier: 1.4 },
            { name: 'stout', priceMultiplier: 1.6 },
            { name: 'mead', priceMultiplier: 2 },
            { name: 'fruit wine', priceMultiplier: 2.2 },
            { name: 'rice wine', priceMultiplier: 2.3 },
            { name: 'wine', priceMultiplier: 2.5 },
            { name: 'spiced wine', priceMultiplier: 3 },
            { name: 'dessert wine', priceMultiplier: 3.2 },

            { name: 'brandy', priceMultiplier: 3.5 },
            { name: 'rum', priceMultiplier: 3.5 },
            { name: 'gin', priceMultiplier: 3.5 },
            { name: 'vodka', priceMultiplier: 3.5 },
            { name: 'whiskey', priceMultiplier: 4 },
            { name: 'liqueur', priceMultiplier: 4 },
            { name: 'aged liquor', priceMultiplier: 5 },

            { name: 'tea', priceMultiplier: 1.2 },
            { name: 'herbal tea', priceMultiplier: 1.3 },
            { name: 'coffee', priceMultiplier: 1.8 },
            { name: 'chocolate drink', priceMultiplier: 2 },

            { name: 'apple juice', priceMultiplier: 1.2 },
            { name: 'berry juice', priceMultiplier: 1.3 },
            { name: 'grape juice', priceMultiplier: 1.4 },
            { name: 'pomegranate juice', priceMultiplier: 1.8 },

            // Slightly stranger fantasy-world finds
            { name: 'mushroom brew', priceMultiplier: 1.5 },
            { name: 'herbal tonic', priceMultiplier: 1.8 },
            { name: 'bitter tonic', priceMultiplier: 1.5 },
            { name: 'fermented milk', priceMultiplier: 1.3 },
            { name: 'fermented honey', priceMultiplier: 2 },
            { name: 'spiced cider', priceMultiplier: 1.8 },
            { name: 'flower wine', priceMultiplier: 2.5 },
            { name: 'plum wine', priceMultiplier: 2.5 },
            { name: 'pear brandy', priceMultiplier: 3.5 },
            { name: 'herbal liquor', priceMultiplier: 3.5 },
            { name: 'mystery liquor', priceMultiplier: 2.5 }
        )

        const container = randomOf(
            'bottle',
            'jug',
            'flask',
            'jar',
            'pitcher',
            'decanter',
            'carafe',
            'waterskin',
            'canteen',
            'gourd',
            'clay bottle',
            'ceramic jug'
        )

        const price = 35

        return {
            Name: `${capitalizeFirstLetter(container)} of ${drink.name}`,
            Price: Math.floor(price * drink.priceMultiplier)
        }
    },
    charm() {
        const material = randomOf(
            { name: 'crude', priceMultiplier: 0.5 },
            { name: 'worn', priceMultiplier: 0.7 },
            { name: 'plain', priceMultiplier: 0.8 },

            { name: 'simple', priceMultiplier: 1 },
            { name: 'rustic', priceMultiplier: 1.1 },
            { name: 'handmade', priceMultiplier: 1.2 },
            { name: 'decorative', priceMultiplier: 1.4 },
            { name: 'polished', priceMultiplier: 1.5 },
            { name: 'elegant', priceMultiplier: 1.7 },
            { name: 'fine', priceMultiplier: 1.8 },

            { name: 'ornate', priceMultiplier: 2 },
            { name: 'intricate', priceMultiplier: 2.2 },
            { name: 'elaborate', priceMultiplier: 2.4 },
            { name: 'refined', priceMultiplier: 2.5 },
            { name: 'exquisite', priceMultiplier: 3 },
            { name: 'luxurious', priceMultiplier: 3.5 },

            { name: 'masterwork', priceMultiplier: 4.5 }
        )
        const object = randomOf(
            { name: 'tusk', price: 20 },
            { name: 'candle set', price: 12 },
            { name: 'whistle', price: 15 },
            { name: 'mirror', price: 10 },
            { name: 'sack', price: 15 },
            { name: 'handbag', price: 38 },
            { name: 'set of clothes', price: 22 },

            { name: 'comb', price: 8 },
            { name: 'hairbrush', price: 10 },
            { name: 'hairpin', price: 8 },
            { name: 'brooch', price: 18 },
            { name: 'bracelet', price: 22 },
            { name: 'necklace', price: 28 },
            { name: 'ring', price: 20 },
            { name: 'earring', price: 12 },
            { name: 'locket', price: 20 },
            { name: 'pendant', price: 18 },
            { name: 'belt buckle', price: 14 },
            { name: 'cloak clasp', price: 12 },

            { name: 'coin purse', price: 12 },
            { name: 'wallet', price: 15 },
            { name: 'pouch', price: 10 },
            { name: 'satchel', price: 24 },
            { name: 'backpack', price: 30 },
            { name: 'travel case', price: 35 },
            { name: 'jewelry box', price: 28 },
            { name: 'small chest', price: 32 },
            { name: 'lockbox', price: 35 },

            { name: 'cup', price: 8 },
            { name: 'mug', price: 7 },
            { name: 'goblet', price: 18 },
            { name: 'tankard', price: 12 },
            { name: 'flask', price: 15 },
            { name: 'bottle', price: 8 },
            { name: 'decanter', price: 22 },
            { name: 'plate', price: 8 },
            { name: 'bowl', price: 8 },
            { name: 'spoon', price: 5 },
            { name: 'fork', price: 5 },
            { name: 'chopstick set', price: 6 },
            { name: 'tea set', price: 30 },

            { name: 'snuffbox', price: 18 },
            { name: 'tobacco box', price: 15 },
            { name: 'pipe', price: 16 },
            { name: 'match case', price: 10 },
            { name: 'tinderbox', price: 12 },
            { name: 'candle holder', price: 12 },
            { name: 'lantern', price: 22 },
            { name: 'oil lamp', price: 18 },

            { name: 'quill', price: 6 },
            { name: 'inkwell', price: 12 },
            { name: 'writing set', price: 20 },
            { name: 'journal', price: 15 },
            { name: 'notebook', price: 10 },
            { name: 'scroll case', price: 15 },
            { name: 'letter opener', price: 12 },
            { name: 'wax seal', price: 15 },
            { name: 'stamp', price: 10 },
            { name: 'bookmark', price: 5 },

            { name: 'compass', price: 28 },
            { name: 'spyglass', price: 45 },
            { name: 'magnifying glass', price: 25 },
            { name: 'hourglass', price: 18 },
            { name: 'sundial', price: 20 },
            { name: 'pocket clock', price: 55 },
            { name: 'measuring tape', price: 8 },
            { name: 'set of scales', price: 24 },

            { name: 'figurine', price: 18 },
            { name: 'statuette', price: 25 },
            { name: 'doll', price: 12 },
            { name: 'puppet', price: 15 },
            { name: 'mask', price: 20 },
            { name: 'decorative skull', price: 22 },
            { name: 'carved bone', price: 15 },
            { name: 'carved stone', price: 12 },
            { name: 'carved animal', price: 14 },
            { name: 'miniature', price: 16 },
            { name: 'paperweight', price: 10 },

            { name: 'dice set', price: 10 },
            { name: 'playing card set', price: 12 },
            { name: 'game set', price: 20 },
            { name: 'chess set', price: 28 },
            { name: 'domino set', price: 15 },
            { name: 'puzzle box', price: 25 },
            { name: 'spinning top', price: 8 },
            { name: 'yo-yo', price: 6 },
            { name: 'set of marbles', price: 8 },

            { name: 'bell', price: 12 },
            { name: 'handbell', price: 14 },
            { name: 'music box', price: 35 },
            { name: 'harmonica', price: 18 },
            { name: 'flute', price: 20 },
            { name: 'ocarina', price: 15 },
            { name: 'tambourine', price: 15 },

            { name: 'fan', price: 12 },
            { name: 'umbrella', price: 20 },
            { name: 'walking stick', price: 18 },
            { name: 'cane', price: 20 },
            { name: 'glove set', price: 15 },
            { name: 'scarf', price: 12 },
            { name: 'hat', price: 15 },
            { name: 'pair of boots', price: 24 },
            { name: 'pair of slippers', price: 12 },
            { name: 'apron', price: 10 },

            { name: 'sewing kit', price: 15 },
            { name: 'needle case', price: 8 },
            { name: 'tool kit', price: 28 },
            { name: 'shaving kit', price: 18 },
            { name: 'grooming kit', price: 20 },
            { name: 'mortar and pestle', price: 18 },
            { name: 'set of weights', price: 20 },

            { name: 'key', price: 8 },
            { name: 'keyring', price: 10 },
            { name: 'padlock', price: 15 },
            { name: 'chain', price: 18 },
            { name: 'door knocker', price: 16 },
            { name: 'doorknob', price: 10 },
            { name: 'small hook', price: 6 },

            { name: 'wooden box', price: 12 },
            { name: 'metal box', price: 20 },
            { name: 'ceramic jar', price: 12 },
            { name: 'glass jar', price: 15 },
            { name: 'vase', price: 18 },
            { name: 'urn', price: 20 },
            { name: 'basket', price: 10 },

            { name: 'horn', price: 18 },
            { name: 'antler', price: 16 },
            { name: 'fang', price: 15 },
            { name: 'claw', price: 15 },
            { name: 'shell', price: 12 },
            { name: 'feather', price: 8 },
            { name: 'egg', price: 12 },
            { name: 'fossil', price: 22 },
            { name: 'piece of amber', price: 25 },
            { name: 'interesting rock', price: 6 },
            { name: 'crystal', price: 20 },

            { name: 'holy symbol', price: 18 },
            { name: 'prayer beads', price: 15 },
            { name: 'prayer book', price: 18 },
            { name: 'incense burner', price: 16 },
            { name: 'offering bowl', price: 12 },
            { name: 'ritual bell', price: 18 },
            { name: 'ritual mask', price: 22 },
            { name: 'fortune-telling deck', price: 20 },

            { name: 'medallion', price: 20 },
            { name: 'badge', price: 12 },
            { name: 'military medal', price: 20 },
            { name: 'signet', price: 22 },
            { name: 'family crest', price: 25 },
            { name: 'commemorative coin', price: 15 },
            { name: 'souvenir', price: 10 },

            { name: 'map case', price: 15 },
            { name: 'map', price: 12 },
            { name: 'globe', price: 28 },
            { name: 'navigation tool', price: 25 },
            { name: 'walking map', price: 10 },
            { name: 'travel journal', price: 15 },

            { name: 'perfume bottle', price: 22 },
            { name: 'powder box', price: 15 },
            { name: 'soap set', price: 10 },
            { name: 'hand mirror', price: 12 },
            { name: 'razor', price: 12 },

            { name: 'magnifying lens', price: 20 },
            { name: 'spectacles', price: 22 },
            { name: 'monocle', price: 18 },
            { name: 'goggles', price: 20 },

            { name: 'rope bracelet', price: 6 },
            { name: 'good-luck charm', price: 12 },
            { name: 'dreamcatcher', price: 12 },
            { name: 'talon necklace', price: 18 },
            { name: 'tiny idol', price: 20 },
            { name: 'amulet', price: 22 },
            { name: 'talisman', price: 22 },

            { name: 'ship in a bottle', price: 30 },
            { name: 'snow globe', price: 20 },
            { name: 'model ship', price: 25 },
            { name: 'model building', price: 22 },
            { name: 'portrait', price: 20 },
            { name: 'framed drawing', price: 15 },
            { name: 'small tapestry', price: 25 },

            { name: 'wooden duck', price: 8 },
            { name: 'toy soldier', price: 10 },
            { name: 'toy horse', price: 10 },
            { name: 'toy sword', price: 8 },
            { name: 'toy wagon', price: 10 },
            { name: 'stuffed animal', price: 12 },

            { name: 'backscratcher', price: 6 },
            { name: 'shoehorn', price: 6 },
            { name: 'fly swatter', price: 5 },
            { name: 'hand warmer', price: 10 },
            { name: 'coin bank', price: 12 },
            { name: 'doorstop', price: 7 },
            { name: 'coat hook', price: 6 },
            { name: 'tiny shovel', price: 8 },
            { name: 'tiny hammer', price: 8 }
        )
        return { Name: `${capitalizeFirstLetter(material.name)} ${object.name}`, Price: Math.floor(object.price * material.priceMultiplier) }
    },
    precious() {
        const amount = randomOf(
            { name: 'A', priceMultiplier: 1 },
            { name: 'Pair of', priceMultiplier: 2 },
            { name: 'Handful of', priceMultiplier: randomInt(2, 4) },
            { name: 'Pouch of', priceMultiplier: randomInt(3, 6) },
            { name: 'Bag of', priceMultiplier: randomInt(5, 10) }
        )

        const quality = randomOf(
            { name: 'chipped', priceMultiplier: 0.5 },
            { name: 'cracked', priceMultiplier: 0.75 },
            { name: 'rough', priceMultiplier: 0.8 },
            { name: 'uncut', priceMultiplier: 0.9 },
            { name: 'simple', priceMultiplier: 1 },
            { name: 'polished', priceMultiplier: 1.25 },
            { name: 'finely cut', priceMultiplier: 1.5 },
            { name: 'flawless', priceMultiplier: 2 },
            { name: 'masterfully cut', priceMultiplier: randomInt(2, 4) }
        )

        const object = randomOf(
            // Common / Ornamental
            { name: 'agate', price: 11 },
            { name: 'quartz', price: 11 },
            { name: 'malachite', price: 12 },
            { name: 'tiger eye', price: 13 },
            { name: 'obsidian', price: 14 },
            { name: 'hematite', price: 14 },
            { name: 'moonstone', price: 15 },
            { name: 'bloodstone', price: 16 },
            { name: 'onyx', price: 17 },
            { name: 'carnelian', price: 18 },
            { name: 'aventurine', price: 18 },
            { name: 'lapis lazuli', price: 19 },
            { name: 'turquoise', price: 20 },
            { name: 'serpentine', price: 20 },
            { name: 'chrysoprase', price: 22 },

            // Semi-Precious
            { name: 'citrine', price: 26 },
            { name: 'jasper', price: 28 },
            { name: 'garnet', price: 30 },
            { name: 'peridot', price: 32 },
            { name: 'zircon', price: 34 },
            { name: 'amber', price: 36 },
            { name: 'amethyst', price: 38 },
            { name: 'jade', price: 39 },
            { name: 'aquamarine', price: 42 },
            { name: 'tourmaline', price: 44 },
            { name: 'topaz', price: 46 },
            { name: 'opal', price: 48 },
            { name: 'spinel', price: 50 },

            // Valuable
            { name: 'fire opal', price: 58 },
            { name: 'black opal', price: 65 },
            { name: 'star garnet', price: 68 },
            { name: 'alexandrite', price: 72 },
            { name: 'chrysoberyl', price: 75 },
            { name: 'beryl', price: 78 },
            { name: 'star ruby', price: 90 },
            { name: 'star sapphire', price: 92 },

            // Precious
            { name: 'emerald', price: 101 },
            { name: 'sapphire', price: 102 },
            { name: 'diamond', price: 153 },
            { name: 'ruby', price: 154 }
        )

        return {
            Name: `${amount.name} ${quality.name} ${object.name}`,
            Price: Math.floor(object.price * quality.priceMultiplier * amount.priceMultiplier)
        }
    },
}

export function getRandomExtraTrash(merchant, productDiversity=3, rng=new SeededRNG()) {
    const trashTypes = merchant?.trashTypes ?? []
    if (trashTypes.length == 0) {
        return []
    }
    const nItemsByType = trashTypes.map(type => ({type, nItems: rng.randomInt(2, productDiversity * 2)}))
    const itemsByType = nItemsByType.map(({ type, nItems}) => ({ type, items: range(0, nItems).map(_ => TRASH_GENERATORS[type](rng))}))
    const myItems = itemsByType.map(({ type, items }) => items).flat()
    console.log({nItemsByType, itemsByType, myItems})
    return myItems.map(({ Name, Price }) => ({ Name, Price, Category: 'Other' }))
}
export function getRandomExtraScrolls(productDiversity, rng=new SeededRNG(), maxScrollPower=4) {
    const minScrollPower = 1
    maxScrollPower = Math.min(productDiversity + 1, maxScrollPower)
    const scrollPowerToName = {
        1: 'Lesser Scroll',
        2: 'Minor Scroll',
        3: 'Major Scroll',
        4: 'Grand Scroll',
    }
    const getRandomScrollPower = () => rng.randomInt(minScrollPower, maxScrollPower)
    const getRandomScrollName = () => scrollPowerToName[getRandomScrollPower()]
    const getScroll = () => ({...getAllMagicItemsByName()[getRandomScrollName()]})
    window.getRandomScrollPower = getRandomScrollPower
    window.getRandomScrollName = getRandomScrollName
    window.getScroll = getScroll

    const nMinScrolls = Math.floor(Math.max(0.7 * productDiversity, 1))
    const nMaxScrolls = Math.max(productDiversity * 2, nMinScrolls + 1)
    const nScrolls = rng.randomInt(nMinScrolls, nMaxScrolls)
    const scrolls = range(0, nScrolls).map(() => getScroll())
    console.log({scrolls})
    return scrolls
}
export function getRandomUniqueArtefacts(merchant, productDiversity=3, rng=new SeededRNG()) {
    const uniqueMagicItemTypes = merchant?.uniqueMagicItemTypes ?? ['Shield', 'Armor', 'Weapon']
    if (merchant?.uniqueMagicItemTypes?.length == 0) {
        return []
    }

    const maxXP = PRODUCT_DIVERSITY_TO_UNIQUE_MAGIC_ITEM_MAX_XP[productDiversity]
    const getAnXPValue = () => roundToNearest(rng.randomInt(25, maxXP), 5)
    
    const myItems = range(0, productDiversity).map(() => {
        const itemType = rng.randomOf(...uniqueMagicItemTypes)
        const xpValue = getAnXPValue()
        if (rng.percentChance(75)) {
            return createMagicItem(xpValue, itemType, rng)
        }
        return null
    }).filter(item => item != null)

    return myItems
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
            // const thisParsedItem = parseAndNormalizeSpell(item, { isItem: true, variantIndex: item.DefaultVariantIndex })
            // item.Name = thisParsedItem.Name
            // item.DisplayName = thisParsedItem.DisplayName
        }

        return allMagicItemsIHave
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

        // console.log({ merchant, type, name, productDiversity })
        
        const rng = new SeededRNG(getRNGSeed(name))
        const daysSinceLastWednesday = getDaysSinceLast(WEDNESDAY)
        
        const allTrashIHave = getRandomExtraTrash(merchant, productDiversity, rng)
        const allNormalItemsIHave = getNormalItemsIHaveAsArray(merchant, productDiversity, rng)
        const allNormalItemsAfterSales = makeItemsOutOfStock(allNormalItemsIHave, daysSinceLastWednesday, rng)
        let allMagicItemsIHave = getMagicItemsIHaveAsArray(merchant, productDiversity, rng)
        const allArtefactsIHave = getRandomUniqueArtefacts(merchant, productDiversity, rng)

        // console.log({allTrashIHave, allNormalItemsAfterSales, allMagicItemsIHave, allArtefactsIHave})
        return [[...allTrashIHave, ...allNormalItemsAfterSales], allMagicItemsIHave, allArtefactsIHave]
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