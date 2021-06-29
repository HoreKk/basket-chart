import React, { useState } from 'react'

import Route from "./components/utils/Route"
import Navbar from "./components/Navbar"

import Home from "./components/Home"

function App() {

  return (
    <div className="App">
      <Navbar />
      <div className="container mx-auto">
        <Route path="/">
          <Home />
        </Route>
      </div>
    </div>
  )
}

export default App
