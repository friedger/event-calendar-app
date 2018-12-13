require('./style.scss');

import React from 'react';
import { HelpBlock, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import { postUsers, postLogin } from '../../../actions/apiActions';
import { Row, Col } from 'react-bootstrap';
import Loader from 'react-loader';
import cn from 'classnames';
import { withRouter } from "react-router-dom";

function triggerRegistrationConversion() {
    if (window.google_trackConversion) {
        window.google_trackConversion({
            google_conversion_id: 1023858504,
            google_conversion_label: 'YP3_CMn47XkQyK6b6AM',  // if provided, remove this line if not provided
            google_remarketing_only: false
        });
    }
}

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'A username is required';
    }

    if (!values.email) {
        errors.email = 'An email is required';
    }

    if (!values.password) {
        errors.password = 'A password is required';
    }

    if (!values.confirmpassword) {
        errors.confirmpassword = 'Please type your password again';
    }

    return errors;
};

var Component = React.createClass({
    getValidationState(field) {
        if (field.touched && field.error) {
            return 'error';
        }
    },
    render() {
        const {
            fields: { username, password, confirmpassword, email },
            handleSubmit,
            error,
            router,
            submitting
        } = this.props;
        return (
            <Row className="register-form">
                <Col md={12}>
                    <form
                        onSubmit={handleSubmit((values) => {
                            return postUsers(values, this.props.query)
                                .then(() => {
                                    triggerRegistrationConversion();
                                    return postLogin(values);
                                })
                                .then(
                                    () => {
                                        return this.props.history.push('/link-calendar');
                                    },
                                    err => {
                                        return Promise.reject(err);
                                    }
                                );
                        })}
                    >
                        <FormGroup validationState={this.getValidationState(username)}>
                            <ControlLabel>Username</ControlLabel>
                            <FormControl type="text" {...username} />
                            {username.touched &&
                                username.error && <HelpBlock>{username.error}</HelpBlock>}
                        </FormGroup>
                        <FormGroup validationState={this.getValidationState(email)}>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl type="text" {...email} />
                            {email.touched && email.error && <HelpBlock>{email.error}</HelpBlock>}
                        </FormGroup>
                        <FormGroup validationState={this.getValidationState(password)}>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" {...password} />
                            {password.touched &&
                                password.error && <HelpBlock>{password.error}</HelpBlock>}
                        </FormGroup>
                        <FormGroup validationState={this.getValidationState(confirmpassword)}>
                            <ControlLabel>Confirm Password</ControlLabel>
                            <FormControl type="password" {...confirmpassword} />
                            {confirmpassword.touched &&
                                confirmpassword.error && (
                                    <HelpBlock>{confirmpassword.error}</HelpBlock>
                                )}
                        </FormGroup>
                        <button
                            type="submit"
                            disabled={submitting}
                            className={'register-button secondary full-width'}
                            value="Submit"
                        >
                            <div className={cn({ 'opacity-0': submitting })}>
                                CREATE YOUR ACCOUNT
                            </div>
                            {submitting && (
                                <div className="large-loader">
                                    <Loader type="spin" color="#000" width={3} radius={7} />
                                </div>
                            )}
                        </button>
                        {error && <div>{error}</div>}
                    </form>
                </Col>
            </Row>
        );
    }
});

export default Component = withRouter(reduxForm(
    {
        // <----- THIS IS THE IMPORTANT PART!
        form: 'register', // a unique name for this form
        fields: ['username', 'password', 'confirmpassword', 'email'],
        validate // all the fields in your form
    },
    state => ({
        initialValues: state.initialRegisterState
    })
)(Component));
