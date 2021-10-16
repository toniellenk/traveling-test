import { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../views/private/Home';


const PrivateRoutes = () => (
    <Fragment>
        <Switch>
            <Route path="/home" component={Home} />
            <Redirect exact from="/" to="/home" />
        </Switch>
    </Fragment>
);

export default PrivateRoutes;
