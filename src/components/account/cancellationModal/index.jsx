require('./style.scss');
import React from 'react';
import { Modal } from 'react-bootstrap';
import Loader from 'react-loader';

const CancellationModal = React.createClass({
    getInitialState() {
        return {
            modalOpen: false,
            showShopifyMessage: false
        };
    },
    shouldRenderMessageWithAnalytics() {
        return this.props.subscriberCount && this.props.subscriberCount > 8;
    },
    renderMessageWithAnalytics() {
        return (
            <div>
                <p className="large" style={{ color: '#da4167' }}>
                    <strong>Your customers love your Event Calendar.</strong>
                </p>

                <p>You currently have:</p>

                <p className="statistic">❤️ {this.props.subscriberCount} Subscribers</p>

                <p>
                    Each of these subscribers is getting constant updates about your
                    events. When you cancel your subscription, this functionality will
                    stop working.
                </p>

                <p>Your Event Calendar has also been viewed:</p>

                <p className="statistic">📊 {this.props.widgetViews} times.</p>

                <p>
                    I really hope you decide to stick around. If not, no worries, I
                    fully appreciate Event Calendar App isn't for everybody.{' '}
                </p>
            </div>
        )
    },
    showIntercom(e) {
        e.preventDefault();
        window.Intercom('show');
    },
    renderMessageWithoutAnalytics() {
        if (this.props.shopifyUser && !this.state.showShopifyMessage) {
            return this.setState({showShopifyMessage: true});
        }
        return (
            <div>
                <p className="large" style={{ color: '#da4167' }}>
                    {this.props.shopifyUser &&
                        <div>
                            <p>Really sorry to see you go. 😔</p>
                        </div>
                    }
                    <p>I'm really sorry that you wish to leave. 😔</p>
                    <p>If there's anything that I can do or something that Event Calendar App is missing for you, <a className="normal underline" href="#" onClick={this.showIntercom}>then please just let me know</a>. Theres a good chance we can fix that.</p>
                    <p>Otherwise, hit the button below to send a cancellation message. <strong>It has been a pleasure to have you on board!</strong></p>
                </p>
            </div>
        )
    },
    render() {
        const loading = this.props.loading;

        return (
            <div>
                <Modal
                    show={this.state.modalOpen}
                    onHide={() => this.setState({ modalOpen: false })}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <span>Just before you go...</span>
                        </Modal.Title>
                    </Modal.Header>
                    <div className="col-md-12 connection-modal">
                        <div className="cancellation-modal">
                            {loading &&
                            <div className="cancellation-modal__loader">
                                <Loader
                                type="spin"
                                color="#000"
                                width={2}
                                radius={3}
                                top={'0'}
                            />
                            <div className="cancellation-modal__loader-text">Fetching account details</div>
                            </div>
                            }

                            {!loading && this.shouldRenderMessageWithAnalytics() && this.renderMessageWithAnalytics()}

                            {!loading && !this.shouldRenderMessageWithAnalytics() && this.renderMessageWithoutAnalytics()}

                            {!loading && !this.props.shopifyUser && (
                                <a
                                    className="cancellation-modal__cancel-link"
                                    href="mailto:hello@eventcalendarapp.com"
                                >
                                    Request Cancellation
                                </a>
                            )}
                            {!loading && this.props.shopifyUser &&
                                !this.state.showShopifyMessage && (
                                    <button
                                        onClick={() => {
                                            this.setState({ showShopifyMessage: true });
                                        }}
                                        className="default cancellation-modal__cancel-link"
                                        href="mailto:hello@eventcalendarapp.com"
                                    >
                                        Cancellation Instructions
                                    </button>
                                )}
                            {!loading && this.state.showShopifyMessage && (
                                <div>
                                <p>
                                    To cancel your account with us, simply delete Event Calendar
                                    App from your Shopify account.
                                </p>
                                <a href="mailto:hello@eventcalendarapp.com">Please let us know what we were missing for you.</a>
                                </div>
                            )}
                        </div>
                    </div>
                </Modal>
                <a
                    className=""
                    onClick={() => {
                        if (!this.props.subscriberCount) {
                            this.props.getAnalyticsAction();
                        }
                        this.setState({ modalOpen: true });
                    }}
                >
                    Request cancellation
                </a>
            </div>
        );
    }
});

export default CancellationModal;
