import { useLocalStorageState } from "../../../utils";
import Abilities from "../Abilities";
import Feats from "../Feats";
import { TAB_NAMES } from "./CharacterCreationCalculator";
import { useSelectedAbilityNames } from "./CharacterData";
import { useCCCTabs } from "./SectionBasicAbilities";



export default function SectionFeats() {

    let [selectedAbilitiesNames, setSelectedAbiltiesNames] = useSelectedAbilityNames()
    let [tabI, setTabI, tabName] = useCCCTabs()

    return (
        (tabName == 'Feats' && (
            <Feats hasNoMargins={true} selectedSpellNames={selectedAbilitiesNames} setSelectedSpellNames={setSelectedAbiltiesNames}/>
        ))
    )

}