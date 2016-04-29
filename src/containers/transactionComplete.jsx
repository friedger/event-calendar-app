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
    render() {
        return (
            <div className="container">
                <h1>Thank you!</h1>
                <p>The transaction is complete!</p>
                <Link onClick={this.props.getUser} className="border-button" to={`/dashboard`}>Head back to the dashboard</Link>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
