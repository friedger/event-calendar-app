import React from 'react';
import { Route, Redirect } from 'react-router-dom';
var cookieUtil = require('../../utils/cookieUtil').default;

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            cookieUtil.getItem('eventcal-admin') ? (
                <Component {...props} />
            ) : (
                <Redirect exact to='/login?loginFailure=true' />
            )
        }
    />
);

export default ProtectedRoute;
