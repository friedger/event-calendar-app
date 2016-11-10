import React from 'react';
import FirstTimeLinkMessage from '../firstTimeLinkMessage';
import BeginTrial from '../beginTrial';
import EventCal from '../eventCal';
import CalendarSelection from '../calendarSelection';
import WelcomePageHeader from '../welcomePageHeader';
import NumberOfEventsSelection from '../numberOfEventsSelection';
import TimezoneSelection from '../timezoneSelection';
import ga from 'react-ga';

export default React.createClass({
    _fireGaEvent() {
        ga.event({
          category: 'User',
          action: 'Clicked link calendar'
        });
    },
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
                            <NumberOfEventsSelection putSettingsAction={this.props.putSettings}/>
                            <TimezoneSelection putSettingsAction={this.props.putSettings}/>
                        </div>
                        <div className="col-sm-7 col-sm-pull-5">
                            <div>
                                <div className="dashboard-header dashboard-header--left">
                                    <span>Live calendar</span>
                                </div>
                                <EventCal userId={this.props.user.userId} activeCalendars={this.props.selectedCalendars.length}/>
                                <hr />
                                <BeginTrial testMode={this.props.testMode} user={user} submitPaymentAction={this.props.submitPaymentAction}/>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="col-md-10 col-sm-offset-1">
                        <WelcomePageHeader />
                        <a href={authUrl} onClick={this._fireGaEvent} className="start-trial">Link my calendar</a>
                    </div>
                }
            </div>
        )
    }
});

//user
//putCalendars
//calendarSelectionForm
