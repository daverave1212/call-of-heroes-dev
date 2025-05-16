import { useState } from "react"
import PageH2 from "../../../components/PageH2/PageH2"
import TwoColumns from "../../../components/TwoColumns/TwoColumns"
import Column from "../../../components/TwoColumns/Column"
import { ClassPage, ClassPageV2 } from "../../../components/InsertableTemplates/RaceClassComponents"
import { addAbilityOrOpenPopup, getAllClasses, splitArrayEvenly, useLocalStorageState } from "../../../utils"
import { classesRacesObjectToArrays } from "./CharacterCreationCalculator"
import Selector from "../../../components/Selector/Selector"
import { SelectorsByColumns } from "../Abilities"
import { useSectionClassName, useSectionClassSpecName, useSectionClassSpellNames } from "./CharacterData"




export default function SectionClass({ openPopup }) {

    const classesObj = getAllClasses()

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

    function onAbilityClick(spell) {
        console.log({spell})
        addAbilityOrOpenPopup(spell, spellNames, setSpellNames, (spell) => {
            openPopup(spell, spellNames, setSpellNames)
        })
    }


    return (
        <div>
            <PageH2>Class</PageH2>

            <SelectorsByColumns nColumns={2} selectorData={selectorData} onSelectorClick={onClassClick} getSelectedSelectorName={getSelectedClassName}/>

            { className != null && (
                <ClassPage
                    hasNoMargins={true}
                    theClass={classesObj[className]}
                    selectedSpecName={specName} setSelectedSpecName={setSpecName}
                    selectedSpellNames={spellNames} setSelectedSpellNames={setSpellNames}
                    onSpellClick={onAbilityClick}
                />
            )}
        </div>
    )
}