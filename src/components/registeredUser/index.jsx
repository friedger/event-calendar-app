import React from 'react';
import FirstTimeLinkMessage from '../firstTimeLinkMessage';
import BeginTrial from '../beginTrial';
import EventCal from '../eventCal';
import CalendarSelection from '../calendarSelection';
import WelcomePageHeader from '../welcomePageHeader';

export default React.createClass({
    render() {
        const {user, authUrl} = this.props;
        return (
            <div>
                 {user.calendarAuthorised ?
                     <div>
                         <FirstTimeLinkMessage />
                         <CalendarSelection onChange={this.props.putCalendars}
                             initialValues={this.props.calendarFormInitialValues}
                             fields={Object.keys(this.props.user.calendars)}
                             calendars={this.props.user.calendars}/>
                         <EventCal userId={this.props.user.userId} activeCalendars={this.props.selectedCalendars.length}/>
                         <BeginTrial submitPaymentAction={this.props.submitPaymentAction}/>
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
