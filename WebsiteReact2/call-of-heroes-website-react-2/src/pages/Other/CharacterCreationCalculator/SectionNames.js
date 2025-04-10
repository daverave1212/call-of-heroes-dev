import HeroButton from "../../../components/HeroButton/HeroButton";
import { IconWithSpinner } from "../../../components/Spell/Spell";
import { LabelWithInput } from "./CharacterCreationCalculator";

export default function SectionNames() {
    return (
        <div className="padding-top-4 flex-column align-center with-margined-children">
            <div className="center-content">
                <div className="ccc-image-holder">
                    <IconWithSpinner src="/Icons/Spells/Skilled_in_Persuasion.png"/>
                </div>
            </div>
            <div className="center-content">
                <LabelWithInput labelText="Player Name"/>
            </div>
            <div className="center-content">
                <LabelWithInput labelText="Character Name"/>
            </div>

            <br/>
            <div className="center-content">
                <HeroButton style={{maxWidth: '400px'}}>Next</HeroButton>
            </div>
        </div>
    )
}