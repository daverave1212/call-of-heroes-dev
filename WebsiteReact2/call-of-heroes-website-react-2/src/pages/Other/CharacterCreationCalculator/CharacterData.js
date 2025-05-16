import { areArraysEqual, calculateNKnownAbilities, generateUniqueId, getAlMyRaceAndClassSpells, getAllClasses, getAllSkillsByName, getAllSpellsByName, getLocalStorageJSON, setLocalStorageJSON, useLocalStorageState } from "../../../utils"
import * as Database from '../../../Database'
import { useEffect } from "react"
import { getUserState, useAuth } from "../../../Auth"
import { showError } from "../../../services/MessageDisplayer"
import { useConstAllBonuses, useConstBonusesFromSpellsAndItems, useConstTotalStats } from "./MyCharacter"

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
        bonuses: {
            'Might': 0,
            'Dexterity': 0,
            'Intelligence': 0,
            'Sense': 0,
            'Charisma': 0,

            'Max Health': 0,
            'Health Regen': 0,
            'Movement Speed': 0,
            'Initiative': 0,

            'Known Abilities': 0,
            "Skills": 0,
            'Extras': [],
            'Combat Extras': []
        },
        choiceBonuses: [
            {
                source: {
                    sourceType: 'spell',
                    name: 'Stat Bonus 4'
                },
                statName: 'Might',
                bonus: 1
            }
        ],
        
        skillNames: [],
        languages: [],
    
        raceName: null,
        raceSpellNames: [],
    
        className: null,
        specName: null,
        classSpellNames: [],
    
        basicAbilityNames: [],
        featNames: [],

        currentMana: 1,
    
        quickNotes: '',
        description: '',
        inventory: '',
        weaponNames: [],
        armorNames: [],
        
        gold: 1000,
        shopCart: [],

        variables: {}
    }
}
const PLAYER_CHARACTER_TEMPLATE = getNewCharacterTemplate()


// -------------- Local Storage Utils --------------
export function newCharacterLS() {
    const newCharacterTemplate = getNewCharacterTemplate()
    for (const key of Object.keys(newCharacterTemplate)) {
        const lsKey = 'character.' + key
        // console.log(`Setting ${lsKey} to ${newCharacterTemplate[key]}`)
        setLocalStorageJSON(lsKey, newCharacterTemplate[key])
    }
}
export function getCurrentCharacterFromLocalStorage() {
    const characterObj = {}
    const newCharacterTemplate = getNewCharacterTemplate()
    for (const key of Object.keys(newCharacterTemplate)) {
        const propValueFromLS = getLocalStorageJSON('character.' + key)
        characterObj[key] = propValueFromLS ?? newCharacterTemplate[key]
    }
    return characterObj
}
export function setCharacterToLocalStorage(character) {
    const newCharacterTemplate = getNewCharacterTemplate()
    for (const key of Object.keys(newCharacterTemplate)) {
        setLocalStorageJSON('character.' + key, character[key] == null? newCharacterTemplate[key]: character[key])
    }
}
let myCharactersFromDBTestCache = []
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
            Database.getMyCharacters().then(myCharactersFromDB => {
                // console.log(`User changed. Got characters from DB:`)
                // console.log({myCharactersFromDB})
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
    myCharactersFromDBTestCache = myCharacters
    return [myCharacters, saveMyCharactersToDB]
}

window.newCharacterLS = newCharacterLS
window.getCurrentCharacterFromLocalStorage = getCurrentCharacterFromLocalStorage
window.setCharacterToLocalStorage = setCharacterToLocalStorage
window.getMyCharactersTest = () => myCharactersFromDBTestCache



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
export function useManualBonuses() {    // Manual != bonuses from abilities; those are derived
    return useCharacterLocalStorageState('bonuses')
}
export function useChoiceAbiliesObjects() {
    return useCharacterLocalStorageState('choiceBonuses')
}
export function getChoiceAbilitiesObjects() {
    return getLocalStorageJSON('character.choiceBonuses')
}
export function setChoiceAbilitiesObjects(arr) {
    return setLocalStorageJSON('character.choiceBonuses', arr)
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
export function useCurrentMana() {
    return useCharacterLocalStorageState('currentMana', 1)
}
export function useWeapons() {
    return useCharacterLocalStorageState('weaponNames', [])
}
export function useArmors() {
    return useCharacterLocalStorageState('armorNames', [])
}
export function useCustomCharacterVariables() {
    return useCharacterLocalStorageState('variables', {})
}


// Use const
export function useConstKnownAbilitiesObj() {
    let [selectedBasicAbilitiesNames] = useBasicAbilitiesNames()
    const stats = useConstTotalStats()
    let maxKnownAbilities = 2 + stats[2]
    if (maxKnownAbilities < 0) {
        maxKnownAbilities = 0
    }
    const nKnownAbilities = selectedBasicAbilitiesNames.length
    return {
        maxKnownAbilities, nKnownAbilities
    }
}
export function useConstAvailableAbilitySchools() {
    let [selectedClassName] = useSectionClassName()
    if (selectedClassName == null) {
        return ['Default Moves']
    }
    const classSchools = getAllClasses()[selectedClassName].Spellcasting['Basic Ability Lists']
    return ['Default Moves', ...classSchools]
}
export function useConstNKnownAbilities() {
    let [level] = useLevel()
    let [className] = useSectionClassName()

    if (className == null) {
        return 0
    }
    
    const totalStats = useConstTotalStats()
    const { bonuses } = useConstAllBonuses()

    return calculateNKnownAbilities(className, totalStats, bonuses)
}
export function useConstAllRaceAndClassSpells() {
    let [selectedRaceName] = useSectionRaceName()
    let [selectedRaceSpellNames] = useSectionRaceSpellNames()
    let [selectedClassName] = useSectionClassName()
    let [selectedSpecName] = useSectionClassSpecName()
    let [selectedClassSpellNames] = useSectionClassSpellNames()

    const allMyRaceAndClassSpells = getAlMyRaceAndClassSpells({
        raceName: selectedRaceName,
        selectedRaceSpellNames,
        className: selectedClassName,
        specName: selectedSpecName,
        selectedClassSpellNames
    })

    return allMyRaceAndClassSpells
}
export function useConstAllBasicAbilities() {
    let [selectedBasicAbilitiesNames] = useBasicAbilitiesNames()
    return selectedBasicAbilitiesNames.map(spellName => getAllSpellsByName()[spellName])
}
export function useConstAllFeats() {
    let [featNames] = useFeats()
    const feats = featNames.map(name => getAllSpellsByName()[name])
    return feats
}
export function useConstAllMyAbilities() {
    const rcSpells = useConstAllRaceAndClassSpells()
    const basicAbilities = useConstAllBasicAbilities()
    const feats = useConstAllFeats()
    return [...rcSpells, ...basicAbilities, ...feats]
}
export function useConstAllSkillNames() {
    let [skillNames] = useSkills()
    
    const abilities = useConstAllMyAbilities()
    const spellsWithSkills = abilities.filter(a => a.Skills != null)
    const skillsUnflat = spellsWithSkills.map(a => a.Skills)
    const skillsFlat = skillsUnflat.flat()
    const allMySkills = [...skillNames, ...skillsFlat]

    return allMySkills
}