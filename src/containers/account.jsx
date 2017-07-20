import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as widgetActions from '../actions/widgetActions';
import * as accountActions from '../actions/accountActions';
import * as appActions from '../actions/index';

import cookieUtil from '../utils/cookieUtil';
const config = require('../../config');
import Account from '../components/account';
import StripePaymentStatus from '../components/stripePaymentStatus';

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
        const { paymentLoading, paymentSuccess, paymentError, accountLoading } = this.props.account;
        const user = this.props.appState.user;

        const accountProps =
            user && user.shopifyUser
                ? { activePlan, beginPaymentUrl }
                : { activePlan, beginPaymentAction: this.props.submitStripePayment };

        return (
            <div
                style={{
                    height: '100%',
                    background: '#f5f5f5',
                    overflow: 'auto'
                }}
            >
                <Header loggedIn={true} useFluidContainer={true} />
                <div
                    className="container"
                    style={{
                        marginTop: '50px',
                        marginBottom: '50px'
                    }}
                >
                    <div className="row">
                        <div className="col-md-12 account__container">
                            <div className="row account__header">
                                <div className="col-md-12">
                                    <h2>Billing</h2>
                                    <span className="account__header__subtitle">
                                        Manage your plan
                                    </span>
                                </div>
                            </div>
                            {(paymentLoading ||
                                paymentSuccess ||
                                paymentError ||
                                this.props.location.query.planUpdated ||
                                accountLoading) &&
                                <StripePaymentStatus
                                    paymentLoading={paymentLoading}
                                    paymentError={paymentError}
                                    paymentSuccess={paymentSuccess}
                                    updateSuccessful={this.props.location.query.planUpdated}
                                    accountLoading={accountLoading}
                                />}
                        </div>
                        {accountProps && !accountLoading &&
                            <Account { ...accountProps }></Account>
                        }
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
