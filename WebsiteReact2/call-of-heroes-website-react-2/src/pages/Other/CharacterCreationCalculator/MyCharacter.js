import { useEffect, useState } from "react"
import { calculateBaseCombatStats, calculateHealthRegen, calculateMaxHealth, calculateStat, getAllClasses, getallMyRaceAndClassSpells, getAllRaces, getAllSpellsByName, getAllStatBonusesFromSpellsAsObj, getExtrasFromSpells, getRaceHealth, spellsFromObject, useLocalStorageState } from "../../../utils"
import { useSectionClassName, useSectionClassSpecName, useSectionClassSpellNames } from "./SectionClass"
import { useSectionNamesState } from "./SectionNames"
import { useSectionRaceName, useSectionRaceSpellNames } from "./SectionRace"
import { STAT_NAMES, StatValue, useExtraStats, useLevel, useSectionStatsState } from "./SectionStats"
import ManySpells from "../../../components/Spell/ManySpells"
import PageH2 from "../../../components/PageH2/PageH2"
import TextArea from "../../../components/TextArea/TextArea"
import { useSkills } from "./SectionSkills"
import { useLanguages } from "./SectionLanguages"
import { useBasicAbilitiesNames } from "./SectionBasicAbilities"


function BigStatValue({ name, value }) {
    return (
        <div className="stat-input large">
            <div>{ value }</div>
            <div className="input-name input-name-styled">{ name }</div>
        </div>
    )
}

const ALL_SPELLS_BY_NAME = getAllSpellsByName()
const ALL_RACES = getAllRaces()
const ALL_CLASSES = getAllClasses()

function useAllRaceAndClassSpells() {
    let [selectedRaceName] = useSectionRaceName()
    let [selectedRaceSpellNames] = useSectionRaceSpellNames()
    let [selectedClassName] = useSectionClassName()
    let [selectedSpecName] = useSectionClassSpecName()
    let [selectedClassSpellNames] = useSectionClassSpellNames()

    const allMyRaceAndClassSpells = getallMyRaceAndClassSpells({
        raceName: selectedRaceName,
        selectedRaceSpellNames,
        className: selectedClassName,
        specName: selectedSpecName,
        selectedClassSpellNames
    })

    return allMyRaceAndClassSpells

}

export function useBonusesFromSpells() {
    const allMyRaceAndClassSpells = useAllRaceAndClassSpells()

    const bonuses = getAllStatBonusesFromSpellsAsObj(allMyRaceAndClassSpells)

    return bonuses
}

export function useTotalStats() {
    const bonuses = useBonusesFromSpells()
    const [stats] = useSectionStatsState()
    return [
        stats[0] + (bonuses.Might ?? 0),
        stats[1] + (bonuses.Dexterity ?? 0),
        stats[2] + (bonuses.Intelligence ?? 0),
        stats[3] + (bonuses.Sense ?? 0),
        stats[4] + (bonuses.Charisma ?? 0)
    ]
}

export default function MyCharacter() {


    // LocalStorage states
    let [names] = useSectionNamesState()
    let [level] = useLevel()
    let [selectedStats] = useSectionStatsState()
    let totalStats = useTotalStats()
    let [extraStatsFromSpells, setExtraStatsFromSpells] = useExtraStats()
    
    let [selectedRaceName] = useSectionRaceName()
    let [selectedRaceSpellNames] = useSectionRaceSpellNames()

    let [selectedClassName] = useSectionClassName()
    let [selectedSpecName] = useSectionClassSpecName()

    let [selectedBasicAbilitiesNames] = useBasicAbilitiesNames()

    let [description, setDescription] = useLocalStorageState('characterDescription', 'Enter your character description here')
    let [quickNotes, setQuickNotes] = useLocalStorageState('quickNotes', 'Combat notes...')
    
    let allMyRaceAndClassSpells = useAllRaceAndClassSpells()

    let bonuses = useBonusesFromSpells()
    let [selectedSkillNames] = useSkills()
    let [languages] = useLanguages()

    // Computed values
    const myBasicAbilities = selectedBasicAbilitiesNames.map(name => getAllSpellsByName()[name])
    const allDisplayedRaceAndClassSpells = allMyRaceAndClassSpells.filter(spell => spell.IsIgnored != true)
    const { maxHealth, healthRegen, movementSpeed, initiative } = calculateBaseCombatStats(selectedRaceName, selectedClassName, level, totalStats)
    const { extras, combatExtras } = getExtrasFromSpells(allMyRaceAndClassSpells)

    function Names() {
        return <div className="flex flex-column">
            <h1 className="center-text full-width">{ names.characterName }</h1>
            <h2 className="center-text full-width">Level {level} { selectedRaceName } { selectedClassName } { selectedSpecName != null && `(${selectedSpecName})`}</h2>
        </div>
    }
    function StatsColumn() {
        return <div className="flex flex-column" style={{gap: 'var(--stats-gap)'}}>
            { STAT_NAMES.map((n, i) => (
                <StatValue name={n.substring(0, 3).toUpperCase()} value={totalStats[i]}/>
            )) }
        </div>
    }
    function BaseStatsAndCombatColumn({ className }) {
        return <div className={`flex flex-column ${className}`} style={{gap: 'var(--stats-gap)'}}>
            <div className="flex-column" style={{gap: 'var(--stats-gap)'}}>    
                <div className="flex" style={{gap: 'var(--stats-gap)'}}>
                    <BigStatValue name="Health" value={maxHealth}/>
                    <BigStatValue name="Health Regen" value={healthRegen}/>
                </div>
                <div className="flex" style={{gap: 'var(--stats-gap)'}}>
                    <BigStatValue name="Movement Speed" value={movementSpeed}/>
                    <BigStatValue name="Initiative" value={initiative}/>
                </div>
            </div>
            <div className="wrapper description-wrapper combat-notes-wrapper">
                <TextArea className="wrapped-child" initialValue={quickNotes} onChange={text => setQuickNotes(text)}/>
            </div>
        </div>
    }
    function PortraitAndDescriptionColumnLS() {
        return <div className={`flex-column landscape-only`} style={{gap: 'var(--stats-gap)'}}>
            <div className="wrapper portrait-wrapper">
                <img className="wrapped-child cover" src={names.src}/>
            </div>
            <div className="wrapper description-wrapper">
                <TextArea className="wrapped-child" initialValue={description} onChange={text => setDescription(text)}/>
            </div>
        </div>
    }
    function PortraitAndDescriptionRowP() {
        return <div className={`flex-row portrait-only`} style={{gap: 'var(--stats-gap)'}}>
            <div className="wrapper portrait-wrapper">
                <img className="wrapped-child cover" src={names.src}/>
            </div>
            <div className="wrapper description-wrapper">
                <TextArea className="wrapped-child" initialValue={description} onChange={text => setDescription(text)}/>
            </div>
        </div>
    }

    return (
        <div id="My-Character">

            <Names/>

            <PortraitAndDescriptionRowP/>
            <div className="flex flex-row margin-top-1" style={{gap: 'var(--stats-gap)'}}>
                <StatsColumn/>
                <BaseStatsAndCombatColumn/>
                <PortraitAndDescriptionColumnLS/>
            </div>

            <div className="flex flex-row margin-top-1 gap-3q">
                <div className="flex-column" style={{flex: 1, gap: '5px'}}>
                    { selectedSkillNames.map(text => <div className="extra">{ text }</div>) }
                </div>
                <div className="flex-column" style={{flex: 1, gap: '5px'}}>
                    { extras.map(text => <div className="extra italic">{ text }</div>) }
                    { languages.map(text => <div className="extra italic">You speak { text }</div>) }
                </div>
                <div className="flex-column" style={{flex: 1, gap: '5px'}}>
                    { combatExtras.map(text => <div className="extra">{ text }</div>) }
                </div>
                
            </div>
            
            <PageH2 className="margin-top-2">Race and Class Abilities</PageH2>
            <ManySpells spells={allDisplayedRaceAndClassSpells} shouldIgnoreAlignment={true}/>

            <PageH2 className="margin-top-1">Basic Abilities</PageH2>
            <ManySpells spells={myBasicAbilities} shouldIgnoreAlignment={true}/>
        </div>
    )
}