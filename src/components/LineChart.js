import React,{useState,useRef} from 'react'
import { Bar, Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
// import { options } from 'pg/lib/defaults'

export default function LineChart({chartData}) {
  const [options,setOptions]=useState({
    
    maintainAspectRatio:false,
    layout:{
      padding:{
        right:10
      }
    },
    scales: {
          x:{
            min:0,
         max:6
          },
          y:{
            beginAtZero:true
          }
      }, plugins: {tooltip: {
        enabled: false // Disable tooltips
      }
    }
   
})

    const myChart=useRef()
   

  return (
   <Line 
   data={chartData}
    // options={options}
    // plugins={[moveChart]}
    ref={myChart}
    // onClick={()=>moveScroll()}
    />
  )
}
