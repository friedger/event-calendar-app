require('./style.scss');
import React from 'react';
const config = require('../../../config');
const StripeCheckout = require('react-stripe-checkout');
import cn from 'classnames';

export default React.createClass({
    getUrlForPlan(planId) {
        return `${this.props.beginPaymentUrl}&planId=${planId}`;
    },
    render() {
        const { activePlan } = this.props;
        const stripePublishableToken = this.props.testMode
            ? 'pk_test_cYLFCC3SbZhSHnpTZgzqHZZ9'
            : config.stripePublishableToken;
        return (
            <div className="pricing-plan__start-plan col-md-12">
                {((!activePlan && !this.props.beginPaymentUrl) ||
                    activePlan.status === 'cancelled') &&
                    <StripeCheckout
                        token={this.props.beginPaymentAction}
                        name="Event Calendar App"
                        description="Cancelable Subscription"
                        currency="USD"
                        stripeKey={stripePublishableToken}
                    >
                        <a
                            className={cn(
                                { action: !this.props.highlight, secondary: this.props.highlight },
                                'full-width'
                            )}
                        >
                            Start plan
                        </a>
                    </StripeCheckout>}
                {activePlan &&
                    activePlan.status === this.props.planName &&
                    <button className="default full-width">This plan is active</button>}
                {activePlan &&
                    activePlan.status !== 'cancelled' &&
                    <a href={this.getUrlForPlan(this.props.planId)} className="action full-width">
                        Start Plan
                    </a>}
            </div>
        );
    }
});
