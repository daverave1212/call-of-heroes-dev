import React from 'react'
import { Root, Routes, addPrefetchExcludes } from 'react-static'
//
import { Link, Router } from 'components/Router'
import Dynamic from 'containers/Dynamic'

import './app.css'
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
          <Link to="/">Home</Link>
          <Link to="/about">Items</Link>
          <Link to="/blog">Races</Link>
          <Link to="/dynamic">Classes</Link>
        </nav>

        <div className="subnav">
          <Link to="/">Druid</Link>
          <Link to="/about">Clacker</Link>
          <Link to="/Classes/Cleric">Cleric</Link>
          <Link to="/dynamic">Warrior</Link>
        </div>

        <div id="Page">

            <div className="content">
              <React.Suspense fallback={<em>Loading...</em>}>
                <Router>
                  <Dynamic path="dynamic" />
                  <Routes path="*" />
                </Router>
              </React.Suspense>
            </div>

        </div>

      </div>
    </Root>
  )
}

export default App
