import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';

import RegistrationForm from '../components/register';
import Header from '../components/header';

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
            <div>
                <Header />
                <div className="container">
                    <RegistrationForm location={this.props.location} router={this.context.router}/>
                </div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
