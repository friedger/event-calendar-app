export const GET_PLAN = 'GET_PLAN';
export const GET_PLAN_SUCCESS = 'GET_PLAN_SUCCESS';
export const GET_PLAN_ERROR = 'GET_PLAN_ERROR';

export const SUBMIT_STRIPE_PAYMENT = 'SUBMIT_STRIPE_PAYMENT';
export const SUBMIT_STRIPE_PAYMENT_SUCCESS = 'SUBMIT_STRIPE_PAYMENT_SUCCESS';
export const SUBMIT_STRIPE_PAYMENT_ERROR = 'SUBMIT_STRIPE_PAYMENT_ERROR';

export const CHANGE_STRIPE_PAYMENT = 'CHANGE_STRIPE_PAYMENT';
export const CHANGE_STRIPE_PAYMENT_SUCCESS = 'CHANGE_STRIPE_PAYMENT_SUCCESS';
export const CHANGE_STRIPE_PAYMENT_ERROR = 'CHANGE_STRIPE_PAYMENT_ERROR';

export const UPDATE_STRIPE_DETAILS = 'UPDATE_STRIPE_DETAILS';
export const UPDATE_STRIPE_DETAILS_SUCCESS = 'UPDATE_STRIPE_DETAILS_SUCCESS';
export const UPDATE_STRIPE_DETAILS_ERROR = 'UPDATE_STRIPE_DETAILS_ERROR';

export const TRIGGER_SHOPIFY_PLAN = 'TRIGGER_SHOPIFY_PLAN';
export const TRIGGER_SHOPIFY_PLAN_SUCCESS = 'TRIGGER_SHOPIFY_PLAN_SUCCESS';
export const TRIGGER_SHOPIFY_PLAN_ERROR = 'TRIGGER_SHOPIFY_PLAN_ERROR';

export const LEFT_ACCOUNT_PAGE = 'LEFT_ACCOUNT_PAGE';

import cookieUtil from '../utils/cookieUtil';
import request from 'superagent';

const config = require('../../config');

export function leftAccountPage() {
    return {
        type: LEFT_ACCOUNT_PAGE
    };
}

export function getPlan() {
    return dispatch => {
        dispatch({
            type: GET_PLAN
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request.get(`${config.apiUrl}/plan?token=${token}`).end((err, res) => {
            if (err) {
                return dispatch({
                    type: GET_PLAN_ERROR,
                    error: err
                });
            }

            return dispatch({
                type: GET_PLAN_SUCCESS,
                payload: res
            });
        });
    };
}

export function submitStripePayment(planId, stripeToken) {
    return dispatch => {
        dispatch({
            type: SUBMIT_STRIPE_PAYMENT
        });

        const token = cookieUtil.getItem('eventcal-admin');
        request
            .post(`${config.apiUrl}/payment`)
            .send({ stripeToken, token, planId })
            .end((err, res) => {
                if (err) {
                    return dispatch({
                        type: SUBMIT_STRIPE_PAYMENT_ERROR,
                        error: err
                    });
                }

                dispatch({
                    type: SUBMIT_STRIPE_PAYMENT_SUCCESS,
                    payload: res
                });

                return getPlan()(dispatch);
            });
    };
}

export function changeStripeSubscription(planIdToChangeTo) {
    return dispatch => {

        dispatch({
            type: CHANGE_STRIPE_PAYMENT
        });

        const token = cookieUtil.getItem('eventcal-admin');
        request
            .put(`${config.apiUrl}/plan?token=${token}&planId=${planIdToChangeTo}`)
            .end((err, res) => {
                if (err) {
                    return dispatch({
                        type: CHANGE_STRIPE_PAYMENT_ERROR,
                        error: err
                    });
                }

                dispatch({
                    type: CHANGE_STRIPE_PAYMENT_SUCCESS,
                    payload: res
                });

                return getPlan()(dispatch);
            });
    };
}

export function updateCardDetails(stripeToken) {
    return dispatch => {

        dispatch({
            type: UPDATE_STRIPE_DETAILS
        });

        const token = cookieUtil.getItem('eventcal-admin');
        request
            .put(`${config.apiUrl}/payment?token=${token}`)
            .send({ stripeToken })
            .end((err, res) => {
                if (err) {
                    return dispatch({
                        type: UPDATE_STRIPE_DETAILS_ERROR,
                        error: err
                    });
                }

                dispatch({
                    type: UPDATE_STRIPE_DETAILS_SUCCESS,
                    payload: res
                });
            });
    };
}
