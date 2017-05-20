require('./style.scss');
import BeginTrial from '../beginTrial';

import React from 'react';

export default React.createClass({
    render() {
        return (
            <div className="plans">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Start your free trial</h2>
                            <p className="italic">We've kept pricing as simple as it can possibly be. No tiers. <strong>Just one set monthly price.</strong></p>
                            <div className="pricing-plan">
                                <div className="pricing-plan__header">
                                    Event Calendar App
                                </div>
                                <div className="pricing-plan__price-container">
                                    <div className="pricing-plan__price">
                                        $19.99 <span className="pricing-plan__price__time-period">/month</span>
                                    </div>
                                    <div className="pricing-plan__seperating-border"></div>
                                    <div className="pricing-plan__under-price-text">7 DAY FREE TRIAL</div>
                                </div>
                            <div className="pricing-plan__notes">
                                Cancel during your trial period and you will not be charged.
                            </div>
                        </div>
                        <p className="normal">All customers receive a <strong>7 day trial</strong>. You will not be charged until the end of your trial.</p>
                        <BeginTrial submitPaymentAction={this.props.paymentAction} user={this.props.user}/>
                        </div>
                    </div>
                </div>
                <div className="faq">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8">
                                <h2>FAQ</h2>
                                <strong>What happens when I start a free trial?</strong>
                                <p className="lighter">Once you've started your free trial, you'll have full access to all of our features. Specifically, you will be able to integrate the calendar on your website.</p>
                                <strong>When will I be charged?</strong>
                                <p className="lighter">We only take the first payment 7 days after you begin your trial. You can cancel at any point before this, and you wont be charged a penny.</p>
                                <strong>Why do you need my card details up front?</strong>
                                <p className="lighter">By asking for card details up-front means that we can spend more time helping those who are serious about using the product. It also means that if you do wish to pay for Event Calendar App, your service will remain uninterrupted.</p>
                                <strong>I have more questions regarding payment.</strong>
                                <p className="lighter">No worries at all, we're here to help. Get in touch using the contact button in the bottom right hand corner of the screen.</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});
