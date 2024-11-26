import React from 'react'
import {
    Chart as ChartJS , BarElement , CategoryScale , LinearScale , Tooltip , Legend , Title , LineElement , ArcElement , PointElement, Filler
  } from 'chart.js';

import {Line} from 'react-chartjs-2';

ChartJS.register( BarElement,CategoryScale,LinearScale,Tooltip,Legend,Title,LineElement,ArcElement,PointElement,Filler)


const LineChart = () => {


//*************************************************************************************************************************************/
                                                        //Line Chart 1
//*************************************************************************************************************************************/

    const data = {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
            {
                label: 'My First Dataset',
                data: [200, 260, 180, 320, 240, 350, 170, 240, 200, 300, 170, 240, 0, 400],
                fill: true,
                backgroundColor: '#a8e3e371',
                borderColor: '#4bc0c0',
                tension: 0.5
            }
            
        ]
        
    };

    const options={
        layout: {
            padding: 10
        },
        plugins: {
            legend: {
                display: false,
                labels: {
                    font: {
                        size: 10,
                    }
                }
            },
            grid:{
                display: false
            }
        },
        scales: {
            x: {
                gridLines: {
                    backgroundColor: "#8b2424"
                },
                grid: {
                tickColor: 'grey',
                // display: false,
                },
                ticks: {
                color: 'grey',
                },
                title: {
                color: 'Purple',
                display: true,
                text: 'Month'
                }
            },
            y: {
                grid: {
                tickColor: 'grey',
                display: false,
                },
                ticks: {
                color: 'grey',
                
                }
            },
            
        }
        
    }
    
    
  return (
    <>
        <div className="chart-container" style={{height: '19.4em'}}>
            <Line data={data} options={options}></Line>
        </div>
    </>
  )
}

export default LineChart


