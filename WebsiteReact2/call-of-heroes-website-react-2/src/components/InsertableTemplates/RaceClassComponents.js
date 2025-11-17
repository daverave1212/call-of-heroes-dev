import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import YAML from 'yaml'

import * as U from '../../utils'

import PageH1 from '../PageH1/PageH1'
import PageH2 from '../PageH2/PageH2'
import PageH3 from '../PageH3/PageH3'

import SmallStat, { SmallStatTypes } from '../SmallStat/SmallStat'
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
import abilityFonts from '../../databases/AbilityFonts.json'
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
import { BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP, HEALTH_REGEN, INITIATIVE, MAX_HEALTH, MOVEMENT_SPEED, normalizeTextWithStats } from '../../services/game-lib/stat-calculations'


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

export function RaceHeader({imgStyle, theRace, theClass, hueShift, height=60}) {

    const theRaceOrClass = theRace ?? theClass
    const name = theRaceOrClass.Race ?? theRaceOrClass.Class
    const layoutType = theRaceOrClass.LayoutType ?? 'A'
    const imageStyle = imgStyle ?? theRaceOrClass.ImageStyle

    console.log({theRaceOrClass})

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
            <div className='landscape-only'>
                <br/>
                <br/>
                <br/>
                <div className='center-content margin-bottom-2'>
                    <QGTitle1 text={name} hueShift={hueShift} height={height}/>
                </div>
                <br/>
                <br/>
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
                        <Column style={{zIndex: 1}}>
                            <RaceDescription description={descriptionLeft ?? description}/>
                        </Column>
                        <Column className={`flex column`} style={{position: 'relative'}}>
                            { descriptionRightTop && <p>{descriptionRightTop}</p>}
                            <img style={imageStyle} className={`class-image ${imageClass}`} src={imagePath}/>
                            { descriptionRightBottom && <p>{descriptionRightBottom}</p>}
                        </Column>
                    </TwoColumns>
                )}
                { descriptionAfter && <p>{descriptionAfter}</p>}
            </div>
            <div className='portrait-only'>
                <div className='center-content margin-bottom-2'>
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
    const descriptionComponents = U.insertBetweenAll(descriptionLines, (i) => <br/>)
    return (
        <div>
            { descriptionComponents }
        </div>
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
                        { theClass['Language'] && <SmallStat name="Language" type="vertical">{ theClass['Language'] }</SmallStat> }
                        {/* { theClass.Weapons && <SmallStat name="Weapon Training" type="vertical">{ theClass.Weapons }</SmallStat> } */}
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
                        <SmallStat name="Stat Distribution" type="vertical">{ normalizeTextWithStats(theRace.Creation['Stat Restrictions']) }</SmallStat>
                        <SmallStat name="Max Health"><Icon name="Health" type="small-stat"/>{ theRace.Stats['Base Health'] } + ({BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[MAX_HEALTH]})</SmallStat>
                        <SmallStat name="Health Regen"><Icon name="HealthRegen" type="small-stat"/> { theRace.Stats['Health Regen'] } + ({BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[HEALTH_REGEN]})</SmallStat>
                        <SmallStat name="Movement Speed">4 + {BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[MOVEMENT_SPEED]}</SmallStat>
                        <SmallStat name="Initiative">{BONUS_ATTRIBUTES_CALCULATIONS_TEXTS_MAP[INITIATIVE]}</SmallStat>
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
            <PageH2>Race Features</PageH2>

            <TwoColumns>
                <Column>
                    <div className='with-margined-children'>
                        <SmallStat name="Stat Distribution" type="vertical">{ normalizeTextWithStats(theRace.Creation['Stat Restrictions']) }</SmallStat>
                        <SmallStat name="Base Health"><Icon name="Health" type="small-stat"/>{ theRace.Stats['Base Health'] }</SmallStat>
                        <SmallStat name="Base Regen"><Icon name="HealthRegen" type="small-stat"/> { theRace.Stats['Health Regen'] }</SmallStat>
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
    return (
        <div style={{marginTop: pageMarginTop}} id="leveling-up">
            {/* <PageH2>Leveling Up</PageH2> */}
            <QGTitle1 text={'Leveling Up'} height={35}/>
    
            <TwoColumns type="normal">
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
                            </div>
                        ) :
                        theClass['Spellcasting']['Type'] == 'Special Mana-based' ||
                        theClass['Spellcasting']['Type'] == 'Hunter' ? (
                            <div>
                                <TableNormal columns={['Every Level Above 1 You Get...']}>
                                    <tr>
                                        <td>
                                            +{ theClass['Level Up']['Every Level']['Health'] } <Icon name="Health"/>Health
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            +2 <Icon name="HealthRegen"/>Health Regen
                                        </td>
                                    </tr>
                                </TableNormal>
                
                                <p style={{whiteSpace: 'pre-wrap'}} className='margined-bottom'>{ rules['LevelUpBonusesDescription (Special Mana-based)'] }</p>
                            </div>
                        ) : 
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
                                            +2 <Icon name="HealthRegen"/>Health Regen
                                        </td>
                                    </tr>
                                </TableNormal>
                
                                <p style={{whiteSpace: 'pre-wrap'}} className='margined-bottom'>{ rules['LevelUpBonusesDescription (Special Mana-based)'] }</p>
                            </div>
                        ): (
                            null
                        )
                    }
                </Column>
                <Column>
                    <p>
                        Every Level above Level 1, you get all the bonuses listed - the extra Max Health, the extra Health Regen, etc.<br/>
                        { isCharacterCreationPage && 'At Level 2, you can pick your Specialization. From Level 3 on, every Level, you get to pick a Talent choice'}
                        { isCharacterCreationPage != true && (
                            <span>Remember to pick your Specialization at Level 2, and then from Level 3 on, every Level, you get to pick a Talent choice! Note that when you gain extra Might, you also gain extra Max Health, and the same goes for Dexterity and Charisma with Initiative{ theClass.Class == 'Paladin'? '': <span>, and Intellgience with the number of Known Basic Abilities</span> }.</span>
                        )}
                        <br/>
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

export function SpellCasting({ theClass, isCharacterCreationPage=false }) {

    const [displayedBasicAbilityObj, setDisplayedBasicAbilityObj] = useState(null)

    const titlesByType = {
        'Paladin': 'Paladin',
        'Mana-based': 2,
        'Special Mana-based': 2
    }

    function SpellcastingType() {


        return (
            <div>
                <PageH3>{theClass.Spellcasting.Type} Casting</PageH3>
                
                { theClass.Spellcasting.Type == 'Mana-based'? (
                    <ManaDescriptionNormal/>
                ): (
                    <SpecialManaDescriptionNormal/>
                ) }

                <PageH3>Changing Abilities (Respec)</PageH3>
                <p>
                    You can change your character's chosen Utility Abilities and chosen Talents (your build) inbetween Adventures.<br/>
                    Note that non-talent Abilities that grant Stats can't be changed.<br/>
                    { isCharacterCreationPage == false && (
                        "Feats can't generally be changed once picked; they are permenant decisions."
                    )}
                </p>
                {
                    isCharacterCreationPage == false && (
                        <p>{ theClass.Spellcasting.Other }</p>    
                    )
                }
            </div>
        )
    }

    function ManaBasedSpellcasting() {
        return (
            <div>
                <PageH3>Mana-Based {theClass['Spellcasting'].SpellsOrAbilities} Casting</PageH3>
                <ManaDescriptionNormal/>
                <PageH3>Changing {theClass['Spellcasting'].SpellsOrAbilities === 'Spell' ? 'Spells' : 'Abilities'}</PageH3>
                <p>
                    You can change your known Basic Abilities and Talents inbetween Adventures.<br/>
                    { isCharacterCreationPage == false && (
                        "Feats can't generally be changed once picked; they are permenant decisions."
                    )}
                </p>
                {
                    isCharacterCreationPage == false && (
                        <p>{ theClass.Spellcasting.Other }</p>    
                    )
                }
                
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
                    <p>
                        You can change your known Basic Abilities and Talents inbetween Adventures.<br/>
                        { isCharacterCreationPage == false && ( /* For spacing */
                            "Feats can't generally be changed once picked; they are permenant decisions."
                        )}
                    </p>
                    {
                        isCharacterCreationPage == false && ( /* For spacing */
                            <p>{ theClass.Spellcasting.Other }</p>    
                        )
                    }
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
                        { displayedBasicAbilityObj != null && (
                            <Spell spell={displayedBasicAbilityObj}/>
                        ) }
                    </Column>
                    <Column>
                        <p>
                            This is a list of recommended Basic Abilities (from your Basic Ability Schools mentioned above) for when you are undecided on which Basic Abilities to get, or you simply want a quick character creation.
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

    const title = (theClass['Spellcasting'].SpellsOrAbilities === 'Spell' ? 'Spells' : 'Abilities') + ' and Mana'

    return (
        <div id={theClass['Spellcasting'].SpellsOrAbilities === 'Spell' ? 'spells-and-mana' : 'abilities-and-mana'}>
            <QGTitle1 text={title} height={35}/>

            <TwoColumns>
                <Column>
                    <div className='with-margined-children'>
                        <PageH3>Basic Abilities</PageH3>
                        { theClass.Spellcasting?.Type != null && theClass.Spellcasting?.Mana?.Amount != null && (
                            <SmallStat name="Mana" color="blue">
                                <Icon name="Mana"/>{ theClass.Spellcasting.Mana.Amount } ({
                                    theClass.Spellcasting.Mana.Per ?? ''
                                })
                            </SmallStat>
                        )}
                        {
                            theClass['Spellcasting']['Known Basic Abilities'] != null &&
                            isCharacterCreationPage == false &&
                            (
                                <SmallStat name="Number of Known Basic Abilities" type="vertical" color="blue">
                                    { theClass['Spellcasting']['Known Basic Abilities'] }
                                </SmallStat>
                            )
                        }
                        <SmallStat name="Extra Talents" color="blue" type={SmallStatTypes.VERTICAL}>
                            Each Level, choose a free Talent from that Level.<br/><br/>
                            However, if your <b>Mind</b> above 0, you can choose a number of <b>extra Minor or Utility Talents</b> equal to your <b>Mind</b>.
                        </SmallStat>
                    </div>
                </Column>
                <Column>
                    <SpellcastingType/>
                </Column>
            </TwoColumns>
            
            { isCharacterCreationPage == false && ( <>
                <br/>
                <RecommendedBasicSpells/>
            </>)}
            
            
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
            <QGTitle1 text={name} height={60}/>
            <p>{specObj.Description}</p>

            <PageH3>You start with...</PageH3>

            <ManySpells spells={U.spellsFromObject(specObj['Starting Abilities'])}/>

            {children}
        </Page>
    )
}

export function SpecTalents({ spec, selectedSpellNames, onSpellClick, spellsMetadata }) {

    const talentTitles = Object.keys(spec.Talents)

    return (
        <div>
            <QGTitle1 text={'Talents'} height={35}/>
            <p>Every Level, you can pick 1 Talent from that Level's available Talents. There are Minor Talents, Major Talents and Utility Talents.</p>

            { talentTitles.map(talentTitle => {
                const spellsInThisTier = U.spellsFromObject(spec.Talents[talentTitle])
                return <div key={talentTitle}>
                    <PageH3>{talentTitle}</PageH3>
                    <ManySpells spells={spellsInThisTier} selectedSpellNames={selectedSpellNames} onSpellClick={onSpellClick} spellsMetadata={spellsMetadata}/>
                </div>
            })}
        </div>
    )
}
export function Talents({ talentsByTiers, selectedSpellNames, onSpellClick, spellsMetadata }) {

    const talentTitles = U.sortStringArrayNaturally(Object.keys(talentsByTiers))

    return (
        <div>
            <QGTitle1 text={'Talents'} height={35}/>
            <p>Every Level, you can pick 1 Talent from that Level's available Talents. There are Minor Talents, Major Talents and Utility Talents.</p>

            { talentTitles.map(talentTitle => {
                const spellsInThisTier = U.spellsFromObject(talentsByTiers[talentTitle])
                return <div key={talentTitle}>
                    <PageH3>{talentTitle}</PageH3>
                    <ManySpells spells={spellsInThisTier} selectedSpellNames={selectedSpellNames} onSpellClick={onSpellClick} spellsMetadata={spellsMetadata}/>
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
            { title != null && <QGTitle1 text={title} height={35}/> }

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


export function RacePage({ theRace }) {
    return (
        <div>

            <SideMenuFromRace theRace={theRace}/>
            <Page>

                <RaceHeader theRace={theRace}/>

                <RaceFeatures theRace={theRace}/>

                <Proficiencies name={theRace.Race} theRaceOrClass={theRace}/>

                
                <QGTitle1 text={'Abilities'} height={35}/>
                <ManySpells spells={theRace['Starting Abilities']} description={theRace['Starting Abilities Description']}/>
                { theRace['Ability Choices'] != null && (
                    <div>
                        <PageH2>Ability Choice</PageH2>
                        <ManySpells spells={theRace['Ability Choices']} description={theRace['Ability Choices Description']}/>
                    </div>
                )}

                <PageH2>Race Feats</PageH2>
                <p>Choose one Race Feat from below. Your choice is permanent!</p>
                <ManySpells spells={U.spellsFromObject(theRace.Talents)}/>

            </Page>

            

        </div>
    )
}
export function CCRacePage({ theRace, selectedSpellNames, onSpellClick }) {

    return (
        <div>
            <Page hasNoMargins={true}>

                <CCRaceFeatures theRace={theRace}/>

                <Proficiencies name={theRace.Race} theRaceOrClass={theRace}/>

                <QGTitle1 text={'Abilities'} height={35}/>
                <ManySpells
                    spells={theRace['Starting Abilities']}
                    description={theRace['Starting Abilities Description']}
                />
                
                { theRace['Ability Choices'] != null && (
                    <div>
                        <PageH2>Ability Choice</PageH2>
                        {/* <ManySpells
                            spells={theRace['Ability Choices']}
                            description={theRace['Ability Choices Description']}
                            onSpellsSelected={spellsSelected => onAbilityChoicesSelected(spellsSelected)}
                        /> */}
                        <ManySpells
                            spells={theRace['Ability Choices']}
                            description={theRace['Ability Choices Description']}
                            selectedSpellNames={selectedSpellNames}
                            onSpellClick={onSpellClick}
                        />
                    </div>
                )}

                <PageH2>Race Feats</PageH2>
                <p>Choose one Race Feat from below. Your choice is permanent!</p>
                {/* <ManySpells
                    spells={U.spellsFromObject(theRace.Talents)}
                    onSpellsSelected={spellsSelected => onFeatsSelected(spellsSelected)}
                /> */}
                <ManySpells
                    spells={U.spellsFromObject(theRace.Talents)}
                    selectedSpellNames={selectedSpellNames}
                    onSpellClick={onSpellClick}
                />

            </Page>
        </div>
    )
}

export function ClassPage(props) {
    return <ClassPageV2 {...props}/>
}
export function ClassPageV1({ theClass }) {
    return (
        <div>
            <SideMenuFromClass theClass={theClass}/>
            
            <Page>
                
                <RaceHeader theClass={theClass}/>
                
                { theClass.Druidic && (
                    <div>
                        <PageH3 style={{marginTop: 'var(--page-padding)'}}>Druidic</PageH3>
                        <p>{theClass.Druidic}</p>
                    </div>
                )}            
                
                <StartingAbilities spellsObject={theClass['Starting Abilities']} description={theClass['Starting Abilities Description']}/>

                <SpellCasting theClass={theClass}/>

                <Equipment theClass={theClass}/>
                
                <LevelingUp theClass={theClass}/>

                <br/><br/>
                <QGTitle1 text={'Specializations'} height={35}/>

                <p>
                    When you reach Level 2, you can choose one of the Specializations below.
                    This decision is permanent, so make the choice that is right for you.
                </p>

            </Page>

            {
                Object.keys(theClass['Specs']).map(specName => {
                    const spec = theClass['Specs'][specName]
                    return (
                        <Spec key={specName} name={specName} specObj={spec} onSpellClick={onSpellClick}>

                            {
                                spec.Abilities != null && (
                                    <div>
                                        <PageH3>Choose One...</PageH3>
                                        <ManySpells spells={U.spellsFromObject(spec.Abilities)} onSpellClick={onSpellClick}/>
                                    </div>
                                )
                            }

                            <Talents talentsByTiers={spec.Talents}/>

                        </Spec>
                    )
                })
            }
        </div>
    )
}
export function ClassPageV2({
    theClass,
    hasNoMargins=false,
    hasHeader=true,
    selectedSpecName, setSelectedSpecName,
    selectedSpellNames, setSelectedSpellNames,
    onSpellClick,
    hueShift,
    spellsMetadata
}) {

    console.log({onSpellClick})

    let [innerSelectedSpecName, setInnerSelectedSpecName] = useState(null)
    let [selectedFontName, setSelectedFontName] = useState('Wild')

    const finalSelectedSpecName = selectedSpecName ?? innerSelectedSpecName
    const selectedSpecObj = finalSelectedSpecName == null? null: theClass.Specs[finalSelectedSpecName]
    const fontCategory = abilityFonts[selectedFontName]

    const fontExceptions = theClass.Spellcasting?.FontExceptions ?? {}
    const fontUtilityTalents = fontExceptions['Utility']? {}: (fontCategory.Utility ?? {})
    const fontMinorTalents = U.filterObject(fontCategory.Talents, ({ key, value }) => fontExceptions[key]? false: true)


    const getStartingAbilitiesWithFont = () => U.mergeObjects(theClass['Ability Choices'] ?? theClass.Talents?.['Level 1 - Minor Talent'] ?? {}, fontCategory.Talents['Level 1 - Minor Talent'] ?? {} )
    const getUtilityTalentsWithFont = () => U.mergeObjects(theClass.Utility ?? {}, fontUtilityTalents)
    const getClassTalentsWithFont = () => U.addObjects(theClass.Talents ?? {}, fontMinorTalents, true)

    const getSpecTalentsWithFont = () => {
        const fontTalentsExceptSome = {...fontMinorTalents}
        delete fontTalentsExceptSome["Level 1 - Minor Talent"]
        const specTalents = selectedSpecObj.Talents
        console.log({fontTalentsExceptSome, specTalents})
        return U.addObjects(specTalents, fontTalentsExceptSome, true)
    }

    window.getSpecTalentsWithFont = getSpecTalentsWithFont


    function onSpecClick(specName) {
        if (setSelectedSpecName != null) {
            setSelectedSpecName?.(specName)
        } else {
            setInnerSelectedSpecName(specName)
        }
        setSelectedSpellNames?.([])
    }

    function FontTabs() {
        const fontNames = Object.keys(abilityFonts)
        const fontColumns = U.splitArrayEvenly(fontNames, 2)
        console.log({fontNames, fontColumns})

        return <div className='flex row full-width gap-half'>
            { fontColumns.map(names => (
                <div className='flex column gap-half flex-1'>
                    { names.map(fontName => (
                        <Selector name={fontName} src={''} isSelected={selectedFontName == fontName} onClick={() => setSelectedFontName(fontName)}/>
                    ))}
                </div>
            )) }
        </div>
    }


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
                
                <StartingAbilities spellsObject={theClass['Starting Abilities']} description={theClass['Starting Abilities Description']}/>

                <SpellCasting theClass={theClass} isCharacterCreationPage={true}/>
                
                <LevelingUp theClass={theClass} isCharacterCreationPage={true}/>

                <FontTabs/>

                <QGTitle1 text={"Starting Talents"} height={45}/>

                { theClass['Other Abilities'] != null && (
                    <div>
                        <PageH2>{theClass['Other Abilities Title']}</PageH2>
                        <ManySpells
                            spells={theClass['Other Abilities']}
                            description={theClass['Other Abilities Description']}
                            selectedSpellNames={selectedSpellNames}
                            onSpellClick={onSpellClick}
                            spellsMetadata={spellsMetadata}
                        />
                    </div>
                )}

                { theClass.Specs != null && (
                    <div>
                        <PageH2>Level 1 - Minor Talent</PageH2>
                        <ManySpells
                            spells={getStartingAbilitiesWithFont()}
                            description={theClass['Ability Choices Description']}
                            selectedSpellNames={selectedSpellNames}
                            onSpellClick={onSpellClick}
                            spellsMetadata={spellsMetadata}
                        />
                    </div>
                )}


                
                { (theClass['Utility'] != null || fontCategory['Utility'] != null) && (
                    <div>
                        <PageH2>Level 1 - Utility Talent</PageH2>
                        <ManySpells
                            spells={getUtilityTalentsWithFont()}
                            description={theClass['Utility Description']}
                            selectedSpellNames={selectedSpellNames}
                            onSpellClick={onSpellClick}
                            spellsMetadata={spellsMetadata}
                        />
                    </div>
                )}

                { theClass['Ideas'] != null && (
                    <div>
                        <PageH2>Ideas</PageH2>
                        <ManySpells
                            spells={theClass['Ideas']}
                            description={'This is for testing purposes only. Ignore this section.'}
                            selectedSpellNames={selectedSpellNames}
                        />
                    </div>
                )}

                <br/><br/>
                { theClass.Specializations != null &&
                    <div className='center-content'>
                        <QGTitle1 text={'Specializations'} height={35}/>
                    </div>
                }
                { theClass.Specs != null && (<>  
                    <div className='flex-responsive gap-half'>
                        { Object.keys(theClass['Specs']).map(specName => (
                            <Selector className="margin-top-1" key={specName} name={specName} onClick={() => onSpecClick(specName)} src={U.getSpecRepresentativeIconFullPath(theClass, specName)} isSelected={finalSelectedSpecName == specName}/>
                        )) }
                    </div>
                </>)}

                { theClass.Talents != null && <>
                    <Talents
                        talentsByTiers={getClassTalentsWithFont()}
                        selectedSpellNames={selectedSpellNames}
                        onSpellClick={onSpellClick}
                        spellsMetadata={spellsMetadata}
                    />
                </>}


            </Page>

            { finalSelectedSpecName != null && (
                <Spec hasNoMargins={hasNoMargins} key={finalSelectedSpecName} name={finalSelectedSpecName} specObj={selectedSpecObj} onSpellClick={onSpellClick}>

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
                        talentsByTiers={getSpecTalentsWithFont()}
                        selectedSpellNames={selectedSpellNames}
                        onSpellClick={onSpellClick}
                        spellsMetadata={spellsMetadata}
                    />

                </Spec>
            )}

            <Page>
                { (
                    <ClassPowerLevelTable theClass={theClass}/>
                )}
            </Page>
        </div>
    )
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
function calculateAveragePowerPerTalentTier(talentsObject) {
    return U.mapObject(talentsObject, ({ key, value }) => {
        return ({
            key: key,
            value: calculateSpellsObjectAveragePower(value)
        })
    })
}
function ClassPowerLevelTable({theClass}) {

    const getsManaPerLevel = theClass.Spellcasting?.Mana?.Per == 'per Adventure'
    const baseMana =
        theClass.Spellcasting?.Mana?.Per == 'per Worthy Combat'?
            5:
        getsManaPerLevel?
            theClass.Spellcasting.Mana.Amount:
        0

    const startingAbilitiesPower = calculateSpellsObjectTotalPower(theClass['Starting Abilities'])
    const minorLevel1TalentsPower = theClass['Ability Choices'] == null? 0: calculateSpellsObjectAveragePower(theClass['Ability Choices'])
    const talentTiersPowers = calculateAveragePowerPerTalentTier(theClass.Talents ?? {})


    let headers
    if (theClass.Specs == null) {
        headers = ['', 'Value', 'Mana', 'Total Value So Far']
    } else {
        headers = ['', ...Object.keys(theClass.Specs), 'Mana', 'Total Value So Far']
    }

    const nSpecs = theClass.Specs == null? 1: Object.keys(theClass.Specs).length
    const specsStartingAbilitiesPowersArray = theClass.Specs == null? []: (
        Object.keys(theClass.Specs)
            .map(key => calculateSpellsObjectTotalPower(theClass.Specs[key]['Starting Abilities']))
    )

    function calculateSpecsTableMatrix() {
        const specNames = Object.keys(theClass.Specs)
        let specsTalentTiersPowers
        let allTalentTierNames = Object.keys(U.mergeManyObjects(specNames.map(specName => theClass.Specs[specName].Talents)))
        if (theClass.Specs != null) {
            specsTalentTiersPowers = U.mapObject(theClass.Specs, ({ key, value }) => ({
                key: key,
                value: calculateAveragePowerPerTalentTier(value.Talents)
            }))
        }

        const tableMatrix = []
        let previousRowFinalValue = startingAbilitiesPower + baseMana + minorLevel1TalentsPower + U.average(specsStartingAbilitiesPowersArray)
        let previousRowMana = baseMana
        for (let i = 0; i < allTalentTierNames.length; i++) {
            const tierName = allTalentTierNames[i]
            const innerCols = specNames.map(specName => specsTalentTiersPowers[specName][tierName])
            let finalValueCol = U.average(innerCols) + previousRowFinalValue
            let mana = previousRowMana
            if (getsManaPerLevel) {
                if (tierName.includes('Level 1') == false) {
                    previousRowMana += 1
                    finalValueCol += 1
                    mana = previousRowMana
                }
            }
            
            
            const thisRow = [tierName, ...innerCols, mana, finalValueCol]
        
            tableMatrix.push(thisRow)

            previousRowFinalValue = finalValueCol
        }
        console.log(tableMatrix)
        return tableMatrix
    }

    function calculateNormalTalentsTableMatrix() {
        const rows = []
        let previousRowPower = startingAbilitiesPower + baseMana + minorLevel1TalentsPower
        const talentTierNames = Object.keys(talentTiersPowers)
        for (let i = 0; i < talentTierNames.length; i++) {
            const tierName = talentTierNames[i]
            const power = talentTiersPowers[tierName]
            const mana = getsManaPerLevel? (baseMana + i + 1): baseMana
            const total = (previousRowPower + power + (getsManaPerLevel? 1: 0))
            previousRowPower = total
            const row = [tierName, power, mana, total]
            rows.push(row)
        }
        return rows
    }


    return <TableNormal columns={headers}>
        <tr>
            <td>Mana</td>
            { U.range(0, nSpecs).map(_ => <td>{baseMana}</td>) }
            <td>{baseMana}</td>
            <td>{baseMana}</td>
        </tr>
        <tr>
            <td>Base Class</td>
            { U.range(0, nSpecs).map(_ => <td>{startingAbilitiesPower}</td>) }
            <td>{baseMana}</td>
            <td>{startingAbilitiesPower + baseMana}</td>
        </tr>
        { theClass['Ability Choices'] != null && (
            <tr>
                <td>Minors Level 1</td>
                { U.range(0, nSpecs).map(_ => <td>{minorLevel1TalentsPower}</td>) }
                <td>{baseMana}</td>
                <td>{startingAbilitiesPower + baseMana + minorLevel1TalentsPower}</td>
            </tr>
        ) }
        { theClass.Specs != null && (
            <tr>
                <td>Spec</td>
                { specsStartingAbilitiesPowersArray.map(power => <td>{ power }</td>) }
                <td>{baseMana}</td>
                <td>{startingAbilitiesPower + baseMana + minorLevel1TalentsPower + U.average(specsStartingAbilitiesPowersArray)}</td>
            </tr>
        )}
        {/* { theClass.Talents != null && Object.keys(talentTiersPowers).map((tierName, i) => (
            <tr>
                <td>{tierName}</td>
                <td>{talentTiersPowers[tierName]}</td>
                <td>{baseMana == 0? 0: (baseMana + i + 1)}</td>
                <td>?</td>
            </tr>
        ))} */}
        { theClass.Talents != null && (
            calculateNormalTalentsTableMatrix().map(row => (
                <tr>
                    { row.map(col => <td>{col}</td>)}
                </tr>
            ))
        )}
        { theClass.Specs != null && (
            calculateSpecsTableMatrix().map(row => (
                <tr>
                    { row.map(col => <td>{col}</td>)}
                </tr>
            ))
        )}
        
    </TableNormal>
}