import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Login from '../views/public/Login';
import Cadastro from '../views/public/Cadastro';


const PublicRoutes = () => (
    <>
        <Router>
            <Switch>
                <Route path="/cadastro" component={Cadastro} />
                <Route path="/login" component={Login} />
                <Redirect exact from="/" to="/login" />
            </Switch>
        </Router>
    </>
);


export default PublicRoutes;
