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
  const slideTitleSize = isPortrait? 35: 52

  function BoldPurple({ children }) {
    return <span style={{fontWeight: 'bold', color: 'var(--theme-color-darker)'}}>{children}</span>
  }
  function Feature({ children, name }) {
    const featureName = name ?? children
    return <b className="advantages-feature" onClick={() => setFeatureToDisplay(featureName)}>{children}</b>
  }
  function _HeroBullet() {
    return <span><Icon name="BulletPoint3" style={{height: '0.9em', marginTop: '0.23em'}}/></span>
  }
  function HeroBullet() {
    // return <span style={{color: 'var(--theme-color-darker)', fontSize: '0.8em', paddingTop: '0.1em', height: '1em'}}>◆</span>
    return <span style={{color: 'var(--theme-color-darker)'}}> ⬥ </span>
  }

  return (
    <div className='overflow-hidden'>

      <HeroPageIntroPortrait/>
      <div className="hero-page landscape-only">
        <div className='hero-image-container'>
          <img className='landscape-only' src="/Races/Bertle.png" style={{height: '110%', marginTop: '-5%'}}/>
        </div>

        <div className='hero-content'>
          <img className='hero-logo-img' src='/LandingPage/QuestGuardLogo.png'/>
          <p className='hero-text' style={{textAlign: 'center'}}>
           The dicey hack-and-slash RPG for video gamers:<br/>
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



      {/* <div className="hero-page overflow-visible">
        <div className='hero-image-container'>
          <img src="/Classes/Mage.png"/>
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
      </div> */}

      <div style={{backgroundColor: 'white'}} className={`${isPortrait? `gap-4`: ''} padding-top-4`}>


        <HeroSlide src="/Classes/Wizard.png" isReverse={true}>
          <img className="portrait-only floating-animation-1" style={{position: 'absolute', top: '-3vh', left: '7vw', width: '20px'}} src="/LandingPage/FloatingDot1.png"/>
          <img className="portrait-only floating-animation-2" style={{position: 'absolute', top: '-5vh', right: '1vw', width: '70px'}} src="/LandingPage/FloatingRaccoon.png"/>
          <QGTitle1 text="Featuring" height={slideTitleSize}/>
          <div className='flex column gap-half'>
            <div className='center-content center-text margin-top-1 gap-half'>
              <p className='hero-text'>
                <HeroBullet/>
                <span className='landscape'>Gamification begins: </span><Feature>Farming</Feature>, <Feature>Worthiness</Feature>
                <HeroBullet/>
              </p>
              <p className='hero-text'>
                <HeroBullet/>
                No roll to hit, no <Feature name="Adventures">rests</Feature>, no <Feature>saves</Feature><span className='landscape'>, no <Feature>Mana</Feature> levels</span>
                <HeroBullet/>
              </p>
              <p className='hero-text'>
                <HeroBullet/>
                <span className='landscape'>Game-breaking builds (<b className="advantages-feature" onClick={() => setFeatureToDisplay('Abilities')}>Abilities</b>, <b className="advantages-feature" onClick={() => setFeatureToDisplay('Talents')}>Talents</b>, <b className="advantages-feature" onClick={() => setFeatureToDisplay('Respec')}>Respec</b>)</span>
                <span className='portrait'>Get <strong>Talents</strong>, use them, then <strong>respec</strong></span>
                <HeroBullet/>
              </p>
              <p className='hero-text'>
                <HeroBullet/>
                <span className='landscape'>Personal growth with <Feature name="Player Quirks">Quirks</Feature> and <Feature>Plot Points</Feature></span>
                <span className='portrait'>Grow: <Feature name="Flaws">Flaws</Feature>, <Feature name="Player Quirks">Quirks</Feature>, and <Feature>Plot Points</Feature></span>
                <HeroBullet/>
              </p>
              <p className='hero-text'>
                <HeroBullet/>
                Advanced online <Link to="/Other/CharacterCreationCalculator"><strong>Hero Creator</strong></Link>
                <HeroBullet/>
              </p>
              <p className='hero-text'>
                <HeroBullet/>Basic set free, forever!<HeroBullet/>
              </p>
            </div>
          </div>
        </HeroSlide>


        <HeroSlide src="/Classes/Swashbuckler.png">
            <img className="portrait-only floating-animation-3" style={{position: 'absolute', top: '-10vh', left: '8vw', width: '70px'}} src="/LandingPage/FloatingBird.png"/>

            <QGTitle1 text="Slice and Dice" height={slideTitleSize}/>
            <p className='hero-text'>No roll to hit, no damage tiers: when you attack, just roll the dice and deal that damage. What you see is what you get!</p>
            <p className='hero-text'>In QuestGuard, we go full in on dice! If you're a dice goblin, you'll love it.</p>
        </HeroSlide>
        <HeroSlide src="/Classes/HunterPet.png" isReverse={true}>
            <div className='portrait absolute floating-animation-raptor' style={{position: 'absolute', top: '-10vh', right: '-5vw', width: '25vw'}}>
              <img className='raptor-blink' style={{width: '100%', position: 'absolute'}} src="/LandingPage/RaptorHeadBlink.png"/>
              <img style={{width: '100%'}} src="/LandingPage/RaptorHead.png"/>
            </div>
            <QGTitle1 text="No Saves" height={slideTitleSize}/>
            <p className='hero-text'>You know how monsters in many games make you roll saves to prevent effects? Unlearn that! Monsters <strong>ask you</strong> (im)politely which effect you prefer, the direction you are pushed, etc.</p>
        </HeroSlide>
        <HeroSlide src="/Classes/Rogue.png">
            <div className="portrait-only floating-animation-2" style={{position: 'absolute', top: '-10vh', left: '-8vw', width: '30vw', transform: 'rotate(-30deg)'}}>
              <img src="/LandingPage/Coins.png" style={{width: '100%', transform: 'rotate(-15deg)'}}/>
            </div>
            <QGTitle1 text="Gamified" height={slideTitleSize}/>
            <p className='hero-text'>You can generate gold out of thin air, last hit enemies to <i>farm</i> them, etc. Oh, and make sure you farm the <strong>Worthy</strong> ones!</p>
        </HeroSlide>
        <HeroSlide src="/Races/Littlefolk.png" isReverse={true}>
            <QGTitle1 text="Plot Thickens" height={slideTitleSize}/>
            <p className='hero-text'>You have <strong>skills</strong> and <strong>flaws</strong>. Use your flaws <i>on purpose</i> to gain Plot Points, so you can get more skills, respec, or argue with the Quest Master.</p>
            <p className='hero-text'>Quirks are there too: every Adventure, you get a Quirk. Phobias, hatreds, injuries, good mutations - we have it all!</p>
        </HeroSlide>
        <HeroSlide src="/Classes/Outlaw.png">
            <QGTitle1 text="No Rest" height={slideTitleSize}/>
            <p className='hero-text'>No rest for the wicked! You regenerate Health after every Combat, and you completely regenerate your resources inbetween Adventures, which are periods of time defined by the Quest Master. Could be a dungeon, a play session, or a day shopping.</p>
        </HeroSlide>
        <HeroSlide src="/Races/Dwarf.png" isReverse={true}>
            <QGTitle1 text="Too Many Combos" height={slideTitleSize}/>
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


