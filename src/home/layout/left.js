import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

export default function Left() {    
    return (
        <nav>
            <input id="menu" className="menu" type="checkbox" />
            <label htmlFor="menu" className="menu"><i></i></label>

                <ul>
                    <li>
                        <a href="/dashboard">
                            <span><FontAwesomeIcon icon={solid('monitor-waveform')} /></span> 실시간 모니터링
                        </a>
                    </li>
                    <li>
                        <a href="/place/place">                            
                            <span><FontAwesomeIcon icon={solid('city')} /></span> 사업장 정보
                        </a>
                        <ol>
                            <li><a href="../place/place">문경환경사업소</a></li>
                            <li><a href="../place/place_02">영광 환경관리센터</a></li>
                        </ol>
                    </li>
                    <li>
                        <a href="/reduction/reduction">                            
                            <span><FontAwesomeIcon icon={solid('chart-simple')} /></span> 연간 저감량
                        </a>
                    </li>
                    <li>
                        <a href="/info/info">                            
                            <span><FontAwesomeIcon icon={solid('circle-info')} /></span> 모니터링 소개
                        </a>
                        <ol>
                            <li><a href="/info/info">모니터링 시스템</a></li>
                            <li><a href="/info/step">시스템 절차</a></li>
                        </ol>
                    </li>
                </ul>
        </nav>
    )
}