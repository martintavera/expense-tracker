import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Login from '../components/login/Login';
import Register from '../components/login/Register';
import Dashboard from '../components/dashboard/Dashboard';
import Categories from '../components/categories/Categories';
import Income from '../components/income/Income';
import Budget from '../components/budget/Budget';
import Expenses from '../components/expenses/Expenses';
import Reports from '../components/reports/Reports';
import Networth from '../components/networth/Networth';
import Error404 from '../components/httpErrors/Error404';

const Router = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <PublicRoute exact={true} path="/" component={Login}/>
          <PublicRoute exact={true} path="/register" component={Register}/>
          <PrivateRoute exact={true} path="/dashboard" component={Dashboard}/>
          <PrivateRoute exact={true} path="/dashboard/categories" component={Categories}/>
          <PrivateRoute exact={true} path="/dashboard/income" component={Income}/>
          <PrivateRoute exact={true} path="/dashboard/budget" component={Budget}/>
          <PrivateRoute exact={true} path="/dashboard/expenses" component={Expenses}/>
          <PrivateRoute exact={true} path="/dashboard/reports" component={Reports}/>
          <PrivateRoute exact={true} path="/dashboard/networth" component={Networth}/>
          <Route path="*" component={Error404}/>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Router;