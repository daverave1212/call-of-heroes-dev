import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import YAML from 'yaml'

import * as U from '../../utils'

import PageH1 from '../PageH1/PageH1'
import PageH2 from '../PageH2/PageH2'
import PageH3 from '../PageH3/PageH3'

import SmallStat from '../SmallStat/SmallStat'
import SmallStatList from '../SmallStat/SmallStatList'

import Separator, { SeparatorLarge } from '../Separator/Separator'
import TableNormal from '../TableNormal/TableNormal'
import TableNormalLevelUp from '../TableNormal/TableNormalLevelUp'
import TwoColumns from '../TwoColumns/TwoColumns'
import Column from '../TwoColumns/Column'

import Spell from '../Spell/Spell'
import Icon from '../Icon'

import rules from '../../databases/Rules/Rules.json'
import abilities from '../../databases/Abilities.json'
import spellFonts from '../../databases/SpellFonts.json'
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
import AnchorFixer from '../AnchorFixer/AnchorFixer'
import { QGTitle1 } from '../../pages/Tools/TitleGenerator'
import { SideMenuFromClass, SideMenuFromRace } from '../SideMenu/SideMenu'
import Selector from '../Selector/Selector'
import { toggleSpellForSelectedSpellNames } from '../../pages/Other/CharacterCreationCalculator/CharacterData'
import { BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP, HEALTH_REGEN, INITIATIVE, INTELLIGENCE, MAX_HEALTH, MOVEMENT_SPEED, normalizeTextWithStats } from '../../services/game-lib/stat-calculations'
import { SelectorsByColumns } from '../../pages/Other/Abilities'
import ErrorPage from '../ErrorPage/ErrorPage'
import SetRequiredBanner from '../SetRequiredBanner/SetRequiredBanner'
import { getRaceAsync, getRaceLocal } from '../../services/content-providers/RaceProvider'
import { FEATURES, useFeatureItem } from '../../services/content-providers/ContentProvider'
import Loading, { LoadingCenter } from '../Loading/Loading'
import ComingSoonBanner from '../Banner/ComingSoonBanner'
import { useDoIOwnSet } from '../../services/auth/Auth'


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

export function RaceHeader({imgStyle, theRace, theClass, hueShift, height=70}) {

    const theRaceOrClass = theRace ?? theClass
    const name = theRaceOrClass.Race ?? theRaceOrClass.Class
    const layoutType = theRaceOrClass.LayoutType ?? 'A'
    const imageStyle = imgStyle ?? theRaceOrClass?.ImageStyle

    useEffect(() => {
        document.title = name
    }, [theRace, theClass])

    const imagePath = theRace != null? `/Races/${theRace.Race}.png` : `/Classes/${theClass.Class}.png`
    const imageClass = layoutType == 'B'? 'type-b': 'type-a'
    const descriptionBefore = theRaceOrClass.DescriptionBefore
    const description = theRaceOrClass.Description
    const descriptionLeft = theRaceOrClass.DescriptionLeft
    const descriptionRightTop = theRaceOrClass.DescriptionRightTop
    const descriptionRightBottom = theRaceOrClass.DescriptionRightBottom
    const descriptionAfter = theRaceOrClass.DescriptionAfter
    const completeDescription = [descriptionBefore, description, descriptionLeft, descriptionRightTop, descriptionRightBottom, descriptionAfter].filter(txt => txt != null).join('\n')
    return (
        <div>
            <div className='landscape-only' style={{paddingTop: '8rem'}}>
                <div className='center-content' style={{paddingBottom: '8rem'}}>
                    <QGTitle1 text={name} hueShift={hueShift} height={height}/>
                </div>
                { descriptionBefore && <p>{descriptionBefore}</p>}
                { theRace?.IsShort || theClass?.IsShort? (
                    <TwoColumns>
                        <Column style={{zIndex: 1}}>
                            <RaceDescription description={descriptionLeft ?? description}/>
                        </Column>
                        <Column style={{position: 'relative'}}>
                            { descriptionRightTop && <p>{descriptionRightTop}</p>}
                            <img style={imgStyle} className="class-image" src={imagePath}/>
                            { descriptionRightBottom && <p>{descriptionRightBottom}</p>}
                        </Column>
                    </TwoColumns>
                ) : (
                    <TwoColumns style={{gap: '2rem' }}>
                        <Column style={{zIndex: 1, flex: 1}}>
                            <RaceDescription description={descriptionLeft ?? description}/>
                        </Column>
                        <Column className={`flex column`} style={{position: 'relative', flex: 1}}>
                            { descriptionRightTop && <p>{descriptionRightTop}</p>}
                            <img style={imageStyle} className={`class-image ${imageClass}`} src={imagePath}/>
                            { descriptionRightBottom && <p>{descriptionRightBottom}</p>}
                        </Column>
                    </TwoColumns>
                )}
                { descriptionAfter && <p>{descriptionAfter}</p>}
            </div>
            <div className='portrait-only'>
                <div className='center-content margin-bottom-2 padding-top-4'>
                    <QGTitle1 text={name} height={45}/>
                </div>
                {/* <PageH1 h1Style={{textAlign: 'center'}}>{ name }</PageH1> */}
                <img className="class-image-portrait" src={imagePath}/>
                <br/><br/>
                <RaceDescription description={completeDescription}/>
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
    // const descriptionComponents = U.insertBetweenAll(descriptionLines, (i) => <Separator key={i}/>)
    const descriptionComponents = U.insertBetweenAll(descriptionLines, (i) => <br key={i}/>)
    return (
        <React.Fragment>
            { descriptionComponents }
        </React.Fragment>
    )
}

export function ClassFeatures({ theClass, hueShift }) {
    return (
        <div id="class-features">
            {/* <PageH2>Class Features</PageH2> */}
            <QGTitle1 text="Class Features" hueShift={hueShift} height={35}/>

            <TwoColumns>
                <Column>
                    <div className='with-margined-children'>
                        { theClass['Language'] && <SmallStat name="Language" className="column">{ theClass['Language'] }</SmallStat> }
                        {/* { theClass.Weapons && <SmallStat name="Weapon Training" className="column">{ theClass.Weapons }</SmallStat> } */}
                        <SmallStat name="Skills" className="column">{ theClass['Proficiency Requirements'] }</SmallStat>
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
            <PageH2 className="center-text" hasMargin={false}>Race Features</PageH2>

            <TwoColumns>
                <Column>
                    <div className='flex column gap-1'>
                        { theRace?.Creation?.['Stat Restrictions'] && (
                            <SmallStat name="Stat Distribution" className="column">{ normalizeTextWithStats(theRace.Creation['Stat Restrictions']) }</SmallStat>
                        ) }
                        <div>
                            <SmallStat name="Max Health"><Icon name="Health" type="small-stat"/>{ theRace.Stats['Base Health'] } + ({BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[MAX_HEALTH]})</SmallStat>
                        </div>
                        <div>
                            <SmallStat name="Health Regen"><Icon name="HealthRegen" type="small-stat"/> { theRace.Stats['Health Regen'] } + ({BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[HEALTH_REGEN]})</SmallStat>
                        </div>
                        <SmallStat name="Movement Speed" className="column">4, and add {BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[MOVEMENT_SPEED]}</SmallStat>
                        <div>
                            <SmallStat name="Initiative">{BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[INITIATIVE]}</SmallStat>
                        </div>
                        { theRace.Weapons && <SmallStat name="Weapons" className="column">{ theRace.Weapons }</SmallStat> }
                        { theRace.Training && <SmallStat name="Other Training" className="column">{ theRace.Training }</SmallStat> }
                        { theRace.Language && <SmallStat name="Language" className="column">{ theRace.Language }</SmallStat> }
                    </div>
                </Column>
                <Column>
                    <PageH3>Character Creation</PageH3>
                    <p>
                        When you create your character, you assign the stats -1, 0, 1, 2, 3 to the five Stats.
                        Each Race, including { theRace.Race }, have some special Stat distribution constraints.
                    </p>
                    <p>
                        For Movement Speed, if your Dexterity is -1 or 0, you have 4 Movement, for 1 or 2 you have 5 Movement, and for 3 you have 6 Movement.
                    </p>
                    <PageH3>Race Details</PageH3>
                    <p>As a member of the {theRace.Race} race, your lifespan is about { theRace.Stats.Lifespan } and your size is { theRace.Stats.Size }. </p>
                    { theRace.Other != null && (<p>{theRace.Other}</p>) }
                </Column>
            </TwoColumns>
        </div>
    )
}
export function CCRaceFeatures({ theRace }) {
    return (
        <div id="race-features">
            <PageH2 className="center-text" hasMargin={false}>Race Features</PageH2>

            <TwoColumns>
                <Column>
                    <div className="flex column gap-1">
                        <SmallStat name="Stat Distribution" className="column">{ normalizeTextWithStats(theRace?.Creation?.['Stat Restrictions']) }</SmallStat>
                        <div>
                            <SmallStat name="Max Health"><Icon name="Health" type="small-stat"/>{ theRace.Stats['Base Health'] } + ({BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[MAX_HEALTH]})</SmallStat>
                        </div>
                        <div>
                            <SmallStat name="Health Regen"><Icon name="HealthRegen" type="small-stat"/> { theRace.Stats['Health Regen'] } + ({BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[HEALTH_REGEN]})</SmallStat>
                        </div>
                        <SmallStat name="Movement Speed" className="column">4, and add {BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[MOVEMENT_SPEED]}</SmallStat>
                        <div>
                            <SmallStat name="Initiative">{BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[INITIATIVE]}</SmallStat>
                        </div>
                        { theRace.Weapons && <SmallStat name="Weapons" className="column">{ theRace.Weapons }</SmallStat> }
                        { theRace.Training && <SmallStat name="Other Training" className="column">{ theRace.Training }</SmallStat> }
                        { theRace.Language && <SmallStat name="Language" className="column">{ theRace.Language }</SmallStat> }
                    </div>
                </Column>
                <Column>
                    <PageH3>Character Creation</PageH3>
                    <p>
                        When you create your character, you assign the stats -1, 0, 1, 2, 3 to the five Stats.
                        Each Race, including { theRace.Race }, have some special Stat distribution constraints.
                    </p>
                    <p>
                        For Movement Speed, if your Dexterity is -1 or 0, you have 4 Movement, for 1 or 2 you have 5 Movement, and for 3 you have 6 Movement.
                    </p>
                    <PageH3>Race Details</PageH3>
                    <p>As a member of the {theRace.Race} race, your lifespan is about { theRace.Stats.Lifespan } and your size is { theRace.Stats.Size }. </p>
                    { theRace.Other != null && (<p>{theRace.Other}</p>) }
                </Column>
            </TwoColumns>
        </div>
    )
}

export function RacialFeats({ theRace }) {
    return (<div>
        <PageH2 className="center-text" hasMargin={false}>Race Talents</PageH2>
        <p>Choose 2 of the following Abilities and get them permanently.</p>
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
export function Equipment({ theClass }) {
    return (
        <div id="equipment">
            {/* <PageH2>Skills, Gold and Equipment</PageH2> */}
            <QGTitle1 text={'Skills Gold and Equipment'} height={35}/>
            <p>You start with a number of Skills you can pick from the <Link to="/Other/Proficiencies">Non-Combat Skills</Link> page.</p>
            <SmallStat name="Number of Skills">Sense + 3</SmallStat>
            <br/>
            <p>Your Character begins their journey with a total of 1000 gold.</p>
            <SmallStat name="Starting Gold">1000 <Icon name="gold"/></SmallStat>    {/* color="rgb(23, 80, 0)" */}
            <br/>
            <p>When you create your Character, you can spend these 1000 gold on equipment or useful items from the <Link to="/Other/Prices" style={{color: 'blue'}}><b>Prices</b></Link> page.</p>
            <p>For weapons and armor, visit the <Link to="/Other/Weapons">Weapons</Link> and <Link to="/Other/Armors" style={{color: 'blue'}}><b>Armors</b></Link> pages.</p>
            <p>Your Character can wear any type of armor.</p>
        </div>
    )
}

export function LevelingUp({ theClass, isCharacterCreationPage=false }) {
    const pageMarginTop = isCharacterCreationPage? '0px': 'var(--page-padding)'
    const everyLevel = theClass['Level Up']['Every Level']

    return (
        <div style={{marginTop: pageMarginTop}} id="leveling-up">
            <div className='center-content width-100 padding-bottom-4'>
                <QGTitle1 text={"Leveling Up"}/>
            </div>
            {/* <PageH2 hasMargin={false} className="center-text">Leveling Up</PageH2> */}
    
            <TwoColumns type="normal">
                <Column>
                    <TableNormal columns={['Every Level Above 1 You Get...']}>
                        { Object.keys(everyLevel).map(statName => (
                            <tr>
                                <td>
                                    +{ everyLevel[statName] } <Icon src={U.getStatIconPathByStatName(statName)}/>{statName}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                +1 <Icon name="XP"/>Talent (for your new Level)
                            </td>
                        </tr>
                    </TableNormal>
                </Column>
                <Column>
                    <p>
                        Every Level above Level 1, you get all the bonuses listed.
                        
                        <br/><br/>
                        The +1 in Any Stat goes up to your Stat Limit:
                        <br/>
                        {U.SYMBOLS.StatLimit.text}
                        
                        { theClass.Specs != null && <>
                            <br/><br/>
                            At Level 2, you can pick your Specialization.
                        </>}

                        <br/><br/>
                        You can relearn all Talents inbetween Adventures.
                    </p>
                </Column>
            </TwoColumns>
        </div>
    )
}

export function ManaDescriptionNormal() {
    return <p>
        Mana is a resource you can spend to cast Abilities. Some Abilities have a Mana cost, some don't.
        All your Mana replenishes inbetween Adventures (e.g. at the start of a new Adventure).
    </p>
}
export function SpecialManaDescriptionNormal() {
    return <p>
        Mana is a resource you can spend to cast Abilities. Some Abilities have a Mana cost, some don't.
        Unlike other Mana-based classes, your Mana instantly regenerates 10 minutes after finishing every combat encounter (if you don't enter another combat meanwhile).
        If you want to use Mana inbetween encounters, you spend Mana normally and, as specified, it replenishes 10 minutes after the next combat encounter.
    </p>
}
function NoManaDescription() {
    return <p>
        Unlike other Classes, you do not use Mana, and can't spend it on Abilities. You rely solely on your own Class Abilities and Talents, which are often stronger than usual and may provide more interesting options.
    </p>
}

export function SpellCasting({ theClass, isCharacterCreationPage=false }) {

    const hasMana = U.hasClassMana(theClass.Class)
    const title = 'Ability Notes' + (hasMana? ' & Mana': '')

    const rightTitle = theClass.Spellcasting?.Title ?? `${theClass.Class} Abilities`
    const rightText = theClass.Spellcasting?.Text ?? <>
        Mana is a resource you can spend to cast Abilities. Some Abilities have a Mana cost, some don't.
        All your Mana replenishes inbetween Adventures (e.g. at the start of a new Adventure).
    </>

    function RespecBlock() {
        return <>
            <PageH3>Changing Abilities (Respec)</PageH3>
            <p>
                You can change your character's chosen Talents (your build) inbetween Adventures.<br/>
                
                { isCharacterCreationPage == false && (
                    <>
                        <br/>
                        Feats can't generally be changed once picked; they are permenant decisions.
                    </>
                )}
            </p>
        </>
    }

    function ManaBlock() {
        if (!hasMana) {
            console.error(`ERROR: Class ${theClass.Class} has no Mana but rendered ManaBlock!?`)
        }
        return <div className='column gap-half'>
            <PageH3>Mana</PageH3>
            <SmallStat name="Mana" color="blue">
                <Icon name="Mana"/>{ U.getClassMana(theClass) } ({theClass.Spellcasting.Mana.Per ?? ''})
            </SmallStat>
        </div>
    }



    return (
        <div id={theClass['Spellcasting'].SpellsOrAbilities === 'Spell' ? 'spells-and-mana' : 'abilities-and-mana'}>
            {/* <QGTitle1 text={title} height={35}/> */}
            <PageH2 hasMargin={false} className="center-text">{title}</PageH2>

            <TwoColumns>
                <Column>
                    <div className='flex column gap-1'>
                        { hasMana && <ManaBlock/> }
                        <RespecBlock/>
                    </div>
                </Column>
                <Column>
                    <PageH3>{ rightTitle }</PageH3>
                    <p>{ rightText }</p>

                    {
                        isCharacterCreationPage == false && (
                            <p>{ theClass.Spellcasting.Other }</p>    
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
            <p>If you have a Non-Combat skill, you can add your Level to all Checks that have to do with that Skill!</p>
            <p>You can make up your own Non-Combat Skills, or find a comprehensive list of Non-Combat Skills under Databases, Abilities.</p>
        </div>
    )
}

export function Spec({ children, name, specObj, hasNoMargins }) {
    return (
        <Page key={name} isSecondaryPage={true} hasNoMargins={hasNoMargins}>
            <div className='center-content center-text'>
                <QGTitle1 text={name} height={60}/>
                <p>{specObj.Description}</p>
            </div>

            <PageH3>You start with...</PageH3>

            <ManySpells spells={U.spellsFromObject(specObj['Starting Abilities'])}/>

            {children}
        </Page>
    )
}

export function TalentTier({ title, talents, selectedSpellNames, onSpellClick, spellsMetadata }) {
    const spellsInThisTier = U.spellsFromObject(talents)
    return <div className='margin-top-2'>
        <PageH2 className="center-text">{title}</PageH2>
        <ManySpells spells={spellsInThisTier} selectedSpellNames={selectedSpellNames} onSpellClick={onSpellClick} spellsMetadata={spellsMetadata} shouldSort={false}/>
    </div>
        {/* { talentTitle?.includes('Level 2') &&
            <div className='center-content'>
                <QGTitle1 text={'Level Up Talents'} height={45}/>
            </div>
        } */}
        
}

export function Talents({ talents, selectedSpellNames, onSpellClick, spellsMetadata, condition=()=>true }) {
    const [doIOwnEarlyAccess, isLoading] = useDoIOwnSet('early-access')
    
    const talentTitles = Object.keys(talents).filter(key => key != null && talents[key] != null)
    const talentTitlesSorted = U.sortByHash(talentTitles, title => U.getNumberFromString(title))
    const lastTalentTitle = talentTitles[talentTitles.length - 1]
    const isComplete = lastTalentTitle.includes('10')

    const [talents1to4, talents5to6, talentsRest] = U.splitBy(talentTitlesSorted, (title, i) => {
        return title.includes('5') || title.includes('7')
    })

    function TalentsPart({titles}) {
        return titles.filter(title => condition(title)).map(title => <>
            <TalentTier title={title} talents={talents[title]} selectedSpellNames={selectedSpellNames} onSpellClick={onSpellClick} spellsMetadata={spellsMetadata}/>
        </>)
    }


    return (
        <div>
            <TalentsPart titles={talents1to4}/>
            { isLoading? (<LoadingCenter/>): (
                doIOwnEarlyAccess?
                    <TalentsPart titles={talents5to6}/>
                :
                    null
            )}
        </div>
    )
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
            {/* { title != null && <QGTitle1 text={title} height={35}/> } */}
            { title != null && <PageH2 hasMargin={false} className="center-text">{title}</PageH2> }

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


export function RacePage({ raceName }) {

    const [theRace, isLoading] = useFeatureItem(FEATURES.Races, raceName)

    if (theRace == null) {
        return <ErrorPage/>
    }

    return (
        <div>

            <SideMenuFromRace theRace={theRace}/>
            <Page>

                <RaceHeader theRace={theRace}/>

                <RaceFeatures theRace={theRace}/>

                <Proficiencies name={theRace.Race} theRaceOrClass={theRace}/>

                
                <PageH2 hasMargin={false} className="center-text">Abilities</PageH2>
                <ManySpells spells={theRace['Starting Abilities']} description={theRace['Starting Abilities Description']}/>
                { theRace['Ability Choices'] != null && (
                    <div>
                        <PageH2>Ability Choice</PageH2>
                        <ManySpells spells={theRace['Ability Choices']} description={theRace['Ability Choices Description']}/>
                    </div>
                )}

                { theRace.Talents? (<>
                    <PageH2>Race Feats</PageH2>
                    <p>Choose 2 Race Talents from below. Your choice is permanent!</p>
                    <ManySpells spells={U.spellsFromObject(theRace.Talents)}/>
                    <ComingSoonBanner/>
                </>): isLoading?
                    <LoadingCenter/>
                :(
                    <SetRequiredBanner setName={theRace.Set}/>
                ) }

                

            </Page>

            

        </div>
    )
}
export function CCRacePage({ raceName, selectedSpellNames, onSpellClick }) {

    const [theRace, isLoading] = useFeatureItem(FEATURES.Races, raceName)

    return (
        <div>
            <Page hasNoMargins={true}>

                <CCRaceFeatures theRace={theRace}/>

                <Proficiencies name={theRace.Race} theRaceOrClass={theRace}/>

                <PageH2 hasMargin={false} className="center-text">Abilities</PageH2>
                <ManySpells
                    spells={theRace['Starting Abilities']}
                    description={theRace['Starting Abilities Description']}
                />
                
                { theRace['Ability Choices'] != null && (
                    <div>
                        <PageH2>Ability Choice</PageH2>
                        <ManySpells
                            spells={theRace['Ability Choices']}
                            description={theRace['Ability Choices Description']}
                            selectedSpellNames={selectedSpellNames}
                            onSpellClick={onSpellClick}
                        />
                    </div>
                )}

                { theRace.Talents? (<>
                    <PageH2>Race Feats</PageH2>
                    <p>Choose 2 Race Talents from below. Your choice is permanent!</p>
                    <ManySpells
                        spells={U.spellsFromObject(theRace.Talents)}
                        selectedSpellNames={selectedSpellNames}
                        onSpellClick={onSpellClick}
                    />
                    <ComingSoonBanner/>
                </>): isLoading?
                    <LoadingCenter/>
                :
                    <SetRequiredBanner setName={theRace.Set}/>
                }

            </Page>
        </div>
    )
}

export function ClassPage(props) {
    return <ClassPageV2 {...props}/>
}
export function ClassPageV2({
    className,
    hasNoMargins=false,
    hasHeader=true,
    useSelectedSpecNameHook=() => useState(null),
    useSelectedFontHook=() => useState('Fire'),
    selectedSpellNames,
    onSpellClick,
    hueShift,
    spellsMetadata,
    isCharacterCreationPage=true
}) {

    const [theClass, isLoading] = useFeatureItem(FEATURES.Classes, className)

    if (theClass == null) {
        return <ErrorPage/>
    }

    window.theClass = theClass

    let [selectedSpecName, setSelectedSpecName] = useSelectedSpecNameHook()
    let [selectedFontName, setSelectedFontName] = useSelectedFontHook()

    const selectedSpecObj = theClass.Specs?.[selectedSpecName]
    const isSelectedSpecFromThisClass = selectedSpecObj != null

    const spellFontNames = Object.keys(spellFonts)
    const spellFontsSelectorData = spellFontNames.map(fontName => ({ name: fontName, src: U.getSpellIconPathByName(U.getAnyKey(spellFonts[fontName])) }))

    const shouldHaveLocalhostPowerTable = theClass.Talents != null || theClass.Specs != null

    function onSpecClick(specName) {
        setSelectedSpecName(specName)
    }

    const shouldDisplaySetRequired = theClass.Specs == null && theClass.Talents == null



    return (
        <div>            
            <Page hasNoMargins={hasNoMargins}>

                { hasHeader && (
                    <RaceHeader theClass={theClass} hueShift={hueShift}/>
                )}
                                
                { theClass.Druidic && (
                    <div>
                        <h4 style={{marginTop: 'var(--page-padding)'}}>Druidic</h4>
                        <p>{theClass.Druidic}</p>
                    </div>
                )}            
                
                <AbilitiesWithDescription
                    title="Starting Abilities"
                    description={theClass['Starting Abilities Description']}
                    spellsObject={theClass['Starting Abilities']}
                    autoAlign={true}
                    id="starting-abilities"
                />

                <SpellCasting theClass={theClass} isCharacterCreationPage={isCharacterCreationPage}/>

                { theClass.Spellcasting?.HasFont && (
                    <div>
                        <PageH2 hasMargin={false} className="center-text">Select Your Font</PageH2>
                        <SelectorsByColumns
                            selectorData={spellFontsSelectorData}
                            nColumns={2}
                            selectedSelectorName={selectedFontName}
                            setSelectedSelectorName={setSelectedFontName}
                        />

                        { selectedFontName != null && (
                        <>
                            <PageH2 hasMargin={false} className="center-text">{selectedFontName} Font Spells</PageH2>
                            <ManySpells
                                spells={spellFonts[selectedFontName]}
                                selectedSpellNames={selectedSpellNames}
                                onSpellClick={onSpellClick}
                                spellsMetadata={spellsMetadata}
                                shouldSort={false}
                            />
                        </>
                    )}
                    </div>
                )}

                { theClass['Ideas'] != null && U.isLocalhost() && (
                    <div>
                        <PageH2>Ideas</PageH2>
                        <ManySpells
                            spells={theClass['Ideas']}
                            description={'This is for testing purposes only. Ignore this section.'}
                            selectedSpellNames={selectedSpellNames}
                        />
                    </div>
                )}

                { theClass['Utility'] != null && (
                    <div>
                        <PageH2 className="center-text">Level 1 Utility Talent</PageH2>
                        <ManySpells
                            spells={theClass['Utility']}
                            description={theClass['Utility Description']}
                            selectedSpellNames={selectedSpellNames}
                            onSpellClick={onSpellClick}
                            spellsMetadata={spellsMetadata}
                        />
                    </div>
                )}

                { theClass['Other Abilities'] != null && (
                    <div>
                        <PageH2 hasMargin={false} className="center-text">{theClass['Other Abilities Title']}</PageH2>
                        <ManySpells
                            spells={theClass['Other Abilities']}
                            description={theClass['Other Abilities Description']}
                            selectedSpellNames={selectedSpellNames}
                            onSpellClick={onSpellClick}
                            spellsMetadata={spellsMetadata}
                            shouldSort={false}
                        />
                    </div>
                )}

                { theClass['Ability Choices'] != null && (
                    <div>
                        <PageH2 className="center-text">Level 1 Class Talents</PageH2>
                        <ManySpells
                            spells={theClass['Ability Choices']}
                            description={theClass['Ability Choices Description']}
                            selectedSpellNames={selectedSpellNames}
                            onSpellClick={onSpellClick}
                            spellsMetadata={spellsMetadata}
                        />
                    </div>
                )}
                { theClass.Talents != null && <>
                    <Talents
                        talents={theClass.Talents}
                        condition={title => U.getNumberFromString(title) < 2 || U.getNumberFromString(title) == null}
                        selectedSpellNames={selectedSpellNames}
                        onSpellClick={onSpellClick}
                        spellsMetadata={spellsMetadata}
                    />
                    <LevelingUp theClass={theClass} isCharacterCreationPage={isCharacterCreationPage}/>
                    <Talents
                        talents={theClass.Talents}
                        condition={title => U.getNumberFromString(title) >= 2}
                        selectedSpellNames={selectedSpellNames}
                        onSpellClick={onSpellClick}
                        spellsMetadata={spellsMetadata}
                    />
                    <ComingSoonBanner/>
                </>}

                <br/><br/>
                { theClass.Specializations != null && <>
                    <LevelingUp theClass={theClass} isCharacterCreationPage={isCharacterCreationPage}/>
                    <div className='center-content margin-top-4'>
                        <QGTitle1 text={'Specializations'} height={45}/>
                    </div>
                </>}
                { theClass.Specs != null && (<>  
                    <div className='flex-responsive gap-half margin-top-2'>
                        { Object.keys(theClass['Specs']).map(specName => (
                            <Selector className="margin-top-1" key={specName} name={specName} onClick={() => onSpecClick(specName)} src={U.getSpecRepresentativeIconFullPath(theClass, specName)} isSelected={selectedSpecName == specName}/>
                        )) }
                    </div>
                </>)}

                { shouldDisplaySetRequired && (
                    isLoading? <LoadingCenter/>: <SetRequiredBanner setName={theClass.Set ?? 'basic'}/>
                ) }


            </Page>

            { selectedSpecName != null && isSelectedSpecFromThisClass && (
                <Spec hasNoMargins={hasNoMargins} key={selectedSpecName} name={selectedSpecName} specObj={selectedSpecObj} onSpellClick={onSpellClick}>

                    {
                        selectedSpecObj.Abilities != null && (
                            <div>
                                <PageH3>Choose One...</PageH3>
                                <ManySpells
                                    spells={U.spellsFromObject(selectedSpecObj.Abilities)}
                                    selectedSpellNames={selectedSpellNames}
                                    onSpellClick={onSpellClick}
                                    spellsMetadata={spellsMetadata}
                                />
                            </div>
                        )
                    }

                    <Talents
                        talents={selectedSpecObj.Talents}
                        selectedSpellNames={selectedSpellNames}
                        onSpellClick={onSpellClick}
                        spellsMetadata={spellsMetadata}
                    />
                    <ComingSoonBanner/>

                </Spec>
            )}

            <Page>
                { U.isLocalhost() && shouldHaveLocalhostPowerTable && (
                    <ClassPowerLevelTable theClass={theClass}/>
                )}
            </Page>
        </div>
    )
}

function getLevel1TalentTierNamesToEvaluate(theClass) {
    const names = [
        'Starting Abilities',
        ...Object.keys(theClass).filter(key => U.includesAny(key.toLowerCase(), ['level 1', 'utility', 'starting abilities', 'class talent', 'general talent']))
    ]

}
function calculateSpellsObjectAveragePower(obj) {
    const spells = U.spellsFromObject(obj)
    const powers = spells
        .map(a => parseFloat(a._Value))
        .filter(value => value != null && U.isNumber(value))
    return parseFloat(U.average(powers).toFixed(2))
}
function calculateSpellsObjectTotalPower(obj) {
    const startingAbilities = U.spellsFromObject(obj)
    const startingAbilitiesPower = startingAbilities
        .map(a => a._Value ?? 0)
        .map(value => U.isNumber(value)? parseFloat(value): 0)
        .reduce((soFar, v) => soFar + v, 0)
    return parseFloat(startingAbilitiesPower.toFixed(2))
}
function getClassManaAtLevel(theClass, level) {
    const baseMana =
        theClass.Spellcasting?.Mana?.Per == 'per Worthy Combat'?
            theClass.Spellcasting.Mana.Amount * 2.5:
        (theClass.Spellcasting?.Mana?.Amount ?? 0)
    const manaPerLevel = theClass['Level Up']?.['Every Level']?.Mana ?? 0
    return baseMana + (level - 1) * manaPerLevel
}
function findTalentsCategoryObjectAtLevel(talentsObject, level) {
    const talentTierName = findTalentsCategoryNameAtLevel(talentsObject, level)
    if (talentTierName == null) {
        return null
    }
    return talentsObject[talentTierName]
}
function findTalentsCategoryNameAtLevel(talentsObject, level) {
    return Object.keys(talentsObject).find(category => category.includes(level + ''))
}
function calculateAveragePowerOnlyForLevelNoMana(theClass, level) { /* -> { [specName]: power, power: power } */
    if (level == 1) {
        const startingAbilitiesPower = calculateSpellsObjectTotalPower(theClass['Starting Abilities'])
        const minorLevel1TalentsPower = theClass['Ability Choices'] == null? 0: calculateSpellsObjectAveragePower(theClass['Ability Choices'])
        const utilityPower = theClass['Utility'] == null? 0: calculateSpellsObjectAveragePower(theClass['Utility'])
        const otherAbilities = theClass['Other Abilities'] == null? 0: calculateSpellsObjectAveragePower(theClass['Other Abilities'])
        let level1TalentsPower = 0
        if (theClass.Talents != null) {
            const level1Keys = Object.keys(theClass.Talents).filter(talentCategory => talentCategory.includes('Level 1'))
            const level1Powers = level1Keys.map(category => calculateSpellsObjectAveragePower(theClass.Talents[category]))
            const totalTalentsLevel1Power = level1Powers.reduce((soFar, x) => soFar + x, 0)
            level1TalentsPower = totalTalentsLevel1Power
        }

        const totalPower = parseFloat((startingAbilitiesPower + utilityPower + otherAbilities + minorLevel1TalentsPower + level1TalentsPower).toFixed(2))
        return { startingAbilitiesPower, utilityPower, minorLevel1TalentsPower, otherAbilities, level1TalentsPower, power: totalPower }
    }

    if (theClass.Specs == null) {
        const talentTier = findTalentsCategoryObjectAtLevel(theClass.Talents, level)
        if (talentTier == null) {
            return 0
        }
        const totalPower = calculateSpellsObjectAveragePower(talentTier)
        return { power: totalPower }
    }

    const specNames = Object.keys(theClass.Specs)
    const specPowersForThisLevel = specNames.map(specName => {
        const spec = theClass.Specs[specName]
        const talentTier = findTalentsCategoryObjectAtLevel(spec.Talents, level)
        if (talentTier == null) {
            return 0
        }
        const baseSpecPower = level != 2? 0: calculateSpellsObjectTotalPower(spec['Starting Abilities'])
        const power = parseFloat((baseSpecPower + calculateSpellsObjectAveragePower(talentTier)).toFixed(2))
        if (level == 2) {
            return { baseSpecPower, power }
        } else {
            return { power }
        }
    })

    const specsPowers = specNames.map((specName, i) => ({
        specName,
        ...specPowersForThisLevel[i]
    }))

    const totalPower = parseFloat(U.average(specPowersForThisLevel.map(({power}) => power)).toFixed(2))
    return {power: totalPower, specs: specsPowers}
}
window.calculateAveragePowerOnlyForLevelNoMana = calculateAveragePowerOnlyForLevelNoMana
function calculateTotalPowerAtLevelNoMana(theClass, level) {
    const thisLevelPower = calculateAveragePowerOnlyForLevelNoMana(theClass, level).power
    if (level == 1) {
        return thisLevelPower
    }
    return parseFloat((thisLevelPower + calculateTotalPowerAtLevelNoMana(theClass, level - 1)).toFixed(2))
}

export function generateClassPowerLevelTable(theClass) {
    const hasSpecs = theClass.Specs != null
    const specNames = hasSpecs? Object.keys(theClass.Specs): [theClass.Class]

    const headers = [...specNames, 'Mana', 'Total Value So Far']

    const baseMana = getClassManaAtLevel(theClass, 1)
    const manaRow = [...specNames.map(_ => baseMana), baseMana, baseMana]

    const { startingAbilitiesPower, minorLevel1TalentsPower, level1TalentsPower, power } = calculateAveragePowerOnlyForLevelNoMana(theClass, 1)
    const startingAbilitiesRow = [...specNames.map(_ => startingAbilitiesPower), baseMana, startingAbilitiesPower + baseMana]
    const level1Row = [...specNames.map(_ => (minorLevel1TalentsPower + level1TalentsPower)), baseMana, power + baseMana]

    const levels = [2,3,4,5,6,7,8,9,10].map(level => {
        const { specs, power } = calculateAveragePowerOnlyForLevelNoMana(theClass, level)
        const totalManaAtThisLevel = getClassManaAtLevel(theClass, level)
        const totalPowerByThisLevel = calculateTotalPowerAtLevelNoMana(theClass, level)
        let thisLevelRow
        if (hasSpecs) {
            thisLevelRow = [...specs.map(({power}) => power), totalManaAtThisLevel, U.toFixedFloat(totalPowerByThisLevel + totalManaAtThisLevel, 2)]
        } else {
            thisLevelRow = [...specNames.map(_ => power), totalManaAtThisLevel, U.toFixedFloat(totalPowerByThisLevel + totalManaAtThisLevel, 2)]
        }
        const key = `Level ${level}`
        return { key, value: thisLevelRow }
    })

    const table = [
        { key: 'Mana', value: manaRow},
        { key: 'Starting Abilities', value: startingAbilitiesRow },
        { key: 'Level 1', value: level1Row },
        ...levels
    ]

    return {
        headers,
        rows: table
    }
}

window.generateClassPowerLevelTable = generateClassPowerLevelTable

function ClassPowerLevelTable({theClass}) {

    let { headers, rows } = generateClassPowerLevelTable(theClass)
    
    headers = ['', ...headers]
    const dataRows = rows.map(({key, value}) => [key, ...value])


    return <TableNormal columns={headers}>
        
        { dataRows.map((row, i) => <tr key={`tr-${i}`}>
            { row.map((value, i) => (
                <td key={i}>{`${value}` /* Prevents NaN warning */}</td>
            )) }
        </tr>)}

    </TableNormal>
}