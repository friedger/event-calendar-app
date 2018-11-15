require('./style.scss');

import React from 'react';
import Loader from 'react-loader';
import cn from 'classnames';

export default React.createClass({
    render() {
        const {
            paymentSuccess,
            paymentError,
            paymentLoading,
            updateSuccessful,
            accountLoading,
            updatingPaymentDetails,
            updatedPaymentDetails
        } = this.props;
        if (paymentLoading) {
            $("html,body").animate({ scrollTop: 0 }, "slow");
        }
        if (accountLoading) {
            return (
                <div className="row payment-processing">
                    <div className="col-md-12">
                        <div className="payment-processing__content">
                            <Loader
                                options={{
                                    type: 'spin',
                                    color: '#fff',
                                    width: 2,
                                    radius: 3,
                                    left: '43px',
                                    top: '21px'
                                }}
                            />
                            <span>Loading your details...</span>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div
                className={cn('row', 'payment-processing', {
                    'payment-processing--success': paymentSuccess || updateSuccessful || updatedPaymentDetails,
                    'payment-processing--error': paymentError
                })}
            >
                <div className="col-md-12">
                    <div className="payment-processing__content">
                        {(paymentLoading || accountLoading || updatingPaymentDetails) &&
                            <Loader
                                options={{
                                    type: 'spin',
                                    color: '#fff',
                                    width: 2,
                                    radius: 3,
                                    left: '30px',
                                    top: '21px'
                                }}
                            />}
                        {accountLoading && <span>Loading your details...</span>}
                        {updatingPaymentDetails && <span>Updating your details...</span>}
                        {paymentLoading && <span>Processing transaction...</span>}
                        {(paymentSuccess || updateSuccessful || updatedPaymentDetails) &&
                            <i className="fa fa-check" aria-hidden="true" />}{' '}
                        {updateSuccessful && <span>Your plan was updated successfully</span>}
                        {updatedPaymentDetails && <span>Your payment details were updated successfully</span>}
                        {paymentSuccess &&
                            <span>
                                The transaction was successful. Your plan details can be found
                                below.
                            </span>}
                        {paymentError && <i className="fa fa-ban" aria-hidden="true" />}{' '}
                        {paymentError &&
                            <span>
                                There was an error processing the transaction. Please try another
                                card or contact us.
                            </span>}
                    </div>
                </div>
            </div>
        );
    }
});
