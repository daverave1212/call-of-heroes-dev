import { useState } from "react"
import PageH2 from "../../../components/PageH2/PageH2"
import TwoColumns from "../../../components/TwoColumns/TwoColumns"
import Column from "../../../components/TwoColumns/Column"
import { ClassPage, ClassPageV2 } from "../../../components/InsertableTemplates/RaceClassComponents"
import { addAbilityOrOpenPopup, getAllClasses, getAllSpellsByName, getBaseClasses, getPremiumClasses, groupBy, isSpellMinorTalent, isSpellUtilityTalent, isTalentTierNameMinor, isTalentTierNameUtility, splitArrayEvenly, useLocalStorageState } from "../../../utils"
import { classesRacesObjectToArrays } from "./CharacterCreationCalculator"
import Selector from "../../../components/Selector/Selector"
import { SelectorsByColumns } from "../Abilities"
import { toggleSpellMaybePopup, useAllSpellsMetadata, useConstTotalAttributes, useLevel, useSectionClassName, useSectionClassSpecName, useSectionRaceName, useSelectedAbilityNames, useSelectedFontName } from "./CharacterData"
import { KNOWN_ABILITIES } from "../../../services/game-lib/stat-calculations"
import { ClassesBase, ClassesLegacy, ClassesPremium } from "../../../services/content-providers/AllRacesAndClasses"
import Icon from "../../../components/Icon"


const allSpells = getAllSpellsByName()

export function selectSpellWithPopup({spell, metadata, spellNames, setSpellNames, openPopup, attributes={}}) {  // WARNING: attributes is never given

    function checkForIssues() {
        const selectedClassSpells = spellNames.map(name => allSpells[name])
        // const spellsByParentKey = groupBy(selectedClassSpells, spell => spell.ParentKey)
        
        let foundIssue = null

        function checkIfKeystone() {
            const isKeystone = spell.ParentKey?.includes('Keystone')
            if (isKeystone) {
                const foundKeystoneAtThatLevel = selectedClassSpells.find(s => s.ParentKey == spell.ParentKey)
                if (foundKeystoneAtThatLevel) {
                    foundIssue = `You already have a ${spell.ParentKey} (${foundKeystoneAtThatLevel.Name}). Are you sure you want to also select this Spell?`
                }
            }
        }
        
        // checkIfKeystone()
        
        // const isMinorOrUtility = isSpellMinorTalent(spell) || isSpellUtilityTalent(spell)
        // if (isMinorOrUtility) {
        //     const knownExtraMinorTalents = attributes[KNOWN_ABILITIES] ?? 0
        //     const talentTiers = Object.keys(spellsByParentKey).filter(key => isTalentTierNameMinor(key) || isTalentTierNameUtility(key))
        //     const extraPickedMinorsByTier = talentTiers.map(key => spellsByParentKey[key]?.length - 1)
        //     const totalExtraPickedMinors = extraPickedMinorsByTier.reduce((soFar, x) => soFar + x, 0)
        //     console.log({knownExtraMinorTalents, talentTiers, extraPickedMinorsByTier, totalExtraPickedMinors})
        //     if (totalExtraPickedMinors > knownExtraMinorTalents) {
        //         foundIssue = `You are about to go over the limit (${knownExtraMinorTalents}) of extra known Minor and Utility Talents. Are you sure you want to also select this Spell?`
        //     }
        // }

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

export default function SectionClass({ openPopup }) {

    const classesObj = getAllClasses()

    const [className, setClassName] = useSectionClassName()
    const [spellNames, setSpellNames] = useSelectedAbilityNames()
    const [spellsMetadata, setSpellsMetadata] = useAllSpellsMetadata()

    console.log({className, classesObj})

    const classesBaseData = Object.keys(ClassesBase).map(className => ({
        name: className,
        displayName: className,
        lock: 'none',
        src: `/Icons/Classes/${className}.png`
    }))
    const classesPremiumData = Object.keys(ClassesPremium).map(className => ({
        name: className,
        displayName: <span>{ className } <Icon name="Premium" style={{marginTop: `calc(var(--selector-fs) * 0.15)`}}/></span>,
        lock: 'premium',
        src: `/Icons/Classes/${className}.png`
    }))
    const classesLegacyData = Object.keys(ClassesLegacy).map(className => ({
        name: className,
        displayName: <span>{ className } <span className="gray">(Old)</span></span>,
        lock: 'none',
        src: `/Icons/Classes/${className}.png`
    }))



    const selectorData = [...classesBaseData, ...classesPremiumData]
    function getSelectedClassName() {
        return className
    }

    function onClassClick(className) {
        setClassName(className)
    }


    return (
        <div>
            <PageH2>Class</PageH2>

            <SelectorsByColumns nColumns={2} selectorData={selectorData} onSelectorClick={onClassClick} getSelectedSelectorName={getSelectedClassName}/>

            { className != null && (
                <ClassPage
                    hasNoMargins={true}
                    className={className}
                    useSelectedSpecNameHook={useSectionClassSpecName}
                    useSelectedFontNameHook={useSelectedFontName}
                    selectedSpellNames={spellNames}
                    onSpellClick={(spell, metadata) => selectSpellWithPopup({
                        spell,
                        metadata,
                        spellNames,
                        setSpellNames,
                        openPopup
                    })}
                    spellsMetadata={spellsMetadata}
                />
            )}
        </div>
    )
}