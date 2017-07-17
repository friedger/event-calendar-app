import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as widgetActions from '../actions/widgetActions';
import * as accountActions from '../actions/accountActions';

import cookieUtil from '../utils/cookieUtil';
const config = require('../../config');
import Account from '../components/account';

import Header from '../components/header';

const mapState = ({ appState }) => {
    return { appState };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...widgetActions,
            ...accountActions
        },
        dispatch
    );
};

const component = React.createClass({
    componentDidMount() {
        this.props.getPlan();
    },
    render() {
        const token = cookieUtil.getItem('eventcal-admin');
        const beginPaymentUrl = `${config.apiUrl}/shoppify/begin-payment?token=${encodeURIComponent(
            token
        )}`;

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
                        <Account beginPaymentUrl={beginPaymentUrl} />
                    </div>
                </div>
            </div>
        );
    }
});

export default connect(mapState, mapDispatch)(component);
