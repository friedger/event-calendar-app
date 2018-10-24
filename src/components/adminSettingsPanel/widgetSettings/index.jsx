require('./style.scss');
import React from 'react';
import NumberOfEventsToDisplay from '../numberOfEventsSelection';
import TimezoneSelection from '../timezoneSelection';
import CalendarSelection from '../calendarSelection';
import ViewModeSelection from '../viewModeSelection';
import MapsSelection from '../mapsSelection';
import SubscriptionButtonSelection from '../subscriptionButtonSelection';
import featurePermissions from '../../../utils/featurePermissions';
import cn from 'classnames';
import SettingsCategorySelection from '../settingsCategorySelection';
import SidePanelWrapper from '../sidePanelWrapper';
import DesignFrom from '../designForm';
import DesignPresets from '../designPresets';
import {
    Input,
    Row,
    Col,
    Checkbox,
    FormGroup,
    ControlLabel
} from 'react-bootstrap';
import RefreshSyncedCalendarsButton from '../refreshSyncedCalendarsButton';

var theTimeout;

export default React.createClass({
    getInitialState() {
        return {
            showComponent: this.props.show,
            settingsToDisplay: 'Event Sources',
            designPageToDisplay: 'Presets'
        };
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
    desginSettingClicked(setting) {
        this.setState({ designPageToDisplay: setting });
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
                <div
                    className={cn('widget-settings show', {
                        show: this.state.showComponent
                    })}
                >
                    <SettingsCategorySelection
                        options={[
                            { name: 'Event Sources', emoji: '🌍' },
                            { name: 'Layout', emoji: '✏️' },
                            { name: 'Design', emoji: '🎨' }
                        ]}
                        settingClicked={this.settingClicked}
                    />
                    <CalendarSelection
                        onChange={putCalendars.bind(null, eventCalWidgetUuid)}
                        toggleConnectionsScreen={
                            this.props.toggleConnectionsScreen
                        }
                        initialValues={this.getCalendarFormInitialValues(
                            calendars
                        )}
                        loading={calendarsLoading}
                        addEventClicked={this.props.addEventClicked}
                        fields={Object.keys(calendars)}
                        calendars={calendars}
                        show={this.state.settingsToDisplay === 'Event Sources'}
                    />
                    <RefreshSyncedCalendarsButton
                        savingEvent={this.props.savingEvent}
                        refreshEventCalendarAction={
                            this.props.refreshEventCalendarAction
                        }
                    />
                    <DesignFrom
                        show={this.state.settingsToDisplay === 'Design'}
                        onFormChange={putSettings.bind(
                            null,
                            eventCalWidgetUuid
                        )}
                        validWithPlan={featurePermissions.checkFeatureAvailability(
                            userStatus,
                            'theming'
                        )}
                        canvasBackgroundModified={
                            this.props.canvasBackgroundModified
                        }
                    />
                    <div
                        className={cn('layout-options-container', {
                            show: this.state.settingsToDisplay === 'Layout'
                        })}
                    >
                        <ViewModeSelection
                            putSettingsAction={putSettings.bind(
                                null,
                                eventCalWidgetUuid
                            )}
                        />
                        <NumberOfEventsToDisplay
                            putSettingsAction={putSettings.bind(
                                null,
                                eventCalWidgetUuid
                            )}
                        />
                        <TimezoneSelection
                            putSettingsAction={putSettings.bind(
                                null,
                                eventCalWidgetUuid
                            )}
                        />
                        <MapsSelection
                            putSettingsAction={putSettings.bind(
                                null,
                                eventCalWidgetUuid
                            )}
                            validWithPlan={featurePermissions.checkFeatureAvailability(
                                userStatus,
                                'maps'
                            )}
                        />
                        <SubscriptionButtonSelection
                            validWithPlan={featurePermissions.checkFeatureAvailability(
                                userStatus,
                                'subscriptions'
                            )}
                            putSettingsAction={this.props.putSettings.bind(
                                null,
                                eventCalWidgetUuid
                            )}
                        />
                    </div>
                </div>
            </SidePanelWrapper>
        );
    }
});
