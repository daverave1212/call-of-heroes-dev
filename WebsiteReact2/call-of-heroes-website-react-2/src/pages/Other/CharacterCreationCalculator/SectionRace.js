import { useState } from "react"
import PageH2 from "../../../components/PageH2/PageH2"
import TwoColumns from "../../../components/TwoColumns/TwoColumns"
import Column from "../../../components/TwoColumns/Column"
import { ClassPageV2, CCRacePage } from "../../../components/InsertableTemplates/RaceClassComponents"
import { getAllClasses, getAllRaces, splitArrayEvenly, useLocalStorageState } from "../../../utils"
import { classesRacesObjectToArrays } from "./CharacterCreationCalculator"
import Selector from "../../../components/Selector/Selector"
import { SelectorsByColumns } from "../Abilities"
import { toggleSpellMaybePopup, useSectionRaceName, useSectionRaceSpellNames } from "./CharacterData"



export default function SectionRace({ openPopup }) {

    const RACES_OBJ = getAllRaces()
    const selectorData = Object.keys(RACES_OBJ).map(raceName => ({
        name: raceName,
        src: `/Icons/Races/${raceName}.png`
    }))
    

    const [selectedRaceName, setSelectedRaceName] = useSectionRaceName()
    const [selectedSpellNames, setSelectedSpellNames] = useSectionRaceSpellNames()

    const getSelectedRaceName = () => selectedRaceName
    
    window.getAllRaces = getAllRaces
    window.getSelectedRaceName = getSelectedRaceName
    window.selectedRaceName = selectedRaceName

    function onRaceSelectorClick(raceName) {
        setSelectedRaceName(raceName)
        setSelectedSpellNames([])
        console.log({raceName})
    }

    function selectSpell(spell, metadata) {
        toggleSpellMaybePopup(spell, metadata, selectedSpellNames, setSelectedSpellNames, openPopup)
    }

    return (
        <div>
            <PageH2>Race</PageH2>

            <SelectorsByColumns nColumns={2} selectorData={selectorData} onSelectorClick={onRaceSelectorClick} getSelectedSelectorName={getSelectedRaceName}/>

            { selectedRaceName != null && selectedRaceName in RACES_OBJ && (
                <CCRacePage
                    theRace={RACES_OBJ[selectedRaceName]}
                    selectedSpellNames={selectedSpellNames} 
                    setSelectedSpellNames={setSelectedSpellNames}
                    onSpellClick={selectSpell}
                />
            )}
        </div>
    )
}