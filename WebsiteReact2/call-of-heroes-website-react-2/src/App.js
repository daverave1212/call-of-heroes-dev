import logo from './logo.svg';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';

import './App.css';
import './nav.css'

import Index from './pages/index'
import Armors from './pages/Other/Armors'
import Weapons from './pages/Other/Weapons'
import Abilities from './pages/Other/Abilities'
import CharacterCreation from './pages/Other/CharacterCreation'
import CharacterCreationCalculator from './pages/Other/CharacterCreationCalculator'
import TransitionGuide from './pages/Other/TransitionGuide'
import Backgrounds from './pages/Other/Backgrounds'
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

function App() {

  const [navState, setNavState] = useState({
    currentlyOpenSubnav: null,
    currentlyOpenUndernav: null
  })
  const isSubnavDisplayed = navState.currentlyOpenSubnav != null
  const isUndernavDisplayed = navState.currentlyOpenUndernav != null

  function NavItem({name, children}) {          // On hover, changes state to display a subnav
    const onHover = () => { setNavState({currentlyOpenSubnav: name, currentlyOpenUndernav: null}) }
    return (<div className='nav-item' onMouseEnter={onHover}>{ children }</div>)
  }
  function MegaDropdown({children}) {           // Displays if there is a currentlyOpenSubnav
    const isDisplayed = true //navState.currentlyOpenSubnav != null
    return (<div className='mega-dropdown' style={{display: isDisplayed? '': 'none'}}>{ children }</div>)
  }
  function SubnavContent({children, name}) {    // Is ONE list of items; displays if its name is same as currentlyOpenSubnav
    const isDisplayed = navState.currentlyOpenSubnav == name
    return (
      <div className='subnav-content' style={{display: isDisplayed? '' : 'none' }}>{ children }</div>
    )
  }
  function SubnavItem({name, children}) {       // Opens an UndernavContent with the same name on hover 
    // const onHover = () => { setNavState({...navState, currentlyOpenUndernav: name}) }
    const onHover = () => {
      if (name == navState.currentlyOpenUndernav) return; // To prevent some weird rerenders
      setNavState({...navState, currentlyOpenUndernav: name})
    }
    return (<div className='subnav-item' onMouseEnter={onHover}>{ children }</div>)
  }
  function UndernavContent({children, name}) {  // Is ONE list of items; displays if its name is same as currentlyOpenUndernav
    const isDisplayed = navState.currentlyOpenUndernav == name
    return (
      <div className='undernav-content' style={{display: isDisplayed? '' : 'none' }}>{ children }</div>
    )
  }
  function BannerLink({name, link, isDownload}) {
    const closeMenus = () => setNavState({currentlyOpenSubnav: null, currentlyOpenUndernav: null})
    if (isDownload === true) {
      return (
        <a href={link} onClick={closeMenus} target="_blank" download>
          <HomeBanner3 title={name}/>
        </a>
      )
    } else {
      return (
        <Link onClick={closeMenus} to={link}>
          <HomeBanner3 title={name}/>
        </Link>
      )
    }
  }
  function closeNav(event) {
    setNavState({
      currentlyOpenSubnav: null,
      currentlyOpenUndernav: null
    })
  }


  return (
    <div id="Window">
      <BrowserRouter>

        <div id="Navigation-Section">
          <nav>
            {/* <div className='nav-item'><Link to="/">Home</Link></div> */}
            <NavItem name='Database'><Link to="">Database</Link></NavItem>
            <NavItem name='Learn'><Link to="">Learn</Link></NavItem>
            <NavItem name='Rules'><Link to="">Rules</Link></NavItem>
            <NavItem name='Lore'><Link to="">Lore</Link></NavItem>
            <NavItem name='GM Resources'><Link to="">GM Resources</Link></NavItem>
          </nav>

          <MegaDropdown>
            <div className='subnav' style={{display: isSubnavDisplayed? '' : 'none'}}>

              <SubnavContent name="Database">
                <SubnavItem name='Races'><Link to="">Races</Link></SubnavItem>
                <SubnavItem name='Classes'><Link to="">Classes</Link></SubnavItem>
                <SubnavItem>
                  <Link to="/Other/Backgrounds">Backgrounds</Link>
                </SubnavItem>
                <SubnavItem><Link to="/Other/Abilities">Abilities</Link></SubnavItem>
                <SubnavItem name="Gear and Items"><Link to="">Gear and Items</Link></SubnavItem>
                <SubnavItem name="Other"><Link to="">Other</Link></SubnavItem>
              </SubnavContent>

              <SubnavContent name="Learn">
                <SubnavItem><Link to="/Other/HowToPlayForNewPlayers">How To Play (for New Players)</Link></SubnavItem>
                <SubnavItem><Link to="/Other/TransitionGuide">How To Play (for D&D Players)</Link></SubnavItem>
                <SubnavItem><Link to="/Other/CharacterCreation">Character Creation</Link></SubnavItem>
                <SubnavItem><Link to="/Other/CharacterCreationCalculator">Character Helper</Link></SubnavItem>
              </SubnavContent>

              <SubnavContent name="Rules">
                <SubnavItem><Link to="/Other/Rules">All Rules Glossary</Link></SubnavItem>
                <SubnavItem><Link to="/Other/CrowdControl">Crowd Control</Link></SubnavItem>
                <SubnavItem><Link to="/Other/AreasOfEffect">Area of Effect</Link></SubnavItem>
                <SubnavItem><Link to="/Other/AttackModifiers">Attack Modifiers</Link></SubnavItem>
                <SubnavItem><Link to="/TODO">Inventory</Link></SubnavItem>
              </SubnavContent>

              <SubnavContent name="Lore">
                <SubnavItem><Link to="/Lore/Languages">Languages</Link></SubnavItem>
                <SubnavItem><Link to="/Lore/SpellSchoolDescriptions">Spell Schools</Link></SubnavItem>
                <SubnavItem><Link to="/Lore/Levels">Levels</Link></SubnavItem>
              </SubnavContent>

              <SubnavContent name="GM Resources">
                <SubnavItem><Link to="/TODO">How To Be a Good GM</Link></SubnavItem>
                <SubnavItem><Link to="/TODO">Encounters</Link></SubnavItem>
                <SubnavItem><Link to="/Other/Monsters">Monsters</Link></SubnavItem>
                <SubnavItem><Link to="/TODO">Magic Items</Link></SubnavItem>
                <SubnavItem><Link to="/TODO">Puzzles</Link></SubnavItem>
              </SubnavContent>



            </div>
            {/* <LandingPageSeparator type="4" style={{display: isSubnavDisplayed? '' : 'none'}}/> */}
            <LandingPageSeparator type="7" style={{display: isSubnavDisplayed && isUndernavDisplayed == false? '' : 'none'}}/>

            <div className='undernav' style={{display: isUndernavDisplayed? '' : 'none'}}>  {/* The whole section with banners; has background color */}
              
              <UndernavContent name='Races'>
                <BannerLink link="/Races/Bertle" name='Bertle'/>
                <BannerLink link="/Races/Dragonborn" name='Dragonborn'/>
                <BannerLink link="/Races/Dwarf" name='Dwarf'/>
                <BannerLink link="/Races/Elf" name='Elf'/>
                <BannerLink link="/Races/Gnome" name='Gnome'/>
                <BannerLink link="/Races/Hollow" name='Hollow'/>
                <BannerLink link="/Races/Human" name='Human'/>
                <BannerLink link="/Races/Orc" name='Orc'/>
              </UndernavContent>

              <UndernavContent name='Classes'>
                <BannerLink link="/Classes/Cleric" name='Cleric'/>
                <BannerLink link="/Classes/Druid" name='Druid'/>
                <BannerLink link="/Classes/Hunter" name='Hunter'/>
                <BannerLink link="/Classes/Mage" name='Mage'/>
                <BannerLink link="/Classes/Paladin" name='Paladin'/>
                <BannerLink link="/Classes/Rogue" name='Rogue'/>
                <BannerLink link="/Classes/Shaman" name='Shaman'/>
                <BannerLink link="/Classes/Warlock" name='Warlock'/>
                <BannerLink link="/Classes/Warrior" name='Warrior'/>
              </UndernavContent>

              <UndernavContent name='Gear and Items'>
                <BannerLink link="/Other/Weapons" name='Weapons'/>
                <BannerLink link="/Other/Armors" name='Armor'/>
                <BannerLink link="/Other/Prices" name='Item Prices'/>
              </UndernavContent>

              <UndernavContent name='Other'>
                <BannerLink isDownload={true} link="/Download/Sheet-2023-01-01.psd" name='Character Sheet (PSD)'/>
                <BannerLink isDownload={true} link="/Download/Sheet-2023-01-01.png" name='Character Sheet (PNG)'/>
                <BannerLink name='Obstacles'/>
                <BannerLink link="/Other/PetsAndAnimals" name='Pets and Animals'/>
                <BannerLink link="/Other/Feats" name='Feats'/>
              </UndernavContent>


            </div>
            <LandingPageSeparator type="7" style={{display: isUndernavDisplayed? '' : 'none'}}/>
          </MegaDropdown>

          {/* <LandingPageSeparator/> */}
          <LandingPageSeparator type="8"/>
        </div>





        <div className="content" onClick={closeNav}>

            {/* Here will be rendered the page: */}
          <Routes>
            <Route path="/" element={ <Index/> }/>
            <Route path="/Other/Rule" element={ <Rule/> }/>
            <Route path="/Other/Rules" element={ <Rules/> }/>
            <Route path="/Other/Abilities" element={ <Abilities/> }/>
            <Route path="/Other/Feats" element={ <Feats/> }/>
            <Route path="/Other/Backgrounds" element={ <Backgrounds/> }/>
            <Route path="/Other/Armors" element={ <Armors/> }/>
            <Route path="/Other/Weapons" element={ <Weapons/> }/>
            <Route path="/Other/HowToPlayForNewPlayers" element={ <HowToPlayForNewPlayers/> }/>
            <Route path="/Other/CharacterCreation" element={ <CharacterCreation/> }/>
            <Route path="/Other/CharacterCreationCalculator" element={ <CharacterCreationCalculator/> }/>
            <Route path="/Other/TransitionGuide" element={ <TransitionGuide/> }/>
            <Route path="/Other/Monsters" element={ <Monsters/> }/>
            <Route path="/Other/Monster" element={ <Monster/> }/>
            <Route path="/Other/Prices" element={ <Prices/> }/>
            <Route path="/Other/Obstacles" element={ <Obstacles/> }/>
            <Route path="/Other/PetsAndAnimals" element={ <PetsAndAnimals/> }/>
            <Route path="/Other/PetOrAnimal" element={ <PetOrAnimal/> }/>
            <Route path="/Other/AttackModifiers" element={ <AttackModifiers/> }/>
            <Route path="/Other/CrowdControl" element={ <CrowdControl/> }/>
            <Route path="/Other/AreasOfEffect" element={ <AreasOfEffect/> }/>
            
            <Route path="/Lore/Levels" element={ <Levels/> }/>
            <Route path="/Lore/SpellSchoolDescriptions" element={ <SpellSchoolDescriptions/> }/>
            <Route path="/Lore/Languages" element={ <Languages/> }/>

            <Route path="/Races/Bertle" element= { <Bertle/> }/>
            <Route path="/Races/Dragonborn" element= { <Dragonborn/> }/>
            <Route path="/Races/Dwarf" element= { <Dwarf/> }/>
            <Route path="/Races/Elf" element= { <Elf/> }/>
            <Route path="/Races/Gnome" element= { <Gnome/> }/>
            <Route path="/Races/Hollow" element= { <Hollow/> }/>
            <Route path="/Races/Human" element= { <Human/> }/>
            <Route path="/Races/Orc" element= { <Orc/> }/>

            <Route path="/Classes/Cleric" element={ <Cleric/> }/>
            <Route path="/Classes/Druid" element={ <Druid/> }/>
            <Route path="/Classes/Hunter" element={ <Hunter/> }/>
            <Route path="/Classes/Mage" element={ <Mage/> }/>
            <Route path="/Classes/Paladin" element={ <Paladin/> }/>
            <Route path="/Classes/Rogue" element={ <Rogue/> }/>
            <Route path="/Classes/Shaman" element={ <Shaman/> }/>
            <Route path="/Classes/Warlock" element={ <Warlock/> }/>
            <Route path="/Classes/Warrior" element={ <Warrior/> }/>
          </Routes>

        </div>
        



        
        <footer className='footer'>
          <LandingPageSeparator type="8"/>
        </footer>
      </BrowserRouter>
    </div>

  );
}

export default App;
