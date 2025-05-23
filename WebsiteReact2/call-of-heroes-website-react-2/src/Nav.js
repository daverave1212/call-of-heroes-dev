import logo from './logo.svg';

import { createContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';

import './App.css';
import './nav.css'

import Index from './pages/index'
import Armors from './pages/Other/Armors'
import Weapons from './pages/Other/Weapons'
import Abilities from './pages/Other/Abilities'
import CharacterCreationCalculator from './pages/Other/CharacterCreationCalculator/CharacterCreationCalculator'
import TransitionGuide from './pages/Other/TransitionGuide'
import Monsters from './pages/Other/Monsters'

import Rule from './pages/Other/Rule';

import Levels from './pages/Lore/Levels';
import SpellSchoolDescriptions from './pages/Lore/SpellSchoolDescriptions';
import Languages from './pages/Lore/Languages';

import PageH1 from './components/PageH1/PageH1'
import PageH2 from './components/PageH2/PageH2'

import Cleric from './pages/Classes/Cleric'
import Druid from './pages/Classes/Druid'
import Hunter from './pages/Classes/Hunter'
import Mage from './pages/Classes/Mage'
import Paladin from './pages/Classes/Paladin'
import Rogue from './pages/Classes/Rogue'
import Shaman from './pages/Classes/Shaman'
import Warlock from './pages/Classes/Warlock'
import Warrior from './pages/Classes/Warrior'

import Bertle from './pages/Races/Bertle'
import Davel from './pages/Races/Davel'
import Dragonborn from './pages/Races/Dragonborn'
import Dwarf from './pages/Races/Dwarf'
import Elf from './pages/Races/Elf'
import Gnome from './pages/Races/Gnome'
import Hollow from './pages/Races/Hollow'
import Human from './pages/Races/Human'
import Orc from './pages/Races/Orc'
import LandingPageSeparator from './components/LandingPageSeparator/LandingPageSeparator';
import Monster from './pages/Other/Monster';
import HomeBanner2 from './components/HomeBanner/HomeBanner2';
import HomeBanner3 from './components/HomeBanner/HomeBanner3';
import { useState } from 'react';
import Prices from './pages/Other/Prices';
import Obstacles from './pages/Other/Obstacles';
import PetsAndAnimals from './pages/Other/PetsAndAnimals';
import PetOrAnimal from './pages/Other/PetOrAnimal';
import Feats from './pages/Other/Feats';
import HowToPlayForNewPlayers from './pages/Other/HowToPlayForNewPlayers';
import Rules from './pages/Other/Rules';
import AttackModifiers from './pages/Other/AttackModifiers';
import CrowdControl from './pages/Other/CrowdControl';
import AreasOfEffect from './pages/Other/AreasOfEffect';
import { getLocalStorageBool } from './utils';

import TreasureGenerator from './pages/Tools/TreasureGenerator';
import { getIsActionPointsSystem, globalStateStore, setIsActionPointsSystem } from './global-state/GlobalState';
import * as auth from './Auth'
import Icon from './components/Icon';

window.auth = auth

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
function LiLink({to, children, isDownload, style, className}) {
  if (isDownload === true) {
    return <li onClick={null}><a className={className} href={to} target="_blank" style={style} download>{children}</a></li>
  }
  return (
    <li><Link className={className} style={style} to={to}>{children}</Link></li>
  )
}
function LiLinkPremium({to, children, isDownload, style }) {
  return <LiLinkWithIcon iconName="Premium.svg" className="premium" to={to} isDownload={isDownload} style={style}>{ children }</LiLinkWithIcon>
}
function LiLinkWithIcon({to, children, isDownload, style, className, iconName}) {

  function LinkContent() {
    return (
      <div className='flex row'>
        <div>
          <Icon name={iconName}/>
        </div>
        <div>
          {children}
        </div>
      </div>
    )
  }

  return (
    <li onClick={null}>
      { isDownload == true? (
        <a className={className} href={to} target="_blank" style={style} download>
          <LinkContent/>
        </a>
      ): (
        <Link className={className} style={style} to={to}>
          <LinkContent/>
        </Link>
      )}
      
    </li>
  )
}

const DISCORD_URL = 'https://discord.gg/' + '27aqSEDyE3'

function MegaDropdownAndPortraitNav({ navState, isBurgerClicked }) {

  const getBaseStateAllFalse = () => ({
    'Game': false,
    'Learn': false,
    'Lore': false,
    'QM Resources': false
  })
  const [areExpandedState, setAreExpandedState] = useState(getBaseStateAllFalse())

  function maybeActiveClassLS(name) {
    // return 'subnav--ls-active'
    return navState.currentlyOpenSubnav == name? 'subnav--ls-active' : 'subnav--ls-inactive'
  }
  function maybeActiveClassPortrait(name) {
    return areExpandedState[name] == false? 'subnav--portrait-inactive' : 'subnav--portrait-active'
  }

  function onClickOnH3(h3Name) {
    const newState = getBaseStateAllFalse()
    newState[h3Name] = !areExpandedState[h3Name]
    setAreExpandedState(newState)
  }

  function MegaDropdownMenu({ title, children }) {  // The big thing right underneath the nav; see how it's used below
    return (
      <div>
        <h3 className="subnav-title-portrait-only" onClick={() => onClickOnH3(title)}>{ title }</h3>  {/* This title is only displayed in portrait mode */}
        <div className={`subnav ${maybeActiveClassLS(title)} ${maybeActiveClassPortrait(title)}`}>    {/* The contents of the mega dropdown */}
          { children }
        </div>
      </div>
    )
  }

  function MegaDropdownMenuSection({title, children}) { // Each MegaDropdownMenu has ONLY several MegaDropdownMenuSection's
    return (
      <div className='subnav-section'>
        <h4>{ title }</h4>
        <div className='subnav-title-underline'></div>
        <ul>
          { children }
        </ul>
      </div>
    )
  }  
  
  // Elements with 'subnav-title-portrait-only' are only visible in portrait mode
  // Each div has a class for its display, either portrait or LS (LandScape)
  return (
    <div className={`mega-dropdown ${isBurgerClicked? 'displayed-on-mobile': ''}`}>
      
      <h3 className="subnav-title-portrait-only"><a style={{color: 'white'}} href={DISCORD_URL} target="_blank">Play With Us!</a></h3>

      <MegaDropdownMenu title="Game">
        <div className='subnav-section'>
          <h4>Races</h4>
          <div className='subnav-title-underline'></div>
          <ul>
            <LiLink to="/Races/Bertle">Bertle</LiLink>
            <LiLink to="/Races/Davel">Davel</LiLink>
            <LiLink to="/Races/Dragonborn">Dragonsworn</LiLink>
            <LiLink to="/Races/Dwarf">Dwarf</LiLink>
            <LiLink to="/Races/Elf">Elf</LiLink>
            <LiLink to="/Races/Gnome">Gnome</LiLink>
            <LiLink to="/Races/Hollow">Hollow</LiLink>
            <LiLink to="/Races/Human">Human</LiLink>
            <LiLink to="/Races/Orc">Orc</LiLink>
          </ul>
        </div>

        <div className='subnav-section'>
          <h4>Classes</h4>
          <div className='subnav-title-underline'></div>
          <ul>
            <LiLink to="/Classes/Cleric">Cleric</LiLink>
            <LiLink to="/Classes/Druid">Druid</LiLink>
            <LiLink to="/Classes/Hunter">Hunter</LiLink>
            <LiLink to="/Classes/Mage">Mage</LiLink>
            <LiLink to="/Classes/Paladin">Paladin</LiLink>
            <LiLink to="/Classes/Rogue">Rogue</LiLink>
            <LiLink to="/Classes/Shaman">Shaman</LiLink>
            <LiLink to="/Classes/Warlock">Warlock</LiLink>
            <LiLink to="/Classes/Warrior">Warrior</LiLink>
          </ul>
        </div>

        <div className='subnav-section'>
          <h4>Abilities</h4>
          <div className='subnav-title-underline'></div>
          <ul>
            <LiLink to="/Other/Abilities">Basic Abilities (Schools)</LiLink>
            <LiLink to="/Other/Proficiencies">Skills</LiLink>
            <LiLink to="/Other/Feats">Feats</LiLink>
            <LiLinkPremium to="/Other/AbilitySheets">Ability Sheet Maker</LiLinkPremium>
          </ul>

          <h4 style={{marginTop: '38px'}}>Gear and Items</h4>
          <div className='subnav-title-underline'></div>
          <ul>
            <LiLink to="/Other/Weapons">Weapons</LiLink>
            <LiLink to="/Other/Armors">Armors</LiLink>
            <LiLink to="/Other/Prices">Prices</LiLink>
          </ul>
        </div>

        <div className='subnav-section wider'>
          <h4>Other</h4>
          <div className='subnav-title-underline'></div>
          <ul>
            <LiLink to="/Other/Obstacles">Obstacles</LiLink>
            <LiLink to="/Other/PetsAndAnimals">Pets and Animals</LiLink>
            <LiLink to="/Lore/Languages">Languages</LiLink>
            <LiLink to="/Meta/PatchNotes">Update Notes</LiLink>
          </ul>
        </div>

        <MegaDropdownMenuSection title="Character Sheets">
          <LiLink isDownload={true} to="/Download/Sheet-2023-03-24b.pdf">Character Sheet (PDF)</LiLink>
          <LiLink isDownload={true} to="/Download/Sheet-2024-06-16.psd">Character Sheet (PSD)</LiLink>
          <LiLink isDownload={true} to="/Download/Sheet-2024-04-28.png">Character Sheet (PNG)</LiLink>
        </MegaDropdownMenuSection>

        <MegaDropdownMenuSection title="Content">
          <LiLinkPremium isDownload={true} to="/Download/Sheet-2023-03-24b.pdf">Mount Hyhelm (Starter One-Shot)</LiLinkPremium>
          <LiLinkPremium isDownload={true} to="/Download/Sheet-2023-03-24b.pdf">Whispervale (Starter Adventure)</LiLinkPremium>
        </MegaDropdownMenuSection>
      </MegaDropdownMenu>

      <h3 className="subnav-title-portrait-only">
        <Link style={{color: 'white'}} to="/Other/Learn">Learn To Play</Link>
      </h3>

      <MegaDropdownMenu title="Learn To Play">
        <MegaDropdownMenuSection title="Learn To Play">
            <LiLink to="/Other/Learn#Character-Creation">Character Creation Guide</LiLink>
            <LiLink to="/Other/Learn#Transition-Guide">Transition Guide (from D&D)</LiLink>
            <LiLink to="/Other/Learn#For-New-Players">New Player Guide</LiLink>
            <LiLink to="/Other/Learn#Rules">Rules</LiLink>
          </MegaDropdownMenuSection>
      </MegaDropdownMenu>

      <MegaDropdownMenu title="QM Resources">
        <MegaDropdownMenuSection title="Guides">
          <LiLink to="/Other/GMGuidelines">GM Guidelines</LiLink>
          <LiLink to="/Lore/Languages">Game Master Basics</LiLink>
          <LiLink to="/Lore/Languages">How To Be a Good GM</LiLink>
        </MegaDropdownMenuSection>

        <MegaDropdownMenuSection title="QM Content">
          <LiLink to="/Other/Monsters">Monsters</LiLink>
          <LiLinkPremium to="/Other/MagicItems">Magic Items</LiLinkPremium>
          <LiLink to="/Other/Encounters">Encounters</LiLink>
        </MegaDropdownMenuSection>

        <MegaDropdownMenuSection title="Tools">
          <LiLink to="/Tools/TreasureGenerator">Treasure Generator</LiLink>
          <LiLinkPremium to="/Other/CustomAbilityCreator">Custom Ability Creator</LiLinkPremium>
          <LiLinkPremium to="/Other/CustomMonsterCreator">Custom Monster Creator</LiLinkPremium>
          <LiLinkPremium to="/Tools/RunePuzzle">Rune Puzzle Maker</LiLinkPremium>
        </MegaDropdownMenuSection>
      </MegaDropdownMenu>
    </div>)
}

function AccountButtons() {

  const isLoggedIn = auth.useIsLoggedIn('AccountButtons')

  function LoginButton() {
    return (
      <div className='nav-item flex row center-content' onClick={async () => {
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



export default function Nav() {

    const [isBurgerClicked, setIsBurgerClicked] = useState(false)
    const [navState, setNavState] = useState({ currentlyOpenSubnav: null })

    function setCurrentlyOpenSubnav(name) {
      setNavState({currentlyOpenSubnav: name})
    }
    function onClickOnBurger() {
      setIsBurgerClicked(!isBurgerClicked)
    }

    function NavItem({name, children, to, isExternal=false }) {          // On hover, changes state to display a subnav
      
      const onExternalAClick = evt => {
        evt.preventDefault()
        window.open(to, '_blank')
      }
      function ExternalLink() {
        return <a onClick={onExternalAClick}>{ children }</a> 
      }

      return (<div className='nav-item' onMouseEnter={ () => setCurrentlyOpenSubnav(name) }>
        {
          to == null?
            children:
          (
            isExternal? (
              <ExternalLink/>
            ) : (
              <Link to={to}>{ children }</Link>
            )
          ) }
      </div>)

    }

    function PlayWithUsButton() {
      return <NavItem to={DISCORD_URL} isExternal={true}>Play With Us!</NavItem>
    }

    function ActionPointsCheck() {
      return (
        <div>
          <input type="checkbox" checked={getIsActionPointsSystem()} onChange={() => {
            const newValue = !getIsActionPointsSystem()
            console.log({newValue})
            setIsActionPointsSystem(newValue)
          }}/><label>Action Points?</label>
        </div>
      )
    }

    return (
      <div id="Navigation-Section" onMouseLeave={() => setCurrentlyOpenSubnav(null)}>
          <LogoQG/>

          <div className='burger-icon' onClick={onClickOnBurger}> <img src="burger-icon.png"/> </div>

          <nav className="nav-landscape">

            <PlayWithUsButton/>
            <NavItem name='Game'>Game</NavItem>
            <NavItem to="/Tools/CharacterCreationCalculator">Create a Character</NavItem>
            <NavItem name='Learn To Play'>Learn To Play</NavItem>
            <NavItem name='QM Resources'>QM Resources</NavItem>
            {/* <ActionPointsCheck/> */}

            <AccountButtons/>

          </nav>

          <MegaDropdownAndPortraitNav navState={navState} isBurgerClicked={isBurgerClicked}/>
      </div>
    )
  }