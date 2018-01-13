require('./styles.scss');
require('./checkboxes.scss');

import React from 'react';

import AdminSettingsPanel from '../../containers/adminSettingsPanel';
import LinkCalendar from '../../containers/linkCalendar';

import EventCal from './eventCal';
import Suggestions from './suggestions';
import SuggestionInstructions from './suggestionInstructions';
import NoEventsMessage from './noEventsMessage';
import IntegrationSection from './integrationSection';
import BeginTrial from './beginTrial';

export default React.createClass({
    userReadyToBeShownEditor() {
        const { connections, onBoardingState } = this.props;

        return (
            (connections && connections.length > 0) ||
            (onBoardingState && onBoardingState.selected_manual_events === true)
        );
    },
    render() {
        const { authUrl } = this.props;
        return (
            <div style={{ height: '100%' }}>
                {this.userReadyToBeShownEditor() ? (
                    <div style={{ height: '100%' }}>
                        <div className="col-sm-5 calendar-settings col-sm-push-7">
                            <AdminSettingsPanel
                                eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                            />
                        </div>
                        <div className="col-sm-7 col-sm-pull-5">
                            <div className="dashboard-header dashboard-header--left row">
                                <div className="col-md-12">
                                    <span>Event calendar preview</span>
                                    {!this.props.eventcalHasNoEvents && (
                                        <Suggestions
                                            suggestionToggleAction={
                                                this.props.suggestionToggleAction
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="row" style={{ padding: '0 30px' }}>
                                <div
                                    className="col-sm-12"
                                    style={{ overflow: 'scroll', height: 'calc(100vh - 133px)' }}
                                >
                                    <div className="row">
                                        <div className="col-md-12">
                                            <SuggestionInstructions show={this.props.suggestions} />
                                        </div>
                                    </div>
                                    {this.props.eventcalHasNoEvents && <NoEventsMessage />}
                                    <EventCal
                                        eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                                        show={!this.props.eventcalHasNoEvents}
                                        eventcalRemovedAction={this.props.eventcalRemovedAction}
                                        suggestionsActive={this.props.suggestions}
                                        userId={this.props.user.userId}
                                    />
                                    {this.props.userHasSubscribed ? (
                                        <IntegrationSection
                                            weeblyUser={this.props.user.weeblyUser}
                                            bigcommerceUser={this.props.user.bigcommerceUser}
                                            shopifyUser={this.props.user.shopifyUser}
                                            userId={this.props.user.userId}
                                            eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                                        />
                                    ) : (
                                        <BeginTrial />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <LinkCalendar authUrl={authUrl} />
                )}
            </div>
        );
    }
});
