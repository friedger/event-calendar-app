require('./styles.scss');
require('./checkboxes.scss');

import React from 'react';
import Loader from 'react-loader';
import cn from 'classnames';
import { withRouter } from 'react-router';

import AdminSettingsPanel from '../../containers/adminSettingsPanel';
import LinkCalendar from '../../containers/linkCalendar';
import shouldDisplayNextStepBanner from '../../utils/shouldDisplayNextStepBanner';

import EventCal from './eventCal';
import Suggestions from './suggestions';
import SuggestionInstructions from './suggestionInstructions';
import NoEventsMessage from './noEventsMessage';
import IntegrationSection from './integrationSection';
import BeginTrial from './beginTrial';
import BackToWeeblyMessage from './backToWeeblyMessage';

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
        if (
            (onBoardingState.selected_manual_events || onBoardingState.linked_calendar) &&
            this.props.location.pathname.indexOf('link-calendar') > 0
        ) {
            window.location.href = '/editor';
        }
    },
    render() {
        const { authUrl } = this.props;
        const sizeOfHeader = '77px';
        const showIntegrationSection =
            this.props.userHasSubscribed &&
            this.props.onBoardingState.user_clicked_added_script === false &&
            !this.props.user.weeblyUser;
        const displayBackToWeeblyMessage =
            !this.props.onBoardingState.user_closed_weebly_dashboard_link &&
            this.props.userHasSubscribed &&
            this.props.user.weeblyUser;

        if (!this.userReadyToBeShownEditor()) {
            return <LinkCalendar authUrl={authUrl} />;
        }
        const nextStepBannerIsBeingDisplayed = shouldDisplayNextStepBanner(this.props.accountState, this.props.onBoardingState, this.props.user);
        return (
            <div style={{ height: '100%' }}>
                <div style={{ height: '100%' }}>
                    <div className="col-sm-5 calendar-settings col-sm-push-7" style={{ height: `calc(100vh - ${nextStepBannerIsBeingDisplayed ? '123px' : sizeOfHeader})` }}>
                        <AdminSettingsPanel
                            eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                            userHasSubscribed={this.props.userHasSubscribed}
                            userId={this.props.user.userId}
                        />
                    </div>
                    <div className="col-sm-7 col-sm-pull-5 event-calendar-preview" style={{ boxShadow: '0 0 25px rgba(0,0,0,.11)' }} style={{ height: `calc(100vh - ${nextStepBannerIsBeingDisplayed ? '123px' : sizeOfHeader})` }}>
                        <div className="dashboard-header dashboard-header--left row">
                            <div className="col-md-12">
                                <span>Event calendar preview</span>
                                <div
                                    className={cn('dashboard-header__loading-indicator-container', {
                                        display: this.props.savingEvent
                                    })}
                                >
                                    <div className="dashboard-header__loading-indicator">
                                        <Loader type="spin" color="#fff" width={1} radius={1} left="15px" /> Applying
                                        updates...
                                    </div>
                                </div>
                                {!this.props.eventcalHasNoEvents && this.props.eventcalHasNoEvents !== undefined && (
                                    <Suggestions suggestionToggleAction={this.props.suggestionToggleAction} />
                                )}
                                {this.props.user.weeblyUser && (
                                    <a href="https://www.weebly.com/editor/main.php"
                                    target="_blank" className="back-to-weebly secondary secondary--small">
                                        Back to Weebly
                                    </a>
                                )}
                            </div>
                        </div>
                        <div
                            className="row dashboard-editor"
                            style={{
                                background: this.props.appState.canvasBackgroundColor
                            }}
                        >
                            <div className="col-sm-12 dashboard-editor__content scrollable-area">
                                <div className="dashboard-editor__content-width-wrapper">
                                    <SuggestionInstructions show={this.props.suggestions} />
                                    {showIntegrationSection && (
                                        <IntegrationSection
                                            weeblyUser={this.props.user.weeblyUser}
                                            bigcommerceUser={this.props.user.bigcommerceUser}
                                            shopifyUser={this.props.user.shopifyUser}
                                            userId={this.props.user.userId}
                                            eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                                            highlightCodeArea={!this.props.onBoardingState.user_clicked_added_script}
                                            userSelectedScriptAdded={this.props.userSelectedScriptAdded}
                                        />
                                    )}
                                    <div className="eventcal-container">
                                        {this.props.eventcalHasNoEvents &&
                                            this.props.eventcalHasNoEvents !== undefined && <NoEventsMessage />}
                                        <EventCal
                                            eventCalWidgetUuid={this.props.eventCalWidgetUuid}
                                            show={
                                                !this.props.eventcalHasNoEvents &&
                                                this.props.eventcalHasNoEvents !== undefined
                                            }
                                            eventcalRemovedAction={this.props.eventcalRemovedAction}
                                            suggestionsActive={this.props.suggestions}
                                            userId={this.props.user.userId}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                {displayBackToWeeblyMessage && (
                                    <BackToWeeblyMessage
                                        close={() => {
                                            this.props.postOnBoarding({
                                                user_closed_weebly_dashboard_link: true
                                            });
                                        }}
                                    />
                                )}
                                {!this.props.userHasSubscribed && <BeginTrial />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default withRouter(Component);
