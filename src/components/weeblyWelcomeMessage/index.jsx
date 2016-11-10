if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';

export default React.createClass({
    render() {
        return (
            <div className="weebly-no-calendar-linked">
                Link Event Calendar App to your calendar to display events. Click the link below to get started.
            </div>
        )
    }
});
