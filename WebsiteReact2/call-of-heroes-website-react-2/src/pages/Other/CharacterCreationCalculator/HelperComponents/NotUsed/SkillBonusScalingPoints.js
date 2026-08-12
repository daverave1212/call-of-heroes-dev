import Icon from "../../../../../components/Icon"
import NumberAligner from "../../../../../components/NumberAligner/NumberAligner"

export const SkillBonusScalingPoints = ({name, skillPointsInvested}) => {
    const { value, fraction } = getStatBonusObjByPointsInvested(skillPointsInvested)
    const valueWithFraction = value + fraction
    // console.green(`Making SkillBonus for ${name} with ${skillPointsInvested} points in it.`)
    return <div className="skill-bonus text-font pointer" onClick={() => changeSkill(name)}>
        <div className="left">
            <Icon name="CharacterSetupSub"/> {name}
        </div>
        <div className="right">
            <NumberAligner number={valueWithFraction} includePlus={true} isFractionGray={true}/>
            {/* <GrayFractionText value={valueWithFraction} reduceFontSize={false} includePlus={true}/> */}
        </div>
    </div>
}