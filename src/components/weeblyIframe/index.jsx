if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';
const config = require('../../../config');

export default React.createClass({
    render() {
        return (
            <div className="weebly-iframe">
                <a target="_blank" href="/dashboard">Go to your Dashboard</a>
            </div>
        )
    }
});
