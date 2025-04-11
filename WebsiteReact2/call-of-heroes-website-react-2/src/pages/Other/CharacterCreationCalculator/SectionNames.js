import { useState } from "react";
import HeroButton from "../../../components/HeroButton/HeroButton";
import { IconWithSpinner } from "../../../components/Spell/Spell";
import { getUserState, useAuth } from "../../../Auth";
import { useLocalStorageState } from "../../../utils";

function LabelWithInput({ labelText, value='d', onChange }) {

    const [inputValue, setInputValue] = useState(value)

    return (
        <div className="flex-column align-left">
            <label style={{marginBottom: '6px'}}>{ labelText }</label>
            <input className="text-input" value={inputValue} placeholder={'Name'} onChange={evt => {
                setInputValue(evt.target.value)
                onChange(evt.target.value)
            }}/>
        </div>
    )
}

function NameInput() {

    const { user } = useAuth('NameInput')

    return (
        <div className="flex-column align-left">
            <label style={{marginBottom: '6px'}}>Player Name</label>
            <input className="text-input" value={user != null? user.name: ''}/>
        </div>
    )
}

export const BASE_NAMES_STATE = {
    src: '/Icons/Spells/Skilled_in_Persuasion.png',
    playerName: '',
    characterName: ''
}

export function useSectionNamesState() {
    return useLocalStorageState('SectionNamesNames', BASE_NAMES_STATE)
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
                    <IconWithSpinner src={namesState.src}/>
                </div>
            </div>
            <div className="center-content">
                <NameInput/>
                {/* <LabelWithInput labelText="Player Name" onChange={val => {
                    const newState = {...namesState, playerName: val}
                    setNamesState(newState)
                    onChange(newState)
                }}/> */}
            </div>
            <div className="center-content">
                <LabelWithInput value={namesState.characterName} labelText="Character Name" onChange={val => {
                    const newState = {...namesState, characterName: val}
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