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
                {!this.props.user.weeblyUser && <p><strong>This calendar can be integrated anywhere on your site with a simple line of code.</strong></p> }
                <p>Once you&#39;re ready to add your calendar to you&#39;re site, all new customers are entitled to a <strong>7 day trial</strong>. Only after that point, if you do not cancel, will your card be charged</p>
                <StripeCheckout
                    token={this.submitPayment}
                    name='Event Calendar App'
                    description="Cancelable Subscription"
                    currency='USD'
                    stripeKey={stripePublishableToken}>
                    <a className="start-trial">Start your free trial</a>
                </StripeCheckout>
                {!this.state.displayTokenInput && <span onClick={() => {this.setState({displayTokenInput: true})}}>Got a coupon?</span>}
                {this.state.displayTokenInput && <input className="form-control" ref="coupon" placeholder="Coupon code" type="text"/>}
            </div>
        )
    }
});
