import React from 'react'
import { Root, Routes, addPrefetchExcludes } from 'react-static'
//
import { Link, Router } from 'components/Router'
import Dynamic from 'containers/Dynamic'

import './app.css'
import './nav.css'
import './page-style.css'

import PageH1 from './components/PageH1/PageH1'
import PageH2 from './components/PageH2/PageH2'

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

function App() {
  return (
    <Root>

      <div id="Window">

        <nav>
          <div className='nav-item'><Link to="/">Home</Link></div>
          <div className='nav-item'><Link to="/Other/Weapons">Weapons</Link></div>
          <div className='nav-item'><Link to="/Other/Armors">Armors</Link></div>
          <div className='nav-item'>
            <Link to="#">Races</Link>
            <div className='nav-item__dropdown'>
              <div className='nav-item__dropdown-item'><Link to="/Classes/Bertle">Bertle</Link></div>
              <div className='nav-item__dropdown-item'><Link to="/Classes/Dragonborn">Dragonborn</Link></div>
              <div className='nav-item__dropdown-item'><Link to="/Classes/Dwarf">Dwarf</Link></div>
              <div className='nav-item__dropdown-item'><Link to="/Classes/Elf">Elf</Link></div>
              <div className='nav-item__dropdown-item'><Link to="/Classes/Gnome">Gnome</Link></div>
              <div className='nav-item__dropdown-item'><Link to="/Classes/Hollow">Hollow</Link></div>
              <div className='nav-item__dropdown-item'><Link to="/Classes/Human">Human</Link></div>
              <div className='nav-item__dropdown-item'><Link to="/Classes/Orc">Orc</Link></div>
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

        <div className="content">
          <React.Suspense fallback={<em>Loading...</em>}>
            <Router>
              <Dynamic path="dynamic"/>
              <Routes path="*"/>
            </Router>
          </React.Suspense>
        </div>

        <footer className='footer'></footer>
      </div>
    </Root>
  )
}

export default App
