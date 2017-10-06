import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as calendarActions from '../actions/calendarActions';
import * as eventActions from '../actions/eventActions';
import * as manualEventActions from '../actions/manualEventActions';

import WidgetSettings from '../components/widgetSettings';
import EventSettings from '../components/eventSettings';
import EmbedCode from '../components/embedCode';
import get from 'lodash.get';
import featurePermissions from '../utils/featurePermissions';
import NewPost from '../components/newPost';

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
            eventHasBeenAdded: false
        };
    },
    componentDidMount() {
        document.addEventListener('ECA_event-clicked', e => {
            if (e.detail.opening) {
                this.props.closeNewEventForm();
                this.props.eventSelected(e.detail);
            }
        });
    },

    toggleConnectionsScreen() {
        this.context.router.push('/connections');
    },
    eventActivated() {
        return this.props.eventState.calendar_id && this.props.eventState.uuid;
    },
    addEventClicked() {
        this.props.openNewEventForm();
        this.props.addNewEvent();
    },
    exitAddEventScreen() {
        if (
            this.state.eventHasBeenAdded ||
            this.props.onBoardingState.linked_calendar ||
            this.props.onBoardingState.added_an_event
        ) {
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
        this.props.deleteManualEvent({ calendarId: currentlySelectedEvent.calendar_id, id: currentlySelectedEvent.id });
    },
    render() {
        return (
            <div className="dashboard-settings">
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
                        <i
                            className="fa fa-times"
                            aria-hidden="true"
                        />{' '}
                    </div>
                )}
                <div className="dashboard-header dashboard-header--right row">
                    <div className="col-md-12">
                        {this.eventActivated() && (
                            <span className="dashboard-header__event-settings">Event settings</span>
                        )}
                        {this.props.manualEventState.displayAddEventScreen && (
                            <span className="dashboard-header__event-settings">Add new event</span>
                        )}
                        {!this.eventActivated() &&
                            !this.props.manualEventState.displayAddEventScreen && (
                                <span>Event calendar settings</span>
                            )}
                        {!this.props.appState.user.weeblyUser && (
                            <EmbedCode
                                eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                                userIsAGuest={this.props.appState.user.status === 'registered'}
                                userId={this.props.appState.user.userId}
                                shopifyUser={this.props.appState.user.shopifyUser}
                                calendarBuildUrl={this.props.calendarBuildUrl}
                            />
                        )}
                    </div>
                </div>
                <div className="row">
                    <div
                        className="col-md-12"
                        style={{ overflow: 'scroll', height: 'calc(100vh - 130px)' }}
                    >
                        <EventSettings
                            demoEvent={this.props.eventState.demoEventSelected}
                            show={
                                this.eventActivated() && !this.props.eventState.eventSettingsLoading
                            }
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

                        {this.props.manualEventState.displayAddEventScreen ? (
                            <NewPost
                                manualEventState={this.props.manualEventState}
                                postManualEvent={this.postManualEvent}
                                close={this.exitAddEventScreen}
                                editEventClicked={this.editEventClicked}
                                addNewEventClicked={this.addNewEventClicked}
                            />
                        ) : (
                            <WidgetSettings
                                key={1}
                                show={
                                    !this.eventActivated() &&
                                    !this.props.eventState.eventSettingsLoading
                                }
                                putCalendars={this.props.putCalendars}
                                calendarsLoading={this.props.appState.calendarsLoading}
                                calendars={this.props.appState.calendars}
                                putSettings={this.props.putSettings}
                                addEventClicked={this.addEventClicked}
                                toggleConnectionsScreen={this.toggleConnectionsScreen}
                                eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                                userStatus={get(this, 'props.appState.user.status')}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
});

export default connect(mapState, mapDispatch)(component);
