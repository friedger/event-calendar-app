require('./style.scss');

import React from 'react';
const StripeCheckout = require('react-stripe-checkout');
const config = require('../../../config');

export default React.createClass({
    getInitialState() {
        return {displayTokenInput: false};
    },
    submitPayment(token) {
        return this.props.submitPaymentAction(this.props.testMode, token, (this.refs.coupon && this.refs.coupon.value));
    },
    render() {
        const stripePublishableToken = this.props.testMode ? 'pk_test_cYLFCC3SbZhSHnpTZgzqHZZ9' : config.stripePublishableToken;
        return (
            <div className="begin-trial row">
                <div className="col-md-12">
                    <StripeCheckout
                        token={this.submitPayment}
                        image="/images/logo-stripe.jpg"
                        name='Event Calendar App'
                        description="Cancelable Subscription"
                        currency='USD'
                        stripeKey={stripePublishableToken}>
                        <a className="start-trial">Start your free trial</a>
                    </StripeCheckout>
                    {!this.state.displayTokenInput && <span onClick={() => {this.setState({displayTokenInput: true})}}>Got a coupon?</span>}
                    {this.state.displayTokenInput && <input className="form-control" ref="coupon" placeholder="Coupon code" type="text"/>}

                </div>
            </div>
        )
    }
});
