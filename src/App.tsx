import { Fragment } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

import PublicRoutes from './routes/PublicRoutes';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import PrivateRoutes from './routes/PrivateRoutes';
import history from './services/history'

const authentication = () =>
  localStorage.getItem('icaseUser') ? <Redirect to="/home" /> : <PublicRoutes />;

function App() {
  return (
    <Fragment>
      <Router history={history}>
        <Switch>
          <Route path="/home" component={PrivateRoutes} />
          <Route path="" render={authentication} />
        </Switch>
      </Router>
    </Fragment>

  );
}

export default App;
