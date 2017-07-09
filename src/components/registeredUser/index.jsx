import React from 'react';
import ga from 'react-ga';

import FirstTimeLinkMessage from '../firstTimeLinkMessage';
import BeginTrial from '../beginTrial';
import EventCal from '../eventCal';
import WelcomePageHeader from '../welcomePageHeader';
import AdminSettingsPanel from '../../containers/adminSettingsPanel';
import LinkCalendar from '../../containers/LinkCalendar';
import SuggestionInstructions from '../suggestionInstructions';
const Link = require('react-router').Link;
import Suggestions from '../suggestions';
import NoEventsMessage from '../noEventsMessage';

export default React.createClass({
    _fireGaEvent() {
        ga.event({
          category: 'User',
          action: 'Clicked link calendar'
        });
    },
    render() {
        const {user, authUrl, connections} = this.props;
        return (
            <div style={{height: '100%'}}>
                {connections && connections.length > 0 ?
                    <div style={{height: '100%'}}>
                        <div className="col-sm-5 calendar-settings col-sm-push-7">
                            <AdminSettingsPanel eventCalWidgetUuid={this.props.eventCalWidgetUuid}/>
                        </div>
                        <div className="col-sm-7 col-sm-pull-5">
                            <div className="dashboard-header dashboard-header--left row">
                                <div className="col-md-12">
                                    <span>Event calendar preview</span>
                                    {!this.props.eventcalHasNoEvents &&<Suggestions suggestionToggleAction={this.props.suggestionToggleAction}></Suggestions>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <SuggestionInstructions show={this.props.suggestions}></SuggestionInstructions>
                                </div>
                            </div>
                            {this.props.eventcalHasNoEvents && <NoEventsMessage></NoEventsMessage>}
                            <EventCal eventCalWidgetUuid={this.props.eventCalWidgetUuid} show={!this.props.eventcalHasNoEvents} eventcalRemovedAction={this.props.eventcalRemovedAction} suggestionsActive={this.props.suggestions} userId={this.props.user.userId} />
                            <hr />
                            <div>
                                <p>Once you&#39;re ready to add the calendar to your site, follow the link below to begin your trial.   </p>
                                <Link className="start-trial start-trial--smaller-margin" to="/dashboard/plans">Start your free trial</Link>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <LinkCalendar authUrl={authUrl}/>
                    </div>
                }
            </div>
        )
    }
});
