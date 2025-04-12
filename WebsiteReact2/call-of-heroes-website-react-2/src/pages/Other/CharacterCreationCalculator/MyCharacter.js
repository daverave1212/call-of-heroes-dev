import { useState } from "react"
import { calculateBaseCombatStats, calculateHealthRegen, calculateMaxHealth, getAllClasses, getAllRaces, getAllSpellsByName, spellsFromObject, useLocalStorageState } from "../../../utils"
import { useSectionClassName, useSectionClassSpecName, useSectionClassSpellNames } from "./SectionClass"
import { useSectionNamesState } from "./SectionNames"
import { useSectionRaceName, useSectionRaceSpellNames } from "./SectionRace"
import { STAT_NAMES, StatValue, useSectionStatsState } from "./SectionStats"
import ManySpells from "../../../components/Spell/ManySpells"


function BigStatValue({ name, value }) {
    return (
        <div className="stat-input large">
            <div>{ value }</div>
            <div className="input-name">{ name }</div>
        </div>
    )
}

const ALL_SPELLS_BY_NAME = getAllSpellsByName()
const ALL_RACES = getAllRaces()
const ALL_CLASSES = getAllClasses()

export default function MyCharacter() {

    const [names, setNames] = useSectionNamesState()
    const [level, setLevel] = useState(3)
    const [selectedStats, setSelectedStats] = useSectionStatsState()
    const [selectedRaceName, setSelectedRaceName] = useSectionRaceName()
    const [selectedRaceSpellNames, setSelectedRaceSpellNames] = useSectionRaceSpellNames()
    const [selectedClassName, setSelectedClassName] = useSectionClassName(null)
    const [selectedSpecName, setSelectedSpecName] = useSectionClassSpecName(null)
    const [selectedClassSpellNames, setSelectedClassSpellNames] = useSectionClassSpellNames([])

    const [description, setDescription] = useLocalStorageState('characterDescription', 'Enter your character description here')
    const [quickNotes, setQuickNotes] = useLocalStorageState('quickNotes', 'Combat notes...')

    const { maxHealth, healthRegen, movementSpeed, initiative } = calculateBaseCombatStats(selectedRaceName, selectedClassName, level, selectedStats)
    
    const myRace = ALL_RACES[selectedRaceName]
    const myRaceBaseSpells = myRace == null? []: spellsFromObject(myRace['Starting Abilities'])
    const myRaceFeats = selectedRaceSpellNames.map(name => ALL_SPELLS_BY_NAME[name])
    
    const myClass = ALL_CLASSES[selectedClassName]
    const myClassBaseSpells = myClass == null? []: spellsFromObject(myClass['Starting Abilities'])
    const mySpec = myClass == null || selectedSpecName == null? null: myClass.Specs[selectedSpecName]
    const mySpecBaseSpells = mySpec == null? []: spellsFromObject(mySpec['Starting Abilities'])
    const myClassSpells = selectedClassSpellNames.map(name => ALL_SPELLS_BY_NAME[name])

    console.log({selectedRaceSpellNames, selectedClassSpellNames, ALL_SPELLS_BY_NAME})
    console.log({myRaceBaseSpells, myRaceFeats, myClassBaseSpells, mySpecBaseSpells, myClassSpells})

    const allMySpells = [
        ...myRaceBaseSpells,
        ...myRaceFeats,
        ...myClassBaseSpells,
        ...mySpecBaseSpells,
        ...myClassSpells
    ]

    return (
        <div id="My-Character">
            <div className="flex flex-column">
                <h1 className="center-text full-width">{ names.characterName }</h1>
                <h2 className="center-text full-width">Level 1 { selectedRaceName } { selectedClassName } ({ selectedSpecName })</h2>
            </div>

            <div className="flex flex-row" style={{gap: 'var(--stats-gap)'}}>
                <div className="flex flex-column" style={{gap: 'var(--stats-gap-half)'}}>
                    { STAT_NAMES.map((n, i) => (
                        <StatValue name={n} value={selectedStats[i]}/>
                    )) }
                </div>
                <div className="flex flex-column" style={{gap: 'var(--stats-gap-half)'}}>
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
                    <div className="wrapper  description-wrapper">
                        <textarea className="wrapped-child" value={quickNotes} onChange={evt => setQuickNotes(evt.target.value)}/>
                    </div>
                </div>
                <div className="flex-column" style={{gap: 'var(--stats-gap-half)'}}>
                    <div className="wrapper portrait-wrapper">
                        <img className="wrapped-child" src={names.src}/>
                    </div>
                    <div className="wrapper description-wrapper">
                        <textarea className="wrapped-child" value={description} onChange={evt => setDescription(evt.target.value)}/>
                    </div>
                </div>
            </div>
            
            <div className="margin-top-2"></div>
            <ManySpells spells={allMySpells} shouldIgnoreAlignment={true}/>
        </div>
    )
}