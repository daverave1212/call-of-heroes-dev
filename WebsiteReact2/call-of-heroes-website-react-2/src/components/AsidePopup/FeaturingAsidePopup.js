import Spell from '../Spell/Spell'
import './AsidePopup.css'

import abilities from '../../databases/Abilities.json'
import classAndRaceAbilities from '../../databases/ClassAndRaceAbilities.json'
import { spellWithName } from '../../utils'

export default function FeaturingAsidePopup({featureToDisplay}) {

    function isThisFeatureDisplayedStyle(name) {
        return featureToDisplay === name ? {display: ''} : {display: 'none'}
    }

    const isPopupDisplayedStyle = featureToDisplay == null? {display: 'none'} : {display: ''}
    const maybeIntroAnimClass = featureToDisplay == null? '' : 'aside-popup--intro'

    const AsideH3 = ({children}) => <h3 className='aside-h3'>{children}</h3>
    const AsideP = ({children}) => <p className='aside-p'>{children}</p>
    
    return (
        <div className={'aside-popup ' + maybeIntroAnimClass} style={isPopupDisplayedStyle}>
            <div style={isThisFeatureDisplayedStyle('Adventures')}>
                <AsideH3>Quests</AsideH3>
                <AsideP>
                    An Adventure is a period of time or a section of the game. It could mean completing a quest, a dungeon, a day of fighting, etc.
                    Players heal back up after finishing an Adventure.
                    Typically, an Adventure takes 2-3 combats.
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
                <Spell spell={abilities['Arcane']['~Flash~']}/>
            </div>
            <div style={isThisFeatureDisplayedStyle('Talents')}>
                <AsideH3>Talents</AsideH3>
                <AsideP>
                    Every 2 Levels, a Player Character can choose one Talent Ability from several options provided by their Class Specialization.
                </AsideP>
                <Spell spell={spellWithName('Jihad', classAndRaceAbilities['<Jihad>'])}/>
            </div>
            <div style={isThisFeatureDisplayedStyle('Farming')}>
                <AsideH3>Farming</AsideH3>
                <AsideP>
                    Many Abilities allow you to "farm" gold or permanently improve your character!
                </AsideP>
                <Spell spell={spellWithName("Fool's Gold", {...classAndRaceAbilities["~Fool's Gold~"], Notes: null})}/>
                <Spell spell={spellWithName("Primal Trophy", classAndRaceAbilities["<Primal Trophy>"])}/>
            </div>
            <div style={isThisFeatureDisplayedStyle('Player Quirks')}>
                <AsideH3>Player Quirks</AsideH3>
                <AsideP>
                    At the end of every Adventure, each player character gains a positive and a negative Quirk. The player decides one of them, the QM the other.
                    Quirks are bonuses that range from increasing/decreasing Stats, gaining non-combat Skills, phobias, etc.
                </AsideP>
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