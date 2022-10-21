import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MonitoringList from './index'


export default function MonitoringPage() {  
    
    return (
        <BrowserRouter>
           <Switch>                        
              <Route exact path="/list" component={MonitoringList}></Route>     
          </Switch>
        </BrowserRouter>
      )
}