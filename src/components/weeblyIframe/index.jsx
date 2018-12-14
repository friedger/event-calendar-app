require('./style.scss');

import React from 'react';

export default React.createClass({
    render() {
        return (
            <div className="weebly-iframe-container">
                <div className="weebly-iframe-images">
                    <img src="/images/main-app-image.png" />
                </div>
                <div className="weebly-iframe-content">
                    <a
                        style={{ 'fontSize': '16px' }}
                        className="button secondary"
                        target="_blank"
                        href="/dashboard"
                    >
                        <i className="fa fa-calendar" aria-hidden="true"></i> Launch Event Calendar App
                    </a>
                    <p><strong>Event Calendar App</strong> opens in a seperate window outside of Weebly. You can return to Weebly at any time.</p>
                </div>
            </div>
        );
    }
});
