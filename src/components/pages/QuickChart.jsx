import React, { useState } from 'react'

function QuickChart() {

  let [labelsPolarChart, setLabelsPolarChart] = useState(['January','February','March','April','May'])
  let [dataPolarChart, setDataPolarChart] = useState([50,60,70,180,190])
  let [colorsPolarChart, setColorsPolarChart] = useState(["#FF3784", "#36A2EB", "#4BC0C0", "#F77825", "#9966FF"])
  
  const handleChange = (e, index, type) => {
  
    let newArray = type == 'labels' 
      ? [...labelsPolarChart] : type == 'data' 
      ? [...dataPolarChart] : [...colorsPolarChart]
    newArray[index] = e.target.value 
  
    let setterArray = type == 'labels' 
      ? setLabelsPolarChart : type == 'data' 
      ? setDataPolarChart : setColorsPolarChart
    setterArray(newArray)
  
  }
  
  const urlQuickchart = "https://quickchart.io/chart?c=" + encodeURIComponent(`{
    type:'doughnut',
    data:{
      labels:${JSON.stringify(labelsPolarChart)}, 
      datasets:[{
        data:${JSON.stringify(dataPolarChart)},
        backgroundColor: ${JSON.stringify(colorsPolarChart)},
      }]
    }
  }`)
  
  
  return (
    <div className="home text-center mt-10">
      <h1 className="text-5xl font-bold">Demo QuickChart</h1>
      <div className="flex h-full my-10 justify-center">
        <div className="flex bg-gray-800 text-white rounded-lg px-10 py-8">
          <div className="bg-white rounded-lg p-5 mt-5 mr-16">
            <img className="h-96" src={urlQuickchart} />
          </div>
          <div className="flex justify-center w-auto items-center mt-10 text-black">
            <div className="flex flex-col mr-5 w-1/2">
              <h1 className="text-xl text-white">Labels</h1>
              {labelsPolarChart && labelsPolarChart.map( (label, index) => 
                  <input type="text" key={index} className="my-2 px-4 py-2 rounded-lg focus:outline-none" 
                         value={label} onChange={e => handleChange(e, index, 'labels')} />
              )}
            </div>
            <div className="flex flex-col mr-5 w-1/2">
              <h1 className="text-xl text-white">Données</h1>
              {dataPolarChart && dataPolarChart.map( (data, index) => 
                  <input type="number" key={index} className="my-2 px-4 py-2 rounded-lg focus:outline-none" 
                         value={data} onChange={e => handleChange(e, index, 'data')} />
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <h1 className="text-xl text-white">Couleurs</h1>
              {colorsPolarChart && colorsPolarChart.map( (color, index) => 
                  <input type="color" key={index} className="my-2 w-20 h-10 px-4 py-2 rounded-lg focus:outline-none" 
                         value={color} onChange={e => handleChange(e, index, 'color')} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default QuickChart 