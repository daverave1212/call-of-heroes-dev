
import * as Mappings from './Mappings.mjs'
import * as FileList from './FileList.mjs'

import fs from 'fs'
import YAML from 'yaml'

function checkProperty(value, givenType, givenPropertyForErrorMessage) {
    let objectType = typeof(value)

    let isArray = false
    if (Array.isArray(givenType)) isArray = true
    if (isArray) {
        if (!Array.isArray(value)) {
            console.log(`Error: Wrong property type for object property ${givenPropertyForErrorMessage}. ${objectType} should be array`)
        } else {
            let nestedType = givenType[0]
            for (let elem of value) {
                checkProperty(elem, nestedType, `<list element of ${givenPropertyForErrorMessage}>`)
            }
        }
    } else {
        switch (givenType) {
            case 'number':
            case 'string':
                if ( objectType == givenType ) break
                else {
                    console.log(`Error: Wrong property type for object property ${givenPropertyForErrorMessage}. Was ${objectType} should be ${givenType}`)
                    break
                }
            case 'customObject':
                if (objectType == 'object' && !Array.isArray(value)) break
                else {
                    console.log(`Error: Wrong property type for object property ${givenPropertyForErrorMessage}. Array should be object`)
                    break
                }
            case 'anything': break
            case 'abilityList':
                for (let abilityName of Object.keys(value)) {
                    let abilityBody = value[abilityName]
                    checkObjectByMapping(abilityBody, Mappings.abilityMapping)
                }
                break
            case 'specList':
                for (let specName of Object.keys(value)) {
                    let specBody = value[specName]
                    checkObjectByMapping(specBody, Mappings.specMapping)
                }
                break
            default:
                if (typeof(givenType) == 'object') {
                    if (objectType == 'object') {
                        checkObjectByMapping(value, givenType)
                        break
                    } else {
                        console.log(`Error: Wrong property type for object property ${givenPropertyForErrorMessage}. ${objectType} should be object with special properties`)
                        break
                    }
                } else {
                    console.log(`Error: Unknown mapping type given ${givenType}`)
                }
        }
    }

    
}

export function checkObjectByMapping(object, mapping) {
    for (let key of Object.keys(mapping)) {
        let isOptional = false
        let prop = null
        if (key.charAt(0) == '*') {
            //console.log(`Indeed, my key is Optional.`)
            isOptional = true
            prop = key.substring(1)
            //console.log(`New prop = ${prop}`)
        } else {
            prop = key
        }

        if (object[prop] == null) {
            if (isOptional) {
                continue
            } else {
                console.log(`Warning: Missing property ${prop}`)
                //console.log(object)
                continue
            }
        } else {
            //console.log(`Indeed, object property ${prop} is not null, but rather ${object[prop]}`)
        }

        checkProperty(object[prop], mapping[key], prop)
    }
    let mappingKeys = Object.keys(mapping).map(key => (key.charAt(0) == '*'? key.substring(1): key))
    for (let prop of Object.keys(object)) {
        if (mappingKeys.includes(prop)) continue
        else {
            console.log(`Warning: Object has extra property ${prop} not defined in the mapping`)
            //console.log(`${object[prop]}`)
        }
    }
}

function checkFile(path, type) {
    let yamlText = fs.readFileSync(path, {encoding: 'utf8', flag: 'r'})
    let object = YAML.parse(yamlText)
    switch (type) {
        case 'class':
            checkObjectByMapping(object, Mappings.classMapping)
            break
        case 'race':
            checkObjectByMapping(object, Mappings.raceMapping)
            break
        default:
            console.log(`Error: Unknown file type mapping given ${type}`)
    }
}

function checkAllFiles() {
    let designRoot = '..\\Design\\';
    for (let fileName of Object.keys(FileList.files)) {
        console.log(`> Checking ${fileName}`)
        checkFile(designRoot + fileName, FileList.files[fileName])
    }
}


//checkFile("S:\\Work\\GitHub\\Call of Heroes Design\\call-of-heroes-dev\\Design\\Races\\Bertle.yml", 'race')

checkAllFiles()