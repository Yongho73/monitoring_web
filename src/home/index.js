import React, { useEffect, useState } from 'react';
import NaverMapApi from './common/NaverMapAPI'
import { getMonitoringList , getMonitoringExcelList } from '../crud/monitoring.crud'
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import geoJson from '../home/util/json/testData.json'

import { excelDownLoad } from './util/excelDown'

import { Route } from 'react-router-dom';
import CommonTablePaging from './common/CommonTablePaging'

export default function Index() {    
  
  // 서울 기준점 좌표  
  const lat =37.5666805;
  const lng = 126.9784147;
  const zoom = 8;  
  const [list , setList] = useState([])

  const handleSearch = async() => {
    await getMonitoringList().then(response => {
      const status = response.status;
      const data = response.data.responseData.result;
      
      if(status === 200){        
        setList(data)
      }
    })
  }           
  
  const num = [];
  
  const data = [
    { name: '서울특별시', value: Math.floor(Math.random() * (38000000 - 500000+ 1)) + 500000 },
    { name: '경기도', value: Math.floor(Math.random() * (38000000 - 500000+ 1)) + 500000 },
    { name: '강원도', value: Math.floor(Math.random() * (38000000 - 500000+ 1)) + 500000 },
    { name: '인천광역시', value: Math.floor(Math.random() * (38000000 - 500000+ 1)) + 500000 },
    { name: '세종특별자치시', value: Math.floor(Math.random() * (38000000 - 500000+ 1)) + 500000 },
    { name: '대전광역시', value: Math.floor(Math.random() * (38000000 - 500000+ 1)) + 500000 },
    { name: '대구광역시', value: Math.floor(Math.random() * (38000000 - 500000+ 1)) + 500000 },
    { name: '울산광역시', value: Math.floor(Math.random() * (38000000 - 500000+ 1)) + 500000 },
    { name: '부산광역시', value: Math.floor(Math.random() * (38000000 - 500000+ 1)) + 500000 },
    { name: '광주광역시', value: Math.floor(Math.random() * (38000000 - 500000+ 1)) + 500000 },
    { name: '경상남도', value: Math.floor(Math.random() * (38000000 - 500000+ 1)) + 500000 },
    { name: '경상북도', value: Math.floor(Math.random() * (38000000 - 500000+ 1)) + 500000 },
    { name: '충청남도', value: Math.floor(Math.random() * (38000000 - 500000+ 1)) + 500000 },
    { name: '충청북도', value: Math.floor(Math.random() * (38000000 - 500000+ 1)) + 500000 },    
    { name: '전라북도', value: Math.floor(Math.random() * (38000000 - 500000+ 1)) + 500000 },
    { name: '전라남도', value: Math.floor(Math.random() * (38000000 - 500000+ 1)) + 500000 },
    { name: '제주특별자치도', value: Math.floor(Math.random() * (38000000 - 500000+ 1)) + 500000},        
  ];
  
  echarts.registerMap('KOR', geoJson, {
    
  });

  const mapOption = {
    backgroundColor: '#404a59',
    visualMap: {
      show: false,
      left: 'right',
      min: 500000,
      max: 38000000,    
      inRange: {      
        color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
      },
      text: ['High', 'Low'],
      calculable: true
    },
    title : {
      text: 'Korea Map',
      subtext: 'Korea Map',
      left: 'center',
      top: 'top',
      textStyle: {
          color: 'blakc'
      }
    },
    tooltip : {
      trigger: 'item',
      formatter: function (params) {return params.name + ' : ' + params.value }       
    },
    series: [
      {
        id: 'population',
        type: 'map',
        roam: true,
        map: 'KOR',
        animationDurationUpdate: 1000,
        universalTransition: true,
        data: data,
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: function (params) {return params.name + ' : ' + params.value } ,
              textStyle: {
                color: 'black'
              }
            }
          }
        }
      }
    ]
  };
  

  const columns = [
    { id:'deviceIdnfr' , align: 'center', label: 'deviceIdnfr' },
    { id:'oxygen' , align: 'center', label: 'oxygen' },
    { id:'carbon' , align: 'center', label: 'carbon' },
    { id:'methane' , align: 'center', label: 'methane' },
    { id:'airCurrent' , align: 'center', label: 'u' },
    { id:'lat' , align: 'center', label: 'lat' },
    { id:'lng' , align: 'center', label: 'lng' }
  ]

  const handleExceDown = async() => {

    await getMonitoringExcelList().then(response => {
      const status = response.status;
      const data = response.data.responseData.result;
      
      if(status === 200){        
        excelDownLoad(columns , data , 'test');
      }
    })

    
  }
  useEffect(() => {
    handleSearch();    
  },[])

  return (

		<div class="dashboard">
			<input type="radio" id="tab01" name="tabGroup1" class="tab" checked />
			<label for="tab01">전체 장치 현황</label>

			<input type="radio" id="tab02" name="tabGroup1" class="tab" />
			<label for="tab02">측정 결과</label>

			<content>
        <button onClick={event => handleExceDown()}>Excel Down</button>
				<ReactEcharts option={mapOption} style={{ width: "80vw", height: "80vh" }} />

				<div>
					<Route exact path="/common" component={CommonTablePaging}></Route>
				</div>
			</content>
		</div>
    
   
    
  );
}