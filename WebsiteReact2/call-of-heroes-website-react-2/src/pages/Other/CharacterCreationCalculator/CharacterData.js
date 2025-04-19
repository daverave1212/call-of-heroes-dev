import { areArraysEqual, generateUniqueId, getLocalStorageJSON, setLocalStorageJSON, useLocalStorageState } from "../../../utils"
import * as Database from '../../../Database'
import { useEffect } from "react"
import { getUserState, useAuth } from "../../../Auth"
import { showError } from "../../../services/MessageDisplayer"

export const NO_CHARACTER_ID = 'none'
export const LOCAL_STORAGE_PREFIX = 'character-'
function getNewCharacterTemplate() {
    return {
        id: generateUniqueId(),
        names: {
            src: '/Icons/Spells/Skilled_in_Persuasion.png',
            playerName: '',
            characterName: 'Joe'
        },
        level: 1,
        experience: 0,
        stats: [-1,0,1,2,3],
        
        skillNames: [],
        languages: [],
    
        raceName: null,
        raceSpellNames: [],
    
        className: null,
        specName: null,
        classSpellNames: [],
    
        basicAbilityNames: [],
        featNames: [],
    
        quickNotes: '',
        description: '',
        inventory: '',
        gold: 1000,
    
        shopCart: [],
    }
}
const PLAYER_CHARACTER_TEMPLATE = getNewCharacterTemplate()


// -------------- Local Storage Utils --------------
export function newCharacterLS() {
    const newCharacterTemplate = getNewCharacterTemplate()
    for (const key of Object.keys(newCharacterTemplate)) {
        const lsKey = 'character.' + key
        console.log(`Setting ${lsKey} to ${newCharacterTemplate[key]}`)
        setLocalStorageJSON(lsKey, newCharacterTemplate[key])
    }
}
export function getCurrentCharacterFromLocalStorage() {
    const characterObj = {}
    const newCharacterTemplate = getNewCharacterTemplate()
    for (const key of Object.keys(newCharacterTemplate)) {
        characterObj[key] = getLocalStorageJSON('character.' + key)
    }
    return characterObj
}
export function setCharacterToLocalStorage(character) {
    const newCharacterTemplate = getNewCharacterTemplate()
    for (const key of Object.keys(newCharacterTemplate)) {
        setLocalStorageJSON('character.' + key, character[key] == null? newCharacterTemplate[key]: character[key])
    }
}
export function useMyCharactersDB(locationInCode) {
    const initialUser = getUserState()
    let { user } = useAuth(locationInCode)
    let [myCharacters, innerSetMyCharacters] = useLocalStorageState('myCharacters', [])

    // Sync localstorage characters with DB characters
    if (initialUser != null) {
        Database.getMyCharacters().then(myCharactersFromDB => {
            // Prevent infinite rerendering of this (myCharacter changes every time)
            if (! areArraysEqual(myCharacters, myCharactersFromDB, (a, b) => a?.id == b?.id)) {
                innerSetMyCharacters(myCharactersFromDB)
            }
        })
    }
    useEffect(() => {
        if (user != null) {
            console.log(`Ready to work with userData!`)
            console.log({user})
            
            Database.getMyCharacters().then(myCharactersFromDB => {
                console.log(`User changed. Got characters from DB:`)
                console.log({myCharactersFromDB})
                innerSetMyCharacters(myCharactersFromDB)
            })
        }
    }, [user?.id])

    async function saveMyCharactersToDB(array) /* : bool */ {
        if (Array.isArray(array) == false) {
            showError(`ERROR: myCharacters given is not an array`)
            return false
        }

        try {
            const result = await Database.setMyCharacters(array)            
            innerSetMyCharacters(array)
        } catch (e) {
            showError(`ERROR: An error has occured saving your character: ${e}`)
            return false
        }
        return true
    }

    return [myCharacters, saveMyCharactersToDB]
}

window.newCharacterLS = newCharacterLS
window.getCurrentCharacterFromLocalStorage = getCurrentCharacterFromLocalStorage
window.setCharacterToLocalStorage = setCharacterToLocalStorage



// ------------- Hooks -------------

function useCharacterLocalStorageState(key) {
    const newCharacterTemplate = getNewCharacterTemplate()
    return useLocalStorageState('character.' + key, newCharacterTemplate[key])
}
export function useCurrentCharacterId() {
    return useCharacterLocalStorageState('id')
}
export function setCurrentCharacterId(id) {
    setLocalStorageJSON('character.id', id)
}
export function useSectionNamesState() {
    return useCharacterLocalStorageState('names')
}
export function useSectionStatsState() {
    return useCharacterLocalStorageState('stats')
}
export function useLevel() {
    return useCharacterLocalStorageState('level')
}
export function useExperience() {
    return useCharacterLocalStorageState('experience')
}
export function useSectionRaceName() {
    return useCharacterLocalStorageState('raceName')
}
export function useSectionRaceSpellNames() {
    return useCharacterLocalStorageState('raceSpellNames')
}
export function useBasicAbilitiesNames() {
    return useCharacterLocalStorageState('basicAbilityNames')
}
export function useFeats() {
    return useCharacterLocalStorageState('featNames')
}
export function useSectionClassName() {
    return useCharacterLocalStorageState('className')
}
export function useSectionClassSpecName() {
    return useCharacterLocalStorageState('specName')
}
export function useSectionClassSpellNames() {
    return useCharacterLocalStorageState('classSpellNames')
}
export function useGold() {
    return useCharacterLocalStorageState('gold')
}
export function useInventory() {
    return useCharacterLocalStorageState('inventory')
}
export function useDescription() {
    return useCharacterLocalStorageState('description')
}
export function useQuickNotes() {
    return useCharacterLocalStorageState('quickNotes')
}
export function useCharacterShoppingCart() {
    return useCharacterLocalStorageState('shopCart')
}
export function useGetSetCart() {
    let getVal = () => getLocalStorageJSON('character.shopCart')
    let setVal = val => setLocalStorageJSON('character.shopCart', val)
    return [getVal, setVal]
}
export function useLanguages() {
    return useCharacterLocalStorageState('languages', [])
}
export function useSkills() {
    return useCharacterLocalStorageState('skillNames', [])
}



