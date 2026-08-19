import { useEffect, useState } from "react";
import { Races, Classes } from '../../../services/content-providers/AllRacesAndClasses'
import SmallStat from "../../../components/SmallStat/SmallStat";
import Page from "../../../containers/Page/Page";
import TwoColumns from "../../../components/TwoColumns/TwoColumns";
import Column from "../../../components/TwoColumns/Column";
import Spoiler from "../../../components/Spoiler/Spoiler";

import './CharacterCreationCalculator.css'
import { SpellTopIconSide } from "../../../components/Spell/Spell";
import { CoolButton } from "../../../components/CoolButton/CoolButton";
import HeroButton from "../../../components/HeroButton/HeroButton";
import useConstWindowDimensions, { generateUniqueId, getAllClasses, getClassRepresentativeIconName, getSpellIconPathByName, isStringJSON, normalizeStringJSON, pasteFromClipboardAsync, splitArrayEvenly, uncapitalizeFirstLetter, useLocalStorageState } from "../../../utils";
import Selector from "../../../components/Selector/Selector";
import ManySpells from "../../../components/Spell/ManySpells";

import overallData from '../../../databases/OverallData.json'
import { connectFirestoreEmulator } from "firebase/firestore";
import PageH2 from "../../../components/PageH2/PageH2";
import Tabs from "../../../components/Tabs/Tabs";
import { QGTitle1 } from "../../Tools/TitleGenerator";
import Icon from "../../../components/Icon";
import SectionNames from "./SectionNames";
import SectionStats from "./SectionStats";
import MyCharacter from "./MyCharacter";
import SectionSkills from "./SectionSkills";
import SectionLanguages from "./SectionLanguages";
import SectionBasicAbilities, { useCCCTabs } from "./SectionBasicAbilities";
import SectionFeats from "./SectionFeats";
import SectionShop from "./SectionShop";
import SectionRace from "./SectionRace";
import SectionClass from "./SectionClass";
import { NO_CHARACTER_ID, clearCurrentCharacter, getCurrentCharacterFromLocalStorage, newCharacterLS, normalizeCharacter, setCharacterToLocalStorage, setCurrentCharacterId, useChoiceAbiliesObjects, useCurrentCharacterId, useMyCharactersDB, useSectionNamesState } from "./CharacterData";
import { SelectorsByColumns } from "../Abilities";
import Dialog from "../../../components/Dialog/Dialog";
import { STAT_NAMES } from "../../../services/game-lib/stat-calculations";
import { useDoIOwnSet, useIsLoggedIn } from "../../../services/auth/Auth";
import LoginRequired from "../../../components/LoginRequired/LoginRequired";
import SectionMagicFonts from "./SectionMagicFonts";
import { showToast } from "../../../services/dom/toaster";


const TAB_LAYOUT_LANDSCAPE = [
    ['My Character'],
    ['Name and Portrait', 'Stats and Level'],
    ['Race', 'Class', 'Feats'],
    ['Magic Fonts', 'Shop', 'Pets and Animals']
]
const TAB_LAYOUT_PORTRAIT = [
    ['My Character'],
    ['Name and Portrait', 'Stats and Level'],
    ['Race', 'Class', 'Feats'],
    ['Magic Fonts'],
    ['Shop', 'Pets and Animals']
]
const TAB_LAYOUT_MOBILE = TAB_LAYOUT_LANDSCAPE.flat().map(tabName => [tabName])
export const TAB_NAMES = TAB_LAYOUT_LANDSCAPE.flat()


export function classesRacesObjectToArrays(bigObj) {
    const classNames = Object.keys(bigObj)
    const classObjects = classNames.map(name => bigObj[name])
    const classObjRows = splitArrayEvenly(classObjects, 2)
    return classObjRows
}

function MyCharacters() {
    let [activeTabI, setActiveTabI, last] = useCCCTabs()
    let [myCharacters, saveCharacters] = useMyCharactersDB('CCC.MyCharacters')
    let [currentCharacterId, setCurrentCharacterId] = useCurrentCharacterId()

    const [doIOwnCoreSet, isDoIOwnSetLoading] = useDoIOwnSet('core')

    const cantMakeMore = !doIOwnCoreSet && myCharacters.length >= 5

    const selectorData = myCharacters.map(char => ({
        name: char.names.characterName,
        src: char.names.src
    }))

    const selectedSelectorName = myCharacters.find(char => char.id == currentCharacterId)?.names.characterName

    async function importCharacter() {
        const charJSON = normalizeStringJSON(await pasteFromClipboardAsync())
        console.green(`Trying to load hero: ${charJSON}`)
        if (!isStringJSON(charJSON)) {
            alert('Failed to load Hero from clipboard: not a valid JSON.')
        }
        const char = JSON.parse(charJSON)
        const charNormalized = normalizeCharacter(char)
        setCharacterToLocalStorage(charNormalized)
        saveCharacters([...myCharacters, getCurrentCharacterFromLocalStorage()])
    }
    function newCharacter() {
        newCharacterLS()
        saveCharacters([...myCharacters, getCurrentCharacterFromLocalStorage()])
    }

    function deleteCharacter() {
        const willDelete = confirm(`Are you sure you want to delete ${selectedSelectorName}?`)
        if (!willDelete) {
            return
        }
        const newMyCharacters = myCharacters.filter(char => char.id != currentCharacterId)
        saveCharacters(newMyCharacters)
        setCurrentCharacterId(null)
        clearCurrentCharacter()
        setActiveTabI(1)    // Name and Portrait
    }

    return (
        <div className="center-content">
            <div style={{ width: '100%', maxWidth: '700px'}}>
                <SelectorsByColumns
                    selectorData={selectorData}
                    nColumns={1}
                    selectedSelectorName={selectedSelectorName}
                    setSelectedSelectorName={(name) => {
                        const foundCharacter = myCharacters.find(char => char.names.characterName == name)
                        setCharacterToLocalStorage(foundCharacter)
                    }}
                />
            </div>
            <div className="center-content flex-responsive gap-half margin-top-1">
                <button disabled={cantMakeMore} onClick={newCharacter}>{cantMakeMore? <Icon name="Premium"/>: <></> } New Character</button>
                <button disabled={cantMakeMore} onClick={importCharacter}>{cantMakeMore? <Icon name="Premium"/>: <></> } Import From Clipboard</button>
            </div>
            <div className="center-content margin-top-half">
                <button style={{ backgroundColor: 'red' }} onClick={deleteCharacter}>Delete</button>
            </div>
        </div>
    )
}

function SaveCharacterButton() {

    let [myCharacters, saveMyCharacters] = useMyCharactersDB('CharacterCreationCalculator.SaveCharacterButton')

    async function saveCharacter() {
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
        const wasSaveSuccessful = await saveMyCharacters(newMyCharacters)
        if (wasSaveSuccessful) {
            showToast('Character saved successfully!', 'green')
        }
    }
    
    return (
        <div className="center-content margin-top-1">
            <button onClick={saveCharacter}>Save Character</button>
        </div>
    )
}

/* { Message: string, Button State: string, callback: function,  } */
function SpellPopup({ dialogState, setDialogState }) {

    const close = () => setDialogState(null)

    return <Dialog buttonText={dialogState?.['Button State'] ?? 'Ok'} isOpen={dialogState != null} onButtonClick={() => {
        dialogState.callback()
        close()
    }} setIsOpen={close}>
        { dialogState != null && (
            <div className="center-content">
                <p className="center-text">{ dialogState?.Message }</p>
            </div>
        ) } 
    </Dialog>
}

export default function CharacterCreationCalculator() {

    const [activeTabI, setActiveTabI, last] = useCCCTabs()
    const [names, setNames] = useSectionNamesState()
    const windowDimensions = useConstWindowDimensions()
    
    let [dialogState, setDialogState] = useState(null)

    const tabsLayout = 
        windowDimensions.width <= 455?
            TAB_LAYOUT_MOBILE:
        windowDimensions.width > 900?
            TAB_LAYOUT_LANDSCAPE:
        TAB_LAYOUT_PORTRAIT

    function openPopup(dialogState) {
        setDialogState(dialogState)
    }




    return (
        <Page id="Character-Builder" isCentered={true}>

            <SpellPopup dialogState={dialogState} setDialogState={setDialogState}/>
            {/* <AbilityStatDialog dialogState={dialogState} setDialogState={setDialogState}/> */}

            <LoginRequired location="CharacterCreationCalculator">
                <div className="center-content padding-top-4 margin-bottom-2">
                    <QGTitle1 text={"My Characters"} height="60"/>
                </div>

                <MyCharacters/>

                <div className="center-content margin-top-4 margin-bottom-2">
                    <QGTitle1 text={"Character"} height="60"/>
                </div>

                <Tabs layout={tabsLayout} activeTabI={activeTabI} setActiveTabI={setActiveTabI} tabComponents={[
                    <MyCharacter/>, <SectionNames onChange={newNamesState => setNames(newNamesState)}/>,
                    <SectionStats/>, <SectionRace openPopup={openPopup}/>, <SectionClass openPopup={openPopup}/>,
                    <SectionFeats/>, 
                    <SectionMagicFonts openPopup={openPopup}/>,
                    <SectionShop/>,
                    <div></div>,
                ]}/>

                <SaveCharacterButton/>
            </LoginRequired>
        </Page>
    )

}
