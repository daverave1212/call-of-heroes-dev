







import { useState } from "react";
import overallData from '../../databases/OverallData.json'
import { Races, Classes } from '../Other/AllRacesAndClasses'
import SmallStat from "../../components/SmallStat/SmallStat";
import Page from "../../containers/Page/Page";
import TwoColumns from "../../components/TwoColumns/TwoColumns";
import Column from "../../components/TwoColumns/Column";
import Spoiler from "../../components/Spoiler/Spoiler";

import './CharacterCreationCalculator.css'
import { IconWithSpinner, SpellTopIconSide } from "../../components/Spell/Spell";
import { CoolButton } from "../../components/CoolButton/CoolButton";
import HeroButton from "../../components/HeroButton/HeroButton";
import { getSpellIconPathByName } from "../../utils";

export function LabelWithInput({ labelText, placeholder }) {
    return (
        <div className="flex-column align-left">
            <label style={{marginBottom: '6px'}}>{ labelText }</label>
            <input/>
        </div>
    )
}

export default function CharacterCreationCalculator() {

    function NameAndIcon() {
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

    function Selector({ name, iconName}) {
        return (
            <div class="selector">
                <div className="flex">
                    <div className="icon-wrapper">
                        <img src={`${getSpellIconPathByName(iconName)}`}/>
                    </div>
                    <div className="name-wrapper">{ name }</div>
                </div>
            </div>
        )
    }

    return (
        <Page id="Character-Builder" isCentered={true}>
            <NameAndIcon/>

            <TwoColumns>
                <Column>
                    <Spoiler title={<Selector name="Cleric" iconName="Taunt"/>} content={<div>
                        <p>asdadasd</p>
                        <p>asdadasd</p>
                        <p>asdadasd</p>
                        <p>asdadasd</p>
                        <p>asdadasd</p>
                        <p>asdadasd</p>
                    </div>}/>
                    <Selector name="Cleric" iconName="Taunt"/>
                    <Selector name="Cleric" iconName="Taunt"/>
                    <Selector name="Cleric" iconName="Taunt"/>
                </Column>
                <Column>
                    <Selector name="Cleric" iconName="Taunt"/>
                    <Selector name="Cleric" iconName="Taunt"/>
                    <Selector name="Cleric" iconName="Taunt"/>
                    <Selector name="Cleric" iconName="Taunt"/>
                </Column>
            </TwoColumns>
        </Page>
    )

}