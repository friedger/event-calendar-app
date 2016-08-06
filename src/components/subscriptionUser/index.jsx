import React from 'react';
import EventCal from '../eventCal';
import CalendarSelection from '../calendarSelection';
import WelcomePageHeader from '../welcomePageHeader';
import CalendarCodeTextArea from '../calendarCodeTextArea';
import NumberOfEventsToDisplay from '../numberOfEventsSelection';

export default React.createClass({
    render() {
        const {user, authUrl} = this.props;
        return (
            <div className="col-md-10 col-sm-offset-1">
                 {user.calendarAuthorised ?
                     <div>
                         <p>1) Choose which of your calendars to display</p>
                         <CalendarSelection onChange={this.props.putCalendars}
                             initialValues={this.props.calendarFormInitialValues}
                             fields={Object.keys(this.props.user.calendars)}
                             calendars={this.props.user.calendars}/>
                         <p>2) How many events would you like to display at one time?</p>
                         <NumberOfEventsToDisplay putSettingsAction={this.props.putSettings}/>
                         <hr />
                         <EventCal userId={this.props.user.userId} activeCalendars={this.props.selectedCalendars.length}/>
                         <hr />
                         <CalendarCodeTextArea shopifyUser={this.props.user.shopifyUser} calendarBuildUrl={this.props.calendarBuildUrl} userId={this.props.user.userId}/>
                     </div>
                         :
                     <div>
                         <WelcomePageHeader />
                         <a href={authUrl} className="start-trial">Link my calendar</a>
                     </div>
                 }
             </div>
        )
    }
});

//user
//putCalendars
//calendarSelectionForm
