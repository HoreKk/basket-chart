import React, { useState } from 'react'

import Route from "./components/utils/Route"
import Navbar from "./components/core/Navbar"

import Home from "./components/pages/Home"
import QuickChart from "./components/pages/QuickChart"
import Players from "./components/pages/Players"

function App() {

  const [selectedPlayers, setSelectedPlayers] = useState([])

  return (
    <div className="App">
      <Navbar players={selectedPlayers} />
      <div className="container mx-auto">
        <Route path="/">
          <Home />
        </Route>
        <Route path="/quickchart">
          <QuickChart />
        </Route>
        <Route path="/players">
          <Players selectedPlayers={selectedPlayers} setSelectedPlayers={setSelectedPlayers} />
        </Route>
      </div>
    </div>
  )
}

export default App
