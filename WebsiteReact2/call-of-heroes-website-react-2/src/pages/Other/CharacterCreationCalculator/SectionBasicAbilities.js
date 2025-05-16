import { useLocation } from "react-router-dom";
import { getPageHashFromLocation, addAbilityOrOpenPopup, useLocalStorageState } from "../../../utils";
import Abilities from "../Abilities";
import { tabNames } from "./CharacterCreationCalculator";
import { useBasicAbilitiesNames, useConstAvailableAbilitySchools, useConstKnownAbilitiesObj } from "./CharacterData";
import ManySmallStats from "../../../components/SmallStat/ManySmallStats";



export function useCCCTabs() {
    const location = useLocation()
    const hash = getPageHashFromLocation(location)
    const defaultValue = hash.length == 0? 0: tabNames.indexOf(hash)
    let [activeTabI, setActiveTabI] = useLocalStorageState('CCCActiveTabI', defaultValue == -1? 0: defaultValue)
    const tabName = tabNames[activeTabI]
    return [activeTabI, setActiveTabI, tabName]
}

export default function SectionBasicAbilities({ openPopup }) {

    let { 2: tabName } = useCCCTabs()

    if (tabName != 'Basic Abilities') {
        return <div></div>
    }

    let [selectedAbilitiesNames, setSelectedAbiltiesNames] = useBasicAbilitiesNames()
    const { maxKnownAbilities, nKnownAbilities } = useConstKnownAbilitiesObj()
    const knownAbilitySchools = useConstAvailableAbilitySchools()
    
    const isIncorrect = nKnownAbilities > maxKnownAbilities || nKnownAbilities < 0
    const isNotFinished = nKnownAbilities != maxKnownAbilities

    function onAbilityClick(spell) {
        addAbilityOrOpenPopup(spell, selectedAbilitiesNames, setSelectedAbiltiesNames, (spell) => {
            openPopup(spell, selectedAbilitiesNames, setSelectedAbiltiesNames)
        })
    }

    return (
        <div>
            <Abilities hasNoMargins={true} selectedSpellNames={selectedAbilitiesNames} onSpellClick={onAbilityClick}>
                
                <div className="flex-column center-content gap-half">
                    <p>You can pick a total of up to {maxKnownAbilities} Abilities from any of the following Ability Schools:</p>
                    <ManySmallStats name="Available Schools" style={{minWidth: '300px', flexGrow: 1}} color={'blue'} texts={knownAbilitySchools}/>
                </div>
                
                { isIncorrect? (
                    <div className="warning-toaster">
                        Warning: you picked {nKnownAbilities} Abilities. You can have up to {maxKnownAbilities} (2 + Intelligence).
                    </div>
                ) : isNotFinished? (
                    <div className="warning-toaster">
                        You can pick {maxKnownAbilities - nKnownAbilities} more Abilities (you have {nKnownAbilities} / {maxKnownAbilities}).
                    </div>
                ): null}
            </Abilities>
        </div>
    )

}