







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
import { calculateStat, getAllClasses, getAllRaces, getClassRepresentativeIconName, getSpellIconPathByName, splitArrayEvenly } from "../../../utils";
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
import SectionNames from "./SectionNames";
import SectionRace from "./SectionRace";
import SectionStats from "./SectionStats";

export function classesRacesObjectToArrays(bigObj) {
    const classNames = Object.keys(bigObj)
    const classObjects = classNames.map(name => bigObj[name])
    const classObjRows = splitArrayEvenly(classObjects, 2)
    return classObjRows
}

export default function CharacterCreationCalculator() {

    const [selectedStats, setSelectedStats] = useState(null)
    const [selectedClassName, setSelectedClassName] = useState(null)
    const [selectedSpecName, setSelectedSpecName] = useState(null)
    const [selectedClassSpells, setSelectedClassSpells] = useState([])
    const [selectedRaceName, setSelectedRaceName] = useState(null)
    const [selectedRaceSpells, setSelectedRaceSpells] = useState([])


    function CharacterSection() {
        return (
            <div>
                <div>Stats: {selectedStats}</div>
                <div>Class: {selectedClassName}</div>
                <div>Spec: {selectedSpecName}</div>
                <div>Race: {selectedRaceName}</div>
                <div>Spells: {[...selectedClassSpells, ...selectedRaceSpells].map(s => s.Name).join(', ')}</div>
            </div>
        )
    }

    return (
        <Page id="Character-Builder" isCentered={true}>
            <SectionNames/>

            <Tabs tabNames={['Stats', 'Race', 'Class', 'Character']} tabComponents={[
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