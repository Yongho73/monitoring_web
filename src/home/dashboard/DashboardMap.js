import React, { useEffect, useState } from 'react';
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
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
		nameProperty: 'adm_nm', // registerMap 할 때 지정한 기준 키값
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
		if(props.geoJson.features[i].properties.adm_nm === params.name){
			highCode = props.geoJson.features[i].properties.adm_cd;
		}
	}
	if(props.geoLevel !== 3){
		props.handleCallback(params.name, highCode , props.geoLevel + 1)		
	}
  }

  const handleBackArea = () => {	
	let preCode = props.geoHighCode;
	
	if(preCode.length > 2 ){
		preCode = preCode.substring(0,2)
	}
	props.handlePreCallback( preCode, props.geoLevel === 1 ? 1 : props.geoLevel - 1 )	
  }

  const onEvents = {
    'click': handleClick
  }
   

  return (

		<map>
			<button onClick={event => handleBackArea()}><FontAwesomeIcon icon={regular('arrow-rotate-left')} /></button>
			{areaName && <ReactEcharts option={mapOption} onEvents={onEvents}/> }
		</map>
    
  );
}