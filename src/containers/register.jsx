import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';

import RegistrationForm from '../components/register';
import Header from '../components/header';

import config from '../../config';

const mapState = ({form, initialRegisterState}) => {
    return {
        form,
        initialRegisterState
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
    componentWillMount() {
        this.props.popuplateRegisterFormFromQuery(this.props.location.query);
    },
    componentDidMount() {
        if (config.intercom) {
            window.Intercom('boot', {
                app_id: 'scigxdd1'
            });
        }
    },
    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <RegistrationForm initialValues={this.props.initialRegisterState} location={this.props.location} router={this.context.router}/>
                </div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
