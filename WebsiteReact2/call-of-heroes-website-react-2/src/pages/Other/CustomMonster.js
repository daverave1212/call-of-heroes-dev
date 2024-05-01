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
import { CoolButton } from '../../components/CoolButton/CoolButton.js'
import MonsterBlock from '../../components/MonsterBlock/MonsterBlock.js'

import yaml from 'js-yaml'

const exampleMonster = `
{
    "Name": "Gargoyle",
    "Type": "Construct, Elemental",
    "Degree": "Epic x2",
    "Experience": "600 (300 x2)",
    "Stats": "7/0/0/0/0",
    "Armor": 3,
    "HPCoef": 1.15,
    "Speed": 3,
    "Initiative": 1,
    "Abilities": [
        {
            "Downslam": {
                "Damage": "7 Smash (or 2d6)",
                "Area Slam": "This hits all units within 2 meters of the Gargoyle. Destroys all stone or wood obstacles hit, spreading debris."
            }
        },
        {
            "Wingdraw (5m)": "Target a Unit.\\nPush away or pull (of choice) it and all other Medium or smaller Units within 2 meters of it in up to 3 meters.\\nThey all take 1d4 + 4 Force Damage.\\n"
        },
        {
            "Flame Breath": "All units in a 90*, 4 meter long cone make a 10 Grade Dexterity Check.\\nOn fail, they take 9 Fire Damage (or 3d4 + 1).\\nOn success, they take half (4).\\n"
        }
    ],
    "Passives": [
        {
            "Searing Cracks": "When the Gargoyle drops below 50% HP, blinding fire is emmited from its cracks. All Units that can see it must succeed a 12 Dexterity of Sense Check (of choice) or be Blinded."
        },
        {
            "Resistances": "Takes only 50% Fire, Shock and Psychic Damage."
        },
        {
            "Weaknesses": "Takes 150% Smash and Force Damage."
        }
    ],
    "Avoids AoE": false,
    "Behavior": "Gargoyles glide and try to position themselves to hit as many enemies as possible.\\nIf they are pretending to be statues, it is hard for them to ambush the players, since they are large, heavy and hard to not notice.\\n",
    "Pair": "Pair with another Gargoyle for a deadly encounter.",
    "Lore": "Gargoyles are large statues with wings.\\nUnless they must fight, they will remain unmoving and indistinguishable from a regular statue.\\nDue to their heavy nature, their flight is limited.\\nThey can glide, but they can't stay in the air for very long.\\n\\nIf you wish to have non-fire Gargoyles, 'reskin' Flame Breath to a large sweep attack, and Searing Cracks becomes a large gust of wind from its wings that Dazes instead of Blinds (regardless of whether Units see the Gargoyle or not).\\n",
    "Suggested Obstacles": [
        "Crevices and Cliffs",
        "Explosive Barrels",
        "Oil Spills"
    ],
    "Monster Data": "No tactic, mid HP, no gimmick",
    "Role": "Main Enemy",
    "Variants": "Gargoyle (Smaller) - you can make a custom 300 XP Gargoyle with 60 HP, a speed of 6 and only one Action per turn. Feel free to use any of its Abilities in any order.\\n",
    "Story Ideas": "While on their way to the mission, a group of adventurers approach an ominous building with two Gargoyle statues at its entrance.\\nThose two statues are actually just statues - the real Gargoyle is inside the building.\\nOr, simply have a Gargoyle attack the players before they enter the building - a separate Gargoyle, different from the regular statues.\\nThey won't expect either of these scenarios!\\n",
    "Valuable Loot": "Gem Eyes (65g each), Magic Core Heart (200g) - used by Artificers to create golems"
}
`

export default function CustomMonster() {

    let [textareaText, setTextareaText] = useState(exampleMonster)
    let [jsonContent, setJsonContent] = useState(null)

    return (
        <div>
          <Page title="Custom Monster Maker">

                <p>
                    Monsters in Questguard can be created from a piece of code called a JSON object.<br/>
                    The text editor below contains an example of a Monster JSON object. Try to change various elements to see how it works! When your Monster code is finished, hit Create and you will get your Monsters below. You can take a screenshot of the Monster using the Snip tool on Windows, then share it with others via copy/paste.<br/>
                    <br/>
                    If nothing happens when you press Create, it means there is an error in the JSON code. Make sure there is a comma after every line, and every string of text is surrounded in double quotes.<br/>
                </p>
                <PageH3>Fields Explained</PageH3>
                <ul>
                    <li><b>Degree</b>: put in either "Normal" or "Epic xNumber".</li>
                    <li><b>Experience</b>: put in either a plain number (no quotes), or follow the pattern of "Number (Number xNumber)" (with double quotes). Follow this pattern exactly if your monster is Epic.</li>
                    <li><b>HPCoef</b>: this is a number for autocalculation of HP. If you put in 1, that means 100% of the average monster HP for the given XP. This works for Epic monsters as well. If you put 1.5, it means 150% of average HP. It may not work for unusual XP numbers. Try it out!</li>
                    <li><b>Abilities</b>: Each Ability is a JSON object with a name as the field, and either a normal string as a value, or a more detailed object. You can put in any of the fields availble in the Custom Ability Creator JSON as well. Any field not found in the list of built-in fields becomes a special text in italics.</li>

                </ul>
                <PageH3>Tips</PageH3>
                <ul>
                    <li>Use \n to leave a new line.</li>
                    <li>If you prefer to write YAML code instead of JSON, use the Create (YAML) button (see YAML online). It should respect the exact same structure.</li>
                    <li>You can upload a custom image at imgur.com and get its URL for the CustomIconPath field.</li>
                    <li>A lot of fields are optional.</li>
                    <li>I recommend finding an online guide and explanation for JSON objects.</li>
                </ul>

                <PageH3>Code</PageH3>
              
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

                { jsonContent != null && <MonsterBlock monster={jsonContent}/> }

          </Page>
        </div>
    )
}