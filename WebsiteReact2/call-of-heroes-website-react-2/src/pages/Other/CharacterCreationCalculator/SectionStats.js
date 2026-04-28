import { useEffect, useState } from "react"
import TwoColumns from "../../../components/TwoColumns/TwoColumns"
import Column from "../../../components/TwoColumns/Column"
import SmallStat from "../../../components/SmallStat/SmallStat"
import { getClass, getNumberPartsString, getRace, getStatIconPathByStatName, includesOrViceversa, useConstIsPortrait, useLocalStorageState } from "../../../utils"
import Page from "../../../containers/Page/Page"
import { QGTitle1 } from "../../Tools/TitleGenerator"
import Icon from "../../../components/Icon"
import { maybeMakeFractionGray, useConstBonusesFromSpellsAndItems, useConstTotalStats } from "./MyCharacter"
import Input from "../../../components/Input/Input"
import { useExperience, useLevel, useSectionClassName, useSectionRaceName, useSectionStatsState } from "./CharacterData"
import { AttributeCalculationTextComponent, ATTRIBUTES_EXPLANATIONS, calculateExperienceByLevel, calculateExtraFirstTurnAPByInitiative, calculateStatsToBonusAttributesObject, checkStatRequirements, DEFAULT_STAT_ARRAY, EXTRA_INITIATIVE_AP, getAttributeCalculationsByStats, getSkillLimitByLevel, getStatLimitByLevel, HEALTH_REGEN, INITIATIVE, MANA, MAX_HEALTH, SKILL_POINT, STAT_ICON_NAME_MAP, STAT_NAMES, STAT_SHORTENED_STRING } from "../../../services/game-lib/stat-calculations"
import classNames from "classnames"
import { BigStatInput } from "../../../components/BigStat/BigStatInput"
import { ExperienceSlider } from "../../../components/Other/ExperienceSlider"


export default function SectionStats() {

    const isPortrait = useConstIsPortrait()
 
    let [statsCorrectError, setStatsCorrectError] = useState(null)    /* { message: string } */
    let [shouldShowLevelUpEffect, setShouldShowLevelUpEffect] = useState(false)

    let [level, setLevel] = useLevel()
    let [stats, setStats] = useSectionStatsState()
    let totalStats = useConstTotalStats()
    let { bonuses } = useConstBonusesFromSpellsAndItems()
    let [selectedRaceName] = useSectionRaceName()
    let [selectedClassName] = useSectionClassName()
    let [experience, setExperience] = useExperience()

    useEffect(() => {
        checkStandardStats(stats)
    }, [selectedRaceName])

    console.log({bonuses})

    const myRace = getRace(selectedRaceName)
    const myClass = getClass(selectedClassName)
    const exactStats = myRace?.['Custom Stat Array']
    const statRequirementCode = myRace?.['Stat Requirements']
    const ignoreStatRequirements = myRace?.['IgnoreStatRestrictions'] ?? false
    const levelError = checkLevel(level)
    const isLevelUpBlocked = selectedClassName == null || selectedRaceName == null
    
    const attributesFromStats = calculateStatsToBonusAttributesObject(stats)
    const attributeCalculationsByStats = getAttributeCalculationsByStats(stats)

    function levelUp() {
        setLevel(parseInt(level) + 1)
        setShouldShowLevelUpEffect(true)
    }
    function checkLevel(level) {
        const levelError = level <= 0? 'Your level should not be lower than 0': Math.floor(level) != level? 'Your level should not be decimal': null
        return levelError
    }
    function checkStandardStats(stats) {
        const statsCopy = [...stats].slice(0, DEFAULT_STAT_ARRAY.length).sort()
        const statArray = exactStats != null? exactStats: DEFAULT_STAT_ARRAY
        const baseStatsCopy = [...statArray].sort()

        if (statArray?.length != DEFAULT_STAT_ARRAY.length) {
            console.log({exactStats, statArray, stats, DEFAULT_STAT_ARRAY})
            console.error(`Given exactStats length is not the same as DEFAULT_STAT_ARRAY! Printed above.`)
        }

        let isCorrect = !(statsCopy.filter((stat, i) => baseStatsCopy[i] != stat).length > 0)

        console.log({isCorrect, statsCopy, baseStatsCopy})
        
        if (!isCorrect) {
            setStatsCorrectError({
                message: `Your Stats might not respect the ${statArray.join(', ')} numbers, in any order.`
            })
            return
        }

        if (statRequirementCode != null) {
            isCorrect = checkStatRequirements(stats, statRequirementCode)
            if (isCorrect == false) {
                setStatsCorrectError({
                    message: `Your Stats might not respect your chosen race requirements: ${getRace(selectedRaceName)?.Creation?.['Stat Restrictions']}`
                })
                return
            }
        }

        setStatsCorrectError(null)
    }

    function onStatChanged(i, val) {
        const statsCopy = [...stats]
        statsCopy[i] = parseInt(val)

        setStats(statsCopy)
        checkStandardStats(statsCopy)
    }

    function StatExplainedDisplay({ name, description, iconName, value: { left, middle, right } }) {
        
        console.log({ left, middle, right })
        const maybeAnd = x => `${x}`.length == 0? '': <span>{x}&nbsp;</span>
        
        return (
            <TwoColumns className='margin-top-half'>
                <Column>
                    <div>
                        <SmallStat name={`Extra ${name}`} className={`row large`}>
                            {maybeAnd(left)}{maybeAnd(middle)}{maybeMakeFractionGray(right)}
                            &nbsp;<Icon name={iconName}/>
                        </SmallStat>    
                    </div>
                </Column>
                <Column>
                    <p>
                        { ATTRIBUTES_EXPLANATIONS[name]() }
                    </p>
                </Column>
            </TwoColumns>
        )
    }

    function LevelUpTable() {
        const everyLevel = {
            ...myClass?.['Level Up']?.['Every Level'],
        }
        if (myClass.Specs != null && level == 2) {
            everyLevel['Specialization'] = `Pick a Specialization!`
        }
        everyLevel[`Talent`] = 1   // Comes after Spec

        const subtextByThing = {
            [MAX_HEALTH]: 'Automatically added!',
            [HEALTH_REGEN]: 'Automatically added!',
            [MANA]: 'Automatically added!',
            [SKILL_POINT]: `Up to +${getSkillLimitByLevel(level)}.`,
            'Any Stat': `Your Stat Limit is ${getStatLimitByLevel(level)}.`,
            'Talent': `Choose 1 Talent from the available Level ${level} Class Talents (from ${selectedClassName}).`
        }
        function maybePlus(thing) {
            if (thing.includes('Specialization')) {
                return ''
            }
            return '+'
        }

        return <div style={{width: '30%'}}>
            { Object.keys(everyLevel).map((statName, i) => {
                const bgColor = i % 2 == 1? 'var(--table-even-color)': 'var(--table-odd-color)' // It's reversed because CSS starts with 1
                const text = everyLevel[statName]
                const subtextName = Object.keys(subtextByThing).find(subtext => includesOrViceversa(statName, subtext))

                return <div className="center-content margin-top-1 shadowed padding-half will-fade-in gap-0" style={{backgroundColor: bgColor, '--time': (i * 0.2) + 's'}}>
                    <span>{maybePlus(statName)}{ text } <Icon src={getStatIconPathByStatName(statName)}/>{statName}</span>
                    { subtextName != null && (
                        <span className="italic center-text" style={{fontSize: '0.9em', color: 'gray'}}>{subtextByThing[subtextName]}</span>
                    )}
                </div>
            }) }
        </div>
    }

    return (
        <Page hasNoMargins={true} className>
            <div className="center-content">
                <QGTitle1 text="Level" height={60} className="margin-bottom-2"/>
                <div className="center-content gap-1 width-100">
                    <div>
                        <BigStatInput name="Level" value={level} onChange={val => {
                            setLevel(val)
                        }}/>
                    </div>
                    <div className="center-content">
                        <button disabled={isLevelUpBlocked} style={{width: 'var(--stat-selector-size)'}} onClick={levelUp}>Level Up</button>
                    </div>
                    <div className="flex-column center-content" style={{width: '100%'}}>
                        <ExperienceSlider max={calculateExperienceByLevel(level)} initialValue={experience} onChange={val => setExperience(val)}></ExperienceSlider>
                    </div>
                    { levelError && !ignoreStatRequirements && (
                        <div className="warning-toaster">{ levelError }</div>
                    ) }
                    { shouldShowLevelUpEffect && <LevelUpTable/> }
                </div>
            </div>
            <div className="center-content">
                <QGTitle1 text="Stats" height={60}/>
                <p>Use the numbers {DEFAULT_STAT_ARRAY.join(', ')} and distribute them as you like among the {DEFAULT_STAT_ARRAY.length} stats.</p>
                <p>{ myRace && myRace?.Creation?.['Stat Restrictions'] != null && <span>Pay attention to your races's stat <i>restrictions</i>: {myRace?.Creation?.['Stat Restrictions']}</span> }</p>
            </div>
            <div className="center-content flex" style={{gap: '2rem'}}>
                <div className="stats-selector flex row width-100">
                    { DEFAULT_STAT_ARRAY.map((num, i) => (
                        <BigStatInput style={{width: 'unset', height: 'unset', flex: 1}} name={isPortrait? STAT_SHORTENED_STRING[STAT_NAMES[i]]: STAT_NAMES[i]} value={stats[i]} onChange={val => {
                            onStatChanged(i, val)
                        }}/>
                    )) }
                </div>


                <div style={{ width: '100%' }}>
                    { Object.keys(attributeCalculationsByStats).map(name => (
                        <StatExplainedDisplay name={name} iconName={STAT_ICON_NAME_MAP[name]} value={attributeCalculationsByStats[name]} description={
                            <div>
                                <AttributeCalculationTextComponent statName={name}/>
                            </div>
                        }/>
                    )) }
                    
                </div>
                <div className="center-content" style={{width: '100%'}}>
                    { statsCorrectError != null && (
                        <div className="warning-toaster">{ statsCorrectError.message }</div>
                    ) }
                </div>
            </div>
        </Page>
    )
}

