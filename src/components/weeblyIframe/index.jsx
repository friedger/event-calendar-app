if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';
const config = require('../../../config');

export default React.createClass({
    render() {
        return (
            <div className="weebly-iframe">
                <a target="_blank" href="/dashboard"><i className="fa fa-wrench" aria-hidden="true"></i> Go to your Calendar Editor</a>
            </div>
        )
    }
});
