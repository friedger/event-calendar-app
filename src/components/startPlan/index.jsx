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
        const {
            activePlan,
            beginPaymentUrl,
            planId,
            highlight,
            testMode,
            beginPaymentAction,
            planName
        } = this.props;
        const stripePublishableToken = testMode
            ? 'pk_test_cYLFCC3SbZhSHnpTZgzqHZZ9'
            : config.stripePublishableToken;
        return (
            <div className="pricing-plan__start-plan col-md-12">
                {((!activePlan && !beginPaymentUrl) || (activePlan && activePlan.status) === 'cancelled') &&
                    <StripeCheckout
                        token={beginPaymentAction && beginPaymentAction.bind(null, planId)}
                        name="Event Calendar App"
                        description="Cancelable Subscription"
                        currency="USD"
                        stripeKey={stripePublishableToken}
                    >
                        <a
                            className={cn(
                                { action: !highlight, secondary: highlight },
                                'full-width'
                            )}
                        >
                            Start plan
                        </a>
                    </StripeCheckout>}
                {activePlan &&
                    activePlan.status === planName &&
                    <button disabled className="default full-width disabled">This plan is active</button>}
                {activePlan &&
                    activePlan.status !== 'cancelled' && activePlan.status !== planName &&
                    <a href={this.getUrlForPlan(planId)} className="action full-width">
                        Start Plan
                    </a>}
            </div>
        );
    }
});
