import { useState } from "react"
import TwoColumns from "../../../components/TwoColumns/TwoColumns"
import Column from "../../../components/TwoColumns/Column"
import SmallStat from "../../../components/SmallStat/SmallStat"
import { calculateStat } from "../../../utils"
import Page from "../../../containers/Page/Page"
import { QGTitle1 } from "../../Tools/TitleGenerator"
import Icon from "../../../components/Icon"


function StatInput({ name, value, onChange }) {

    const [temporaryValue, setTemporaryValue] = useState(value)

    function onInputChange(newVal) {
        setTemporaryValue(newVal)
        console.log(`Triggering onInputChange with newVal ${newVal}`)
        if (parseInt(newVal) != NaN && newVal != '') {
            onChange(newVal)
        }
    }

    return (
        <div className="stat-input">
            <input value={temporaryValue} onChange={evt => onInputChange(evt.target.value)}/>
            <div className="input-name">{ name }</div>
        </div>
    )
}

export function StatValue({ name, value }) {
    return (
        <div className="stat-input">
            <div>{ value }</div>
            <div className="input-name">{ name }</div>
        </div>
    )
}

export const STAT_NAMES = ["Might", 'Dexterity', 'Intelligence', 'Sense', 'Charisma']
export const BASE_STATS = [-1, 0, 1, 2, 3]

export default function SectionStats({ onStatsChanged }) {
 
    const [stats, setStats] = useState(BASE_STATS)
    const [statsCorrectError, setStatsCorrectError] = useState(null)    /* { message: string } */

    function checkStandardStats(stats) {
        const statsCopy = [...stats].sort()
        const baseStatsCopy = [...BASE_STATS].sort()
        const isIncorrect = statsCopy.filter((stat, i) => baseStatsCopy[i] != stat).length > 0
        
        if (isIncorrect) {
            setStatsCorrectError({
                message: `Your stats might not respect the ${BASE_STATS.join(', ')} numbers, in any order.`
            })
            return
        }

        setStatsCorrectError(null)
    }

    function onStatChanged(i, val) {
        const statsCopy = [...stats]
        statsCopy[i] = val
        setStats(statsCopy)
        checkStandardStats(statsCopy)
        onStatsChanged(statsCopy)
    }

    function StatExplainedDisplay({ i, name, description, iconName }) {
        return (
            <TwoColumns className='margin-top-half'>
                <Column>
                    <div>
                        <SmallStat name={name} type="normal-large">
                            { calculateStat(STAT_NAMES[i], stats[i]) }
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
                <QGTitle1 text="Stats" height={60}/>
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
                    <StatExplainedDisplay i={0} name="Extra Health" iconName="Health" description={
                        <div>Your <b>Max Health</b> = Race Health + 200% of Might</div>
                    }/>
                    <StatExplainedDisplay i={1} name="Move Speed" iconName="Speed" description={
                        <div>Your <b>Movement Speed</b> = 4 + 50% of Dexterity (<i>rounded up</i>)</div>
                    }/>
                    <StatExplainedDisplay i={2} name="Known Abilities" iconName="Spell" description={
                        <div>Your <b>Number of Known Basic Abilities</b> = Intelligence</div>
                    }/>
                    <StatExplainedDisplay i={3} name="Extra Regen" iconName="HealthRegen" description={
                        <div>Your <b>Health Regen</b> = Race Health Regen + Sense (<i>rounded up</i>)</div>
                    }/>
                    <StatExplainedDisplay i={4} name="Initiative" iconName="Replacement" description={
                        <div>
                            Your <b>Initiative</b> = 300% of Charisma
                            <div className="subtext margin-top-half">Initiative represents the order in which players and NPC's take turns.</div>
                        </div>
                    }/>
                </div>
                <div className="center-content" style={{width: '100%'}}>
                    {/* <button onClick={checkStandardStats}>Check</button> */}
                    { statsCorrectError != null && (
                        <div className="warning-toaster">{ statsCorrectError.message }</div>
                    ) }
                </div>
            </div>
        </Page>
    )
}

