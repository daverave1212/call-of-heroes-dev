import { useLocalStorageState } from "../../../utils";
import Abilities from "../Abilities";
import Feats from "../Feats";
import { tabNames } from "./CharacterCreationCalculator";
import { useFeats } from "./CharacterData";
import { useCCCTabs } from "./SectionBasicAbilities";



export default function SectionFeats() {

    let [selectedAbilitiesNames, setSelectedAbiltiesNames] = useFeats()
    let [tabI, setTabI, tabName] = useCCCTabs()

    return (
        (tabName == 'Feats' && (
            <Feats hasNoMargins={true} selectedSpellNames={selectedAbilitiesNames} setSelectedSpellNames={setSelectedAbiltiesNames}/>
        ))
    )

}