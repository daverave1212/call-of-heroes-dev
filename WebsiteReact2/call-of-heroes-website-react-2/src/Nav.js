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

window.auth = auth

const DISCORD_URL = 'https://discord.gg/' + '27aqSEDyE3'

const NAV_CONFIG = [
  { name: 'Play With Us!', href: DISCORD_URL, isExternal: true },
  { name: 'Create Character', href: '/Tools/CharacterCreationCalculator' },
  { name: 'Game', children: [
    { name: 'Races', children: [
      { name: 'Bertle',       href: '/Races/Bertle' },
      { name: 'Davel',        href: '/WorkInProgress', isDisabled: true },
      { name: 'Dragon',       href: '/Races/Dragonborn' },
      { name: 'Dwarf',        href: '/Races/Dwarf' },
      { name: 'Elf',          href: '/Races/Elf' },
      { name: 'Giant',        href: '/Races/Orc' },
      { name: 'Gnome',        href: '/Races/Gnome' },
      { name: 'Hollow',       href: '/Races/Hollow', lock: 'premium' },
      { name: 'Human',        href: '/Races/Human' },
    ]},
    // { name: 'Classes', children: [
    //   { name: 'Cleric',       href: '/Classes/Cleric' },
    //   { name: 'Druid',        href: '/Classes/Druid' },
    //   { name: 'Hunter',       href: '/Classes/Hunter' },
    //   { name: 'Mage',         href: '/Classes/Mage' },
    //   { name: 'Paladin',      href: '/Classes/Paladin' },
    //   { name: 'Rogue',        href: '/Classes/Rogue' },
    //   { name: 'Shaman',       href: '/Classes/Shaman', lock: 'premium' },
    //   { name: 'Warlock',      href: '/Classes/Warlock' },
    //   { name: 'Warrior',      href: '/Classes/Warrior' },
    // ]},
    { name: 'Classes (Base)', children: [
      { name: 'Druid', href: "/ClassesV2/Druid" },
      { name: 'Hunter', href: "/ClassesV2/Hunter", isDisabled: true },
      { name: 'Priest', href: "/ClassesV2/Priest" },
      { name: 'Rogue', href: "/ClassesV2/Rogue" },
      { name: 'Shaman', href: "/ClassesV2/Shaman", isDisabled: true },
      { name: 'Sorcerer', href: "/ClassesV2/Sorcerer" },
      { name: 'Warlock', href: "/ClassesV2/Warlock", isDisabled: true },
      { name: 'Warrior', href: "/ClassesV2/Warrior", isDisabled: true },
      { name: 'Wizard', href: "/ClassesV2/Wizard" },
    ]},
    { name: 'Classes (Premium)', children: [
      { name: 'Artificer', href: "/ClassesV2/Artificer", lock: 'premium' },
      { name: 'Bard', href: "/WorkInProgress", lock: 'premium', isDisabled: true },
      { name: 'Berserker', href: "/ClassesV2/Berserker", lock: 'premium', isDisabled: true },
      { name: 'Cursewielder', href: "/ClassesV2/Cursewielder", lock: 'premium' },
      { name: 'Knight', href: "/ClassesV2/Knight", lock: 'premium', isDisabled: true },
      { name: 'Monk', href: "/WorkInProgress", lock: 'premium', isDisabled: true },
      { name: 'Mystic', href: "/ClassesV2/Mystic", lock: 'premium', isDisabled: true },
      { name: 'Necromancer', href: "/WorkInProgress", lock: 'premium', isDisabled: true },
      { name: 'Paladin', href: "/ClassesV2/Paladin", lock: 'premium', isDisabled: true },
      { name: 'Soulwright', href: "/ClassesV2/Soulwright", lock: 'premium', isDisabled: true },
      { name: 'Swashbuckler', href: "/WorkInProgress", lock: 'premium', isDisabled: true },
      { name: 'Wickan', href: "/WorkInProgress", lock: 'premium', isDisabled: true },
    ]},
    { isGrouping: true, children: [
      { name: 'Abilities', children: [
        { name: 'Basic Abilities',      href: '/Other/Abilities' },
        { name: 'Feats',                href: '/Other/Feats' },
        { name: 'Quirks',               href: '/WorkInProgress' },
        { name: 'Ability Sheet Maker',  href: 'Other/AbilitySheets', lock: 'premium' },
      ]},
      { name: 'Items & Gear', landscapeStyle: { marginTop: '1rem' }, children: [
        { name: 'Shop & Prices',  href: '/Other/Prices' },
        { name: 'Weapons',        href: '/Other/Weapons' },
        { name: 'Armors',         href: '/Other/Armors' },
      ]}
    ]},
    { name: 'Other', children: [
      { name: 'Shop & Prices',    href: '/Other/Prices' },
      { name: 'Obstacles',        href: '/Other/Obstacles' },
      { name: 'Pets and Animals', href: '/Other/PetsAndAnimals' },
      { name: 'Languages',        href: '/Other/Languages' },
      { name: 'Update Notes',     href: '/Meta/PatchNotes' },
    ]},
    { name: 'Character Sheets', children: [
      { name: 'Character Sheet (PDF)', isDownload: true, href: '/Download/Sheet-2023-03-24b.pdf' },
      { name: 'Character Sheet (PSD)', isDownload: true, href: '/Download/Sheet-2024-06-16.psd' },
      { name: 'Character Sheet (PNG)', isDownload: true, href: '/Download/Sheet-2024-04-28.png' },
    ]},
    { name: 'Content', children: [
      { name: 'Mount Hyhelm (Starter One-Shot)', isDownload: true, href: '', lock: 'premium' },
      { name: 'Whispervale (Starter Adventure)', isDownload: true, href: '', lock: 'premium' }
    ]}
  ]},
  { name: 'Learn To Play', children: [
    { name: 'Learn To Play', children: [
      { name: 'Rules',                        href: '/Other/Rules' },
      { name: 'Transition Guide (from D&D)',  href: '/Download/Transition_Guide_2025-10-09.pdf', isDownload: true },
      { name: 'Character Creation Guide',     href: '/WorkInProgress' },
      { name: 'New Player Guide',             href: '/WorkInProgress' },
    ]}
  ]},
  { name: 'Game Mastering', children: [
    { name: 'Guides', children: [
      { name: 'GM Guidelines',                href: '/Other/GMGuidelines' },
      { name: 'Game Master Basics',           href: '/WorkInProgress' },
      { name: 'How To Be a Good GM',          href: '/WorkInProgress', lock: 'premium' },
    ]},
    { name: 'QM Content', children: [
      { name: 'Monsters',                 href: '/Other/Monsters' },
      { name: 'Encounters',               href: '/Other/Encounters' },
      { name: 'Magic Items',              href: '/Other/MagicItems', lock: 'premium' },
    ]},
    { name: 'Tools', children: [
      { name: 'Treasure Generator',             href: '/Tools/TreasureGenerator', lock: 'premium' },
      { name: 'Custom Ability Creator',         href: '/Tools/CustomAbilityCreator', lock: 'premium' },
      { name: 'Custom Monster Creator',         href: '/Tools/CustomMonsterCreator', lock: 'premium' },
      { name: 'Rune Puzzle Maker',              href: '/Tools/RunePuzzle', lock: 'premium' },
    ]},
  ]},
]

const LOCK_TO_ICON_MAP = {
    'premium': 'Premium.svg'
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
          <MegaDropdownMenu title={name}>
            { children.map(({ name, children, isGrouping }) => (
              isGrouping? (
                <div className='subnav-section'>
                  { children.map(({ name, children }) => (
                    <>
                      <h4>{name}</h4>
                      <div className='subnav-title-underline'></div>
                      <div className='flex column'>
                        { children.map(config => <NavItem config={config} className="subnav-section-item"/>)}
                      </div>    
                    </>
                  )) }
                </div>
              ) : (
                <div className='subnav-section'>
                  <h4>{name}</h4>
                  <div className='subnav-title-underline'></div>
                  <div className='flex column'>
                    { children.map(config => <NavItem config={config} className="subnav-section-item"/>)}
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





function NavLink({ name, href, isDownload, isExternal, isDisabled, onMouseEnter, className }) {

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
        { children.map(childConfig => <NavPortraitNode config={childConfig}/>)}
      </>
    }

    return (
        <Accordion title={name} className="nav-accordion">
          <div className='nav-accordion-content'>
            { children.map(childConfig => <NavPortraitNode config={childConfig}/>) }
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

            { NAV_CONFIG.map(config => <NavLandscapeTopItem config={config} onMouseEnter={ () => setCurrentlyOpenSubnav(config.name) } />) }

            <AccountButtons/>

          </nav>

          <MegaDropdown currentlyOpenSubnav={currentlyOpenSubnav} isBurgerClicked={isBurgerClicked}/>



          <DrawerPage isOpen={isBurgerClicked} close={() => setIsBurgerClicked(false)}>
            <div className='nav-drawer'>

              <AccountButtons/>

              { NAV_CONFIG.map(config => <NavPortraitNode config={config}/>) }

            </div>
          </DrawerPage>
      </div>
    )






    // function ActionPointsCheck() {
    //   return (
    //     <div>
    //       <input type="checkbox" checked={getIsActionPointsSystem()} onChange={() => {
    //         const newValue = !getIsActionPointsSystem()
    //         console.log({newValue})
    //         setIsActionPointsSystem(newValue)
    //       }}/><label>Action Points?</label>
    //     </div>
    //   )
    // }
  }