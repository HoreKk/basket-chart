import React, { useState, useEffect } from 'react'

function Home() {

  const typesChart = ['pie', 'doughnut', 'polarArea', 'line', 'bar', 'radar']

  const [selectedTypeChart, setSelectedTypeChart] = useState(typesChart[0])

  const [searchPlayer, setSearchPlayer] = useState('')
  const [selectedPlayer, setSelectedPlayer] = useState()

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { 
    const fetchData = async () => {
      setIsLoading(true)

      timeoutId = setTimeout( async () => {
        const response = await fetch(
          `https://www.balldontlie.io/api/v1/players?search=${searchPlayer}`
        )
  
        const players = await response.json()

        if (players.meta.total_count > 10) {
          var player = players.data[Math.floor(Math.random()*players.data.length)]
        } else {
          var player = players.data[0]
        }
  
        setSelectedPlayer(JSON.stringify(player, null, 4))
        setIsLoading(false)
      }, 500)
    }

    let timeoutId = ''

    fetchData()

    return () => clearTimeout(timeoutId)
  }, [searchPlayer])

  const datasetsPie = `datasets:[{
    data:[50,60,70,180,190],
    backgroundColor: ["#FF3784", "#36A2EB", "#4BC0C0", "#F77825", "#9966FF"],
  }]`

  const datasetsLine = `datasets: [{
    label: 'Users',
    data: [5,6,7,8,9],
  }]`

  const datasetsBar = `datasets:[{
    label:'Dogs',
    data:[50,60,70,180,190]
  },{
    label:'Cats',
    data:[100,200,300,400,500]
  }]`

  const urlQuickchart = "https://quickchart.io/chart?c=" + encodeURIComponent(`{
    type:${JSON.stringify(selectedTypeChart)},
    data:{
      labels:['January','February','March','April','May'], 
      ${selectedTypeChart == 'pie' || selectedTypeChart == 'polarArea' || selectedTypeChart == 'doughnut'
        ? datasetsPie : selectedTypeChart == 'bar' || selectedTypeChart == 'radar'
        ? datasetsBar : datasetsLine}
    },
    options: {
      legend: {
        display: true,
        position: 'bottom'
      }
    }
  }`)

  return (
    <div className="home text-center mt-10">
      <h1 className="text-5xl font-bold">Présentation des apis</h1>
      <div className="flex flex-col lg:flex-row h-full my-10 justify-center">
        <div className="flex flex-col w-full lg:w-1/2 bg-gray-800 text-white rounded-lg px-10 py-8 mr-16">
          <h1 className="text-3xl font-semibold">QuickChart</h1>
          <p className="mt-4">LL'API QuickChart permet de générer des images de graphiques de manière simple</p>
          <div className="rounded-lg p-5 mt-5 bg-white">
            <img className="h-96" src={urlQuickchart} />
          </div>
          <div className="flex justify-center w-auto items-center mt-10 text-black">
            <select onClick={e => setSelectedTypeChart(e.target.value)} className="px-3 py-2 rounded-lg focus:outline-none">
              {typesChart && typesChart.map( type =>
                <option key={type} value={type}>{type}</option>
              )}
            </select>
          </div>
        </div>
        <div className="flex flex-col mt-10 lg:mt-0 w-full lg:w-1/2 bg-gray-800 text-white rounded-lg px-10 py-8">
          <h1 className="text-3xl font-semibold">Balldontlie</h1>
          <p className="mt-4">L'API Balldontlie permet d'accéder aux données relatives à la NBA. Par exemple, vous pouvez obtenir une liste de toutes les équipes de la NBA, des informations sur des matchs spécifiques, les statistiques des joueurs, et plus encore.</p>
          <div className="mt-6 flex flex-col items-center text-left">
            {isLoading ? (
              <div className="flex items-center h-[432px]">
                <svg className="animate-spin -ml-1 mr-3 h-24 w-24 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            ) : (
              <>
                {selectedPlayer 
                  ? <pre>{selectedPlayer}</pre>
                  : <div className="flex items-center text-3xl h-[432px]">Aucun joueur trouvé</div>
                }
              </>
            )}
            <input type="text" className="my-2 w-1/3 px-4 py-2 rounded-lg focus:outline-none mt-6 text-black" 
                    value={searchPlayer} onChange={e => setSearchPlayer(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home