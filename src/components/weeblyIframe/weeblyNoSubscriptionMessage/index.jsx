if (typeof window !== 'undefined') {
    require('./style.scss');
}

import React from 'react';

export default React.createClass({
    render() {
        return (
            <div className="weebly-no-subscription">
                <i className="fa fa-info-circle" aria-hidden="true"></i>
                Your Event Calendar will be disabled until your start a plan.
            </div>
        );
    }
});
