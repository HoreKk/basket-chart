import React, { useState } from 'react'

import Link from "../utils/Link";

function Navbar({ players }) {

  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const itemLinkClass = 'px-3 py-2 rounded-md text-sm font-medium text-white'

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <Link href="/" setCurrentPath={setCurrentPath}>
                <img className="h-10 w-10" src="images/basket-chart.png"/>
              </Link>
            </div>
            <div className="flex items-center ml-16 space-x-4">
              <Link href="/" className={`${itemLinkClass} ${currentPath == '/' ? 'bg-gray-900' : ''}`} setCurrentPath={setCurrentPath}>
                Home
              </Link>
              <Link href="/quickchart" className={`${itemLinkClass} ${currentPath == '/quickchart' ? 'bg-gray-900' : ''}`} setCurrentPath={setCurrentPath}>
                QuickChart
              </Link>
              <Link href="/players" className={`${itemLinkClass} ${currentPath == '/players' ? 'bg-gray-900' : ''}`} setCurrentPath={setCurrentPath}>
                Joueurs
              </Link>
              <Link href="/compare" className={`${itemLinkClass} ${currentPath == '/compare' ? 'bg-gray-900' : ''}`} setCurrentPath={setCurrentPath}>
                Comparaison
              </Link>
            </div>
          </div>
          <div className="flex py-2 px-4 text-white">
            <h1>Joueurs :</h1>
            {players && players.length 
              ? (players.map( player => 
              <div key={player.id} className="ml-2">
                <span>{player.last_name}</span>
              </div>
              ))
              : (
                <div className="ml-2">
                  Aucun joueur selectionnés
                </div>
              )
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar