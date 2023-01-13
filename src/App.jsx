import React, { useEffect  , useState } from 'react';
import axios from 'axios'
import Layout from './home/layout/Layout'
import { BrowserRouter } from 'react-router-dom';
import LoadingComponent from './home/common/LoadingComponent'

const App = () => {	

	const [loading , setLoading] = useState(false)

	useEffect(() => {
        axios.interceptors.request.use(function (config) {
            setLoading(true)
            return config;
        }, function (error) {
			// 실패 시 로딩창 종료
			setLoading(false)
            return Promise.reject(error);
        })
        axios.interceptors.response.use((config) => {
			setLoading(false)
            return config;
        },(error) => {
			// 실패 시 로딩창 종료
			setLoading(false)
            return Promise.reject(error)
        })
    }, [])

	return (    				
		
		<BrowserRouter>
			<LoadingComponent loading={loading}/>
			<Layout />       
		</BrowserRouter>	
	);
}

export default App;