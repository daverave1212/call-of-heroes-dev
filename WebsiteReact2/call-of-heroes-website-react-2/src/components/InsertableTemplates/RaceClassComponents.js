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

    const baseProficienciesDescription = `All Classes get a number of extra Proficiencies. Think of something specific your character is good at outside of combat (e.g. things like acrobatics, knowing about monsters, lying, etc). Whenever you make a Check for what you're good at, add your Level to that Check.`

    return (
        <div style={{marginTop: 'var(--page-padding)'}} id="proficiencies">
            {
                theRaceOrClass.Proficiencies == null || Object.keys(theRaceOrClass.Proficiencies).length == 0 ? (
                    // <div>
                    //     <PageH3>Proficiencies</PageH3>
                    //     <p>{ theRaceOrClass['Proficiencies Description'] }</p>
                    // </div>
                    <div></div>
                ) : Object.keys(theRaceOrClass.Proficiencies).length == 1 ? (
                    <div>
                        <PageH3>Proficiencies</PageH3>
                        {/* <p>As a { name }, you have all the following Abilities. Each of them is a Proficiency, which is a passive Ability that gives you a bonus on non-combat Checks in a certain domain.</p> */}
                        <p>{ theRaceOrClass['Proficiencies Description'] }</p>
                        <AbilitiesWithDescription autoAlign={true}  spellsObject={theRaceOrClass.Proficiencies} description={baseProficienciesDescription}/>
                    </div>
                ) : (
                    <div>
                        <PageH3>Proficiencies</PageH3>
                        {/* <p>As a { name }, you have all the following Abilities. Each of them is a Proficiency, which is generally a passive Ability that gives you a bonus on non-combat Checks in a certain domain.</p> */}
                        <p>{ theRaceOrClass['Proficiencies Description'] }</p>
                        <p>{ baseProficienciesDescription }</p>
                        <AbilitiesWithDescription autoAlign={false} spellsObject={theRaceOrClass.Proficiencies}/>
                    </div>
                )
            }
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

export function RaceDescription({ theRace }) {
    const idTitle = theRace.Race ?? theRace.Class
    const description = theRace.Description
    const descriptionLines = description
        .split('\n')
        .map(str => str.trim())
        .filter(str => str.length > 0)
        .map(str => <p style={{lineHeight: '1.25em'}} key={str.substring(0, 10)}>{str}</p>)
    const descriptionComponents = U.insertBetweenAll(descriptionLines, (i) => <Separator key={i}/>)
    return (
        <div id={idTitle}>
            { descriptionComponents }
        </div>
    )
}

export function ClassFeatures({ theClass }) {
    return (
        <div id="class-features">
            <PageH2>Class Features</PageH2>

            <TwoColumns>
                <Column>
                    <div className='with-margined-children'>
                        {/* <SmallStat name="Health">{ theClass['Base Health'] }<Icon name="Health" type="small-stat"/></SmallStat> */}
                        <SmallStat name="Initiative">Your Dexterity + Your Charisma</SmallStat>
                        { theClass['Language'] && <SmallStat name="Language" topDown='true'>{ theClass['Language'] }</SmallStat> }
                        { theClass.Weapons && <SmallStat name="Weapon Training" topDown='true'>{ theClass.Weapons }</SmallStat> }
                        <SmallStat name="Proficiencies" topDown='true'>{ theClass['Proficiency Requirements'] }</SmallStat>
                        {/* <SmallStat name="Armor Training">{ theClass['Armor Training'] }</SmallStat> */}
                        <SmallStat name="Base Defense">0 + Your Armor<Icon name="Defense" type="small-stat"/>Defense</SmallStat>
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
        <div id="race-features">
            <PageH2>Race Features</PageH2>

            <TwoColumns>
                <Column>
                    <div className='with-margined-children'>
                        <SmallStat name="Stat Distribution" topDown="true">{ theRace.Creation['Stat Restrictions'] }</SmallStat>
                        <SmallStat name="Health">{ theRace.Stats['Base Health'] } + Might<Icon name="Health" type="small-stat"/></SmallStat>
                        <SmallStat name="Reserve Health" topDown={true}>Half of Maximum Health (rounded down)<Icon name="Health" type="small-stat"/></SmallStat>
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
                        <b><Icon name="Health"/>Race Health + Might.</b>
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

export function RacialFeats({ theRace }) {
    return (<div>
        <PageH2>Free Feat</PageH2>
        <p>You start with one <b>Feat</b>. You can get this Feat either from the Feats page, or the list of Racial Feats below. Only your Race can get these Racial Feats.</p>
        <PageH2>Racial Feats</PageH2>
        <ManySpells spells={U.spellsFromObject(theRace.Talents)}/>
    </div>)
}
export function ClassFeatsDescription() {
    return (<div>
        <PageH3>Feats</PageH3>
        <p>Whenever you pick a Talent from your Class Specialization, you can instead choose a Feat. Take note that the power of Class Talents is individually balanced for each Class and each Specialization.</p>
        <p>If you decide to forego your Talent and pick a Feat instead, you can no longer re-pick it inbetween Adventures and you will have to stick to the Feat you chose for the rest of your life! Choose keenly!</p>
    </div>)
}
export function LevelingUp({ theClass }) {
    return (
        <div style={{marginTop: 'var(--page-padding)'}} id="leveling-up">
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

    const [displayedBasicAbilityObj, setDisplayedBasicAbilityObj] = useState(null)

    function ManaBasedSpellcasting() {
        return (
            <div>
                <PageH3>Mana-Based {theClass['Spellcasting'].SpellsOrAbilities} Casting</PageH3>
                <p>
                    Mana is a resource you can spend to cast Abilities. Some Abilities have a Mana cost, some don't. The Mana cost of an Ability is indicated by a small icon of a blue flame, in its upper side below the title (usually next to the Action cost).
                    All your Mana replenishes inbetween Adventures (e.g. at the start of a new Adventure).
                </p>
                <PageH3>Changing {theClass['Spellcasting'].SpellsOrAbilities === 'Spell' ? 'Spells' : 'Abilities'}</PageH3>
                <p>
                    You can change your known Basic Abilities and Talents inbetween Adventures.<br/>
                    Feats can't generally be changed once picked; they are permenant decisions.
                </p>
                <p>
                { theClass.Spellcasting.Other }
                </p>
                <PageH3>Spell Grade</PageH3>
                <p>
                    The Spell Grade is the number your enemies have to roll to pass Checks when you make them roll a Check.
                    To pass the Check, they need to roll equal to or higher than your Spell Grade.
                </p>
            </div>
        )
    }
    function InsightBasedSpellcasting() {
        return (
            <div>
                DEPRECATED
                You're not supposed to see this.
            </div>
        )
    }
    function SpecialManaBasedSpellcasting() {
        return (
            <div>
                <PageH3>Special Mana-Based Spellcasting</PageH3>
                <p>
                    As a { theClass.Class }, you have a number of Mana points.
                    Unlike other Mana-based classes, your Mana instantly regenerates 10 minutes after finishing every combat encounter (if you don't enter another combat meanwhile).
                    If you want to use Mana inbetween encounters, you spend Mana normally and, as specified, it replenishes 10 minutes after the next combat encounter (so, yes, you <b>must</b> do a combat encounter in order to restore your mana; such is the nature of Warlocks).
                    <br/><br/>
                    <PageH3>Changing Spells</PageH3>
                    You can change your known Basic Abilities and Talents inbetween Adventures.<br/>
                    Feats can't generally be changed once picked; they are permenant decisions.
                    { theClass.Spellcasting.Other }
                </p>
            </div>
        )
    }
    function RecommendedBasicSpells() {

        return (
            <div>
                <PageH3>Recommended Basic Abilities</PageH3>
                <TwoColumns>
                    <Column className='with-margined-children'>
                        <SmallStatList name="Quick-Build Abilities" color="blue" contentStyle={{ width: '100%' }}>
                            {
                                theClass['Spellcasting']['Recommended Basic Abilities'].map(categoryNameKVP => {
                                    const category = Object.keys(categoryNameKVP)[0]
                                    const name = categoryNameKVP[category]
                                    return (<div className='text-link-with-hover' key={name} onClick={() => {
                                        const categoryObj = abilities[category]
                                        const spellObj = U.spellFromObject(categoryObj, name)
                                        console.log('ONE')
                                        console.log({spellObj})
                                        setDisplayedBasicAbilityObj(spellObj)
                                        console.log({displayedBasicAbilityObj})
                                    }}>{ name }</div>)
                                })
                            }
                        </SmallStatList>
                        { displayedBasicAbilityObj != null && (
                            <Spell spell={displayedBasicAbilityObj}/>
                        ) }
                    </Column>
                    <Column>
                        <p>
                            This is a list of recommended Basic Abilities (from your Basic Ability Lists mentioned above) for when you are undecided on which Basic Abilities to get, or you simply want a quick character creation.
                            They are in order of priority, top to bottom. If you don't know what to pick, get these! You can click on them on the left to check out what they do, or check out the Abilities page to see all of them.
                            Unless your Intelligence is 3, you won't be able to get all of them, but you can pick the first few ones.
                        </p>
                        <Separator/>
                        <p>
                            { theClass['Spellcasting']['Recommended Abilities Description'] }
                        </p>
                    </Column>
                </TwoColumns>
            </div>
        )
    }

    const hasMultipleMainStats = theClass['Spellcasting']['Main Stat'].includes('or')

    return (
        <div id={theClass['Spellcasting'].SpellsOrAbilities === 'Spell' ? 'spells-and-mana' : 'abilities-and-mana'}>
            <PageH2>{ theClass['Spellcasting'].SpellsOrAbilities === 'Spell' ? 'Spells' : 'Abilities' } and Mana</PageH2>

            <TwoColumns>
                <Column>
                    
                    <div className='with-margined-children'>
                        <PageH3>Main Stat</PageH3>
                        <SmallStat name="Main Stat" topDown={hasMultipleMainStats} color="blue">{ theClass['Spellcasting']['Main Stat'] }{hasMultipleMainStats ? (<i> (whichever is higher)</i>) : ''}</SmallStat>
                    </div>

                    <PageH3>Numbers</PageH3>
                    <div className='with-margined-children'>
                        { theClass['Spellcasting']['Type'] != null && theClass['Spellcasting']['Type'] != 'Mana-based' && (
                            <SmallStat name="Spellcasting Style" color="blue">{ theClass['Spellcasting']['Type'] }</SmallStat>
                        ) }
                        { theClass['Spellcasting']['Mana'] != null && (
                            <SmallStat name="Mana" color="blue">{ theClass['Spellcasting']['Mana']['Amount'] }<Icon name="Mana"/></SmallStat>
                        ) }
                        <SmallStat name="Spell Grade" color="blue">{ theClass['Spellcasting']['Spell Grade'] }</SmallStat>
                        {
                            theClass['Spellcasting']['Known Basic Abilities'] != null && (
                                <SmallStat name="Known Abilities (from Basic Ability Lists)" topDown={true} color="blue">
                                    { theClass['Spellcasting']['Known Basic Abilities'] }
                                </SmallStat>
                            )
                        }
                    </div>

                    <PageH3>Basic Ability Lists</PageH3>
                    <SmallStatList name="Basic Ability Lists" color="blue">
                        {
                            theClass['Spellcasting']['Basic Ability Lists'].map(spellCategory => (
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
                            theClass.Spellcasting.Type == 'Special Mana-based' ? (
                                <SpecialManaBasedSpellcasting/>
                            ) : (
                                null
                            )
                        }
                </Column>
            </TwoColumns>
            <RecommendedBasicSpells/>
            
        </div>
    )
}

export function PHealthAndArmor({ theClass }) {
    return (
        <div>
            <p>When you create your character, your total starting Health will be:</p>
            <p>
                <b><Icon name="Health"/>Race Health + Might.</b>
            </p>
            <p>Note that you do <b>not</b> add your Might to your Health every level!</p>
            <p>Feel free to spend any amount of Gold to buy items from the Items list (see Items).</p>
            <ManySmallStats name="Starting Equipment" color="rgb(23, 80, 0)" topDown={true} texts={[
                'You start with 500 gold that you can spend on any items in the shop (see Prices page). You have a 50% discount on armors and weapons you would buy with this starting gold.'
            ]}/>
        </div>
    )
}

export function Spec({ children, name, spec }) {
    console.log({spec})
    return (
        <Page title={name} key={name} isSecondaryPage={true}>
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
    return AbilitiesWithDescription({ spellsObject, description, title: 'Starting Abilities', autoAlign: true, id: 'starting-abilities' })    
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
export function AbilitiesWithDescription({ spellsObject, description, title, autoAlign, id, forceLeft }) {
    autoAlign = autoAlign == null? false : true

    const spells = U.sortSpellsArrayByOrderOnWebsite(U.spellsFromObject(spellsObject))

    let spellsLeft      = []
    let spellsRight     = []
    let unalignedSpells = []
    
    if (forceLeft == true) {
        spellsLeft = spells
    } else {
        spellsLeft = spells.filter(spell => spell.AlignOnWebsite == 'Left')
        spellsRight = spells.filter(spell => spell.AlignOnWebsite == 'Right')
        unalignedSpells = spells.filter(spell => spell.AlignOnWebsite == null)
    }
    
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
        <div id={id}>
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