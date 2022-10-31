import React from 'react';
import Layout from './home/layout/layout'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './config/axiosConfig'
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import dispatch from "./reducer/reducer";
import store from './reducer/store'
import LoadingComponent from './home/common/LodingSpinner'

const App = () => {	

	const dispatch = useDispatch();
    
    useEffect(() => {
        axios.interceptors.request.use(function (config) {
            console.log(1)
            // 로딩 호출
            dispatch({
                type: GLOBAL_LOADING
            })
            return config;
        }, function (error) {
            // 실패 시 로딩창 종료
            dispatch({
                type: GLOBAL_LOADED
            })
            return Promise.reject(error);
        })
        axios.interceptors.response.use((config) => {
            // 완료 시 로딩창 종료
            dispatch({
                type: GLOBAL_LOADED
            })
            return config;
        },(error) => {
            // 실패 시 로딩창 종료
            dispatch({
                type: GLOBAL_LOADED
            })
            return Promise.reject(error)
        })
    }, [])
	console.log(store)
	return (    
		<Provider store={store}>
			<LoadingComponent />  
			<BrowserRouter>
				<Layout />       
			</BrowserRouter>			
		</Provider>
	);
}

export default App;