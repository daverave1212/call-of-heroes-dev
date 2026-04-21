import { addManyObjects, addObjects, areArraysEqual, generateUniqueId, getAlMyRaceAndClassSpells, getAllClasses, getAllSkillsByName, getAllSpellsByName, getLocalStorageJSON, setLocalStorageJSON, useLocalStorageState } from "../../../utils"
import * as Database from '../../../Database'
import { useEffect } from "react"
import { getUserState, useAuth } from "../../../Auth"
import { showError } from "../../../services/MessageDisplayer"
import { useConstAllBonuses, useConstBonusesFromSpellsAndItems, useConstTotalStats } from "./MyCharacter"
import { calculateAllAtributes, DEFAULT_CHARACTER_BONUSES, DEFAULT_STAT_ARRAY, STAT_NAMES } from "../../../services/game-lib/stat-calculations"
import { Names } from "../../../services/NameGenerator/name-generator"

export const NO_CHARACTER_ID = 'none'
function getNewCharacterTemplate() {
    return {
        id: generateUniqueId(),
        names: {
            src: '/Icons/Spells/Skilled_in_Persuasion.png',
            playerName: '',
            characterName: Names.humanMale()
        },
        level: 1,
        experience: 0,
        stats: DEFAULT_STAT_ARRAY,
        manualBonuses: DEFAULT_CHARACTER_BONUSES,
        manualExtras: [],
        manualCombatExtras: [],
        choiceBonuses: [
            {
                source: {
                    sourceType: 'spell',
                    name: 'Stat Bonus 4'
                },
                statName: STAT_NAMES[0],
                bonus: 1
            }
        ],
        
        skillNames: [],
        manualSkillBonuses: {},
        languages: [],
    
        raceName: null,
        raceSpellNames: [],
    
        className: null,
        specName: null,
        classSpellNames: [],
    
        selectedAbilities: [],
        spellsMetadata: {},
        selectedFontName: '',
        basicAbilityNames: [],
        featNames: [],

        currentHealth: 1,
        currentMana: 1,
    
        quickNotes: '',
        description: '',
        inventory: '',
        weaponNames: [],
        armorNames: [],
        
        gold: 1000,
        shopCart: [],

        hasAccessToFonts: false,

        variables: {}
    }
}
const PLAYER_CHARACTER_TEMPLATE = getNewCharacterTemplate()


// -------------- Local Storage Utils --------------
export function normalizeCharacter(character) {
    const newCharacterTemplate = getNewCharacterTemplate()
    return {
        ...newCharacterTemplate,
        ...character
    }
}
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
    return normalizeCharacter(characterObj)
}
export function setCharacterToLocalStorage(character) {
    const newCharacterTemplate = getNewCharacterTemplate()
    for (const key of Object.keys(newCharacterTemplate)) {
        setLocalStorageJSON('character.' + key, character?.[key] == null? newCharacterTemplate[key]: character[key])
    }
}
export function clearCurrentCharacter() {
    setCharacterToLocalStorage(null)
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
                const myCharactersNormalized = myCharactersFromDB.map(char => normalizeCharacter(char))
                innerSetMyCharacters(myCharactersNormalized)
            }
        })
    }
    useEffect(() => {
        if (user != null) {
            Database.getMyCharacters().then(myCharactersFromDB => {
                // console.log(`User changed. Got characters from DB:`)
                // console.log({myCharactersFromDB})
                const myCharactersNormalized = myCharactersFromDB.map(char => normalizeCharacter(char))
                innerSetMyCharacters(myCharactersNormalized)
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

// ---------- Page specific hooks ----------

// Names
export function useSectionNamesState() {
    return useCharacterLocalStorageState('names')
}

// Character Details
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
export function useLanguages() {
    return useCharacterLocalStorageState('languages', [])
}
export function useSkills() {
    return useCharacterLocalStorageState('skillNames', [])
}
export function useManualSkillBonuses() {
    return useCharacterLocalStorageState('manualSkillBonuses', {})
}
export function useManualNormalExtras() {
    return useCharacterLocalStorageState('manualExtras', {})
}
export function useManualCombatExtras() {
    return useCharacterLocalStorageState('manualCombatExtras', {})
}

// Stats and Level
export function useSectionStatsState() {
    return useCharacterLocalStorageState('stats')
}
export function useLevel() {
    return useCharacterLocalStorageState('level')
}
export function getLevel() {
    return getLocalStorageJSON('character.level')
}
export function setLevel(obj) {
    return setLocalStorageJSON('character.level', obj)
}
export function useExperience() {
    return useCharacterLocalStorageState('experience')
}

// General
export function useManualBonuses() {    // Manual != bonuses from abilities; those are derived
    return useCharacterLocalStorageState('manualBonuses')
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
export function useCustomCharacterVariables() {
    return useCharacterLocalStorageState('variables', {})
}

// Race
export function useSectionRaceName() {
    return useCharacterLocalStorageState('raceName')
}
export function getSectionRaceName() {
    return getLocalStorageJSON('character.raceName')
}
export function setSectionRaceName(obj) {
    return setLocalStorageJSON('character.raceName', obj)
}

// Class
export function useSectionClassName() {
    return useCharacterLocalStorageState('className')
}
export function getSectionClassName() {
    return getLocalStorageJSON('character.className')
}
export function setSectionClassName(obj) {
    return setLocalStorageJSON('character.className', obj)
}
export function useSectionClassSpecName() {
    return useCharacterLocalStorageState('specName')
}

// Feats and Basic Abilities and Other
export function useSelectedAbilityNames() {
    return useCharacterLocalStorageState('selectedAbilities')
}
export function getSelectedAbilityNames() {
    return getLocalStorageJSON('character.selectedAbilities')
}
export function setSelectedAbilityNames(obj) {
    return setLocalStorageJSON('character.selectedAbilities', obj)
}

export function useAllSpellsMetadata() {
    return useCharacterLocalStorageState('spellsMetadata')
}
export function getAllSpellsMetadata() {
    return getLocalStorageJSON('character.spellsMetadata')
}
export function setAllSpellsMetadata(obj) {
    return setLocalStorageJSON('character.spellsMetadata', obj)
}
export function useSelectedFontName() {
    return useCharacterLocalStorageState('selectedFontName')
}
export function useFeats() {
    return useCharacterLocalStorageState('featNames')
}

// Shopping
export function useCharacterShoppingCart() {
    return useCharacterLocalStorageState('shopCart')
}
export function useGetSetCart() {
    let getVal = () => getLocalStorageJSON('character.shopCart')
    let setVal = val => setLocalStorageJSON('character.shopCart', val)
    return [getVal, setVal]
}
export function useWeapons() {
    return useCharacterLocalStorageState('weaponNames', [])
}
export function getWeapons() {
    return getLocalStorageJSON('character.weaponNames')
}
export function setWeapons(obj) {
    return setLocalStorageJSON('character.weaponNames', obj)
}

export function useArmors() {
    return useCharacterLocalStorageState('armorNames', [])
}
export function getArmors() {
    return getLocalStorageJSON('character.armorNames')
}
export function setArmors(obj) {
    return setLocalStorageJSON('character.armorNames', obj)
}

// Tracking
export function useCurrentMana() {
    return useCharacterLocalStorageState('currentMana')
}
export function useCurrentHealth() {
    return useCharacterLocalStorageState('currentHealth')
}
export function useHasAccessToFonts() {
    return useCharacterLocalStorageState('hasAccessToFonts')
}


// Use const
export function useConstTotalAttributes() {
    const [raceName] = useSectionRaceName()
    const [className] = useSectionClassName()
    const [level] = useLevel()
    const totalStats = useConstTotalStats()
    const { bonuses } = useConstAllBonuses()
    const specialBonusNames = useConstAllSpecialBonusesNames()
    const attributes = calculateAllAtributes({raceName, className, level, totalStats, bonuses, specialBonusNames})
    return attributes
}
export function useConstAllMyAbilities() {
    let [selectedAbilityNames] = useSelectedAbilityNames()
    let [selectedRaceName] = useSectionRaceName()
    let [selectedClassName] = useSectionClassName()
    let [selectedSpecName] = useSectionClassSpecName()

    const rcSpells = getAlMyRaceAndClassSpells({
        raceName: selectedRaceName,
        className: selectedClassName,
        specName: selectedSpecName
    })
    const selectedAbilities = selectedAbilityNames.map(name => getAllSpellsByName()[name])
    return [...rcSpells, ...selectedAbilities].filter(spell => spell != null)
}
export function useConstAllSkillBonuses() {
    console.log("HERE WE ARE BOYOS")
    const abilities = useConstAllMyAbilities()
    const [manualSkillBonuses, _] = useManualSkillBonuses()
    const spellsWithSkillObjects = abilities.filter(a => a?.['Skill Bonuses'] != null && !Array.isArray(a?.['Skill Bonuses']))
    const allSpellSkillsObject = addManyObjects(spellsWithSkillObjects.map(s => s['Skill Bonuses']))
    const allSkillsObject = addObjects(allSpellSkillsObject, manualSkillBonuses)
    console.log({abilities, spellsWithSkillObjects, allSpellSkillsObject, allSkillsObject})
    return allSkillsObject
}
export function useConstAutoSkillBonuses() {
    const abilities = useConstAllMyAbilities()
    const spellsWithSkillObjects = abilities.filter(a => a?.['Skill Bonuses'] != null && !Array.isArray(a?.['Skill Bonuses']))
    const allSpellSkillsObject = addManyObjects(spellsWithSkillObjects.map(s => s['Skill Bonuses']))
    return allSpellSkillsObject
}
export function useConstAllSpecialBonusesNames() {
    const abilities = useConstAllMyAbilities()
    const specialBonusNames = abilities.map(a => a?.['Special Bonuses']).filter(sb => sb != null)
    console.log({specialBonusNames, abilities})
    return specialBonusNames
}


// Other
export function toggleSpellForSelectedSpellNames(spell, spellMetadata, selectedSpellNames, setSelectedSpellNames) {
    const { variantIndex } = spellMetadata

    const allSpellsMetadata = getAllSpellsMetadata()

    if (selectedSpellNames.includes(spell.Name)) {
        // delete allSpellsMetadata[spell.Name]
        // setAllSpellsMetadata(allSpellsMetadata)
        setSelectedSpellNames(selectedSpellNames.filter(name => name != spell.Name))
    } else {
        allSpellsMetadata[spell.Name] = spellMetadata
        setAllSpellsMetadata(allSpellsMetadata)
        setSelectedSpellNames([...selectedSpellNames, spell.Name])
    }
}

export function toggleSpellMaybePopup(spell, spellMetadata, selectedSpellNames, setSelectedAbiltiesNames, openPopup) {
    if (spell.Popup != null) {
        openPopup({...spell.Popup, callback: () => {
            toggleSpellForSelectedSpellNames(spell, spellMetadata, selectedSpellNames, setSelectedAbiltiesNames)
        }})
    } else {
        toggleSpellForSelectedSpellNames(spell, spellMetadata, selectedSpellNames, setSelectedAbiltiesNames)
    }
}




