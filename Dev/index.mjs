
import fs, { writeFileSync } from 'fs'
import * as path from 'path'
import pretty from 'pretty'

import * as Config from './Config.mjs'
import { removeSpellTildes } from './utils.mjs'

import generateClass from './Generators/GenerateClass.mjs'
import generateRace from './Generators/GenerateRace.mjs'
import generateWeapons from './Generators/GenerateWeapons.mjs'
import generateArmors from './Generators/GenerateArmors.mjs'
import generateShop from './Generators/GenerateShop.mjs'

import { readYaml, writeFile } from './utils.mjs'

const join = path.join


function getAbilities(abilitiesObject) {
    let abilities = {}
    for (let name of Object.keys(abilitiesObject)) {
        abilities[removeSpellTildes(name)] = abilitiesObject[name]
    }
    return abilities
}
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
function outputClass(object) {
    let htmlContent = pretty(generateClass(object))
    if (!fs.existsSync(Config.websiteRootPath)) fs.mkdirSync(Config.websiteRootPath)
    let fullPath = join(Config.websiteRootPath, object.Class + '.html')
    writeFile(fullPath, htmlContent)
    console.log(`Wrote file ${fullPath}`)
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
function outputRace(object) {
    let htmlContent = pretty(generateRace(object))
    if (!fs.existsSync(Config.websiteRootPath)) fs.mkdirSync(Config.websiteRootPath)
    let fullPath = join(Config.websiteRootPath, object.Race + '.html')
    writeFile(fullPath, htmlContent)
    console.log(`Wrote file ${fullPath}`)
}


function outputWeapons(object) {
    let htmlContent = pretty(generateWeapons(object))
    if (!fs.existsSync(Config.websiteRootPath)) fs.mkdirSync(Config.websiteRootPath)
    let fullPath = join(Config.websiteRootPath, 'Weapons.html')
    writeFile(fullPath, htmlContent)
    console.log(`Wrote file ${fullPath}`)
}
function outputArmors(object) {
    let htmlContent = pretty(generateArmors(object))
    if (!fs.existsSync(Config.websiteRootPath)) fs.mkdirSync(Config.websiteRootPath)
    let fullPath = join(Config.websiteRootPath, 'Armors.html')
    writeFile(fullPath, htmlContent)
    console.log(`Wrote file ${fullPath}`)
}
function outputShop(object) {
    let htmlContent = pretty(generateShop(object))
    if (!fs.existsSync(Config.websiteRootPath)) fs.mkdirSync(Config.websiteRootPath)
    let fullPath = join(Config.websiteRootPath, 'Shop.html')
    writeFile(fullPath, htmlContent)
    console.log(`Wrote file ${fullPath}`)
}



let allAbilities = {}
for (let filePath of Object.keys(Config.files)) {
    console.log(`Outputting ${filePath}`)
    let data = null         // File as JSON object

    switch (Config.files[filePath]) {
        case 'class':
            data = readYaml(join(Config.designRootPath, filePath))
            outputClass(data)
            storeAbilityBlock(allAbilities, getAllClassAbilities(data))
            break
        case 'race':
            data = readYaml(join(Config.designRootPath, filePath))
            outputRace(data)
            storeAbilityBlock(allAbilities, getAllRaceAbilities(data))
        case 'weapons':
            data = readYaml(join(Config.designRootPath, filePath))
            outputWeapons(data)
            break
        case 'armors':
            data = readYaml(join(Config.designRootPath, filePath))
            outputArmors(data)
            break
        case 'shop':
            data = readYaml(join(Config.designRootPath, filePath))
            outputShop(data)
            break
    }
}

let abilitiesContent = 'let Abilities = ' + JSON.stringify(allAbilities, null, 2) + '\n\nexport default Abilities'
writeFile(join(Config.websiteRootPath, 'JS', 'Databases', 'Abilities.mjs'), abilitiesContent)
