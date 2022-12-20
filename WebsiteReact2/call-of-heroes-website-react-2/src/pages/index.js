import React from 'react'
import HomeBanner1 from '../components/HomeBanner/HomeBanner1'
import HomeBanner2 from '../components/HomeBanner/HomeBanner2'
import LandingPageSeparator from '../components/LandingPageSeparator/LandingPageSeparator'


import './index.css'

export default function() {

  function ButtonStandard({ children }) {
    return (
      <button className='button-standard'>
        <div className='button-standard__content'>
          { children }
        </div>
      </button>
    )
  }

  const buttonColor = 'var(--button-color)'

  return (
    <div className='home-container'>
  
      <div className='home__hero-section'>
        <img src="/LandingPage/LandingPageBackground1--variant3.png"/>

        <div className='home__hero-section-text-container'>
          <h1>
            Play the Better<br/>
            Tabletop RPG
          </h1>
    
          <p>
            A modern system, with faster combat, easier to learn mechanics, more strategy depth and more accessible to Game Masters and homebrew creators.
          </p>
    
          <div className='home__hero-section__buttons'>
            <ButtonStandard>Join Beta</ButtonStandard>
            <ButtonStandard>Fund on Kickstarter</ButtonStandard>
            {/* <button style={{zIndex: 999, backgroundColor: buttonColor, border: `solid ${buttonColor} 1px`}} className='button-standard'>Join Beta</button>
            <button style={{zIndex: 999}} className='button-standard'>Fund on Kickstarter</button> */}
          </div>
        </div>
        
        
      </div>
  
      <LandingPageSeparator/>
  
      <div className='home-container__content'>
        <HomeBanner2 title="Races" text="Discover the races of the Call of Heroes world."/>
        <HomeBanner2 title="Classes" text="Discover the classes of the Call of Heroes world."/>
        <HomeBanner2 title="Backgrounds" text="Discover the backgrounds of the Call of Heroes world."/>
        <HomeBanner2 title="Monsters" text="Discover the Monsters of the Call of Heroes world."/>
        <HomeBanner2 title="Spells" text="Discover the Spells of the Call of Heroes world."/>
        <HomeBanner2 title="Equipment" text="Discover the Equipment of the Call of Heroes world."/>
      </div>
    </div>
  )
}


