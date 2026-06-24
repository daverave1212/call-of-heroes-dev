import logo from './logo.svg';

import { createContext, memo, useEffect, useReducer } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

import './App.css'

import './app-color-vars.css'
import './app-text-vars.css'
import './app-layout-vars.css'
import './layout-classes.css'

import './nav.css'
import './components/SmallStat/InlineIcon.css'

import Home from './pages/Home.js'
import Armors from './pages/Other/Armors.js'
import Weapons from './pages/Other/Weapons'
import Abilities from './pages/Other/Abilities'
import CharacterCreationCalculator from './pages/Other/CharacterCreationCalculator/CharacterCreationCalculator'
import Monsters from './pages/Other/Monsters'

import Levels from './pages/Lore/Levels';
import SpellSchoolDescriptions from './pages/Lore/SpellSchoolDescriptions';
import Languages from './pages/Lore/Languages';

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
import Rules from './pages/Other/Rules';
import AttackModifiers from './pages/Other/AttackModifiers';
import CrowdControl from './pages/Other/CrowdControl';
import AreasOfEffect from './pages/Other/AreasOfEffect';
import { getBasePathBeforeHash, getLocalStorageBool, getLocationHackyPath, getPageHashFromLocation, isBasePathEmpty, isHashEmpty } from './utils';

import TreasureGenerator from './pages/Tools/TreasureGenerator';

import Nav from './Nav'
import DungeonGenerator from './pages/Tools/DungeonGenerator';
import RunePuzzle from './pages/Tools/RunePuzzle';
import Proficiencies from './pages/Other/Proficiencies';
import Encounters from './pages/Other/Encounters';
import AbilitySheets from './pages/Other/AbilitySheets';
import GMGuidelines from './pages/Other/GMGuidelines';
import AbilitySheetsPrint from './pages/Other/AbilitySheetsPrint';
import Learn from './pages/Other/RulesExplained/Learn';
import Questguard from './pages/Other/RulesExplained/RulesSectionPages.js/Questguard';
import PlayingTheGame from './pages/Other/RulesExplained/RulesSectionPages.js/PlayingTheGame';
import CoreRulesInDepth from './pages/Other/RulesExplained/RulesSectionPages.js/CoreRulesInDepth';
import GameMasterGuidelines from './pages/Other/RulesExplained/RulesSectionPages.js/GameMasterGuidelines';
import CustomAbility from './pages/Other/CustomAbility';
import MagicItems from './pages/Other/MagicItems';
import PatchNotes from './pages/Meta/PatchNotes';
import CustomMonster from './pages/Other/CustomMonster';
import TitleGenerator from './pages/Tools/TitleGenerator';
import MagicItemCreator from './pages/Other/MagicItemCreator';
import { AppStateContext } from './global-state/GlobalState';
import HomebrewBookCreator from './pages/HomebrewBookCreator/HomebrewBookCreator';
import Quirks from './pages/Other/Quirks';
import WorkInProgress from './pages/Meta/WorkInProgress';

import V2Artificer from './databases/ClassesV2/Artificer.json'
import V2Berserker from './databases/ClassesV2/Berserker.json'
import V2Cursewielder from './databases/ClassesV2/Cursewielder.json'
import V2Druid from './databases/ClassesV2/Druid.json'
import V2Hunter from './databases/ClassesV2/Hunter.json'
import V2Knight from './databases/ClassesV2/Knight.json'
import V2Mystic from './databases/ClassesV2/Mystic.json'
import V2Paladin from './databases/ClassesV2/Paladin.json'
import V2Priest from './databases/ClassesV2/Priest.json'
import V2Rogue from './databases/ClassesV2/Rogue.json'
import V2Shaman from './databases/ClassesV2/Shaman.json'
import V2Sorcerer from './databases/ClassesV2/Sorcerer.json'
import V2Soulwright from './databases/ClassesV2/Soulwright.json'
import V2Outlaw from './databases/ClassesV2/Swashbuckler.json'
import V2Warlock from './databases/ClassesV2/Warlock.json'
import V2Warrior from './databases/ClassesV2/Warrior.json'
import V2Wickan from './databases/ClassesV2/Wickan.json'
import V2Wizard from './databases/ClassesV2/Wizard.json'
import { ClassPage } from './components/InsertableTemplates/RaceClassComponents';
import RulesAll from './pages/Other/RulesAll';
import ClassBalance from './pages/Meta/ClassBalance';
import MagicFonts from './pages/Other/MagicFonts';
import DictionaryGenerator from './pages/Tools/DictionaryGenerator';
import BookCreator from './pages/BookCreator/BookCreator';
import MerchantGenerator from './pages/Tools/MerchantGenerator';
import Debug from './pages/Meta/Debug';

function App() {

  const [appState, setAppState] = useState({})

  const navigate = useNavigate()
  const hackyPath = getLocationHackyPath(window.location)
  const isURLHackedForGitHub = hackyPath != null

  useEffect(() => { // After page loads
    if (isURLHackedForGitHub) {
      navigate(hackyPath)
    }
  })

  function WindowContent() {
    return (
      <div id="Window-Content">

          {/* Here will be rendered the page: */}
        <Routes>
          <Route path="/" element={(
            isURLHackedForGitHub == false? <Home/> : null  // Prevent loading a page for no reason if path is hacky
          )}/>
          <Route path="/Other/GMGuidelines" element={ <GMGuidelines/> }/>
          <Route path="/Other/Encounters" element={ <Encounters/> }/>
          <Route path="/Other/Monsters" element={ <Monsters/> }/>
          <Route path="/Other/Monster" element={ <Monster/> }/>
          <Route path="/Other/CustomAbilityCreator" element={ <CustomAbility/> }/>
          <Route path="/Other/CustomMonsterCreator" element={ <CustomMonster/> }/>
          <Route path="/Other/MagicItems" element={ <MagicItems/> }/>

          <Route path="/Other/Abilities" element={ <Abilities/> }/>
          <Route path="/Other/MagicFonts" element={ <MagicFonts/> }/>
          <Route path="/Other/Feats" element={ <Feats/> }/>
          <Route path="/Other/Proficiencies" element={ <Proficiencies/> }/>
          <Route path="/Other/Armors" element={ <Armors/> }/>
          <Route path="/Other/Weapons" element={ <Weapons/> }/>
          <Route path="/Other/Prices" element={ <Prices/> }/>
          <Route path="/Other/Obstacles" element={ <Obstacles/> }/>
          <Route path="/Other/PetsAndAnimals" element={ <PetsAndAnimals/> }/>
          <Route path="/Other/PetOrAnimal" element={ <PetOrAnimal/> }/>
          <Route path="/Other/AttackModifiers" element={ <AttackModifiers/> }/>
          <Route path="/Other/CrowdControl" element={ <CrowdControl/> }/>
          <Route path="/Other/AreasOfEffect" element={ <AreasOfEffect/> }/>
          <Route path="/Other/Quirks" element={ <Quirks/> }/>
          
          <Route path="/Other/Learn" element={ <Learn/> }/>
          <Route path="/Other/Rules" element={ <Rules/> }/>
          <Route path="/Other/RulesAll" element={ <RulesAll/> }/>
          <Route path="/Other/RulesExplained/RulesSectionPages/Questguard" element={ <Questguard/> }/>
          <Route path="/Other/RulesExplained/RulesSectionPages/PlayingTheGame" element={ <PlayingTheGame/> }/>
          <Route path="/Other/RulesExplained/RulesSectionPages/CoreRulesInDepth" element={ <CoreRulesInDepth/> }/>
          <Route path="/Other/RulesExplained/RulesSectionPages/GameMasterGuidelines" element={ <GameMasterGuidelines/> }/>
          

          <Route path="/Other/AbilitySheets" element={ <AbilitySheets/> }/>
          <Route path="/Other/AbilitySheetsPrint" element={ <AbilitySheetsPrint/> }/>
          
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

          <Route path='ClassesV2/Artificer' element={<ClassPage isCharacterCreationPage={false} theClass={V2Artificer}/>}/>
          <Route path='ClassesV2/Berserker' element={<ClassPage isCharacterCreationPage={false} theClass={V2Berserker}/>}/>
          <Route path='ClassesV2/Cursewielder' element={<ClassPage isCharacterCreationPage={false} theClass={V2Cursewielder}/>}/>
          <Route path='ClassesV2/Druid' element={<ClassPage isCharacterCreationPage={false} theClass={V2Druid}/>}/>
          <Route path='ClassesV2/Hunter' element={<ClassPage isCharacterCreationPage={false} theClass={V2Hunter}/>}/>
          <Route path='ClassesV2/Knight' element={<ClassPage isCharacterCreationPage={false} theClass={V2Knight}/>}/>
          <Route path='ClassesV2/Mystic' element={<ClassPage isCharacterCreationPage={false} theClass={V2Mystic}/>}/>
          <Route path='ClassesV2/Paladin' element={<ClassPage isCharacterCreationPage={false} theClass={V2Paladin}/>}/>
          <Route path='ClassesV2/Priest' element={<ClassPage isCharacterCreationPage={false} theClass={V2Priest}/>}/>
          <Route path='ClassesV2/Rogue' element={<ClassPage isCharacterCreationPage={false} theClass={V2Rogue}/>}/>
          <Route path='ClassesV2/Shaman' element={<ClassPage isCharacterCreationPage={false} theClass={V2Shaman}/>}/>
          <Route path='ClassesV2/Sorcerer' element={<ClassPage isCharacterCreationPage={false} theClass={V2Sorcerer}/>}/>
          <Route path='ClassesV2/Soulwright' element={<ClassPage isCharacterCreationPage={false} theClass={V2Soulwright}/>}/>
          <Route path='ClassesV2/Swashbuckler' element={<ClassPage isCharacterCreationPage={false} theClass={V2Outlaw}/>}/>
          <Route path='ClassesV2/Warlock' element={<ClassPage isCharacterCreationPage={false} theClass={V2Warlock}/>}/>
          <Route path='ClassesV2/Warrior' element={<ClassPage isCharacterCreationPage={false} theClass={V2Warrior}/>}/>
          <Route path='ClassesV2/Wickan' element={<ClassPage isCharacterCreationPage={false} theClass={V2Wickan}/>}/>
          <Route path='ClassesV2/Wizard' element={<ClassPage isCharacterCreationPage={false} theClass={V2Wizard}/>}/>

          <Route path="/Tools/MagicItemGenerator" element={ <MagicItemCreator/> }/>
          <Route path="/Tools/TreasureGenerator" element={ <TreasureGenerator/> }/>
          <Route path="/Tools/DungeonGenerator" element={ <DungeonGenerator/> }/>
          <Route path="/Tools/RunePuzzle" element={ <RunePuzzle/> }/>
          <Route path="/Tools/DictionaryGenerator" element={ <DictionaryGenerator/> }/>
          <Route path="/Tools/TitleGenerator" element={ <TitleGenerator/> }/>
          <Route path="/Tools/CharacterCreationCalculator" element = { <CharacterCreationCalculator/> }/>
          <Route path="/Tools/HomebrewBookCreator" element = { <HomebrewBookCreator/> }/>
          <Route path="/Tools/BookCreator" element = { <BookCreator/> }/>
          <Route path="/Tools/MerchantGenerator" element = { <MerchantGenerator/> }/>

          <Route path='/Meta/Admin' element={ <PatchNotes/> }/>
          <Route path='/Meta/PatchNotes' element={ <PatchNotes/> }/>
          <Route path='/Meta/ClassBalance' element={ <ClassBalance/> }/>
          <Route path='/WorkInProgress' element={ <WorkInProgress/> }/>
          
          <Route path='/Debug' element={ <Debug/> }/>
        </Routes>

      </div>
    )
  }

  const MemoedWindowContent = memo(WindowContent) // This doesn't seem to work though

  return (
    <div id="Window">
        <Nav/>

        <AppStateContext.Provider value={[appState, setAppState]}>
          <MemoedWindowContent/>
        </AppStateContext.Provider>
        
        <footer className='footer padding-top-2 padding-bottom-2'>
          <div className='flex-row gap-1'>
            <img src="/LandingPage/LinkLogoReddit.png"/>
            <img src="/LandingPage/LinkLogoDiscord.png"/>
            <img src="/LandingPage/LinkLogoX.png"/>
            <img src="/LandingPage/LinkLogoYouTube.png"/>
          </div>
          <div style={{color: 'gray', fontFamily: 'HomeFont', textAlign: 'center'}}>Dave Doublee | Griffincraft <span style={{color: 'orange'}}>@2024</span></div>
          <div className='pointer highlight' style={{color: 'gray', fontFamily: 'HomeFont', textAlign: 'center'}} onClick={() => {
            localStorage.clear()
            window.location.href = '/'
          }}>Something crashed? Click here!</div>
        </footer>
    </div>

  );
}

export default App;
