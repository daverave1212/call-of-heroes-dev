
import ManySpells from '../../../components/Spell/ManySpells'
import { useLocalStorageState } from '../../../utils'
import nonCombatSkills from './../../../databases/Proficiencies.json'

export function useSkills() {
    let [skillNames, setSkillNames] = useLocalStorageState('SectionSkills', [])

    return [skillNames, setSkillNames]
}

export default function SectionSkills() {

    const [skillNames, setSkillNames] = useSkills()

    return (
        <ManySpells spells={nonCombatSkills} selectedSpellNames={skillNames} setSelectedSpellNames={setSkillNames}/>
    )
}