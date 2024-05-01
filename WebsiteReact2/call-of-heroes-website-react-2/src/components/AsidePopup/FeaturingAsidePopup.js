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
            <div style={isThisFeatureDisplayedStyle('Quests')}>
                <AsideH3>Quests</AsideH3>
                <AsideP>
                    A completed Quest is a milestone for the players. When the players complete a Quest, they regain all resources (Health, Mana, etc).
                    The Game Master decides what a Completed Quest is - it could be the end of a dungeon, saving an NPC, or finishing the game session.
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
            <div style={isThisFeatureDisplayedStyle('Respec')}>
                <AsideH3>Respeccing</AsideH3>
                <AsideP>
                    Between Quests, every player character can unlearn all Basic Abilities and Talents and try out a different build, free of cost.
                </AsideP>
            </div>
        </div>
    )
}