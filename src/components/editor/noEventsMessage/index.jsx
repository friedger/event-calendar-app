require('./style.scss');

import React from 'react';

export default React.createClass({
    componentDidMount() {
        $('.venobox').venobox();
    },
    render() {
        return (
            <div className="row">
                <div className="eca-dashboard__no-events-message-container">
                    <a className="eca-dashboard__no-events-message venobox" data-gall="gall-video" data-autoplay="true" data-vbtype="video" href="https://www.youtube.com/watch?v=B8EpN74FVBE">
                        <p><i className="fa fa-plus" aria-hidden="true"></i> Add some events to your selected calendars to get started</p>
                        <p>Need some help?</p>
                    </a>
                </div>
            </div>
        )
    }
});
