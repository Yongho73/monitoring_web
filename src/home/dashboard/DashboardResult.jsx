import React , { useCallback, useEffect, useState, useRef } from 'react'
import {  getDeviceDetail , getDeviceDetailExcel } from '../../crud/dashborad.crud'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Paging from '../common/Paging'
import {toNumber,  uuidv4} from '../util/util'
import * as FileSaver from "file-saver";
import Popup from 'reactjs-popup';
import Calendar from 'react-calendar';

import mqtt from "mqtt/dist/mqtt";
import jsmpeg from "jsmpeg";

import 'react-calendar/dist/Calendar.css';
import {
	faArrowRotateRight, faBullseyePointer,
	faChevronsDown,
	faChevronsUp, faExpand,
	faLinkHorizontal,
	faTriangleExclamation
} from "@fortawesome/pro-regular-svg-icons";
import {faStop} from "@fortawesome/pro-solid-svg-icons";
import ReactEcharts from "echarts-for-react";
import {
	LineChart,
	BarChart
} from 'echarts/charts';

export default function DashboardResult(props) {
	const [visible, setVisible] = useState(true);  
	const [showExcelDialog, setShowExcelDialog] = useState(false);

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

	const [clientData , setClientData] = useState(null)
	const [mqttClient, setMqttClient] = useState(null);
	const [isLive, setIsLive] = useState('N');
	let isConnect = false;

	const [chartAxis1, setChartAxis1] = useState([]);
	const [chartSeriesIn1, setChartSeriesIn1] = useState([]);
	const [chartSeriesOut1, setChartSeriesOut1] = useState([]);

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
			name: '???',
			nameTextStyle: {
				verticalAlign: 'top',
				fontWeight: '600',
				color: '#bababa'
			},
			data: chartAxis1,
			axisLabel: { color: '#fff' },
		},
		yAxis: {
			type: 'value',
			name: '??????',
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
			//interval : 10000,
		},
		series: [
			{
				name: 'CO???-IN',
				type: 'bar',
				data: chartSeriesIn1,
				label: {
					show: false,
				},
				barWidth: '20%',
				itemStyle: {color:'#677bfe'},
				animation: false
			},
			{
				name: 'CO???-OUT',
				type: 'bar',
				data: chartSeriesOut1,
				label: {
					show: false,
				},
				barWidth: '20%',
				itemStyle: {color:'#ff5889'},
				animation: false
			}
		]
	}

	const [chartAxis2, setChartAxis2] = useState([]);
	const [chartSeriesIn2, setChartSeriesIn2] = useState([]);
	const [chartSeriesOut2, setChartSeriesOut2] = useState([]);

	const o2 = {
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
			name: '???',
			nameTextStyle: {
				verticalAlign: 'top',
				fontWeight: '600',
				color: '#bababa'
			},
			data: chartAxis2,
			axisLabel: { color: '#fff' },
		},
		yAxis: {
			type: 'value',
			name: '??????',
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
			//interval : 20,
		},
		series: [
			{
				name: 'O???-IN',
				type: 'bar',
				data: chartSeriesIn2,
				label: {
					show: false,
				},
				barWidth: '20%',
				itemStyle: {color:'#677bfe'},
				animation: false
			},
			{
				name: 'O???-OUT',
				type: 'bar',
				data: chartSeriesOut2,
				label: {
					show: false,
				},
				barWidth: '20%',
				itemStyle: {color:'#ff5889'},
				animation: false
			}
		]
	}

	const [chartAxis3, setChartAxis3] = useState([]);
	const [chartSeries3, setChartSeries3] = useState([]);

	const diffO2 = {
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
			name: '???',
			nameTextStyle: {
				verticalAlign: 'top',
				fontWeight: '600',
				color: '#bababa'
			},
			data: chartAxis3,
			axisLabel: { color: '#fff' },
		},
		yAxis: {
			type: 'value',
			name: '??????',
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
			interval : 2000,
		},
		series: [
			{
				name: 'CO???',
				type: 'line',
				data: chartSeries3,
				label: {
					show: false,
				},
				barWidth: '20%',
				itemStyle: {color:'#677bfe'},
				animation: false
			}
		]
	}

	const [chartAxis4, setChartAxis4] = useState([]);
	const [chartSeries4, setChartSeries4] = useState([]);

	const diffCo2 = {
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
			name: '???',
			nameTextStyle: {
				verticalAlign: 'top',
				fontWeight: '600',
				color: '#bababa'
			},
			data: chartAxis4,
			axisLabel: { color: '#fff' },
		},
		yAxis: {
			type: 'value',
			name: '??????',
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
				name: 'O???',
				type: 'line',
				data: chartSeries4,
				label: {
					show: false,
				},
				barWidth: '20%',
				itemStyle: {color:'#677bfe'},
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
					username: 'bizmarvel',
					password: 'shako-richard-mutable-quadrant-superior-wasp',
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

			// ?????? ??????
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

			setChartAxis1(data1_categories);
			setChartSeriesIn1(data1_series_in_carbon);
			setChartSeriesOut1(data1_series_out_carbon);

			setChartAxis2(data2_categories);
			setChartSeriesIn2(data2_series_in_oxygen);
			setChartSeriesOut2(data2_series_out_oxygen);

			setChartAxis3(data3_categories);
			setChartSeries3(data3_series_diff_carbon);

			setChartAxis4(data4_categories);
			setChartSeries4(data4_series_diff_oxygen);
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
			let fileName = '?????? ??????_' + deviceCode + '_' + selectedDate.yyyymmdd();

			fileName += '.xlsx'

  			FileSaver.saveAs(excelFile, fileName);
		})
	}

	const contentRef = useRef(null);

	const isLiveFun = () => {
		if(isLive === 'Y')
			return <span title='????????? ?????????' className='live-inter'><FontAwesomeIcon icon={faLinkHorizontal} /></span>
		else if (isLive === 'S')
			return <span title='????????? ?????? ?????????' className='live-stop'><FontAwesomeIcon icon={faStop} /></span>
		else if (isLive === 'W')
			return <span title='????????? ?????? ?????????' className='live-ready'><FontAwesomeIcon icon={faBullseyePointer} /></span>
		else
			return <span title='????????? ?????? ??????' className='live-fail'><FontAwesomeIcon icon={faTriangleExclamation} /></span>
	}

	useEffect(() => {
		handleSearch();
	},[visible])

	// cctv ?????? ?????? ==========================---------------
	const cctvCanvasRef = useRef(null);
	let client = null;
    let canvas = null;
    // cctv ??????
	const cctvOn = () => {
        console.log("cctv ??????");
		client = new WebSocket('wss://dev.bizmarvel.co.kr:9000');
        canvas = cctvCanvasRef.current;
        new jsmpeg(client, {canvas: canvas});
    };
    // cctv ??????
	const cctvOff = () => {
		console.log("cctv ??????");         
		if(client != null) {
			client.close();
			client = null;
		}
		if(canvas != null) {
        	canvas = null;
		}
    };
	// cctv ????????????
	const openCctvFullscreen = () => {    		 		
		console.log("cctv ????????????");
		canvas = cctvCanvasRef.current;
		if (canvas.requestFullscreen) {
			canvas.requestFullscreen();
		}
	};
	// cctv ?????? ?????? ==========================---------------

	return (
		<>	
			<dl>
				<dt>
					{isLiveFun()}
					<span>????????????:</span>{deviceCode}
					<span>?????????:</span>{companyName}
					<span>??????:</span>{deviceName}
					<span>????????????:</span>{exhaustType}
					<span>????????????:</span>{deviceType}
				</dt>
				<dd>
					{/* <button onClick={event => handleExcelDown() }>?????? ????????????</button> */}
					<Popup trigger={<button>CCTV ??????</button>} position='bottom right' onOpen={()=>cctvOn()} onClose={()=>cctvOff()}>
						<div className='popup-mini'>
							<canvas ref={cctvCanvasRef}></canvas>
							<span onClick={()=>openCctvFullscreen()}><FontAwesomeIcon icon={faExpand} /></span>
						</div>
					</Popup>
					<Popup trigger={<button>?????? ????????????</button>}  position='bottom right'>
						<div className='popup-mini'>
							<Calendar value={selectedDate}
								onChange={e => setSelectedDate(e)}
								maxDate={new Date()}
								calendarType='US'
							/>
							<button onClick={event => handleExcelDown() }>????????????</button>
						</div>
					</Popup>
				</dd>
			</dl>

			{visible &&
				<ol>
					<li className="box">
						<h2>CO??? ?????? ??? ?????????</h2>
						<div className='chart' ref={contentRef}>
							<ReactEcharts option={co2}></ReactEcharts>
						</div>
					</li>

					<li className="box">
						<h2>O??? ?????? ??? ?????????</h2>
						<div className='chart'>
							<ReactEcharts option={o2}></ReactEcharts>
						</div>
					</li>

					<li className="box">
						<h2>CO???, O??? ?????????</h2>
						<div className='chart2'>
							<ReactEcharts option={diffO2}></ReactEcharts>
							<ReactEcharts option={diffCo2}></ReactEcharts>
						</div>
					</li>
				</ol>
			}
			<dl>
				<dt>??????</dt>
				<dd onClick={ e => setVisible(!visible) }>
					{visible ?
						<FontAwesomeIcon icon={faChevronsUp} />
						: <FontAwesomeIcon icon={faChevronsDown} />
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
								<span>CO???</span>
								<span>O???</span>
								<span>AFM</span>
								<span>CO???</span>
								<span>O???</span>
								<span>AFM</span>
								<span>CO???</span>
								<span>O???</span>
							</td>
						</tr>
					</thead>
					<tbody>
						{list.map((row, index) => {
							return (
								<tr role="checkbox" tabIndex={-1} key={index} >
									<td>{toNumber(row.in_Carbon)} ppm</td>
									<td>{toNumber(row.in_Oxygen / 100)} %</td>
									<td>{toNumber(row.in_AirCurrent)} m??/h</td>
									<td>{toNumber(row.out_Carbon)} ppm</td>
									<td>{toNumber(row.out_Oxygen / 100)} %</td>
									<td>{toNumber(row.out_AirCurrent)} m??/h</td>
									<td>{toNumber(row.in_Carbon - row.out_Carbon)} ppm</td>
									<td>{(row.out_Oxygen - row.in_Oxygen) / 100} %</td>
									<td>{toNumber(row.st_Temp)}??C</td>
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