if (typeof window !== 'undefined') {
    require('./styles.scss');
    require('./checkboxes.scss');
}

import React from 'react';
import EventCal from '../eventCal';
import CalendarSelection from '../calendarSelection';
import WelcomePageHeader from '../welcomePageHeader';
import CalendarCodeTextArea from '../calendarCodeTextArea';
import NumberOfEventsToDisplay from '../numberOfEventsSelection';
import TimezoneSelection from '../timezoneSelection';


export default React.createClass({
    render() {
        const {user, authUrl} = this.props;
        return (

            <div>
                {user.calendarAuthorised ?
                    <div>
                        <div className="col-sm-5 calendar-settings col-sm-push-7">
                            <p className="dashboard-header dashboard-header--right">Calendar settings</p>
                            <span className="setting-title">Calendars to display:</span>
                            <CalendarSelection onChange={this.props.putCalendars}
                                initialValues={this.props.calendarFormInitialValues}
                                fields={Object.keys(this.props.user.calendars)}
                                calendars={this.props.user.calendars}/>
                            <NumberOfEventsToDisplay putSettingsAction={this.props.putSettings}/>
                            <TimezoneSelection putSettingsAction={this.props.putSettings}/>
                        </div>
                        <div className="col-sm-7 col-sm-pull-5">
                                <div>
                                    <div className="dashboard-header dashboard-header--left">
                                        <span>Live calendar</span>
                                    </div>
                                    <EventCal userId={this.props.user.userId} activeCalendars={this.props.selectedCalendars.length}/>
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
                                </div>
                        </div>
                    </div>
            : <div>
                <WelcomePageHeader />
                <a href={authUrl} className="start-trial">Link my calendar</a>
            </div>}

            </div>
        )
    }
});

//user
//putCalendars
//calendarSelectionForm
