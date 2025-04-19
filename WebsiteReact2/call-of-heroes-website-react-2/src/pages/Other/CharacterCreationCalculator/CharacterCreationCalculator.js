







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
import { CCClassPage, CCRacePage, ClassPage, RacePage } from "../../../components/InsertableTemplates/RaceClassComponents";
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
import { NO_CHARACTER_ID, getCurrentCharacterFromLocalStorage, setCurrentCharacterId, useMyCharactersDB, useSectionNamesState } from "./CharacterData";

export const tabNames = [
    'My Character', 'Name and Portrait',
    'Stats and Level', 'Race', 'Class',
    'Languages', 'Skills', 'Shop',
    'Basic Abilities', 'Feats', 'Pets and Animals'
]
export const tabLayout = [
    ['My Character', 'Name and Portrait'],
    ['Stats and Level', 'Race', 'Class'],
    ['Languages', 'Skills', 'Shop'],
    ['Basic Abilities', 'Feats', 'Pets and Animals']
]


export function classesRacesObjectToArrays(bigObj) {
    const classNames = Object.keys(bigObj)
    const classObjects = classNames.map(name => bigObj[name])
    const classObjRows = splitArrayEvenly(classObjects, 2)
    return classObjRows
}

function SaveCharacterButton() {

    console.log('RERENDER SAVECHARACTERBUTTON')
    let [myCharacters, saveMyCharacters] = useMyCharactersDB('CharacterCreationCalculator.SaveCharacterButton')

    function saveCharacter() {
        const currentCharacter = getCurrentCharacterFromLocalStorage()
        const existingCharacterIndex = myCharacters.findIndex(char => char.id == currentCharacter.id)
        const willAddNewCharacter = currentCharacter.id == NO_CHARACTER_ID || existingCharacterIndex == -1
        const newMyCharacters = [...myCharacters]
        if (willAddNewCharacter) {
            if (currentCharacter.id == NO_CHARACTER_ID) {
                setCurrentCharacterId(generateUniqueId())
            }
            newMyCharacters.push(currentCharacter)
        } else {
            newMyCharacters[existingCharacterIndex] = currentCharacter
        }
        saveMyCharacters(newMyCharacters)
        alert('Character saved!')
    }
    
    return (
        <div className="center-content margin-top-1">
            <button onClick={saveCharacter}>Save Character</button>
        </div>
    )
}


export default function CharacterCreationCalculator() {

    const [activeTabI, setActiveTabI, last] = useCCCTabs()
    const [names, setNames] = useSectionNamesState()



    return (
        <Page id="Character-Builder" isCentered={true}>

            <div className="center-content">
                <QGTitle1 text={"Character"} height="60"/>
            </div>

            <Tabs layout={tabLayout} activeTabI={activeTabI} setActiveTabI={setActiveTabI} tabComponents={[
                <MyCharacter/>, <SectionNames onChange={newNamesState => setNames(newNamesState)}/>,
                <SectionStats/>, <SectionRace/>, <SectionClass/>,
                <SectionLanguages/>, <SectionSkills/>, <SectionShop/>,
                <SectionBasicAbilities/>, <SectionFeats/>, <div></div>,
            ]}/>

            <SaveCharacterButton/>
            

        </Page>
    )

}