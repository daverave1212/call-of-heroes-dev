import { useLocalStorageState } from "../../../utils";
import Abilities from "../Abilities";
import { tabNames } from "./CharacterCreationCalculator";

export function useBasicAbilitiesNames() {
    return useLocalStorageState('SectionBasicAbilitiesNames', [])
}

export function useCCCTabs() {
    let [activeTabI, setActiveTabI] = useLocalStorageState('CCCActiveTabI', 0)
    const tabName = tabNames[activeTabI]
    return [activeTabI, setActiveTabI, tabName]
}

export default function SectionBasicAbilities() {

    let [selectedAbilitiesNames, setSelectedAbiltiesNames] = useBasicAbilitiesNames()
    let [tabI, setTabI, tabName] = useCCCTabs()

    return (
        (tabName == 'Basic Abilities' && (
            <Abilities hasNoMargins={true} selectedSpellNames={selectedAbilitiesNames} setSelectedSpellNames={setSelectedAbiltiesNames}/>
        ))
    )

}