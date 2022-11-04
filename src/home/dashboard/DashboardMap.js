import React, { useEffect, useState } from 'react';
import { getMonitoringList } from '../../crud/monitoring.crud'
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import geoMapLevel1 from '../../home/util/json/geoMapLevel1.json'
// import geoMapLevel2 from '../../home/util/json/geoMapLevel2.json' //추후 지역 상세 표기 시 사용
// import geoMapLevel3 from '../../home/util/json/geoMapLevel3.json' //추후 지역 상세 표기 시 사용
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import _ from 'lodash'

export default function DashboardMap(props) {    
  
  // 서울 기준점 좌표  
  const [list , setList] = useState([])
  const [areaName , setAreaName] = useState('KOR');
  const [areaList , setAreaList] = useState({})
  
  let filterList = [];
  let data = [];

  const handleSearch = async() => {
    await getMonitoringList().then(response => {
      const status = response.status;
      const data = response.data.result;
      
      if(status === 200){
        setList(data)
      }
    })
  }      

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
		nameProperty: 'name', // registerMap 할 때 지정한 기준 키값 
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
		}
      }
    ]
  };

  echarts.registerMap('KOR', props.geoJson, {});  
  

  const handleClick = params =>{	

	//추후 지역 상세 표기 시 사용
	 let highCode = '';
		
	 for(let i = 0 ; i < props.geoJson.features.length; i ++ ){					
		if(props.geoJson.features[i].properties.name === params.name){
			highCode = props.geoJson.features[i].properties.value ;				
		}
	}
	props.handleCallback(params.name, highCode , props.geoLevel)
	
	

	
	
  }

  const onEvents = {
    'click': handleClick
  }
  
  useEffect(() => {
    handleSearch();    
	
  },[])
  
  useEffect(() => {	
	if(areaList.type) {
		const level = props.geoLevel + 1
		console.log(level)
		props.handleCallback(areaName, areaList , level)
	}
  },[areaList])

  return (

		<map>
			<button><FontAwesomeIcon icon={regular('arrow-rotate-left')} /></button>
			{areaName && <ReactEcharts option={mapOption} onEvents={onEvents}/> }
		</map>
    
  );
}