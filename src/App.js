import React from 'react';
import Layout from './home/layout/layout'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
const App = () => {
	return (    
		<BrowserRouter>
      		<Layout />       
	  	</BrowserRouter>
	);
}

export default App;