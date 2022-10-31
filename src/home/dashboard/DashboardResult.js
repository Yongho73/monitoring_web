import React , { useEffect , useState } from 'react'
import { getMonitoringList, getMonitoringDetail } from '../../crud/dashborad.crud'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import tuiChart from 'tui-chart'
import Paging from '../common/Paging'
import { toNumber } from '../util/util'

export default function DashboardResult(props) {
	
	const [deviceCode , setDeviceCode] = useState(props.deviceCode)
	const [visible, setVisible] = useState(true);  

	const [data1, setData1] = useState({});
	const [data2, setData2] = useState({});
	const [data3, setData3] = useState({});

	const [companyName, setCompanyName] = useState("");
	const [deviceName, setDeviceName] = useState("");
	const [exhaustType, setExhaustType] = useState("");
	const [deviceType, setDeviceType] = useState("");

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

		await getMonitoringDetail(param).then(response => {
			const status = response.status;
			const data = response.data.responseData.result;
			const paging = response.data.responseData.pagination;
			const device = response.data.responseData.deviceInfo;
			
			console.log(data);
			if(status === 200){
				setCompanyName(device.companyName);
				setDeviceName(device.deviceName);
				setExhaustType(device.exhaustType);
				setDeviceType(device.deviceType);

				setList(data)
				setPagination(paging)

				if(visible) {
					setChart(data);
				}
			}
		})
	}


	const setChart = (data) => {

		let data1_categories = [];
		let data1_series = [];
		let data1_series_in_carbon = [];
		let data1_series_out_carbon = [];
		let data2_categories = [];
		let data2_series = [];
		let data2_series_in_oxygen = [];
		let data2_series_out_oxygen = [];
		let data3_categories = [];
		let data3_series = [];
		let data3_series_diff_oxygen = [];
		let data3_series_diff_carbon = [];
		
		for(let i = 0; i < data.length; i++){

			const obj = data[i];			

			data1_categories.push(obj.observedDate);
			data2_categories.push(obj.observedDate);
			data3_categories.push(obj.observedDate);

			data1_series_in_carbon.push(obj.in_Carbon);
			data1_series_out_carbon.push(obj.out_Carbon);

			data2_series_in_oxygen.push(obj.in_Oxygen);
			data2_series_out_oxygen.push(obj.out_Oxygen);

			data3_series_diff_oxygen.push(obj.out_Oxygen - obj.in_Oxygen);
			data3_series_diff_carbon.push(obj.out_Carbon - obj.in_Carbon);
		}

		data1_series.push({name: 'CO₂ - IN', data: data1_series_in_carbon});
		data1_series.push({name: 'CO₂ - OUT', data: data1_series_out_carbon});

		data2_series.push({name: 'O₂ - IN', data: data2_series_in_oxygen});
		data2_series.push({name: 'O₂ - OUT', data: data2_series_out_oxygen});

		data3_series.push({name: 'O₂', data: data3_series_diff_oxygen});
		data3_series.push({name: 'CO₂', data: data3_series_diff_carbon});

		
		const option = {
			legend: { align: 'bottom', showCheckbox: false },
			chartExportMenu: { visible: false },
			chart: { width: 716, height: 318 },
			xAxis: { title: '시' },
			yAxis: { title: '단위' },
			theme: 'myTheme',
		},
		option2 = {
			legend: { align: 'bottom', showCheckbox: false },
			chartExportMenu: { visible: false },
			chart: { width: 716, height: 318 },
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
		tuiChart.columnChart( document.getElementById('chart01'), {categories: data1_categories, series: data1_series}, option );
		tuiChart.columnChart( document.getElementById('chart02'), {categories: data2_categories, series: data2_series}, option );
		tuiChart.lineChart( document.getElementById('chart03'), {categories: data3_categories, series: data3_series}, option2 );
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
					<span>장치번호:</span>{deviceCode}
					<span>사업장:</span>{companyName}
					<span>명칭:</span>{deviceName}
					<span>배출구분:</span>{exhaustType}
					<span>측정장치:</span>{deviceType}
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
									<td>{toNumber(row.in_Oxygen)}</td>
									<td>{toNumber(row.in_Carbon)}</td>
									<td>{toNumber(row.in_AirCurrent)}</td>
									<td>{toNumber(row.in_Methane)}</td>
									<td>{toNumber(row.out_Oxygen)}</td>
									<td>{toNumber(row.out_Carbon)}</td>
									<td>{toNumber(row.out_Methane)}</td>
									<td>{toNumber(row.out_AirCurrent)}</td>				
									<td>{toNumber(row.st_Temp)}</td>		
									<td>{toNumber(row.st_Humi)}</td>		
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