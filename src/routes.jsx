import { Route } from 'react-router';
import React from 'react';
import App from './containers/index.jsx';
import Login from './containers/login';
import Register from './containers/register';
import Dashboard from './containers/dashboard';
import Help from './containers/help';
import TransactionComplete from './containers/transactionComplete';
import NotFoundComponent from './containers/notFound';
import WeeblyIframe from './containers/weeblyIframe';
import Notifications from './containers/notifications';
import FailToLink from './containers/FailToLink';
import LinkCalendar from './containers/linkCalendar';
import ResetPassword from './containers/reset-password';
import Connections from './containers/connections';
import AddSubscription from './containers/AddSubscription';
import AccountError from './containers/accountError';
import NetworkError from './containers/networkError';
import PrivacyPolicy from './containers/privacyPolicy';
import TermsOfUse from './containers/termsOfUse';
import FacebookSelectPage from './containers/facebookSelectPage';
import FacebookAuthSuccess from './components/facebookAuth/facebookAuthSuccess';
import FacebookAuthFail from './components/facebookAuth/facebookAuthFail';
import Home from './containers/home';
import Account from './containers/account';
var cookieUtil = require('./utils/cookieUtil').default;
import request from 'superagent';
const config = require('../config');

function recordIntercomEvent(eventName) {
    if (window.Intercom) {
        Intercom('trackEvent', eventName);
    }
}

function restrictAccess(nextState, replace, callback) {
    const token = cookieUtil.getItem('eventcal-admin');
    if (!token) {
        replace({ pathname: '/login', query: { loginFailure: true } });
    }
    return callback();
}

function editorOnEnter(nextState, replace, callback) {
    const token = cookieUtil.getItem('eventcal-admin');
    if (!token) {
        replace({ pathname: '/login', query: { loginFailure: true } });
        return callback();
    }
    if (!nextState.params.eventCalWidgetUuid) {
        // get the users default widget
        return request.get(`${config.apiUrl}/widgets?token=${token}`).end((err, res) => {
            const defaultUuid = res.body && res.body[0] && res.body[0].uuid;
            if (defaultUuid) {
                replace(`/editor/${res.body[0].uuid}`);
            } else {
                replace('/home/account-error');
            }
            recordIntercomEvent('visited-dashboard-router-enter');
            callback();
        });
    }
    recordIntercomEvent('visited-dashboard-router-enter');
    callback();
}

export default store => {
    return (
        <Route component={App} name="app" path="/">
            <Route path="login" component={Login} />
            <Route path="dashboard" component={Home} onEnter={restrictAccess}>
                <Route path="transaction-complete" component={TransactionComplete} />
                <Route path="account-error" component={AccountError} />
                <Route path="network-error" component={NetworkError} />
            </Route>
            <Route
                onEnter={editorOnEnter}
                path="editor(/:eventCalWidgetUuid)"
                component={Dashboard}
            />
            <Route path="account" component={Account} onEnter={restrictAccess}/>
            <Route
                onEnter={() => recordIntercomEvent('visited-link-page-router-enter')}
                path="link-calendar"
                component={Dashboard}
            />
            <Route path="reset-password" component={ResetPassword} />
            <Route path="firsttime-link-calendar" component={Dashboard} />
            <Route path="register" component={Register} />
            <Route path="help" component={Help} />
            <Route path="privacy-policy" component={PrivacyPolicy} />
            <Route path="terms-of-use" component={TermsOfUse} />
            <Route path="/weebly-iframe" component={WeeblyIframe} />
            <Route path="/fail-to-link" component={FailToLink} />
            <Route path="/add-subscription" component={AddSubscription} />
            <Route path="/facebook/select-page" component={FacebookSelectPage} />
            <Route path="/facebook/auth-success" component={FacebookAuthSuccess} />
            <Route path="/facebook/auth-fail" component={FacebookAuthFail} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/connections" component={Connections} />
            <Route path="*" component={NotFoundComponent} />
        </Route>
    );
};
