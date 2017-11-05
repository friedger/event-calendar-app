require('./style.scss');
import React from 'react';
const StripeCheckout = require('react-stripe-checkout');
const config = require('../../../../config');

export default React.createClass({
    render() {
        const stripePublishableToken = this.props.testMode ? 'pk_test_cYLFCC3SbZhSHnpTZgzqHZZ9' : config.stripePublishableToken;
        return (
            <StripeCheckout
                token={this.props.updateCardDetails && this.props.updateCardDetails}
                name="Event Calendar App"
                panelLabel="Update details"
                image="/images/logo-stripe.jpg"
                description="Update card details"
                allowRememberMe={false}
                currency="USD"
                stripeKey={stripePublishableToken}
            >
                <a
                    className='action update-card-details-button'
                >
                    Update card detais
                </a>
            </StripeCheckout>
        );
    }
});
