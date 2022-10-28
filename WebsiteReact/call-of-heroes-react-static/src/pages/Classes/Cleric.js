import React from 'react'

import PageH1 from '../../components/PageH1/PageH1'
import PageH2 from '../../components/PageH2/PageH2'
import PageH3 from '../../components/PageH3/PageH3'

import SmallStat from '../../components/SmallStat/SmallStat'
import SmallStatList from '../../components/SmallStat/SmallStatList'


import Separator from '../../components/Separator/Separator'
import TableNormal from '../../components/TableNormal/TableNormal'
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import Column from '../../components/TwoColumns/Column'

import Spell from '../../components/Spell/Spell'

export default () => (
  <div>
    
    <PageH1>Cleric</PageH1>
    <br/>

    <TwoColumns>
        <Column>

            Cleric Abilities are Exhaust-based.
            As a Cleric, you know a certain number of Advanced Abilities.
            You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.
            Advanced Abilities are all Abilities from the Spell Lists listed as Advanced.
            If an Ability is not listed as Advanced, you can use it as many times as you like.

            <Separator/>

            Cleric Abilities are Exhaust-based.
            As a Cleric, you know a certain number of Advanced Abilities.
            You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.
            Advanced Abilities are all Abilities from the Spell Lists listed as Advanced.
            If an Ability is not listed as Advanced, you can use it as many times as you like.

            <Separator/>

            Cleric Abilities are Exhaust-based.
            As a Cleric, you know a certain number of Advanced Abilities.
            You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.
            Advanced Abilities are all Abilities from the Spell Lists listed as Advanced.
            If an Ability is not listed as Advanced, you can use it as many times as you like.
            As a Cleric, you know a certain number of Advanced Abilities.
            You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.
            Advanced Abilities are all Abilities from the Spell Lists listed as Advanced.

        </Column>
        <Column>
            <img className="class-image" src="/Classes/Cleric.png"/>
        </Column>
    </TwoColumns>

    <PageH2>Class Features</PageH2>

    <TwoColumns>
        <Column>
            <SmallStat name="Health">20</SmallStat>
            <SmallStat name="Armor Training">Medium and Light Armor</SmallStat>
            <SmallStat name="Language" topDown='true'>If your Intelligence is at least 2, choose one Higher or Common language you can speak.</SmallStat>
        </Column>
        <Column>
            <p>You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.</p>
        </Column>
    </TwoColumns>
    
    <PageH3>Leveling Up</PageH3>

    <TwoColumns>
        <Column>
            <TableNormal type='info' columns={['Level', 'You Get...']}>
                <tr>
                    <td>Level 1</td>
                    <td>Choose your Specialization</td>
                </tr>
                <tr>
                    <td>Level 2</td>
                    <td>Talent from your Specialization (Tier 1)</td>
                </tr>
                <tr>
                    <td>Level 3</td>
                    <td>+1 in any Stat<br/>+1 Training Point<br/>+1 Feat</td>
                </tr>
                <tr>
                    <td>Level 4</td>
                    <td>Talent from your Specialization (Tier 2)</td>
                </tr>
                <tr>
                    <td>Level 5</td>
                    <td>Action Surge (see below)</td>
                </tr>
                <tr>
                    <td>Level 6</td>
                    <td>Talent from your Specialization (Tier 3)</td>
                </tr>
                <tr>
                    <td>Level 7</td>
                    <td>+1 in any Stat<br/>+1 Training Point<br/>+1 Feat</td>
                </tr>
                <tr>
                    <td>Level 8</td>
                    <td>Talent from your Specialization (Tier 4)</td>
                </tr>
                <tr>
                    <td>Level 9</td>
                    <td>Pick one more talent from Tier 2 or Tier 4.</td>
                </tr>
                <tr>
                    <td>Level 10</td>
                    <td>Talent from your Specialization (Tier 5)</td>
                </tr>
            </TableNormal>
        </Column>
        <Column>
            <p>When you level up, you gain +5 Health and +1 known Advanced Spell.
            Aside from this, you also get other bonuses depending on the level.
            Refer to this table to see what you get!</p>

            <Separator/>

            <p>Once you reach Level 4, you unlock the Action Surge Ability.</p>

            <Spell spell={{
                Name: '~skill_00004~',
                A: '0 Actions',
                Effect: `Gain 0.5 Actions this turn only.`,
                Cooldown: 'Long Rest',
                Cost: '1 Charge',
                Notes: 'You unlock this Ability at level 4.',
            }}/>

            <p>If you are using a 2-Handed weapon, use the 0.5 Actions for an Ability that costs 0.5 Actions.</p>

            <Separator/>

            <p>At level 9, you pick another talent from either Tier 3 or Tier 4. Alternatively, you can get a Feat instead.</p>
        </Column>
    </TwoColumns>

    

    <PageH2>Spell Casting</PageH2>

    <TwoColumns>
        <Column>
            <PageH3>Spell Stats</PageH3>
            <SmallStat name="Spellcasting Style" color="blue">Exhaust-based</SmallStat>
            <SmallStat name="Main Stat" color="blue">Choose permanently: Wisdom or Charisma</SmallStat>
            <SmallStat name="Spell Grade" color="blue">6 + Main Stat</SmallStat>
            <PageH3>Known Spells</PageH3>
            <SmallStat name="Known Basic Spells" color="blue">2 + Your Intelligence</SmallStat>
            <SmallStat name="Known Advanced Spells" color="blue">2 + Your Level</SmallStat>
            <PageH3>Spell Lists</PageH3>
            <SmallStatList name="Spell Lists" color="blue">
                <div>Mysticism</div>
                <div>Divine</div>
            </SmallStatList>
        </Column>
        <Column>
            <PageH3>Explenation</PageH3>
            Cleric Abilities are Exhaust-based.
            As a Cleric, you know a certain number of Advanced Abilities.
            You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.<br/>
            Advanced Abilities are all Abilities from the Spell Lists listed as Advanced.
            If an Ability is not listed as Advanced, you can use it as many times as you like.
            <Separator/>
            All Cleric-specific abilities are considered spells (unless stated otherwise).
            <PageH3>Changing Spells</PageH3>
            You can change your known Spells (not Talents) when taking a Long Rest.<br/>
            Talents can't generally be changed once picked; they are permenant decisions.
        </Column>
    </TwoColumns>

    <PageH3>Starting Abilities</PageH3>
    <TwoColumns>
        <Column>
            <Spell spell={{
                Name: '~Awe~',
                A: '0 Actions',
                Range: '5 meters',
                Effect: `
                    Instantly heal or damage a target for 1d4 (True damage).
                    You can do this once per Long Rest.
                    Some other Cleric spells will cast Awe for free.
                `,
                Cooldown: '1 use / Long Rest',
                Cost: '1 Charge',
                Notes: 'You can only use this while outdoors and while you have a really cute doggo nearby.',
                Requirement: 'None'
            }}/>
        </Column>
        <Column></Column>
    </TwoColumns>



  </div>
)
