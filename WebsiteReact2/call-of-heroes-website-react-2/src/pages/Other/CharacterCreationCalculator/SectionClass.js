import { useState } from "react"
import PageH2 from "../../../components/PageH2/PageH2"
import TwoColumns from "../../../components/TwoColumns/TwoColumns"
import Column from "../../../components/TwoColumns/Column"
import { CCClassPage } from "../../../components/InsertableTemplates/RaceClassComponents"
import { getAllClasses, splitArrayEvenly, useLocalStorageState } from "../../../utils"
import { classesRacesObjectToArrays } from "./CharacterCreationCalculator"
import Selector from "../../../components/Selector/Selector"


export function useSectionClassName() { return useLocalStorageState('SectionClassName', null) }
export function useSectionClassSpecName() { return useLocalStorageState('SectionClassSpecName', null) }
export function useSectionClassSpellNames() { return useLocalStorageState('SectionClassSpellNames', [])}


export default function SectionClass({ onClassNameSelected, onSpecNameSelected, onSpellsSelected }) {

    const classesObj = getAllClasses()
    const classObjectRows = classesRacesObjectToArrays(classesObj)

    const [chosenClass, setChosenClass] = useState(null)

    const [className, setClassName] = useSectionClassName()
    const [specName, setSpecName] = useSectionClassSpecName()
    const [spellNames, setSpellNames] = useSectionClassSpellNames()

    function onClassClick(classObj) {
        // setChosenClass(classObj)
        // onClassNameSelected(classObj.Class)
        setClassName(classObj.Class)
        setSpecName(null)
        setSpellNames([])
    }

    function ClassSelector({ classObj }) {
        return (
            <Selector
                name={classObj.Class}
                src={`/Icons/Classes/${classObj.Class}.png`}
                isSelected={classObj.Class == chosenClass?.Class}
                onClick={() => onClassClick(classObj)}
            />
        )
    }

    return (
        <div>
            <PageH2>Class</PageH2>
            <TwoColumns>
                <Column>
                    { classObjectRows[0].map(classObj => (
                        <ClassSelector classObj={classObj}/>
                    )) }
                </Column>
                <Column>
                    { classObjectRows[1].map(classObj => (
                        <ClassSelector classObj={classObj}/>
                    )) }
                </Column>
            </TwoColumns>

            {/* { chosenClass != null && (
                <CCClassPage theClass={chosenClass} onSpecSelected={onSpecNameSelected} onSpellsSelected={onSpellsSelected}/>
            )} */}
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