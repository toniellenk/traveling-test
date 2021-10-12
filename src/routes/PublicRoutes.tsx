import React, { Fragment } from 'react';
import { Switch } from 'react-router-dom';
import Route from './Routers';

import Login from '../views/public/Login';
// import EsqueciSenha from '~/views/public/EsqueciSenha';
// import ConfirmacaoEmail from '~/views/public/ConfirmarEmail';
// import RecuperarSenha from '~/views/public/RecuperarSenha';
// import DeskAtendimentos from '~/views/public/Desktop/Atendimentos';

const PublicRoutes = () => (
    <Fragment>
        <Switch>
            <Route path="/" exact component={Login} />
            {/* <Route path="/esqueci-senha" exact component={EsqueciSenha} />
      <Route path="/auth/confirmar-email" exact component={ConfirmacaoEmail} />
      <Route path="/auth/recuperar-senha" exact component={RecuperarSenha} />
      <Route path="/auth/atendimentos" exact component={DeskAtendimentos} /> */}
        </Switch>
    </Fragment>
);

export default PublicRoutes;
