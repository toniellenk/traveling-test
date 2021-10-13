import { Fragment } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

import PublicRoutes from './routes/PublicRoutes';
import { Redirect } from 'react-router-dom';



function App() {
  return (
    <Fragment>
        {localStorage.getItem('appUser') ? <Redirect to="/app" /> : <PublicRoutes />};
    </Fragment>

  );
}

export default App;
