import React, { useEffect  , useState } from 'react';
import axios from 'axios'
import Layout from './home/layout/layout'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from "redux";
import { Provider , useDispatch } from "react-redux";
import { store } from './reducer/reducer'
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
		<Provider store={store}>			
			<BrowserRouter>
				<LoadingComponent loading={loading}/>  
				<Layout />       
			</BrowserRouter>			
		</Provider>
	);
}

export default App;