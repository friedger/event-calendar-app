require('./style.scss');

import React from 'react';
import Loader from 'react-loader';
import cn from 'classnames';

export default React.createClass({
    render() {
        const options = {
            type: 'spin',
            color: '#fff',
            width: 2,
            radius: 3,
            left: '30px',
            top: '21px'
        };
        const { paymentSuccess, paymentError, paymentLoading } = this.props;
        return (
            <div
                className={cn('row', 'payment-processing', {
                    'payment-processing--success': paymentSuccess,
                    'payment-processing--error': paymentError
                })}
            >
                <div className="col-md-12">
                    <div className="payment-processing__content">
                        {paymentLoading && <Loader options={options} />}
                        {paymentLoading && <span>Processing transacion...</span>}
                        {paymentSuccess && <i className="fa fa-check" aria-hidden="true" />}{' '}
                        {paymentSuccess &&
                            <span>
                                The transaction was successful. Your plan details can be found
                                below.
                            </span>}
                        {paymentError && <i className="fa fa-ban" aria-hidden="true"></i>}{' '}
                        {paymentError &&
                            <span>
                                There was an error processing the transaction. Please try another card or contact us.
                            </span>}
                    </div>
                </div>
            </div>
        );
    }
});
