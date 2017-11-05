require('./style.scss');
import React from 'react';
const config = require('../../../../config');
const StripeCheckout = require('react-stripe-checkout');
import cn from 'classnames';
import { Modal } from 'react-bootstrap';
import Loader from 'react-loader';

export default React.createClass({
    getInitialState() {
        return { modalOpen: false, shopifyLinkClicked: false };
    },
    getUrlForPlan(planId) {
        return `${this.props.beginPaymentUrl}&planId=${planId}`;
    },
    render() {
        const {
            activePlan,
            planId,
            highlight,
            testMode,
            beginPaymentAction,
            planName,
            shopifyUser,
            upgradePaymentAction
        } = this.props;
        const stripePublishableToken = testMode
            ? 'pk_test_cYLFCC3SbZhSHnpTZgzqHZZ9'
            : config.stripePublishableToken;
        const accountIsCancelled = activePlan && activePlan.status === 'cancelled';

        if (activePlan && activePlan.status === planName) {
            return (
                <div className="pricing-plan__start-plan col-md-12">
                    <button disabled className="default full-width disabled">
                        This plan is active
                    </button>
                </div>
            );
        }

        return (
            <div className="pricing-plan__start-plan col-md-12">
                <Modal
                    show={this.state.modalOpen}
                    onHide={() => this.setState({ modalOpen: false })}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span>Upgrade your subscription</span>
                        </Modal.Title>
                    </Modal.Header>
                    <div className="col-md-12 connection-modal">
                        <div className="connection-modal__content">
                            Just checking that you want to change your subscription? No need for
                            your card details again.
                        </div>
                        <button
                            onClick={() => {
                                this.setState({ modalOpen: false });
                                upgradePaymentAction(planId);
                            }}
                            className="secondary full-width"
                        >
                            Upgrade
                        </button>
                    </div>
                </Modal>
                {((!activePlan && !shopifyUser) || (!shopifyUser && accountIsCancelled)) &&
                    <StripeCheckout
                        token={beginPaymentAction && beginPaymentAction.bind(null, planId)}
                        name="Event Calendar App"
                        image="/images/logo-stripe.jpg"
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
                {shopifyUser &&
                    <a
                        onClick={() => this.setState({ shopifyLinkClicked: true })}
                        href={this.getUrlForPlan(planId)}
                        className="action full-width"
                    >
                        {!this.state.shopifyLinkClicked && <span>Start Plan</span>}
                        {this.state.shopifyLinkClicked &&
                            <span>
                                <Loader left="25px" type="spin" color="#fff" width={2} radius={3} />
                                Redirecting to Shopify
                            </span>
                        }
                    </a>}
                {activePlan &&
                    !shopifyUser && !accountIsCancelled &&
                    <button
                        onClick={() => this.setState({ modalOpen: true })}
                        className="action full-width"
                    >
                        Start Plan
                    </button>}
            </div>
        );
    }
});
