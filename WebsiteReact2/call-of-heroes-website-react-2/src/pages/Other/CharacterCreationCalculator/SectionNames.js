import { useState } from "react";
import HeroButton from "../../../components/HeroButton/HeroButton";
import { IconWithSpinner } from "../../../components/Spell/Spell";
import { getUserState, useAuth } from "../../../Auth";
import { useLocalStorageState } from "../../../utils";
import { useSectionNamesState } from "./CharacterData";
import Input from "../../../components/Input/Input";

export function LabelWithInput({ labelText, value='d', onChange }) {

    const [inputValue, setInputValue] = useState(value)

    return (
        <div className="flex-column align-left">
            <label style={{marginBottom: '6px'}}>{ labelText }</label>
            <Input className="text-input" value={value} placeholder="Name" onChange={newValue => {
                onChange(newValue)
            }}/>
        </div>
    )
}

function NameInput() {

    const { user } = useAuth('NameInput')

    return (
        <div className="flex-column align-left">
            <label style={{marginBottom: '6px'}}>Player Name</label>
            <input readOnly className="text-input" value={user != null? user.name: ''}/>
        </div>
    )
}

export default function SectionNames({ onChange }) {

    const [namesState, setNamesState] = useSectionNamesState()

    function onClickOnPortrait() {
        const url = prompt('Enter image URL')
        setNamesState({...namesState, src: url})
    }

    return (
        <div className="padding-top-4 flex-column align-center with-margined-children">
            <div className="center-content">
                <div className="ccc-image-holder" onClick={onClickOnPortrait}>
                    <IconWithSpinner className="pointer" src={namesState.src}/>
                </div>
            </div>
            <div className="center-content">
                <NameInput/>
            </div>
            <div className="center-content">
                <LabelWithInput value={namesState.characterName} labelText="Character Name" onChange={val => {
                    const newState = {...namesState, characterName: val}
                    console.log(`New Name: ${newState.characterName}`)
                    setNamesState(newState)
                    onChange(newState)
                }}/>
            </div>

            <br/>
            <div className="center-content">
                <HeroButton style={{maxWidth: '400px'}}>Next</HeroButton>
            </div>
        </div>
    )
}