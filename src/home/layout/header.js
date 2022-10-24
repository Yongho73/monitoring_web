import React from 'react';
import '../static/css/common.css'
import '../static/css/content.css'
import '../static/css/font.css'
import logoImg from '../static/images/logo01.png'

export default function header() {
    return (
        <header>            
            <div><img src={logoImg} width="100%" alt="bizmarvel logo" title="bizmarvel logo" /></div>
            <ul>
                <li><span><i className="fa-solid fa-sun-bright"></i></span>맑음</li>
                <li><span><i className="fa-regular fa-cloud"></i></span>대기농도 426.7ppm</li>
            </ul>
        </header>
    )
}