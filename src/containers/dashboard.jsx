import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as calendarActions from '../actions/calendarActions';
import * as paymentActions from '../actions/paymentActions';

const cookieUtil = require('../utils/cookieUtil').default;
const config = require('../../config');

import RegisteredUser from '../components/registeredUser';
import SubscriptionUser from '../components/subscriptionUser';
import Header from '../components/header';
import SuccessfulLinkModal from '../components/successfulLinkModal';
import SuggestionModals from '../components/suggestionModals';

import cn from 'classnames';
import getCronofyAuthUrl from '../utils/getCronofyAuthUrl';

import {Row, Col} from 'react-bootstrap';

const mapState = ({appState, form, eventcalState}) => {
    return {
        appState,
        form,
        eventcalState
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
    getInitialState() {
        return {userHasSeenSuccessfulLinkModal: cookieUtil.getItem('seen-successful-link-modal')};
    },
    componentDidMount() {
        this.props.getUser();
        this.props.getCalendars(this.props.params.eventCalWidgetUuid);
        this.props.getSettings(this.props.params.eventCalWidgetUuid);
        this.props.getConnections();
    },
    render() {
        const {user, connections} = this.props.appState;
        const authUrl = getCronofyAuthUrl();
        const testMode = this.props.location.query.testMode;

        const userHasRegisteredOrCancelled = user && (user.status === 'registered' || user.status === 'cancelled');
        const userHasSubscribed = user && user.status === 'subscription';

        const containerClassNames = cn({
            'container-fluid': connections && connections.length > 0 && (userHasSubscribed || userHasRegisteredOrCancelled)
        },
        {'container': connections && (connections.length === 0)}, 'dashboard');

        if (this.props.children) {
            return (
                <div style={{height: '100%'}}>{this.props.children}</div>
            )
        }

        return (
            <div style={{height: '100%'}}>
                <SuggestionModals></SuggestionModals>
                <Header doNotDisplayDashboardLink={(connections && connections.length === 0)} useFluidContainer={(connections && connections.length > 0)} loggedIn={true}/>
                {this.props.location.query.showSuccessModal && !this.state.userHasSeenSuccessfulLinkModal && <SuccessfulLinkModal/>}
                <div className={containerClassNames}>
                    {userHasRegisteredOrCancelled && connections &&
                        <RegisteredUser
                            testMode={testMode}
                            user={this.props.appState.user}
                            submitPaymentAction={this.props.submitPayment}
                            calendars={this.props.appState.calendars}
                            connections={connections}
                            authUrl={getCronofyAuthUrl()}
                            connections={connections}
                            suggestions={this.props.appState.suggestions}
                            suggestionToggleAction={this.props.toggleSugesstions}
                            eventcalRemovedAction={this.props.eventcalRemoved}
                            eventcalHasNoEvents={this.props.eventcalState.eventcalHasNoEvents}
                            eventCalWidgetUuid={this.props.params.eventCalWidgetUuid}
                        />}
                    {userHasSubscribed && connections &&
                        <SubscriptionUser
                            connections={connections}
                            user={this.props.appState.user}
                            calendarBuildUrl={config.calendarBuildUrl}
                            calendars={this.props.appState.calendars}
                            authUrl={getCronofyAuthUrl()}
                            suggestions={this.props.appState.suggestions && !this.props.eventcalState.eventcalHasNoEvents}
                            suggestionToggleAction={this.props.toggleSugesstions}
                            eventcalRemovedAction={this.props.eventcalRemoved}
                            eventcalHasNoEvents={this.props.eventcalState.eventcalHasNoEvents}
                            eventCalWidgetUuid={this.props.params.eventCalWidgetUuid}
                        />}
                </div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
