import { useEffect, useState } from "react"
import { getAllClasses, getAlMyRaceAndClassSpells, getAllRaces, getAllSpellsByName, getExtrasFromSpells, isString, spellsFromObject, useLocalStorageState, hasClassMana, getAllWeaponsByName, getAllArmorsByName, addObjects, getSpellReplacementName, reverseObject, addManyObjects, getSpellIconPathByName, addArrays } from "../../../utils"
import ManySpells from "../../../components/Spell/ManySpells"
import PageH2 from "../../../components/PageH2/PageH2"
import TextArea from "../../../components/TextArea/TextArea"
import Icon from "../../../components/Icon"
import Input from "../../../components/Input/Input"
import { getChoiceAbilitiesObjects, useAllSpellsMetadata, useArmors, useBasicAbilitiesNames, useConstAllBasicAbilities, useConstAllMyAbilities, useConstAllRaceAndClassSpells, useConstAllSkillBonuses, useConstAllSkillNames, useConstAvailableAbilitySchools, useConstKnownAbilitiesObj, useConstNKnownAbilities, useCurrentMana, useDescription, useGold, useInventory, useLanguages, useLevel, useManualBonuses, useMaxMana, useQuickNotes, useSectionClassName, useSectionClassSpecName, useSectionClassSpellNames, useSectionNamesState, useSectionRaceName, useSectionRaceSpellNames, useSectionStatsState, useSkills, useWeapons } from "./CharacterData"
import { StatValue } from "./SectionStats"
import SmallStat, { SmallStatTypes } from "../../../components/SmallStat/SmallStat"
import ManySmallStats from "../../../components/SmallStat/ManySmallStats"
import { askConfirmation } from "../../../services/MessageDisplayer"
import Dialog from "../../../components/Dialog/Dialog"
import ChangeStatDialog from "./ChangeStatDialog"
import Spoiler from "../../../components/Spoiler/Spoiler"
import Selector from "../../../components/Selector/Selector"
import { calculateAllAtributes, calculateBaseMaxManaByLevel, getAllStatBonusesYMLAsObjFromSpellsArray, getStatsArrayFromObject, HEALTH_REGEN, INITIATIVE, MAX_HEALTH, MOVEMENT_SPEED, STAT_NAMES } from "../../../services/game-lib/stat-calculations"
import PageH3 from "../../../components/PageH3/PageH3"



function BigStatValue({ name, value, onClick}) {
    return (
        <div className="stat-input large pointer">
            <div onClick={onClick}>{ value }</div>
            <div className="input-name input-name-styled">{ name }</div>
        </div>
    )
}




export function useConstBonusesYMLFromSpellsAndItems() {
    let [armorNames] = useArmors()
    const allMyArmors = armorNames.map(name => getAllArmorsByName()[name])
    const allMyRaceAndClassSpells = useConstAllRaceAndClassSpells()
    const everything = [...allMyArmors, allMyRaceAndClassSpells]
    
    const { bonuses, sources } = getAllStatBonusesYMLAsObjFromSpellsArray(everything)
    console.log({allMyArmors, allMyRaceAndClassSpells, bonuses, sources})

    return { bonuses, sources }
}
export function useConstAllBonuses() {
    const { bonuses, sources } = useConstBonusesYMLFromSpellsAndItems()
    const [manualBonuses] = useManualBonuses()
    // const choiceBonusesObj = getChoiceAbilitiesObjects().map(obj => ({ [obj.statName]: obj.bonus }))
    // const choiceBonuses = addManyObjects(choiceBonusesObj)
    const allBonuses = addManyObjects([bonuses, manualBonuses])
    console.log(`Adding the following`)
    console.log({ bonuses, manualBonuses, allBonuses})
    return { bonuses: allBonuses, sources: sources }
}
export function useConstTotalStats() {
    const { bonuses } = useConstBonusesYMLFromSpellsAndItems()
    const [manualBonuses, _] = useManualBonuses()
    const [baseStats] = useSectionStatsState()
    
    const manualBonusesStatsArray = getStatsArrayFromObject(manualBonuses)
    const autoBonusesStatsArray = getStatsArrayFromObject(bonuses)
    console.log({ manualBonuses, manualBonusesStatsArray, baseStats, autoBonusesStatsArray, getStatsArrayFromObject })
    return addArrays(baseStats, manualBonusesStatsArray, autoBonusesStatsArray)
}
export function useConstAllAbilitiesAndItemsExtras() {
    const allMyRaceAndClassSpells = useConstAllRaceAndClassSpells()
    const [weaponNames] = useWeapons()
    const [armorNames] = useArmors()

    const allMyWeapons = weaponNames.map(name => getAllWeaponsByName()[name])
    const allMyArmors = armorNames.map(name => getAllArmorsByName()[name])

    return getExtrasFromSpells([...allMyWeapons, ...allMyArmors, ...allMyRaceAndClassSpells])
}
export function useConstManuallyAddedExtrasFromAbilities() {
    const allMyRaceAndClassSpells = useConstAllRaceAndClassSpells()
    const spellsWithManualExtras = allMyRaceAndClassSpells.filter(s => s['Manual Extras'] != null)
    const manualExtrasArrays = spellsWithManualExtras.map(s => s['Manual Extras'].map(me => ({ extra: me, source: s.Name})))
    const allManualExtras = manualExtrasArrays.flat()
    return allManualExtras
}

export default function MyCharacter() {

    // Local states
    let [statNameToChange, setStatNameToChange] = useState(null)
    let [areMinorSpellsHidden, setAreMinorSpellsHidden] = useState(true)

    // LocalStorage states
    let [names] = useSectionNamesState()
    let [level] = useLevel()

    let [selectedRaceName] = useSectionRaceName()
    let [selectedClassName] = useSectionClassName()
    
    let [selectedSpecName] = useSectionClassSpecName()
    
    let [spellsMetadata, setSpellsMetadata] = useAllSpellsMetadata()
    let [selectedBasicAbilitiesNames] = useBasicAbilitiesNames()
    
    let [description, setDescription] = useDescription()
    let [quickNotes, setQuickNotes] = useQuickNotes()
    let [inventory, setInventory] = useInventory()
    let [weaponNames] = useWeapons()
    let [armorNames, setArmorNames] = useArmors()
    let [gold, setGold] = useGold()
    
    // let [selectedSkillNames] = useSkills()
    let [languages] = useLanguages()

    let [currentMana, setCurrentMana] = useCurrentMana()
    
    let totalStats = useConstTotalStats()


    const myBasicAbilities = useConstAllBasicAbilities()
    const mySkillBonuses = useConstAllSkillBonuses()
    // const mySkills = useConstAllSkillNames()


    const allMyRaceAndClassSpells = useConstAllRaceAndClassSpells()
    const { bonuses, sources: bonusesSources } = useConstAllBonuses()
    const { extras, combatExtras } = useConstAllAbilitiesAndItemsExtras()

    // Computed values
    const spellsNotIgnored = allMyRaceAndClassSpells.filter(spell => spell.IsIgnored != true)
    const spellsIgnored = allMyRaceAndClassSpells.filter(spell => spell.IsIgnored == true);
    const spellNamesBeingReplaced = spellsNotIgnored
        .filter(spell => spell.Replacement != null)
        .map(spell => getSpellReplacementName(spell))
    const allDisplayedRaceAndClassSpells = []
    for (const spell of spellsNotIgnored) {
        if (spellNamesBeingReplaced.includes(spell.Name)) {     // Add the replacement on the same position
            const replacementSpell = spellsNotIgnored.find(replacer => replacer?.Replacement?.includes(spell.Name))
            allDisplayedRaceAndClassSpells.push(replacementSpell)
        } else if (spell.Replacement != null) {                 // Ignore because we already add it
            continue
        } else {
            allDisplayedRaceAndClassSpells.push(spell)
        }
    }


    const allMyWeapons = weaponNames.map(name => getAllWeaponsByName()[name])
    const allMyArmors = armorNames.map(name => getAllArmorsByName()[name])
    const selectedClassObj = selectedClassName == null? null: getAllClasses()[selectedClassName]
    const attributes = calculateAllAtributes({raceName: selectedRaceName, className: selectedClassName, level, totalStats, bonuses})
    const maxMana = selectedClassName == null? 1: calculateBaseMaxManaByLevel(level, selectedClassName)

    // Other
    let setInputGold    // Set in the Input property

    // Extras Components
    const AbilitiesExtras = () => <>{ extras.map(text => <div className="extra italic"><Icon name="Specializations"/>{ text }</div>) }</>
    const ArmorExtras = () => <>{ allMyArmors.map(item => <CombatItem item={item} type="armor"/>) }</>
    const CombatExtras = () => <>{ combatExtras.map(text => <div className="extra"><Icon name="Damage"/>{ text }</div>) }</>
    const BonusesWithSources = () => <>{
        bonusesSources.map(source => <div className="extra" style={{color: 'var(--green-text)'}}>
            { source.bonus >= 0? <span>+</span>: ''}
            { source.bonus } { source.statName }
            &nbsp;({ source.source })
        </div>) }</>
    const Skills = () => <>{
        Object.keys(mySkillBonuses).map(skillName => <div className="extra">
            <Icon name="CharacterSetupSub"/>
            {
                mySkillBonuses[skillName] > 0? '+' + mySkillBonuses[skillName]: mySkillBonuses[skillName]
            }
            in
            {
                skillName
            }
        </div>)
    }</>
    const Languages = () => <>{ languages.map(text => <div className="extra italic"><Icon name="Specializations"/>You speak { text }</div>) }</>
    
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
                <StatValue
                    onClick={() => setStatNameToChange(n)}
                    key={n}
                    name={n.substring(0, 3).toUpperCase()}
                    value={totalStats[i]}
                />
            )) }
        </div>
    }
    function BaseStatsAndCombatColumn() {
        return <div className={`flex flex-column column-2-width`} style={{gap: 'var(--stats-gap)'}}>
            <div className="flex-column" style={{gap: 'var(--stats-gap)'}}>    
                <div className="flex" style={{gap: 'var(--stats-gap)'}}>
                    <BigStatValue onClick={() => setStatNameToChange(MAX_HEALTH)} name={MAX_HEALTH} value={attributes[MAX_HEALTH]}/>
                    <BigStatValue onClick={() => setStatNameToChange(HEALTH_REGEN)} name={HEALTH_REGEN} value={attributes[HEALTH_REGEN]}/>
                </div>
                <div className="flex" style={{gap: 'var(--stats-gap)'}}>
                    <BigStatValue onClick={() => setStatNameToChange(MOVEMENT_SPEED)} name={MOVEMENT_SPEED} value={attributes[MOVEMENT_SPEED]}/>
                    <BigStatValue onClick={() => setStatNameToChange(INITIATIVE)} name={INITIATIVE} value={attributes[INITIATIVE]}/>
                </div>
            </div>
            <div className="wrapper description-wrapper combat-notes-wrapper">
                <TextArea className="wrapped-child" initialValue={quickNotes} onChange={text => setQuickNotes(text)}/>
            </div>
        </div>
    }
    function PortraitAndDescription() {
        return <div className="column-3">
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
                    <SmallStat onClick={() => setStatNameToChange('Known Abilities')} type={SmallStatTypes.VERTICAL} name="Number of Known Basic Abilities">{nKnownAbilities} Basic {nKnownAbilities == 1? 'Ability': 'Abilities'}</SmallStat>
                    { selectedClassName && hasClassMana(selectedClassName) && (<ManaBar/>) }
                </div>
                <div className="flex-column flex-1">
                    {/* <ManySmallStats name="Available Ability Schools" style={{minWidth: '300px', flexGrow: 1}} color={'var(--dark-color)'} texts={knownAbilitySchools}/> */}
                    { selectedClassName != null && (
                        <div className="margin-top-half">
                            { selectedClassObj.Spellcasting?.Mana?.Regain != null && (
                                <p>{ selectedClassObj.Spellcasting?.Mana?.Regain }</p>
                            ) }
                        </div>
                    ) }
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
    function CombatItem({item, type=''}) {
        type = type.toLowerCase()

        function onClick() {
            const bool = askConfirmation('Remove item?')
            if (bool) {
                setArmorNames(armorNames.filter(armorName => armorName != item.Name))
            }
        }

        return (
            <div className="extra bold flex-column left-content ccc-combat-item relative" onClick={onClick}>
                <div className="minus">
                    Remove
                </div>
                <div>
                    <Icon name={type == 'armor'? 'Defense': 'Damage'}/> {item.Name}
                </div>
                <div style={{marginTop: '0.25rem', fontWeight: 'normal', fontSize: '0.8em', color: 'rgb(0, 180, 0)'}}>{item.CCCDisplayEffect}</div>
            </div>
        )
    }

    return (
        <div id="My-Character">

            <ChangeStatDialog statName={statNameToChange} setStatName={setStatNameToChange}/>

            <Names/>

            {/* <PortraitAndDescriptionRowP/> */}
            <div className="portrait-only">
                <PortraitAndDescription/>
            </div>
            <div className="flex flex-row margin-top-1" style={{gap: 'var(--stats-gap)'}}>
                <StatsColumn/>
                <BaseStatsAndCombatColumn/>
                <div className="landscape-only">
                    <PortraitAndDescription/>
                </div>
            </div>

            <div className="flex flex-row margin-top-1 gap-3q">
                <div className="flex-column" style={{flex: 1, gap: '5px'}}>
                    <PageH3>Non-Combat Skills</PageH3>
                    <Skills/>
                </div>
                <div className="flex-column" style={{flex: 1, gap: '5px'}}>
                    <PageH3>Languages</PageH3>
                    <AbilitiesExtras/>
                    <Languages/>
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
                    <BonusesWithSources/>
                    <CombatExtras/>
                    <ArmorExtras/>
                </div>
            </div>

            <ManySpells className="margin-top-1" spells={allMyWeapons} areItems={true} shouldIgnoreAlignment={true}/>

            <Spellcasting/>
            
            <PageH2 className="margin-top-2">Minor Spells (hidden)</PageH2>
            <button onClick={() => setAreMinorSpellsHidden(!areMinorSpellsHidden)}>{ areMinorSpellsHidden? 'Show': 'Hide' }</button>
            { areMinorSpellsHidden == false && <ManySpells className="margin-top-1" spells={spellsIgnored} shouldIgnoreAlignment={true}/> }

            <PageH2 className="margin-top-2">Race and Class Abilities</PageH2>
            <ManySpells spells={allDisplayedRaceAndClassSpells} shouldIgnoreAlignment={true} spellsMetadata={spellsMetadata}/>

            <PageH2 className="margin-top-1">Basic Abilities</PageH2>
            <ManySpells spells={myBasicAbilities} shouldIgnoreAlignment={true} spellsMetadata={spellsMetadata}/>
        </div>
    )
}
