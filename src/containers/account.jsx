import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as widgetActions from '../actions/widgetActions';
import * as accountActions from '../actions/accountActions';
import * as appActions from '../actions/index';

import cookieUtil from '../utils/cookieUtil';
const config = require('../../config');
import Account from '../components/account';

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
    componentDidMount() {
        this.props.getPlan();
        this.props.getUser();
    },
    beginPaymentAction(token) {
        this.props.submitStripePayment(token);
    },
    render() {
        const activePlan = this.props.account.plan;
        const token = cookieUtil.getItem('eventcal-admin');
        const beginPaymentUrl = `${config.apiUrl}/shoppify/begin-payment?token=${encodeURIComponent(
            token
        )}`;

        const user = this.props.appState.user;

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
                        {user && user.shopifyUser
                            ? <Account activePlan={activePlan} beginPaymentUrl={beginPaymentUrl} />
                            : <Account
                                  activePlan={activePlan}
                                  beginPaymentAction={this.beginPaymentAction}
                                  paymentLoading = {this.props.account.paymentLoading}
                                  paymentSuccess = {this.props.account.paymentSuccess}
                                  paymentError = {this.props.account.paymentError}
                              />}
                    </div>
                </div>
            </div>
        );
    }
});

export default connect(mapState, mapDispatch)(component);
