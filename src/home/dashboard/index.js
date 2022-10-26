import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import DashboardMap from './DashboardMap'
import DashboardList from './DashboardList'

export default function Index() {

	return (
		<>
			<h2><span><FontAwesomeIcon icon={solid('monitor-waveform')} /></span> 실시간 모니터링</h2>

			<div className="dashboard">
				<input type="radio" id="tab01" name="tabGroup1" className="tab" checked />
				<label htmlFor="tab01">전체 장치 현황</label>

				<input type="radio" id="tab02" name="tabGroup1" className="tab" />
				<label htmlFor="tab02">측정 결과</label>

				<div>
					<DashboardMap />
					<DashboardList />
				</div>
				
				<div></div>
			</div>		
		</>
	)
}