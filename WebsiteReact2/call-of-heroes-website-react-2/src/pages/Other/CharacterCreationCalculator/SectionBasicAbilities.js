import { useLocation } from "react-router-dom";
import { getPageHashFromLocation, useLocalStorageState } from "../../../utils";
import Abilities from "../Abilities";
import { tabNames } from "./CharacterCreationCalculator";
import { useBasicAbilitiesNames } from "./CharacterData";



export function useCCCTabs() {
    const location = useLocation()
    const hash = getPageHashFromLocation(location)
    const defaultValue = hash.length == 0? 0: tabNames.indexOf(hash)
    let [activeTabI, setActiveTabI] = useLocalStorageState('CCCActiveTabI', defaultValue == -1? 0: defaultValue)
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