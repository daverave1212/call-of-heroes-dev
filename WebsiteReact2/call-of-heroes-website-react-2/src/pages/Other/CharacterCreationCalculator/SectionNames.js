import { useState } from "react";
import HeroButton from "../../../components/HeroButton/HeroButton";
import { IconWithSpinner } from "../../../components/Spell/Spell";
import { getUserState } from "../../../Auth";

function LabelWithInput({ labelText, onChange }) {

    const userState = getUserState()
    console.log(userState)
    const userName = userState?.name

    return (
        <div className="flex-column align-left">
            <label style={{marginBottom: '6px'}}>{ labelText }</label>
            <input className="text-input" value={userName} placeholder={userName} onChange={evt => onChange(evt.target.value)}/>
        </div>
    )
}

export default function SectionNames() {

    const [namesState, setNamesState] = useState({
        src: '/Icons/Spells/Skilled_in_Persuasion.png',
        playerName: '',
        characterName: ''
    })

    return (
        <div className="padding-top-4 flex-column align-center with-margined-children">
            <div className="center-content">
                <div className="ccc-image-holder">
                    <IconWithSpinner src="/Icons/Spells/Skilled_in_Persuasion.png"/>
                </div>
            </div>
            <div className="center-content">
                <LabelWithInput labelText="Player Name" onChange={val => {
                    setNamesState({...namesState, playerName: val})
                }}/>
            </div>
            <div className="center-content">
                <LabelWithInput labelText="Character Name" onChange={val => {
                    setNamesState({...namesState, characterName: val})
                }}/>
            </div>

            <br/>
            <div className="center-content">
                <HeroButton style={{maxWidth: '400px'}}>Next</HeroButton>
            </div>
        </div>
    )
}