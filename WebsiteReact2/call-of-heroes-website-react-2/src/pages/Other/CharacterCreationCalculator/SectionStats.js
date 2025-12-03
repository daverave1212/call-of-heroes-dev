import { useEffect, useState } from "react"
import TwoColumns from "../../../components/TwoColumns/TwoColumns"
import Column from "../../../components/TwoColumns/Column"
import SmallStat from "../../../components/SmallStat/SmallStat"
import { getRace, useLocalStorageState } from "../../../utils"
import Page from "../../../containers/Page/Page"
import { QGTitle1 } from "../../Tools/TitleGenerator"
import Icon from "../../../components/Icon"
import { useConstBonusesFromSpellsAndItems, useConstTotalStats } from "./MyCharacter"
import Input from "../../../components/Input/Input"
import { useExperience, useLevel, useSectionRaceName, useSectionStatsState } from "./CharacterData"
import { AttributeCalculationTextComponent, calculateExperienceByLevel, calculateExtraFirstTurnAPByInitiative, calculateStatsToAttributesObject, checkStatRequirements, DEFAULT_STAT_ARRAY, EXTRA_INITIATIVE_AP, INITIATIVE, STAT_ICON_NAME_MAP, STAT_NAMES } from "../../../services/game-lib/stat-calculations"
import classNames from "classnames"
import { BigStatInput } from "../../../components/BigStat/BigStatInput"



export function ExperienceSlider({max, initialValue, onChange, children}) {
    let [val, setVal] = useState(initialValue)

    useEffect(() => {
        setVal(0)
        onChange(0)
    }, [max])

    function updateState(evt) {
        const newValue = evt.target.value
        onChange(newValue)
    }

    return (
        <>
            <input
                type="range"
                data-max-xp={max}
                data-val={val}
                data-text={children}
                min="0" max={max} value={val} step="5"
                onChange={evt => setVal(evt.target.value)}
                onBlur={updateState} onMouseUp={updateState}
            />
            <p className="margin-top-half input-name input-name-styled">Experience: {val} / {max}</p>
        </>
    )
}

export default function SectionStats() {
 
    let [statsCorrectError, setStatsCorrectError] = useState(null)    /* { message: string } */
    let [level, setLevel] = useLevel()
    let [stats, setStats] = useSectionStatsState()
    let totalStats = useConstTotalStats()
    let { bonuses } = useConstBonusesFromSpellsAndItems()
    let [selectedRaceName] = useSectionRaceName()
    let [experience, setExperience] = useExperience()

    useEffect(() => {
        checkStandardStats(stats)
    }, [selectedRaceName])

    console.log({bonuses})

    const myRace = getRace(selectedRaceName)
    const exactStats = myRace?.['Custom Stat Array']
    const statRequirementCode = myRace?.['Stat Requirements']
    const ignoreStatRequirements = myRace?.['IgnoreStatRestrictions'] ?? false
    const levelError = checkLevel(level)
    
    const attributesFromStats = calculateStatsToAttributesObject(stats)

    function checkLevel(level) {
        const levelError = level <= 0? 'Your level should not be lower than 0': Math.floor(level) != level? 'Your level should not be decimal': null
        return levelError
    }
    function checkStandardStats(stats) {
        const statsCopy = [...stats].sort()
        const statArray = exactStats != null? exactStats: DEFAULT_STAT_ARRAY
        const baseStatsCopy = [...statArray].sort()
        let isCorrect = !(statsCopy.filter((stat, i) => baseStatsCopy[i] != stat).length > 0)
        
        if (!isCorrect) {
            setStatsCorrectError({
                message: `Your stats might not respect the ${statArray.join(', ')} numbers, in any order.`
            })
            return
        }

        if (statRequirementCode != null) {
            isCorrect = checkStatRequirements(stats, statRequirementCode)
            if (isCorrect == false) {
                setStatsCorrectError({
                    message: `Your stats might not respect your chosen race requirements: ${getRace(selectedRaceName)?.Creation?.['Stat Restrictions']}`
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

    function StatExplainedDisplay({ name, description, iconName, value }) {
        return (
            <TwoColumns className='margin-top-half'>
                <Column>
                    <div>
                        <SmallStat name={name} className={`row large`}>
                            { value }
                            &nbsp;<Icon name={iconName}/>
                        </SmallStat>    
                    </div>
                </Column>
                <Column>
                    <p style={{marginTop: '5px'}}>{ description }</p>
                </Column>
            </TwoColumns>
        )
    }

    return (
        <Page hasNoMargins={true} className>
            <div className="center-content">
                <QGTitle1 text="Level" height={60}/>
                <p>
                    <BigStatInput name="Level" value={level} onChange={val => {
                        setLevel(val)
                    }}/>
                </p>
                <div className="flex-column center-content" style={{width: '100%'}}>
                    <ExperienceSlider max={calculateExperienceByLevel(level)} initialValue={experience} onChange={val => setExperience(val)}>
                        asdadas
                    </ExperienceSlider>
                </div>
                { levelError && !ignoreStatRequirements && (
                    <div className="warning-toaster">{ levelError }</div>
                ) }
            </div>
            <div className="center-content">
                <QGTitle1 text="Stats" height={60}/>
                <p>Use the numbers {DEFAULT_STAT_ARRAY.join(', ')} and distribute them as you like among the 5 stats.</p>
                <p>{ myRace && myRace?.Creation?.['Stat Restrictions'] != null && <span>Pay attention to your races's stat <i>restrictions</i>: {myRace?.Creation?.['Stat Restrictions']}</span> }</p>
            </div>
            <div className="center-content flex" style={{gap: '2rem'}}>
                <div className="stats-selector flex row width-100">
                    { DEFAULT_STAT_ARRAY.map((num, i) => (
                        <BigStatInput style={{width: 'unset', height: 'unset', flex: 1}} name={STAT_NAMES[i]} value={stats[i]} onChange={val => {
                            onStatChanged(i, val)
                        }}/>
                    )) }
                </div>


                <div style={{ width: '100%' }}>
                    { Object.keys(attributesFromStats).map(name => (
                        <StatExplainedDisplay name={name} iconName={STAT_ICON_NAME_MAP[name]} value={attributesFromStats[name]} description={
                            <div>
                                <AttributeCalculationTextComponent statName={name}/>
                            </div>
                        }/>
                    )) }
                    
                    {/* <StatExplainedDisplay name="Extra Regen" iconName="HealthRegen" attributeName="healthRegen" description={
                        <div>Your <b>Health Regen</b> = Race Health Regen + 2 × Soul</div>
                    }/>
                    <StatExplainedDisplay name="Move Speed" iconName="Speed" attributeName="movementSpeed" description={
                        <div>Your <b>Movement Speed</b> = 3 + Dexterity (minimum 3)</div>
                    }/>
                    <StatExplainedDisplay name="Extra Talents" iconName="Spell" attributeName="knownTalents" description={
                        <div>Your <b>Number of Extra Talents</b> = Mind</div>
                    }/>
                    <StatExplainedDisplay name="Initiative" iconName="Replacement" attributeName="initiative" description={
                        <div>
                            Your <b>Initiative</b> = Mind + Soul
                            <div className="subtext margin-top-half">Initiative represents the order in which players and NPC's take turns.</div>
                        </div>
                    }/> */}
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

