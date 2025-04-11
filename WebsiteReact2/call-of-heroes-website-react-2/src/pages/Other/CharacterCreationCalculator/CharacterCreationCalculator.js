







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
import { calculateMaxHealth, calculateStat, getAllClasses, getAllRaces, getClassRepresentativeIconName, getSpellIconPathByName, splitArrayEvenly } from "../../../utils";
import Selector from "../../../components/Selector/Selector";
import ManySpells from "../../../components/Spell/ManySpells";

import overallData from '../../../databases/OverallData.json'
import { connectFirestoreEmulator } from "firebase/firestore";
import PageH2 from "../../../components/PageH2/PageH2";
import Tabs from "../../../components/Tabs/Tabs";
import { CCClassPage, CCRacePage, ClassPage, RacePage } from "../../../components/InsertableTemplates/RaceClassComponents";
import { QGTitle1 } from "../../Tools/TitleGenerator";
import Icon from "../../../components/Icon";
import SectionClass from "./SectionClass";
import SectionNames, { BASE_NAMES_STATE } from "./SectionNames";
import SectionRace from "./SectionRace";
import SectionStats, { BASE_STATS, STAT_NAMES, StatValue } from "./SectionStats";

export function classesRacesObjectToArrays(bigObj) {
    const classNames = Object.keys(bigObj)
    const classObjects = classNames.map(name => bigObj[name])
    const classObjRows = splitArrayEvenly(classObjects, 2)
    return classObjRows
}

const allRacesObj = getAllRaces()
const allClassesObj = getAllClasses()

export default function CharacterCreationCalculator() {

    const [activeTabI, setActiveTabI] = useState(0)

    const [level, setLevel] = useState(3)
    const [names, setNames] = useState(BASE_NAMES_STATE)
    const [selectedStats, setSelectedStats] = useState(BASE_STATS)
    const [selectedClassName, setSelectedClassName] = useState(null)
    const [selectedSpecName, setSelectedSpecName] = useState(null)
    const [selectedClassSpells, setSelectedClassSpells] = useState([])
    const [selectedRaceName, setSelectedRaceName] = useState(null)
    const [selectedRaceSpells, setSelectedRaceSpells] = useState([])


    function CharacterSection() {

        return (
            <div>
                <div className="flex flex-column">
                    <h1 className="center-text full-width">{ names.characterName }</h1>
                    <h2 className="center-text full-width">Level 1 { selectedRaceName } { selectedClassName } ({ selectedSpecName })</h2>
                </div>

                <div className="flex flex-row">
                    <div>
                        { STAT_NAMES.map((n, i) => (
                            <StatValue name={n} value={selectedStats[i]}/>
                        )) }
                    </div>
                    <div className="flex flex-column">
                        <div className="flex">
                            <StatValue name="Health" value={calculateMaxHealth(selectedRaceName, selectedClassName, selectedStats[0], level)}/>
                            
                        </div>
                    </div>
                </div>
                <div>Class: {selectedClassName}</div>
                <div>Spec: {selectedSpecName}</div>
                <div>Race: {selectedRaceName}</div>
                <div>Spells: {[...selectedClassSpells, ...selectedRaceSpells].map(s => s.Name).join(', ')}</div>
            </div>
        )
    }

    return (
        <Page id="Character-Builder" isCentered={true}>
            <SectionNames onChange={newNamesState => setNames(newNamesState)}/>

            <Tabs activeTabI={activeTabI} setActiveTabI={setActiveTabI} tabNames={['Stats', 'Race', 'Class', 'Character']} tabComponents={[
                <SectionStats onStatsChanged={stats => {
                    setSelectedStats(stats)
                }}/>,
                <SectionRace
                    onSpellsSelected={spells => {
                        setSelectedRaceSpells(spells)
                    }}
                    onRaceNameSelected={raceName => {
                        setSelectedRaceName(raceName)
                    }}
                />,
                <SectionClass
                    onClassNameSelected={className => {
                        setSelectedClassName(className)
                        console.log(className)
                    }}
                    onSpecNameSelected={specName => {
                        setSelectedSpecName(specName)
                        console.log(specName)
                    }}
                    onSpellsSelected={spells => {
                        setSelectedClassSpells(spells)
                        console.log(spells)
                    }}
                />,
                <CharacterSection/>
            ]}/>


        </Page>
    )

}