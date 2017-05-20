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

function recordIntercomEvent(eventName) {
    if (window.Intercom) {
        Intercom('trackEvent', eventName);
    }
}

export default (store) => {
    return (
        <Route component={App} name='app' path='/'>
            <Route path="login" component={Login} />
            <Route onEnter={() => recordIntercomEvent('visited-dashboard-router-enter')} path="dashboard" component={Dashboard}>
                <Route path="transaction-complete" component={TransactionComplete} />
                <Route path="plans" component={Plans}/>
            </Route>
            <Route onEnter={() => recordIntercomEvent('visited-link-page-router-enter')} path="link-calendar" component={Dashboard}/>
            <Route path="firsttime-link-calendar" component={Dashboard} />
            <Route path="register" component={Register} />
            <Route path="help" component={Help} />
            <Route path="/weebly-iframe" component={WeeblyIframe} />
            <Route path="/fail-to-link" component={FailToLink} />
            <Route path="/add-subscription" component={AddSubscription} />
            <Route path="*" component={NotFoundComponent} />
        </Route>
    )
};
