import React, { useEffect, useState } from 'react';
import { getMonitoringList } from '../../crud/monitoring.crud'
import tuiChart from 'tui-chart'

export default function DashboardChart() {    
  
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
			// chart: { width: 'auto', height: 'auto' },
			series: { shift: true },
			xAxis: { title: '시' },
			yAxis: { title: '단위' },
			theme: 'myTheme',
			// responsive: {
			// 	animation: { duration: 300 },
			// 	rules: [
			// 		{
			// 			condition: ({ width: w }) => {
			// 				return w <= 600;
			// 			},
			// 			options: {
			// 				legend: {
			// 					align: 'bottom',
			// 				},
			// 			},
			// 		},
			// 		{
			// 			condition: ({ width: w }) => {
			// 				return w <= 400;
			// 			},
			// 			options: {
			// 				legend: {
			// 					visible: false,
			// 				},
			// 				exportMenu: {
			// 					visible: false,
			// 				},
			// 			},
			// 		},
			// 	],
			// },
		},
		option2 = {
			legend: { align: 'bottom', showCheckbox: false },
			chartExportMenu: { visible: false },
			// chart: { width: 'auto', height: 'auto' },
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

	},[])

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

			<ol>
				<li class="box">
					<h2>CO₂ 유입 및 배출량</h2>
					<div id="chart01" className="chart"></div>
				</li>

				<li class="box">
					<h2>O₂ 유입 및 배출량</h2>
					<div id="chart02" className="chart"></div>
				</li>

				<li class="box">
					<h2>CO₂, O₂ 변화량</h2>
					<div id="chart03" className="chart"></div>
				</li>
			</ol>
    </>
  );
}