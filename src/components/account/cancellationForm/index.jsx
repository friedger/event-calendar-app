require('./style.scss');

import React from 'react';
import { reduxForm } from 'redux-form';
import { putCancelSubscription } from '../../../actions/apiActions';
import Loader from 'react-loader';
import cn from 'classnames';

const validate = values => {
    const errors = {};
    if (!values.reason) {
        errors.reason = 'Need to supply a reason';
    }
    return errors;
};

export const fields = ['reason', 'feedback'];

const CancellationForm = React.createClass({
    getInitialState() {
        return {
            submitted: false
        };
    },
    handleSubmit(values) {
        return new Promise((resolve, reject) => {
            if (this.props.isShopifyUser) {
                values.isShopifyUser = true;
            }
            putCancelSubscription(values)
                .then(result => {
                    this.setState({ submitted: true });
                    this.props.onSubmitAction();
                    resolve();
                })
                .catch(() => {
                    this.setState({ submitted: true });
                    reject({ _error: 'Server Error' });
                });
        });
    },
    render() {
        const {
            fields: { reason, feedback },
            error,
            handleSubmit,
            submitting,
            valid
        } = this.props;

        const {
            defaultMessage,
            defaultMessageSub,
            successMessage,
            successMessageSub,
            errorMessage,
            errorMessageSub
        } = this.props.customSubmissionText;

        const submitted = this.state.submitted;

        return (
            <div>
                <div className="col-md-12">
                    <form className="cancellation-form">
                        <div className="cancellation-form__header">
                            <h3>Sad to see you go! 😩</h3>
                            <p>Before you cancel, please let me know your reason for leaving:</p>
                        </div>
                        <div className="cancellation-form__options">
                            <div className="radio">
                                <input name="leavingreason" disabled={submitted} {...reason} id="reason-break" value="break" type="radio" />
                                <label htmlFor="reason-break">Just taking a break - I'll be back!</label>
                            </div>
                            <div className="radio">
                                <input
                                    name="leavingreason"
                                    {...reason}
                                    disabled={submitted}
                                    id="reason-expensive"
                                    value="expensive"
                                    type="radio"
                                />
                                <label htmlFor="reason-expensive">It's too expensive.</label>
                            </div>
                            <div className="radio">
                                <input
                                    name="leavingreason"
                                    {...reason}
                                    disabled={submitted}
                                    id="reason-features"
                                    value="features"
                                    type="radio"
                                />
                                <label htmlFor="reason-features">It's missing features I need.</label>
                            </div>
                            <div className="radio">
                                <input
                                    name="leavingreason"
                                    {...reason}
                                    disabled={submitted}
                                    id="reason-competitor"
                                    value="competitor"
                                    type="radio"
                                />
                                <label htmlFor="reason-competitor">I've found a better app.</label>
                            </div>
                            <div className="radio">
                                <input name="leavingreason" {...reason} id="reason-none" value="none" type="radio" disabled={submitted} />
                                <label htmlFor="reason-none">None of the above.</label>
                            </div>
                            <textarea
                                {...feedback}
                                name="feedback"
                                disabled={submitted}
                                className="form-control cancellation-form__feedback"
                                placeholder="Any additional details? Feedback really helps me to make Event Calendar App a better product. Thank you."
                            />
                        </div>
                    </form>
                </div>
                <button
                    onClick={handleSubmit(this.handleSubmit)}
                    className={cn('col-md-12 cancellation-form__submit modal-embed', {
                        'cancellation-form__submit--loading': submitting,
                        'default disabled': !valid,
                        secondary: valid && !error,
                        positive: submitted && !error,
                        danger: error
                    })}
                >
                    <Loader type="spin" color="#fff" width={2} radius={3} top={'50%'} />
                    <div className="cancellation-form__submit__button-text">
                        <div className="cancellation-form__submit__title">
                            {submitted && !error && successMessage}
                            {!submitted && !error && defaultMessage}
                            {error && errorMessage}
                        </div>
                        <div className="cancellation-form__submit__sub">
                            {submitted && !error && successMessageSub}
                            {!submitted && !error && defaultMessageSub}
                            {error && errorMessageSub}
                        </div>
                    </div>
                </button>
            </div>
        );
    }
});

export default reduxForm({
    form: 'cancellationForm',
    fields,
    validate
})(CancellationForm);
