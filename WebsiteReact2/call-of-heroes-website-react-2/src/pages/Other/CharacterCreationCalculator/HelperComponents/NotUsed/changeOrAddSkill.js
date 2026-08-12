import { isNumber } from "../../../../../utils"

function changeSkillBonus({
    name,
    manualSkillBonuses,
    setManualSkillBonuses,
    setStatDialogOptions,
}) {
    const isBonusFromOtherSource = !(name in manualSkillBonuses)
    if (isBonusFromOtherSource) {
        manualSkillBonuses[name] = 0
    }
    setStatDialogOptions({
        defaultInputValue: null,
        defaultNumberValue: manualSkillBonuses[name],
        onDone: ({ value }) => setManualSkillBonuses({
            ...manualSkillBonuses,
            [name]: value
        })
    })
}


function addSkillBonus({
    setStatDialogOptions,
    manualSkillBonuses,
    setManualSkillBonuses,
}) {
    setStatDialogOptions({
        defaultInputValue: '',
        defaultNumberValue: 0,
        title: "New Skill",
        description: `Add new Non-Combat Skill.`,
        onDone: ({ name, value }) => {
            const newManualSkillBonuses = {...manualSkillBonuses, [name]: value}
            for (const [key, value] of Object.entries(newManualSkillBonuses)) {
                if (key == null || key?.length == 0 || value == null || value == 0 || !isNumber(value)) {
                    delete newManualSkillBonuses[key]
                }
            }
            setManualSkillBonuses(newManualSkillBonuses)
        }
    })
}