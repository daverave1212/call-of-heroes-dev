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
import CharacterCreation from './pages/Other/CharacterCreation'
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



export default function Nav({ navState, setNavState, isSimple, setIsSimple }) {

    

    const isSubnavDisplayed = navState.currentlyOpenSubnav != null

    function NavItem({name, children}) {          // On hover, changes state to display a subnav
        const onHover = () => {
          setNavState({currentlyOpenSubnav: name})
        }
        return (<div className='nav-item' onMouseEnter={onHover}>{ children }</div>)
    }
  
    function LiLink({to, children, isDownload}) {
      if (isDownload === true) {
        return <li onClick={null}><a href={to} target="_blank" download>{children}</a></li>
      }
      return (
        <li><Link to={to}>{children}</Link></li>
      )
    }

    function displayShouldShow(name) {
      return {display: navState.currentlyOpenSubnav == name? '' : 'none' }
    }

    return (
      <div id="Navigation-Section">
          <nav>
            <NavItem name='Database'>Database</NavItem>
            <NavItem name='Learn'>Learn</NavItem>
            <NavItem name='Lore'>Lore</NavItem>
            <NavItem name='GM Resources'>GM Resources</NavItem>

            <div className='nav-item'><input className='nav-simple-checkbox' type="checkbox" checked={isSimple} onChange={(evt) => {
                const newValue = evt.target.checked
                window.localStorage.setItem('isSimple', newValue)
                setIsSimple(newValue)
            }}/>Simple Mode</div>

          </nav>

          <div className='mega-dropdown' style={{display: isSubnavDisplayed? '': 'none'}}>
            
            <div className='subnav' style={displayShouldShow('Database')}>

              <div className='subnav-section'>
                <h4>Races</h4>
                <div className='subnav-title-underline'></div>
                <ul>
                  <LiLink to="/Races/Bertle">Bertle</LiLink>
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
                <h4>Proficiencies</h4>
                <div className='subnav-title-underline'></div>
                <ul>
                  <LiLink to="/Other/Proficiencies">All</LiLink>
                </ul>

                <h4 style={{marginTop: '38px'}}>Abilities</h4>
                <div className='subnav-title-underline'></div>
                <ul>
                  <LiLink to="/Other/Abilities">All</LiLink>
                </ul>
              </div>

              <div className='subnav-section'>
                <h4>Gear and Items</h4>
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
                  <LiLink isDownload={true} to="/Download/Sheet-2023-01-06.pdf">Character Sheet (PDF)</LiLink>
                  <LiLink isDownload={true} to="/Download/Sheet-2023-01-06.psd">Character Sheet (PSD)</LiLink>
                  <LiLink isDownload={true} to="/Download/Sheet-2023-01-06.png">Character Sheet (PNG)</LiLink>
                  <LiLink to="/Other/Prices">Obstacles</LiLink>
                  <LiLink to="/Other/PetsAndAnimals">Pets and Animals</LiLink>
                  <LiLink to="/Other/Feats">Feats</LiLink>
                </ul>
              </div>

            </div>

            <div className='subnav' style={displayShouldShow('Learn')}>

              <div className='subnav-section learn'>
                <h4>Resources for Learning</h4>
                <div className='subnav-title-underline'></div>
                <ul>
                  <LiLink to="/Other/HowToPlayForNewPlayers">How To Play (for New Players)</LiLink>
                  <LiLink to="/Other/TransitionGuide">How To Play (for D&D Players)</LiLink>
                  <LiLink to="/Other/CharacterCreation">Character Creation</LiLink>
                  <LiLink to="/Other/CharacterCreationCalculator">Character Helper</LiLink>
                </ul>
              </div>

              <div className='subnav-section'>
                <h4>Rules</h4>
                <div className='subnav-title-underline'></div>
                <ul>
                  <LiLink to="/Other/Rules">All Rules</LiLink>
                  <LiLink to="/Other/CrowdControl">Crowd Control</LiLink>
                  <LiLink to="/Other/AreasOfEffect">Area of Effect</LiLink>
                  <LiLink to="/Other/AttackModifiers">Attack Modifiers</LiLink>
                </ul>
              </div>

            </div>

            <div className='subnav' style={displayShouldShow('Lore')}>
              <div className='subnav-section'>
                <h4>Template Lore</h4>
                <div className='subnav-title-underline'></div>
                <ul>
                  <LiLink to="/Lore/Languages">Languages</LiLink>
                  <LiLink to="/Lore/SpellSchoolDescriptions">Spell Schools</LiLink>
                  <LiLink to="/Lore/Levels">Levels</LiLink>
                </ul>
              </div>
            </div>

            <div className='subnav' style={displayShouldShow('GM Resources')}>

              <div className='subnav-section wider'>
                <h4>Guides</h4>
                <div className='subnav-title-underline'></div>
                <ul>
                  <LiLink to="/Lore/Languages">Game Master Basics</LiLink>
                  <LiLink to="/Lore/Languages">How To Be a Good GM</LiLink>
                </ul>
              </div>

              <div className='subnav-section'>
                <h4>Databases</h4>
                <div className='subnav-title-underline'></div>
                <ul>
                  <LiLink to="/Other/Monsters">Monsters</LiLink>
                  <LiLink to="/Lore/Languages">Encounters</LiLink>
                </ul>
              </div>

              <div className='subnav-section wider'>
                <h4>Tools</h4>
                <div className='subnav-title-underline'></div>
                <ul>
                  <LiLink to="/Tools/TreasureGenerator">Treasure Generator</LiLink>
                </ul>
              </div>
              
            </div>
            
          </div> {/* Mega Dropdown */}
        </div>
    )
  }