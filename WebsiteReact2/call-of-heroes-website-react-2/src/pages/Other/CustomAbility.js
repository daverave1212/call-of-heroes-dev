import React, { useState } from 'react'

import './CustomAbilityMaker.css'

import abilities from '../../databases/Abilities.json'
import spellSchoolDescriptions from '../../databases/Other/SpellSchoolDescriptions.json'

import PageH1 from '../../components/PageH1/PageH1'
import PageH3 from '../../components/PageH3/PageH3'
import ManySpells from '../../components/Spell/ManySpells'
import Page from '../../containers/Page/Page'
import { SideMenu } from '../../components/SideMenu/SideMenu'

import { spellsFromObject } from '../../utils.js'
import Spell from '../../components/Spell/Spell'
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import Column from '../../components/TwoColumns/Column'

import yaml from 'js-yaml'
import CoolButton from '../../components/CoolButton/CoolButton.js'

const exampleAbility = `
[{
    "Name": "Custom Ability",
    "CustomIconPath": "http://questguardrpg.com/Icons/Spells/Dash.png",

    "A": "1 Action",
    "Cost": "1 Mana",
    "Range": "10 meters",
    "Requirement": "Level 2",
    "Hands": "2-Handed Melee",
    "Special": "Special",
    "Duration": "1 minute",
    "Cooldown": "Once / Adventure",
    "Price": 100,

    "HasMixins": true,
    
    "Effect": "Deal 12 + ^Charisma^ Cold {Damage}Damage to a sentient Unit.\\n{Diamond}It becomes _Slowed_.\\nRequires 100{Gold}.",
    "Upgrade": "At Level 4, this deals 240 Damage.",
    "Notes": "Doesn't work on Units that can't feel fear.",

    "DoubleTable": {
        "Headers": ["Element", "Aftermath"],
        "Values": [
            "Fire", "Everything burns!!",
            "Cold", "Nothing burns...",
            "Shock", "Ouch."
        ]
    }
}, {
    "Name": "New Spell",
    "CustomIconPath": "http://questguardrpg.com/Icons/Spells/Dash.png",
    "Effect": "No effect!"
}]
`


export default function CustomAbility() {

    let [textareaText, setTextareaText] = useState(exampleAbility)
    let [jsonContent, setJsonContent] = useState(null)

    return (
        <div>
          <Page title="Custom Ability Maker">

                <p>
                    Spells in Questguard can be created from a piece of code called a JSON object.<br/>
                    The text editor below contains an example of a list of Spell JSON objects. Try to change various elements to see how it works! When your Spell code is finished, hit Create and you will get your Spells below. You can take a screenshot of the Ability using the Snip tool on Windows, then share it with others via copy/paste.<br/>
                    <br/>
                    If nothing happens when you press Create, it means there is an error in the JSON code. Make sure there is a comma after every line, and every string of text is surrounded in double quotes.<br/>
                </p>
                <PageH3>Specifics</PageH3>
                <ul>
                    <li>You can upload a custom image at imgur.com and get its URL for the CustomIconPath field.</li>
                    <li>A lot of fields are optional, but Name, CustomIconPath and Effect are mandatory.</li>
                    <li>HasMixins signals that the Effect will have special symbols or formatting.</li>
                    <li>I recommend finding an online guide and explanation for JSON objects.</li>
                </ul>

                <PageH3>JSON Code</PageH3>
              
                <textarea className='custom-ability-textarea' onChange={(e) => {
                    setTextareaText(e.target.value)
                }}>
                    {textareaText}
                </textarea>
        
                <div className='hero-buttons' style={{width: '100%'}}>
                    <CoolButton onClick={() => {
                        setJsonContent(JSON.parse(textareaText))
                        console.log({jsonContent})
                    }}>
                        Create
                    </CoolButton>

                    <CoolButton onClick={() => {
                        setJsonContent(yaml.load(textareaText))
                        console.log({jsonContent})
                    }}>
                        Create (YAML)
                    </CoolButton>
                </div>

                <br/>
                <br/>

                { jsonContent != null && (
                    Array.isArray(jsonContent) ? <ManySpells spells={jsonContent}/> : <ManySpells spells={[jsonContent]}/>
                ) }

          </Page>
        </div>
    )
}
