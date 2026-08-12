import { getAvailableStatPointsByLevel, getStatBonusObjByPointsInvested, getStatValueByName } from "../../../../../services/game-lib/stat-calculations"
import { ChangeStatDialogTypes } from "../ChangeStatDialog"

// Was used when I was trying out stat up by poins invested (scaling Stats).
// Was inserted right in MyCharacter code.

export function modifyManualStatBonus({
    name,
    setStatDialogOptions,
    statPointsArray,
    autoStatPointsArray,
    totalInvestedStatPoints,
    level
}) {
    setStatDialogOptions({
        id: 'Stat-Change-Dialog',
        type: ChangeStatDialogTypes.FRACTION,
        defaultNumberValue: getStatValueByName(name, statPointsArray),
        title: "Invest Stat Points into " + name,
        shouldPlayAnimation(num, delta) {
            const { fraction, number, pointsLeft, value } = getStatBonusObjByPointsInvested(num)
            return fraction == 0 && delta > 0
        },
        displayName: num => `${num} ${name} Points Total`,
        displayValue: num => getStatBonusObjByPointsInvested(num).value,
        displayTitle: (num, delta) => {
            const invested = totalInvestedStatPoints + delta
            const availableStatPoints = getAvailableStatPointsByLevel(level)
            const isAvailablePointsRed = invested > availableStatPoints
            return <span className="home-font" style={{color: isAvailablePointsRed? 'red': ''}}>
                Add Stat Points to {name}
            </span>
        },
        displayDescription: (num, delta) => {
            const autoBonus = getStatValueByName(name, autoStatPointsArray)
            const newManualBonus = num - autoBonus
            return <>
                <span className="home-font" >Points Invested: <strong>{newManualBonus}</strong></span>
                <br/>
                <span className="home-font" >Extra from other sources: <strong>{autoBonus}</strong></span>
            </>
        },
        onDone: (({ value }) => {
            console.green(`For ${name} going from ${manualBonuses[name]} to ${value}`)
            const autoBonus = getStatValueByName(name, autoStatPointsArray)
            const newManualBonus = value - autoBonus
            console.log({autoBonus, newManualBonus})
            const newManualBonuses = {
                ...manualBonuses,
                [name]: newManualBonus
            }
            setManualBonuses(newManualBonuses)
        }),
        displayProgressBarValue(num, delta) {
            const { fraction, number, pointsLeft, value } = getStatBonusObjByPointsInvested(num)
            return pointsLeft
        },
        displayProgressBarMax(num, delta) {
            const { fraction, number, pointsLeft, value, costForPlus1 } = getStatBonusObjByPointsInvested(num)
            return costForPlus1
        }
    })
}