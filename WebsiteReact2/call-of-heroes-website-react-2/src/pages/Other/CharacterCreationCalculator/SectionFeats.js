import { useLocalStorageState } from "../../../utils";
import Abilities from "../Abilities";
import Feats from "../Feats";
import { TAB_NAMES } from "./CharacterCreationCalculator";
import { toggleSpellMaybePopup, useSelectedAbilityNames } from "./CharacterData";
import { useCCCTabs } from "./SectionBasicAbilities";



export default function SectionFeats({ openPopup }) {

    let [selectedAbilitiesNames, setSelectedAbiltiesNames] = useSelectedAbilityNames()
    let [tabI, setTabI, tabName] = useCCCTabs()

    function selectSpell(spell, metadata) {
        toggleSpellMaybePopup(spell, metadata, selectedAbilitiesNames, setSelectedAbiltiesNames, openPopup)
    }

    return (
        (tabName == 'Feats' && (
            <Feats hasNoMargins={true} selectedSpellNames={selectedAbilitiesNames} setSelectedSpellNames={setSelectedAbiltiesNames} onSpellClick={selectSpell}/>
        ))
    )

}