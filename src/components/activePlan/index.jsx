require('./style.scss');
import React from 'react';
import capitalize from 'capitalize';

export default React.createClass({
    render() {
        const { activePlan } = this.props;
        if (activePlan.status === 'cancelled') {
            return (
                <div className="col-md-12">
                    <div className="active-plan__cancelled">
                        This account has been cancelled. Please choose a plan to continue your subscription
                    </div>
                </div>
            );
        }
        return (
            <div className="col-md-12 active-plan">
                <h3>Active Plan:</h3>
                <div className="active-plan__billing-details">
                    <div className="active-plan__plan-name">Current Plan: <strong>{capitalize(activePlan.status)}</strong></div>
                    <div className="active-plan__billing-details__content">
                        <div className="active-plan__billing-detail">
                            <span className="active-plan__billing-detail__name">Billing cycle:</span> <span className="active-plan__billing-detail__value">{capitalize(activePlan.cycle)}</span>
                        </div>
                        <div className="active-plan__billing-detail">
                            <span className="active-plan__billing-detail__name">Plan cost:</span> <span className="active-plan__billing-detail__value">${activePlan.price}</span>
                        </div>
                        <div className="active-plan__billing-detail">
                            <span className="active-plan__billing-detail__name">Next billing day:</span> <span className="active-plan__billing-detail__value">{activePlan.billingOn}</span>
                        </div>
                        {activePlan.trialEnds &&
                            <div className="active-plan__billing-detail">
                                <span className="active-plan__billing-detail__name">Trial ends on:</span> <span className="active-plan__billing-detail__value">{activePlan.trialEnds}</span>
                            </div>
                        }
                    </div>
                </div>
                <div className="active-plan__cancel">
                    <a className="" href="mailto:hello@eventcalendarapp.com">Request cancellation</a>
                </div>
            </div>
        );
    }
});
