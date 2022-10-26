import React from 'react'
import error_four from '../static/images/error_four.png'
import error_zero_ban from '../static/images/error_zero_ban.png'
import error_three from '../static/images/error_three.png'
import error_rocket from '../static/images/error_rocket.png'
import error_earth from '../static/images/error_earth.png'

export default function Page403() {    

    return (           
        <div className="error">
            <div className="error-text">
                <ul>
                    <li><img src={error_four} height="100%" alt="four" title="four" /></li>
                    <li><img src={error_zero_ban} width="100%" alt="zero" title="zero" /></li>
                    <li><img src={error_three} height="100%" alt="three" title="three" /></li>
                </ul>
                <div>Forbidden</div>
                <p>요청하신 페이지에 접근이 거부되었습니다.<br/>
                    입력하신 주소가 정확한지 다시 한 번 확인해주세요.
                </p>
            </div>
            <ol>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ol>
            <div className="error-object">
                <p><img src={error_rocket} width="100%" alt="rocket" title="rocket" /></p>
                <p><img src={error_earth} width="100%" alt="earth" title="earth" /></p>                
            </div>
        </div>        
    )
}