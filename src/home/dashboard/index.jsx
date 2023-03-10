import React , {useEffect , useState} from 'react'
import { getMonitoringList } from '../../crud/monitoring.crud'
import CommonTablePaging from '../common/CommonTablePaging'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DashboardList from './DashboardList'
import DashboardResult from './DashboardResult'
import {faMonitorWaveform} from "@fortawesome/pro-solid-svg-icons";

export default function Index() {
	const [showTabIndex , setShowTabIndex] = useState('1')
	const [deviceIdnfr , setDeviceIdnfr] = useState('')

	const handleTabShow = (tabIndex , val) => {
		setShowTabIndex(tabIndex)		
		setDeviceIdnfr(val)
	}

	const handleTabIndex = tabIndex =>{
		setShowTabIndex(tabIndex)	
	}

	return (
		<>
			<h2><span><FontAwesomeIcon icon={faMonitorWaveform} /></span> 실시간 모니터링</h2>

			<div className="dashboard">
				<input type="radio" id="tab01" name="tabGroup1" className="tab" checked={ showTabIndex === '1' ? 'checked' : ''} onChange={event => handleTabIndex('1')} />
				<label htmlFor="tab01">전체 장치 현황</label>

				<input type="radio" id="tab02" name="tabGroup1" className="tab" checked={ showTabIndex === '2' ? 'checked' : ''} onChange={event => handleTabIndex('1')} />
				<label htmlFor="tab02">측정 결과</label>
				{showTabIndex === '1' ?
					<section className='dashboard-list'>
						<DashboardList handleTabShow={handleTabShow} />
					</section>				
					:
					<section className='dashboard-result'>
						<DashboardResult deviceIdnfr={deviceIdnfr}/>
					</section>
				}
			</div>		
		</>
	)
}