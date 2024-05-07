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
import classAndRaceAbilities from '../../databases/ClassAndRaceAbilities.json'
import ManySpells from '../Spell/ManySpells'
import TableNormalLevelUpWarlock from '../TableNormal/TableNormalLevelUpWarlock'
import ManySmallStats from '../SmallStat/ManySmallStats'
import Page from '../../containers/Page/Page'
import { Link } from 'react-router-dom'
import TableNormalLevelUpHunter from '../TableNormal/TableNormalLevelUpHunter'
import ThreeSpells from '../Spell/ThreeSpells'

import './RaceClassComponents.css'
import TwoColumnsDescriptive from '../TwoColumns/TwoColumnsDescriptive'
import TableShamanLevelUp from '../TableNormal/TableShamanLevelUp'
import PageH0 from '../PageH0/PageH0'

export function Proficiencies({ name, theRaceOrClass }) {

    const baseProficienciesDescription = `All Classes get a number of extra non-combat Skills. Think of something specific your character is good at outside of combat (e.g. things like acrobatics, knowing about monsters, lying, etc). Whenever you make a Check for what you're good at, add your Level to that Check.`

    return (
        <div style={{marginTop: 'var(--page-padding)'}} id="proficiencies">
            {
                theRaceOrClass.Proficiencies == null || Object.keys(theRaceOrClass.Proficiencies).length == 0 ? (
                    <div></div>
                ) : Object.keys(theRaceOrClass.Proficiencies).length == 1 ? (
                    <div>
                        <PageH3>Non-Combat Skills</PageH3>
                        <p>{ theRaceOrClass['Proficiencies Description'] }</p>
                        <AbilitiesWithDescription autoAlign={true}  spellsObject={theRaceOrClass.Proficiencies} description={baseProficienciesDescription}/>
                    </div>
                ) : (
                    <div>
                        <PageH3>Non-Combat Skills</PageH3>
                        <p>{ theRaceOrClass['Proficiencies Description'] }</p>
                        <p>{ baseProficienciesDescription }</p>
                        <AbilitiesWithDescription autoAlign={false} spellsObject={theRaceOrClass.Proficiencies}/>
                    </div>
                )
            }
            { theRaceOrClass['Proficiency Choices'] != null && (
                <div>
                    <PageH3>Non-Combat Skill Choices</PageH3>
                    <p>
                        As a { name }, you can pick ONE of the following Non-Combat Skills.
                        { theRaceOrClass.Proficiencies == null && (<span> Each of them is a Non-Combat Skill, which is generally a passive Ability that gives you a bonus on non-combat Checks in a certain domain.</span>) }
                    </p>
                    <AbilitiesWithDescription autoAlign={true} spellsObject={theRaceOrClass['Proficiency Choices']} description={theRaceOrClass['Proficiency Choices Description']}/>
                </div>
            )}
        </div>
    )
}

export function RaceHeader({imgStyle, theRace, theClass}) {
    const name = theRace != null? theRace.Race : theClass.Class
    const imagePath = theRace != null? `/Races/${theRace.Race}.png` : `/Classes/${theClass.Class}.png`
    const description = theRace != null? theRace.Description : theClass.Description
    return (
        <div>
            <div className='landscape-only'>
                <PageH1>{ name }</PageH1>
                <TwoColumnsDescriptive>
                    <Column style={{zIndex: 1}}>
                        <RaceDescription description={description}/>
                    </Column>
                    <Column style={{position: 'relative'}}>
                        <img style={imgStyle} className="class-image" src={imagePath}/>
                    </Column>
                </TwoColumnsDescriptive>
            </div>
            <div className='portrait-only'>
                <PageH1 h1Style={{textAlign: 'center'}}>{ name }</PageH1>
                <img className="class-image-portrait" src={imagePath}/>
                <br/><br/>
                <RaceDescription description={description}/>
            </div>
        </div>
    )
}

export function RaceDescription({ description }) {
    const descriptionLines = description
        .split('\n')
        .map(str => str.trim())
        .filter(str => str.length > 0)
        .map(str => <p key={str.substring(0, 10)}>{str}</p>)
    const descriptionComponents = U.insertBetweenAll(descriptionLines, (i) => <Separator key={i}/>)
    return (
        <div>
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
                        <SmallStat name="Initiative">Your Dexterity + Your Charisma</SmallStat>
                        { theClass['Language'] && <SmallStat name="Language" type="vertical">{ theClass['Language'] }</SmallStat> }
                        { theClass.Weapons && <SmallStat name="Weapon Training" type="vertical">{ theClass.Weapons }</SmallStat> }
                        <SmallStat name="Skills" type="vertical">{ theClass['Proficiency Requirements'] }</SmallStat>
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
                        <SmallStat name="Stat Distribution" type="vertical">{ theRace.Creation['Stat Restrictions'] }</SmallStat>
                        <SmallStat name="Health">{ theRace.Stats['Base Health'] } + Might<Icon name="Health" type="small-stat"/></SmallStat>
                        <SmallStat name="Health Regen">{ theRace.Stats['Health Regen'] } <Icon name="HealthRegen" type="small-stat"/></SmallStat>
                        <SmallStat name="Speed">{ theRace.Stats.Movement }</SmallStat>
                        { theRace.Weapons && <SmallStat name="Weapons" type="vertical">{ theRace.Weapons }</SmallStat> }
                        { theRace.Training && <SmallStat name="Other Training" type="vertical">{ theRace.Training }</SmallStat> }
                        { theRace.Language && <SmallStat name="Language" type="vertical">{ theRace.Language }</SmallStat> }
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
        <PageH2>Racial Ability Choice</PageH2>
        <p>Choose one of the following Abilities and get it permanently.</p>
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
export function Equipment() {
    return (
        <div id="equipment">
            <PageH2>Equipment and Gold</PageH2>
            <p>Your Character begins their journey with a total of 800 gold.</p>
            <SmallStat name="Starting Gold" color="rgb(23, 80, 0)">800 <Icon name="gold"/></SmallStat>
            <br/>
            <p>When you create your Character, you can spend these 800 gold on equipment or useful items from the <Link to="/Other/Prices" style={{color: 'blue'}}><b>Prices</b></Link> page.</p>
            <p>For weapons and armor, visit the <Link to="/Other/Weapons">Weapons</Link> and <Link to="/Other/Armors" style={{color: 'blue'}}><b>Armors</b></Link> pages.</p>
            <p>Your Character can wear any type of armor.</p>
        </div>
    )
}
export function LevelingUp({ theClass }) {
    return (
        <div style={{marginTop: 'var(--page-padding)'}} id="leveling-up">
            <PageH2>Leveling Up</PageH2>
    
            <TwoColumns type="normal">
                {/* <Column>
                    {
                        theClass['Spellcasting']['Type'] == 'Special Mana-based'? (
                            <TableNormalLevelUpWarlock/>
                        ) :
                        theClass['Spellcasting']['Type'] == 'Hunter'? (
                            <TableNormalLevelUpHunter/>
                        ) :
                        theClass['Spellcasting']['Type'] == 'Shaman'? (
                            <TableShamanLevelUp/>
                        ) :
                        theClass['Spellcasting']['Type'] == 'Paladin'? (
                            <TableNormalLevelUp/>
                        ) :
                        (
                            <div></div>
                            // <TableNormalLevelUp/>
                        )
                    }
                </Column> */}
                <Column>
                    {
                        theClass['Spellcasting']['Type'] == 'Mana-based'? (
                            <div>
                                <TableNormal columns={['Every Level Above 1 You Get...']}>
                                    <tr>
                                        <td>
                                            +{ theClass['Level Up']['Every Level']['Health'] } <Icon name="Health"/>Health
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            +1 Known Basic Ability
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            +1 <Icon name="Mana"/>Mana
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            +2 <Icon name="HealthRegen"/>Health Regen
                                        </td>
                                    </tr>
                                </TableNormal>
                
                                <p style={{whiteSpace: 'pre-wrap'}} className='margined-bottom'>{ rules['LevelUpBonusesDescription (Mana-based)'] }</p>
                
                                {/* <Spell spell={abilities['Default Moves']['~Action Surge~']}/> */}
                            </div>
                        ) :
                        theClass['Spellcasting']['Type'] == 'Special Mana-based' ||
                        theClass['Spellcasting']['Type'] == 'Hunter' ||
                        theClass['Spellcasting']['Type'] == 'Shaman' ||
                        theClass['Spellcasting']['Type'] == 'Paladin' ? (
                            <div>
                                <TableNormal columns={['Every Level Above 1 You Get...']}>
                                    <tr>
                                        <td>
                                            +{ theClass['Level Up']['Every Level']['Health'] } <Icon name="Health"/>Health
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            +1 Known Basic Ability
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            +2 <Icon name="HealthRegen"/>Health Regen
                                        </td>
                                    </tr>
                                </TableNormal>
                
                                <p style={{whiteSpace: 'pre-wrap'}} className='margined-bottom'>{ rules['LevelUpBonusesDescription (Special Mana-based)'] }</p>
                
                                {/* <Spell spell={abilities['Default Moves']['~Action Surge~']}/> */}
                            </div>
                        ) : (
                            null
                        )
                    }
                </Column>
                <Column>
                    <p>
                        Every Level above Level 1, you get all the bonuses listed - the extra Max Health, the extra Health Regen, etc.<br/>
                        Remember to pick your Specialization at Level 2, and then from Level 3 on, every Level, you get to pick a Talent choice! Note that when you gain extra Might, you also gain extra Max Health, and the same goes for Dexterity and Charisma with Initiative{ theClass.Class == 'Paladin'? '': <span>, and Intellgience with the number of Known Basic Abilities</span> }.<br/>
                        You can relearn all Talents inbetween Adventures.
                    </p>
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
                        {/* <SmallStatList name="Quick-Build Abilities" color="blue" contentStyle={{ width: '100%' }}>
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
                        </SmallStatList> */}
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

    // const hasMultipleMainStats = theClass['Spellcasting']['Main Stat'].includes('or')

    return (
        <div id={theClass['Spellcasting'].SpellsOrAbilities === 'Spell' ? 'spells-and-mana' : 'abilities-and-mana'}>
            <PageH2>{ theClass['Spellcasting'].SpellsOrAbilities === 'Spell' ? 'Spells' : 'Abilities' } and Mana</PageH2>

            <TwoColumns>
                <Column>
                    <PageH3>Basic Abilities</PageH3>
                    <div className='with-margined-children'>
                        { theClass['Spellcasting']['Mana'] != null && theClass['Spellcasting']['Mana']['Amount'] != null && (
                            <SmallStat name="Mana" color="blue">{ theClass['Spellcasting']['Mana']['Amount'] }<Icon name="Mana"/></SmallStat>
                        ) }
                        {
                            theClass['Spellcasting']['Known Basic Abilities'] != null && (
                                <SmallStat name="Known Abilities (from Basic Ability Lists)" type="vertical" color="blue">
                                    { theClass['Spellcasting']['Known Basic Abilities'] }
                                </SmallStat>
                            )
                        }
                        <SmallStatList name="Basic Ability Lists" color="blue">
                            {
                                theClass['Spellcasting']['Basic Ability Lists'].map(spellCategory => (
                                    <div key={spellCategory}>{ spellCategory }</div>
                                ))
                            }
                        </SmallStatList>
                    </div>
                </Column>
                <Column>
                        {
                            theClass.Spellcasting.Type == 'Mana-based' ||
                            theClass.Spellcasting.Type == 'Shaman' ? (
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
            
            <br/>
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
            <p>For Weapon Training: note that all 5 categories are 1-Handed Melee (Shortswords, Daggers, etc), 1-Handed Ranged (Handguns, Slings, etc), 2-Handed Melee (Battle Axes, Greatswords, etc), 2-Handed Ranged (Bows, Heavy Guns, etc) and Shields. You choose Weapon Categories, not specific weapon types. For instance, if you choose 1-Handed Melee Weapons, you will know how to use all Shortswords, Daggers, Spears, etc.</p>
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

    const talentTierCategories = Object.keys(spec.Talents)

    const talentTiers = [3,4,5,6,7,8,9]
    const defaultSmallBonusTalentsByTier = {
        4: ['<Stat Bonus 4>', '<Double Stat Bonus>'],
        6: ['<Health Bonus>', '<Health Regen Bonus>'],
        8: ['<Stat Bonus 5>', '<Mana Bonus>']
    }

    return (
        <div>
            <PageH2>Talents</PageH2>
            <p>At each of the following levels, you can pick one of the Abilities listed.</p>

            {talentTiers.map(talentTier => {
                const talentTierName = 'Level ' + talentTier
                const hasThisTier = spec.Talents[talentTierName] != null
                const isTalentTierForSmallBonuses = [4,6,8].includes(talentTier)
                
                if (hasThisTier == false && isTalentTierForSmallBonuses) {
                    const abilitiesHereNames = defaultSmallBonusTalentsByTier[talentTier]
                    const abilitiesHere = abilitiesHereNames.map(name => U.spellWithName(name, classAndRaceAbilities[name]))
                    console.log(abilitiesHere)
                    return <div>
                        <PageH3>{talentTierName}</PageH3>
                        <ManySpells spells={abilitiesHere}/>
                    </div>
                }
                if (hasThisTier == false) {
                    return <div key={talentTierName}>
                        <PageH3>{talentTierName}</PageH3>
                    </div>
                }

                const spellsInThisTier = U.spellsFromObject(spec.Talents[talentTierName])
                return <div key={talentTierName}>
                    <PageH3>{talentTierName}</PageH3>
                    <ManySpells spells={spellsInThisTier}/>
                </div>
            })}
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