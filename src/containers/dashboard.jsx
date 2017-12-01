import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as calendarActions from '../actions/calendarActions';
import * as paymentActions from '../actions/paymentActions';
import * as accountActions from '../actions/accountActions';
import * as eventActions from '../actions/eventActions';

const cookieUtil = require('../utils/cookieUtil').default;
const config = require('../../config');
import get from 'lodash.get';

import Editor from '../components/editor';
import Header from '../components/header';
import SuccessfulLinkModal from '../components/modals/successfulLinkModal';
import SuggestionModals from '../components/modals/suggestionModals';

import cn from 'classnames';
import getCronofyAuthUrl from '../utils/getCronofyAuthUrl';

const mapState = ({ appState, form, eventcalState, eventState, onBoardingState }) => {
    return {
        appState,
        form,
        eventcalState,
        eventState,
        onBoardingState
    };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...appActions,
            ...calendarActions,
            ...paymentActions,
            ...accountActions,
            ...eventActions
        },
        dispatch
    );
};

const component = React.createClass({
    getInitialState() {
        return {
            userHasSeenSuccessfulLinkModal: cookieUtil.getItem('seen-successful-link-modal')
        };
    },
    componentWillUnmount() {
        this.props.blowState();
    },
    componentDidMount() {
        this.props.getUser();
        this.props.getCalendars(this.props.params.eventCalWidgetUuid);
        this.props.getSettings(this.props.params.eventCalWidgetUuid);
        this.props.getConnections();
        this.props.getOnboardingStatus();
    },
    userHasLinkedCalendarOrChosenManual() {
        return (this.props.appState.connections && this.props.appState.connections.length > 0) || (this.props.onBoardingState && this.props.onBoardingState.selected_manual_events);
    },
    render() {
        const { user, connections } = this.props.appState;
        const onBoarding = this.props.onBoardingState;

        const userHasRegisteredOrCancelled =
            user && (user.status === 'registered' || user.status === 'cancelled');
        const userHasSubscribed =
            user && (user.status !== 'cancelled' && user.status !== 'registered');

        const containerClassNames = cn(
            {
                'container-fluid':
                    this.userHasLinkedCalendarOrChosenManual() &&
                    (userHasSubscribed || userHasRegisteredOrCancelled)
            },
            { container: !this.userHasLinkedCalendarOrChosenManual() },
            'dashboard'
        );

        if (this.props.children) {
            return (
                <div style={{ height: '100%' }}>
                    {this.props.children}
                </div>
            );
        }
        return (
            <div style={{ height: '100vh', overflow: 'scroll', background: `${!this.userHasLinkedCalendarOrChosenManual() ? '#f5f5f5' : '#fff'}` }}>
                <SuggestionModals
                    status={get(this, 'props.appState.user.status')}
                />
                <Header
                    doNotDisplayDashboardLink={!this.userHasLinkedCalendarOrChosenManual()}
                    useFluidContainer={this.userHasLinkedCalendarOrChosenManual()}
                    loggedIn={true}
                />
                {this.props.location.query.showSuccessModal &&
                    !this.state.userHasSeenSuccessfulLinkModal &&
                    <SuccessfulLinkModal />}
                <div className={containerClassNames}>
                    <div className="row">
                    {(connections && onBoarding) &&
                        <Editor
                            connections={connections}
                            user={this.props.appState.user}
                            calendars={this.props.appState.calendars}
                            authUrl={getCronofyAuthUrl()}
                            suggestions={
                                this.props.appState.suggestions &&
                                !this.props.eventcalState.eventcalHasNoEvents
                            }
                            suggestionToggleAction={this.props.toggleSugesstions}
                            eventcalRemovedAction={this.props.eventcalRemoved}
                            eventcalHasNoEvents={this.props.eventcalState.eventcalHasNoEvents}
                            eventCalWidgetUuid={this.props.params.eventCalWidgetUuid}
                            onBoardingState={this.props.onBoardingState}
                            calendarBuildUrl={config.calendarBuildUrl}
                            userHasSubscribed={userHasSubscribed}
                        />}
                    </div>
                </div>
            </div>
        );
    }
});

export default connect(mapState, mapDispatch)(component);
