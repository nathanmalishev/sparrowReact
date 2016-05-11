import React from 'react';
import ReactRouter, { Router, Route, hashHistory, IndexRoute } from 'react-router';
import LoginContainer from '../containers/LoginContainer';
import HomeContainer from '../containers/HomeContainer';
import GroupContainer from '../containers/GroupContainer';
import FlightContainer from '../containers/FlightContainer';
import ExpensesContainer from '../containers/ExpensesContainer';
import SignUpContainer from '../containers/SignUpContainer';
import ForgotContainer from '../containers/ForgotContainer';
import ChatContainer from '../containers/ChatContainer'

const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={LoginContainer}>
      <IndexRoute component={HomeContainer} />
      <Route path='group/:id' component={GroupContainer}>
        <IndexRoute component={FlightContainer}/>
        <Route path='flights' component={FlightContainer}/>
        <Route path='chat' component={ChatContainer}/>
        <Route path='expenses' component={ExpensesContainer}/>
      </Route>
      <Route path='signup' component={SignUpContainer}/>
    </Route>
  </Router>
);

export default routes;
