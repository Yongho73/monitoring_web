import React , {useEffect , useState} from 'react'
import getMonitoringList from '../../crud/monitoring.crud'
import CommonTablePaging from '../common/CommonTablePaging'

export default function MonitoringList() {  
    
    const [list , setList] = useState([])
    
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

        const param = {} 

        await getMonitoringList(param).then(response => {
            const status = response.status;
            const data = response.data.result;
            
            if(status === 200){
                setList(data)
            }
        })
    }      

    useEffect(() => {
        handleSearch();    
    },[])       

    return (
        <>
            <div>MonitoringList</div>
            <CommonTablePaging            
                page = {1}
                rowsPerPage = {10} 
                columns = {columns}
                list = {list}    
            />
        </>
    )
}