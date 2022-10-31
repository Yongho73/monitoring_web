import React , { useEffect , useState } from 'react'
import { getMonitoringList, getMonitoringDetail } from '../../crud/dashborad.crud'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import tuiChart from 'tui-chart'
import Paging from '../common/Paging'

export default function DashboardResult(props) {

	const [deviceCode , setDeviceCode] = useState(props.deviceCode)
	const [visible, setVisible] = useState(true);  

	useEffect(() => {

		const data = {
			categories: ['1', '2', '3', '4', '5', '6'],
			series: [
				{
					name: 'CO₂ - IN',
					data: [1000, 1200, 1000, 1300, 1000, 1000]
				},
				{
					name: 'CO₂ - OUT',
					data: [400, 400, 400, 500, 600, 400]
				},
			],
		},
		data2 = {
			categories: ['1', '2', '3', '4', '5', '6'],
			series: [
				{
					name: 'O₂ - IN',
					data: [10, 12, 15, 13, 10, 16]
				},
				{
					name: 'O₂ - OUT',
					data: [20, 25, 24, 25, 23, 25]
				},
			],
		},
		data3 = {
			categories: ['1', '2', '3', '4', '5', '6','7','8','9','10'],
			series: [
				{
					name: 'CO₂',
					data: [50, 55, 60, 52, 65, 63, 59, 46, 52, 55]
				},
				{
					name: 'O₂',
					data: [0, -5, 5, -10, 10, -15, 15, -20, -25, 25]
				},
			],
		};

		const option = {
			legend: { align: 'bottom', showCheckbox: false },
			chartExportMenu: { visible: false },
			chart: { width: 716, height: 318 },
			series: { shift: true },
			xAxis: { title: '시' },
			yAxis: { title: '단위' },
			theme: 'myTheme',
		},
		option2 = {
			legend: { align: 'bottom', showCheckbox: false },
			chartExportMenu: { visible: false },
			chart: { width: 716, height: 318 },
			series: { shift: true },
			xAxis: { title: '분' },
			yAxis: { title: '단위' },
			theme: 'myTheme',
		};

		const theme = {
			legend: {
				label: {
					fontSize: 13,
					color: '#fff'
				}
			},    
			chart: {
				background: 'transparent'
			},
			series: {
				colors: ['#677bfe', '#ff5889'],
			},
			xAxis: {
				title: {
					fontSize: 13,
					color: '#fff'
				},
				label: {
					fontSize: 13,
					color: '#bababa'
				},
					tickColor: '#bababa'
				},
			yAxis: {
				title: {
					fontSize: 13,
					color: '#fff'
				},
				label: {
					fontSize: 13,
					color: '#bababa'
				},
					tickColor: '#bababa'
			}
		};

		tuiChart.registerTheme('myTheme', theme);
		const chart = tuiChart.columnChart( document.getElementById('chart01'), data, option );
		const chart2 = tuiChart.columnChart( document.getElementById('chart02'), data2, option );
		const chart3 = tuiChart.lineChart( document.getElementById('chart03'), data3, option2 );

	},[]);

	let activePage = 1;    
	
	const [list , setList] = useState([])
	const [pagination , setPagination] = useState({})	
	const [pageIndex, setPageIndex] = useState(1)
	
	const columns = [
		{ id:'deviceIdnfr' , label: 'CO₂' },
		{ id:'oxygen' , label: 'O₂' },
		{ id:'carbon' , label: 'LPM' },
		{ id:'deviceIdnfr' , label: 'CO₂' },
		{ id:'oxygen' , label: 'O₂' },
		{ id:'carbon' , label: 'AFM' },
		{ id:'deviceIdnfr' , label: 'CO₂' },
		{ id:'oxygen' , label: 'O₂' },
		{ id:'carbon' , label: 'Variation' },
		{ id:'methane' , label: 'Temp' },
		{ id:'lat' , label: 'Humi' },
	]

	const handleSearch = async() => {

		const param = { deviceCode : deviceCode, pagePerSize : !visible ? 10 : 5, pageIndex: activePage }    
		console.log(param)     

		await getMonitoringDetail(param).then(response => {
			const status = response.status;
			const data = response.data.responseData.result;
			const paging = response.data.responseData.pagination
			
			if(status === 200){
				setList(data)
				setPagination(paging)
			}
		})
	}      

	const handleChangePage = val => {
		activePage = val ;
		handleSearch();
	}
	useEffect(() => {		
		handleSearch();    
	},[visible])


	return (
		<>
			<dl>
				<dt>
					<span>장치번호:</span>11H110880610
					<span>사업장:</span>문경환경사업소
					<span>명칭:</span>소각로
					<span>배출구분:</span>소각장
					<span>측정장치:</span> 거치식
				</dt>
				<dd>
					<button>엑셀 다운로드</button>
				</dd>
			</dl>

			{visible &&
				<ol>
					<li className="box">
						<h2>CO₂ 유입 및 배출량</h2>
						<div id="chart01" className="chart"></div>
					</li>

					<li className="box">
						<h2>O₂ 유입 및 배출량</h2>
						<div id="chart02" className="chart"></div>
					</li>

					<li className="box">
						<h2>CO₂, O₂ 변화량</h2>
						<div id="chart03" className="chart"></div>
					</li>
				</ol>
			}
			<dl>
				<dt>통계</dt>
				<dd onClick={event => setVisible(!visible) }>
					{visible ?
						<FontAwesomeIcon icon={regular('chevrons-up')} />
						: <FontAwesomeIcon icon={regular('chevrons-down')} />
					}
				</dd>
			</dl>

			<div className="box">
				<table className='list'>
					<thead>
						<tr>
							<th colSpan={3}>IN</th>
							<th colSpan={3}>OUT</th>
							<th colSpan={2}>Variation</th>
							<th rowSpan={2}>Temp</th>
							<th rowSpan={2}>Humi</th>
							<th rowSpan={2}>Date</th>
						</tr>
						<tr>
							<th>CO₂</th>
							<th>O₂</th>
							<th>LPM</th>
							<th>CO₂</th>
							<th>O₂</th>
							<th>AFM</th>
							<th>CO₂</th>
							<th>O₂</th>
						</tr>
					</thead>
					<tbody>
						{list.map((row, index) => {              
							return (
								<tr role="checkbox" tabIndex={-1} key={index}>
									<td>{row.in_Oxygen}</td>
									<td>{row.in_Carbon}</td>
									<td>{row.in_Methane}</td>
									<td>{row.in_AirCurrent}</td>
									<td>{row.out_Oxygen}</td>
									<td>{row.out_Carbon}</td>
									<td>{row.out_Methane}</td>
									<td>{row.out_AirCurrent}</td>				
									<td>{row.st_Temp}</td>		
									<td>{row.st_Humi}</td>		
									<td>{row.observedDate}</td>								
								</tr>
							);
						})}
					</tbody>
				</table>

				{!visible && 
					<Paging
						totalCount={pagination.totalCount  }
						rowsPerPage={pagination.pagePerSize}
						page={pagination.pageIndex}
						onPageChange={handleChangePage}
					/>
				}
			</div>
		</>
	)
}