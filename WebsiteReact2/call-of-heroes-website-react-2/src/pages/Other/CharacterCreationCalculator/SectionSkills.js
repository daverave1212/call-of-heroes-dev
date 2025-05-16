
import ManySpells from '../../../components/Spell/ManySpells'
import nonCombatSkills from './../../../databases/Proficiencies.json'
import { useSkills } from './CharacterData'



export default function SectionSkills() {

    const [skillNames, setSkillNames] = useSkills()

    return (
        <ManySpells spells={nonCombatSkills} selectedSpellNames={skillNames} setSelectedSpellNames={setSkillNames}/>
    )
}