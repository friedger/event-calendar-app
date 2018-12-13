import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';

import Login from './containers/login';
import Register from './containers/register';
import Dashboard from './containers/dashboard';
import Help from './containers/help';
import TransactionComplete from './containers/transactionComplete';
import NotFoundComponent from './containers/notFound';
import WeeblyIframe from './containers/weeblyIframe';
import Notifications from './containers/notifications';
import FailToLink from './containers/FailToLink';
import ResetPassword from './containers/reset-password';
import Connections from './containers/connections';
import AddSubscription from './containers/AddSubscription';
import AccountError from './containers/accountError';
import NetworkError from './containers/networkError';
import PrivacyPolicy from './containers/privacyPolicy';
import TermsOfUse from './containers/termsOfUse';
import Home from './containers/home';
import Account from './containers/account';

export default React.createClass({
    render() {
        return (
            <Switch>
                <ProtectedRoute exact path="/dashboard" component={Home} />
                <ProtectedRoute exact path="/dashboard/transaction-complete" component={TransactionComplete} />
                <ProtectedRoute exact path="/dashboard/account-error" component={AccountError} />
                <ProtectedRoute exact path="/dashboard/network-error" component={NetworkError} />
                <Route path="/login" component={Login} />
                <Route path="/editor/:eventCalWidgetUuid?" component={Dashboard} />
                <ProtectedRoute path="/account" component={Account} />
                <Route
                    exact
                    path="/link-calendar"
                    component={Dashboard}
                />
                <Route path="/reset-password" component={ResetPassword} />
                <Route path="/register" component={Register} />
                <Route path="/help" component={Help} />
                <Route path="/privacy-policy" component={PrivacyPolicy} />
                <Route path="/terms-of-use" component={TermsOfUse} />
                <Route path="/weebly-iframe" component={WeeblyIframe} />
                <Route path="/fail-to-link" component={FailToLink} />
                <Route path="/add-subscription" component={AddSubscription} />
                <Route path="/notifications" component={Notifications} />
                <Route path="/connections" component={Connections} />
                <Route component={NotFoundComponent} />
            </Switch>
        );
    }
});
