import React, { Component, Fragment } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

import History from './services/History';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';


const authentication = () =>
  localStorage.getItem('icaseUser') ? <Redirect to="/app" /> : <PublicRoutes />;

function App() {
  return (
    <Fragment>
      <Router history={History}>
        <Switch>
          <Route path="/app" component={PrivateRoutes} />
          <Route path="" render={authentication} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
