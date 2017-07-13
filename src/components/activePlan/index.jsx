require('./style.scss');
import React from 'react';

export default React.createClass({
    render() {
        return (
            <div className="col-md-12 active-plan">
                <h3>Active Plan:</h3>
                <div className="active-plan__billing-details">
                    <div className="active-plan__plan-name">Current Plan: <strong>Professional</strong></div>
                    <div className="active-plan__billing-details__content">
                        <div className="active-plan__billing-detail">
                            <span className="active-plan__billing-detail__name">Billing cycle:</span> <span className="active-plan__billing-detail__value">Monthly</span>
                        </div>
                        <div className="active-plan__billing-detail">
                            <span className="active-plan__billing-detail__name">Plan cost:</span> <span className="active-plan__billing-detail__value">$4.99</span>
                        </div>
                        <div className="active-plan__billing-detail">
                            <span className="active-plan__billing-detail__name">Next billing day:</span> <span className="active-plan__billing-detail__value">6th July 2017</span>
                        </div>
                    </div>
                </div>
                <div className="active-plan__cancel">
                    <a className="" href="mailto:hello@eventcalendarapp.com">Request cancellation</a>
                </div>
            </div>
        )
    }
});
