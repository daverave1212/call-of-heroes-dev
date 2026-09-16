import React, { useState } from 'react'

import abilities from '../../databases/Abilities.json'
import spellSchoolDescriptions from '../../databases/Other/SpellSchoolDescriptions.json'

import PageH1 from '../../components/PageH1/PageH1'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'

import prices from '../../databases/Prices.json'
import { isLocalhost, randomInt, randomOf } from '../../utils'
import { PriceTable } from '../Other/Prices'

export default function TreasureGenerator() {

    function OLD_getEquipmentInRange(maxPrice) {
        const pricesEquipment = prices['Weapons and Equipment']
        const equipmentPricesSortedAsc = Object.keys(pricesEquipment)
            .map(eqName => ({ name: eqName, Price: pricesEquipment[eqName] / 4}))   // Divide by 4 because that's the sell price
            .sort((a, b) => (a.price - b.price))
        const possibilities = equipmentPricesSortedAsc.filter(eq => eq.price <= maxPrice)
        if (possibilities.length == 0) return null
        return randomOf(...possibilities)
    }
	function generateTrinket(maxPrice) {
        function getSimpleObject() {
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
                Name: `${material.name} ${object.name}`,
                Price: object.price * material.priceMultiplier
            }
        }
        function getBottle() {
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
                Name: `One ${container} of ${drink.name}`,
                Price: price * drink.priceMultiplier
            }
        }
        function getCharm() {
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
            return { Name: `${material.name} ${object.name}`, Price: object.price * material.priceMultiplier }
        }
        function getPrecious() {
            const amount = randomOf(
                { name: 'One', priceMultiplier: 1 },
                { name: 'A pair of', priceMultiplier: 2 },
                { name: 'A handful of', priceMultiplier: randomInt(2, 4) },
                { name: 'A pouch of', priceMultiplier: randomInt(3, 6) },
                { name: 'A bag of', priceMultiplier: randomInt(5, 10) }
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
                Price: object.price * quality.priceMultiplier * amount.priceMultiplier
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
        return { Name: `Scroll of ${spellName}`, Price: price }
    }
    function generateTreasure(gold) {
        const totalGoldWorth = Math.floor((randomInt(80, 120) / 100 * gold))
		const goldRaw = Math.floor((randomInt(0, 35) / 100) * totalGoldWorth)
		const goldInGoods = totalGoldWorth - goldRaw

        const loot = [{ Name: 'Gold', Price: goldRaw }]
        
        if (isLocalhost() && totalGoldWorth > 200) {
            if (randomOf('bloodgold', 'vestige') == 'bloodgold') {
                loot.push({ Name: '1 Blood Gold', Price: '1 Blood Gold'})
            } else {
                loot.push({ Name: '1 VESTIGE Magic Item', Price: '1 Blood Gold'})
            }
        }

        let remainingGold = goldInGoods
        let nTries = 0
        while (remainingGold > 25) {
            const lootType = randomOf(1, 1, 1, 1)
            const foundLoot =
                // lootType == 3? getEquipmentInRange(remainingGold):
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
                    <button style={buttonStyle} onClick={() => go(randomInt(50, 150))}>Cheap</button>
                    <button style={buttonStyle} onClick={() => go(randomInt(150, 500))}>Medium</button>
                    <button style={buttonStyle} onClick={() => go(randomInt(500, 1250))}>Rich</button>
                    <button style={buttonStyle} onClick={() => goScrollOnly(250)}>Scroll (Cheap)</button>
                    <button style={buttonStyle} onClick={() => goScrollOnly(550)}>Scroll (Expensive)</button>
                </div>
                <br/><br/><br/>

                <PriceTable/>

                <div style={{
                    textAlign: 'center',
                    fontSize: '2em',
                }}>
                    { state.loot.map(item => (
                        <p style={{marginBottom: '0px'}}>{
                            item.Name.includes('Blood Gold') ? <span style={{color: 'red', fontWeight: 'bold'}}>{item.Name} ({item.price})</span> :
                            item.Name.includes('VESTIGE') ? <span style={{color: 'orange', fontWeight: 'bold'}}>{item.Name} ({item.price})</span> :
                                <span>{item.Name} (${item.price})</span>
                        }</p>
                    )) }
                </div>
            </Page>
        </div>
    )

}