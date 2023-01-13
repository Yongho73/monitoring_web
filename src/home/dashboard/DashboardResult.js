import React , { useCallback, useEffect, useState, useRef } from 'react'
import {  getDeviceDetail , getDeviceDetailExcel } from '../../crud/dashborad.crud'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import tuiChart from 'tui-chart'
import {ColumnChart, LineChart} from '@toast-ui/react-chart'
import ReactEcharts from 'echarts-for-react'
import Paging from '../common/Paging'
import {toNumber, makeid, uuidv4} from '../util/util'
import * as FileSaver from "file-saver";
import ElementResizeListener from './../util/ElementResizeListener';
import Popup from 'reactjs-popup';
import Calendar from 'react-calendar';

import mqtt from "mqtt/dist/mqtt";
import jsmpeg from "jsmpeg";

import 'react-calendar/dist/Calendar.css';

export default function DashboardResult(props) {
	const [visible, setVisible] = useState(true);  
	const [showExcelDialog, setShowExcelDialog] = useState(false);  

	const [data1, setData1] = useState({});
	const [data2, setData2] = useState({});
	const [data3, setData3] = useState({});
	const [data4, setData4] = useState({});
	const [chageData1, setChageData1] = useState({});

	const [selectedDate, setSelectedDate] = useState(new Date());

	const [deviceCode , setDeviceCode] = useState("")
	const [deviceIdnfr, setDeviceIdnfr] = useState(props.deviceIdnfr);
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

	const [clientData , setClientData] = useState(null)
	const [mqttClient, setMqttClient] = useState(null);
	const [isLive, setIsLive] = useState('N');
	let isConnect = false;

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
			animation: false
		},
		series: {shift: true},
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
			animation: false
		},
		series: {shift: true},
		theme: 'myTheme'
	};

	const co2 = {
		grid: { top: 30, right: 30, bottom: 35, left: 1, containLabel: true },
		legend: {
			show: true,
			bottom: -5,
			itemGap: 30,
			textStyle: {
				color: '#fff'
			}
		},
		xAxis: {
			type: 'category',
			name: '시',
			nameTextStyle: {
				verticalAlign: 'top',
				fontWeight: '600',
				color: '#bababa'
			},
			data: ['13:17:50', '13:18:00', '13:18:10', '13:18:20', '13:18:30', '13:18:40', '13:18:50'],
			axisLabel: { color: '#fff' },
		},
		yAxis: {
			type: 'value',
			name: '단위',
			nameTextStyle: {
				align: 'right',
				verticalAlign: 'bottom',
				fontWeight: '600',
				color: '#bababa'
			},
			splitLine: {
				lineStyle: {
					color: 'rgba(255,255,255,0.18)'
				}
			},
			axisLabel: { color:'#fff' },
			interval : 20,
		},
		series: [
			{
				name: 'CO₂-IN',
				type: 'bar',
				data: [13.604, 14.173, 16.334, 20.261, 32.063, 42.192, 52.492, 71.173],
				label: {
					show: false,
				},
				barWidth: '20%',
				itemStyle: {color:'#677bfe'},
				animation: false
			},
			{
				name: 'CO₂-OUT',
				type: 'bar',
				data: [13.604, 14.173, 16.334, 20.261, 32.063, 42.192, 52.492, 71.173],
				label: {
					show: false,
				},
				barWidth: '20%',
				itemStyle: {color:'#ff5889'},
				animation: false
			}
		]
	}
	
	const handleSearch = async() => {
		const param = { deviceIdnfr : deviceIdnfr, pagePerSize : !visible ? 60 : 7, pageIndex: activePage }

		await getDeviceDetail(param).then(response => {
			const status = response.status;
			const data = response.data.responseData.result;
			const paging = response.data.responseData.pagination;
			const device = response.data.responseData.deviceInfo;

			if(status === 200){
				setList(data)
				setPagination(paging)

				setDeviceCode(device.deviceCode);
				setCompanyName(device.companyName);
				setDeviceName(device.deviceName);
				setExhaustType(device.exhaustType);
				setDeviceType(device.deviceType);
			}
		})
	}

	useEffect(() =>{
		if(deviceIdnfr && !mqttClient && !isConnect){
			isConnect = true
			try {
				let url = '';
				if(window.location.hostname.endsWith('bizmarvel.co.kr')) {
					url = "wss://" + window.location.hostname + ":85";
				} else{
					url = "ws://192.168.0.3:61614";
				}
				const client = mqtt.connect(url, {
					clientId: uuidv4(),
					properties: {topicAliasMaximum: 20, maximumPacketSize: 100}
				});

				const topic1 = "ccdm/" + deviceIdnfr + "/data";

				client.on("connect", () => {
					setIsLive('W')
					client.subscribe(topic1);
				});

				client.on('message', function (topic, message) {
					setClientData(JSON.parse(message.toString()));
				})


				setMqttClient(client);
			} catch(err) {console.log(err); setIsLive('N')}
		}
	}, [deviceIdnfr])

	useEffect(() =>{
		if(visible) {
			setIsLive('W');
		} else{
			setIsLive('S');
		}
	}, [visible])

	useEffect(() => {
		if(clientData && visible){
			setIsLive('Y');

			// 날짜 가공
			clientData.observedDate = clientData.observedDate.slice(0, 4) + '-' +
									  clientData.observedDate.slice(4, 6) + '-' +
									  clientData.observedDate.slice(6, 8) + ' ' +
									  clientData.observedDate.slice(8, 10) + ':'+
									  clientData.observedDate.slice(10, 12) + ':'+
									  clientData.observedDate.slice(12, 14)

			if(list.length >= 7) {
				list.splice(list.length - 1);
			}

			setList([clientData, ...list])
		}
	},[clientData])

	useEffect(() => {
		if(list && visible){
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

			if(list.length == 0) {
				let datetime = new Date();

				data1_categories.push(datetime.hhmmss());
				data2_categories.push(datetime.hhmmss());
				data3_categories.push(datetime.hhmmss());
				data4_categories.push(datetime.hhmmss());

				data1_series_in_carbon.push(0);
				data1_series_out_carbon.push(0);
				data2_series_in_oxygen.push(0);
				data2_series_out_oxygen.push(0);
				data3_series_diff_carbon.push(0);
				data4_series_diff_oxygen.push(0);
			} else{
				for(let i = list.length - 1; i >= 0; i--){
					const obj = list[i];

					let datetime = new Date(obj.observedDate);

					data1_categories.push(datetime.hhmmss());
					data2_categories.push(datetime.hhmmss());
					data3_categories.push(datetime.hhmmss());
					data4_categories.push(datetime.hhmmss());

					data1_series_in_carbon.push(obj.in_Carbon);
					data1_series_out_carbon.push(obj.out_Carbon);

					data2_series_in_oxygen.push(obj.in_Oxygen / 100);
					data2_series_out_oxygen.push(obj.out_Oxygen / 100);

					data3_series_diff_carbon.push(obj.in_Carbon - obj.out_Carbon);

					data4_series_diff_oxygen.push((obj.out_Oxygen / 100) - (obj.in_Oxygen / 100));
				}
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
	},[list])


	const handleChangePage = val => {
		activePage = val ;
		handleSearch();
	}

	const handleExcelDown = async() => {
		const formData = new FormData();
		
		formData.append('deviceIdnfr', deviceIdnfr);
		formData.append('date', selectedDate.yyyymmdd());

		await getDeviceDetailExcel(formData).then(response => {			
			const excelFileType = 'application/octet-stream';
			const excelFile = new Blob([response.data], { type: excelFileType});
			let fileName = '측정 결과_' + deviceCode + '_' + selectedDate.yyyymmdd();

			fileName += '.xlsx'

  			FileSaver.saveAs(excelFile, fileName);
		})
	}

	const contentRef = useRef(null);

	const adaptResize = useCallback(() => {
		if (contentRef.current) {
			const elmRect = contentRef.current.getBoundingClientRect();
			// chartRef1.current.chartInst.resize({width:elmRect.width, height:elmRect.height})
			chartRef2.current.chartInst.resize({width:elmRect.width, height:elmRect.height})
			chartRef3.current.chartInst.resize({width:elmRect.width, height:elmRect.height / 2})
			chartRef4.current.chartInst.resize({width:elmRect.width, height:elmRect.height / 2})
		}
	}, []);

	const isLiveFun = () => {
		if(isLive === 'Y')
			return <span title='실시간 연동됨' className='live-inter'><FontAwesomeIcon icon={regular('link-horizontal')} /></span>
		else if (isLive === 'S')
			return <span title='실시간 연동 중지됨' className='live-stop'><FontAwesomeIcon icon={solid('stop')} /></span>
		else if (isLive === 'W')
			return <span title='실시간 연동 준비됨' className='live-ready'><FontAwesomeIcon icon={regular('bullseye-pointer')} /></span>
		else
			return <span title='실시간 연동 실패' className='live-fail'><FontAwesomeIcon icon={regular('triangle-exclamation')} /></span>
	}

	useEffect(() => {
		handleSearch();
		if(visible && contentRef.current) {
			const elmRect = contentRef.current.getBoundingClientRect();
			// chartRef1.current.chartInst.resize({width:elmRect.width, height:elmRect.height})
			chartRef2.current.chartInst.resize({width:elmRect.width, height:elmRect.height})
			chartRef3.current.chartInst.resize({width:elmRect.width, height:elmRect.height / 2})
			chartRef4.current.chartInst.resize({width:elmRect.width, height:elmRect.height / 2})
		}
	},[visible])

	useEffect(() => {
		adaptResize();
	},[])

	// cctv 추가 시작 ==========================---------------
	const cctvCanvasRef = useRef(null);
	let client = null;
    let canvas = null;
    // cctv 켜기
	const cctvOn = () => {
        console.log("cctv 켜기");
		client = new WebSocket('ws://34.64.209.141:9000');
        canvas = cctvCanvasRef.current;
        new jsmpeg(client, {canvas: canvas});           
    };
    // cctv 끄기
	const cctvOff = () => {
		console.log("cctv 끄기");
        client.close();
		client = null;
        canvas = null;      
    };
	// cctv 전체화면
	const openCctvFullscreen = () => {    		 		
		console.log("cctv 전체화면");
		if (canvas.requestFullscreen) {
			canvas.requestFullscreen();
		}
	};
	// cctv 추가 종료 ==========================---------------

	return (
		<>	
			<dl>
				<dt>
					{isLiveFun()}
					<span>장치번호:</span>{deviceCode}
					<span>사업장:</span>{companyName}
					<span>명칭:</span>{deviceName}
					<span>배출구분:</span>{exhaustType}
					<span>측정장치:</span>{deviceType}
				</dt>
				<dd>
					{/* <button onClick={event => handleExcelDown() }>엑셀 다운로드</button> */}
					<Popup trigger={<button>CCTV 연결</button>} position='bottom right' onOpen={()=>cctvOn()} onClose={()=>cctvOff()}>
						<div className='popup-mini'>
							<canvas ref={cctvCanvasRef}></canvas>
							<span onClick={()=>openCctvFullscreen()}><FontAwesomeIcon icon={regular('expand')} /></span>
						</div>
					</Popup>
					<Popup trigger={<button>엑셀 다운로드</button>}  position='bottom right'>
						<div className='popup-mini'>
							<Calendar value={selectedDate}
								onChange={e => setSelectedDate(e)}
								maxDate={new Date()}
								calendarType='US'
							/>
							<button onClick={event => handleExcelDown() }>다운로드</button>
						</div>
					</Popup>
				</dd>
			</dl>

			{visible &&
				<ol>
					<li className="box">
						<h2>CO₂ 유입 및 배출량</h2>
						<div className='chart' ref={contentRef}>
							{/* <ElementResizeListener onResize={adaptResize}/>
							<ColumnChart
								ref={chartRef1}
								data={data1}
								options={option}>
							</ColumnChart> */}
							<ReactEcharts option={co2}></ReactEcharts>
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
							<th rowSpan={2}>Temperature</th>
							<th rowSpan={2}>Humidity</th>
							<th rowSpan={2}>Date</th>
							<td>
								<span>CO₂</span>
								<span>O₂</span>
								<span>AFM</span>
								<span>CO₂</span>
								<span>O₂</span>
								<span>AFM</span>
								<span>CO₂</span>
								<span>O₂</span>
							</td>
						</tr>
					</thead>
					<tbody>
						{list.map((row, index) => {
							return (
								<tr role="checkbox" tabIndex={-1} key={index} >
									<td>{row.in_Carbon} ppm</td>
									<td>{toNumber(row.in_Oxygen / 100)} %</td>
									<td>{toNumber(row.in_AirCurrent)} m³/h</td>
									<td>{row.out_Carbon} ppm</td>
									<td>{toNumber(row.out_Oxygen / 100)} %</td>
									<td>{toNumber(row.out_AirCurrent)} m³/h</td>
									<td>{toNumber(row.in_Carbon - row.out_Carbon)} ppm</td>
									<td>{(row.out_Oxygen - row.in_Oxygen) / 100} %</td>
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