







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
import { calculateStat, getAllClasses, getAllRaces, getClassRepresentativeIconName, getSpellIconPathByName, splitArrayEvenly } from "../../utils";
import Selector from "../../components/Selector/Selector";
import ManySpells from "../../components/Spell/ManySpells";

import overallData from './../../databases/OverallData.json'
import { connectFirestoreEmulator } from "firebase/firestore";
import PageH2 from "../../components/PageH2/PageH2";
import Tabs from "../../components/Tabs/Tabs";
import { CCClassPage, CCRacePage, ClassPage, RacePage } from "../../components/InsertableTemplates/RaceClassComponents";
import { QGTitle1 } from "../Tools/TitleGenerator";
import Icon from "../../components/Icon";

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
    const [selectedRaceAbilities, setSelectedRaceAbilities] = useState([])

    const [chosenClass, setChosenClass] = useState(null)
    const [selectedClassAbilities, setSelectedClassAbilities] = useState([])
    
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



    function RaceSelector({ raceObj }) {
        return (
            <Selector
                name={raceObj.Race}
                src={`/Icons/Races/${raceObj.Race}.png`}
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
        const [statsCorrectError, setStatsCorrectError] = useState(null)    /* { message: string } */

        function checkStandardStats(stats) {
            const statsCopy = [...stats].sort()
            const baseStatsCopy = [...baseStats].sort()
            const isIncorrect = statsCopy.filter((stat, i) => baseStatsCopy[i] != stat).length > 0
            
            if (isIncorrect) {
                setStatsCorrectError({
                    message: `Your stats might not respect the ${baseStats.join(', ')} numbers, in any order.`
                })
                return
            }

            setStatsCorrectError(null)
        }

        function StatExplainedDisplay({ i, name, description, iconName }) {
            return (
                <TwoColumns className='margin-top-half'>
                    <Column>
                        <div>
                            <SmallStat name={name} type="normal-large">
                                { calculateStat(statNames[i], stats[i]) }
                                &nbsp;<Icon name={iconName}/>
                            </SmallStat>    
                        </div>
                    </Column>
                    <Column>
                        <p style={{marginTop: '5px'}}>{ description }</p>
                    </Column>
                </TwoColumns>
            )
        }

        return (
            <Page hasNoMargins={true} className>
                <div className="center-content">
                    <QGTitle1 text="Stats" height={60}/>
                </div>
                <div className="center-content flex" style={{gap: '2rem'}}>
                    <div className="stats-selector">
                        { baseStats.map((num, i) => (
                            <StatInput name={statNames[i]} value={stats[i]} onChange={evt => {
                                const statsCopy = [...stats]
                                statsCopy[i] = parseInt(evt.target.value)
                                setStats(statsCopy)
                                checkStandardStats(statsCopy)
                            }}/>
                        )) }
                    </div>
                    <div style={{ width: '100%' }}>
                        <StatExplainedDisplay i={0} name="Extra Health" iconName="Health" description={
                            <div>Your <b>Max Health</b> = Race Health + 200% of Might</div>
                        }/>
                        <StatExplainedDisplay i={1} name="Move Speed" iconName="Speed" description={
                            <div>Your <b>Movement Speed</b> = 4 + 50% of Dexterity (<i>rounded up</i>)</div>
                        }/>
                        <StatExplainedDisplay i={2} name="Known Abilities" iconName="Spell" description={
                            <div>Your <b>Number of Known Basic Abilities</b> = Intelligence</div>
                        }/>
                        <StatExplainedDisplay i={3} name="Extra Regen" iconName="HealthRegen" description={
                            <div>Your <b>Health Regen</b> = Race Health Regen + Sense (<i>rounded up</i>)</div>
                        }/>
                        <StatExplainedDisplay i={4} name="Initiative" iconName="Replacement" description={
                            <div>
                                Your <b>Initiative</b> = 300% of Charisma
                                <div className="subtext margin-top-half">Initiative represents the order in which players and NPC's take turns.</div>
                            </div>
                        }/>
                    </div>
                    <div className="center-content" style={{width: '100%'}}>
                        {/* <button onClick={checkStandardStats}>Check</button> */}
                        { statsCorrectError != null && (
                            <div className="warning-toaster">{ statsCorrectError.message }</div>
                        ) }
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
                    <CCRacePage theRace={chosenRace} onSpellsSelected={spells => setSelectedRaceAbilities(spells)}/>
                )}
            </div>
        )
    }
    function ClassSection() {

        const [chosenClass, setChosenClass] = useState(null)

        function ClassSelector({ classObj }) {
            return (
                <Selector
                    name={classObj.Class}
                    src={`/Icons/Classes/${classObj.Class}.png`}
                    isSelected={classObj.Class == chosenClass?.Class}
                    onClick={() => setChosenClass(classObj)}
                />
            )
        }

        function onSpellsSelected(spells) {
            console.log(`Setting selected class abilities:`)
            console.log({spells})
            setSelectedClassAbilities(spells)
        }

        return (
            <div>
                <PageH2>Class</PageH2>
                <TwoColumns>
                    <Column>
                    TODO: I think nesting so much is causing bugs.
                        { classObjectRows[0].map(classObj => (
                            <ClassSelector classObj={classObj}/>
                        )) }
                    </Column>
                    <Column>
                        { classObjectRows[1].map(classObj => (
                            <ClassSelector classObj={classObj}/>
                        )) }
                    </Column>
                </TwoColumns>

                { chosenClass != null && (
                    <CCClassPage theClass={chosenClass} onSpellsSelected={onSpellsSelected}/>
                )}
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

            <Tabs tabNames={['Stats', 'Race', 'Class', 'Character']} tabComponents={[
                <StatsAndOther/>,
                <RaceSection/>,
                <ClassSection/>,
                <CharacterSection/>
            ]}/>


        </Page>
    )

}