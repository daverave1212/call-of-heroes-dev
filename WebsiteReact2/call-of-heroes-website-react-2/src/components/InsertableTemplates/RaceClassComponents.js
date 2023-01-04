import React from 'react'
import { useState } from 'react'
import YAML from 'yaml'

import * as U from '../../utils'

import PageH1 from '../PageH1/PageH1'
import PageH2 from '../PageH2/PageH2'
import PageH3 from '../PageH3/PageH3'

import SmallStat from '../SmallStat/SmallStat'
import SmallStatList from '../SmallStat/SmallStatList'

import Separator from '../Separator/Separator'
import TableNormal from '../TableNormal/TableNormal'
import TableNormalLevelUp from '../TableNormal/TableNormalLevelUp'
import TwoColumns from '../TwoColumns/TwoColumns'
import Column from '../TwoColumns/Column'

import Spell from '../Spell/Spell'
import Icon from '../Icon'

import rules from '../../databases/Rules/Rules.json'
import abilities from '../../databases/Abilities.json'
import ManySpells from '../Spell/ManySpells'
import TableNormalLevelUpWarlock from '../TableNormal/TableNormalLevelUpWarlock'
import ManySmallStats from '../SmallStat/ManySmallStats'
import Page from '../../containers/Page/Page'

export function Proficiencies({ name, theRaceOrClass }) {

    console.log(theRaceOrClass['Proficiency Choices'])

    return (
        <div style={{marginTop: 'var(--page-padding)'}}>
            { theRaceOrClass.Proficiencies != null && (
                <div>
                    <PageH3>Proficiencies</PageH3>
                    <p>As a { name }, you have all the following Abilities. Each of them is a Proficiency, which is generally a passive Ability that gives you a bonus on non-combat Checks in a certain domain.</p>
                    <AbilitiesWithDescription autoAlign={true} spellsObject={theRaceOrClass.Proficiencies} description={theRaceOrClass['Proficiencies Description']}/>
                </div>
            ) }
            { theRaceOrClass['Proficiency Choices'] != null && (
                <div>
                    <PageH3>Proficiency Choices</PageH3>
                    <p>
                        As a { name }, you can pick ONE of the following Proficiency Abilities.
                        { theRaceOrClass.Proficiencies == null && (<span> Each of them is a Proficiency, which is generally a passive Ability that gives you a bonus on non-combat Checks in a certain domain.</span>) }
                    </p>
                    <AbilitiesWithDescription autoAlign={true} spellsObject={theRaceOrClass['Proficiency Choices']} description={theRaceOrClass['Proficiency Choices Description']}/>
                </div>
            )}
        </div>
    )
}

export function ClassFeatures({ theClass }) {
    return (
        <div>
            <PageH2>Class Features</PageH2>

            <TwoColumns>
                <Column>
                    <div className='with-margined-children'>
                        <SmallStat name="Health">{ theClass['Base Health'] }<Icon name="Health" type="small-stat"/></SmallStat>
                        <SmallStat name="Armor Training">{ theClass['Armor Training'] }</SmallStat>
                        <SmallStat name="Base Defense">0 + Your Armor<Icon name="Defense" type="small-stat"/>Defense</SmallStat>
                        { theClass['Language'] && <SmallStat name="Language" topDown='true'>{ theClass['Language'] }</SmallStat> }
                        { theClass.Weapons && <SmallStat name="Weapons" topDown='true'>{ theClass.Weapons }</SmallStat> }
                        <SmallStat name="Feats" topDown='true'>You start with one Feat of choice.</SmallStat>
                    </div>
                </Column>
                <Column>
                    <PHealthAndArmor theClass={theClass}/>
                </Column>
            </TwoColumns>
        </div>
    )
}
export function RaceFeatures({ theRace }) {
    return (
        <div>
            <PageH2>Race Features</PageH2>

            <TwoColumns>
                <Column>
                    <div className='with-margined-children'>
                        <SmallStat name="Stat Distribution" topDown="true">{ theRace.Creation['Stat Restrictions'] }</SmallStat>
                        <SmallStat name="Health">{ theRace.Stats['Base Health'] }</SmallStat>
                        <SmallStat name="Speed">{ theRace.Stats.Movement }</SmallStat>
                        { theRace.Weapons && <SmallStat name="Weapons" topDown='true'>{ theRace.Weapons }</SmallStat> }
                        { theRace.Training && <SmallStat name="Other Training" topDown='true'>{ theRace.Training }</SmallStat> }
                        { theRace.Language && <SmallStat name="Language" topDown='true'>{ theRace.Language }</SmallStat> }
                    </div>
                </Column>
                <Column>
                    <PageH3>Character Creation</PageH3>
                    <p>
                        When you create your character, you assign the stats -1, 0, 1, 2, 3 to the five Stats.
                        Each Race, including { theRace.Race }, have some special Stat distribution constraints.
                    </p>
                    <p>When you create your character, after picking your Class as well, your total starting Health will be:</p>
                    <p>
                        <b><Icon name="Health"/>Race Health + <Icon name="Health"/>Class Health + Might.</b>
                    </p>
                    <p>Your Defense is always determined by the Armor type you are wearing. Your Class determines what Armor type you can wear. If you have 3 Defense, then you reduce the Damage of all attacks you receive by 3.</p>
                    <PageH3>Race Details</PageH3>
                    <p>As a member of the {theRace.Race} race, your lifespan is about { theRace.Stats.Lifespan } and your size is { theRace.Stats.Size }. </p>
                    <p>Your standard Speed is always defined by your Race. This determines how many meters you can move per turn in combat.</p>
                    { theRace.Other != null && (<p>{theRace.Other}</p>) }
                </Column>
            </TwoColumns>
        </div>
    )
}

export function LevelingUp({ theClass }) {
    return (
        <div style={{marginTop: 'var(--page-padding)'}}>
            <PageH3>Leveling Up</PageH3>
    
            <TwoColumns type="normal">
                <Column>
                    {
                        theClass['Spellcasting']['Type'] == 'Special Mana-based'? (
                            <TableNormalLevelUpWarlock/>
                        ) : (
                            <TableNormalLevelUp/>
                        )
                    }
                </Column>
                <Column>
                    {
                        theClass['Spellcasting']['Type'] == 'Insight-based'? (
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
                                            1 Extra <Icon name="Insight"/>Insight
                                        </td>
                                    </tr>
                                </TableNormal>
                
                                <p style={{whiteSpace: 'pre-wrap'}} className='margined-bottom'>{ rules['LevelUpBonusesDescription (Insight-based)'] }</p>
                
                                <Spell spell={abilities['Default Moves']['~Action Surge~']}/>
                            </div>
                        ) :
                        theClass['Spellcasting']['Type'] == 'Mana-based'? (
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
                                            1 Extra <Icon name="Mana"/>Mana
                                        </td>
                                    </tr>
                                </TableNormal>
                
                                <p style={{whiteSpace: 'pre-wrap'}} className='margined-bottom'>{ rules['LevelUpBonusesDescription (Mana-based)'] }</p>
                
                                <Spell spell={abilities['Default Moves']['~Action Surge~']}/>
                            </div>
                        ) :
                        theClass['Spellcasting']['Type'] == 'Special Mana-based'? (
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
                
                                <p style={{whiteSpace: 'pre-wrap'}} className='margined-bottom'>{ rules['LevelUpBonusesDescription (Special Mana-based)'] }</p>
                
                                <Spell spell={abilities['Default Moves']['~Action Surge~']}/>
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

    function ManaBasedSpellcasting() {
        return (
            <div>
                <PageH3>Mana-Based Spellcasting</PageH3>
                <p>
                    <span style={{ whiteSpace: 'pre-line' }}>{ rules['Known Spells (Mana-based)'] }</span>
                    <Separator/>
                    All your Mana replenishes when you finish a Long Rest.
                    <br/><br/>
                    <PageH3>Changing Spells</PageH3>
                    You can change your known Spells (not Talents) when taking a Long Rest.<br/>
                    Talents can't generally be changed once picked; they are permenant decisions.
                    { theClass.Spellcasting.Other }
                </p>
            </div>
        )
    }
    function InsightBasedSpellcasting() {
        return (
            <div>
                <PageH3>Insight-Based Spellcasting</PageH3>
                <p>
                    <span style={{ whiteSpace: 'pre-line' }}>{ rules['Known Spells (Insight-based)'] }</span>
                    <Separator/>
                    All your Cooldowns reset when you finish a Long Rest. If you see the term Insight Ability, that just refers to an Ability that requires Insight.
                    <br/><br/>
                    <PageH3>Changing Spells</PageH3>
                    <span style={{ whiteSpace: 'pre-line' }}>{ rules['Relearning Spells'] }</span>
                    <br/>
                    { theClass.Spellcasting.Other }
                </p>
            </div>
        )
    }
    function SpecialManaBasedSpellcasting() {
        return (
            <div>
                <PageH3>Special Mana-Based Spellcasting</PageH3>
                <p>
                    As a { theClass.Class }, you have a number of Mana points.
                    Unlike other Mana-based classes, your Mana instantly regeneraets 10 minutes after finishing every combat encounter (if you don't enter another combat meanwhile).
                    <br/><br/>
                    <PageH3>Changing Spells</PageH3>
                    You can change your known Spells (not Talents) when taking a Long Rest.<br/>
                    Talents can't generally be changed once picked; they are permenant decisions.
                    { theClass.Spellcasting.Other }
                </p>
            </div>
        )
    }

    return (
        <div>
            <PageH2>Spell Casting</PageH2>

            <TwoColumns>
                <Column>
                    <PageH3>Spell Stats</PageH3>
                    <div className='with-margined-children'>
                        <SmallStat name="Spellcasting Style" color="blue">{ theClass['Spellcasting']['Type'] }</SmallStat>
                        { theClass['Spellcasting']['Mana'] != null && (
                            <SmallStat name="Mana" color="blue">{ theClass['Spellcasting']['Mana']['Amount'] } <Icon name="Mana"/></SmallStat>
                        ) }
                        { theClass['Spellcasting']['Insight'] != null && (
                            <SmallStat name="Insight" color="blue">{ theClass['Spellcasting']['Insight'] } <Icon name="Insight"/></SmallStat>
                        ) }
                        <SmallStat name="Main Stat" color="blue">{ theClass['Spellcasting']['Main Stat'] }</SmallStat>
                        <SmallStat name="Counter Check Grade" color="blue">{ theClass['Spellcasting']['Counter Check Grade'] }</SmallStat>
                    </div>
                    
                    <PageH3>Known Spells</PageH3>
                    <div className='with-margined-children'>
                        {
                            theClass['Spellcasting']['Known Spells'] != null && (
                                <SmallStat name="Known Spells (from Spell Lists)" color="blue">
                                    { theClass['Spellcasting']['Known Spells'] }
                                </SmallStat>
                            )
                        }
                    </div>
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
                            theClass.Spellcasting.Type == 'Mana-based' ? (
                                <ManaBasedSpellcasting/>
                            ) : 
                            theClass.Spellcasting.Type == 'Insight-based' ? (
                                <InsightBasedSpellcasting/>
                            ) : 
                            theClass.Spellcasting.Type == 'Special Mana-based' ? (
                                <SpecialManaBasedSpellcasting/>
                            ) : (
                                null
                            )
                        }
                </Column>
            </TwoColumns>
        </div>
    )
}

export function PHealthAndArmor({ theClass }) {
    return (
        <div>
            <p>When you create your character, your total starting Health will be:</p>
            <p>
                <b><Icon name="Health"/>Race Health + <Icon name="Health"/>Class Health + Might.</b>
            </p>
            <p>You start with any items from your chosen Background. Also, feel free to spend any amount of Gold (also from your Background) to buy items from the Items list (see Items).</p>
            <ManySmallStats name="Starting Equipment" color="rgb(23, 80, 0)" topDown={true} texts={[
                'You start with one Armor of any Armor type you are Trained in.',
                'You start with one Weapon of any Weapon you are Trained in.'
            ]}/>
        </div>
    )
}

export function Spec({ children, name, spec }) {
    return (
        <Page title={name} key={name}>
            <p>{spec.Description}</p>

            <PageH3>You start with...</PageH3>

            <ManySpells spells={U.spellsFromObject(spec['Starting Abilities'])}/>

            {children}
        </Page>
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
    console.log({spellsObject})
    return AbilitiesWithDescription({ spellsObject, description, title: 'Starting Abilities', autoAlign: true })    
}
export function SADescription({description}) {
    if (typeof description === 'string' || description instanceof String)
        return (<p style={{marginTop: '-8px'}}>{ U.parseTextWithSymbols(description) }</p>)
    else {
        return description.map(section => (
            U.isString(section) ? (
                <div key={section.substring(0, 10)}>
                    <p>{
                        U.parseTextWithSymbols(section)
                    }</p>
                </div>
            ) : (
                <div key={Object.keys(section)[0]}>
                    <PageH3 hasMarginTop={false}>{ Object.keys(section)[0] }</PageH3>
                    <p>{
                        U.parseTextWithSymbols(section[Object.keys(section)[0]])
                    }</p>
                </div>
            )
        ))
    }
}
export function AbilitiesWithDescription({ spellsObject, description, title, autoAlign }) {
    autoAlign = autoAlign == null? false : true

    const spells = U.sortSpellsArrayByOrderOnWebsite(U.spellsFromObject(spellsObject))

    const spellsLeft = spells.filter(spell => spell.AlignOnWebsite == 'Left')
    const spellsRight = spells.filter(spell => spell.AlignOnWebsite == 'Right')
    const unalignedSpells = spells.filter(spell => spell.AlignOnWebsite == null)

    console.log({spells})
    console.log({spellsLeft, spellsRight, unalignedSpells})
    
    for (let i = 0; i < unalignedSpells.length; i++) {
        const spell = unalignedSpells[i]

        if (autoAlign == false) {             // ...and if no autoalign, put it left
            spellsLeft.push(spell)
        } else {                              // ...if autoalign, put it where there are fewer spells
            if (spellsLeft.length <= spellsRight.length) {
                spellsLeft.push(spell)
            } else {
                spellsRight.push(spell)
            }
        }
    }

    return (
        <div>
            { title != null && <PageH2>{title}</PageH2> }

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
                    { description != null && (<SADescription description={description}/>) }
                </Column>
            </TwoColumns>
        </div>
    )
}