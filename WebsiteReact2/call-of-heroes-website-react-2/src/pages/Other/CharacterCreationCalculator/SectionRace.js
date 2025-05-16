import { useState } from "react"
import PageH2 from "../../../components/PageH2/PageH2"
import TwoColumns from "../../../components/TwoColumns/TwoColumns"
import Column from "../../../components/TwoColumns/Column"
import { ClassPageV2, CCRacePage } from "../../../components/InsertableTemplates/RaceClassComponents"
import { getAllClasses, getAllRaces, splitArrayEvenly, useLocalStorageState } from "../../../utils"
import { classesRacesObjectToArrays } from "./CharacterCreationCalculator"
import Selector from "../../../components/Selector/Selector"
import { SelectorsByColumns } from "../Abilities"
import { useSectionRaceName, useSectionRaceSpellNames } from "./CharacterData"



export default function SectionRace() {

    const RACES_OBJ = getAllRaces()
    const selectorData = Object.keys(RACES_OBJ).map(raceName => ({
        name: raceName,
        src: `/Icons/Races/${raceName}.png`
    }))
    

    const [selectedRaceName, setSelectedRaceName] = useSectionRaceName()
    const [selectedSpellNames, setSelectedSpellNames] = useSectionRaceSpellNames()

    const getSelectedRaceName = () => selectedRaceName

    function onRaceSelectorClick(raceName) {
        setSelectedRaceName(raceName)
        setSelectedSpellNames([])
        console.log({raceName})
    }

    return (
        <div>
            <PageH2>Race</PageH2>

            <SelectorsByColumns nColumns={2} selectorData={selectorData} onSelectorClick={onRaceSelectorClick} getSelectedSelectorName={getSelectedRaceName}/>

            { selectedRaceName && (
                <CCRacePage theRace={RACES_OBJ[selectedRaceName]} selectedSpellNames={selectedSpellNames} setSelectedSpellNames={setSelectedSpellNames}/>
            )}
        </div>
    )
}