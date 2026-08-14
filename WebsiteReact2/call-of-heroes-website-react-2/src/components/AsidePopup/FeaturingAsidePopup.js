import Spell from '../Spell/Spell'
import './AsidePopup.css'

import abilities from '../../databases/Abilities.json'
import classAndRaceAbilities from '../../databases/ClassAndRaceAbilities.json'
import quirks from '../../databases/Other/Quirks.json'
import { getAllSpellsByName, spellWithName } from '../../utils'
import Icon from '../Icon'
import MonsterAbility from '../MonsterAbility/MonsterAbility'
import PageH3 from '../PageH3/PageH3'

export default function FeaturingAsidePopup({featureToDisplay}) {

    function isThisFeatureDisplayedStyle(name) {
        return featureToDisplay === name ? {display: ''} : {display: 'none'}
    }

    const isPopupDisplayedStyle = featureToDisplay == null? {display: 'none'} : {display: ''}
    const maybeIntroAnimClass = featureToDisplay == null? '' : 'aside-popup--intro'

    const AsideH3 = ({children}) => <PageH3 className="center-text">{children}</PageH3>
    const AsideP = ({children}) => <div className='aside-p'>{children}</div>
    
    return (
        <div className={'aside-popup shadowed ' + maybeIntroAnimClass} style={isPopupDisplayedStyle}>
            <div style={isThisFeatureDisplayedStyle('Saves')}>
                <AsideH3>Your Hero, your choice!</AsideH3>
                <AsideP>
                    Monsters have attacks that let you, the Hero, choose the effect you think is <i>fair</i>... choose your poison:
                    <br/>
                    <br/>
                    <MonsterAbility ability={{
                        Name: 'Antheir Attack',
                        Damage: "1d10 Smash",
                        Effect: `Target chooses to take +50% Damage from this attack or be Rooted.`
                    }}/>
                    <MonsterAbility ability={{
                        Name: 'Stone Glare',
                        Effect: `Players must choose a Hero the Cockatrice can see to take 4d6 True Damage and become Blinded.`
                    }}/>
                </AsideP>
            </div>
            <div style={isThisFeatureDisplayedStyle('Mana')}>
                <AsideH3>Mana</AsideH3>
                <AsideP>
                    Spend Mana to cast powerful Abilities!
                    <Spell spell={getAllSpellsByName()['Frostfall']}/>
                </AsideP>
            </div>
            <div style={isThisFeatureDisplayedStyle('Plot Points')}>
                <AsideH3>Plot Points</AsideH3>
                <AsideP>
                    Whenever you roll a Check (2d6), if you rolled equals, someone gains a Plot Point.<br/>
                    Spend Plot Points to introduce <i>Actually</i> truths to the situation.
                    <br/><br/>
                    <i>"Actually, there <b>is</b> a tree between me and the enemy!"</i><br/>
                </AsideP>
            </div>
            <div style={isThisFeatureDisplayedStyle('Adventures')}>
                <AsideH3>Adventures & Regen</AsideH3>
                <AsideP>
                    Heroes regenerate Health after every Combat, and go back to full resources at the end of every <b>Adventure</b>.
                    An <b>Adventure</b> is a period of time or a section of the game. It could mean one session, one completed quest, a dungeon, a milestone, etc.
                    Typically, an <b>Adventure</b> takes 2-3 Combats.
                </AsideP>
            </div>
            <div style={isThisFeatureDisplayedStyle('Worthiness')}>
                <AsideH3>Worthiness</AsideH3>
                <AsideP>
                    Certain Abilities only work on "Worthy Enemies".
                    A Worthy Enemy is a genuinely threatening enemy that tries to defeat you during a Combat Encounter.
                </AsideP>
            </div>
            <div style={isThisFeatureDisplayedStyle('Abilities')}>
                <AsideH3>Abilities</AsideH3>
                <AsideP>
                    An Ability is <i>something someone can do</i> that is clearly delimited in an Ability block.
                </AsideP>
                <Spell spell={getAllSpellsByName()['Hail']}/>
            </div>
            <div style={isThisFeatureDisplayedStyle('Talents')}>
                <AsideH3>Talents</AsideH3>
                <AsideP>
                    Each Level, Heroes can choose one Talent Ability from several options from their Class:
                </AsideP>
                <Spell spell={getAllSpellsByName()['Pyromancy']}/>
                <Spell spell={getAllSpellsByName()['Hydromancy']}/>
            </div>
            <div style={isThisFeatureDisplayedStyle('Farming')}>
                <AsideH3>Farming</AsideH3>
                <AsideP>
                    Many Abilities allow you to <span className='nowrap'>"farm" <Icon name="Gold"/>Gold</span> or permanently improve your Hero!
                </AsideP>
                <Spell spell={spellWithName("Fool's Gold", {...classAndRaceAbilities["~Fool's Gold~"], Notes: null})}/>
                <Spell spell={getAllSpellsByName()['Arcano Mantissa']}/>
            </div>
            <div style={isThisFeatureDisplayedStyle('Player Quirks')}>
                <AsideH3>Player Quirks</AsideH3>
                <AsideP>
                    At the end of every Adventure, each player character gains a positive and a negative Quirk. The player decides one of them, the QM the other.
                    Quirks are bonuses that range from increasing/decreasing Stats, gaining non-combat Skills, phobias, etc.
                </AsideP>
                <Spell spell={spellWithName("Fatigue", quirks.Negative['Fatigue'])}/>
            </div>
            <div style={isThisFeatureDisplayedStyle('Respec')}>
                <AsideH3>Respeccing</AsideH3>
                <AsideP>
                    Between Quests, every player character can unlearn all Basic Abilities and Talents and try out a different build, free of cost.
                </AsideP>
            </div>
        </div>
    )
}