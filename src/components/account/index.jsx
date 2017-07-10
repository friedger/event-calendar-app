require('./style.scss');
import React from 'react';
export default React.createClass({
    render() {
        return (
            <div className="col-md-12 account__container">
                <div className="row account__header">
                    <div className="col-md-12">
                        <h2>Billing</h2>
                        <span className="account__header__subtitle">Manage your plan</span>
                    </div>
                </div>
                <div className="row account__content">
                        <div className="col-md-12">
                            <h3>Plans:</h3>
                        </div>
                        <div className="plans2">
                            <div className="col-md-4">
                                <div className="pricing-plan">
                                    <div className="pricing-plan__header">
                                        HOBBY
                                    </div>
                                    <div className="pricing-plan__price-container">
                                        <div className="pricing-plan__price">
                                            $9.99
                                            <span className="pricing-plan__price__time-period">/month</span>
                                        </div>
                                        <div className="pricing-plan__seperating-border"></div>
                                        <div className="pricing-plan__under-price-text">7 DAY FREE TRIAL</div>
                                    </div>
                                    <div className="pricing-plan__features">
                                        <ul>
                                            <li>Unlimited Traffic</li>
                                            <li>1 Event Calendar</li>
                                            <li>Grid & Map View</li>
                                            <li>Event Images</li>
                                            <li>Google, Apple, Outlook Integration</li>
                                            <li>ICS Support</li>
                                            <li>Event Thumbnails</li>
                                            <li>Event Calendar Search</li>
                                        </ul>
                                    </div>
                                    <div className="pricing-plan__notes">
                                        Cancel during your trial period and you will not be charged.
                                    </div>
                                    <div className="pricing-plan__start-plan col-md-12">
                                        <button className="default full-width">This plan is active</button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="pricing-plan">
                                    <div className="pricing-plan__highlight">
                                        Most Popular!
                                    </div>
                                    <div className="pricing-plan__header">
                                        PROFESSIONAL
                                    </div>
                                    <div className="pricing-plan__price-container">
                                        <div className="pricing-plan__price">
                                            $19.99
                                            <span className="pricing-plan__price__time-period">/month</span>
                                        </div>
                                        <div className="pricing-plan__seperating-border"></div>
                                        <div className="pricing-plan__under-price-text">7 DAY FREE TRIAL</div>
                                    </div>
                                    <div className="pricing-plan__features">
                                        <ul>
                                            <li>All hobby features</li>
                                            <li>Multi Event Calendar support (up to 5)</li>
                                            <li>Subscribable Event Calendar</li>
                                            <li>Ticket Links</li>
                                            <li>-</li>
                                            <li>-</li>
                                            <li>-</li>
                                            <li>-</li>
                                        </ul>
                                    </div>
                                    <div className="pricing-plan__notes">
                                        Cancel during your trial period and you will not be charged.
                                    </div>
                                    <div className="pricing-plan__start-plan col-md-12">
                                        <button className="secondary full-width">Start Plan</button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="pricing-plan">
                                    <div className="pricing-plan__header">
                                        BUSINESS
                                    </div>
                                    <div className="pricing-plan__price-container">
                                        <div className="pricing-plan__price">
                                            $39.99
                                            <span className="pricing-plan__price__time-period">/month</span>
                                        </div>
                                        <div className="pricing-plan__seperating-border"></div>
                                            <div className="pricing-plan__under-price-text">7 DAY FREE TRIAL</div>
                                            <div className="pricing-plan__features">
                                                <ul>
                                                    <li>All hobby and professional features</li>
                                                    <li>Multi Event Calendar support (up to 10)</li>
                                                    <li>No Event Calendar App Branding</li>
                                                    <li>-</li>
                                                    <li>-</li>
                                                    <li>-</li>
                                                    <li>-</li>
                                                    <li>-</li>
                                                </ul>
                                            </div>
                                    </div>
                                    <div className="pricing-plan__notes">
                                        Cancel during your trial period and you will not be charged.
                                    </div>
                                    <div className="pricing-plan__start-plan col-md-12">
                                        <button className="action full-width">Start Plan</button>
                                    </div>
                                </div>
                            </div>

                    </div>
                </div>
            </div>
        )
    }
});
