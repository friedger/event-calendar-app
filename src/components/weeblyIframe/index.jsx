if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';

export default React.createClass({
    render() {
        return (
            <div className="weebly-iframe">
                <a href="https://eventcalendarapp.hopto.org:1212/dashboard">Go to your Dashboard</a>
            </div>
        )
    }
});
