import React from 'react'
import HomeBanner1 from '../components/HomeBanner/HomeBanner1'
import HomeBanner2 from '../components/HomeBanner/HomeBanner2'
import Icon from '../components/Icon'
import LandingPageSeparator from '../components/LandingPageSeparator/LandingPageSeparator'


import './index.css'

export default function() {

  return (
    <div>
  
      <div className="hero-page">
        <div className='hero-image-container'>
          {/* <img src="/LandingPage/LandingPageBackground--variant8.png"/> */}
          <img src="/Classes/Mage.png"/>
        </div>

        <div className='hero-content'>
          <img className='hero-logo-img' src='/LandingPage/QuestGuardLogo.png'/>
          <p className='home-text-style' style={{textAlign: 'center'}}>Join a new tabletop roleplaying game for the modern world, designed with fast-paced combat and an easy-to-understand system. Create your hero, explore dungeons and be the protagonist of your own story!</p>
          
          <div className='hero-buttons'>
            <button className='Basic-button'>
              <a href="#Home-Advantages">Show Me</a>
            </button>
            <div className='hero-buttons-separators'>
              <img src="/button-separator.png"/>
              <img src="/button-separator-reversed.png"/>
            </div>
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
            Questguard aims to be a quick, combat-based alternative RPG for the younger generation used to video or board games. With numbers easy to add up and rules for everyone, Questguard makes it a piece of cake to run and organize as a Game Master.
            If you've played games like World of Warcraft, Divinity, or League of Legends, you'll love what you see!
          </p>
          <ul>
            <li><Icon name="BulletPoint3"/>Simplicity, quick maths and tons of fun choices</li>
            <li><Icon name="BulletPoint3"/>GM-oriented and gamified experience (<b>Adventure</b>, <b>Worthiness</b>, etc)</li>
            <li><Icon name="BulletPoint3"/>D12, grid-based, deep combat options, <b>metric system</b></li>
            <li><Icon name="BulletPoint3"/>Emphasis on clarity, feedback, community and online updates</li>
            <li><Icon name="BulletPoint3"/>Optimized for online play and accessibility</li>
            <li><Icon name="BulletPoint3"/>Open license - homebrew anything, anywhere</li>
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


