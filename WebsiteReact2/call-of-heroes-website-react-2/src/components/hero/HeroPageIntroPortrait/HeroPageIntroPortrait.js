import { useEffect, useState } from 'react'
import './HeroPageIntroPortrait.css'
import HeroButton from '../../HeroButton/HeroButton'

export default function HeroPageIntroPortrait() {

    const [logoClass, setLogoClass] = useState('hero-logo-img--done')
  
    const [animationClasses, setAnimationClasses] = useState({
      logo: 'hero-logo-img--done',
      bar: 'animation-bar--done',
      desc: 'hero-intro-description--done',
      button: 'show-me-button--done'
    })
  
    useEffect(() => {
      setAnimationClasses({
        logo: 'hero-logo-img--animating',
        bar: 'animation-bar--animating',
        desc: 'hero-intro-description--animating',
        button: 'show-me-button--animating'
      })
      setTimeout(() => {
        setAnimationClasses({
          logo: 'hero-logo-img--done',
          bar: 'animation-bar--done',
          desc: 'hero-intro-description--done',
          button: 'show-me-button--done'
        })
      }, 3750)
    }, [])
  
    return (
        <div className="hero-page portrait-only">
          <div className='hero-content'>
            <img className={`hero-logo-img ${animationClasses.logo}`} src='/LandingPage/QuestGuardLogo.png'/>
  
            <div className='animation-bar-holder'>
              <div className={animationClasses.bar}> </div>
            </div>
  
            <div className={`hero-intro-description ${animationClasses.desc}`}>
              <p className='home-text-style' style={{textAlign: 'center'}}>
                A gamified tabletop RPG for this generation of video gamers. Battle, explore and host games for the modern world.
              </p>
              <HeroButton className={animationClasses.button} isCustomContent={true}> <a href="#Home-Advantages">Show Me</a> </HeroButton>
            </div>
  
          </div>
  
          {/* <BottomWaveEffect/> */}
          <img style={{position: 'absolute', top: '8vh', left: '20vw', width: '20px'}} src="/LandingPage/FloatingDot1.png" className='floating-animation-1'/>
          <img style={{position: 'absolute', top: '15vh', right: '20vw', width: '22px'}} src="/LandingPage/FloatingDot2.png" className='floating-animation-2'/>
          <img style={{position: 'absolute', bottom: '8vh', right: '15vw', width: '20px'}} src="/LandingPage/FloatingDot3.png" className='floating-animation-3'/>
          <img style={{position: 'absolute', bottom: '-95vw', left: '-70vw', width: '125vw'}} src='/LandingPage/FloatingSphere1.png' className='rotating-animation-1'/>
        </div>
    )
  }