require('./style.scss');
import React from 'react';
import ActivePlan from './activePlan';
import StartPlan from './startPlan';
import { Modal } from 'react-bootstrap';

export default React.createClass({
    getInitialState() {
        return {
            showComparisonModal: false
        };
    },
    getUrlForPlan(planId) {
        return `${this.props.beginPaymentUrl}&planId=${planId}`;
    },
    toggleComparisonModal() {
        this.setState({ showComparisonModal: !this.state.showComparisonModal });
    },
    render() {
        const { activePlan, userHasNoPlan, upgradePaymentAction, updateCardDetails } = this.props;
        return (
            <div className="col-md-12 account__container">
                <div className="row account__content">
                    {activePlan && !userHasNoPlan && (
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
                    <div className="plans">
                        <div className="col-md-4">
                            <div className="pricing-plan">
                                <div className="pricing-plan__header">HOBBY</div>
                                <div className="pricing-plan__price-container">
                                    <div className="pricing-plan__hero-container">
                                        <img className="pricing-plan__hero" src="/images/pricing1.png" />
                                    </div>
                                    <div className="pricing-plan__price">
                                        $9.99
                                        <span className="pricing-plan__price__time-period">/month</span>
                                    </div>
                                    <div className="pricing-plan__seperating-border" />
                                    <div className="pricing-plan__under-price-text">7 DAY FREE TRIAL</div>
                                </div>
                                <div className="pricing-plan__features">
                                    <ul>
                                        <li>Unlimited Traffic</li>
                                        <li>Unlimited Events</li>
                                        <li>
                                            <strong>1</strong> Event Calendar
                                        </li>
                                        <li>Google, Apple, Outlook, Facebook Integration</li>
                                        <li
                                            className="pricing-plan__comparison-link"
                                            onClick={() => this.toggleComparisonModal()}
                                        >
                                            <strong>Basic</strong> feature set{' '}
                                            <i className="fa fa-question-circle" aria-hidden="true" />
                                        </li>
                                        <li className="negative">ECA Brand Free</li>
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
                                        email={this.props.user && this.props.user.email}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="pricing-plan professional">
                                {!this.props.activePlan && <div className="pricing-plan__highlight">Most Popular!</div>}
                                <div className="pricing-plan__header">PROFESSIONAL</div>
                                <div className="pricing-plan__price-container">
                                    <div className="pricing-plan__hero-container">
                                        <img className="pricing-plan__hero" src="/images/pricing2.png" />
                                    </div>
                                    <div className="pricing-plan__price">
                                        $19.99
                                        <span className="pricing-plan__price__time-period">/month</span>
                                    </div>
                                    <div className="pricing-plan__seperating-border" />
                                    <div className="pricing-plan__under-price-text">7 DAY FREE TRIAL</div>
                                </div>
                                <div className="pricing-plan__features">
                                    <ul>
                                        <li>Unlimited Traffic</li>
                                        <li>Unlimited Events</li>
                                        <li>
                                            <strong>3</strong> Event Calendars
                                        </li>
                                        <li>Google, Apple, Outlook, Facebook Integration</li>
                                        <li
                                            className="pricing-plan__comparison-link"
                                            onClick={() => this.toggleComparisonModal()}
                                        >
                                            <strong>Premium</strong> feature set{' '}
                                            <i className="fa fa-question-circle" aria-hidden="true" />
                                        </li>
                                        <li className="negative">ECA Brand Free</li>
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
                                        email={this.props.user && this.props.user.email}
                                    />
                                )}
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="pricing-plan">
                                <div className="pricing-plan__header">BUSINESS</div>
                                <div className="pricing-plan__price-container">
                                    <div className="pricing-plan__hero-container">
                                        <img className="pricing-plan__hero" src="/images/pricing3.png" />
                                    </div>
                                    <div className="pricing-plan__price">
                                        $39.99
                                        <span className="pricing-plan__price__time-period">/month</span>
                                    </div>
                                    <div className="pricing-plan__seperating-border" />
                                    <div className="pricing-plan__under-price-text">7 DAY FREE TRIAL</div>
                                    <div className="pricing-plan__features">
                                        <ul>
                                            <li>Unlimited Traffic</li>
                                            <li>Unlimited Events</li>
                                            <li>
                                                <strong>10</strong> Event Calendars
                                            </li>
                                            <li>Google, Apple, Outlook, Facebook Integration</li>
                                            <li
                                                className="pricing-plan__comparison-link"
                                                onClick={() => this.toggleComparisonModal()}
                                            >
                                                <strong>Premium</strong> feature set{' '}
                                                <i className="fa fa-question-circle" aria-hidden="true" />
                                            </li>
                                            <li>ECA Brand Free</li>
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
                                        email={this.props.user && this.props.user.email}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <Modal
                        show={this.state.showComparisonModal}
                        onHide={() => this.setState({ showComparisonModal: false })}
                    >
                        <table className="table plans-comparison">
                            <thead>
                                <tr>
                                    <th />
                                    <th className="center">Hobby</th>
                                    <th className="center">Professional</th>
                                    <th className="center">Business</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Unlimited Traffic</th>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Unlimited Events</th>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Number of Event Calendars</th>
                                    <td className="center">1</td>
                                    <td className="center">3</td>
                                    <td className="center">10</td>
                                </tr>
                                <tr>
                                    <th scope="row">Analytics</th>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Social Media Sharing</th>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Grid, List and Tile View</th>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Google, Apple, Outlook Sync</th>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Subscriptions</th>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Sync with ICS Feed</th>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Event Images</th>
                                    <td className="center">
                                        <img src="/images/x.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Ticket Links</th>
                                    <td className="center">
                                        <img src="/images/x.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Filters</th>
                                    <td className="center">
                                        <img src="/images/x.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Colour Coded Events</th>
                                    <td className="center">
                                        <img src="/images/x.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Themes</th>
                                    <td className="center">
                                        <img src="/images/x.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Google maps integration</th>
                                    <td className="center">
                                        <img src="/images/x.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Brand Free Calendar</th>
                                    <td className="center">
                                        <img src="/images/x.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/x.png" />
                                    </td>
                                    <td className="center">
                                        <img src="/images/check-circle.png" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Modal>
                    {!activePlan && userHasNoPlan && (
                        <div className="col-md-12 faq">
                            <h2 className="center">FAQ</h2>
                            <div className="faq__content">
                                <p className="subtitle">What happens when I start a free trial?</p>
                                <p>
                                    Once you've started your free trial, you'll have full access to all of our features.
                                    Specifically, you will be able to integrate the calendar on your website.
                                </p>
                                <p className="subtitle">When will I be charged?</p>
                                <p>
                                    We only take the first payment 7 days after you begin your trial. You can cancel at
                                    any point before this, and you wont be charged a penny.
                                </p>
                                <p className="subtitle">Can I cancel at any point?</p>
                                <p>Yes. There is no yearly contracts involved.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
});
