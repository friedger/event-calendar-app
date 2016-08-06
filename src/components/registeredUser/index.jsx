import React from 'react';
import FirstTimeLinkMessage from '../firstTimeLinkMessage';
import BeginTrial from '../beginTrial';
import EventCal from '../eventCal';
import CalendarSelection from '../calendarSelection';
import WelcomePageHeader from '../welcomePageHeader';
import NumberOfEventsSelection from '../numberOfEventsSelection';
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
            <div className="col-md-10 col-sm-offset-1">
                 {user.calendarAuthorised ?
                     <div>
                         <p>1) Choose which calendars you would like to use on your calendar</p>
                         <CalendarSelection onChange={this.props.putCalendars}
                             initialValues={this.props.calendarFormInitialValues}
                             fields={Object.keys(this.props.user.calendars)}
                             calendars={this.props.user.calendars}/>
                         <p>2) Choose your preferences</p>
                         <NumberOfEventsSelection putSettingsAction={this.props.putSettings}/>
                         <hr />
                         <EventCal userId={this.props.user.userId} activeCalendars={this.props.selectedCalendars.length}/>
                         <BeginTrial submitPaymentAction={this.props.submitPaymentAction}/>
                     </div>
                         :
                     <div>
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
