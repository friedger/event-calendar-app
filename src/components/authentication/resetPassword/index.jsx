require('./style.scss');
import React from 'react';
import { FormGroup, ControlLabel, HelpBlock, FormControl } from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import cn from 'classnames';
import { postResetPassword } from '../../../actions/apiActions';
import Loader from 'react-loader';

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'An email is required';
    }

    return errors;
};

var Component = React.createClass({
    getInitialState() {
        return { submitted: false };
    },
    getValidationState(field) {
        if (field.touched && field.error) {
            return 'error';
        }
    },
    renderForm() {
        const { fields: { email }, error, handleSubmit, submitting } = this.props;
        return (
            <form
                onSubmit={handleSubmit(values =>
                    postResetPassword(values).then(() => this.setState({ submitted: true }))
                )}
            >
                <FormGroup validationState={this.getValidationState(email)}>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl type="text" {...email} />
                    {email.touched && email.error && <HelpBlock>{email.error}</HelpBlock>}
                </FormGroup>
                <button
                    type="submit"
                    disabled={submitting}
                    className={'register-button secondary full-width'}
                    value="Submit"
                >
                    <div className={cn({ 'opacity-0': submitting })}>SEND ME INSTRUCTIONS</div>
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
    renderSuccess() {
        return <p>We have sent you some instructions on how to reset your password.</p>;
    },
    render() {
        return (
            <div className="row reset-password-form">
                <div className="col-md-12">
                    {this.state.submitted ? this.renderSuccess() : this.renderForm()}
                </div>
            </div>
        );
    }
});

export default (Component = reduxForm({
    form: 'resetPassword', // a unique name for this form
    fields: ['email'], // all the fields in your form
    validate
})(Component));
