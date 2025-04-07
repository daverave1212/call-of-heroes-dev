







import { useEffect, useState } from "react";
import { Races, Classes } from '../Other/AllRacesAndClasses'
import SmallStat from "../../components/SmallStat/SmallStat";
import Page from "../../containers/Page/Page";
import TwoColumns from "../../components/TwoColumns/TwoColumns";
import Column from "../../components/TwoColumns/Column";
import Spoiler from "../../components/Spoiler/Spoiler";

import './CharacterCreationCalculator.css'
import { IconWithSpinner, SpellTopIconSide } from "../../components/Spell/Spell";
import { CoolButton } from "../../components/CoolButton/CoolButton";
import HeroButton from "../../components/HeroButton/HeroButton";
import { getAllClasses, getAllRaces, getClassRepresentativeIconName, getSpellIconPathByName, splitArrayEvenly } from "../../utils";
import Selector from "../../components/Selector/Selector";
import ManySpells from "../../components/Spell/ManySpells";

import overallData from './../../databases/OverallData.json'
import { connectFirestoreEmulator } from "firebase/firestore";
import PageH2 from "../../components/PageH2/PageH2";
import Tabs from "../../components/Tabs/Tabs";
import { CCRacePage, RacePage } from "../../components/InsertableTemplates/RaceClassComponents";
import { QGTitle1 } from "../Tools/TitleGenerator";

export function LabelWithInput({ labelText, placeholder }) {
    return (
        <div className="flex-column align-left">
            <label className="text-input" style={{marginBottom: '6px'}}>{ labelText }</label>
            <input/>
        </div>
    )
}

export default function CharacterCreationCalculator() {

    const racesObj = getAllRaces()
    const classesObj = getAllClasses()
    const raceObjectRows = classesRacesObjectToArrays(racesObj)
    const classObjectRows = classesRacesObjectToArrays(classesObj)
    

    const [chosenRace, setChosenRace] = useState(null)
    const [chosenClass, setChosenClass] = useState(null)
    
    function classesRacesObjectToArrays(bigObj) {
        const classNames = Object.keys(bigObj)
        const classObjects = classNames.map(name => bigObj[name])
        const classObjRows = splitArrayEvenly(classObjects, 2)
        console.log({ classNames, classObjects, classObjRows})
        return classObjRows
    }



    function NameAndIcon() {
        return (
            <div className="padding-top-4 flex-column align-center with-margined-children">
                <div className="center-content">
                    <div className="ccc-image-holder">
                        <IconWithSpinner src="/Icons/Spells/Skilled_in_Persuasion.png"/>
                    </div>
                </div>
                <div className="center-content">
                    <LabelWithInput labelText="Player Name"/>
                </div>
                <div className="center-content">
                    <LabelWithInput labelText="Character Name"/>
                </div>

                <br/>
                <div className="center-content">
                    <HeroButton style={{maxWidth: '400px'}}>Next</HeroButton>
                </div>
            </div>
        )
    }

    function ClassSpoilerSelector({ classObj }) {
        return (
            <Selector
                name={classObj.Class}
                iconName={getClassRepresentativeIconName(classObj)}
                isSelected={classObj.Class == chosenClass?.Class}
                onClick={() => setChosenClass(classObj)}
            />
        )
    }

    function RaceSelector({ raceObj }) {
        return (
            <Selector
                name={raceObj.Race}
                iconName={getClassRepresentativeIconName(raceObj)}
                isSelected={raceObj.Race == chosenRace?.Race}
                onClick={() => setChosenRace(raceObj)}
            />
        )
    }

    function StatInput({ name, value, onChange }) {
        return (
            <div className="stat-input">
                <input value={value} onChange={onChange}/>
                <div className="input-name">{ name }</div>
            </div>
        )
    }

    function StatsAndOther() {

        const baseStats = [-1, 0, 1, 2, 3]
        const statNames = ["Might", 'Dexterity', 'Intelligence', 'Sense', 'Charisma']
        
        const [stats, setStats] = useState(baseStats)

        function checkStandardStats() {
            const statsCopy = [...stats].sort()
            const baseStatsCopy = [...baseStats].sort()
            const isIncorrect = statsCopy.filter((stat, i) => baseStatsCopy[i] != stat).length > 0
            return !isIncorrect
        }

        return (
            <Page hasNoMargins={true} className>
                <div className="center-content flex" style={{gap: '2rem'}}>
                    <div className="stats-selector flex">
                        { baseStats.map((num, i) => (
                            <StatInput name={statNames[i]} value={stats[i]} onChange={evt => {
                                const statsCopy = [...stats]
                                statsCopy[i] = parseInt(evt.target.value)
                                setStats(statsCopy)
                            }}/>
                        )) }
                    </div>
                    <div className="center-content">
                        <button onClick={checkStandardStats}>Check</button>
                    </div>
                </div>
            </Page>
        )
    }

    function RaceSection() {
        return (
            <div>
                <PageH2>Race</PageH2>
                <TwoColumns>
                    <Column>
                        { raceObjectRows[0].map(obj => (
                            <RaceSelector raceObj={obj}/>
                        )) }
                    </Column>
                    <Column>
                        { raceObjectRows[1].map(obj => (
                            <RaceSelector raceObj={obj}/>
                        )) }
                    </Column>
                </TwoColumns>

                { chosenRace && (
                    <CCRacePage theRace={chosenRace}/>
                )}
            </div>
        )
    }
    function ClassSection() {
        return (
            <div>
                <PageH2>Class</PageH2>
                <TwoColumns>
                    <Column>
                        { classObjectRows[0].map(classObj => (
                            <ClassSpoilerSelector classObj={classObj}/>
                        )) }
                    </Column>
                    <Column>
                        { classObjectRows[1].map(classObj => (
                            <ClassSpoilerSelector classObj={classObj}/>
                        )) }
                    </Column>
                </TwoColumns>
            </div>
        )
    }
    function CharacterSection() {
        return (
            <div>
                <StatsAndOther/>
            </div>
        )
    }

    return (
        <Page id="Character-Builder" isCentered={true}>
            <NameAndIcon/>

            <Tabs tabNames={['Race', 'Class', 'Abilities', 'Character']} tabComponents={[
                <RaceSection/>,
                <ClassSection/>,
                <div></div>,
                <StatsAndOther/>
            ]}/>


        </Page>
    )

}