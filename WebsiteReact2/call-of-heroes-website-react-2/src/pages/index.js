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

  const buttonColor = 'var(--button-color)'

  return (
    <div className='home-container'>
  
      <div className='home__hero-section'>
        <div className='hero-image-container'>
          <img src="/LandingPage/LandingPageBackground--variant8.png" className='hero-img'/>
        </div>
        <div className='hero-content'>
          <h1 className='home-title text-centered'>Roll For Adventure!</h1>
          <p className='home-text text-centered'>Join a new tabletop roleplaying game for the modern world, designed with fast-paced combat and an easy-to-understand system. Create your hero, explore dungeons and be the protagonist of your own story!</p>
          {/* It's the perfect mix of strategy and imagination. */}
          {/* <p>Join a new tabletop roleplaying game for the modern world - faster combat, easier rules, more modern take on fantasy grid-based combat.</p> */}
          <div className='hero-buttons'>
            <img src="/button-separator.png"/>
            <button className='generic-button' style={{borderRadius: '50px'}}>
              <a href="#home-advantages">Show Me</a>
            </button>
            {/* <button className='generic-button'>Back on Kickstarter</button> */}
            <img src="/button-separator-reversed.png"/>
          </div>
        </div>
      </div>
  
      <LandingPageSeparator type="8"/>

      <div className='home-advantages' id="home-advantages">
        <div className='advantages-image-container'>
          <img src="/Classes/Mage.png" className='advantages-img'/>
        </div>

        <div className='advantages-content hero-content'>
          <h1 className='home-title'>Modern and Approachable</h1>
          <p className='home-text'>Call of Heroes aims to be the one and only roleplaying game for this generation. Gather your party and embark on a campaign with properly designed rules, and, more importantly, exciting abilities and spells to <i>break</i> the rules!</p>
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
  
      {/* <div className='home-container__content'>
        <HomeBanner2 title="Races" text="Discover the races of the Call of Heroes world."/>
        <HomeBanner2 title="Classes" text="Discover the classes of the Call of Heroes world."/>
        <HomeBanner2 title="Backgrounds" text="Discover the backgrounds of the Call of Heroes world."/>
        <HomeBanner2 title="Monsters" text="Discover the Monsters of the Call of Heroes world."/>
        <HomeBanner2 title="Spells" text="Discover the Spells of the Call of Heroes world."/>
        <HomeBanner2 title="Equipment" text="Discover the Equipment of the Call of Heroes world."/>
      </div> */}

      {/* <LandingPageSeparator type="8"/> */}
    </div>
  )
}


