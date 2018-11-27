import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as calendarActions from '../actions/calendarActions';
import * as paymentActions from '../actions/paymentActions';
import * as accountActions from '../actions/accountActions';
import * as eventActions from '../actions/eventActions';
import * as onBoardingActions from '../actions/onBoardingActions';
import * as widgetActions from '../actions/widgetActions';

const cookieUtil = require('../utils/cookieUtil').default;
const config = require('../../config');
import get from 'lodash.get';

import Editor from '../components/editor';
import Header from '../components/header';
import SuccessfulLinkModal from '../components/modals/successfulLinkModal';
import SuggestionModals from '../components/modals/suggestionModals';
import AddedScriptModal from '../components/modals/addedScriptModal';
import WidgetWelcomeModal from '../components/editor/widgetWelcomeModal';

import cn from 'classnames';
import getCronofyAuthUrl from '../utils/getCronofyAuthUrl';

const mapState = ({ appState, form, eventcalState, eventState, onBoardingState, eventSavingState, widgetState, account }) => {
    return {
        appState,
        form,
        eventcalState,
        eventState,
        onBoardingState,
        eventSavingState,
        widgetState,
        account
    };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...appActions,
            ...calendarActions,
            ...paymentActions,
            ...accountActions,
            ...eventActions,
            ...onBoardingActions,
            ...widgetActions
        },
        dispatch
    );
};

const component = React.createClass({
    getInitialState() {
        return {
            userHasSeenSuccessfulLinkModal: cookieUtil.getItem('seen-successful-link-modal'),
            displayAddedScriptModal: false
        };
    },
    componentWillUnmount() {
        this.props.blowState();
        document.removeEventListener('ECA_essential_loaded', this.ecaEssentialLoadedHandler);
        if (this.unsubscribe) {
            // usubscribe may not be available if person leaves page before ECA_ESSENTIAL_LOADED fires
            this.unsubscribe();
        }
    },
    componentDidMount() {
        this.props.getUser();
        this.props.getCalendars(this.props.params.eventCalWidgetUuid);
        this.props.getSettings(this.props.params.eventCalWidgetUuid);
        this.props.getConnections();
        this.props.getPlan();
        this.props.getWidget(this.props.params.eventCalWidgetUuid);
        this.props.getOnboarding();
        document.addEventListener('ECA_essential_loaded', this.ecaEssentialLoadedHandler);
    },
    ecaEssentialLoadedHandler() {
        this.unsubscribe = window.eventCalendarAppUtilities.store.subscribe(() => {
            const state = window.eventCalendarAppUtilities.store.getState();
            if (state.app.refreshLoading) {
                this.props.widgetRefreshing();
            } else {
                this.props.widgetRefreshingFinished();
            }
        });
    },
    userHasLinkedCalendarOrChosenManual() {
        return (
            (this.props.appState.connections && this.props.appState.connections.length > 0) ||
            (this.props.onBoardingState && this.props.onBoardingState.selected_manual_events)
        );
    },
    render() {
        const { user, connections, settingsLoaded } = this.props.appState;
        const onBoarding = this.props.onBoardingState;
        const widgetHasAnAlias = get(this.props.widgetState, 'widget.alias');
        const widgetHasLoaded = get(this.props.widgetState, 'widget');

        const userHasRegisteredOrCancelled = user && (user.status === 'registered' || user.status === 'cancelled');
        const userHasSubscribed = user && (user.status !== 'cancelled' && user.status !== 'registered');

        const containerClassNames = cn(
            {
                'container-fluid': this.userHasLinkedCalendarOrChosenManual() && (userHasSubscribed || userHasRegisteredOrCancelled)
            },
            { container: !this.userHasLinkedCalendarOrChosenManual() },
            'dashboard'
        );

        if (this.props.children) {
            return <div style={{ height: '100%' }}>{this.props.children}</div>;
        }
        return (
            <div
                id="editor-container"
                style={{
                    height: '100vh',
                    background: `${!this.userHasLinkedCalendarOrChosenManual() ? '#f5f5f5' : '#fff'}`
                }}
            >
                {widgetHasLoaded &&
                    !widgetHasAnAlias && (
                        <WidgetWelcomeModal
                            show={!widgetHasAnAlias}
                            hide={() => {
                                this.props.getWidget(this.props.params.eventCalWidgetUuid);
                                this.props.getCalendars(this.props.params.eventCalWidgetUuid);
                            }}
                            lastKnownSuccessfulAlias={this.props.widgetState.lastKnownSuccessfulAlias}
                        />
                    )}
                <div className={cn({ blur: widgetHasLoaded && !widgetHasAnAlias })}>
                    <SuggestionModals status={get(this, 'props.appState.user.status')} />
                    <AddedScriptModal
                        show={this.state.displayAddedScriptModal}
                        hide={() => {
                            this.setState({ displayAddedScriptModal: false });
                        }}
                    />
                    <Header
                        doNotDisplayDashboardLink={!this.userHasLinkedCalendarOrChosenManual()}
                        useFluidContainer={this.userHasLinkedCalendarOrChosenManual()}
                        loggedIn={true}
                    />
                    {this.props.location.query.showSuccessModal && !this.state.userHasSeenSuccessfulLinkModal && <SuccessfulLinkModal />}
                    <div className={containerClassNames}>
                        <div className="row">
                            {connections &&
                                onBoarding &&
                                user && settingsLoaded && (
                                    <Editor
                                        connections={connections}
                                        user={this.props.appState.user}
                                        appState={this.props.appState}
                                        accountState={this.props.account}
                                        calendars={this.props.appState.calendars}
                                        authUrl={getCronofyAuthUrl()}
                                        suggestions={this.props.appState.suggestions && !this.props.eventcalState.eventcalHasNoEvents}
                                        savingEvent={this.props.eventSavingState.savingEvent}
                                        suggestionToggleAction={this.props.toggleSugesstions}
                                        eventcalRemovedAction={this.props.eventcalRemoved}
                                        eventcalHasNoEvents={this.props.eventcalState.eventcalHasNoEvents}
                                        eventCalWidgetUuid={this.props.params.eventCalWidgetUuid}
                                        onBoardingState={this.props.onBoardingState}
                                        calendarBuildUrl={config.calendarBuildUrl}
                                        userHasSubscribed={userHasSubscribed}
                                        postOnBoarding={this.props.postOnBoarding}
                                        userSelectedScriptAdded={() => {
                                            this.props.postOnBoarding(
                                                {
                                                    user_clicked_added_script: true
                                                },
                                                true
                                            );
                                            this.setState({
                                                displayAddedScriptModal: true
                                            });
                                        }}
                                    />
                                )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default connect(mapState, mapDispatch)(component);
