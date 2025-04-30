







import { useEffect, useState } from "react";
import { Races, Classes } from '../AllRacesAndClasses'
import SmallStat from "../../../components/SmallStat/SmallStat";
import Page from "../../../containers/Page/Page";
import TwoColumns from "../../../components/TwoColumns/TwoColumns";
import Column from "../../../components/TwoColumns/Column";
import Spoiler from "../../../components/Spoiler/Spoiler";

import './CharacterCreationCalculator.css'
import { IconWithSpinner, SpellTopIconSide } from "../../../components/Spell/Spell";
import { CoolButton } from "../../../components/CoolButton/CoolButton";
import HeroButton from "../../../components/HeroButton/HeroButton";
import { calculateMaxHealth, calculateStat, generateUniqueId, getAllClasses, getAllRaces, getClassRepresentativeIconName, getSpellIconPathByName, splitArrayEvenly, useLocalStorageState } from "../../../utils";
import Selector from "../../../components/Selector/Selector";
import ManySpells from "../../../components/Spell/ManySpells";

import overallData from '../../../databases/OverallData.json'
import { connectFirestoreEmulator } from "firebase/firestore";
import PageH2 from "../../../components/PageH2/PageH2";
import Tabs from "../../../components/Tabs/Tabs";
import { ClassPageV2, CCRacePage, ClassPage, RacePage } from "../../../components/InsertableTemplates/RaceClassComponents";
import { QGTitle1 } from "../../Tools/TitleGenerator";
import Icon from "../../../components/Icon";
import SectionNames from "./SectionNames";
import SectionStats, { BASE_STATS, STAT_NAMES } from "./SectionStats";
import MyCharacter from "./MyCharacter";
import SectionSkills from "./SectionSkills";
import SectionLanguages from "./SectionLanguages";
import SectionBasicAbilities, { useCCCTabs } from "./SectionBasicAbilities";
import SectionFeats from "./SectionFeats";
import SectionShop from "./SectionShop";
import SectionRace from "./SectionRace";
import SectionClass from "./SectionClass";
import { NO_CHARACTER_ID, getCurrentCharacterFromLocalStorage, newCharacterLS, setCharacterToLocalStorage, setCurrentCharacterId, useChoiceAbiliesObjects, useCurrentCharacterId, useMyCharactersDB, useSectionNamesState } from "./CharacterData";
import { SelectorsByColumns } from "../Abilities";
import { showSuccessMessage } from "../../../services/MessageDisplayer";
import Dialog from "../../../components/Dialog/Dialog";


export const tabLayout = [
    ['My Character', 'Name and Portrait'],
    ['Stats and Level', 'Race', 'Class'],
    ['Languages', 'Skills', 'Shop'],
    ['Basic Abilities', 'Feats', 'Pets and Animals']
]
export const tabNames = tabLayout.flat()


export function classesRacesObjectToArrays(bigObj) {
    const classNames = Object.keys(bigObj)
    const classObjects = classNames.map(name => bigObj[name])
    const classObjRows = splitArrayEvenly(classObjects, 2)
    return classObjRows
}

function MyCharacters() {
    let [myCharacters, saveCharacters] = useMyCharactersDB('CCC.MyCharacters')
    let [currentCharacterId] = useCurrentCharacterId()

    const selectorData = myCharacters.map(char => ({
        name: char.names.characterName,
        src: char.names.src
    }))

    const selectedSelectorName = myCharacters.find(char => char.id == currentCharacterId)?.names.characterName

    function newCharacter() {
        newCharacterLS()
        saveCharacters([...myCharacters, getCurrentCharacterFromLocalStorage()])
    }

    return (
        <div className="center-content">
            <div style={{ width: '100%', maxWidth: '700px'}}>
                <SelectorsByColumns
                    selectorData={selectorData}
                    nColumns={1}
                    selectedSelectorName={selectedSelectorName}
                    setSelectedSelectorName={(name) => {
                        console.log(`Searching for character ${name} in myCharacters:`)
                        console.log({myCharacters})
                        const foundCharacter = myCharacters.find(char => char.names.characterName == name)
                        console.log(`Found:`)
                        console.log({foundCharacter})
                        setCharacterToLocalStorage(foundCharacter)
                    }}
                />
            </div>
            <div className="flex-row gap-half margin-top-1">
                <button onClick={newCharacter}>New Character</button>
                <button style={{ maxWidth: '25%', backgroundColor: 'red' }}>Delete</button>
            </div>
        </div>
    )
}

function SaveCharacterButton() {

    let [myCharacters, saveMyCharacters] = useMyCharactersDB('CharacterCreationCalculator.SaveCharacterButton')

    function saveCharacter() {
        const currentCharacter = getCurrentCharacterFromLocalStorage()
        const existingCharacterIndex = myCharacters.findIndex(char => char.id == currentCharacter.id)
        const willAddNewCharacter = currentCharacter.id == NO_CHARACTER_ID || existingCharacterIndex == -1
        const newMyCharacters = [...myCharacters]
        if (willAddNewCharacter) {
            if (currentCharacter.id == NO_CHARACTER_ID) {
                const uniqueID = generateUniqueId()
                currentCharacter.id = uniqueID                
                setCurrentCharacterId(uniqueID)
            }
            newMyCharacters.push(currentCharacter)
        } else {
            newMyCharacters[existingCharacterIndex] = currentCharacter
        }
        const wasSaveSuccessful = saveMyCharacters(newMyCharacters)
        if (wasSaveSuccessful) {
            showSuccessMessage('Character saved successfully!')
        }
    }
    
    return (
        <div className="center-content margin-top-1">
            <button onClick={saveCharacter}>Save Character</button>
        </div>
    )
}

const DIALOG_STATE_TEMPLATE = {
    spell: 'object',
    selectedAbilitiesNames: [],
    setSelectedAbiltiesNames: [],
    dialogType: 'stat' | 'skills'
}
function AbilityStatDialog({ dialogState, setDialogState }) {

    let [choiceBonus, setChoiceBonus] = useState(null)

    let [choiceBonuses, setChoiceBonuses] = useChoiceAbiliesObjects()

    const { dialogType, spell, selectedAbilitiesNames, setSelectedAbiltiesNames } = dialogState ?? {}
    
    useEffect(() => {
        setChoiceBonus(null)
    }, [dialogState])

    function StatPicker() {
        return <div className="flex-row center-content gap-half">
            { STAT_NAMES.map(statName => (
                <div
                    className={`stat-input small ${choiceBonus != null && choiceBonus.statName == statName? 'shadow-purple': ''}`}
                    onClick={() => {
                        setChoiceBonus({
                            source: {
                                sourceType: 'spell',
                                name: spell.Name
                            },
                            statName: statName,
                            bonus: 1
                        })
                    }}
                >
                    {statName.toUpperCase().substring(0, 3)}
                </div>
            )) }
        </div>
    }

    function onAddClick() {
        setSelectedAbiltiesNames([...selectedAbilitiesNames, spell.Name])
        setChoiceBonuses([...choiceBonuses, choiceBonus])
        setDialogState(null)

    }

    return <Dialog buttonText={choiceBonus != null? 'Add': null} isOpen={spell != null} onButtonClick={onAddClick} setIsOpen={() => setDialogState(null)}>
        { dialogState != null && (
            <div>
                { dialogType == 'stat' && <StatPicker/> }
            </div>
        ) } 
    </Dialog>
}

export default function CharacterCreationCalculator() {

    const [activeTabI, setActiveTabI, last] = useCCCTabs()
    const [names, setNames] = useSectionNamesState()
    
    let [dialogState, setDialogState] = useState(null)

    function openPopup(spell, selectedAbilitiesNames, setSelectedAbiltiesNames) {
        console.log({spell})
        setDialogState({
            spell: spell,
            selectedAbilitiesNames: selectedAbilitiesNames,
            setSelectedAbiltiesNames: setSelectedAbiltiesNames,
            dialogType: spell['Choice Bonuses'][0].Type
        })
    }

    return (
        <Page id="Character-Builder" isCentered={true}>

            <AbilityStatDialog dialogState={dialogState} setDialogState={setDialogState}/>

            <div className="center-content">
                <QGTitle1 text={"My Characters"} height="60"/>
            </div>

            <MyCharacters/>

            <div className="center-content">
                <QGTitle1 text={"Character"} height="60"/>
            </div>

            <Tabs layout={tabLayout} activeTabI={activeTabI} setActiveTabI={setActiveTabI} tabComponents={[
                <MyCharacter/>, <SectionNames onChange={newNamesState => setNames(newNamesState)}/>,
                <SectionStats/>, <SectionRace/>, <SectionClass openPopup={openPopup}/>,
                <SectionLanguages/>, <SectionSkills/>, <SectionShop/>,
                <SectionBasicAbilities openPopup={openPopup}/>, <SectionFeats/>, <div></div>,
            ]}/>

            <SaveCharacterButton/>
            

        </Page>
    )

}