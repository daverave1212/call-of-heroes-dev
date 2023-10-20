import React from 'react'
import HomeBanner1 from '../components/HomeBanner/HomeBanner1'
import HomeBanner2 from '../components/HomeBanner/HomeBanner2'
import Icon from '../components/Icon'
import LandingPageSeparator from '../components/LandingPageSeparator/LandingPageSeparator'


import './index.css'

export default function() {

  function ButtonStandard({ children, onClick, style }) {
    return (
      <button style={style} className='button-standard' onClick={onClick}>
        <div className='button-standard__content'>
          { children }
        </div>
      </button>
    )
  }
  function onJoinBetaClick() {
    alert("You're already in it, silly")
  }

  return (
    <div className='home'>
  
      <div className="hero">
        <div className='hero-image-container'>
          {/* <img src="/LandingPage/LandingPageBackground--variant8.png"/> */}
          <img src="/Classes/Mage.png"/>
        </div>
        <div className='hero-content'>
          {/* <h1 className='text-centered'>Roll For Adventure!</h1> */}
          <img className='hero-logo' src='/LandingPage/QuestGuardLogo.png'/>
          <p className='home-text-style text-centered'>Join a new tabletop roleplaying game for the modern world, designed with fast-paced combat and an easy-to-understand system. Create your hero, explore dungeons and be the protagonist of your own story!</p>
          <div className='hero-buttons'>
            <img src="/button-separator.png"/>
            <button className='Basic-button'>
              <a href="#Home-Advantages">Show Me</a>
            </button>
            {/* <button className='Basic-button'>Back on Kickstarter</button> */}
            <img src="/button-separator-reversed.png"/>
          </div>
        </div>
      </div>
  
      <LandingPageSeparator type="8"/>

      <div className="hero" id="Home-Advantages">
        <div className='advantages-image-container'>
          {/* <img src="/Classes/Mage.png" className='advantages-img'/> */}
          <img src="/LandingPage/LandingPageBackground--variant8.png" className='advantages-img'/>
        </div>

        <div className='advantages-content hero-content'>
          <h1>Modern and Approachable</h1>
          <p className='home-text-style'>Questguard aims to be the one and only roleplaying game for this generation. Gather your party and embark on a campaign with properly designed rules, and, more importantly, exciting abilities and spells to <i>break</i> the rules!</p>
          <ul>
            <li><Icon name="BulletPoint3"/>Well worded abilities and rules</li>
            <li><Icon name="BulletPoint3"/>Easy to learn, hard to master</li>
            <li><Icon name="BulletPoint3"/>Easy to pick up as a GM, with guides and resources</li>
            <li><Icon name="BulletPoint3"/>Faster, more dynamic grid-based combat</li>
            <li><Icon name="BulletPoint3"/>Tons of interesting character options</li>
            <li><Icon name="BulletPoint3"/>Frequently updated</li>
            <li><Icon name="BulletPoint3"/>Resources always online</li>
            <li><Icon name="BulletPoint3"/>Metric system</li>
          </ul>
        </div>

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


