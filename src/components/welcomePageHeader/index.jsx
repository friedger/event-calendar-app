import React from 'react';

import EventCal from '../eventCal';
import CalendarSelection from '../CalendarSelection';

export default React.createClass({
    render() {

        const {user, authUrl} = this.props;

        return (
            <div className="container">
                <h1>Let&#39;s set up your calendar</h1>
                <p>Hi there!</p>
                <p>Thank you very much for registering.</p>
                <p>Im super excited that you&#39;re ready to start creating your calendar. Let&#39;s get started!</p>
            </div>
        )
    }
});


// {user.calendarAuthorised ?
//     <EventCal activeCalendars={1} userId={user.userId}/>
//     :
//     <a href={authUrl} className="start-trial">Link my calendar</a>
// }
// <p>Once you&#39;re ready to add your calendar to you&#39;re site, all new customers are entitled to a <strong>7 day trial</strong>. Only after that point, if you do not cancel, will your card be charged</p>
// <a href="#" className="start-trial">Start your free trial</a>
