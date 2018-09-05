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
import BackToWeeblyMessage from './backToWeeblyMessage';
import Loader from 'react-loader';
import cn from 'classnames';
import { withRouter } from 'react-router';
import { browserHistory } from 'react-router';

const Component = React.createClass({
    userReadyToBeShownEditor() {
        const { connections, onBoardingState } = this.props;

        return (
            (connections && connections.length > 0) ||
            (onBoardingState && onBoardingState.selected_manual_events === true)
        );
    },
    componentDidMount() {
        const onBoardingState = this.props.onBoardingState;
        if ((onBoardingState.selected_manual_events || onBoardingState.linked_calendar) && (this.props.router.location.pathname.indexOf('link-calendar') > 0)){
            window.location.href = '/editor';
        }
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
                                userHasSubscribed={this.props.userHasSubscribed}
                                userId={this.props.user.userId}
                                />
                        </div>
                        <div className="col-sm-7 col-sm-pull-5">
                            <div className="dashboard-header dashboard-header--left row">
                                <div className="col-md-12">
                                    <span>Event calendar preview</span>
                                    <div className={cn("dashboard-header__loading-indicator-container", { display: this.props.savingEvent })}>
                                        <div className="dashboard-header__loading-indicator">
                                        <Loader
                                        type="spin"
                                        color="#fff"
                                        width={1}
                                        radius={1}
                                        left='15px'
                                    /> Applying updates...</div></div>
                                {!this.props.eventcalHasNoEvents && this.props.eventcalHasNoEvents !== undefined && (
                                        <Suggestions
                                            suggestionToggleAction={
                                                this.props.suggestionToggleAction
                                            }
                                        />
                                    )}
                                    {this.props.user.weeblyUser && <button className="back-to-weebly secondary secondary--small">Back to Weebly</button>}
                                </div>
                            </div>
                            <div className="row dashboard-editor" style={{ padding: '0 30px', height: 'calc(100vh - 133px)', background: this.props.appState.canvasBackgroundColor }}>
                                <div
                                    className="col-sm-12 dashboard-editor__content"
                                >
                                    <div className="row">
                                        <div className="col-md-12">
                                            <SuggestionInstructions show={this.props.suggestions} />
                                        </div>
                                    </div>
                                    {this.props.userHasSubscribed && this.props.onBoardingState.user_clicked_added_script === false && !this.props.user.weeblyUser && <IntegrationSection
                                        weeblyUser={this.props.user.weeblyUser}
                                        bigcommerceUser={this.props.user.bigcommerceUser}
                                        shopifyUser={this.props.user.shopifyUser}
                                        userId={this.props.user.userId}
                                        eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                                        highlightCodeArea={!this.props.onBoardingState.user_clicked_added_script}
                                        userSelectedScriptAdded={this.props.userSelectedScriptAdded}
                                    />}
                                    <div className="eventcal-container">
                                        {this.props.eventcalHasNoEvents && this.props.eventcalHasNoEvents !== undefined && <NoEventsMessage />}
                                        <EventCal
                                            eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                                            show={!this.props.eventcalHasNoEvents && this.props.eventcalHasNoEvents !== undefined}
                                            eventcalRemovedAction={this.props.eventcalRemovedAction}
                                            suggestionsActive={this.props.suggestions}
                                            userId={this.props.user.userId}
                                            />
                                    </div>
                            </div>
                            <div class="col-md-12">
                                {!this.props.onBoardingState.user_closed_weebly_dashboard_link && this.props.userHasSubscribed && this.props.user.weeblyUser &&
                                    <BackToWeeblyMessage close={() => {
                                            this.props.postOnBoarding({ user_closed_weebly_dashboard_link: true });
                                        }}></BackToWeeblyMessage>
                                }
                                {!this.props.userHasSubscribed && <BeginTrial />}
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

export default withRouter(Component);

// this.props.savingEvent

// this.props.eventcalHasNoEvents && this.props.eventcalHasNoEvents !== undefined &&
