import React , {useEffect , useState} from 'react'
import { getDeviceList } from '../../crud/dashborad.crud'
import { getCommCodeList , getDeviceCompanyList } from '../../crud/code.crud'
import CommonTablePaging from '../common/CommonTablePaging'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import DashboardMap from './DashboardMap'
import { propTypes } from 'react-bootstrap/esm/Image'

export default function DashboardList(props) {
	let activePage = 1;    
	
	const [list , setList] = useState([])
	const [areaList , setAreaList] = useState([])
	const [companyList , setCompanyList] = useState([])
	const [exhaustList , setExhaustList] = useState([])
	const [pagination , setPagination] = useState({})

	const [searchArea , setSearchArea] = useState('')
	const [searchCompany , setSearchCompany] = useState('')
	const [searchExhaustType , setSearchExhaustType] = useState('')
	const [searchName , setSearchName] = useState('')
	  
	const columns = [
		{ id:'deviceCode' , label: '장치번호' },
		{ id:'deviceName' , label: '장치명칭' },
		{ id:'exhaustType' , label: '배출구분' },
		{ id:'deviceType' , label: '장치구분' },
		{ id:'companyName' , label: '사업장명칭' },
		{ id:'locationName' , label: '설치장소' }
	]	

	const handleChangePage = val => {
		activePage = val ;
		handleSearch();
	}

	const handleCommCodeList = async() => {

		let param = { upperCode: 'AREA_SI' }         

		await getCommCodeList(param).then(response => {
			const status = response.status;
			const data = response.data.responseData.result;
			
			if(status === 200){
				setAreaList(data)
			}
		});
		
		param = { upperCode: 'EXHAUST_TYPE' }         

		await getCommCodeList(param).then(response => {
			const status = response.status;
			const data = response.data.responseData.result;
			
			if(status === 200){
				setExhaustList(data)
			}
		});
		

		await getDeviceCompanyList(null).then(response => {
			const status = response.status;
			const data = response.data.responseData.result;
			
			if(status === 200){
				setCompanyList(data)
			}
		})
	} 

	const handleCallback = val => {		
		if(val === '경남'){
			val = '경상남도'
		}else if(val === '경북'){
			val = '경상북도'
		}else if(val === '전남'){
			val = '전라남도'
		}else if(val === '전북'){
			val = '전라북도'
		}else if(val === '충남'){
			val = '충청남도'
		}else if(val === '충북'){
			val = '충청북도'
		}

		const code = areaList.filter(area => area.codeName.includes(val));		
		
		if(code.length > 0 ){
			handleSearch(code[0].code)
		}
		
	}

	const handleSearch = async(val) => {

		const param = { pageIndex : activePage , searchArea: val ? val : searchArea , searchCompany: searchCompany, searchExhaustType: searchExhaustType, searchName: searchName}         

		await getDeviceList(param).then(response => {
			const status = response.status;
			const data = response.data.responseData.result;
			const paging = response.data.responseData.pagination
			
			if(status === 200){
				setList(data)
				setPagination(paging)
			}
		})
	}      

	const handleRowClick = val =>{
		const key = val.deviceCode;

		props.handleTabShow('2' , key )
	}

	useEffect(() => {
		handleCommCodeList();
		handleSearch();    
	},[])       

	return (
		<>
			<DashboardMap handleCallback={ handleCallback} />
			<div>
				<div className="list-search">
					<select name="area" onChange={event => setSearchArea(event.target.value)}>
						<option value="">지역</option>
						{areaList.length > 0 && areaList.map((item ,index) => {
							return <option value={item.code} key={index}>{item.codeName}</option>
						})}
					</select>

					<select name="place" onChange={event => setSearchCompany(event.target.value)}>
						<option value="pl_all">사업장</option>
						{companyList.length > 0 && companyList.map((item ,index) => {
							return <option value={item.code} key={index}>{item.codeName}</option>
						})}
					</select>

					<select name="emission" onChange={event => setSearchExhaustType(event.target.value)}>
						<option value="em_all">배출구분</option>
						{exhaustList.length > 0 && exhaustList.map((item ,index) => {
							return <option value={item.code} key={index}>{item.codeName}</option>
						})}
					</select>

					<div>
						<input type="text" name="search" title="검색어 입력" id="search" placeholder="검색어를 입력해주세요." onChange={event => setSearchName(event.target.value)} onKeyPress={event => event.key === 'Enter' && handleSearch() }/>
						<label htmlFor="search"><FontAwesomeIcon icon={regular('magnifying-glass')} onClick={event => handleSearch()} /></label>
					</div>
					<button>엑셀 다운로드</button>
				</div>

				<CommonTablePaging            
					page = {activePage}
					columns = {columns}
					list = {list}                    
					pagination = {pagination}
					handleChangePage = {handleChangePage}
					handleRowClick = {handleRowClick}
				/>
			</div>
		</>
	)
}