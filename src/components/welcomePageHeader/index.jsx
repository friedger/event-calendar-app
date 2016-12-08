import React from 'react';

import EventCal from '../eventCal';
import CalendarSelection from '../calendarSelection';

export default React.createClass({
    render() {

        const {user, authUrl} = this.props;

        return (
            <div>
                <h1>Let&#39;s set up your calendar</h1>
                <p>Hi there!</p>
                <p>Thank you very much for registering.</p>
                <p>Im super excited that you&#39;re ready to start creating your calendar. Let&#39;s get started!</p>
            </div>
        )
    }
});
