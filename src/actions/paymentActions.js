export const SUBMIT_PAYMENT = 'SUBMIT_PAYMENT';
export const SUBMIT_PAYMENT_SUCCESS = 'SUBMIT_PAYMENT_SUCCESS';
export const SUBMIT_PAYMENT_ERROR = 'SUBMIT_PAYMENT_ERROR';

import request from 'superagent';
const config = require('../../config');

if (typeof window !== 'undefined') {
    var cookieUtil = require('../utils/cookieUtil').default;
}

import { browserHistory } from 'react-router';

export function submitPayment(testmode, stripeToken, coupon) {
    return (dispatch) => {
        dispatch({
            type: SUBMIT_PAYMENT
        });

        const token = cookieUtil.getItem('eventcal-admin');

        request.post(`${config.apiUrl}/payment`)
        .send({stripeToken, token, testmode, coupon})
        .end((err, res) => {
            if (err) {
                return dispatch({
                    type: SUBMIT_PAYMENT_ERROR,
                    error: err
                })
            }

            dispatch({
                type: SUBMIT_PAYMENT_SUCCESS,
                payload: res
            });

            browserHistory.push('/dashboard/transaction-complete');

        });
    }
}
