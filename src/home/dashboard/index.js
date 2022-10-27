import React , {useEffect , useState} from 'react'
import { getMonitoringList } from '../../crud/monitoring.crud'
import CommonTablePaging from '../common/CommonTablePaging'

export default function MonitoringList() {  

    let activePage = 1;    
    
    const [list , setList] = useState([])
    const [pagination , setPagination] = useState({})
    
    const columns = [
        { id:'deviceIdnfr' , align: 'center', label: 'deviceIdnfr' },
        { id:'oxygen' , align: 'center', label: 'oxygen' },
        { id:'carbon' , align: 'center', label: 'carbon' },
        { id:'methane' , align: 'center', label: 'methane' },
        { id:'airCurrent' , align: 'center', label: 'u' },
        { id:'lat' , align: 'center', label: 'lat' },
        { id:'lng' , align: 'center', label: 'lng' }
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
            <div>MonitoringList</div>
            <CommonTablePaging            
                page = {activePage}
                columns = {columns}
                list = {list}                    
                pagination = {pagination}
                handleChangePage = {handleChangePage}
            />
        </>
    )
}