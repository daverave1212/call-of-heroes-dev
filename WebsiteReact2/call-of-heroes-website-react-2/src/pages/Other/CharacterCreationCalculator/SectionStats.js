import { useEffect, useState } from "react"
import TwoColumns from "../../../components/TwoColumns/TwoColumns"
import Column from "../../../components/TwoColumns/Column"
import SmallStat from "../../../components/SmallStat/SmallStat"
import { calculateStat, checkStatRequirements, getExperienceByLevel, getRace, useLocalStorageState } from "../../../utils"
import Page from "../../../containers/Page/Page"
import { QGTitle1 } from "../../Tools/TitleGenerator"
import Icon from "../../../components/Icon"
import { useConstBonusesFromSpells, useConstTotalStats } from "./MyCharacter"
import Input from "../../../components/Input/Input"
import { useExperience, useLevel, useSectionRaceName, useSectionStatsState } from "./CharacterData"



export function StatInput({ name, value, onChange }) {

    function onInputChange(newVal) {
        if (!isNaN(parseInt(newVal)) && newVal != '') {
            onChange(newVal)
        }
    }

    return (
        <div className="stat-input">
            <Input value={value} onChange={onInputChange}/>
            {/* <input value={temporaryValue} onChange={evt => onInputChange(evt.target.value)}/> */}
            <div className="input-name input-name-styled">{ name }</div>
        </div>
    )
}

export function StatValue({ name, value, style, className }) {
    return (
        <div className={`stat-input ${className}`} style={style}>
            <div>{ value }</div>
            <div className="input-name input-name-styled">{ name }</div>
        </div>
    )
}

export const STAT_NAMES = ["Might", 'Dexterity', 'Intelligence', 'Sense', 'Charisma']
export const BASE_STATS = [-1, 0, 1, 2, 3]

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
    let bonuses = useConstBonusesFromSpells()
    let [selectedRaceName] = useSectionRaceName()
    let [experience, setExperience] = useExperience()

    useEffect(() => {
        checkStandardStats(stats)
    }, [selectedRaceName])

    const myRace = getRace(selectedRaceName)
    const exactStats = myRace?.['Custom Stat Array']
    const statRequirementCode = myRace?.['Stat Requirements']
    const levelError = checkLevel(level)
    

    function checkLevel(level) {
        const levelError = level <= 0? 'Your level should not be lower than 0': Math.floor(level) != level? 'Your level should not be decimal': null
        return levelError
    }
    function checkStandardStats(stats) {
        const statsCopy = [...stats].sort()
        const statArray = exactStats != null? exactStats: BASE_STATS
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
                    message: `Your stats might not respect your chosen race requirements: ${getRace(selectedRaceName).Creation['Stat Restrictions']}`
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

    function StatExplainedDisplay({ i, name, description, iconName, bonus }) {
        return (
            <TwoColumns className='margin-top-half'>
                <Column>
                    <div>
                        <SmallStat name={name} type="normal-large">
                            { calculateStat(STAT_NAMES[i], totalStats[i], bonus) }
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
                    <StatInput name="Level" value={level} onChange={val => {
                        setLevel(val)
                    }}/>
                </p>
                <div className="flex-column center-content" style={{width: '100%'}}>
                    <ExperienceSlider max={getExperienceByLevel(level)} initialValue={experience} onChange={val => setExperience(val)}>
                        asdadas
                    </ExperienceSlider>
                </div>
                { levelError && (
                    <div className="warning-toaster">{ levelError }</div>
                ) }
            </div>
            <div className="center-content">
                <QGTitle1 text="Stats" height={60}/>
                <p>As standard, use the numbers -1, 0, 1, 2, 3 and distribute them as you like among the 5 stats.</p>
                <p>{ myRace && myRace.Creation['Stat Restrictions'] != null && <span>Pay attention to your races's stat <i>restrictions</i>: {myRace.Creation['Stat Restrictions']}</span> }</p>
            </div>
            <div className="center-content flex" style={{gap: '2rem'}}>
                <div className="stats-selector">
                    { BASE_STATS.map((num, i) => (
                        <StatInput name={STAT_NAMES[i]} value={stats[i]} onChange={val => {
                            onStatChanged(i, val)
                        }}/>
                    )) }
                </div>
                <div style={{ width: '100%' }}>
                    <StatExplainedDisplay i={0} name="Extra Health" bonus={bonuses['Max Health'] ?? 0} iconName="Health" description={
                        <div>Your <b>Max Health</b> = Race Health + 200% of Might</div>
                    }/>
                    <StatExplainedDisplay i={1} name="Move Speed" bonus={bonuses['Movement Speed'] ?? 0} iconName="Speed" description={
                        <div>Your <b>Movement Speed</b> = 4 + 50% of Dexterity (<i>rounded up</i>)</div>
                    }/>
                    <StatExplainedDisplay i={2} name="Known Abilities" bonus={bonuses['Known Abilities'] ?? 0} iconName="Spell" description={
                        <div>Your <b>Number of Known Basic Abilities</b> = Intelligence</div>
                    }/>
                    <StatExplainedDisplay i={3} name="Extra Regen" iconName="HealthRegen" bonus={bonuses['Health Regen'] ?? 0} description={
                        <div>Your <b>Health Regen</b> = Race Health Regen + Sense</div>
                    }/>
                    <StatExplainedDisplay i={4} name="Initiative" bonus={bonuses['Initiative'] ?? 0} iconName="Replacement" description={
                        <div>
                            Your <b>Initiative</b> = 300% of Charisma
                            <div className="subtext margin-top-half">Initiative represents the order in which players and NPC's take turns.</div>
                        </div>
                    }/>
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

