











/* DEPRECATED */

import { useState } from "react";
import overallData from '../../databases/OverallData.json'
import { Races, Classes } from '../Other/AllRacesAndClasses'
import SmallStat from "../../components/SmallStat/SmallStat";
import Page from "../../containers/Page/Page";
import TwoColumns from "../../components/TwoColumns/TwoColumns";
import Column from "../../components/TwoColumns/Column";

import './CharacterCreationCalculator.css'
import { IconWithSpinner, SpellTopIconSide } from "../../components/Spell/Spell";
import { CoolButton } from "../../components/CoolButton/CoolButton";
import HeroButton from "../../components/HeroButton/HeroButton";

export function LabelWithInput({ labelText, placeholder }) {
    return (
        <div className="flex-column align-left">
            <label style={{marginBottom: '6px'}}>{ labelText }</label>
            <input/>
        </div>
    )
}

export default function CharacterCreationCalculator() {

    let [state, setState] = useState({
        Race: 'Bertle',
        Class: 'Cleric',

        'Main Stat': 'Sense',

        Level: '1',

        Might: 0,
        Dexterity: 0,
        Intelligence: 0,
        Sense: 0,
        Charisma: 0
    })

    return (
        <Page id="Character-Builder" isCentered={true}>
            <br/><br/><br/><br/>
            <div className="flex-column align-center with-margined-children">
                <div className="center-content">
                    <div className="ccc-image-holder">
                        <IconWithSpinner src="/Icons/Spells/Skilled_in_Persuasion.png"/>
                    </div>
                    {/* <img src="/Icons/Spells/Skilled_in_Persuasion.png"/> */}
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


        </Page>
    )

}