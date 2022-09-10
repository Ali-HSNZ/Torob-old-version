import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart  from "chart.js/auto";


// Chart.canvas.parentNode.style.height = '128px';

// defaults.font.family = "iranyekan"
function LineChart({chart}) {

    const data = {
        labels: chart.map(item => item.date),
        datasets: [
            {
                label: 'کمترین قیمت',
                fill: false,
                borderWidth:2,
                backgroundColor: '#34eb40',
                borderColor: '#34eb40',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#34eb40',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 1,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 1,
                pointRadius: 1,
                data: chart.map(item => item.price),
            },
            {
                label: 'میانگین قیمت',
                fill: false,
                lineTension: 0.2,
                backgroundColor: '#5c92ff',
                borderWidth:2,
                borderColor: '#5c92ff',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#2f73fa',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 1,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 1,
                pointRadius: 1,
                data: chart.map(item => item.average_price),
               
            },
        ],
    };

    const options= {
      maintainAspectRatio : false,
      responsive : true,
        plugins: {
            datalabels: {
                align: 'bottom',
                font: {
                    size: 18,
                }
            }
            ,tooltip: {
                titleFont: {
                  size: 13,
                  family : "iranyekan"

                },
                bodyFont: {
                  size: 13,
                  family : "iranyekan"
                },
              },
            legend: {
                position : "bottom",
                labels: {
                    boxWidth : 8,
                    boxHeight : 8,
                    usePointStyle: true,
                    pointStyle: 'Rounded',
                    font: {
                        size: 13,
                        family : "iranyekan"
                    }
                }
            }
        },

        scales: {
            x: {
                display : false,
              grid: {
                color: 'white',
                borderColor: 'white',
                tickColor: 'white'
              },
              time: {
                display : false
              }
            },
            y: {
                display : false,
                grid: {
                  color: 'white',
                  borderColor: 'white',
                  tickColor: 'white'
                }
              }
          }
    }

  return (
    <div className="w-full">
        <Line data={data} options={options} />
    </div>
  );
}

export default LineChart;