import React, {useEffect , useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import DashboardMap from './DashboardMap'
import DashboardList from './DashboardList'
import ObservedList from './ObservedList'

export default function Index() {
	const [tabs , setTabs] = useState(1);

	const tabMenuChange = (id) => {
		setTabs(id);
	};

	return (
		<>
			<h2><span><FontAwesomeIcon icon={solid('monitor-waveform')} /></span> 실시간 모니터링</h2>

			<div className="dashboard">
				<input type="radio" id="tab01" name="tabGroup1" className="tab" onChange={() => tabMenuChange(1)} checked={tabs == 1} />
				<label htmlFor="tab01">전체 장치 현황</label>

				<input type="radio" id="tab02" name="tabGroup1" className="tab" onChange={() => tabMenuChange(2)} checked={tabs == 2} />
				<label htmlFor="tab02">측정 결과</label>

				{
					tabs == 1 ?
					(
						<div>
							<DashboardMap />
							<DashboardList />
						</div>
					) :
					(
						<div>
							<ObservedList />
						</div>
					)
				}
			</div>		
		</>
	)
}