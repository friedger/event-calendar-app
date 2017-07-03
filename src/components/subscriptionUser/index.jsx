if (typeof window !== 'undefined') {
    require('./styles.scss');
    require('./checkboxes.scss');
}

import React from 'react';

import EventCal from '../eventCal';
import WelcomePageHeader from '../welcomePageHeader';
import CalendarCodeTextArea from '../calendarCodeTextArea';
import AdminSettingsPanel from '../../containers/adminSettingsPanel';
import LinkCalendar from '../../containers/linkCalendar';
import Suggestions from '../suggestions';
import SuggestionInstructions from '../suggestionInstructions';

export default React.createClass({
    componentDidMount() {
        $('.venobox').venobox();
    },
    render() {
        const {user, authUrl, connections} = this.props;
        return (
            <div style={{height: '100%'}}>
                {connections && connections.length > 0 ?
                    <div style={{height: '100%'}}>
                        <div className="col-sm-5 calendar-settings col-sm-push-7">
                            <AdminSettingsPanel />
                        </div>
                        <div className="col-sm-7 col-sm-pull-5">
                                <div>
                                    <div className="dashboard-header dashboard-header--left row">
                                        <div className="col-md-12">
                                            <span>Event calendar preview</span>
                                            <Suggestions suggestionToggleAction={this.props.suggestionToggleAction}></Suggestions>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <SuggestionInstructions show={this.props.suggestions}></SuggestionInstructions>
                                        </div>
                                    </div>
                                    <EventCal eventcalRemovedAction={this.props.eventcalRemovedAction} suggestionsActive={this.props.suggestions} userId={this.props.user.userId} />
                                    <hr />
                                    {this.props.user.weeblyUser &&
                                        <div>
                                            <p><strong>That's it.</strong> Head back to your <a target="_blank" href="https://www.weebly.com/editor/main.php">weebly dashboard</a> to see your updated calendar!</p>
                                            <a href="https://www.weebly.com/editor/main.php" className="weebly-button inline-button action-button btn btn-default">Back to Weebly Dashboard</a>
                                        </div>
                                    }
                                    {!this.props.user.weeblyUser &&
                                        <CalendarCodeTextArea shopifyUser={this.props.user.shopifyUser} calendarBuildUrl={this.props.calendarBuildUrl} userId={this.props.user.userId}/>
                                    }
                                    {this.props.user.bigcommerceUser &&
                                        <div className="calendarCode__shopify"><a className="venobox" data-autoplay="true" data-vbtype="video" href="https://www.youtube.com/watch?v=R6uKvhyHYVg">Bigcommerce integration guide</a></div>
                                    }
                                </div>
                        </div>
                    </div>
                     :
                    <div>
                        <LinkCalendar authUrl={authUrl}/>
                </div>}
            </div>
        )
    }
});
