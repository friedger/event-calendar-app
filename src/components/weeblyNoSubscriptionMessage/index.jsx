if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';

export default React.createClass({
    render() {
        return (
            <div className="weebly-no-subscription">
                You currently have no active subscription. Your calendar will expire soon.
            </div>
        )
    }
});
