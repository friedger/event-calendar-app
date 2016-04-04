import { Route } from 'react-router';
import React from 'react';
import App from './containers/index.jsx';
import Login from './containers/login';
import Register from './containers/register';
import Dashboard from './containers/dashboard';

const routes = (
    <Route component={App} name='app' path='/'>
        <Route path="login" component={Login} />
        <Route path="dashboard" component={Dashboard} />
        <Route path="register" component={Register} />
    </Route>
);

module.exports = routes;
