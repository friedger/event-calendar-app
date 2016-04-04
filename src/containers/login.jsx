import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import Login from '../components/login';

const mapState = ({number}) => {
    return {
        number
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
                <Login submitAction={this.props.login.bind(null, this.context)} history={this.props.history}/>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
