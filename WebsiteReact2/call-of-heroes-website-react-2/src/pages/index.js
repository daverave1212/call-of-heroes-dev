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
        <img className="landing_page_image" src="/LandingPage/LandingPageBackground--variant6.png" style={{width: '100%', height: 'auto'}}/>
        <img src="/LandingPage/LandingPageTitle.png" style={{
          width: '50%',
          height: 'auto',
          margin: 'auto',
          marginTop: '21%',
          zIndex: 9999,
          position: 'relative',
          display: 'block'
        }}/>

        {/* <div className='home__hero-section-text-container'>
          <h1>
            Whether Hero or Creator<br/>
            It Is Your Adventure
          </h1>
        </div> */}

        <div className='home__hero-section__buttons-wrapper'>
          <div className='home__hero-section__buttons'>
              <ButtonStandard onClick={onJoinBetaClick}>Join Beta</ButtonStandard>
              <ButtonStandard style={{cursor: 'not-allowed'}}>Fund on Kickstarter</ButtonStandard>
          </div>
        </div>

        {/* <div className='home__hero-section-text-container'>
          <h1>
            Play the Better<br/>
            Tabletop RPG
          </h1>
    
          <p>
            A modern system, with faster combat, easier to learn mechanics, more strategy depth and more accessible to Game Masters and homebrew creators.
          </p>
    
          <div className='home__hero-section__buttons'>
            <ButtonStandard onClick={onJoinBetaClick}>Join Beta</ButtonStandard>
            <ButtonStandard style={{cursor: 'not-allowed'}}>Fund on Kickstarter</ButtonStandard>
          </div>
        </div> */}
        
        
      </div>
  
      <LandingPageSeparator type="8"/>

      <div className='home__advantages-section'>
        <img src="/LandingPage/Advantages.png"/>
        <div className='home__advantages-box'>
          <ul>
            <li><Icon name="BulletPoint2"/>Modernly designed RPG experience</li>
            <li><Icon name="BulletPoint2"/>Easy to learn, hard to master</li>
            <li><Icon name="BulletPoint2"/>Easy to pick up as a GM, with guides and resources</li>
            <li><Icon name="BulletPoint2"/>Faster, more dynamic combat</li>
            <li><Icon name="BulletPoint2"/>Tons of interesting character options</li>
            <li><Icon name="BulletPoint2"/>Frequently updated</li>
            <li><Icon name="BulletPoint2"/>Resources always online</li>
            <li><Icon name="BulletPoint2"/>Metric system</li>
          </ul>
        </div>
      </div>


      <LandingPageSeparator type="8"/>
  
      <div className='home-container__content'>
        <HomeBanner2 title="Races" text="Discover the races of the Call of Heroes world."/>
        <HomeBanner2 title="Classes" text="Discover the classes of the Call of Heroes world."/>
        <HomeBanner2 title="Backgrounds" text="Discover the backgrounds of the Call of Heroes world."/>
        <HomeBanner2 title="Monsters" text="Discover the Monsters of the Call of Heroes world."/>
        <HomeBanner2 title="Spells" text="Discover the Spells of the Call of Heroes world."/>
        <HomeBanner2 title="Equipment" text="Discover the Equipment of the Call of Heroes world."/>
      </div>

      {/* <LandingPageSeparator type="8"/> */}
    </div>
  )
}


