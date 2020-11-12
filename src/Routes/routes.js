import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import isAuthenticated from '../services/auth';

import Login from '../Pages/Login';
import Patrimonios from '../Pages/Patrimonios';
import Dashboard from '../Pages/Dashboard';
import Movimentacoes from '../Pages/Movimentacoes';

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => (
    isAuthenticated() ? (
      <Component {...props}/>
    ):
    <Redirect to={{pathname: '/login', state: {from: props.location}}} />
  )}
  />
)

const Routes = () => {
  return(
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <PrivateRoute exact path="/patrimonios" component={Patrimonios} />
        <PrivateRoute exact path="/movimentacoes" component={Movimentacoes} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;
