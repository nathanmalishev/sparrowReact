import React from 'react';
import ReactRouter, { Router, Route, hashHistory, IndexRoute } from 'react-router';
import LoginContainer from '../containers/LoginContainer';
import HomeContainer from '../containers/HomeContainer';
import GroupContainer from '../containers/GroupContainer';
import FlightContainer from '../containers/FlightContainer';


const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={LoginContainer}>
      <IndexRoute component={HomeContainer} />
      <Route path='group/:id' component={GroupContainer}>
        <IndexRoute component={FlightContainer}/>
        <Route path='flights' component={FlightContainer}/>
      </Route>
    </Route>
  </Router>
);

export default routes;
