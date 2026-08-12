import Icon from "../../../../../components/Icon"

export const SkillBonusWithNumber = ({name, value, changeSkill}) => {
    return <div className="skill-bonus text-font pointer" onClick={() => changeSkill(name)}>
        <div className="left">
            <Icon name="CharacterSetupSub"/> {name}
        </div>
        <div className="right">
            {value}
        </div>
    </div>
}