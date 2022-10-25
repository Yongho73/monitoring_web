import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MonitoringList from './index'


export default function MonitoringPage() {  
    
    return (        
           <Switch>                        
              <Route exact path="/dashboard" component={MonitoringList}></Route>     
          </Switch>        
      )
}