import { useState } from "react"
import PageH2 from "../../../components/PageH2/PageH2"
import TwoColumns from "../../../components/TwoColumns/TwoColumns"
import Column from "../../../components/TwoColumns/Column"
import { CCClassPage } from "../../../components/InsertableTemplates/RaceClassComponents"
import { getAllClasses, splitArrayEvenly, useLocalStorageState } from "../../../utils"
import { classesRacesObjectToArrays } from "./CharacterCreationCalculator"
import Selector from "../../../components/Selector/Selector"
import { SelectorsByColumns } from "../Abilities"
import { useSectionClassName, useSectionClassSpecName, useSectionClassSpellNames } from "./CharacterData"




export default function SectionClass({ onClassNameSelected, onSpecNameSelected, onSpellsSelected }) {

    const classesObj = getAllClasses()

    const [chosenClass, setChosenClass] = useState(null)

    const [className, setClassName] = useSectionClassName()
    const [specName, setSpecName] = useSectionClassSpecName()
    const [spellNames, setSpellNames] = useSectionClassSpellNames()

    const selectorData = Object.keys(classesObj).map(className => ({
        name: className,
        src: `/Icons/Classes/${className}.png`
    }))
    function getSelectedClassName() {
        return className
    }

    function onClassClick(className) {
        setClassName(className)
        setSpecName(null)
        setSpellNames([])
    }


    return (
        <div>
            <PageH2>Class</PageH2>

            <SelectorsByColumns nColumns={2} selectorData={selectorData} onSelectorClick={onClassClick} getSelectedSelectorName={getSelectedClassName}/>

            { className != null && (
                <CCClassPage
                    theClass={classesObj[className]}
                    selectedSpecName={specName} setSelectedSpecName={setSpecName}
                    selectedSpellNames={spellNames} setSelectedSpellNames={setSpellNames}
                />
            )}
        </div>
    )
}