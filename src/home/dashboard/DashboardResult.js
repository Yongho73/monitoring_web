import React , { useCallback, useEffect, useState, useRef } from 'react'
import {  getDeviceDetail , getDeviceDetailExcel } from '../../crud/dashborad.crud'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import tuiChart from 'tui-chart'
import {ColumnChart, LineChart} from '@toast-ui/react-chart'
import Paging from '../common/Paging'
import { toNumber } from '../util/util'
import { Link } from 'react-router-dom'
import * as FileSaver from "file-saver";
import ElementResizeListener from './../util/ElementResizeListener';
import Popup from 'reactjs-popup';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

export default function DashboardResult(props) {
	const [deviceCode , setDeviceCode] = useState(props.deviceCode)
	const [visible, setVisible] = useState(true);  
	const [showExcelDialog, setShowExcelDialog] = useState(false);  

	const [data1, setData1] = useState({});
	const [data2, setData2] = useState({});
	const [data3, setData3] = useState({});
	const [data4, setData4] = useState({});

	const [selectedDate, setSelectedDate] = useState(new Date());

	const [companyName, setCompanyName] = useState("");
	const [deviceName, setDeviceName] = useState("");
	const [exhaustType, setExhaustType] = useState("");
	const [deviceType, setDeviceType] = useState("");

	let activePage = 1;    
	
	const [list , setList] = useState([])
	const [pagination , setPagination] = useState({})	
	const [pageIndex, setPageIndex] = useState(1)

	const chartRef1 = useRef(null);
	const chartRef2 = useRef(null);
	const chartRef3 = useRef(null);
	const chartRef4 = useRef(null);

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
			tickColor: '#fff'
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
			tickColor: '#fff'
		}
	};

	tuiChart.registerTheme('myTheme', theme);
	
	const option = {
		legend: { align: 'bottom', showCheckbox: false, visible: true },
		chartExportMenu: { visible: false },
		xAxis: { title: '시'},
		yAxis: { title: '단위'},
		chart: { height: 318 },
		plot: { visible: false },
		responsive: {
			animation: { duration: 300 }
		},
		theme: 'myTheme'
	};
	
	const option2 = {
		legend: { align: 'bottom', showCheckbox: false, visible: true },
		chartExportMenu: { visible: false },
		xAxis: { title: '시'},
		yAxis: {
			title: '단위',
			scale: {
				min: -20,
				max: 20,
				stepSize: 20
			}
		},
		chart: { height: 120 },
		plot: { visible: false },
		responsive: {
			animation: { duration: 300 }
		},
		theme: 'myTheme'
	};
	
	const handleSearch = async() => {
		const param = { deviceCode : deviceCode, pagePerSize : !visible ? 10 : 5, pageIndex: activePage }    		

		await getDeviceDetail(param).then(response => {
			const status = response.status;
			const data = response.data.responseData.result;
			const paging = response.data.responseData.pagination;
			const device = response.data.responseData.deviceInfo;

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
		let data3_series_diff_carbon = [];
		let data4_categories = [];
		let data4_series = [];
		let data4_series_diff_oxygen = [];
		
		for(let i = data.length - 1; i >= 0; i--){
			const obj = data[i];			

			let datetime = new Date(obj.observedDate);

			data1_categories.push(datetime.hhmm());
			data2_categories.push(datetime.hhmm());
			data3_categories.push(datetime.hhmm());
			data4_categories.push(datetime.hhmm());

			data1_series_in_carbon.push(obj.in_Carbon);
			data1_series_out_carbon.push(obj.out_Carbon);

			data2_series_in_oxygen.push(obj.in_Oxygen / 100);
			data2_series_out_oxygen.push(obj.out_Oxygen / 100);
			
			data3_series_diff_carbon.push(obj.in_Carbon - obj.out_Carbon);

			data4_series_diff_oxygen.push((obj.in_Oxygen / 100) - (obj.out_Oxygen / 100));
		}

		data1_series.push({name: 'CO₂ - IN', data: data1_series_in_carbon});
		data1_series.push({name: 'CO₂ - OUT', data: data1_series_out_carbon});

		data2_series.push({name: 'O₂ - IN', data: data2_series_in_oxygen});
		data2_series.push({name: 'O₂ - OUT', data: data2_series_out_oxygen});

		data3_series.push({name: 'CO₂', data: data3_series_diff_carbon});
		
		data4_series.push({name: 'O₂', data: data4_series_diff_oxygen});

		setData1({categories: data1_categories, series: data1_series});
		setData2({categories: data2_categories, series: data2_series});
		setData3({categories: data3_categories, series: data3_series});
		setData4({categories: data4_categories, series: data4_series});

	}

	const handleChangePage = val => {
		activePage = val ;
		handleSearch();
	}

	const handleExcelDown = async() => {
		const formData = new FormData();
		
		formData.append('deviceCode', deviceCode);
		formData.append('date', selectedDate.yyyymmdd());

		await getDeviceDetailExcel(formData).then(response => {			
			const excelFileType = 'application/octet-stream';
			const excelFile = new Blob([response.data], { type: excelFileType});
			let fileName = '측정 결과_' + deviceCode + '_' + selectedDate.yyyymmdd();

			fileName += '.xlsx'

  			FileSaver.saveAs(excelFile, fileName);
		})
	}

	const contentRef: React.RefObject<HTMLDivElement> = useRef(null);

	const adaptResize = useCallback(() => {
		if (contentRef.current) {
			const elmRect = contentRef.current.getBoundingClientRect();
			chartRef1.current.chartInst.resize({width:elmRect.width, height:elmRect.height})
			chartRef2.current.chartInst.resize({width:elmRect.width, height:elmRect.height})
			chartRef3.current.chartInst.resize({width:elmRect.width, height:elmRect.height / 2})
			chartRef4.current.chartInst.resize({width:elmRect.width, height:elmRect.height / 2})
		}
	}, []);

	useEffect(() => {
		handleSearch();
		if(visible && contentRef.current) {
			const elmRect = contentRef.current.getBoundingClientRect();
			chartRef1.current.chartInst.resize({width:elmRect.width, height:elmRect.height})
			chartRef2.current.chartInst.resize({width:elmRect.width, height:elmRect.height})
			chartRef3.current.chartInst.resize({width:elmRect.width, height:elmRect.height / 2})
			chartRef4.current.chartInst.resize({width:elmRect.width, height:elmRect.height / 2})
		}

	},[visible])

	useEffect(() => {
		adaptResize();
	},[])

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
					{/* <button onClick={event => handleExcelDown() }>엑셀 다운로드</button> */}
					<Popup trigger={<button> 엑셀 다운로드</button>} position="bottom right">
						<div className='box' style={{background: 'rgba(255, 255, 255, 0.25)'}}>
							<div style={{textAlign: 'center'}}>
								<h2>엑셀 다운로드</h2>
							</div>
							<Calendar value={selectedDate}
									  onChange={e => setSelectedDate(e)}
									  maxDate={new Date()}
									  calendarType='US'
							/>
							<div style={{marginTop: '0.5rem', textAlign: 'right'}}>
								<button onClick={event => handleExcelDown() }>다운로드</button>
							</div>
						</div>
					</Popup>
				</dd>
			</dl>

			{visible &&
				<ol>
					<li className="box">
						<h2>CO₂ 유입 및 배출량</h2>
						<div className='chart' ref={contentRef}>
							<ElementResizeListener onResize={adaptResize}/>
							<ColumnChart
								ref={chartRef1}
								data={data1}
								options={option}>
							</ColumnChart>
						</div>
					</li>

					<li className="box">
						<h2>O₂ 유입 및 배출량</h2>
						<div className='chart'>
							<ColumnChart
								ref={chartRef2}
								data={data2}
								options={option}>
							</ColumnChart>
						</div>
					</li>

					<li className="box">
						<h2>O₂, CO₂ 변화량</h2>
						<div className='chart2'>
							<LineChart
								ref={chartRef3}
								data={data3}
								options={option2}>
							</LineChart>
						</div>
						
						<div className='chart2'>
							<LineChart
								ref={chartRef4}
								data={data4}
								options={option2}>
							</LineChart>
						</div>
					</li>
				</ol>
			}
			<dl>
				<dt>통계</dt>
				<dd onClick={ e => setVisible(!visible) }>
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
							<th rowSpan={2}>Temporary</th>
							<th rowSpan={2}>Humi</th>
							<th rowSpan={2} >Date</th>
						</tr>
						<tr>
							<th>CO₂</th>
							<th>O₂</th>
							<th>AFM</th>
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
									<td>{row.in_Oxygen / 100} ppm</td>
									<td>{toNumber(row.in_Carbon)} %</td>
									<td>{toNumber(row.in_AirCurrent)} m³/h</td>
									<td>{row.out_Oxygen / 100} ppm</td>
									<td>{toNumber(row.out_Carbon)} %</td>
									<td>{toNumber(row.out_AirCurrent)} m³/h</td>
									<td>{toNumber(row.in_Carbon - row.out_Carbon)} ppm</td>
									<td>{(row.in_Oxygen - row.out_Oxygen) / 100} %</td>
									<td>{toNumber(row.st_Temp)}°C</td>
									<td>{toNumber(row.st_Humi)}%</td>
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