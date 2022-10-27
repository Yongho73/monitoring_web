import React, { useEffect } from "react";
import tuiChart from 'tui-chart'
import { useState } from "react";

export default function Index() {
  //const chart = toastui.Chart;
  
  useEffect(() => {

    const data = {
      categories: ['1', '2', '3', '4', '5', '6'],
      series: [
        {
          name: 'CO₂ - IN',
          data: [1000, 1200, 1000, 1300, 1000, 1000]
        },
        {
          name: 'CO₂ - OUT',
          data: [400, 400, 400, 500, 600, 400]
        },
      ],
    };  
          
    const theme = {
      legend: {
          label: {
            fontSize: 13,
            color: '#fff'
          }
      },    
      chart: {
        background: 'transparent'
      },
      series: {
        colors: ['#677bfe', '#ff5889'],
      },
      xAxis: {
        title: {
          fontSize: 13,
          color: '#fff'
        },
        label: {
          fontSize: 13,
          color: '#bababa'
        },
          tickColor: '#bababa'
        },
      yAxis: {
        title: {
          fontSize: 13,
          color: '#fff'
        },
        label: {
          fontSize: 13,
          color: '#bababa'
        },
          tickColor: '#bababa'
      }
    };
    
    tuiChart.registerTheme('myTheme', theme);
    
    const option = {
      legend: { align: 'bottom', showCheckbox: false },
      chartExportMenu: { visible: false },      
      series: { shift: true },
      xAxis: { title: '시' },
      yAxis: { title: '단위' },
      theme: 'myTheme'
    };

    const chart = tuiChart.columnChart( document.getElementById('chart-bar'), data, option );

  },[])

  return (
    <>      
      <div className="dashboard">        
        <div id="chart-bar"></div>
      </div>      
    </>
  );
}
