require('./style.scss');

import React from 'react';

module.exports = React.createClass({
    render() {
        return (
            <div className="errorPage">
                <div className="errorPage__content">
                    <h2>Our greatest apologies.</h2>
                    <p>We've currently got a problem with this account. Please get in touch and we will fix it ASAP.</p>
                    <a className="button secondary" href="mailto:hello@eventcalendarapp.com">Get in touch</a>
                </div>
            </div>
        );
    }
});
