import { connect } from 'react-redux';
import React from 'react';
import { bindActionCreators } from 'redux';
import * as appActions from '../actions/index';
import * as passwordResetActions from '../actions/passwordResetActions';
import Header from '../components/header';
import { Row, Col } from 'react-bootstrap';
import ResetPassword from '../components/authentication/resetPassword';
import ChooseNewPassword from '../components/authentication/chooseNewPassword';
import { parse } from 'query-string';

const mapState = ({ loginState, passwordResetState }) => {
    return {
        loginState,
        passwordResetState
    };
};

const mapDispatch = dispatch => {
    return bindActionCreators(
        {
            ...appActions,
            ...passwordResetActions
        },
        dispatch
    );
};

const component = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    componentDidMount() {
        const query = parse(this.props.location.search);
        if (this.userAtChooseNewPasswordPhase) {
            this.props.checkDetails({
                code: query.code,
                email: query.email
            });
        }
    },
    userAtChooseNewPasswordPhase() {
        const query = parse(this.props.location.search);
        return query.code && query.email;
    },
    render() {
        const query = parse(this.props.location.search);

        return (
            <div style={{ height: '100%' }}>
                <Header />
                <div style={{ background: '#f5f5f5', height: '100%' }}>
                    <Row>
                        <Col md={12}>
                            <div className="loginForm__title">
                                <h2 style={{ fontWeight: 'bold' }}>Forgot your password?</h2>
                            </div>
                        </Col>
                    </Row>
                    <div className="container" style={{ maxWidth: '600px !important' }}>
                        {!this.userAtChooseNewPasswordPhase() && <ResetPassword />}
                        {this.userAtChooseNewPasswordPhase() &&
                            (this.props.passwordResetState.codeValid ||
                                this.props.passwordResetState.codeInvalid) && (
                                <ChooseNewPassword
                                    codeValid={this.props.passwordResetState.codeValid}
                                    code={query.code}
                                    email={query.email}
                                />
                            )}
                    </div>
                </div>
            </div>
        );
    }
});

export default connect(mapState, mapDispatch)(component);
