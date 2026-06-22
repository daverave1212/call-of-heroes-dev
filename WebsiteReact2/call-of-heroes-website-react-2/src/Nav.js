import logo from './logo.svg';

import { createContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';

import './App.css';
import './nav.css'

import { useState } from 'react';

import * as auth from './Auth'
import Icon from './components/Icon';
import DrawerPage from './components/DrawerPage/DrawerPage';
import Accordion from './components/Accordion/Accordion';
import NavConfig from './NavConfig.json';

window.auth = auth

const DISCORD_URL = 'https://discord.gg/' + '27aqSEDyE3'

const NAV_CONFIG = NavConfig.config
NAV_CONFIG[0].href = DISCORD_URL

const LOCK_TO_ICON_MAP = {
    'premium': 'Premium.svg',
    'upcoming': 'Upcoming.png'
}



function NavIcon({name, extension="png"}) {
  return <Icon name={name} extension={extension} style={{margin: '0px', marginRight: '0.25rem', marginTop: '-2px'}}/>
}

function LogoQG() {
  return (
    <div className='nav-logo-div-wrapper'>
      <div className="nav-logo-div">
        <Link to="/"><img src="/favicon.png"/></Link>
      </div>
      <div className='nav-logo-version'>
        v2024-05-04
      </div>
    </div>
  )
}

function MegaDropdown({ currentlyOpenSubnav, isBurgerClicked }) {

  function maybeActiveClassLS(name) {
    return currentlyOpenSubnav == name? 'subnav--ls-active' : 'subnav--ls-inactive'
  }

  function MegaDropdownMenu({ title, children }) {  // The big thing right underneath the nav; see how it's used below
    return (
      <div>
        <div className={`subnav ${maybeActiveClassLS(title)}`}>    {/* The contents of the mega dropdown */}
          { children }
        </div>
      </div>
    )
  }

  return (
    <div className={`mega-dropdown landscape-only`}>

      { NAV_CONFIG.filter(config => config.children != null).map(({ name, children }) =>
          <MegaDropdownMenu key={name} title={name}>            
            { children.map(({ name, children, isGrouping }) => (
              
              isGrouping? (
                <div key={name} className='subnav-section'>
                  { children.map(({ name, children }) => (
                    <div key={name}>
                      <h4>{name}</h4>
                      <div className='subnav-title-underline'></div>
                      <div className='flex column'>
                        { children.map(config => <NavItem key={config.name} config={config} className="subnav-section-item"/>)}
                      </div>    
                    </div>

                  )) }
                </div>
              ) : (
                <div key={name} className='subnav-section'>
                  <h4>{name}</h4>
                  <div className='subnav-title-underline'></div>
                  <div className='flex column'>
                    { children.map(config => <NavItem key={config.name} config={config} className="subnav-section-item"/>)}
                  </div>
                </div>
              )
              
            )) }
          </MegaDropdownMenu>
      )}
      
    </div>)
}

function AccountButtons() {

  // const isLoggedIn = auth.useIsLoggedIn('AccountButtons')
  const isLoggedIn = auth.useIsLoggedIn('AccountButtons')

  function LoginButton() {
    return (
      <div className='nav-item flex row center-content nav-account-buttons' onClick={async () => {
        const result = await auth.login()
      }}>
        <div className="center-content">
          <NavIcon name="Google" extension='webp'/>
        </div>
        <div className="center-content">
          <span>Login</span>
        </div>
      </div>
    )
  }

  function LogoutButton() {
    return (
      <div className='nav-item' onClick={async () => {
        const result = await auth.logout()
        console.log('Logged out')
        console.log({result})
      }}>
        Logout
      </div>
    )
  }

  return (
    <div className="nav-login-buttons">
      { isLoggedIn? (
        <LogoutButton/>
      ): (
        <LoginButton/>
      )}
    </div>
  )
}





function NavLink({ name, href, isDownload, isExternal, isDisabled, lock, onMouseEnter, className }) {

    const classes = 'nav-link ' + (isDisabled === true? 'disabled ': ' ') + className

    if (href == null) {
      return <div className={classes} onMouseEnter={onMouseEnter}>{name}</div>
    }
    
    if (isDownload) {
        return <a className={classes} href={href} download={isDownload} onMouseEnter={onMouseEnter}>{name}</a>
    }

    if (isExternal) {
        const onExternalAClick = evt => {
            evt.preventDefault()
            window.open(href, '_blank')
        }
        return <a className={classes} href={href} onClick={onExternalAClick} onMouseEnter={onMouseEnter}>{name}</a>
    }

    return <Link className={classes} to={href} onMouseEnter={onMouseEnter}>{ name }</Link>

}
function WithIcon({ iconName, children, className }) {
  return (
    <div className={"flex row " + className}>
      <div className="nav-icon-wrapper">
          <Icon name={iconName}/>
      </div>
      { children }
    </div>
  )
}
function NavItem({ config, onMouseEnter, className }) {
    const { name, href, isDownload, isExternal, lock, children, isDisabled } = config

    const link = <NavLink {...config} onMouseEnter={onMouseEnter}/>
    if (lock != null) {
        const iconName = LOCK_TO_ICON_MAP[lock]
        return <div className={className}><WithIcon iconName={iconName}>{link}</WithIcon></div>
    } else {
        return <div className={className}>{link}</div>
    }
}

function NavLandscapeTopItem({ config, onMouseEnter }) {
    if (onMouseEnter == null) {
        return <NavItem className="nav-top-item" config={config}/>
    } else {
        return <NavItem className="nav-top-item" config={config} onMouseEnter={onMouseEnter}/>
    }
}

function NavPortraitNode({ config }) {
    const { name, href, isDownload, isExternal, lock, children, isGrouping } = config

    if (children == null) {
        const link = <NavLink {...config}/>
        if (lock != null) {
            const iconName = LOCK_TO_ICON_MAP[lock]
            return <WithIcon iconName={iconName}>{link}</WithIcon>
        } else {
            return link
        }
    }

    if (isGrouping) {
      return <>
        { children.map(childConfig => <NavPortraitNode key={`p-${childConfig.name}`} config={childConfig}/>)}
      </>
    }

    return (
        <Accordion title={name} className="nav-accordion">
          <div className='nav-accordion-content'>
            { children.map(childConfig => <NavPortraitNode key={`p-${childConfig.name}`} config={childConfig}/>) }
          </div>
        </Accordion>
    )

}


export default function Nav() {

    const [isBurgerClicked, setIsBurgerClicked] = useState(false)
    const [currentlyOpenSubnav, setCurrentlyOpenSubnav] = useState(null)


    return (
      <div id="Navigation-Section" onMouseLeave={() => setCurrentlyOpenSubnav(null)}>
          <LogoQG/>

          <div className='burger-icon' onClick={() => setIsBurgerClicked(!isBurgerClicked)}> <img src="/burger-icon.png"/> </div>

          <nav className="nav-landscape">

            { NAV_CONFIG.map(config => <NavLandscapeTopItem key={config.name} config={config} onMouseEnter={ () => setCurrentlyOpenSubnav(config.name) } />) }

            <AccountButtons/>

          </nav>

          <MegaDropdown currentlyOpenSubnav={currentlyOpenSubnav} isBurgerClicked={isBurgerClicked}/>



          <DrawerPage isOpen={isBurgerClicked} close={() => setIsBurgerClicked(false)}>
            <div className='nav-drawer'>

              <AccountButtons/>

              { NAV_CONFIG.map(config => <NavPortraitNode key={`p-${config.name}`} config={config}/>) }

            </div>
          </DrawerPage>
      </div>
    )
  }