import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as paymentActions from '../actions/paymentActions';
import Header from '../components/header';
import Plans from '../components/plans';

const mapState = ({appState}) => {
    return {appState}
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        ...appActions,
        ...paymentActions
    }, dispatch);
}

const component = React.createClass({
    render() {
        return (
            <div>
                <Header loggedIn={true}/>
                <Plans paymentAction={this.props.submitPayment} user={this.props.appState.user}/>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
