import React, { useEffect, useState } from 'react';
import { getMonitoringList } from '../../crud/monitoring.crud'
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import geoJson from '../../home/util/json/geoJson.json'
import test from '../../home/util/json/TL_SCCO_SIG.json'
import _ from 'lodash'

export default function DashboardMap(props) {    
  
  // 서울 기준점 좌표  
  const [list , setList] = useState([])
  const [areaName , setAreaName] = useState('KOR');
  const [areaList , setAreaList] = useState({})
  let filterList = [];

  const handleSearch = async() => {
    await getMonitoringList().then(response => {
      const status = response.status;
      const data = response.data.result;
      
      if(status === 200){
        setList(data)
      }
    })
  }    

  echarts.registerMap('KOR', props.geoJson, {});

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
	console.log(params)
	setAreaName(params.name)
	
	for(let i = 0 ; i < test.features.length; i ++ ){
			const code = test.features[i].properties.CTPRVN_CD.substring(0,2);			
			if(code === '42'){
				filterList.push(test.features[i] )
			}		
	}

	setAreaList({...areaList , type: test.type, bbox: test.bbox , features:  filterList})
	
  }

  const onEvents = {
    'click': handleClick
  }
  
  useEffect(() => {
    handleSearch();    
	
  },[])
  
  useEffect(() => {	
	if(areaList.type) {
		props.handleCallback(areaName, areaList)
	}
  },[areaList])

  return (

		<map>{areaName && <ReactEcharts option={mapOption} onEvents={onEvents}/> }</map>
    
  );
}