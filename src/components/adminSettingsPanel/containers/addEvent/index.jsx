import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../../../../actions/index';
import * as calendarActions from '../../../../actions/calendarActions';
import * as manualEventActions from '../../../../actions/manualEventActions';
import * as eventActions from '../../../../actions/eventActions';

import { withRouter } from 'react-router-dom';
import NewPost from '../../newPost';

const mapState = state => {
    return {
        manualEventState: state.manualEventState,
        calendars: state.appState.calendars
    };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...appActions,
            ...calendarActions,
            ...manualEventActions,
            ...eventActions
        },
        dispatch
    );
};

const component = React.createClass({
    editEventClicked() {
        this.props.eventSelected({
            calendar_id: this.props.manualEventState.calendarId,
            uuid: this.props.manualEventState.uuid,
            manualEvent: true
        });
        this.props.closeNewEventForm();
    },
    manualEventsSelected() {
        if (this.props.calendars) {
            return this.props.calendars.find(calendar => {
                return (
                    calendar.calendar_type === 'manual' &&
                    calendar.selected === true
                );
            });
        }
        return false;
    },
    postManualEvent(event, widgetUuid) {
        if (localStorage && !localStorage.getItem('onboarding.addedEvent')) {
            localStorage.setItem('onboarding.addedEvent', 1);
            this.setState({ showFirstEventSuccessModal: true });
        }
        this.props.postManualEvent(event, widgetUuid);
        this.setState({ eventHasBeenAdded: true });
        const calendarToDeselect = this.props.appState.calendars.find(
            calendar => (calendar.calendar_name === 'Demo Calendar') && (calendar.selected === true)
        );

        if (calendarToDeselect) {
            this.props.putCalendars(
                this.props.eventCalWidgetUuid,
                calendarToDeselect.calendar_id,
                false
            );
        }
    },
    render() {
        const eventCalWidgetUuid = this.props.match.params.eventCalWidgetUuid;

        return (
            <NewPost
                manualEventState={this.props.manualEventState}
                postManualEvent={this.postManualEvent}
                close={this.exitAddEventScreen}
                manualEventsSelected={this.manualEventsSelected()}
                editEventClicked={this.editEventClicked}
                addNewEventClicked={this.props.addNewEvent}
                eventCalWidgetUuid={eventCalWidgetUuid}
                formValidationError={this.props.formValidationError}
            />
        );
    }
});

export default withRouter(
    connect(
        mapState,
        mapDispatch
    )(component)
);
