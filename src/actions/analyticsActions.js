export const GET_ANALYTICS = 'GET_ANALYTICS';
export const GET_ANALYTICS_SUCCESS = 'GET_ANALYTICS_SUCCESS';
export const GET_ANALYTICS_ERROR = 'GET_ANALYTICS_ERROR';

var cookieUtil = require('../utils/cookieUtil').default;
import request from 'superagent';
const config = require('../../config');

export function getAnalytics() {
    return dispatch => {
        dispatch({
            type: GET_ANALYTICS
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request.get(`${config.apiUrl}/analytics?token=${token}`).end((err, res) => {
            if (err) {
                return dispatch({
                    type: GET_ANALYTICS_ERROR,
                    error: err
                });
            }

            return dispatch({
                type: GET_ANALYTICS_SUCCESS,
                payload: res.body
            });
        });
    };
}
