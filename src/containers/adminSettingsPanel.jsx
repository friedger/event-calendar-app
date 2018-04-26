import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as calendarActions from '../actions/calendarActions';
import * as eventActions from '../actions/eventActions';
import * as manualEventActions from '../actions/manualEventActions';

import WidgetSettings from '../components/adminSettingsPanel/widgetSettings';
import EventSettings from '../components/adminSettingsPanel/eventSettings';
import EmbedCode from '../components/editor/embedCode';
import get from 'lodash.get';
import featurePermissions from '../utils/featurePermissions';
import NewPost from '../components/adminSettingsPanel/newPost';
import AddedFirstEventSuccess from '../components/modals/addedFirstEventSuccess';
import ManualEventsNotSelected from '../components/modals/manualEventsNotSelected';
import Filters from './filters';
import AdminSettingsPanelHeader from '../components/adminSettingsPanel/header';
import EventActions from '../components/adminSettingsPanel/eventActions';

const mapState = ({ appState, eventState, manualEventState, onBoardingState }) => {
    return {
        appState,
        eventState,
        manualEventState,
        onBoardingState
    };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...appActions,
            ...calendarActions,
            ...eventActions,
            ...manualEventActions
        },
        dispatch
    );
};

const component = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            displayConnectionsScreen: false,
            addCalendarSelected: false,
            displayAddEventScreen: false,
            eventHasBeenAdded: false,
            showFirstEventSuccessModal: false,
            turnOnManualEventsModal: false
        };
    },
    handleEventClick(e) {
        if (e.detail.opening) {
            if (this.userDoesNotNeedToAddAnEvent()) {
                this.props.closeNewEventForm();
                this.props.eventSelected(e.detail);
            }
        }
    },
    componentDidMount() {
        document.addEventListener('ECA_event-clicked', this.handleEventClick);
    },

    toggleConnectionsScreen() {
        this.context.router.push('/connections');
    },
    eventActivated() {
        return this.props.eventState.calendar_id && this.props.eventState.uuid;
    },
    addEventClicked() {
        if (!this.manualEventsSelected()) {
            return this.setState({ turnOnManualEventsModal: true });
        }
        this.props.openNewEventForm();
        this.props.addNewEvent();
    },
    userDoesNotNeedToAddAnEvent() {
        return (
            this.state.eventHasBeenAdded ||
            this.props.onBoardingState.linked_calendar ||
            this.props.onBoardingState.added_an_event ||
            this.props.onBoardingState.userHasNoOnboardingRecord
        );
    },
    exitAddEventScreen() {
        if (this.userDoesNotNeedToAddAnEvent()) {
            this.props.closeNewEventForm();
            return this.props.addNewEvent();
        }
        return alert('Add an event to continue');
    },
    editEventClicked() {
        this.props.eventSelected({
            calendar_id: this.props.manualEventState.calendarId,
            uuid: this.props.manualEventState.uuid,
            manualEvent: true
        });
        this.props.closeNewEventForm();
    },
    addNewEventClicked() {
        this.props.addNewEvent();
    },
    postManualEvent(event) {
        if (localStorage && !localStorage.getItem('onboarding.addedEvent')) {
            localStorage.setItem('onboarding.addedEvent', 1);
            this.setState({ showFirstEventSuccessModal: true });
        }
        this.props.postManualEvent(event);
        this.setState({ eventHasBeenAdded: true });
        const calendarToDeselect = this.props.appState.calendars.find(
            calendar => calendar.calendar_name === 'Demo Calendar'
        );
        this.props.putCalendars(
            this.props.eventCalWidgetUuid,
            calendarToDeselect.calendar_id,
            false
        );
    },
    deleteManualEvent() {
        const currentlySelectedEvent = this.props.eventState;
        this.props.deleteManualEvent({
            calendarId: currentlySelectedEvent.calendar_id,
            id: currentlySelectedEvent.id
        });
    },
    manualEventsSelected() {
        if (this.props.appState && this.props.appState.calendars) {
            return this.props.appState.calendars.find(calendar => {
                return calendar.calendar_type === 'manual' && calendar.selected === true;
            });
        }
        return false;
    },
    render() {
        const content = "'Editing this event'";
        return (
            <div className="dashboard-settings">
                {this.eventActivated() &&
                    <style>
                        {`
                            #event-calendar-app .calendar-list-view .calendar-list-event.uuid-${this.props.eventState.uuid}.col-md-12{
                                border: 3px solid #da4167 !important;
                                border-bottom: 3px solid #da4167 !important;
                            }
                            #event-calendar-app .calendar-list-event.uuid-${this.props.eventState.uuid}:after{
                                display: block;
                            }
                        `}
                    </style>
                }
                {/* Onboading modals*/}
                <AddedFirstEventSuccess
                    show={this.state.showFirstEventSuccessModal}
                    hide={() => this.setState({ showFirstEventSuccessModal: false })}
                />
                <ManualEventsNotSelected
                    show={this.state.turnOnManualEventsModal}
                    hide={() => this.setState({ turnOnManualEventsModal: false })}
                    continueAnyway={() => {
                        this.props.openNewEventForm();
                        this.props.addNewEvent();
                        this.setState({ turnOnManualEventsModal: false });
                    }}
                />
                {/* Different Headers*/}
                {this.eventActivated() && (
                    <div
                        onClick={() => this.props.exitEventSettings()}
                        className="dashboard-header__close"
                    >
                        <i
                            onClick={() => this.props.exitEventSettings()}
                            className="fa fa-times"
                            aria-hidden="true"
                        />{' '}
                    </div>
                )}
                {this.props.manualEventState.displayAddEventScreen && (
                    <div
                        onClick={() => this.exitAddEventScreen()}
                        className="dashboard-header__close"
                    >
                        <i className="fa fa-times" aria-hidden="true" />{' '}
                    </div>
                )}
                <AdminSettingsPanelHeader
                    eventActivated={this.eventActivated()}
                    addingEvent={this.props.manualEventState.displayAddEventScreen}
                    userIsAGuest={!this.props.userHasSubscribed}
                    eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                    displayEmbedCode={
                        !this.props.appState.user.weeblyUser &&
                        !this.eventActivated() &&
                        !this.props.manualEventState.displayAddEventScreen
                    }
                    user={get(this, 'props.appState.user')}

                />

                        {this.eventActivated() &&
                            !this.props.eventState.eventSettingsLoading && (
                                <EventSettings
                                    demoEvent={this.props.eventState.demoEventSelected}
                                    manualEventSelected={this.props.eventState.manualEventSelected}
                                    validWithPlan={
                                        get(this, 'props.appState.user.status') &&
                                        featurePermissions.checkFeatureAvailability(
                                            this.props.appState.user.status,
                                            'event-settings'
                                        )
                                    }
                                    putEventAction={this.props.putEvent.bind(
                                        null,
                                        this.props.eventState.calendar_id,
                                        this.props.eventState.uuid
                                    )}
                                    deleteManualEvent={this.deleteManualEvent}
                                    exitAction={this.props.exitEventSettings}
                                />
                            )}

                        {!this.eventActivated() &&
                            !this.props.eventState.eventSettingsLoading &&
                            !this.props.manualEventState.displayAddEventScreen && (
                                <WidgetSettings
                                    key={1}
                                    putCalendars={this.props.putCalendars}
                                    calendarsLoading={this.props.appState.calendarsLoading}
                                    calendars={this.props.appState.calendars}
                                    putSettings={this.props.putSettings}
                                    addEventClicked={this.addEventClicked}
                                    toggleConnectionsScreen={this.toggleConnectionsScreen}
                                    eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                                    userStatus={get(this, 'props.appState.user.status')}
                                    canvasBackgroundModified={this.props.canvasBackgroundModified}
                                />
                            )}

                        {this.props.manualEventState.displayAddEventScreen && (
                            <NewPost
                                manualEventState={this.props.manualEventState}
                                postManualEvent={this.postManualEvent}
                                close={this.exitAddEventScreen}
                                manualEventsSelected={this.manualEventsSelected()}
                                editEventClicked={this.editEventClicked}
                                addNewEventClicked={this.addNewEventClicked}
                            />
                        )}
                {this.eventActivated() &&
                    !this.props.eventState.eventSettingsLoading &&
                <EventActions
                    exitAction={this.props.exitEventSettings}
                    deleteManualEvent={this.props.eventState.manualEventSelected && this.deleteManualEvent}
                />}
            </div>
        );
    },
    componentWillUnmount() {
        document.removeEventListener('ECA_event-clicked', this.handleEventClick);
    }
});

export default connect(mapState, mapDispatch)(component);
