import React from 'react';
import FirstTimeLinkMessage from '../firstTimeLinkMessage';
import BeginTrial from '../beginTrial';
import EventCal from '../eventCal';
import CalendarSelection from '../calendarSelection';
import WelcomePageHeader from '../welcomePageHeader';

export default React.createClass({
    _getSelectedCalendars() {
        if (!this.props.calendarSelectionForm) {
            return [];
        }

        return Object.keys(this.props.calendarSelectionForm)
        .filter(key => key.charAt(0) !== '_')
        .reduce((collection, current) => {
            if (this.props.calendarSelectionForm[current].value) {
                collection.push(current);
            }
            return collection;
        }, []);
    },
    _getFormInitialValues() {
        return Object.keys(this.props.user.calendars).reduce((collection, current) => {
            collection[current] = this.props.user.calendars[current].selected;
            return collection;
        }, {});
    },
    render() {
        const {user, authUrl} = this.props;
        return (
            <div>
                 {user.calendarAuthorised ?
                     <div>
                         <FirstTimeLinkMessage />
                         <CalendarSelection onChange={this.props.putCalendars}
                             initialValues={this._getFormInitialValues()}
                             fields={Object.keys(this.props.user.calendars)}
                             calendars={this.props.user.calendars}/>
                         <EventCal userId={this.props.user.userId} activeCalendars={this._getSelectedCalendars().length}/>
                         <BeginTrial/>
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
