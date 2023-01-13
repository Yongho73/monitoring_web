import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Index from './index'
import DashboardResult from './DashboardResult'

export default function MonitoringPage() {  
    
    return (        
           <Switch>                        
              <Route exact path="/dashboard" component={Index}></Route>                   
          </Switch>        
      )
}