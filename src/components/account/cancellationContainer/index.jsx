import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import * as analyticsActions from '../../../actions/analyticsActions';
import * as accountActions from '../../../actions/accountActions';

import CancellationModal from '../cancellationModal';
import CancellationForm from '../cancellationForm';
import ShopifyCancellationInstructions from '../shopifyCancellationInstructions';

function getAnalyticsValue(state, name) {
    if (!state.analyticsState) {
        return false;
    }
    console.log(state)
    return state.analyticsState[name] && state.analyticsState[name][state.analyticsState[name].length - 1];
}

function checkIfShopifyUser(state) {
    return state.appState && state.appState.user && state.appState.user.shopifyUser;
}

const mapState = state => {
    return {
        subscriberCount: getAnalyticsValue(state, 'subscriberCount'),
        widgetViews: getAnalyticsValue(state, 'widgetViews'),
        appState: state.appState,
        analyticsState: state.analyticsState,
        isShopifyUser: checkIfShopifyUser(state),
        user: state.appState && state.appState.user
    };
};

const mapDispatch = dispatch => {
    return bindActionCreators({ ...analyticsActions, ...accountActions }, dispatch);
};

const submissionTextStripe = {
    defaultMessage: 'Cancel Account',
    defaultMessageSub: '❤️ from ECA',
    errorMessage: 'There was an error cancelling your account',
    errorMessageSub: 'Please get in touch so I can manually cancel your account',
    successMessage: 'Your account has been cancelled',
    successMessageSub: 'See you soon! 😊'
};

const submissionTextShopify = {
    defaultMessage: 'Submit Feedback',
    defaultMessageSub: '❤️ from ECA',
    errorMessage: 'There was an error submitting your feedback',
    errorMessageSub: 'Whoops!',
    successMessage: 'Your feedback was submitted',
    successMessageSub: 'One more thing to do...'
}

const CancellationContainer = React.createClass({
    getInitialState() {
        return {
            show: false,
            stage: 1
        };
    },
    hideModal() {
        this.setState({ show: false, stage: 1 });
    },
    render() {
        const {
            analyticsState,
            appState,
            getAnalytics,
            isShopifyUser,
            user,
            subscriberCount,
            widgetViews
        } = this.props;

        if (!user) {
            return null;
        }
        return (
            <div>
                <Modal show={this.state.show} onHide={this.hideModal}>
                    <div className="eca-modal__close" onClick={this.hideModal}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                    </div>
                    {(this.state.stage === 1) && <CancellationModal
                        subscriberCount={subscriberCount}
                        widgetViews={widgetViews}
                        shopifyUser={isShopifyUser}
                        loading={analyticsState.loading}
                        clickedContinue={() => this.setState({stage: 2})}
                    />}
                    {(this.state.stage === 2) &&
                    <CancellationForm
                        isShopifyUser={isShopifyUser}
                        onSubmitAction={() => {
                            setTimeout(() => {
                                this.props.getPlan();
                                if (isShopifyUser) {
                                    this.setState({stage: 3});
                                }
                                if (!isShopifyUser) {
                                    this.setState({ show: false });
                                }
                            }, 2500);
                        }}
                        customSubmissionText={isShopifyUser ? submissionTextShopify : submissionTextStripe}
                    />}
                    {(this.state.stage === 3) &&
                        <ShopifyCancellationInstructions></ShopifyCancellationInstructions>
                    }
                </Modal>
                {React.cloneElement(this.props.children, {
                    onClick: () => {
                        if (!this.props.subscriberCount) {
                            this.props.getAnalytics();
                        }
                        this.setState({ show: true });
                    }
                })}
            </div>
        );
    }
});

export default connect(
    mapState,
    mapDispatch
)(CancellationContainer);
