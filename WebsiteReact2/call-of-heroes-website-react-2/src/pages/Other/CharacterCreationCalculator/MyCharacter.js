import { useEffect, useState } from "react"
import { getAllClasses, getAlMyRaceAndClassSpells, getAllRaces, getAllSpellsByName, getExtrasFromSpells, isString, spellsFromObject, useLocalStorageState, hasClassMana, getAllWeaponsByName, getAllArmorsByName, addObjects, getSpellReplacementName, reverseObject, addManyObjects, getSpellIconPathByName, addArrays, withToggledElement, getNumberDecimalsString, getNumberPartsString } from "../../../utils"
import ManySpells from "../../../components/Spell/ManySpells"
import PageH2 from "../../../components/PageH2/PageH2"
import TextArea from "../../../components/TextArea/TextArea"
import Icon from "../../../components/Icon"
import Input from "../../../components/Input/Input"
import { getChoiceAbilitiesObjects, useAllSpellsMetadata, useArmors, useConstAllMyAbilities, useConstAllSkillBonuses, useConstAutoSkillBonuses, useCurrentHealth, useCurrentMana, useDescription, useGold, useInventory, useLanguages, useLevel, useManualBonuses, useManualCombatExtras, useManualNormalExtras, useManualSkillBonuses, useMaxMana, useQuickNotes, useSectionClassName, useSectionClassSpecName, useSectionNamesState, useSectionRaceName, useSectionStatsState, useSkills, useWeapons } from "./CharacterData"
import SmallStat from "../../../components/SmallStat/SmallStat"
import ManySmallStats from "../../../components/SmallStat/ManySmallStats"
import { askConfirmation } from "../../../services/MessageDisplayer"
import Dialog from "../../../components/Dialog/Dialog"
import ChangeStatDialog from "./ChangeStatDialog"
import Spoiler from "../../../components/Spoiler/Spoiler"
import Selector from "../../../components/Selector/Selector"
import { calculateAllAtributes, calculateBaseMaxManaByLevel, calculateExtraFirstTurnAPByInitiative, EXTRA_INITIATIVE_AP, getAllStatBonusesYMLAsObjFromSpellsArray, getStatsArrayFromObject, HEALTH_REGEN, INITIATIVE, KNOWN_ABILITIES, MAX_HEALTH, MOVEMENT_SPEED, STAT_NAMES, STAT_SHORTENED_STRING } from "../../../services/game-lib/stat-calculations"
import PageH3 from "../../../components/PageH3/PageH3"
import CopySpellButton from "../../../components/CopyButton/CopySpellButton"
import { ResourceBar } from "../../../components/ResourceBar/ResourceBar"
import { QGTitle1 } from "../../Tools/TitleGenerator"
import PageH1 from "../../../components/PageH1/PageH1"
import { BigStatValue } from "../../../components/BigStat/BigStatValue"





export function maybeMakeFractionGray(value) {
    const { sign, left, right } = getNumberPartsString(value, { includeDotOnRight: true })
    const signSpan = `${left}` == '0'? <span style={{color: '#BBBBBB'}}>{sign}</span>: <span>{sign}</span>
    console.log({ sign, left, right })
    return <span>
        {signSpan}{left}<span style={{color: '#BBBBBB', fontSize: '0.75em'}}>{right}</span>
    </span>
}

export function useConstBonusesFromSpellsAndItems() {
    let [armorNames] = useArmors()
    const allMyArmors = armorNames.map(name => getAllArmorsByName()[name])
    const allMyRaceAndClassSpells = useConstAllMyAbilities()
    const everything = [...allMyArmors, allMyRaceAndClassSpells]
    
    const { bonuses, sources } = getAllStatBonusesYMLAsObjFromSpellsArray(everything)
    console.log({allMyArmors, allMyRaceAndClassSpells, bonuses, sources})

    return { bonuses, sources }
}
export function useConstAllBonuses() {
    const { bonuses, sources } = useConstBonusesFromSpellsAndItems()
    const [manualBonuses] = useManualBonuses()
    const allBonuses = addManyObjects([bonuses, manualBonuses])
    console.log(`Adding the following`)
    console.log({ bonuses, manualBonuses, allBonuses})
    return { bonuses: allBonuses, sources: sources }
}
export function useConstTotalStats() {
    const { bonuses } = useConstBonusesFromSpellsAndItems()
    const [manualBonuses, _] = useManualBonuses()
    const [baseStats] = useSectionStatsState()
    
    const manualBonusesStatsArray = getStatsArrayFromObject(manualBonuses)
    const autoBonusesStatsArray = getStatsArrayFromObject(bonuses)
    return addArrays(baseStats, manualBonusesStatsArray, autoBonusesStatsArray)
}
export function useConstAllAbilitiesAndItemsExtras() {
    const allMyRaceAndClassSpells = useConstAllMyAbilities()
    const [weaponNames] = useWeapons()
    const [armorNames] = useArmors()

    const allMyWeapons = weaponNames.map(name => getAllWeaponsByName()[name])
    const allMyArmors = armorNames.map(name => getAllArmorsByName()[name])

    return getExtrasFromSpells([...allMyWeapons, ...allMyArmors, ...allMyRaceAndClassSpells])
}
export function useConstManuallyAddedExtrasFromAbilities() {
    const allMyRaceAndClassSpells = useConstAllMyAbilities()
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

    let [manualBonuses, setManualBonuses] = useManualBonuses()
    let [manualSkillBonuses, setManualSkillBonuses] = useManualSkillBonuses()
    let [manualNormalExtras, setManualNormalExtras] = useManualNormalExtras()
    let [manualCombatExtras, setManualCombatExtras] = useManualCombatExtras()
    
    let [spellsMetadata, setSpellsMetadata] = useAllSpellsMetadata()
    
    let [description, setDescription] = useDescription()
    let [quickNotes, setQuickNotes] = useQuickNotes()
    let [inventory, setInventory] = useInventory()
    let [weaponNames] = useWeapons()
    let [armorNames, setArmorNames] = useArmors()
    let [gold, setGold] = useGold()
    
    // let [selectedSkillNames] = useSkills()
    let [languages] = useLanguages()

    let [currentMana, setCurrentMana] = useCurrentMana()
    let [currentHealth, setCurrentHealth] = useCurrentHealth()
    
    let totalStats = useConstTotalStats()

    const mySkillBonuses = useConstAllSkillBonuses()
    const autoSkillBonuses = useConstAutoSkillBonuses()


    const allMyRaceAndClassSpells = useConstAllMyAbilities()
    const { bonuses, sources: bonusesSources } = useConstAllBonuses()
    const { extras, combatExtras } = useConstAllAbilitiesAndItemsExtras()
    window.bonuses = bonuses

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
    const maxMana = selectedClassName == null? 1: calculateBaseMaxManaByLevel(level, selectedClassName)
    const attributes = calculateAllAtributes({raceName: selectedRaceName, className: selectedClassName, level, totalStats, bonuses})
    // const extraAPOnFirstRound = calculateExtraFirstTurnAPByInitiative(attributes[INITIATIVE])
    // const extraAPOnFirstRoundString = extraAPOnFirstRound < 0? extraAPOnFirstRound: ('+' + extraAPOnFirstRound)

    console.log({ attributes_INITIATIVE: attributes[INITIATIVE]})
    const initiativeDisplay = maybeMakeFractionGray(attributes[INITIATIVE])
    console.log({attributes})


    // Functions
    function addSkill() {
        setStatDialogOptions({
            defaultInputValue: '',
            defaultNumberValue: 0,
            title: "New Skill",
            description: `Add new Non-Combat Skill.`,
            onDone: ({ name, value }) => setManualSkillBonuses({
                ...manualSkillBonuses,
                [name]: value
            })
        })
    }
    function changeSkill(name) {
        setStatDialogOptions({
            defaultInputValue: null,
            defaultNumberValue: manualSkillBonuses[name],
            onDone: ({ value }) => setManualSkillBonuses({
                ...manualSkillBonuses,
                [name]: value
            })
        })
    }
    function addNormalExtra() {
        setStatDialogOptions({
            defaultInputValue: '',
            defaultNumberValue: null,
            title: "New Quick Reference",
            description: `Add new quick reference tidbit.`,
            onDone: ({ name, value }) => setManualNormalExtras(withToggledElement(manualNormalExtras, name))
        })
    }
    function addCombatExtra() {
        setStatDialogOptions({
            defaultInputValue: '',
            defaultNumberValue: null,
            title: "New Quick Combat Reference",
            description: `Add new quick combat reference tidbit.`,
            onDone: ({ name, value }) => setManualCombatExtras(withToggledElement(manualCombatExtras, name))
        })
    }
    function modifyManualBonus(attributeName, increment=1) {
        setStatDialogOptions({
            defaultInputValue: null,
            defaultNumberValue: bonuses[attributeName] ?? 0,
            increment: increment,
            title: "Add Extra to " + attributeName,
            onDone: (({ name, value }) => {
                const newManualBonuses = {
                    ...manualBonuses,
                    [attributeName]: value
                }
                setManualBonuses(newManualBonuses)
            })
        })
    }

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
    const SkillBonus = ({name, value}) => {
        return <div className="skill-bonus pointer" onClick={() => changeSkill(name)}>
            <div className="left">
                <Icon name="CharacterSetupSub"/> {name}
            </div>
            <div className="right">
                {value}
            </div>
        </div>
    }
    const Skills = () => <>{
        Object.keys(mySkillBonuses)
            .filter(skillName => {
                if (manualSkillBonuses[skillName] == 0 && !(skillName in autoSkillBonuses)) {
                    return false
                }
                return true
            })
            .map(skillName => <SkillBonus name={skillName} value={mySkillBonuses[skillName] > 0? '+' + mySkillBonuses[skillName]: mySkillBonuses[skillName]}/>)
    }</>
    const Languages = () => <>{ languages.map(text => <div className="extra"><Icon name="Specializations"/>You speak { text }</div>) }</>

    // Subcomponents
    function Names() {
        return <div className="flex flex-column">
            <div className="center-content">
                <QGTitle1 text={names.characterName} height={60}/>
            </div>
            {/* <PageH3>Level {level} { selectedRaceName } { selectedClassName } { selectedSpecName != null && `(${selectedSpecName})`}</PageH3> */}
            {/* <h1 className="center-text full-width">{ names.characterName }</h1> */}
            <h2 className="center-text full-width margin-top-0" style={{fontFamily: 'HomeFont', color: 'var(--theme-color-1-darker)'}}>Level {level} { selectedRaceName } { selectedClassName } { selectedSpecName != null && `(${selectedSpecName})`}</h2>
        </div>
    }
    function StatsColumn() {
        return <div className="flex flex-column" style={{gap: 'var(--stats-gap)'}}>
            { STAT_NAMES.map((n, i) => (
                <BigStatValue
                    onClick={() => modifyManualBonus(n)}
                    key={n}
                    name={n.substring(0, 3).toUpperCase()}
                    value={totalStats[i]}
                />
            )) }
        </div>
    }
    function AttributesAndQuickCombatNotesColumn() {
        return <div className={`flex flex-column column-2-width`} style={{gap: 'var(--stats-gap)'}}>
            <div className="flex-column" style={{gap: 'var(--stats-gap)'}}>    
                <div className="flex" style={{gap: 'var(--stats-gap)'}}>
                    <BigStatValue onClick={() => modifyManualBonus(MAX_HEALTH)} name={MAX_HEALTH} value={attributes[MAX_HEALTH]}/>
                    <BigStatValue onClick={() => modifyManualBonus(HEALTH_REGEN)} name={HEALTH_REGEN} value={attributes[HEALTH_REGEN]}/>
                </div>
                <div className="flex" style={{gap: 'var(--stats-gap)'}}>
                    <div className="portrait-only">
                        <BigStatValue onClick={() => modifyManualBonus(MOVEMENT_SPEED)} name={STAT_SHORTENED_STRING[MOVEMENT_SPEED]} value={attributes[MOVEMENT_SPEED]}/>
                    </div>
                    <div className="landscape-only">
                        <BigStatValue onClick={() => modifyManualBonus(MOVEMENT_SPEED)} name={MOVEMENT_SPEED} value={attributes[MOVEMENT_SPEED]}/>
                    </div>
                    <BigStatValue onClick={() => modifyManualBonus(INITIATIVE, 0.5)} name={INITIATIVE} value={initiativeDisplay}/>
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

        return (
            <div className="flex-column gap-3q">
                <HealthBar/>
                { selectedClassName && hasClassMana(selectedClassName) && (<ManaBar/>) }
                <SmallStat onClick={() => setStatNameToChange('Known Abilities')} className="column" name="Extra Minor & Utility Talents">{attributes[KNOWN_ABILITIES]} {attributes[KNOWN_ABILITIES] == 1? 'Ability': 'Abilities'}</SmallStat>
                { selectedClassName != null && (
                    <div className="margin-top-half">
                        { selectedClassObj.Spellcasting?.Mana?.Regain != null && (
                            <p>{ selectedClassObj.Spellcasting?.Mana?.Regain }</p>
                        ) }
                    </div>
                ) }
            </div>
        )
    }

    function ManaBar() {
        return <div className="small-stat-container wrapper">
            <ResourceBar name="Mana" maxValue={maxMana} value={currentMana} setValue={setCurrentMana}/>
        </div>
    }
    function HealthBar() {
        return <div className="small-stat-container wrapper">
            <ResourceBar name="Health" maxValue={attributes[MAX_HEALTH]} value={currentHealth} setValue={setCurrentHealth} color1='var(--dark-red-color)' color2='rgba(223, 28, 28, 1)'/>
        </div>
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

    let [statDialogOptions, setStatDialogOptions] = useState(null)

    return (
        <div id="My-Character">

            {statDialogOptions != null && <ChangeStatDialog
                {...statDialogOptions}
                close={() => setStatDialogOptions(null)}
            />}

            <div id="My-Character-Upper-Part">
                <Names/>

                {/* <PortraitAndDescriptionRowP/> */}
                <div className="portrait-only">
                    <PortraitAndDescription/>
                </div>
                <div className="flex flex-row margin-top-1" style={{gap: 'var(--stats-gap)'}}>
                    <StatsColumn/>
                    <AttributesAndQuickCombatNotesColumn/>
                    <div className="landscape-only">
                        <PortraitAndDescription/>
                    </div>
                </div>

                <div className="flex flex-direction-responsive margin-top-1 gap-3q">
                    <div className="flex-column" style={{flex: 1, gap: '5px'}}>
                        <PageH3>Non-Combat Skills</PageH3>
                        <Skills/>
                        <button className="extra" onClick={addSkill}>+</button>
                    </div>
                    <div className="flex-column" style={{flex: 1, gap: '5px'}}>
                        <PageH3>Languages</PageH3>
                        <AbilitiesExtras/>
                        <Languages/>
                        { manualNormalExtras.map(str => <div className="extra">{str}</div>) }
                        <button className="extra" onClick={addNormalExtra}>+</button>
                    </div>
                    <div className="flex-column" style={{flex: 1, gap: '5px'}}>
                        <PageH3>Combat Other</PageH3>
                        <CombatExtras/>
                        <ArmorExtras/>
                        { manualCombatExtras.map(str => <div className="extra">{str}</div>) }
                        <button className="extra" onClick={addCombatExtra}>+</button>
                    </div>
                </div>

                <div className="flex-direction-responsive margin-top-1 gap-3q">
                    <div className="inventory-wrapper wrapper relative flex-2">
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
                    <div className="flex-1">
                        <Spellcasting/>
                    </div>
                </div>
                

                <CopySpellButton elementId="My-Character-Upper-Part" shouldAddBorder={false}/>
            </div>

            <ManySpells className="margin-top-1" spells={allMyWeapons} areItems={true} shouldIgnoreAlignment={true}/>

            
            <PageH2 hasMargin={false} className="margin-top-2 center-text">Lesser Abilities</PageH2>
            <button onClick={() => setAreMinorSpellsHidden(!areMinorSpellsHidden)}>{ areMinorSpellsHidden? 'Show': 'Hide' }</button>
            { areMinorSpellsHidden == false && <ManySpells className="margin-top-1" spells={spellsIgnored} shouldIgnoreAlignment={true}/> }

            <PageH2 hasMargin={false} className="margin-top-2 center-text">Race and Class Abilities</PageH2>
            <ManySpells spells={allDisplayedRaceAndClassSpells} shouldIgnoreAlignment={true} spellsMetadata={spellsMetadata}/>

            {/* <PageH2 hasMargin={false} className="margin-top-1 center-text">Basic Abilities</PageH2>
            <ManySpells spells={myBasicAbilities} shouldIgnoreAlignment={true} spellsMetadata={spellsMetadata}/> */}
        </div>
    )
}
