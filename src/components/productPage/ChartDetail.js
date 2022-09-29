import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Chart  from "chart.js/auto";

Chart.defaults.font.family = "iranyekan"

function ChartDetail({chart , page}) {

    const data = {
        labels: chart.map(item => item.date),
        datasets: [
            {
                label: 'کمترین قیمت',
                fill: false,
                borderWidth:2,
                lineTension: 0.3,
                backgroundColor: '#00c20d',
                borderColor: '#00c20d',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#019101',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#008a13',
                pointHoverBorderColor: '#b3fcbd',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                data: chart.map(item => item.price),
            },
            {
                label: 'میانگین قیمت',
                fill: false,
                lineTension: 0.3,
                backgroundColor: '#5c92ff',
                borderWidth:2,
                borderColor: '#5c92ff',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: '#0707ed',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: '#0707ed',
                pointHoverBorderColor: '#ccccff',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                data: chart.map(item => item.average_price),
               
            },
        ],
    };

    const options= {
      maintainAspectRatio: page === "product" ? true : false,
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
              grid: {
                color: 'white',
                borderColor: 'white',
                tickColor: 'white',
                font: {
                    size: 13,
                    family : "iranyekan"
                },
              },
              time: {
                display : false
              }
            },
            y: {
                // display : false,
                grid: {
                  color: 'white',
                  borderColor: 'white',
                  tickColor: 'white'
                }
              }
          }
    }

  return <Line data={data} options={options} />;
}

export default ChartDetail;