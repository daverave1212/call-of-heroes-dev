import React, { useEffect, useState } from 'react'
import HomeBanner1 from '../components/HomeBanner/HomeBanner1'
import HomeBanner2 from '../components/HomeBanner/HomeBanner2'
import Icon from '../components/Icon'
import LandingPageSeparator from '../components/LandingPageSeparator/LandingPageSeparator'
import PromoPopup from '../components/PromoPopup/PromoPopup'

import './index.css'
import FeaturingAsidePopup from '../components/AsidePopup/FeaturingAsidePopup'
import { CoolButton } from '../components/CoolButton/CoolButton'
import HeroButton from '../components/HeroButton/HeroButton'
import { Link } from 'react-router-dom'
import BottomWaveEffect from '../components/BottomWaveEffect/BottomWaveEffect'
import HeroPageIntroPortrait from '../components/hero/HeroPageIntroPortrait/HeroPageIntroPortrait'
import { HeroSection } from './Other/RulesExplained/Learn'
import AnchorFixer from '../components/AnchorFixer/AnchorFixer'

export default function() {

  const [featureToDisplay, setFeatureToDisplay] = useState(null)

  return (
    <div>

      <PromoPopup id="Kickstarter-Promo-Popup">
          <p className='home-text-style'>
            Coming to Kickstarter in December 2024!
          </p>
        <button className='Basic-button' onClick={() => {
          document.querySelector('#Kickstarter-Promo-Popup').style.display = 'none'
        }}>Awesome!</button>
      </PromoPopup>




      <HeroPageIntroPortrait/>
      <div className="hero-page landscape-only">
        <div className='hero-image-container'>
          <img src="/Classes/Mage.png"/>
        </div>

        <div className='hero-content'>
          <img className='hero-logo-img' src='/LandingPage/QuestGuardLogo.png'/>
          <p className='home-text-style' style={{textAlign: 'center'}}>
            A gamified tabletop RPG for this generation of video gamers. Battle, explore and host games for the modern world.
          </p>
          
          <HeroButton>
          <a href="#Home-Advantages">Show Me</a>
          </HeroButton>

        </div>
      </div>
      <AnchorFixer id="Home-Advantages"/>
      <LandingPageSeparator type="8"/>



      <div className="hero-page">
        <div className='hero-image-container'>
          <img className='landscape-only' src="/LandingPage/HeroFeatures.png" style={{height: '100%'}}/>
        </div>

        <div className='advantages-content hero-content'>
          <img src='/LandingPage/Featuring.png' style={{
            width: '60%'
          }}/>
          <p className='home-text-style'>
            Questguard is a quick, combat-based alternative RPG for the younger generation used to video or board games, with focus on making it easy for GM's to host.
            If you've played games like World of Warcraft, Divinity, or League of Legends, you'll love what you see!
          </p>
          <ul className='index-advantages-ul-large'>
            <li><Icon name="BulletPoint3"/>Gamified for GM's (<b className="advantages-feature" onClick={() => setFeatureToDisplay('Quests')}>Quests</b>, <b className="advantages-feature" onClick={() => setFeatureToDisplay('Worthiness')}>Worthiness</b>)</li>
            <li><Icon name="BulletPoint3"/>Tons of builds (<b className="advantages-feature" onClick={() => setFeatureToDisplay('Abilities')}>Abilities</b>, <b className="advantages-feature" onClick={() => setFeatureToDisplay('Talents')}>Talents</b>, <b className="advantages-feature" onClick={() => setFeatureToDisplay('Respec')}>Respec</b>)</li>
            <li><Icon name="BulletPoint3"/>European and D12 (<b>metric system</b>)</li>
            <li><Icon name="BulletPoint3"/>Clarity, feedback, community, online updates</li>
            <li><Icon name="BulletPoint3"/>Optimized for online play and accessibility</li>
            <li><Icon name="BulletPoint3"/>100% free and open-license</li>
          </ul>
          <ul className='index-advantages-ul-small'>
            <li><Icon name="BulletPoint3"/>RPG for this generation</li>
            <li><Icon name="BulletPoint3"/>Gamified for GM's</li>
            <li><Icon name="BulletPoint3"/>Rebuild easily, fight fast</li>
            <li><Icon name="BulletPoint3"/>European, D12, metric</li>
            <li><Icon name="BulletPoint3"/>Clarity, feedback, open community</li>
            <li><Icon name="BulletPoint3"/>100% free and open-license</li>
          </ul>
          <HeroButton>
            <Link to="/Other/Learn">Learn To Play!</Link>
          </HeroButton>
        </div>

        <FeaturingAsidePopup featureToDisplay={featureToDisplay}/>

        <img className="portrait-only floating-animation-1" style={{position: 'absolute', top: '3vh', left: '15vw', width: '20px'}} src="/LandingPage/FloatingDot1.png"/>
        <img className="portrait-only floating-animation-2" style={{position: 'absolute', top: '5vh', right: '10vw', width: '100px'}} src="/LandingPage/FloatingRaccoon.png"/>
        <img className="portrait-only floating-animation-3" style={{position: 'absolute', bottom: '3vh', left: '8vw', width: '70px'}} src="/LandingPage/FloatingBird.png"/>
      </div>


      <LandingPageSeparator type="8"/>
  
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


