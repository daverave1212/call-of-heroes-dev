import React from 'react'
import HomeBanner1 from '../components/HomeBanner/HomeBanner1'
import HomeBanner2 from '../components/HomeBanner/HomeBanner2'


export default () => (
  <div className='home-container'>
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
