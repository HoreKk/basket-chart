import React, { useState } from 'react'

import Route from "./components/utils/Route"
import Navbar from "./components/core/Navbar"

import Home from "./components/pages/Home"
import QuickChart from "./components/pages/QuickChart"
import Players from "./components/pages/Players"
import Compare from "./components/pages/Compare"

function App() {

  const [selectedPlayers, setSelectedPlayers] = useState([])

  const handleChangeSelectedPlayers = (player) => {

    if (selectedPlayers.length < 5) {
      let newArray = [...selectedPlayers]

      if (newArray.map(item => item.id).includes(player.id)) {
        newArray = newArray.filter(item => item.id != player.id) 
      } else {
        newArray.push(player)
      }

      setSelectedPlayers(newArray)
    }

  } 

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
          <Players selectedPlayers={selectedPlayers} setSelectedPlayers={handleChangeSelectedPlayers} />
        </Route>
        <Route path="/compare">
          <Compare selectedPlayers={selectedPlayers} setSelectedPlayers={handleChangeSelectedPlayers} />
        </Route>
      </div>
    </div>
  )
}

export default App
