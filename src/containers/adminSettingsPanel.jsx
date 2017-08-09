import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as calendarActions from '../actions/calendarActions';
import * as eventActions from '../actions/eventActions';

import WidgetSettings from '../components/widgetSettings';
import EventSettings from '../components/eventSettings';
import EmbedCode from '../components/embedCode';
import get from 'lodash.get';
import featurePermissions from '../utils/featurePermissions';

import CalendarConnections from '../components/calendarConnections';

const mapState = ({ appState, eventState }) => {
    return {
        appState,
        eventState
    };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...appActions,
            ...calendarActions,
            ...eventActions
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
            addCalendarSelected: false
        };
    },
    componentDidMount() {
        document.addEventListener('ECA_event-clicked', e => {
            if (e.detail.opening) {
                this.props.eventSelected(e.detail);
            }
        });
    },

    toggleConnectionsScreen() {
        this.props.getCalendars(this.props.eventCalWidgetUuid);
        this.setState({ displayConnectionsScreen: !this.state.displayConnectionsScreen });
    },
    getCalendarFormInitialValues() {
        return Object.keys(this.props.appState.calendars).reduce((collection, current) => {
            // this is breaking - why?
            collection[current] = this.props.appState.calendars[current].selected;
            return collection;
        }, {});
    },
    eventActivated() {
        return this.props.eventState.calendar_id && this.props.eventState.uuid;
    },
    render() {
        return this.state.displayConnectionsScreen
            ? <CalendarConnections
                  toggleConnectionsScreen={this.toggleConnectionsScreen}
                  connections={this.props.appState.connections}
                  calendarAdded={() => {
                      this.props.getConnections();
                  }}
                  deleteCalendar={this.props.deleteCalendar}
                  eventCalWidgetUuid={this.props.eventCalWidgetUuid}
              />
            : <div className="dashboard-settings">
                    {this.eventActivated() && <div onClick={() => this.props.exitEventSettings()} className="dashboard-header__close"><i onClick={() => this.props.exitEventSettings()} className="fa fa-times" aria-hidden="true"></i> </div>}
                  <div className="dashboard-header dashboard-header--right row">
                      <div className="col-md-12">
                          {this.eventActivated() && <span className="dashboard-header__event-settings">Event settings</span>}
                          {!this.eventActivated() && <span>Calendar settings</span>}
                          {!this.props.appState.user.weeblyUser &&
                              <EmbedCode
                                  eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                                  userIsAGuest={this.props.appState.user.status === 'registered'}
                                  userId={this.props.appState.user.userId}
                                  shopifyUser={this.props.appState.user.shopifyUser}
                                  calendarBuildUrl={this.props.calendarBuildUrl}
                              />}
                      </div>
                  </div>

                  <EventSettings
                      show={this.eventActivated() && !this.props.eventState.eventSettingsLoading}
                      validWithPlan={get(this, 'props.appState.user.status') && featurePermissions.checkFeatureAvailability(this.props.appState.user.status, 'event-settings')}
                      putEventAction={this.props.putEvent.bind(
                          null,
                          this.props.eventState.calendar_id,
                          this.props.eventState.uuid
                      )}
                      exitAction={this.props.exitEventSettings}
                  />

                  <WidgetSettings
                      key={1}
                      show={!this.eventActivated() && !this.props.eventState.eventSettingsLoading}
                      putCalendars={this.props.putCalendars}
                      calendarsLoading={this.props.appState.calendarsLoading}
                      calendars={this.props.appState.calendars}
                      putSettings={this.props.putSettings}
                      toggleConnectionsScreen={this.toggleConnectionsScreen}
                      eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                      userStatus={get(this, 'props.appState.user.status')}
                  />
              </div>;
    }
});

export default connect(mapState, mapDispatch)(component);
