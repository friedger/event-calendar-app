import React from 'react';
import EventCal from '../eventCal';
import CalendarSelection from '../calendarSelection';
import WelcomePageHeader from '../welcomePageHeader';
import CalendarCodeTextArea from '../calendarCodeTextArea';

export default React.createClass({
    render() {
        const {user, authUrl} = this.props;
        return (
            <div>
                 {user.calendarAuthorised ?
                     <div>
                         <h1>Build your calendar</h1>
                         <p>1) Choose which of your calendars to display</p>
                         <CalendarSelection onChange={this.props.putCalendars}
                             initialValues={this.props.calendarFormInitialValues}
                             fields={Object.keys(this.props.user.calendars)}
                             calendars={this.props.user.calendars}/>
                         <CalendarCodeTextArea shopifyUser={this.props.user.shopifyUser} calendarBuildUrl={this.props.calendarBuildUrl} userId={this.props.user.userId}/>
                         <p>3) And your calendar will look like this</p>
                         <EventCal userId={this.props.user.userId} activeCalendars={this.props.selectedCalendars.length}/>
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
