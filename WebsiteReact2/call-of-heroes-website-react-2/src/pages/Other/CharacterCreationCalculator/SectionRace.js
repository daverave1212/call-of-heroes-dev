import { useState } from "react"
import PageH2 from "../../../components/PageH2/PageH2"
import TwoColumns from "../../../components/TwoColumns/TwoColumns"
import Column from "../../../components/TwoColumns/Column"
import { CCClassPage, CCRacePage } from "../../../components/InsertableTemplates/RaceClassComponents"
import { getAllClasses, getAllRaces, splitArrayEvenly } from "../../../utils"
import { classesRacesObjectToArrays } from "./CharacterCreationCalculator"
import Selector from "../../../components/Selector/Selector"

function RaceSelector({ raceObj, isSelected, onClick }) {
    return (
        <Selector
            name={raceObj.Race}
            src={`/Icons/Races/${raceObj.Race}.png`}
            isSelected={isSelected}
            onClick={onClick}
        />
    )
}

export default function SectionRace({ onSpellsSelected, onRaceNameSelected }) {

    const racesObj = getAllRaces()
    const raceObjectRows = classesRacesObjectToArrays(racesObj)

    const [chosenRace, setChosenRace] = useState(null)

    function onRaceSelectorClick(raceObj) {
        setChosenRace(raceObj)
        onRaceNameSelected(raceObj.Race)
    }

    return (
        <div>
            <PageH2>Race</PageH2>
            <TwoColumns>
                <Column>
                    { raceObjectRows[0].map(obj => (
                        <RaceSelector raceObj={obj} onClick={() => onRaceSelectorClick(obj)} isSelected={chosenRace?.Race == obj.Race}/>
                    )) }
                </Column>
                <Column>
                    { raceObjectRows[1].map(obj => (
                        <RaceSelector raceObj={obj} onClick={() => onRaceSelectorClick(obj)} isSelected={chosenRace?.Race == obj.Race}/>
                    )) }
                </Column>
            </TwoColumns>

            { chosenRace && (
                <CCRacePage theRace={chosenRace} onSpellsSelected={onSpellsSelected}/>
            )}
        </div>
    )
}