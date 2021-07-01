import React, { useState } from 'react'

import Route from "./components/utils/Route"
import Navbar from "./components/core/Navbar"

import Home from "./components/pages/Home"
import QuickChart from "./components/pages/QuickChart"
import Teams from "./components/pages/Teams"

function App() {

  const [players, setPlayers] = useState([])

  return (
    <div className="App">
      <Navbar players={players} />
      <div className="container mx-auto">
        <Route path="/">
          <Home />
        </Route>
        <Route path="/quickchart">
          <QuickChart />
        </Route>
        <Route path="/teams">
          <Teams />
        </Route>
      </div>
    </div>
  )
}

export default App
