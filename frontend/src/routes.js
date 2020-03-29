import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes() {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Logon} /> {/*o exact serve para informar que esta é a rota raiz, deve procurar exatamente essa string*/}
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/incidents/new" component={NewIncident} />
        </Switch>
        </BrowserRouter>
    )
}