import { useLocalStorageState } from "../../../utils";
import Abilities from "../Abilities";
import Feats from "../Feats";
import { tabNames } from "./CharacterCreationCalculator";
import { useCCCTabs } from "./SectionBasicAbilities";

export function useFeats() {
    return useLocalStorageState('SectionFeatsNames', [])
}

export default function SectionFeats() {

    let [selectedAbilitiesNames, setSelectedAbiltiesNames] = useFeats()
    let [tabI, setTabI, tabName] = useCCCTabs()

    return (
        (tabName == 'Feats' && (
            <Feats selectedSpellNames={selectedAbilitiesNames} setSelectedSpellNames={setSelectedAbiltiesNames}/>
        ))
    )

}