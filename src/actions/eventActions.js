export const EVENT_SELECTED = 'EVENT_SELECTED';
export const EXIT_EVENT_SETTINGS = 'EXIT_EVENT_SETTINGS';

export const DEMO_EVENT_SELECTED = 'DEMO_EVENT_SELCTED';

export const PUT_EVENT = 'PUT_EVENT';
export const PUT_EVENT_SUCCESS = 'PUT_EVENT_SUCCESS';
export const PUT_EVENT_ERROR = 'PUT_EVENT_ERROR';

export const GET_EVENT = 'GET_EVENT';
export const GET_EVENT_SUCCESS = 'GET_EVENT_SUCCESS';
export const GET_EVENT_ERROR = 'GET_EVENT_ERROR';

export const RESET_EVENT = 'RESET_EVENT';

import request from 'superagent';
var cookieUtil = require('../utils/cookieUtil').default;
const config = require('../../config');
import { reset } from 'redux-form';

export function eventSelected(details) {
    console.log(details)
    return dispatch => {
        dispatch({
            type: GET_EVENT
        });
        request.get(`${config.apiUrl}/event?uuid=${details.uuid}&calendarId=${details.calendar_id}`).end((err, res) => {
            if (err) {
                return dispatch({
                    type: GET_EVENT_ERROR,
                    error: err
                });
            }

            if (res.body.message === 'No event found with the matching uuid') {
                dispatch(reset('eventSettingsForm'));
                return dispatch({
                    type: RESET_EVENT,
                    payload: { eventDetail: details }
                });
            }

            dispatch({
                type: GET_EVENT_SUCCESS,
                payload: {
                    responseBody: res.body,
                    eventDetail: details
                }
            });
        });
    };
}

export function exitEventSettings() {
    return {
        type: EXIT_EVENT_SETTINGS
    };
}

export function demoEventSelected() {
    return {
        type: DEMO_EVENT_SELECTED
    };
}

export function putEvent(calendarId, uuid, values) {
    return dispatch => {
        const requestBody = Object.assign({}, { calendar_id: calendarId, uuid }, values);
        dispatch({
            type: PUT_EVENT
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request.put(`${config.apiUrl}/event?token=${token}`).send(requestBody).end((err, res) => {
            if (err) {
                return dispatch({
                    type: PUT_EVENT_ERROR,
                    error: err
                });
            }

            dispatch({
                type: PUT_EVENT_SUCCESS,
                payload: res
            });

            var a = new MouseEvent('refreshCalendar', {});
            document.dispatchEvent(a);
        });
    };
}