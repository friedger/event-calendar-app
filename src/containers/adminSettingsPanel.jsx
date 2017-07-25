import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as calendarActions from '../actions/calendarActions';

import NumberOfEventsToDisplay from '../components/numberOfEventsSelection';
import TimezoneSelection from '../components/timezoneSelection';
import CalendarSelection from '../components/calendarSelection';
import ViewModeSelection from '../components/viewModeSelection';
import SubscriptionButtonSelection from '../components/subscriptionButtonSelection';
import EmbedCode from '../components/embedCode';
import get from 'lodash.get';
import featurePermissions from '../utils/featurePermissions';

import CalendarConnections from '../components/calendarConnections';

const mapState = ({ appState }) => {
    return {
        appState
    };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...appActions,
            ...calendarActions
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
                  <div className="dashboard-header dashboard-header--right row">
                      <div className="col-md-12">
                          <span>Calendar settings</span>
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
                  <CalendarSelection
                      onChange={this.props.putCalendars.bind(null, this.props.eventCalWidgetUuid)}
                      toggleConnectionsScreen={this.toggleConnectionsScreen}
                      initialValues={this.getCalendarFormInitialValues()}
                      loading={this.props.appState.calendarsLoading}
                      fields={Object.keys(this.props.appState.calendars)}
                      calendars={this.props.appState.calendars}
                  />
                  <ViewModeSelection
                      putSettingsAction={this.props.putSettings.bind(
                          null,
                          this.props.eventCalWidgetUuid
                      )}
                  />
                  <NumberOfEventsToDisplay
                      putSettingsAction={this.props.putSettings.bind(
                          null,
                          this.props.eventCalWidgetUuid
                      )}
                  />
                  <TimezoneSelection
                      putSettingsAction={this.props.putSettings.bind(
                          null,
                          this.props.eventCalWidgetUuid
                      )}
                  />
                  <SubscriptionButtonSelection
                      validWithPlan={get(this, 'props.appState.user.status') && featurePermissions.checkFeatureAvailability(this.props.appState.user.status, 'subscriptions')}
                      putSettingsAction={this.props.putSettings.bind(
                          null,
                          this.props.eventCalWidgetUuid
                      )}
                  />
              </div>;
    }
});

export default connect(mapState, mapDispatch)(component);
