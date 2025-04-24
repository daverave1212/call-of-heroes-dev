import { useEffect, useState } from "react"
import { calculateBaseCombatStats, calculateHealthRegen, calculateMaxHealth, calculateStat, getAllClasses, getallMyRaceAndClassSpells, getAllRaces, getAllSpellsByName, getAllStatBonusesFromSpellsAsObj, calculateBaseMaxManaByLevel, getExtrasFromSpells, getRaceHealth, isString, spellsFromObject, useLocalStorageState, hasClassMana, getAllWeaponsByName, getAllArmorsByName } from "../../../utils"
import ManySpells from "../../../components/Spell/ManySpells"
import PageH2 from "../../../components/PageH2/PageH2"
import TextArea from "../../../components/TextArea/TextArea"
import Icon from "../../../components/Icon"
import Input from "../../../components/Input/Input"
import { useArmors, useBasicAbilitiesNames, useConstAvailableAbilitySchools, useConstKnownAbilitiesObj, useConstNKnownAbilities, useCurrentMana, useDescription, useGold, useInventory, useLanguages, useLevel, useMaxMana, useQuickNotes, useSectionClassName, useSectionClassSpecName, useSectionClassSpellNames, useSectionNamesState, useSectionRaceName, useSectionRaceSpellNames, useSectionStatsState, useSkills, useWeapons } from "./CharacterData"
import { STAT_NAMES, StatValue } from "./SectionStats"
import SmallStat, { SmallStatTypes } from "../../../components/SmallStat/SmallStat"
import ManySmallStats from "../../../components/SmallStat/ManySmallStats"
import { askConfirmation } from "../../../services/MessageDisplayer"



function BigStatValue({ name, value }) {
    return (
        <div className="stat-input large">
            <div>{ value }</div>
            <div className="input-name input-name-styled">{ name }</div>
        </div>
    )
}



export function useConstAllRaceAndClassSpells() {
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
export function useConstBonusesFromSpells() {
    const allMyRaceAndClassSpells = useConstAllRaceAndClassSpells()

    const bonuses = getAllStatBonusesFromSpellsAsObj(allMyRaceAndClassSpells)

    return bonuses
}
export function useConstTotalStats() {
    const bonuses = useConstBonusesFromSpells()
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

    

    let [selectedRaceName] = useSectionRaceName()
    let [selectedClassName] = useSectionClassName()
    
    let [selectedSpecName] = useSectionClassSpecName()
    
    let [selectedBasicAbilitiesNames] = useBasicAbilitiesNames()
    
    let [description, setDescription] = useDescription()
    let [quickNotes, setQuickNotes] = useQuickNotes()
    let [inventory, setInventory] = useInventory()
    let [weaponNames, setWeaponNames] = useWeapons()
    let [armorNames, setArmorNames] = useArmors()
    let [gold, setGold] = useGold()
    
    let [selectedSkillNames] = useSkills()
    let [languages] = useLanguages()

    let [currentMana, setCurrentMana] = useCurrentMana()
    
    const totalStats = useConstTotalStats()
    const allMyRaceAndClassSpells = useConstAllRaceAndClassSpells()


    // Computed values
    const allDisplayedRaceAndClassSpells = allMyRaceAndClassSpells.filter(spell => spell.IsIgnored != true)
    const allMyWeapons = weaponNames.map(name => getAllWeaponsByName()[name])
    const allMyArmors = armorNames.map(name => getAllArmorsByName()[name])
    const selectedClassObj = selectedClassName == null? null: getAllClasses()[selectedClassName]
    const myBasicAbilities = selectedBasicAbilitiesNames.map(name => getAllSpellsByName()[name])
    const { maxHealth, healthRegen, movementSpeed, initiative } = calculateBaseCombatStats(selectedRaceName, selectedClassName, level, totalStats)
    const { extras, combatExtras } = getExtrasFromSpells(allMyRaceAndClassSpells)
    const maxMana = selectedClassName == null? 1: calculateBaseMaxManaByLevel(level, selectedClassName)

    // Other
    let setInputGold    // Set in the Input property

    // Subcomponents
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

    function Spellcasting() {

        const knownAbilitySchools = useConstAvailableAbilitySchools()
        const nKnownAbilities = useConstNKnownAbilities()

        return (
            <div className="flex-row margin-top-1 gap-3q">
                <div className="flex-column flex-1 gap-3q">
                    <SmallStat type={SmallStatTypes.VERTICAL} name="Number of Known Basic Abilities">{nKnownAbilities} Basic {nKnownAbilities == 1? 'Ability': 'Abilities'}</SmallStat>
                    { selectedClassName != null && (
                        <div>
                            { hasClassMana(selectedClassName) && (<ManaBar/>) }
                            { selectedClassObj.Spellcasting?.Mana?.Regain != null && (
                                <p>{ selectedClassObj.Spellcasting?.Mana?.Regain }</p>
                            ) }
                        </div>
                    ) }
                    { selectedClassName != null && hasClassMana(selectedClassName) && (
                        <ManaBar/>
                    ) }
                </div>
                <div className="flex-column flex-1">
                    <ManySmallStats name="Available Ability Schools" style={{minWidth: '300px', flexGrow: 1}} color={'var(--dark-color)'} texts={knownAbilitySchools}/>
                </div>
            </div>
        )
    }

    function ManaBar() {
        function onIncrease() {
            const newMana = currentMana + 1
            if (newMana > maxMana + 5) {
                return
            }
            setCurrentMana(newMana)
        }
        function onDecrease() {
            const newMana = currentMana - 1
            if (newMana < -4) {
                return
            }
            setCurrentMana(newMana)
        }

        const percentageFilled = currentMana > maxMana? 100: currentMana < 0? 0: ((currentMana / maxMana) * 100)
        const labelText = currentMana > maxMana? 'Mana (extra)': currentMana < 0? 'Mana (?)' : 'Mana'
        const barHeight = '2.5rem'
        const innerHeight = `calc(${barHeight} - 0px)`
        const smallStatValueStyle = {
            padding: '0px',
            paddingTop: '3px',
            height: innerHeight,
        }
        const buttonStyle = {
            height: '100%',
            width: innerHeight,
            backgroundColor: 'var(--dark-color)'
        }

        return (
            <div className="small-stat-container wrapper">
                <div className="small-stat small-stat--column" style={{borderColor: 'white'}}>
                    <div style={{backgroundColor: 'var(--dark-color)', borderRadius: '3px'}} className="small-stat__name">{labelText}</div>
                    <div className="small-stat__value flex-row gap-quarter" style={smallStatValueStyle}>
                        <button style={buttonStyle} onClick={onDecrease}>-</button>
                        <div className="mana-bar flex-grow">
                            <div className="filling" style={{width: percentageFilled + '%'}}></div>
                            <div className="number">{currentMana} / {maxMana}</div>
                        </div>
                        <button style={buttonStyle} onClick={onIncrease}>+</button>
                    </div>
                </div>
            </div>
        )
    }
    function CombatItem({name, type=''}) {
        type = type.toLowerCase()

        function onClick() {
            const bool = askConfirmation('Remove item?')
            if (bool) {
                setArmorNames(armorNames.filter(armorName => armorName != name))
            }
        }

        return (
            <div className="extra bold flex-column left-content ccc-combat-item relative" onClick={onClick}>
                <div className="minus">
                    Remove
                </div>
                <div>
                    <Icon name={type == 'armor'? 'Defense': 'Damage'}/> {name}
                </div>
                <div style={{marginTop: '0.25rem', fontWeight: 'normal', fontSize: '0.8em', color: 'rgb(0, 180, 0)'}}>{getAllArmorsByName()[name].EffectGreen}</div>
            </div>
        )
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
                    { selectedSkillNames.map(text => <div className="extra"><Icon name="CharacterSetupSub"/>{ text }</div>) }
                </div>
                <div className="flex-column" style={{flex: 1, gap: '5px'}}>
                { extras.map(text => <div className="extra italic"><Icon name="Specializations"/>{ text }</div>) }
                    { languages.map(text => <div className="extra italic"><Icon name="Specializations"/>You speak { text }</div>) }
                </div>
            </div>

            <div className="flex-row margin-top-1 gap-3q">
                <div className="inventory-wrapper wrapper relative">
                    <TextArea className={`inventory`} initialValue={inventory} reactsToInitialValue={true} onChange={(newVal) => setInventory(newVal)}/>
                    <div className="gold-wrapper wrapper">
                        <Input className="gold" value={gold} setSet={func => setInputGold = func} onChange={newVal => {
                            const newValFloat = parseFloat(newVal)
                            console.log({newValFloat})
                            if (isNaN(newValFloat) || (isString(newValFloat) && newValFloat.length == 0)) {
                                setGold(gold)
                                console.log(`Resetting gold input to ${gold}`)
                                setInputGold(gold)   // Reset to what it was
                            } else {
                                setGold(newValFloat)
                            }
                            
                        }}/>
                        <div className="input-description" style={{left: '-1px', bottom: '5px'}}>Gold</div>
                    </div>
                    <div className="input-description">Inventory</div>
                </div>
                <div className="flex-column" style={{flex: 1, gap: '5px'}}>
                    { combatExtras.map(text => <div className="extra"><Icon name="Damage"/>{ text }</div>) }
                    { armorNames.map(text => <CombatItem name={text} type="armor"/>) }
                </div>
            </div>

            <ManySpells className="margin-top-1" spells={allMyWeapons} areItems={true} shouldIgnoreAlignment={true}/>

            <Spellcasting/>
            
            <PageH2 className="margin-top-2">Race and Class Abilities</PageH2>
            <ManySpells spells={allDisplayedRaceAndClassSpells} shouldIgnoreAlignment={true}/>

            <PageH2 className="margin-top-1">Basic Abilities</PageH2>
            <ManySpells spells={myBasicAbilities} shouldIgnoreAlignment={true}/>
        </div>
    )
}