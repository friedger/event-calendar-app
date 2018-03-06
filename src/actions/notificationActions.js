export const PUT_NOTIFICATIONS = 'PUT_NOTIFICATIONS';
export const PUT_NOTIFICATIONS_SUCCESS = 'PUT_NOTIFICATIONS_SUCCESS';
export const PUT_NOTIFICATIONS_ERROR = 'PUT_NOTIFICATIONS_ERROR';

export const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';
export const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
export const GET_NOTIFICATIONS_ERROR = 'GET_NOTIFICATIONS_ERROR';

import request from 'superagent';
var cookieUtil = require('../utils/cookieUtil').default;
const config = require('../../config');
import { reset } from 'redux-form';

export function putNotifications(values) {
    return (dispatch) => {
        dispatch({
            type: PUT_NOTIFICATIONS
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request
            .put(`${config.apiUrl}/notifications?token=${token}`)
            .send(values)
            .end((err, res) => {
                if (err) {
                    return dispatch({
                        type: PUT_NOTIFICATIONS_ERROR,
                        error: err
                    });
                }

                dispatch({
                    type: PUT_NOTIFICATIONS_SUCCESS,
                    payload: res
                });
            });
    };
}

export function getNotifications() {
    return (dispatch) => {
        dispatch({
            type: GET_NOTIFICATIONS
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request.get(`${config.apiUrl}/notifications?token=${token}`)
        .end((err, res) => {
            if (err) {
                return dispatch({
                    type: GET_NOTIFICATIONS_ERROR,
                    error: err
                });
            }

            dispatch({
                type: GET_NOTIFICATIONS_SUCCESS,
                payload: res
            });
        });
    };
}
