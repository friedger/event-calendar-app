import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as widgetActions from '../actions/widgetActions';
import * as accountActions from '../actions/accountActions';
import * as appActions from '../actions/index';

import cookieUtil from '../utils/cookieUtil';
const config = require('../../config');
import { parse } from 'query-string';
import Account from '../components/account';
import StripePaymentStatus from '../components/account/stripePaymentStatus';
import AccountNavigation from '../components/account/accountNavigation';

import Header from '../components/header';

const mapState = ({ appState, account }) => {
    return { appState, account };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...widgetActions,
            ...accountActions,
            ...appActions
        },
        dispatch
    );
};

const component = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentDidMount() {
        this.props.getPlan();
        this.props.getUser();
    },
    render() {
        const activePlan = this.props.account.plan;
        const token = cookieUtil.getItem('eventcal-admin');
        const beginPaymentUrl = `${config.apiUrl}/shoppify/begin-payment?token=${encodeURIComponent(
            token
        )}`;
        const {
            paymentLoading,
            paymentSuccess,
            paymentError,
            accountLoading,
            userHasNoPlan,
            updatingPaymentDetails,
            updatedPaymentDetails
        } = this.props.account;
        const user = this.props.appState.user;

        const query = parse(location.search);

        const accountProps =
            user && user.shopifyUser
                ? { activePlan, beginPaymentUrl, shopifyUser: true, userHasNoPlan }
                : {
                    updateCardDetails: this.props.updateCardDetails,
                    activePlan,
                    beginPaymentAction: this.props.submitStripePayment,
                    upgradePaymentAction: this.props.changeStripeSubscription,
                    shopifyUser: false,
                    userHasNoPlan,
                    user
                };
        return (
            <div
                style={{
                    height: '100%',
                    background: '#f5f5f5',
                    overflow: 'auto'
                }}
            >
                <Header loggedIn={true} useFluidContainer={true} />
                <div className="container-fluid">
                    <div className="row">
                        <AccountNavigation selected={'account'} />
                        <div
                            className="col-md-9 account__container"
                            style={{ 'minHeight': 'calc(100vh - 74px)', height: '100%' }}
                        >
                            <div className="row account__header">
                                <div className="col-md-12">
                                    <h2>Billing</h2>
                                    <span className="account__header__subtitle">
                                        Manage your plan
                                    </span>
                                </div>
                            </div>
                            <div>
                                {(paymentLoading ||
                                    paymentSuccess ||
                                    paymentError ||
                                    updatingPaymentDetails ||
                                    updatedPaymentDetails ||
                                    query.planUpdated ||
                                    accountLoading) && (
                                        <StripePaymentStatus
                                            paymentLoading={paymentLoading}
                                            paymentError={paymentError}
                                            paymentSuccess={paymentSuccess}
                                            updateSuccessful={query.planUpdated}
                                            accountLoading={accountLoading}
                                            updatedPaymentDetails={updatedPaymentDetails}
                                            updatingPaymentDetails={updatingPaymentDetails}
                                        />
                                    )}
                            </div>
                            <div className="row account-content">
                                <Account {...accountProps} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    componentWillUnmount() {
        this.props.leftAccountPage();
    }
});

export default connect(mapState, mapDispatch)(component);
