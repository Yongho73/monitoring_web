import React , {useEffect , useState} from 'react'
import { getMonitoringList } from '../../crud/monitoring.crud'
import CommonTablePaging from '../common/CommonTablePaging'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function DashboardList() {
	let activePage = 1;    
	
	const [list , setList] = useState([])
	const [pagination , setPagination] = useState({})
	
	const columns = [
		{ id:'deviceIdnfr' , label: '장치번호' },
		{ id:'oxygen' , label: '장치명칭' },
		{ id:'carbon' , label: '배출구분' },
		{ id:'methane' , label: '장치구분' },
		{ id:'lat' , label: '사업장명칭' },
		{ id:'lng' , label: '설치장소' }
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
		<div>
			<div className="list-search">
				<select name="area">
					<option value="ar_all">지역</option>
					<option value="area01">서울</option>
					<option value="area02">부산</option>
					<option value="area03">대구</option>
					<option value="area04">인천</option>
					<option value="area05">광주</option>
					<option value="area06">대전</option>
					<option value="area07">울산</option>
					<option value="area08">세종</option>
					<option value="area09">경기</option>
					<option value="area10">강원</option>
					<option value="area11">충북</option>
					<option value="area12">충남</option>
					<option value="area13">전북</option>
					<option value="area14">전남</option>
					<option value="area15">경북</option>
					<option value="area16">경남</option>
					<option value="area17">제주</option>
				</select>

				<select name="place">
					<option value="pl_all">사업장</option>
					<option value="place01">문경 환경사업소</option>
					<option value="place02">영광 환경관리센터</option>
				</select>

				<select name="emission">
					<option value="em_all">배출구분</option>
					<option value="emission01">아파트지역</option>
					<option value="emission02">상업지역</option>
					<option value="emission03">공장지역</option>
					<option value="emission04">관공서건물</option>
					<option value="emission05">주택단지</option>
					<option value="emission06">소각장시설</option>
					<option value="emission07">오피스지역</option>
					<option value="emission08">축산시설</option>
					<option value="emission09">운송수단</option>
				</select>

				<div>
					<input type="text" name="search" title="검색어 입력" id="search" placeholder="검색어를 입력해주세요." />
					<label htmlFor="search"><FontAwesomeIcon icon={regular('magnifying-glass')} /></label>
				</div>
				<button>엑셀 다운로드</button>
			</div>

			<CommonTablePaging            
				page = {activePage}
				columns = {columns}
				list = {list}                    
				pagination = {pagination}
				handleChangePage = {handleChangePage}
			/>
		</div>
	)
}