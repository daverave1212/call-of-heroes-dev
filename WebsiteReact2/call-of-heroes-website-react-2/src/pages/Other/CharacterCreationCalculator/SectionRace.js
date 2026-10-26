import { useState } from "react"
import PageH2 from "../../../components/PageH2/PageH2"
import TwoColumns from "../../../components/TwoColumns/TwoColumns"
import Column from "../../../components/TwoColumns/Column"
import { ClassPageV2, CCRacePage } from "../../../components/InsertableTemplates/RaceClassComponents"
import Selector from "../../../components/Selector/Selector"
import { SelectorsByColumns } from "../Abilities"
import { getSelectedAbilityNames, toggleSpellMaybePopup, useSectionRaceName, useSelectedAbilityNames } from "./CharacterData"
import { getAllRaceNames, raceExists } from "../../../services/content-providers/RaceProvider"
import { showToast } from "../../../services/dom/toaster"
import { FEATURES, useFeatureItem } from "../../../services/content-providers/ContentProvider"



export default function SectionRace({ openPopup }) {

    const selectorData = getAllRaceNames().map(raceName => ({
        name: raceName,
        src: `/Icons/Races/${raceName}.png`
    }))
    

    const [selectedRaceName, setSelectedRaceName] = useSectionRaceName()
    const [selectedSpellNames, setSelectedSpellNames] = useSelectedAbilityNames()

    const getSelectedRaceName = () => selectedRaceName
    
    function onRaceSelectorClick(raceName) {
        // TODO: Check somehow if you still have spells from the race and show a toast!
        setSelectedRaceName(raceName)
    }

    function selectSpell(spell, metadata) {
        toggleSpellMaybePopup(spell, metadata, selectedSpellNames, setSelectedSpellNames, openPopup)
    }

    return (
        <div>
            <PageH2>Race</PageH2>

            <SelectorsByColumns nColumns={2} selectorData={selectorData} onSelectorClick={onRaceSelectorClick} getSelectedSelectorName={getSelectedRaceName}/>

            { selectedRaceName != null && raceExists(selectedRaceName) && (
                <CCRacePage
                    raceName={selectedRaceName}
                    selectedSpellNames={selectedSpellNames} 
                    setSelectedSpellNames={setSelectedSpellNames}
                    onSpellClick={selectSpell}
                />
            )}
        </div>
    )
}