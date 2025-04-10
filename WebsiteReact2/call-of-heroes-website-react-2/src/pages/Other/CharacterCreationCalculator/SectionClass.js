import { useState } from "react"
import PageH2 from "../../../components/PageH2/PageH2"
import TwoColumns from "../../../components/TwoColumns/TwoColumns"
import Column from "../../../components/TwoColumns/Column"
import { CCClassPage } from "../../../components/InsertableTemplates/RaceClassComponents"
import { getAllClasses, splitArrayEvenly } from "../../../utils"
import { classesRacesObjectToArrays } from "./CharacterCreationCalculator"
import Selector from "../../../components/Selector/Selector"



export default function SectionClass({ onClassNameSelected, onSpecNameSelected, onSpellsSelected }) {

    const classesObj = getAllClasses()
    const classObjectRows = classesRacesObjectToArrays(classesObj)

    const [chosenClass, setChosenClass] = useState(null)

    function onClassClick(classObj) {
        setChosenClass(classObj)
        onClassNameSelected(classObj.Class)
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

            { chosenClass != null && (
                <CCClassPage theClass={chosenClass} onSpecSelected={onSpecNameSelected} onSpellsSelected={onSpellsSelected}/>
            )}
        </div>
    )
}