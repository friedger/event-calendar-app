require('./style.scss');
import React from 'react';
import NumberOfEventsToDisplay from '../numberOfEventsSelection';
import TimezoneSelection from '../timezoneSelection';
import CalendarSelection from '../calendarSelection';
import ViewModeSelection from '../viewModeSelection';
import SubscriptionButtonSelection from '../subscriptionButtonSelection';
import featurePermissions from '../../../utils/featurePermissions';
import cn from 'classnames';
import SettingsCategorySelection from '../settingsCategorySelection';
import SidePanelWrapper from '../sidePanelWrapper';

var theTimeout;

export default React.createClass({
    getInitialState() {
        return { showComponent: this.props.show, settingsToDisplay: 'Event Sources' };
    },
    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            theTimeout = window.setTimeout(() => {
                this.setState({ showComponent: true });
            }, 250);
            return;
        }
        window.clearTimeout(theTimeout);
        return this.setState({ showComponent: false });
    },
    getCalendarFormInitialValues(calendars) {
        return Object.keys(calendars).reduce((collection, current) => {
            // this is breaking - why?
            collection[current] = calendars[current].selected;
            return collection;
        }, {});
    },
    settingClicked(setting) {
        this.setState({ settingsToDisplay: setting });
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
            <SidePanelWrapper>
            <div className={cn('widget-settings show', { show: this.state.showComponent })}>
                <SettingsCategorySelection
                    options={[{ name: 'Event Sources', emoji: '🌍' }, { name: 'Layout', emoji: '✏️' }]}
                    settingClicked={this.settingClicked}
                />
                <CalendarSelection
                    onChange={putCalendars.bind(null, eventCalWidgetUuid)}
                    toggleConnectionsScreen={this.props.toggleConnectionsScreen}
                    initialValues={this.getCalendarFormInitialValues(calendars)}
                    loading={calendarsLoading}
                    addEventClicked={this.props.addEventClicked}
                    fields={Object.keys(calendars)}
                    calendars={calendars}
                    show={this.state.settingsToDisplay === 'Event Sources'}
                />
                <div
                    className={cn('layout-options-container', {
                        show: this.state.settingsToDisplay === 'Layout'
                    })}
                >
                    <ViewModeSelection
                        putSettingsAction={putSettings.bind(null, eventCalWidgetUuid)}
                    />
                    <NumberOfEventsToDisplay
                        putSettingsAction={putSettings.bind(null, eventCalWidgetUuid)}
                    />
                    <TimezoneSelection
                        putSettingsAction={putSettings.bind(null, eventCalWidgetUuid)}
                    />
                    <SubscriptionButtonSelection
                        validWithPlan={featurePermissions.checkFeatureAvailability(
                            userStatus,
                            'subscriptions'
                        )}
                        putSettingsAction={this.props.putSettings.bind(null, eventCalWidgetUuid)}
                    />
                </div>
            </div>
        </SidePanelWrapper>
        );
    }
});
