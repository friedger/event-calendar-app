import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import Login from '../components/login';

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
                <Login router={this.context.router}/>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
