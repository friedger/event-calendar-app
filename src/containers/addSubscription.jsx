import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as calendarActions from '../actions/calendarActions';
import * as paymentActions from '../actions/paymentActions';const Link = require('react-router').Link;
import Header from '../components/header';
import BeginTrial from '../components/BeginTrial';
const StripeCheckout = require('react-stripe-checkout');
const config = require('../../config');

import getCronofyAuthUrl from '../utils/getCronofyAuthUrl';

const mapState = ({appState}) => {
    return {appState}
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        ...paymentActions,
        ...appActions,
        ...calendarActions
    }, dispatch);
}

const component = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentDidMount() {
        this.props.getUser();
    },
    render() {
        const stripePublishableToken = this.props.testMode ? 'pk_test_cYLFCC3SbZhSHnpTZgzqHZZ9' : config.stripePublishableToken;

        return (
            <div>
                <Header loggedIn={true}/>
                <div className="container">
                    <div class="col-md-12" style={{'marginTop': '40px'}}>
                        <p>Please only use this page if you have been directed here by a member of the ECA team.</p>
                        <StripeCheckout
                            image="/images/logo-stripe.jpg"
                            token={this.props.submitPayment.bind(null, this.props.testMode)}
                            stripeKey={stripePublishableToken}>
                            <a className="start-trial">Add subscription</a>
                        </StripeCheckout>
                    </div>
                </div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
