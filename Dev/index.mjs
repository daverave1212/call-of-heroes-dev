
import fs from 'fs'
import * as path from 'path'
import pretty from 'pretty'

import * as Config from './Config.mjs'
import { removeSpellTildes } from './utils.mjs'

import generateClass from './Generators/GenerateClass.mjs'
import generateRace from './Generators/GenerateRace.mjs'
import generateWeapons from './Generators/GenerateWeapons.mjs'
import generateArmors from './Generators/GenerateArmors.mjs'
import generateShop from './Generators/GenerateShop.mjs'
import generateAbilities from './Generators/GenerateAbilities.mjs'
import generateBackgrounds from './Generators/GenerateBackgrounds.mjs'
import {
    generateAmateurSpellList,
    generateCrowdControl,
    generateInventory,
    generateLanguages,
    generateSkillPoints,
    generateIndex,
    generateSpellSheetMaker,
    generateAnimalList,
    generateMonsters
} from './Generators/GenerateOther.mjs'

import { readYaml, writeFile } from './utils.mjs'

const join = path.join

function storeAbilityBlock(abilitiesObject, block) {
    if (block == null) return
    for (let name of Object.keys(block)) {
        let realName = (['~', '<'].includes(name[0])) ? removeSpellTildes(name) : name
        abilitiesObject[realName] = block[name]
    }
}


function getAllClassAbilities(file) {   // As an object
    let abilities = {}
    storeAbilityBlock(abilities, file['Starting Abilities'])
    storeAbilityBlock(abilities, file['Abilities'])
    for (let specName of Object.keys(file['Specs'])) {
        storeAbilityBlock(file['Specs'][specName]['Starting Abilities'])
        storeAbilityBlock(file['Specs'][specName]['Abilities'])
        for (let talentLevel of Object.keys(file['Specs'][specName]['Talents'])) {
            storeAbilityBlock(abilities, file['Specs'][specName]['Talents'][talentLevel])
        }
    }
    return abilities
}

function getAllRaceAbilities(file) {   // As an object
    let abilities = {}
    storeAbilityBlock(abilities, file['Starting Abilities'])
    storeAbilityBlock(abilities, file['Abilities'])
    for (let talentLevel of Object.keys(file.Talents)) {
        storeAbilityBlock(abilities, file['Talents'][talentLevel])
    }
    return abilities
}

function getAllLearnableAbilities(file) {   // As an object
    let abilities = {}
    for (let category of Object.keys(file)) {
        storeAbilityBlock(abilities, file[category])
    }
    return abilities
}

function outputFile(object, generateFunction, name) {
    let htmlContent = pretty(generateFunction(object))
    if (!fs.existsSync(Config.websiteRootPath)) fs.mkdirSync(Config.websiteRootPath)
    let fullPath = join(Config.websiteRootPath, name + '.html')
    writeFile(fullPath, htmlContent)
    console.log(`Wrote file ${fullPath}`)
}


let allAbilities = {}
let allClasses = {}
let allRaces = {}
for (let filePath of Object.keys(Config.files)) {
    console.log(`Outputting ${filePath}`)
    let data = null         // File as JSON object

    data = readYaml(join(Config.designRootPath, filePath))
    switch (Config.files[filePath]) {
        case 'class':
            outputFile(data, generateClass, data.Class)
            storeAbilityBlock(allAbilities, getAllClassAbilities(data))
            allClasses[data.Class] = data
            break
        case 'race':
            outputFile(data, generateRace, data.Race)
            storeAbilityBlock(allAbilities, getAllRaceAbilities(data))
            allRaces[data.Race] = data
        case 'weapons':
            outputFile(data, generateWeapons, 'Weapons')
            break
        case 'armors':
            outputFile(data, generateArmors, 'Armors')
            break
        case 'shop':
            outputFile(data, generateShop, 'Shop')
            break
        case 'abilities':
            outputFile(data, generateAbilities, 'Abilities')
            for (let category of Object.keys(data)) {
                for (let abilityName of Object.keys(data[category])) {
                    data[category][abilityName].category = category
                }
            }
            storeAbilityBlock(allAbilities, getAllLearnableAbilities(data))
            break
        case 'backgrounds':
            outputFile(data, generateBackgrounds, 'Backgrounds')
            break
        case 'amateur spells':
            outputFile(data, generateAmateurSpellList, 'Amateur Spell List')
            break
        case 'crowd control':
            outputFile(data, generateCrowdControl, 'Crowd Control')
            break
        case 'inventory':
            outputFile(data, generateInventory, 'Inventory')
            break
        case 'languages':
            outputFile(data, generateLanguages, 'Languages')
            break
        case 'skill points':
            outputFile(data, generateSkillPoints, 'Skill Points Shop')
            break
        case 'animals':
            outputFile(data, generateAnimalList, 'Animals and Pets')
            break
        case 'monsters':
            outputFile(data, generateMonsters, 'Monsters')
            break
        default:
            console.log(`Error: Found no case for file type "${Config.files[filePath]}" when outputting.`)
    }
}

outputFile(null, generateIndex, 'index')
outputFile(null, generateSpellSheetMaker, 'Spell Sheet Maker')

let abilitiesContent = 'let Abilities = ' + JSON.stringify(allAbilities, null, 2) + '\n\nexport default Abilities'
let classesContent = 'let Classes = ' + JSON.stringify(allClasses, null, 2) + '\n\nexport default Classes'
let racesContent = 'let Races = ' + JSON.stringify(allRaces, null, 2) + '\n\nexport default Races'
writeFile(join(Config.websiteRootPath, 'JS', 'Databases', 'Abilities.mjs'), abilitiesContent)
writeFile(join(Config.websiteRootPath, 'JS', 'Databases', 'Classes.mjs'), classesContent)
writeFile(join(Config.websiteRootPath, 'JS', 'Databases', 'Races.mjs'), racesContent)
writeFile(join('Databases', 'Abilities.mjs'), abilitiesContent)
writeFile(join('Databases', 'Classes.mjs'), classesContent)
writeFile(join('Databases', 'Races.mjs'), racesContent)
