import React from 'react';
const Link = require('react-router').Link;

export default React.createClass({
    render() {
        return (
            <div>
                <div className="row calendar-trial-divide">
                    <div className="col-md-12">
                        <hr />
                    </div>
                </div>
                <div className="start-trial-container">
                    <p>
                        Once you&#39;re ready to add the calendar to your site,
                        follow the link below to begin your trial.{' '}
                    </p>
                    <Link
                        className="start-trial start-trial--smaller-margin"
                        to="/account"
                        >
                        Start your free trial
                    </Link>
                </div>
            </div>
        );
    }
});
