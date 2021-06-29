import React, { useState } from 'react'

import Link from "../components/utils/Link";

function Navbar() {

  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const itemLinkClass = 'px-3 py-2 rounded-md text-sm font-medium text-white'

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <img className="h-10 w-10" src="images/basket-chart.png"/>
            </div>
            <div className="flex items-center ml-16 space-x-4">
              <Link href="/" className={`${itemLinkClass} ${currentPath == '/' ? 'bg-gray-900' : ''}`} setCurrentPath={setCurrentPath}>
                Home
              </Link>
              <Link href="/teams" className={`${itemLinkClass} ${currentPath == '/teams' ? 'bg-gray-900' : ''}`} setCurrentPath={setCurrentPath}>
                Equipe
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar