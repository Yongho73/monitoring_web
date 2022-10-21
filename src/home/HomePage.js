import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Index from './index'
import MonitoringPage from './monitoring/MonitoringPage'

export default function HomePage() {  
  return (
    <BrowserRouter>
       <Switch>          
          <Route exact path="/" component={Index}></Route>     
          <Route exact path="/list" component={MonitoringPage}></Route>     
      </Switch>
    </BrowserRouter>
  )
}