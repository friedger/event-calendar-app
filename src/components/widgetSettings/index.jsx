require('./style.scss');
import React from 'react';
import NumberOfEventsToDisplay from '../numberOfEventsSelection';
import TimezoneSelection from '../timezoneSelection';
import CalendarSelection from '../calendarSelection';
import ViewModeSelection from '../viewModeSelection';
import SubscriptionButtonSelection from '../subscriptionButtonSelection';
import get from 'lodash.get';
import featurePermissions from '../../utils/featurePermissions';
import cn from 'classnames';

export default React.createClass({
    getInitialState() {
        return {};
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            return setTimeout(() => {
                this.setState({ showComponent: true });
            }, 500);
        }
        return this.setState({ showComponent: false });
    },
    getCalendarFormInitialValues(calendars) {
        return Object.keys(calendars).reduce((collection, current) => {
            // this is breaking - why?
            collection[current] = calendars[current].selected;
            return collection;
        }, {});
    },
    render() {
        const {
            putCalendars,
            calendarsLoading,
            calendars,
            putSettings,
            eventCalWidgetUuid,
            userStatus
        } = this.props;
        return (
            <div className={cn('widget-settings', { show: this.state.showComponent })}>
                <CalendarSelection
                    onChange={putCalendars.bind(null, eventCalWidgetUuid)}
                    toggleConnectionsScreen={this.props.toggleConnectionsScreen}
                    initialValues={this.getCalendarFormInitialValues(calendars)}
                    loading={calendarsLoading}
                    fields={Object.keys(calendars)}
                    calendars={calendars}
                />
                <ViewModeSelection putSettingsAction={putSettings.bind(null, eventCalWidgetUuid)} />
                <NumberOfEventsToDisplay
                    putSettingsAction={putSettings.bind(null, eventCalWidgetUuid)}
                />
                <TimezoneSelection putSettingsAction={putSettings.bind(null, eventCalWidgetUuid)} />
                <SubscriptionButtonSelection
                    validWithPlan={
                        featurePermissions.checkFeatureAvailability(userStatus, 'subscriptions')
                    }
                    putSettingsAction={this.props.putSettings.bind(null, eventCalWidgetUuid)}
                />
            </div>
        );
    }
});
