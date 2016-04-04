import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';

import RegistrationForm from '../components/register';

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
    render() {
        return (
            <div className="container">
                <RegistrationForm submitAction={this.props.addUser}/>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
