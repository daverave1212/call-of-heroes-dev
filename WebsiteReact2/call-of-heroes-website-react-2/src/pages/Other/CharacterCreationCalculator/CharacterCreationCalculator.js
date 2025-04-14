







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
import { calculateMaxHealth, calculateStat, getAllClasses, getAllRaces, getClassRepresentativeIconName, getSpellIconPathByName, splitArrayEvenly, useLocalStorageState } from "../../../utils";
import Selector from "../../../components/Selector/Selector";
import ManySpells from "../../../components/Spell/ManySpells";

import overallData from '../../../databases/OverallData.json'
import { connectFirestoreEmulator } from "firebase/firestore";
import PageH2 from "../../../components/PageH2/PageH2";
import Tabs from "../../../components/Tabs/Tabs";
import { CCClassPage, CCRacePage, ClassPage, RacePage } from "../../../components/InsertableTemplates/RaceClassComponents";
import { QGTitle1 } from "../../Tools/TitleGenerator";
import Icon from "../../../components/Icon";
import SectionClass, { useSectionClassName, useSectionClassSpecName, useSectionClassSpellNames } from "./SectionClass";
import SectionNames, { BASE_NAMES_STATE, useSectionNamesState } from "./SectionNames";
import SectionRace, { useSectionRaceName, useSectionRaceSpellNames } from "./SectionRace";
import SectionStats, { BASE_STATS, STAT_NAMES, StatValue, useSectionStatsState } from "./SectionStats";
import MyCharacter from "./MyCharacter";
import SectionSkills from "./SectionSkills";
import SectionLanguages from "./SectionLanguages";

export function classesRacesObjectToArrays(bigObj) {
    const classNames = Object.keys(bigObj)
    const classObjects = classNames.map(name => bigObj[name])
    const classObjRows = splitArrayEvenly(classObjects, 2)
    return classObjRows
}

export default function CharacterCreationCalculator() {

    const [activeTabI, setActiveTabI] = useLocalStorageState('CCCActiveTabI', 0)
    const [names, setNames] = useSectionNamesState()

    const tabNames = [
        'My Character',
        'Stats', 'Race', 'Class',
        'Languages', 'Skills', 'Shop',
        'Basic Abilities', 'Feats', 'Pets and Animals'
    ]

    return (
        <Page id="Character-Builder" isCentered={true}>
            <SectionNames onChange={newNamesState => setNames(newNamesState)}/>

            <Tabs isFirstTabLarge={true} activeTabI={activeTabI} setActiveTabI={setActiveTabI} tabNames={tabNames} tabComponents={[
                <MyCharacter/>,
                <SectionStats/>, <SectionRace/>, <SectionClass/>,
                <SectionLanguages/>, <SectionSkills/>, <div></div>,
                <div></div>, <div></div>, <div></div>,
            ]}/>


        </Page>
    )

}