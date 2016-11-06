import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as calendarActions from '../actions/calendarActions';
import * as paymentActions from '../actions/paymentActions';

const cookieUtil = require('../utils/cookieUtil').default;
const config = require('../../config');

import CalendarCodeTextArea from '../components/calendarCodeTextArea';
import RegisteredUser from '../components/registeredUser';
import SubscriptionUser from '../components/subscriptionUser';
import Header from '../components/header';
import cn from 'classnames';

import {Row, Col} from 'react-bootstrap';

const mapState = ({appState, form}) => {
    return {
        appState,
        form
    }
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        ...appActions,
        ...calendarActions,
        ...paymentActions
    }, dispatch);
}

function addScriptToPage(userId) {
    addEventcalScript(userId);
}

var calendarHasBeenRendered;

const component = React.createClass({
    componentDidMount() {
        this.props.getUser();
        this.props.getCalendars();
        this.props.getSettings();
    },

    _getSelectedCalendars() {
        if (!this.props.form.calendarSelection) {
            return [];
        }

        return Object.keys(this.props.form.calendarSelection)
        .filter(key => key.charAt(0) !== '_')
        .reduce((collection, current) => {
            if (this.props.form.calendarSelection[current].value) {
                collection.push(current);
            }
            return collection;
        }, []);
    },

    _getCalendarFormInitialValues() {
        return Object.keys(this.props.appState.user.calendars).reduce((collection, current) => {
            collection[current] = this.props.appState.user.calendars[current].selected;
            return collection;
        }, {});
    },

    render() {
        const {user} = this.props.appState;
        const authUrl = `${config.apiUrl}/authenticate?token=${cookieUtil.getItem('eventcal-admin')}`;

        const userHasRegisteredOrCancelled = user && (user.status === 'registered' || user.status === 'cancelled');
        const userHasSubscribed = user && user.status === 'subscription';

        const containerClassNames = cn({
            'container-fluid': user && user.calendarAuthorised && (userHasSubscribed || userHasRegisteredOrCancelled)
        },
        {'container': user && !user.calendarAuthorised}, 'dashboard');

        if (this.props.children) {
            return (
                <div>{this.props.children}</div>
            )
        }
        return (
            <div>
                <Header useFluidContainer={(user && user.calendarAuthorised)} loggedIn={true}/>
                <div className={containerClassNames}>
                    {userHasRegisteredOrCancelled &&
                        <RegisteredUser putCalendars={this.props.putCalendars}
                            putSettings={this.props.putSettings}
                            selectedCalendars={this._getSelectedCalendars()}
                            calendarFormInitialValues={this._getCalendarFormInitialValues()}
                            user={this.props.appState.user}
                            calendarSelectionForm={this.props.form.calendarSelection}
                            submitPaymentAction={this.props.submitPayment}
                            authUrl={`${config.apiUrl}/authenticate?token=${cookieUtil.getItem('eventcal-admin')}`} />}
                            {userHasSubscribed &&
                                <SubscriptionUser
                                    putCalendars={this.props.putCalendars}
                                    putSettings={this.props.putSettings}
                                    selectedCalendars={this._getSelectedCalendars()}
                                    calendarFormInitialValues={this._getCalendarFormInitialValues()}
                                    user={this.props.appState.user}
                                    calendarBuildUrl={config.calendarBuildUrl}
                                    calendarSelectionForm={this.props.form.calendarSelection}
                                    authUrl={`${config.apiUrl}/authenticate?token=${cookieUtil.getItem('eventcal-admin')}`} />}
                                </div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
