
import fs, { writeFileSync } from 'fs'
import * as path from 'path'
import pretty from 'pretty'

import * as Config from './Config.mjs'
import { removeSpellTildes } from './utils.mjs'

import generateClass from './Generators/GenerateClass.mjs'
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

let allAbilities = {}
for (let filePath of Object.keys(Config.files)) {
    switch (Config.files[filePath]) {
        case 'class':
            console.log(`Outputting ${filePath}`)
            let data = readYaml(join(Config.designRootPath, filePath))
            outputClass(data)
            storeAbilityBlock(allAbilities, getAllClassAbilities(data))
    }
}

let abilitiesContent = 'let Abilities = ' + JSON.stringify(allAbilities, null, 2) + '\n\nexport default Abilities'
writeFile(join(Config.websiteRootPath, 'JS', 'Databases', 'Abilities.mjs'), abilitiesContent)
