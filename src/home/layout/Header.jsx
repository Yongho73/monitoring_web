import {React, useEffect, useState} from 'react';
import '../static/css/common.css'
import '../static/css/content.css'
import '../static/css/font.css'
import logoImg from '../static/images/logo01.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import {faSunBright} from "@fortawesome/pro-solid-svg-icons";
import {faCloud} from "@fortawesome/pro-regular-svg-icons";

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
				<li><span><FontAwesomeIcon icon={faSunBright} /></span> {/*weather.description*/}</li>
				<li><span><FontAwesomeIcon icon={faCloud} /></span> 대기농도 {0/*weather.carbonIntensity*/}ppm</li>
			</ul>
		</header>
	)
}