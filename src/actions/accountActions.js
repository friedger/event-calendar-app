export const GET_PLAN = 'GET_PLAN';
export const GET_PLAN_SUCCESS = 'GET_PLAN_SUCCESS';
export const GET_PLAN_ERROR = 'GET_PLAN_ERROR';

export const TRIGGER_SHOPIFY_PLAN = 'TRIGGER_SHOPIFY_PLAN';
export const TRIGGER_SHOPIFY_PLAN_SUCCESS = 'TRIGGER_SHOPIFY_PLAN_SUCCESS';
export const TRIGGER_SHOPIFY_PLAN_ERROR = 'TRIGGER_SHOPIFY_PLAN_ERROR';

import cookieUtil from '../utils/cookieUtil';
import request from 'superagent';

const config = require('../../config');

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
