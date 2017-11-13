import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';

import RegistrationForm from '../components/authentication/register';
import Header from '../components/header';
import { Row, Col } from 'react-bootstrap';
import SocialProof from '../components/authentication/socialProof';
import config from '../../config';
import InlineSVG from 'svg-inline-react';

const mapState = ({ form, initialRegisterState }) => {
    return {
        form,
        initialRegisterState
    };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...appActions
        },
        dispatch
    );
};

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
        const svgSource = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36.67 39.84"><defs><style>.cls-1{fill:#fff;opacity:0.1;}.cls-2{fill:#e4e4e4;}.cls-3{fill:#6787ab;}.cls-4{fill:#d92c64;}</style></defs><title>justlogo</title><g id="Layer_2" data-name="Layer 2"><rect class="cls-1" x="0.08" y="0.75" width="10.71" height="38.35"/><rect class="cls-2" width="36.67" height="9.46" rx="0.5" ry="0.5"/><rect class="cls-3" y="15.19" width="36.67" height="9.46" rx="0.5" ry="0.5"/><rect class="cls-4" y="30.38" width="36.67" height="9.46" rx="0.5" ry="0.5"/></g></svg>`;
        return (
            <div style={{ height: '100%' }}>
                <div style={{ background: '#f5f5f5', height: '100%' }}>
                    <div className="container" style={{ maxWidth: '600px !important' }}>
                        <Row>
                            <Col md={12}>
                                <div className="register-form__title">
                                    <h2 style={{ fontWeight: 'bold' }}>
                                        Welcome <span className="primary-color">on board. 🤘</span>
                                    </h2>
                                    <p>You're 2 seconds away from creating your calendar!</p>
                                </div>
                            </Col>
                            <Col md={12}>
                                <div className="logo-container">
                                    <InlineSVG src={svgSource} />
                                </div>
                            </Col>
                        </Row>
                        <RegistrationForm
                            initialValues={this.props.initialRegisterState}
                            location={this.props.location}
                            router={this.context.router}
                        />
                        <SocialProof></SocialProof>
                    </div>
                </div>
            </div>
        );
    }
});

export default connect(mapState, mapDispatch)(component);
