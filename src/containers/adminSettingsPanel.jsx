import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { EDITOR_PATH } from '../routes';

import * as appActions from '../actions/index';
import * as calendarActions from '../actions/calendarActions';
import * as eventActions from '../actions/eventActions';
import * as manualEventActions from '../actions/manualEventActions';

import EventSettings from '../components/adminSettingsPanel/eventSettings';
import get from 'lodash.get';
import featurePermissions from '../utils/featurePermissions';
import NewPost from '../components/adminSettingsPanel/newPost';
import Sources from '../components/adminSettingsPanel/containers/sources';
import Layout from '../components/adminSettingsPanel/containers/layout';
import Design from '../components/adminSettingsPanel/containers/design';
import AddedFirstEventSuccess from '../components/modals/addedFirstEventSuccess';
import ManualEventsNotSelected from '../components/modals/manualEventsNotSelected';
import CategoryHeader from '../components/adminSettingsPanel/categoryHeader';
import EventActions from '../components/adminSettingsPanel/eventActions';
import { withRouter } from 'react-router-dom';
import SettingsCategorySelection from '../components/adminSettingsPanel/settingsCategorySelection';
import SidePanelWrapper from '../components/adminSettingsPanel/sidePanelWrapper';
import SidePanelContainer from '../components/adminSettingsPanel/sidePanelContainer';
import SelectedEventStyle from '../components/adminSettingsPanel/selectedEventStyle';
import EmbedCode from '../components/editor/embedCode';

const mapState = ({ appState, eventState, manualEventState, onBoardingState, eventSavingState }) => {
    return {
        appState,
        eventState,
        manualEventState,
        onBoardingState,
        eventSavingState
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
    postManualEvent(event, widgetUuid) {
        if (localStorage && !localStorage.getItem('onboarding.addedEvent')) {
            localStorage.setItem('onboarding.addedEvent', 1);
            this.setState({ showFirstEventSuccessModal: true });
        }
        this.props.postManualEvent(event, widgetUuid);
        this.setState({ eventHasBeenAdded: true });
        const calendarToDeselect = this.props.appState.calendars.find(
            calendar => calendar.calendar_name === 'Demo Calendar' && calendar.selected === true
        );

        if (calendarToDeselect) {
            this.props.putCalendars(this.props.eventCalWidgetUuid, calendarToDeselect.calendar_id, false);
        }
    },
    deleteManualEvent() {
        const currentlySelectedEvent = this.props.eventState;
        this.props.deleteManualEvent({
            calendarId: currentlySelectedEvent.calendar_id,
            id: currentlySelectedEvent.id
        });
    },
    duplicateManualEvent() {
        const currentlySelectedEvent = this.props.eventState;
        this.props.duplicateManualEvent(currentlySelectedEvent.id);
    },
    manualEventsSelected() {
        if (this.props.appState && this.props.appState.calendars) {
            return this.props.appState.calendars.find(calendar => {
                return calendar.calendar_type === 'manual' && calendar.selected === true;
            });
        }
        return false;
    },
    isEditorHomeRoute() {
        const rx = new RegExp('^/editor/' + this.props.eventCalWidgetUuid + '/?$');
        return rx.test(this.props.location.pathname);
    },
    render() {
        const displayAddEventForm = this.props.manualEventState.displayAddEventScreen;
        const displayEditEventForm = this.eventActivated() && !this.props.eventState.eventSettingsLoading;
        const animationTime = 300;
        const user = get(this, 'props.appState.user');
        return (
            <div className="dashboard-settings">
                {this.eventActivated() && <SelectedEventStyle uuid={this.props.eventState.uuid} />}
                <SelectedEventStyle uuid={this.props.eventState.uuid} />
                {/* START Onboading modals*/}
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
                {/* END Onboading modals*/}
                <TransitionGroup>
                    {!displayAddEventForm && !displayEditEventForm && this.isEditorHomeRoute() && (
                        <CSSTransition key={'something233'} classNames="fade" timeout={animationTime}>
                            <SidePanelContainer>
                                <SidePanelWrapper scrollable={false}>
                                    <SettingsCategorySelection
                                        options={[{ name: 'Exit Editor', emoji: '👨‍💻', reverse: true }]}
                                        className="exit-to-dashboard"
                                        showArrows={true}
                                        settingClicked={() => {
                                            this.props.history.push('/dashboard');
                                        }}
                                    />
                                </SidePanelWrapper>
                                <CategoryHeader displayBackButton={false} title={'Customize'}>
                                    {/* <EmbedCode
                                        eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                                        userIsAGuest={!this.props.userHasSubscribed}
                                        shopifyUser={user.shopifyUser}
                                        bigcommerceUser={user.bigcommerceUser}
                                        userId={user.userId}
                                    /> */}
                                </CategoryHeader>
                                <SidePanelWrapper>
                                    <SettingsCategorySelection
                                        options={[
                                            { name: 'Add Event', emoji: '👨‍💻', routeName: 'add-event', separate: true },
                                            {
                                                name: 'Event Sources',
                                                emoji: '🌍',
                                                routeName: 'sources'
                                            },
                                            { name: 'Settings', emoji: '🔧', routeName: 'layout' },
                                            { name: 'Theme', emoji: '🎨', routeName: 'design' }
                                        ]}
                                        showArrows={true}
                                        settingClicked={setting => {
                                            if (setting.routeName === 'add-event') {
                                                return this.addEventClicked();
                                            }
                                            this.props.history.push(
                                                `/editor/${this.props.eventCalWidgetUuid}/${setting.routeName}`
                                            );
                                        }}
                                    />
                                </SidePanelWrapper>
                            </SidePanelContainer>
                        </CSSTransition>
                    )}
                    <CSSTransition key={this.props.location.key} classNames="fade" timeout={animationTime}>
                        <Switch location={this.props.location}>
                            <Route exact path={`${EDITOR_PATH}/sources`} component={Sources} />
                            <Route exact path={`${EDITOR_PATH}/layout`} component={Layout} />
                            <Route exact path={`${EDITOR_PATH}/design`} component={Design} />
                        </Switch>
                    </CSSTransition>
                    {displayEditEventForm && (
                        <CSSTransition key={'asoidjasiodjsaioj'} classNames="fade" timeout={animationTime}>
                            <SidePanelContainer>
                                <CategoryHeader
                                    backButtonAction={this.props.exitEventSettings}
                                    eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                                    title={'Edit Event'}
                                />
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
                                <EventActions
                                    duplicateManualEventAction={this.duplicateManualEvent}
                                    eventDuplicationSuccess={this.props.manualEventState.eventDuplicationSuccess}
                                    eventDuplicationError={this.props.manualEventState.eventDuplicationError}
                                    duplicatingEvent={this.props.manualEventState.duplicatingEvent}
                                    displayDuplicationButton={this.props.eventState.manualEventSelected}
                                    exitAction={this.props.exitEventSettings}
                                    deleteManualEvent={
                                        this.props.eventState.manualEventSelected && this.deleteManualEvent
                                    }
                                />
                            </SidePanelContainer>
                        </CSSTransition>
                    )}
                    {displayAddEventForm && (
                        <CSSTransition key={'asoidjasiodjsaissssoj'} classNames="fade" timeout={animationTime}>
                            <SidePanelContainer>
                                <CategoryHeader
                                    backButtonAction={this.exitAddEventScreen}
                                    eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                                    title={'Add Event'}
                                />
                                <NewPost
                                    manualEventState={this.props.manualEventState}
                                    postManualEvent={this.postManualEvent}
                                    close={this.exitAddEventScreen}
                                    manualEventsSelected={this.manualEventsSelected()}
                                    editEventClicked={this.editEventClicked}
                                    addNewEventClicked={this.addNewEventClicked}
                                    eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                                    formValidationError={this.props.formValidationError}
                                />
                            </SidePanelContainer>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
        );
    },
    componentWillUnmount() {
        document.removeEventListener('ECA_event-clicked', this.handleEventClick);
    }
});

export default withRouter(
    connect(
        mapState,
        mapDispatch
    )(component)
);
