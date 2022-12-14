import logo from './logo.svg';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';

import './App.css';
import './nav.css'
import './page-style.css'

import Index from './pages/index'
import Armors from './pages/Other/Armors'
import Weapons from './pages/Other/Weapons'
import Abilities from './pages/Other/Abilities'
import CharacterCreation from './pages/Other/CharacterCreation'
import CharacterCreationCalculator from './pages/Other/CharacterCreationCalculator'
import TransitionGuide from './pages/Other/TransitionGuide'
import Backgrounds from './pages/Other/Backgrounds'

import Rule from './pages/Other/Rule';

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

function App() {
  return (
    <div id="Window">
      <BrowserRouter>

        <nav>
          {/* <div className='nav-item'><Link to="/">Home</Link></div> */}
          <div className='nav-item'><Link to="/Other/Abilities">Abilities</Link></div>
          <div className='nav-item'><Link to="/Other/Weapons">Weapons</Link></div>
          <div className='nav-item'><Link to="/Other/Armors">Armors</Link></div>
          <div className='nav-item'><Link to="/Other/CharacterCreation">Character</Link></div>
          <div className='nav-item'><Link to="/Other/CharacterCreationCalculator">CH</Link></div>
          <div className='nav-item'>
            <Link to="#">Races</Link>
            <div className='nav-item__dropdown'>
              <div className='nav-item__dropdown-item'><Link to="/Races/Bertle">Bertle</Link></div>
              <div className='nav-item__dropdown-item'><Link to="/Races/Dragonborn">Dragonborn</Link></div>
              <div className='nav-item__dropdown-item'><Link to="/Races/Dwarf">Dwarf</Link></div>
              <div className='nav-item__dropdown-item'><Link to="/Races/Elf">Elf</Link></div>
              <div className='nav-item__dropdown-item'><Link to="/Races/Gnome">Gnome</Link></div>
              <div className='nav-item__dropdown-item'><Link to="/Races/Hollow">Hollow</Link></div>
              <div className='nav-item__dropdown-item'><Link to="/Races/Human">Human</Link></div>
              <div className='nav-item__dropdown-item'><Link to="/Races/Orc">Orc</Link></div>
            </div>
          </div>
          <div className='nav-item'>
            <Link to="#">Classes</Link>
            <div className='nav-item__dropdown'>
              <div className='nav-item__dropdown-item hover-cleric'><Link to="/Classes/Cleric">Cleric</Link></div>
              <div className='nav-item__dropdown-item hover-druid'><Link to="/Classes/Druid">Druid</Link></div>
              <div className='nav-item__dropdown-item hover-hunter'><Link to="/Classes/Hunter">Hunter</Link></div>
              <div className='nav-item__dropdown-item hover-mage'><Link to="/Classes/Mage">Mage</Link></div>
              <div className='nav-item__dropdown-item hover-paladin'><Link to="/Classes/Paladin">Paladin</Link></div>
              <div className='nav-item__dropdown-item hover-rogue'><Link to="/Classes/Rogue">Rogue</Link></div>
              <div className='nav-item__dropdown-item hover-shaman'><Link to="/Classes/Shaman">Shaman</Link></div>
              <div className='nav-item__dropdown-item hover-warlock'><Link to="/Classes/Warlock">Warlock</Link></div>
              <div className='nav-item__dropdown-item hover-warrior'><Link to="/Classes/Warrior">Warrior</Link></div>
            </div>
          </div>
        </nav>

        <LandingPageSeparator/>

        <div className="content">

            {/* Here will be rendered the page: */}
          <Routes>
            <Route path="/" element={ <Index/> }/>
            <Route path="/Other/Rule" element={ <Rule/> }/>
            <Route path="/Other/Abilities" element={ <Abilities/> }/>
            <Route path="/Other/Backgrounds" element={ <Backgrounds/> }/>
            <Route path="/Other/Armors" element={ <Armors/> }/>
            <Route path="/Other/Weapons" element={ <Weapons/> }/>
            <Route path="/Other/CharacterCreation" element={ <CharacterCreation/> }/>
            <Route path="/Other/CharacterCreationCalculator" element={ <CharacterCreationCalculator/> }/>
            <Route path="/Other/TransitionGuide" element={ <TransitionGuide/> }/>

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
        
        <LandingPageSeparator/>
        <footer className='footer'></footer>
      </BrowserRouter>
    </div>

  );
}

export default App;
