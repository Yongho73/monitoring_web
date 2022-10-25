import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Index from './index'
import DashboardPage from './dashboard/DashboardPage'
import Page404 from './error/404'

export default function HomePage() {  
  return (
    <BrowserRouter>      
        <Switch>          
            <Route exact path="/" component={Index}></Route>     
            <Route exact path="/dashboard" component={DashboardPage}></Route>     
            <Route exact path="*" component={Page404}></Route>     
        </Switch>      
    </BrowserRouter>
  )
}