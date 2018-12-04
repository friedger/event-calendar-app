require('./style.scss');
import React from 'react';
import { Modal } from 'react-bootstrap';
import Loader from 'react-loader';

const CancellationModal = React.createClass({
    getInitialState() {
        return {
            showShopifyMessage: false
        };
    },
    shouldRenderMessageWithAnalytics() {
        if (this.props.subscriberCount === 0) {
            return false;
        }
        return this.props.subscriberCount && (this.props.subscriberCount > 8);
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
                    Each of these subscribers is getting constant updates about your events. When you cancel your
                    subscription, this functionality will stop working.
                </p>

                <p>Your Event Calendar has also been viewed:</p>

                <p className="statistic">📊 {this.props.widgetViews} times.</p>

                <p>
                    I really hope you decide to stick around. If not, no worries, I fully appreciate Event Calendar App
                    isn't for everybody.{' '}
                </p>
            </div>
        );
    },
    showIntercom(e) {
        e.preventDefault();
        window.Intercom('show');
    },
    renderMessageWithoutAnalytics() {
        if (this.props.shopifyUser && !this.state.showShopifyMessage) {
            return this.setState({ showShopifyMessage: true });
        }
        return (
            <div>
                <p className="large" style={{ color: '#da4167' }}>
                    <p>I'm really sorry that you wish to leave. 😔</p>
                    <p>
                        If there's anything that I can do or something that Event Calendar App is missing for you,{' '}
                        <a className="normal underline" href="#" onClick={this.showIntercom}>
                            then please just let me know
                        </a>
                        . Theres a good chance we can fix that.
                    </p>
                    <p>
                        Otherwise, hit the button below to start the cancellation process.{' '}
                        <strong>It has been a pleasure to have you on board!</strong>
                    </p>
                </p>
            </div>
        );
    },
    render() {
        const loading = this.props.loading;
        console.log(this.shouldRenderMessageWithAnalytics())
        return (
            <div>
                {!loading && (<div className="eca-modal__header">
                    <h3>Just before you go</h3>
                </div>)}
                <div className="col-md-12 eca-modal__content">
                    <div className="cancellation-modal">
                        {loading && (
                            <div className="cancellation-modal__loader">
                                <Loader type="spin" color="#000" width={2} radius={3} top={'0'} />
                                <div className="cancellation-modal__loader-text">Fetching account details</div>
                            </div>
                        )}

                        {this.shouldRenderMessageWithAnalytics()}

                        {!loading && this.shouldRenderMessageWithAnalytics() && this.renderMessageWithAnalytics()}

                        {!loading && !this.shouldRenderMessageWithAnalytics() && this.renderMessageWithoutAnalytics()}

                    </div>
                </div>
                {!loading && <div className="footer-button col-md-12" onClick={() => {this.props.clickedContinue()}}>
                    Continue to cancellation
                </div>}
            </div>
        );
    }
});

export default CancellationModal;
