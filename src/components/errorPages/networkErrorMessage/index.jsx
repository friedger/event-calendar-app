require('./style.scss');

import React from 'react';
import { Link } from "react-router-dom";

module.exports = React.createClass({
    reloadDashboard() {
        window.location.href='/dashboard';
    },
    render() {
        return (
            <div className="errorPage">
                <div className="errorPage__content">
                    <h2>Our greatest apologies.</h2>
                    <p>There has been a network error. Rest assured that we are working on this as quickly as possible.</p>
                    <a onClick={this.reloadDashboard} className="button action" to="/dashboard">Try again</a>
                    <a className="button secondary secondary--inverse" href="mailto:hello@eventcalendarapp.com">Get in touch</a>
                </div>
            </div>
        );
    }
});
