import React from 'react';
import { reduxForm } from 'redux-form';
import { putResetPassword } from '../../../actions/apiActions';
import { FormGroup, ControlLabel, HelpBlock, FormControl } from 'react-bootstrap';
import cn from 'classnames';
import Loader from 'react-loader';

const validate = values => {
    const errors = {};

    if (!values.password) {
        errors.email = 'A new password is required';
    }

    return errors;
};

var Component = React.createClass({
    getValidationState(field) {
        if (field.touched && field.error) {
            return 'error';
        }
    },
    getInitialState() {
        return { submitted: false };
    },
    renderCodeInvalidMessage() {
        return (
            <p>
                This URL is invalid. Please try to{' '}
                <a href="https://eventcalendarapp.com/reset-password">reset your password again.</a>
            </p>
        );
    },
    renderNewPasswordForm() {
        const { fields: { password }, error, handleSubmit, submitting } = this.props;
        return (
            <form
                onSubmit={handleSubmit(values =>
                    putResetPassword({
                        password: values.password,
                        code: this.props.code,
                        email: this.props.email
                    }).then(() => this.setState({ submitted: true }))
                )}
            >
                <FormGroup validationState={this.getValidationState(password)}>
                    <ControlLabel>New Password</ControlLabel>
                    <FormControl type="password" {...password} />
                    {password.touched && password.error && <HelpBlock>{password.error}</HelpBlock>}
                </FormGroup>
                <button
                    type="submit"
                    disabled={submitting}
                    className={'register-button secondary full-width'}
                    value="Submit"
                >
                    <div className={cn({ 'opacity-0': submitting })}>RESET PASSWORD</div>
                    {submitting && (
                        <div className="large-loader">
                            <Loader type="spin" color="#000" width={3} radius={7} />
                        </div>
                    )}
                </button>
                {error && <div>{error}</div>}
            </form>
        );
    },
    render() {
        return (
            <div className="row reset-password-form">
                <div className="col-md-12">
                    {!this.props.codeValid && !this.state.submitted && this.renderCodeInvalidMessage()}
                    {this.props.codeValid && !this.state.submitted && this.renderNewPasswordForm()}
                    {this.state.submitted && <p>Your password has been reset. Please proceed to <a href="https://eventcalendarapp.com/loging">login</a></p>}
                </div>
            </div>
        );
    }
});

export default (Component = reduxForm({
    form: 'password', // a unique name for this form
    fields: ['password'], // all the fields in your form
    validate
})(Component));
