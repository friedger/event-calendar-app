import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';

import RegistrationForm from '../components/register';
import Header from '../components/header';
import {Row, Col} from 'react-bootstrap';

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
                app_id: config.intercom
            });
        }
    },
    render() {
        return (
            <div style={{'height': '100%'}}>
                <Header />
                <div style={{'background': '#f5f5f5', 'height': '100%'}}>
                <div className="container" style={{'maxWidth': '600px !important'}}>
                    <Row>
                    <Col md={12}>
                        <div className="register-form__title">
                            <h2 style={{'fontWeight': 'bold'}}>Let's <span className="primary-color">set you up.</span></h2>
                            <p>You're 2 seconds away from creating your calendar</p>
                        </div>
                    </Col>
                    </Row>
                    <RegistrationForm initialValues={this.props.initialRegisterState} location={this.props.location} router={this.context.router}/>
                </div>
                </div>
            </div>
        )
    }
});

export default connect(mapState, mapDispatch)(component)
