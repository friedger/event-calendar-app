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
import FailToLink from './containers/FailToLink';
import LinkCalendar from './containers/LinkCalendar';
import AddSubscription from './containers/AddSubscription';
import Plans from './containers/plans';
import AccountError from './containers/accountError';
import NetworkError from './containers/networkError';
import PrivacyPolicy from './containers/privacyPolicy';
import TermsOfUse from './containers/termsOfUse';
import FacebookSelectPage from './containers/facebookSelectPage';
import FacebookAuthSuccess from './components/facebookAuthSuccess';
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

function editorOnEnter(nextState, replace, callback) {
    if (!nextState.params.eventCalWidgetUuid) {
        //get the users default widget
        const token = cookieUtil.getItem('eventcal-admin');
        return request.get(`${config.apiUrl}/widgets?token=${token}`)
        .end((err, res) => {
            const defaultUuid = res.body && res.body[0] && res.body[0].uuid;
            if (defaultUuid) {
                replace(`/editor/${res.body[0].uuid}`)
            } else {
                replace('/home/account-error')
            }
            recordIntercomEvent('visited-dashboard-router-enter');
            callback();
        });
    }
    recordIntercomEvent('visited-dashboard-router-enter');
    callback();
}

export default (store) => {
    return (
        <Route component={App} name='app' path='/'>
            <Route path="login" component={Login} />
            <Route path="dashboard" component={Home}>
                <Route path="transaction-complete" component={TransactionComplete} />
                <Route path="plans" component={Plans}/>
                <Route path="account-error" component={AccountError} />
                <Route path="network-error" component={NetworkError} />
            </Route>
            <Route onEnter={editorOnEnter} path="editor(/:eventCalWidgetUuid)" component={Dashboard}></Route>
            <Route path="account" component={Account}></Route>
            <Route onEnter={() => recordIntercomEvent('visited-link-page-router-enter')} path="link-calendar" component={Dashboard}/>
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
            <Route path="*" component={NotFoundComponent} />
        </Route>
    )
};
