import logo from './logo.svg';

import { createContext, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
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
import { getBasePathBeforeHash, getLocalStorageBool, getLocationHackyPath, getPageHashFromLocation, isBasePathEmpty, isHashEmpty } from './utils';

import AppStateContext from './services/AppStateContext';
import TreasureGenerator from './pages/Tools/TreasureGenerator';

import Nav from './Nav'
import DungeonGenerator from './pages/Tools/DungeonGenerator';
import RunePuzzle from './pages/Tools/RunePuzzle';
import Proficiencies from './pages/Other/Proficiencies';
import Encounters from './pages/Other/Encounters';

function App() {

  const [appState, setAppState] = useState({
    isSimple: getLocalStorageBool('isSimple')
  })
  const [navState, setNavState] = useState({
    currentlyOpenSubnav: null
  })

  


  const navigate = useNavigate()
  const hackyPath = getLocationHackyPath(window.location)
  const isURLHackedForGitHub = hackyPath != null

  useEffect(() => { // After page loads
    if (isURLHackedForGitHub) {
      window.location.href = hackyPath
    }
  })






  function closeNav(event) {
    setNavState({
        currentlyOpenSubnav: null
    })
  }

  const isSimple = appState.isSimple
  const setIsSimple = (newIsSimple) => setAppState({isSimple: newIsSimple})

  return (
    <div id="Window" className={`${appState.isSimple? '' : 'window--has-background'}`}>

        <Nav navState={navState} setNavState={setNavState} isSimple={isSimple} setIsSimple={setIsSimple}/>

        <AppStateContext.Provider value={[appState, setAppState]}>
          <div className="content" onClick={() => {
            closeNav()
          }}>

              {/* Here will be rendered the page: */}
            <Routes>
              <Route path="/" element={(
                isURLHackedForGitHub == false? <Index/> : null  // Prevent loading a page for no reason if path is hacky
              )}/>
              <Route path="/Other/Rule" element={ <Rule/> }/>
              <Route path="/Other/Rules" element={ <Rules/> }/>
              <Route path="/Other/Abilities" element={ <Abilities/> }/>
              <Route path="/Other/Feats" element={ <Feats/> }/>
              <Route path="/Other/Proficiencies" element={ <Proficiencies/> }/>
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
              <Route path="/Other/Encounters" element={ <Encounters/> }/>
              
              <Route path="/Lore/Levels" element={ <Levels/> }/>
              <Route path="/Lore/SpellSchoolDescriptions" element={ <SpellSchoolDescriptions/> }/>
              <Route path="/Lore/Languages" element={ <Languages/> }/>

              <Route path="/Races/Bertle" element= { <Bertle/> }/>
              <Route path="/Races/Davel" element= { <Davel/> }/>
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

              <Route path="/Tools/TreasureGenerator" element={ <TreasureGenerator/> }/>
              <Route path="/Tools/DungeonGenerator" element={ <DungeonGenerator/> }/>
              <Route path="/Tools/RunePuzzle" element={ <RunePuzzle/> }/>
            </Routes>

          </div>
        </AppStateContext.Provider>
        



        
        <footer className='footer'>
          <LandingPageSeparator type="8"/>
        </footer>
    </div>

  );
}

export default App;
