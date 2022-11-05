import React from 'react'
import { useState } from 'react'
import YAML from 'yaml'

import * as U from '../../utils'

import PageH1 from '../../components/PageH1/PageH1'
import PageH2 from '../../components/PageH2/PageH2'
import PageH3 from '../../components/PageH3/PageH3'

import SmallStat from '../../components/SmallStat/SmallStat'
import SmallStatList from '../../components/SmallStat/SmallStatList'

import Separator from '../../components/Separator/Separator'
import TableNormal from '../../components/TableNormal/TableNormal'
import TableNormalLevelUpExhaust from '../../components/TableNormal/TableNormalLevelUpExhaust'
import TwoColumns from '../../components/TwoColumns/TwoColumns'
import Column from '../../components/TwoColumns/Column'

import Spell from '../../components/Spell/Spell'
import Icon from '../../components/Icon'

import * as theClass from '../../databases/Classes/Cleric.json'
import * as classAbilities from '../../databases/ClassAbilities.json'
import ManySpells from '../Spell/ManySpells'
import TableNormalLevelUpWarlock from '../TableNormal/TableNormalLevelUpWarlock'

export function ClassFeatures({ theClass }) {
    return (
        <div>
            <PageH2>Class Features</PageH2>

            <TwoColumns>
                <Column>
                    <SmallStat name="Health">{ theClass['Base Health'] }</SmallStat>
                    <SmallStat name="Armor Training">{ theClass['Armor Training'] }</SmallStat>
                    { theClass['Language'] && <SmallStat name="Language" topDown='true'>{ theClass['Language'] }</SmallStat> }
                </Column>
                <Column>
                    <PHealthAndArmor/>
                </Column>
            </TwoColumns>
        </div>
    )
}

export function LevelingUp({ theClass }) {
    return (
        <div>
            <PageH3>Leveling Up</PageH3>
    
            <TwoColumns type="normal">
                <Column>
                    {
                        theClass['Spellcasting']['Type'] == 'Special Charge-based'? (
                            <TableNormalLevelUpWarlock/>
                        ) : (
                            <TableNormalLevelUpExhaust/>
                        )
                    }
                </Column>
                <Column>
                    {
                        theClass['Spellcasting']['Type'] == 'Exhaust-based'? (
                            <div>
                                <TableNormal columns={['Every Level Above 1 You Get...']}>
                                    <tr>
                                        <td>
                                            { theClass['Level Up']['Every Level']['Health'] } <Icon name="Health"/>Health
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            1 Known Advanced Spell
                                        </td>
                                    </tr>
                                </TableNormal>
                
                                <p>
                                    When you level up (e.g. Level 1 to Level 2), you gain some Health and a Known Advanced Spell.
                                    Also, depending on your level, you also gain something else (see the table on the left).
                                </p>
                
                                <p>Once you reach Level 4, you unlock the Action Surge Ability.</p>
                
                                <Spell spell={classAbilities['~Action Surge~']}/>
                            </div>
                        ) :
                        theClass['Spellcasting']['Type'] == 'Charge-based'? (
                            <div>
                                <TableNormal columns={['Every Level Above 1 You Get...']}>
                                    <tr>
                                        <td>
                                            { theClass['Level Up']['Every Level']['Health'] } <Icon name="Health"/>Health
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            1 Known Spell
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            1 Extra <Icon name="Charge"/>Charge
                                        </td>
                                    </tr>
                                </TableNormal>
                
                                <p>
                                    When you level up (e.g. Level 1 to Level 2), you gain some Health and a Known Spell.
                                    You also gain 1 more Charge per Long Rest (raises your maximum number of Charges).
                                    Also, depending on your level, you also gain something else (see the table on the left).
                                </p>
                
                                <p>Once you reach Level 4, you unlock the Action Surge Ability.</p>
                
                                <Spell spell={classAbilities['~Action Surge~']}/>
                            </div>
                        ) :
                        theClass['Spellcasting']['Type'] == 'Special Charge-based'? (
                            <div>
                                <TableNormal columns={['Every Level Above 1 You Get...']}>
                                    <tr>
                                        <td>
                                            { theClass['Level Up']['Every Level']['Health'] } <Icon name="Health"/>Health
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            1 Known Spell
                                        </td>
                                    </tr>
                                </TableNormal>
                
                                <p>
                                    When you level up (e.g. Level 1 to Level 2), you gain some Health and a Known Spell.
                                    You also gain 1 more Charge per Long Rest (raises your maximum number of Charges).
                                    Also, depending on your level, you also gain something else (see the table on the left).
                                </p>
                
                                <p>Once you reach Level 4, you unlock the Action Surge Ability.</p>
                
                                <Spell spell={classAbilities['~Action Surge~']}/>
                            </div>
                        ) : (
                            null
                        )
                    }
                </Column>
            </TwoColumns>
        </div>
    )
}


export function SpellCasting({ theClass }) {

    function ChargeBasedSpellcasting() {
        return (
            <div>
                <PageH3>Charge-Based Spellcasting</PageH3>
                <p>{ theClass.Class } Abilities are Charge-based.</p>
                As a { theClass.Class }, you have a number of Charges.
                To cast any Advanced Ability from your known spells, you must expend 1 Charge (or according to its Cost).
                You don't have restrictions for how many times you can cast a spell per Long Rest, but you have restrictions on your Charges.
                <Separator/>
                All your Charges recharge when you finish a Long Rest.
                Advanced Abilities are all Abilities from the Spell Lists listed as Advanced.
                <br/><br/>
                <PageH3>Changing Spells</PageH3>
                You can change your known Spells (not Talents) when taking a Long Rest.<br/>
                Talents can't generally be changed once picked; they are permenant decisions.
                { theClass.Spellcasting.Other }
            </div>
        )
    }
    function ExhaustBasedSpellcasting() {
        return (
            <div>
                <PageH3>Exhaust-Based Spellcasting</PageH3>
                <p>{ theClass.Class } Abilities are Exhaust-based.</p>
                As a { theClass.Class }, you know a certain number of Advanced Abilities.
                You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.<br/>
                <Separator/>
                All your Abilities Un-exhaust when you finish a Long Rest.
                Advanced Abilities are all Abilities from the Spell Lists listed as Advanced.
                <br/><br/>
                <PageH3>Changing Spells</PageH3>
                You can change your known Spells (not Talents) when taking a Long Rest.<br/>
                Talents can't generally be changed once picked; they are permenant decisions.
                { theClass.Spellcasting.Other }
            </div>
        )
    }
    function SpecialChargeBasedSpellcasting() {
        return (
            <div>
                <PageH3>Special Charge-Based Spellcasting</PageH3>
                <p>{ theClass.Class } Abilities are Charge-based, with a twist.</p>
                As a { theClass.Class }, you have a number of Charges.
                Unlike other Charge-based classes, your Charges instantly reset 10 minutes after finishing every combat encounter (if you don't enter another combat meanwhile).
                <Separator/>
                Advanced Abilities are all Abilities from the Spell Lists listed as Advanced.
                <br/><br/>
                <PageH3>Changing Spells</PageH3>
                You can change your known Spells (not Talents) when taking a Long Rest.<br/>
                Talents can't generally be changed once picked; they are permenant decisions.
                { theClass.Spellcasting.Other }
            </div>
        )
    }

    return (
        <div>
            <PageH2>Spell Casting</PageH2>

            <TwoColumns>
                <Column>
                    <PageH3>Spell Stats</PageH3>
                    <SmallStat name="Spellcasting Style" color="blue">{ theClass['Spellcasting']['Type'] }</SmallStat>
                    <SmallStat name="Main Stat" color="blue">{ theClass['Spellcasting']['Main Stat'] }</SmallStat>
                    <SmallStat name="Enemy Check Grade" color="blue">{ theClass['Spellcasting']['Spell DC'] }</SmallStat>
                    <PageH3>Known Spells</PageH3>
                    {
                        theClass['Spellcasting']['Known Basic Spells'] != null && (
                            <SmallStat name="Known Basic Spells" color="blue">
                                { theClass['Spellcasting']['Known Basic Spells'] }
                            </SmallStat>
                        )
                    }
                    {
                        theClass['Spellcasting']['Known Advanced Spells'] != null && (
                            <SmallStat name="Known Advanced Spells" color="blue">
                                { theClass['Spellcasting']['Known Advanced Spells'] }
                            </SmallStat>
                        )
                    }
                    {
                        theClass['Spellcasting']['Known Spells'] != null && (
                            <SmallStat name="Known Spells" color="blue">
                                { theClass['Spellcasting']['Known Spells'] }
                            </SmallStat>
                        )
                    }
                    <PageH3>Spell Lists</PageH3>
                    <SmallStatList name="Spell Lists" color="blue">
                        {
                            theClass['Spellcasting']['Spell Lists'].map(spellCategory => (
                                <div key={spellCategory}>{ spellCategory }</div>
                            ))
                        }
                    </SmallStatList>
                </Column>
                <Column>
                        {
                            theClass.Spellcasting.Type == 'Charge-based' ? (
                                <ChargeBasedSpellcasting/>
                            ) : 
                            theClass.Spellcasting.Type == 'Exhaust-based' ? (
                                <ExhaustBasedSpellcasting/>
                            ) : 
                            theClass.Spellcasting.Type == 'Special Charge-based' ? (
                                <SpecialChargeBasedSpellcasting/>
                            ) : (
                                null
                            )
                        }
                </Column>
            </TwoColumns>
        </div>
    )
}

export function PHealthAndArmor() {
    return (
        <div>
            <p>When you create your character, your total starting Health will be:</p>
            <p>
                <b><Icon name="Health"/>Race Health + <Icon name="Health"/>Class Health + 2 * Might.</b>
            </p>
            <p>You also start with an armor of choice from the Armors list, as long as you can wear it.</p>
        </div>
    )
}

export function Spec({ children, name, spec }) {
    return (
        <div className='page' key={name}>
            <PageH1>{name}</PageH1>
            <p>{spec.Description}</p>

            <PageH3>You start with...</PageH3>

            <ManySpells spells={U.spellsFromObject(spec['Starting Abilities'])}/>
            
            {children}
        </div>
    )
}

export function SpecTalents({ spec }) {
    return (
        <div>
            <PageH2>Talents</PageH2>
            <p>At each of the following levels, you can pick one of the Abilities listed.</p>

            {Object.keys(spec.Talents).map(talentTierName => (
                <div key={talentTierName}>
                    <PageH3>{talentTierName}</PageH3>
                    <ManySpells spells={U.spellsFromObject(spec.Talents[talentTierName])}/>
                </div>
            ))}
        </div>
    )
}

export function StartingAbilities({ spellsObject, description }) {

    const spells = U.spellsFromObject(spellsObject)

    const spellsLeft = spells.filter(spell => spell.AlignOnWebsite == 'Left' || spell.AlignOnWebsite == null)
    const spellsRight = spells.filter(spell => spell.AlignOnWebsite == 'Right')

    function SADescription() {
        if (typeof description === 'string' || description instanceof String)
            return (<span>{ description }</span>)
        else {
            return description.map(section => (
                <div key={Object.keys(section)[0]}>
                    <PageH3 hasMarginTop={false}>{ Object.keys(section)[0] }</PageH3>
                    <p>{ section[Object.keys(section)[0]] }</p>
                </div>
            ))
        }
    }

    console.log({spells})

    return (
        <div>
            <PageH2>Starting Abilities</PageH2>

            <TwoColumns>
                <Column>
                    { spellsLeft.map(spell => (
                        <Spell key={spell.Name} spell={spell}/>
                    )) }
                </Column>
                <Column>
                    { spellsRight.map(spell => (
                        <Spell key={spell.Name} spell={spell}/>
                    )) }
                    <SADescription/>
                </Column>
            </TwoColumns>
        </div>
    )
}