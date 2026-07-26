import { useState } from "react"
import PageH2 from "../../../components/PageH2/PageH2"
import TwoColumns from "../../../components/TwoColumns/TwoColumns"
import Column from "../../../components/TwoColumns/Column"
import { ClassPageV2, CCRacePage } from "../../../components/InsertableTemplates/RaceClassComponents"
import { getAllSpellsByName, splitArrayEvenly, useLocalStorageState } from "../../../utils"
import { classesRacesObjectToArrays } from "./CharacterCreationCalculator"
import Selector from "../../../components/Selector/Selector"
import { SelectorsByColumns } from "../Abilities"
import { getSelectedAbilityNames, toggleSpellMaybePopup, useSectionRaceName, useSelectedAbilityNames } from "./CharacterData"
import { getAllRaceNames } from "../../../services/content-providers/race-provider"



export default function SectionRace({ openPopup }) {

    const RACES_OBJ = getAllRaceNames()
    const selectorData = Object.keys(RACES_OBJ).map(raceName => ({
        name: raceName,
        src: `/Icons/Races/${raceName}.png`
    }))
    

    const [selectedRaceName, setSelectedRaceName] = useSectionRaceName()
    const [selectedSpellNames, setSelectedSpellNames] = useSelectedAbilityNames()

    const getSelectedRaceName = () => selectedRaceName
    
    function onRaceSelectorClick(raceName) {
        const mySpells = getSelectedAbilityNames().map(name => getAllSpellsByName()[name])
        const spellIsFromMyRace = s => s?.Origin?.includes(selectedRaceName)
        const hasTalentsFromThisRace = mySpells.some(spellIsFromMyRace)
        console.log({ mySpells, hasTalentsFromThisRace })
        if (hasTalentsFromThisRace) {
            const wantsToResetRaceTalents = confirm("You are changing your Race! Reset the selected Race Talents?")
            if (wantsToResetRaceTalents) {
                const mySpellsNoRaceTalents = mySpells.filter(s => !spellIsFromMyRace(s))
                setSelectedSpellNames(mySpellsNoRaceTalents.map(s => s.Name))
            }
        }
        setSelectedRaceName(raceName)
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