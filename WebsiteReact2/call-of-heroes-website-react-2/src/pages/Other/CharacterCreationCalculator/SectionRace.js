import { useState } from "react"
import PageH2 from "../../../components/PageH2/PageH2"
import TwoColumns from "../../../components/TwoColumns/TwoColumns"
import Column from "../../../components/TwoColumns/Column"
import { CCClassPage, CCRacePage } from "../../../components/InsertableTemplates/RaceClassComponents"
import { getAllClasses, getAllRaces, splitArrayEvenly, useLocalStorageState } from "../../../utils"
import { classesRacesObjectToArrays } from "./CharacterCreationCalculator"
import Selector from "../../../components/Selector/Selector"
import { SelectorsByColumns } from "../Abilities"

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


export function useSectionRaceName() {
    return useLocalStorageState('SectinRaceName', null)
}
export function useSectionRaceSpellNames() {
    return useLocalStorageState('SectionRaceSpellNames', [])
}

export default function SectionRace({ /* onSpellsSelected, onRaceNameSelected */ }) {

    const RACES_OBJ = getAllRaces()
    const raceObjectRows = classesRacesObjectToArrays(RACES_OBJ)
    const selectorData = Object.keys(RACES_OBJ).map(raceName => ({
        name: raceName,
        src: `/Icons/Races/${raceName}.png`
    }))
    

    const [selectedRaceName, setSelectedRaceName] = useSectionRaceName()
    const [selectedSpellNames, setSelectedSpellNames] = useSectionRaceSpellNames()

    const getSelectedRaceName = () => selectedRaceName

    // function onRaceSelectorClick(raceObj) {
    //     setChosenRace(raceObj)
    //     onRaceNameSelected(raceObj.Race)
    //     setRaceState({
    //         raceName: raceObj.Race,
    //         spells: []
    //     })
    // }
    function onRaceSelectorClick(raceName) {
        setSelectedRaceName(raceName)
        setSelectedSpellNames([])
        console.log({raceName})
    }

    // function onSpellsSelected(spells) {
    //     const newRaceState = {...raceState, spells }
    //     setRaceState(newRaceState)
    // }

    return (
        <div>
            <PageH2>Race</PageH2>

            <SelectorsByColumns nColumns={2} selectorData={selectorData} onSelectorClick={onRaceSelectorClick} getSelectedSelectorName={getSelectedRaceName}/>

            {/* <TwoColumns>
                <Column>
                    { raceObjectRows[0].map(obj => (
                        <RaceSelector raceObj={obj} onClick={() => onRaceSelectorClick(obj)} isSelected={selectedRaceName == obj.Race}/>
                    )) }
                </Column>
                <Column>
                    { raceObjectRows[1].map(obj => (
                        <RaceSelector raceObj={obj} onClick={() => onRaceSelectorClick(obj)} isSelected={selectedRaceName == obj.Race}/>
                    )) }
                </Column>
            </TwoColumns> */}

            {/* { chosenRace && (
                <CCRacePage theRace={chosenRace} onSpellsSelected={onSpellsSelected}/>
            )} */}
            { selectedRaceName && (
                <CCRacePage theRace={RACES_OBJ[selectedRaceName]} selectedSpellNames={selectedSpellNames} setSelectedSpellNames={setSelectedSpellNames}/>
            )}
        </div>
    )
}