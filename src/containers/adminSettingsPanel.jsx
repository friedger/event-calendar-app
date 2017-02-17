import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as calendarActions from '../actions/calendarActions';

import Header from '../components/header';

import NumberOfEventsToDisplay from '../components/numberOfEventsSelection';
import TimezoneSelection from '../components/timezoneSelection';
import CalendarSelection from '../components/calendarSelection';
import ViewModeSelection from '../components/viewModeSelection';

import CalendarConnections from '../components/calendarConnections';

const mapState = ({loginState, appState}) => {
    return {
        appState
    }
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        ...appActions,
        ...calendarActions
    }, dispatch);
}


const component = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            displayConnectionsScreen: false,
            addCalendarSelected: false
        }
    },
    toggleConnectionsScreen() {
        this.props.getCalendars();
        this.setState({displayConnectionsScreen: !this.state.displayConnectionsScreen});
    },
    _getCalendarFormInitialValues() {
        return Object.keys(this.props.appState.calendars).reduce((collection, current) => {
            //this is breaking - why?
            collection[current] = this.props.appState.calendars[current].selected;
            return collection;
        }, {});
    },
    render() {
        return (
            this.state.displayConnectionsScreen ?
            <CalendarConnections
                toggleConnectionsScreen={this.toggleConnectionsScreen}
                connections={this.props.appState.connections}
                calendarAdded={() => {this.props.getConnections()}}
                deleteCalendar={this.props.deleteCalendar}
                />
            :
            <div>
                <p className="dashboard-header dashboard-header--right">Calendar settings</p>
                <span className="setting-title">Calendars to display:</span>
                <CalendarSelection onChange={this.props.putCalendars}
                    initialValues={this._getCalendarFormInitialValues()}
                    loading={this.props.appState.calendarsLoading}
                    fields={Object.keys(this.props.appState.calendars)}
                    calendars={this.props.appState.calendars}/>
                <div style={{'paddingBottom': '9px'}}>
                    <button className="default" onClick={this.toggleConnectionsScreen}>Add more calendars</button>
                </div>
                <span className="setting-title">Calendars layouts to display:</span>
                <ViewModeSelection putSettingsAction={this.props.putSettings}/>
                <NumberOfEventsToDisplay putSettingsAction={this.props.putSettings}/>
                <TimezoneSelection putSettingsAction={this.props.putSettings}/>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
