require('./style.scss');
import React from 'react';
import ActivePlan from './activePlan';
import StartPlan from './startPlan';

export default React.createClass({
    getUrlForPlan(planId) {
        return `${this.props.beginPaymentUrl}&planId=${planId}`;
    },
    render() {
        const { activePlan, userHasNoPlan, upgradePaymentAction, updateCardDetails } = this.props;
        return (
            <div className="col-md-12 account__container">
                <div className="row account__content">
                    {activePlan &&
                        !userHasNoPlan && (
                            <ActivePlan
                                shopifyUser={this.props.shopifyUser}
                                updateCardDetails={updateCardDetails}
                                activePlan={activePlan}
                            />
                        )}
                    <div className="col-md-12">
                        <h2>📊 Plans</h2>
                        <p>Choose the plan that best suits your business.</p>
                    </div>
                    <div className="plans2">
                        <div className="col-md-4">
                            <div className="pricing-plan">
                                <div className="pricing-plan__header">HOBBY</div>
                                <div className="pricing-plan__price-container">
                                    <div className="pricing-plan__price">
                                        $9.99
                                        <span className="pricing-plan__price__time-period">
                                            /month
                                        </span>
                                    </div>
                                    <div className="pricing-plan__seperating-border" />
                                    <div className="pricing-plan__under-price-text">
                                        7 DAY FREE TRIAL
                                    </div>
                                </div>
                                <div className="pricing-plan__features">
                                    <ul>
                                        <li>Unlimited Traffic</li>
                                        <li>Unlimited Events</li>
                                        <li>1 Event Calendar</li>
                                        <li>Grid & Map View</li>
                                        <li>Google, Apple, Outlook, Facebook Integration</li>
                                        <li>ICS Support</li>
                                        <li>Event Calendar Search</li>
                                        <li className="negative">Customers cannot subscribe</li>
                                        <li className="negative">No themes</li>
                                        <li class="negative">No event images</li>
                                        <li>-</li>
                                        <li>-</li>
                                        <li>-</li>
                                        <li>-</li>
                                        <li>-</li>
                                    </ul>
                                </div>
                                <div className="pricing-plan__notes">
                                    Cancel during your trial period and you will not be charged.
                                </div>
                                {(this.props.activePlan || userHasNoPlan) && (
                                        <StartPlan
                                            activePlan={this.props.activePlan}
                                            beginPaymentUrl={this.props.beginPaymentUrl}
                                            beginPaymentAction={this.props.beginPaymentAction}
                                            planName="hobby"
                                            shopifyUser={this.props.shopifyUser}
                                            planId={2}
                                            userHasNoPlan={userHasNoPlan}
                                            upgradePaymentAction={upgradePaymentAction}
                                        />
                                    )}
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="pricing-plan">
                                {!this.props.activePlan && (
                                    <div className="pricing-plan__highlight">Most Popular!</div>
                                )}
                                <div className="pricing-plan__header">PROFESSIONAL</div>
                                <div className="pricing-plan__price-container">
                                    <div className="pricing-plan__price">
                                        $19.99
                                        <span className="pricing-plan__price__time-period">
                                            /month
                                        </span>
                                    </div>
                                    <div className="pricing-plan__seperating-border" />
                                    <div className="pricing-plan__under-price-text">
                                        7 DAY FREE TRIAL
                                    </div>
                                </div>
                                <div className="pricing-plan__features">
                                    <ul>
                                        <li>Unlimited Traffic</li>
                                        <li>Unlimited Events</li>
                                        <li>Multi Event Calendar support <strong>(up to 3)</strong></li>
                                        <li>Grid & Map View</li>
                                        <li>Google, Apple, Outlook, Facebook Integration</li>
                                        <li>ICS Support</li>
                                        <li>Event Calendar Search</li>
                                        <li>Subscribable Event Calendar</li>
                                        <li>Ticket Links</li>
                                        <li>Event Images</li>
                                        <li>Event Thumbnails</li>
                                        <li>Event Filters</li>
                                        <li>Colour coded events</li>
                                        <li>Themes and custom designs</li>
                                        <li>-</li>
                                    </ul>
                                </div>
                                <div className="pricing-plan__notes">
                                    Cancel during your trial period and you will not be charged.
                                </div>
                                {(this.props.activePlan || userHasNoPlan) && (
                                        <StartPlan
                                            activePlan={this.props.activePlan}
                                            beginPaymentUrl={this.props.beginPaymentUrl}
                                            beginPaymentAction={this.props.beginPaymentAction}
                                            planName="professional"
                                            highlight={true}
                                            planId={5}
                                            userHasNoPlan={userHasNoPlan}
                                            shopifyUser={this.props.shopifyUser}
                                            upgradePaymentAction={upgradePaymentAction}
                                        />
                                    )}
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="pricing-plan">
                                <div className="pricing-plan__header">BUSINESS</div>
                                <div className="pricing-plan__price-container">
                                    <div className="pricing-plan__price">
                                        $39.99
                                        <span className="pricing-plan__price__time-period">
                                            /month
                                        </span>
                                    </div>
                                    <div className="pricing-plan__seperating-border" />
                                    <div className="pricing-plan__under-price-text">
                                        7 DAY FREE TRIAL
                                    </div>
                                    <div className="pricing-plan__features">
                                        <ul>
                                            <li>Unlimited Traffic</li>
                                            <li>Unlimited Events</li>
                                            <li>Multi Event Calendar support <strong>(up to 10)</strong></li>
                                            <li>Grid & Map View</li>
                                            <li>Google, Apple, Outlook, Facebook Integration</li>
                                            <li>ICS Support</li>
                                            <li>Event Calendar Search</li>
                                            <li>Subscribable Event Calendar</li>
                                            <li>Ticket Links</li>
                                            <li>Event Images</li>
                                            <li>Event Thumbnails</li>
                                            <li>Event Filters</li>
                                            <li>Colour coded events</li>
                                            <li>Themes and custom designs</li>
                                            <li><strong>No Event Calendar App Branding</strong></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="pricing-plan__notes">
                                    Cancel during your trial period and you will not be charged.
                                </div>
                                {(this.props.activePlan || userHasNoPlan) && (
                                        <StartPlan
                                            activePlan={this.props.activePlan}
                                            beginPaymentUrl={this.props.beginPaymentUrl}
                                            planName="business"
                                            beginPaymentAction={this.props.beginPaymentAction}
                                            planId={9}
                                            userHasNoPlan={userHasNoPlan}
                                            shopifyUser={this.props.shopifyUser}
                                            upgradePaymentAction={upgradePaymentAction}
                                        />
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
