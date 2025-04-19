import { areArraysEqual, generateUniqueId, getLocalStorageJSON, setLocalStorageJSON, useLocalStorageState } from "../../../utils"
import * as Database from '../../../Database'
import { useEffect } from "react"
import { getUserState, useAuth } from "../../../Auth"

export const NO_CHARACTER_ID = 'none'
export const LOCAL_STORAGE_PREFIX = 'character-'
export const PLAYER_CHARACTER_TEMPLATE = {
    id: NO_CHARACTER_ID,
    names: {
        src: '/Icons/Spells/Skilled_in_Persuasion.png',
        playerName: '',
        characterName: ''
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

//TODO: Save character to firebase
// By default, none.
// When going to MyCharacter, automatically give it an ID if it doesn't have one
// Also, each localStorage state key name should be standardized in one place via constants like CharacterKeys.GOLD
// When loading a character from firestore, load all its things from localStorage for each key in CharacterKeys


// -------------- Local Storage Utils --------------
export function resetCurrentCharacterToDefault() {
    for (const key of Object.keys(PLAYER_CHARACTER_TEMPLATE)) {
        const lsKey = 'character.' + key
        console.log(`Setting ${lsKey} to ${PLAYER_CHARACTER_TEMPLATE[key]}`)
        setLocalStorageJSON(lsKey, PLAYER_CHARACTER_TEMPLATE[key])
    }
}
export function getCurrentCharacterFromLocalStorage() {
    const characterObj = {}
    for (const key of Object.keys(PLAYER_CHARACTER_TEMPLATE)) {
        characterObj[key] = getLocalStorageJSON('character.' + key)
    }
    return characterObj
}
export function setCharacterToLocalStorage(character) {
    for (const key of Object.keys(PLAYER_CHARACTER_TEMPLATE)) {
        setLocalStorageJSON('character.' + key, character[key] == null? PLAYER_CHARACTER_TEMPLATE[key]: character[key])
    }
}
export function getMyCharactersLS() { return getLocalStorageJSON('myCharacters') }
export function useMyCharactersDB(locationInCode) {
    const initialUser = getUserState()
    let { user } = useAuth(locationInCode)
    let [myCharacters, innerSetMyCharacters] = useLocalStorageState('myCharacters', [])

    // TODO: this
    // TODO: check the console....

    if (initialUser != null) {
        Database.getMyCharacters().then(myCharactersFromDB => {
            console.log(`Gottem as:`)
            console.log({myCharactersFromDB})
            if (! areArraysEqual(myCharacters, myCharactersFromDB, (a, b) => a?.id == b?.id)) {
                innerSetMyCharacters(myCharactersFromDB)
            }
        })
    } else {
        useEffect(() => {
            if (user != null) {
                console.log(`Ready to work with userData!`)
                console.log({user})
                return
                console.log(`Getting characters..`)
                
                Database.getMyCharacters().then(myCharactersFromDB => {
                    console.log(`Gottem as:`)
                    console.log({myCharactersFromDB})
                    innerSetMyCharacters(myCharactersFromDB)
                })
            }
        }, [user?.id])
    }

    

    function setMyCharacters(array) {
        if (Array.isArray(array) == false) {
            alert(`ERROR: myCharacters given is not an array`)
            throw `myCharacters given is not an array`
        }

        Database.setMyCharacters(array)

        innerSetMyCharacters(array)

        alert('Character saved!')
    }

    return [[], () => {}]
    return [myCharacters, setMyCharacters]
}

export function getReadyToSaveCharacterFromLocalStorage() {
    const character = getCurrentCharacterFromLocalStorage()
    if (character.id == NO_CHARACTER_ID) {
        const uniqueID = generateUniqueId()
        character.id = uniqueID
        setCurrentCharacterId(uniqueID)
    }
}

export async function saveLocalStorageCharacterToDatabase() {
    const character = getCurrentCharacterFromLocalStorage()
    if (character.id == NO_CHARACTER_ID) {
        const uniqueID = generateUniqueId()
        character.id = uniqueID
        setCurrentCharacterId(uniqueID)
    }
    const myCharacters = await Database.getMyCharacters()
    const thisCharacterIndex = myCharacters.findIndex(char => char.id == character.id)
    if (thisCharacterIndex == -1) {
        Database.setMyCharacters([character])
    } else {
        myCharacters[thisCharacterIndex] = character
        Database.setMyCharacters(myCharacters)
    }
    alert('Character saved!')
}
window.resetCurrentCharacterToDefault = resetCurrentCharacterToDefault
window.getCurrentCharacterFromLocalStorage = getCurrentCharacterFromLocalStorage
window.setCharacterToLocalStorage = setCharacterToLocalStorage



// ------------- Hooks -------------

function useCharacterLocalStorageState(key) {
    return useLocalStorageState('character.' + key, PLAYER_CHARACTER_TEMPLATE[key])
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



