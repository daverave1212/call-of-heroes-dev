import { useState } from "react"
import PageH2 from "../../../components/PageH2/PageH2"
import TwoColumns from "../../../components/TwoColumns/TwoColumns"
import Column from "../../../components/TwoColumns/Column"
import { ClassPage, ClassPageV2 } from "../../../components/InsertableTemplates/RaceClassComponents"
import { addAbilityOrOpenPopup, getAllClasses, getAllSpellsByName, groupBy, isSpellMinorTalent, isSpellUtilityTalent, isTalentTierNameMinor, isTalentTierNameUtility, splitArrayEvenly, useLocalStorageState } from "../../../utils"
import { classesRacesObjectToArrays } from "./CharacterCreationCalculator"
import Selector from "../../../components/Selector/Selector"
import { SelectorsByColumns } from "../Abilities"
import { toggleSpellMaybePopup, useAllSpellsMetadata, useConstTotalAttributes, useLevel, useSectionClassName, useSectionClassSpecName, useSectionClassSpellNames, useSectionRaceName } from "./CharacterData"
import { KNOWN_ABILITIES } from "../../../services/game-lib/stat-calculations"


const allSpells = getAllSpellsByName()

export default function SectionClass({ openPopup }) {

    const classesObj = getAllClasses()

    const [className, setClassName] = useSectionClassName()
    const [specName, setSpecName] = useSectionClassSpecName()
    const [spellNames, setSpellNames] = useSectionClassSpellNames()
    const [spellsMetadata, setSpellsMetadata] = useAllSpellsMetadata()

    const attributes = useConstTotalAttributes()

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

    function selectSpell(spell, metadata) {

        function checkForIssues() {
            const selectedClassSpells = spellNames.map(name => allSpells[name])
            const spellsByParentKey = groupBy(selectedClassSpells, spell => spell.ParentKey)
            
            let foundIssue = null
            
            const isKeystone = spell.ParentKey.includes('Keystone')
            if (isKeystone) {
                const foundKeystoneAtThatLevel = selectedClassSpells.find(s => s.ParentKey == spell.ParentKey)
                if (foundKeystoneAtThatLevel) {
                    foundIssue = `You already have a ${spell.ParentKey} (${foundKeystoneAtThatLevel.Name}). Are you sure you want to also select this Spell?`
                }
            }
            
            const isMinorOrUtility = isSpellMinorTalent(spell) || isSpellUtilityTalent(spell)
            if (isMinorOrUtility) {
                const knownExtraMinorTalents = attributes[KNOWN_ABILITIES] ?? 0
                const talentTiers = Object.keys(spellsByParentKey).filter(key => isTalentTierNameMinor(key) || isTalentTierNameUtility(key))
                const extraPickedMinorsByTier = talentTiers.map(key => spellsByParentKey[key]?.length - 1)
                const totalExtraPickedMinors = extraPickedMinorsByTier.reduce((soFar, x) => soFar + x, 0)
                console.log({totalExtraPickedMinors})
                if (totalExtraPickedMinors > knownExtraMinorTalents) {
                    foundIssue = `You are about to go over the limit (${knownExtraMinorTalents}) of extra known Minor and Utility Talents. Are you sure you want to also select this Spell?`
                }
            }

            return foundIssue
        }
        


        const toggleSpellMaybePopupInternal = () => toggleSpellMaybePopup(spell, metadata, spellNames, setSpellNames, openPopup)

        const willRemove = spellNames.includes(spell.Name)
        
        if (willRemove) {
            toggleSpellMaybePopupInternal()
            return
        }

        const foundIssue = checkForIssues()
        if (foundIssue == null) {
            toggleSpellMaybePopupInternal()
            return
        }

        openPopup({ Message: foundIssue, callback: () => {
            toggleSpellMaybePopupInternal()
        }})

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
                    onSpellClick={selectSpell}
                    spellsMetadata={spellsMetadata}
                />
            )}
        </div>
    )
}