import React, { useEffect, useState } from 'react'
import HomeBanner1 from '../components/HomeBanner/HomeBanner1'
import HomeBanner2 from '../components/HomeBanner/HomeBanner2'
import Icon from '../components/Icon'
import LandingPageSeparator from '../components/LandingPageSeparator/LandingPageSeparator'
import PromoPopup from '../components/PromoPopup/PromoPopup'

import './Home.css'
import FeaturingAsidePopup from '../components/AsidePopup/FeaturingAsidePopup'
import { CoolButton } from '../components/CoolButton/CoolButton'
import HeroButton from '../components/HeroButton/HeroButton'
import { Link } from 'react-router-dom'
import BottomWaveEffect from '../components/BottomWaveEffect/BottomWaveEffect'
import HeroPageIntroPortrait from '../components/hero/HeroPageIntroPortrait/HeroPageIntroPortrait'
import { HeroSection } from './Other/RulesExplained/Learn'
import AnchorFixer, { AnchorFixerLess } from '../components/AnchorFixer/AnchorFixer'
import { HeroSlide } from '../components/HeroSlide/HeroSlide'
import { QGTitle1 } from './Tools/TitleGenerator'
import { useConstIsPortrait } from '../utils'

export default function() {

  const [featureToDisplay, setFeatureToDisplay] = useState(null)
  const isPortrait = useConstIsPortrait()

  function BoldPurple({ children }) {
    return <span style={{fontWeight: 'bold', color: 'var(--theme-color-darker)'}}>{children}</span>
  }
  function Feature({ children, name }) {
    const featureName = name ?? children
    return <b className="advantages-feature" onClick={() => setFeatureToDisplay(featureName)}>{children}</b>
  }

  return (
    <div>

      {/* <PromoPopup id="Kickstarter-Promo-Popup">
          <p className='hero-text'>
            Coming to Kickstarter in December 2024!
          </p>
        <button onClick={() => {
          document.querySelector('#Kickstarter-Promo-Popup').style.display = 'none'
        }}>Awesome!</button>
      </PromoPopup> */}




      <HeroPageIntroPortrait/>
      <div className="hero-page landscape-only">
        <div className='hero-image-container'>
          <img src="/Classes/Mage.png"/>
        </div>

        <div className='hero-content'>
          <img className='hero-logo-img' src='/LandingPage/QuestGuardLogo.png'/>
          <p className='hero-text' style={{textAlign: 'center'}}>
            A TTRPG alternative that plays like a tactical video game:<br/>
            <BoldPurple>Fast</BoldPurple>, <BoldPurple>quirky</BoldPurple>, and surprisingly easy (<BoldPurple>to break the game</BoldPurple>)!
            {/* Speedrun boss fights, stack combos, and break the game in an RPG build for today's generation. */}
          </p>
          
          <HeroButton href="#Home-Advantages">
            Show Me
          </HeroButton>

        </div>
      </div>
      <AnchorFixerLess id="Home-Advantages"/>
      <LandingPageSeparator type="8"/>



      <div className="hero-page">
        <div className='hero-image-container'>
          <img className='landscape-only' src="/Races/Bertle.png" style={{height: '100%'}}/>
        </div>

        <div className='advantages-content hero-content'>
          <img src='/LandingPage/Featuring.png' style={{
            width: '60%'
          }}/>
          <p className='hero-text'>
            Here's what to look out for:
          </p>
          <ul className='index-advantages-ul-large'>
            <li><Icon name="BulletPoint3"/>Gamification begins: <Feature>Farming</Feature>, <Feature>Worthiness</Feature>!</li>
            <li><Icon name="BulletPoint3"/>No <Feature name="Adventures">resting</Feature>, no roll-to-hit, no <Feature>Saves</Feature>, no <Feature>Mana</Feature> levels</li>
            <li><Icon name="BulletPoint3"/>Game-breaking builds (<b className="advantages-feature" onClick={() => setFeatureToDisplay('Abilities')}>Abilities</b>, <b className="advantages-feature" onClick={() => setFeatureToDisplay('Talents')}>Talents</b>, <b className="advantages-feature" onClick={() => setFeatureToDisplay('Respec')}>Respec</b>)</li>
            <li><Icon name="BulletPoint3"/>Personal growth with <Feature name="Player Quirks">Quirks</Feature> and <Feature>Plot Points</Feature></li>
            <li><Icon name="BulletPoint3"/>Clarity, feedback, community, online updates</li>
            <li><Icon name="BulletPoint3"/>Optimized for online play and accessibility</li>
          </ul>
          <ul className='index-advantages-ul-small'>
            <li><Icon name="BulletPoint3"/>Gamification: Farming and Worthiness</li>
            <li><Icon name="BulletPoint3"/>No rests, no roll-to-hit, no saves... </li>
            <li><Icon name="BulletPoint3"/>Rebuild easily, break the game</li>
            <li><Icon name="BulletPoint3"/>Gain Quirks and Plot Points</li>
            <li><Icon name="BulletPoint3"/>Clarity, feedback, open community</li>
          </ul>
          <HeroButton href="/Tools/CharacterCreationCalculator">
            Make a Hero!
          </HeroButton>
        </div>

        <FeaturingAsidePopup featureToDisplay={featureToDisplay}/>

        <img className="portrait-only floating-animation-1" style={{position: 'absolute', top: '1vh', left: '15vw', width: '20px'}} src="/LandingPage/FloatingDot1.png"/>
        <img className="portrait-only floating-animation-2" style={{position: 'absolute', top: '3vh', right: '7vw', width: '100px'}} src="/LandingPage/FloatingRaccoon.png"/>
        <img className="portrait-only floating-animation-3" style={{position: 'absolute', bottom: '3vh', left: '8vw', width: '70px'}} src="/LandingPage/FloatingBird.png"/>
      </div>

      <div style={{backgroundColor: 'white'}} className={isPortrait? `gap-4`: ''}>
        <HeroSlide src="/Classes/Swashbuckler.png">
            <QGTitle1 text="Slice and Dice" height={60}/>
            <p className='hero-text'>No roll to hit, no damage tiers: when you attack, just roll the dice and deal that damage. What you see is what you get!</p>
        </HeroSlide>
        <HeroSlide src="/Classes/HunterPet.png" isReverse={true}>
            <QGTitle1 text="No Saves" height={60}/>
            <p className='hero-text'>You know how monsters in many games make you roll saves to prevent effects? Unlearn that! Monsters <strong>ask you</strong> (im)politely which effect you prefer, the direction you are pushed, etc.</p>
        </HeroSlide>
        <HeroSlide src="/Classes/Rogue.png">
            <QGTitle1 text="Gamified" height={60}/>
            <p className='hero-text'>You can generate gold out of thin air, last hit enemies to <i>farm</i> them, etc. Oh, and make sure you farm the <strong>Worthy</strong> ones!</p>
        </HeroSlide>
        <HeroSlide src="/Races/Littlefolk.png" isReverse={true}>
            <QGTitle1 text="Plot Thickens" height={60}/>
            <p className='hero-text'>You have <strong>skills</strong> and <strong>flaws</strong>. Use your flaws <i>on purpose</i> to gain Plot Points, so you can get more skills, respec, or argue with the Quest Master.</p>
            <p className='hero-text'>Qurks are there too: every Adventure, you get a Quirk. Phobias, hatreds, injuries, good mutations - we have it all!</p>
        </HeroSlide>
        <HeroSlide src="/Classes/Outlaw.png">
            <QGTitle1 text="No Rest" height={60}/>
            <p className='hero-text'>No rest for the wicked! You regenerate Health after every Combat, and you completely regenerate your resources inbetween Adventures, which are periods of time defined by the Quest Master. Could be a dungeon, a play session, or a day shopping.</p>
        </HeroSlide>
        <HeroSlide src="/Races/Dwarf.png" isReverse={true}>
            <QGTitle1 text="Too Many Combos" height={60}/>
            <p className='hero-text'>The game is full of awesome combos and <strong style={{color: 'var(--blue-color)'}}><i>Combos</i></strong>. There's only one way to check them out...</p>
            <HeroButton href="/Tools/CharacterCreationCalculator">
              Make a Hero!
            </HeroButton>
        </HeroSlide>
      </div>
  
      {/* <div className='home__content'>
        <HomeBanner2 title="Races" text="Discover the races of the Questguard world."/>
        <HomeBanner2 title="Classes" text="Discover the classes of the Questguard world."/>
        <HomeBanner2 title="Backgrounds" text="Discover the backgrounds of the Questguard world."/>
        <HomeBanner2 title="Monsters" text="Discover the Monsters of the Questguard world."/>
        <HomeBanner2 title="Spells" text="Discover the Spells of the Questguard world."/>
        <HomeBanner2 title="Equipment" text="Discover the Equipment of the Questguard world."/>
      </div> */}
      
    </div>
  )
}


