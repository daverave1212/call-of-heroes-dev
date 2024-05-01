import React, { useState } from 'react'
import HomeBanner1 from '../components/HomeBanner/HomeBanner1'
import HomeBanner2 from '../components/HomeBanner/HomeBanner2'
import Icon from '../components/Icon'
import LandingPageSeparator from '../components/LandingPageSeparator/LandingPageSeparator'
import PromoPopup from '../components/PromoPopup/PromoPopup'

import './index.css'
import FeaturingAsidePopup from '../components/AsidePopup/FeaturingAsidePopup'
import { CoolButton } from '../components/CoolButton/CoolButton'

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




  
      <div className="hero-page">
        <div className='hero-image-container'>
          {/* <img src="/LandingPage/LandingPageBackground--variant8.png"/> */}
          <img src="/Classes/Mage.png"/>
        </div>

        <div className='hero-content'>
          <img className='hero-logo-img' src='/LandingPage/QuestGuardLogo.png'/>
          <p className='home-text-style' style={{textAlign: 'center'}}>
            A gamified tabletop RPG for this generation of video gamers. Battle, explore and host games for the modern world.
          </p>
          
          <div className='hero-buttons'>
            <CoolButton>
              <a href="#Home-Advantages">Show Me</a>
            </CoolButton>
          </div>

        </div>
      </div>
  
      <LandingPageSeparator type="8"/>

      <div className="hero-page" id="Home-Advantages">
        <div className='advantages-image-container'>
          <img src="/LandingPage/LandingPageBackground--variant8.png"/>
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
        </div>

        <FeaturingAsidePopup featureToDisplay={featureToDisplay}/>

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


