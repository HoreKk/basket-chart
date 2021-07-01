import React, { useEffect, useState } from "react"

function Compare({ selectedPlayers, setSelectedPlayers }) {

  const [isLoading, setIsLoading] = useState(false);
  const [datasets, setDatasets] = useState([])
  const [selectedSeason, setSelectedSeason] = useState(2020)

  const urlQuickchart = "https://quickchart.io/chart?c=" + encodeURIComponent(`{
    type: 'radar',
    data:{
      labels: ['Points', 'Assists', 'Rebound', 'Moyenne de min', '% Panier', '% 3 points'], 
      datasets: ${JSON.stringify(datasets)}
    },
    options: {
      legend: {
        display: true,
        position: 'bottom'
      },
      scale: {
        ticks: {
          beginAtZero: true
        },
      },
    }
  }`)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      timeoutId = setTimeout( async () => {

        let playersIdsQuery = ''

        selectedPlayers.forEach( (player, index) => {
          playersIdsQuery += `&player_ids[]=${player.id}${index != selectedPlayers.length - 1 ? '&' : ''}`
        })

        const response = await fetch(
          `https://www.balldontlie.io/api/v1/season_averages?season=${selectedSeason}${playersIdsQuery}`
        )
        let result = (await response.json())

        let tmpArray = []

        if (result.data.length) {

          selectedPlayers.forEach(item => {
            let stat_player = result.data.find(stat => stat.player_id == item.id)
            if (stat_player) {
              const { pts, ast, reb, min, fg_pct, fg3_pct } = stat_player
              let newPlayer = {
                label: `${item.first_name} ${item.last_name}`,
                data: [pts, ast, reb, parseInt(min), fg_pct * 100, fg3_pct * 100],
                radius: 100,
                pointRadius: 3,
                pointBorderWidth: 2,
              }
              tmpArray.push(newPlayer)
            }
          })

          
        }

        setDatasets(tmpArray)

        setIsLoading(false)
      }, 500)
    }
    
    let timeoutId = ''

    fetchData()

    return () => clearTimeout(timeoutId)
  }, [selectedPlayers, selectedSeason])

  return (
    <div className="home text-center mt-10">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-xl">Année de la saison</h1>
        <input type="number" min="1979" max="2020" className="my-2 w-1/3 px-4 py-2 rounded-lg focus:outline-none border border-gray-800 text-black" 
                    value={selectedSeason} onChange={e => setSelectedSeason(e.target.value)} />
      </div>
      <div className="flex flex-col w-full justify-center">
        {isLoading ? (
          <div className="flex justify-center items-center h-[504px]">
            <svg className="animate-spin -ml-1 mr-3 h-24 w-24 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          ) : (
            <div className="flex justify-center items-center">
              <div className="flex justify-center my-5 p-10 rounded-lg  bg-gray-100">
                <img className="h-96" src={urlQuickchart} />
              </div>
            </div>
          )
        }
        <div className="flex justify-center w-full mt-3">
          {selectedPlayers.length ? ( selectedPlayers.map(player => 
            <div key={player.id} className="flex flex-col items-center p-4 text-white w-2/12 bg-gray-800 rounded-xl mr-10">
              <img className="w-16 h-16 mb-2" src={`http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${player.team.abbreviation.toLowerCase()}.png`} />
              <span className="text-xs text-gray-400">Equipe : {player.team.city}</span>
              <span className="text-xs text-gray-400">Position : {player.position}</span>
              <h1 className="text-xl">{player.first_name + " " + player.last_name}</h1>
              <div className="flex mt-4">
                <button onClick={() => setSelectedPlayers(player)} className="px-3 py-2 bg-red-800 rounded-lg">Supprimer</button>
              </div>
            </div>
          )) : (
            <div className="flex items-center justify-center w-full text-3xl font-semibold">Aucun joueur selectionnés</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Compare