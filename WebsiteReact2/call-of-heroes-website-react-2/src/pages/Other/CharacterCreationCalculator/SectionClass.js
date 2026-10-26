import { useState } from "react"
import PageH2 from "../../../components/PageH2/PageH2"
import TwoColumns from "../../../components/TwoColumns/TwoColumns"
import Column from "../../../components/TwoColumns/Column"
import { ClassPage, ClassPageV2 } from "../../../components/InsertableTemplates/RaceClassComponents"
import { addAbilityOrOpenPopup, groupBy, isSpellMinorTalent, isSpellUtilityTalent, isTalentTierNameMinor, isTalentTierNameUtility, splitArrayEvenly, useLocalStorageState } from "../../../utils"
import { classesRacesObjectToArrays } from "./CharacterCreationCalculator"
import Selector from "../../../components/Selector/Selector"
import { SelectorsByColumns } from "../Abilities"
import { toggleSpellMaybePopup, useAllSpellsMetadata, useConstTotalAttributes, useLevel, useSectionClassName, useSectionClassSpecName, useSectionRaceName, useSelectedAbilityNames, useSelectedFontName } from "./CharacterData"
import { KNOWN_ABILITIES } from "../../../services/game-lib/stat-calculations"
import Icon from "../../../components/Icon"
import { getAllBaseClassNames, getAllPremiumClassNames } from "../../../services/content-providers/ClassProvider"

export function selectSpellWithPopup({spell, metadata, spellNames, setSpellNames, openPopup, attributes={}}) {  // WARNING: attributes is never given

    function checkForIssues() {
        // TODO: Check issues?
        let foundIssue = null
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

    const [className, setClassName] = useSectionClassName()
    const [spellNames, setSpellNames] = useSelectedAbilityNames()
    const [spellsMetadata, setSpellsMetadata] = useAllSpellsMetadata()

    const classesBaseData = getAllBaseClassNames().map(className => ({
        name: className,
        displayName: className,
        lock: 'none',
        src: `/Icons/Classes/${className}.png`
    }))
    const classesPremiumData = getAllPremiumClassNames().map(className => ({
        name: className,
        displayName: <span>{ className } <Icon name="Premium" style={{marginTop: `calc(var(--selector-fs) * 0.15)`}}/></span>,
        lock: 'premium',
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