import logo from './logo.svg';

import { createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';

import './App.css';
import './Nav.css'

import Index from './pages/index'
import Armors from './pages/Other/Armors'
import Weapons from './pages/Other/Weapons'
import Abilities from './pages/Other/Abilities'
import CharacterCreationCalculator from './pages/Other/CharacterCreationCalculator'
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

import AppStateContext from './services/AppStateContext';
import TreasureGenerator from './pages/Tools/TreasureGenerator';

function LiLink({to, children, isDownload}) {
  if (isDownload === true) {
    return <li onClick={null}><a href={to} target="_blank" download>{children}</a></li>
  }
  return (
    <li><Link to={to}>{children}</Link></li>
  )
}

function MegaDropdownAndPortraitNav({ navState, isBurgerClicked }) {

  const [areExpandedState, setAreExpandedState] = useState({
    'Database': false,
    'Learn': false,
    'Lore': false,
    'GM Resources': false
  })

  function maybeActiveClassLS(name) {
    return navState.currentlyOpenSubnav == name? 'subnav--ls-active' : 'subnav--ls-inactive'
  }
  function maybeActiveClassPortrait(name) {
    return areExpandedState[name] == false? 'subnav--portrait-inactive' : ''
  }

  function onClickOnH3(h3Name) {
    const newState = { ...areExpandedState }
    newState[h3Name] = !areExpandedState[h3Name]
    setAreExpandedState(newState)
  }

  
  
  // Elements with 'subnav-title-portrait-only' are only visible in portrait mode
  // Each div has a class for its display, either portrait or LS (LandScape)
  return (
    <div className={`mega-dropdown ${isBurgerClicked? 'displayed-on-mobile': ''}`}>
      
      <h3 className="subnav-title-portrait-only"><a style={{color: 'white'}} href="https://discord.gg/27aqSEDyE3" target="_blank">Play With Us!</a></h3>

      <h3 className="subnav-title-portrait-only" onClick={() => onClickOnH3('Database')}>Database</h3>
      <div className={`subnav ${maybeActiveClassLS('Database')} ${maybeActiveClassPortrait('Database')}`}>

        <div className='subnav-section'>
          <h4>Races</h4>
          <div className='subnav-title-underline'></div>
          <ul>
            <LiLink to="/Races/Bertle">Bertle</LiLink>
            <LiLink to="/Races/Davel">Davel</LiLink>
            <LiLink to="/Races/Dragonborn">Dragonborn</LiLink>
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
            <LiLink to="/Other/Abilities">Basic Ability Lists</LiLink>
            <LiLink to="/Other/Proficiencies">Proficiencies</LiLink>
            <LiLink to="/Other/Feats">Feats</LiLink>
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
            <LiLink isDownload={true} to="/Download/Sheet-2023-03-24b.pdf">Character Sheet (PDF)</LiLink>
            <LiLink isDownload={true} to="/Download/Sheet-2023-03-24.psd">Character Sheet (PSD)</LiLink>
            <LiLink isDownload={true} to="/Download/Sheet-2023-03-24.png">Character Sheet (PNG)</LiLink>
            <LiLink to="/Other/Obstacles">Obstacles</LiLink>
            <LiLink to="/Other/PetsAndAnimals">Pets and Animals</LiLink>
            <LiLink to="/Meta/PatchNotes">Update Notes</LiLink>
          </ul>
        </div>

      </div>

      <h3 className="subnav-title-portrait-only">
        <Link style={{color: 'white'}} to="/Other/Learn">Learn To Play</Link>
      </h3>

      <h3 className="subnav-title-portrait-only" onClick={() => onClickOnH3('GM Resources')}>GM Resources</h3>
      <div className={`subnav ${maybeActiveClassLS('GM Resources')} ${maybeActiveClassPortrait('GM Resources')}`}>

        <div className='subnav-section wider'>
          <h4>Guides</h4>
          <div className='subnav-title-underline'></div>
          <ul>
            <LiLink to="/Other/GMGuidelines">GM Guidelines</LiLink>
            <LiLink to="/Lore/Languages">Game Master Basics</LiLink>
            <LiLink to="/Lore/Languages">How To Be a Good GM</LiLink>
          </ul>
        </div>

        <div className='subnav-section'>
          <h4>Databases</h4>
          <div className='subnav-title-underline'></div>
          <ul>
            <LiLink to="/Other/Monsters">Monsters</LiLink>
            <LiLink to="/Other/MagicItems">Magic Items</LiLink>
            <LiLink to="/Other/Encounters">Encounters</LiLink>
          </ul>
        </div>

        <div className='subnav-section wider'>
          <h4>Tools</h4>
          <div className='subnav-title-underline'></div>
          <ul>
            <LiLink to="/Tools/TreasureGenerator">Treasure Generator</LiLink>
            <LiLink to="/Other/CustomAbilityCreator">Custom Ability Creator</LiLink>
          </ul>
        </div>
        
      </div>
      
    </div>)
}

export default function Nav({ navState, setNavState, isSimple, setIsSimple }) {

    const [isBurgerClicked, setIsBurgerClicked] = useState(false)

    function setCurrentlyOpenSubnav(name) {
      setNavState({currentlyOpenSubnav: name})
    }
    function onClickOnBurger() {
      setIsBurgerClicked(!isBurgerClicked)
    }

    function NavItem({name, children}) {          // On hover, changes state to display a subnav
      return (<div className='nav-item' onMouseEnter={() => setCurrentlyOpenSubnav(name) }>{ children }</div>)
  }

    return (
      <div id="Navigation-Section" onMouseLeave={() => setCurrentlyOpenSubnav(null)}>
          <div className="nav-logo-div">
            <Link to="/"><img src="/favicon.png"/></Link>
          </div>
          <div className='nav-logo-version'>
            v2023-12-31
          </div>

          <div className='burger-icon' onClick={onClickOnBurger}>
            <img src="burger-icon.png"/>
          </div>

          <nav className="nav-landscape">
            <div className='nav-item'><a href="https://discord.gg/27aqSEDyE3" target="_blank">Play With Us!</a></div>
            <NavItem name='Database'>Database</NavItem>

            <div className='nav-item'>
              <Link style={{color: 'white'}} to="/Other/Learn">Learn To Play</Link>
            </div>
            <NavItem name='GM Resources'>GM Resources</NavItem>

            {/* <div className='nav-item'><input className='nav-simple-checkbox' type="checkbox" checked={isSimple} onChange={(evt) => {
                const newValue = evt.target.checked
                window.localStorage.setItem('isSimple', newValue)
                setIsSimple(newValue)
            }}/>Simple Mode</div> */}
          </nav>

          {/* <nav className="nav-portrait">

          </nav> */}

          <MegaDropdownAndPortraitNav navState={navState} isBurgerClicked={isBurgerClicked}/>
      </div>
    )
  }