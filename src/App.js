import React from 'react';
import Layout from './home/layout/layout'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './config/axiosConfig'
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import dispatch from "./reducer/reducer";
import store from './reducer/store'

const App = () => {	

	return (    
		<Provider store={store}>
			<BrowserRouter>
				<Layout />       
			</BrowserRouter>
		</Provider>
	);
}

export default App;