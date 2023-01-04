import {React, useEffect, useState} from 'react';
import '../static/css/common.css'
import '../static/css/content.css'
import '../static/css/font.css'
import logoImg from '../static/images/logo01.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Link } from 'react-router-dom'
import { getWeather } from '../../crud/code.crud';

export default function Header() {
	const [weather, setWeather] = useState('');
	
	// const handleWeather = async() => {
	// 	const param = { city: 'Seoul' }    		

	// 	await getWeather(param).then(response => {
	// 		const status = response.status;
	// 		const data = response.data.responseData;
			
	// 		if(status === 200){
	// 			setWeather(data);
	// 		}
	// 	})
	// }
	
	// useEffect(() => {
	// 	handleWeather();
	// },[])

	return (
		<header>            
			<Link to="/index"><img src={logoImg} width="100%" alt="bizmarvel logo" title="bizmarvel logo" /></Link>
			<ul>                
				<li><span><FontAwesomeIcon icon={solid('sun-bright')} /></span> {/*weather.description*/}</li>
				<li><span><FontAwesomeIcon icon={regular('cloud')} /></span> 대기농도 {0/*weather.carbonIntensity*/}ppm</li>
			</ul>
		</header>
	)
}