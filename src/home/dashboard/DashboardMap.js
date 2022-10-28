import React, { useEffect, useState } from 'react';
import { getMonitoringList } from '../../crud/monitoring.crud'
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import geoJson from '../../home/util/json/geoJson.json'

export default function DashboardMap(props) {    
  
  // 서울 기준점 좌표  
  const lat =37.5666805;
  const lng = 126.9784147;
  const [list , setList] = useState([])

  const handleSearch = async() => {
    await getMonitoringList().then(response => {
      const status = response.status;
      const data = response.data.result;
      
      if(status === 200){
        setList(data)
      }
    })
  }
  
  echarts.registerMap('KOR', geoJson, {});
  

  const mapOption = {
    title : {
      text: '전체 장치 현황',
			subtext: 'Overall Device Status',
			textStyle: { color: '#fff'},
			subtextStyle: {color: '#94baff'}
    },	
    series: [
      {
		name: '전국지도',
        type: 'map',
        map: 'KOR',
		zoom: 1.2,
		label: {
			show: true,
			fontSize: 12,
			color: '#c7ebff',
			backgroundColor : '#05023c'
		},
		itemStyle: {
			areaColor: '#05023c',
			borderWidth: 1,
			borderColor: '#677bfe',
		},
		emphasis: {
			label: {
				fontWeight : '600',
				fontSize: 16,
				color: '#05023c',
				backgroundColor : '#677bfe'
			},
			itemStyle: {
				areaColor: '#677bfe',
			}
		},
		select: {
			label: {
				fontWeight : 600,
				fontSize: 16,
				color: '#05023c',
				backgroundColor : '#677bfe'
			},
			itemStyle: {areaColor: '#677bfe'}
		},
      }
    ]
  };

  

  const handleClick = params =>{	
	props.handleCallback(params.name)
  }

  const onEvents = {
    'click': handleClick
  }
  
  useEffect(() => {
    handleSearch();    
  },[])

  return (

		<map><ReactEcharts option={mapOption} onEvents={onEvents}/></map>
    
  );
}