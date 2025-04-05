







import { useEffect, useState } from "react";
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
import { getAllClasses, getClassRepresentativeIconName, getSpellIconPathByName, splitArrayEvenly } from "../../utils";
import Selector from "../../components/Selector/Selector";
import ManySpells from "../../components/Spell/ManySpells";

import overallData from './../../databases/OverallData.json'
import { connectFirestoreEmulator } from "firebase/firestore";

export function LabelWithInput({ labelText, placeholder }) {
    return (
        <div className="flex-column align-left">
            <label style={{marginBottom: '6px'}}>{ labelText }</label>
            <input/>
        </div>
    )
}

export default function CharacterCreationCalculator() {

    const [classesData, setClassesData] = useState(null)
    const [classObjectRows, setClassObjectRows] = useState([[], []])
    
    useEffect(() => {
        getAllClasses().then(classesObj => {
            setClassesData(classesObj)
            const classNames = Object.keys(classesObj)
            const classObjects = classNames.map(name => classesObj[name])
            const classObjectRows = splitArrayEvenly(classObjects, 2)
            setClassObjectRows(classObjectRows)
        })
    }, [])

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

    function ClassSpoilerSelector({ classObj }) {
        return (
            <Spoiler
                title={
                    <Selector
                        name={classObj.Class}
                        iconName={getClassRepresentativeIconName(classObj)}
                    />
                }
                content={
                    <div></div>
                }
            />
        )
    }

    return (
        <Page id="Character-Builder" isCentered={true}>
            <NameAndIcon/>

            <TwoColumns>
                <Column>
                    { classObjectRows[0].map(classObj => (
                        <ClassSpoilerSelector classObj={classObj}/>
                    )) }
                </Column>
                <Column>
                    { classObjectRows[1].map(classObj => (
                        <ClassSpoilerSelector classObj={classObj}/>
                    )) }
                </Column>
            </TwoColumns>
        </Page>
    )

}