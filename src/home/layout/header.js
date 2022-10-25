import React from 'react';
import '../static/css/common.css'
import '../static/css/content.css'
import '../static/css/font.css'
import logoImg from '../static/images/logo01.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function header() {
    return (
        <header>            
            <div><img src={logoImg} width="100%" alt="bizmarvel logo" title="bizmarvel logo" /></div>
            <ul>                
                <li><span><FontAwesomeIcon icon={solid('sun-bright')} /></span> 맑음</li>                
                <li><span><FontAwesomeIcon icon={regular('cloud')} /></span> 대기농도 426.7ppm</li>
            </ul>
        </header>
    )
}