import React, { useEffect, useState } from 'react'

function Players({ selectedPlayers, setSelectedPlayers }) {

  const [players, setPlayers] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [searchPlayer, setSearchPlayer] = useState('')

  let [page, setPage] = useState(1)
  let [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      timeoutId = setTimeout( async () => {
        const response = await fetch(`https://www.balldontlie.io/api/v1/players?per_page=15&page=${page}&search=${searchPlayer}`)
        
        let result = (await response.json())

        setTotalPages(result.meta.total_pages != 0 ? result.meta.total_pages : 1)

        setPlayers(result.data)
        setIsLoading(false)
      }, 500)
    }
    
    let timeoutId = ''

    fetchData()

    return () => clearTimeout(timeoutId)
  }, [page, searchPlayer])

  return (
    <div className="home text-center mt-10">
      <h1 className="text-5xl font-bold">Joueurs</h1>
      <div className="flex flex-wrap bg-gray-900 mt-10 p-5 rounded-lg">
        <div className="flex flex-col items-center justify-center w-full mb-5">
          <h1 className="text-2xl text-white">Rechercher un joueur</h1>
          <input type="text" className="w-1/3 px-4 py-2 rounded-lg focus:outline-none text-black mt-3" 
                    value={searchPlayer} onChange={e => setSearchPlayer(e.target.value)} placeholder="Prénom et nom du joueur..." />
        </div>
        {isLoading ? (
          <div className="flex justify-center w-full items-center h-[492px]">
            <svg className="animate-spin -ml-1 mr-3 h-24 w-24 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <>
            {players.length ? ( players.map(player => 
              <div key={player.id} className={`flex flex-col items-center p-4 text-white w-1/5 hover:bg-gray-800 cursor-pointer 
                   ${selectedPlayers.map(item => item.id).includes(player.id) ? 'bg-gray-800' : ''}`} onClick={() => setSelectedPlayers(player)}>
                <img className="w-16 h-16 mb-2" src={`http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/${player.team.abbreviation.toLowerCase()}.png`} />
                <span className="text-xs text-gray-400">Equipe : {player.team.city}</span>
                <span className="text-xs text-gray-400">Position : {player.position}</span>
                <h1 className="text-xl">{player.first_name + " " + player.last_name}</h1>
              </div>
            )) : (
              <div className="flex items-center justify-center w-full text-3xl text-white h-[492px]">Aucun joueur trouvé</div>
            )}
          </>
        )}
        <div className="flex items-center justify-center w-full mt-10">
          {page > 1 &&
            <button onClick={() => setPage(--page)} className="focus:outline-none">
              <img className="w-4 h-4" src="images/chevron-left.svg" />
            </button>
          }
          <span className="text-xl text-white mx-2">{page}</span>
          {page !== totalPages &&
            <button onClick={() => setPage(++page)} className="focus:outline-none">
              <img className="w-4 h-4" src="images/chevron-right.svg" />
            </button>
          }
        </div>
      </div>
    </div>
  )
}

export default Players