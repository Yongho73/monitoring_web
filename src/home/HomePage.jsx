import React from 'react'
import { BrowserRouter, Switch, Route , Redirect} from 'react-router-dom';
import Index from './index'
import DashboardPage from './dashboard/DashboardPage'
import Page404 from './error/404'

export default function HomePage(props) {  
  
  return (      
        <Switch>      
            <Route exact path="/">
              <Redirect to='/dashboard'/>
            </Route>
            <Route exact path="/index" component={DashboardPage}></Route>                   
            <Route exact path="/dashboard" component={DashboardPage}></Route>                 
            <Route exact path="*" component={Page404}></Route>                 
        </Switch>          
  )
}