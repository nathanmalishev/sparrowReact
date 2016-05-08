import React from 'react';
import ReactRouter, { Router, Route, hashHistory, IndexRoute } from 'react-router';
import LoginContainer from '../containers/LoginContainer';
import HomeContainer from '../containers/HomeContainer';
import GroupContainer from '../containers/GroupContainer';
import FlightContainer from '../containers/FlightContainer';
import ExpensesContainer from '../containers/ExpensesContainer';
import ExpensesCreateContainer from '../containers/ExpensesCreateContainer';
import ExpensesListContainer from '../containers/ExpensesListContainer';
import SignUpContainer from '../containers/SignUpContainer';
import ForgotContainer from '../containers/ForgotContainer';

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={LoginContainer}>
      <IndexRoute component={HomeContainer} />
      <Route path='group/:id' component={GroupContainer}>
        <IndexRoute component={FlightContainer}/>
        <Route path='flights' component={FlightContainer}/>
        <Route path='expenses' component={ExpensesContainer}/>
          <Route path='newexpense' component={ExpensesCreateContainer}/>
          <Route path='expenseshistory' component={ExpensesListContainer}/>
      </Route>
      <Route path='signup' component={SignUpContainer}/>
    </Route>
  </Router>
);

export default routes;
