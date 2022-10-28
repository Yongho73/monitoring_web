import React , { useEffect , useState } from 'react'
import { getMonitoringList } from '../../crud/monitoring.crud'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import Paging from '../common/Paging'

export default function DashboardResult(props) {

	let activePage = 1;    
	
	const [list , setList] = useState([])
	const [pagination , setPagination] = useState({})
	
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

		const param = { pageIndex : activePage }         

		await getMonitoringList(param).then(response => {
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
	},[])


	return (
		<>
			<dl>
				<dt>통계</dt>
				<dd><FontAwesomeIcon icon={regular('chevrons-up')} /></dd>
			</dl>

			<div class="box">
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
									{columns.map((column) => {
										const value = row[column.id];
										return (
											<td key={column.id} align={column.align}>
												{column.format && typeof value === 'number' ? column.format(value) : value}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>

				{pagination.totalCount > 0 && 
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