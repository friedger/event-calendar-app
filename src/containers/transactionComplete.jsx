import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
const Link = require('react-router').Link

const mapState = ({loginState}) => {
    return {
        loginState
    }
}

const mapDispatch = (dispatch) => {
    return bindActionCreators({
        ...appActions
    }, dispatch);
}

const component = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    backToDashboard() {
        window.location.href='/dashboard';
    },
    render() {
        return (
            <div className="container">
                <h1>Thank you!</h1>
                <p>The transaction is complete!</p>
                <div onClick={this.backToDashboard} className="border-button">Head back to the dashboard</div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
