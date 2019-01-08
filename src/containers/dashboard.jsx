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
import { parse } from 'query-string';
import { withRouter } from 'react-router-dom';

import Editor from '../components/editor';
import SuccessfulLinkModal from '../components/modals/successfulLinkModal';
import SuggestionModals from '../components/modals/suggestionModals';
import AddedScriptModal from '../components/modals/addedScriptModal';
import WidgetWelcomeModal from '../components/editor/widgetWelcomeModal';

import cn from 'classnames';
import getCronofyAuthUrl from '../utils/getCronofyAuthUrl';
import request from 'superagent';
import intercom from '../utils/intercom';

const mapState = ({ appState, form, eventcalState, eventState, onBoardingState, eventSavingState, widgetState, account, manualEventState }) => {
    return {
        appState,
        form,
        eventcalState,
        eventState,
        onBoardingState,
        eventSavingState,
        widgetState,
        account,
        manualEventState
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

const Dashboard = React.createClass({
    getInitialState() {
        return {
            userHasSeenSuccessfulLinkModal: cookieUtil.getItem('seen-successful-link-modal'),
            displayAddedScriptModal: false
        };
    },
    componentWillMount() {
        if (this.props.location.pathname.indexOf('link-calendar') > -1) {
            return intercom.trackEvent('visited-link-page-router-enter');
        }
        if (this.props.location.pathname.indexOf('editor') > -1) {
            const token = cookieUtil.getItem('eventcal-admin');
            if (!token) {
                return this.props.history.replace({ pathname: '/login', query: { loginFailure: true } });
            }
            if (!this.props.match.params.eventCalWidgetUuid) {
                // get the users default widget
                return request.get(`${config.apiUrl}/widgets?token=${token}`).end((err, res) => {
                    const defaultUuid = res.body && res.body[0] && res.body[0].uuid;
                    if (defaultUuid) {
                        const query = parse(location.search);
                        if (query.cronofySuccess) {
                            this.props.history.replace(`/editor/${res.body[0].uuid}/sources?cronofySuccess=true`);
                            return this.props.getWidget(res.body[0].uuid);
                        }
                        this.props.history.replace(`/editor/${res.body[0].uuid}`);
                        this.props.getWidget(res.body[0].uuid);
                    } else {
                        this.props.history.replace('/home/account-error');
                    }
                    intercom.trackEvent('visited-dashboard-router-enter');
                });
            }
            intercom.trackEvent('visited-dashboard-router-enter');
        }
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
        const eventCalWidgetUuid = this.props.match.params.eventCalWidgetUuid;
        if (eventCalWidgetUuid) {
            this.props.getWidget(eventCalWidgetUuid);
        }
        this.props.getCalendars(eventCalWidgetUuid);
        this.props.getSettings(eventCalWidgetUuid);
        this.props.getUser();
        this.props.getConnections();
        this.props.getPlan();
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
        const match = this.props.match;
        const widgetHasAnAlias = get(this.props.widgetState, 'widget.alias');
        const widgetHasLoaded = get(this.props.widgetState, 'widget');

        const userHasRegisteredOrCancelled = user && (user.status === 'registered' || user.status === 'cancelled');
        const userHasSubscribed = user && (user.status !== 'cancelled' && user.status !== 'registered');
        const query = parse(location.search);
        const containerClassNames = cn(
            {
                '': this.userHasLinkedCalendarOrChosenManual() && (userHasSubscribed || userHasRegisteredOrCancelled)
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
                    height: `${this.userHasLinkedCalendarOrChosenManual() ? '100vh' : 'auto'}`,
                    background: `${!this.userHasLinkedCalendarOrChosenManual() ? '#f5f5f5' : '#fff'}`
                }}
            >
                {widgetHasLoaded &&
                    !widgetHasAnAlias && (
                        <WidgetWelcomeModal
                            show={!widgetHasAnAlias}
                            hide={() => {
                                this.props.getWidget(match.params.eventCalWidgetUuid);
                                this.props.getCalendars(match.params.eventCalWidgetUuid);
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
                    {query.showSuccessModal && !this.state.userHasSeenSuccessfulLinkModal && <SuccessfulLinkModal />}
                    <div className={containerClassNames}>
                        <div className={`${!this.userHasLinkedCalendarOrChosenManual() ? 'row' : ''}`}>
                            {connections &&
                                onBoarding &&
                                user && settingsLoaded && (
                                    <Editor
                                        connections={connections}
                                        user={this.props.appState.user}
                                        appState={this.props.appState}
                                        accountState={this.props.account}
                                        eventState={this.props.eventState}
                                        calendars={this.props.appState.calendars}
                                        authUrl={getCronofyAuthUrl()}
                                        suggestions={this.props.appState.suggestions && !this.props.eventcalState.eventcalHasNoEvents}
                                        savingEvent={this.props.eventSavingState.savingEvent}
                                        suggestionToggleAction={this.props.toggleSugesstions}
                                        eventcalRemovedAction={this.props.eventcalRemoved}
                                        eventcalHasNoEvents={this.props.eventcalState.eventcalHasNoEvents}
                                        eventCalWidgetUuid={match.params.eventCalWidgetUuid}
                                        onBoardingState={this.props.onBoardingState}
                                        calendarBuildUrl={config.calendarBuildUrl}
                                        userHasSubscribed={userHasSubscribed}
                                        postOnBoarding={this.props.postOnBoarding}
                                        manualEventState={this.props.manualEventState}
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

export default withRouter(connect(mapState, mapDispatch)(Dashboard));
