export const POST_MANUAL_EVENT = 'POST_MANUAL_EVENT';
export const POST_MANUAL_EVENT_SUCCESS = 'POST_MANUAL_EVENT_SUCCESS';
export const POST_MANUAL_EVENT_ERROR = 'POST_MANUAL_EVENT_ERROR';

export const RESET_DUPLICATE_MANUAL_EVENT_STATUS = 'RESET_DUPLICATE_MANUAL_EVENT_STATUS';

export const POST_DUPLICATE_MANUAL_EVENT = 'POST_DUPLICATE_MANUAL_EVENT';
export const POST_DUPLICATE_MANUAL_EVENT_SUCCESS = 'POST_DUPLICATE_MANUAL_EVENT_SUCCESS';
export const POST_DUPLICATE_MANUAL_EVENT_ERROR = 'POST_DUPLICATE_MANUAL_EVENT_ERROR';

export const DELETE_MANUAL_EVENT = 'DELETE_MANUAL_EVENT';
export const DELETE_MANUAL_EVENT_SUCCESS = 'DELETE_MANUAL_EVENT_SUCCESS';
export const DELETE_MANUAL_EVENT_ERROR = 'DELETE_MANUAL_EVENT_ERROR';

export const OPEN_NEW_EVENT_FORM = 'OPEN_NEW_EVENT_FORM';
export const CLOSE_NEW_EVENT_FORM = 'CLOSE_NEW_EVENT_FORM';

export const ADD_NEW_EVENT = 'ADD_NEW_EVENT';

import request from 'superagent';
var cookieUtil = require('../utils/cookieUtil').default;
const config = require('../../config');
import { reset } from 'redux-form';

export function postManualEvent(values) {
    return dispatch => {
        dispatch({
            type: POST_MANUAL_EVENT
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request.post(`${config.apiUrl}/manualEvents?token=${token}`).send(values).end((err, res) => {
            if (err) {
                return dispatch({
                    type: POST_MANUAL_EVENT_ERROR,
                    error: err
                });
            }

            dispatch({
                type: POST_MANUAL_EVENT_SUCCESS,
                payload: res.body
            });

            var a = new MouseEvent('refreshCalendar', {});
            document.dispatchEvent(a);
        });
    };
}

export function duplicateManualEvent(duplicateId) {
    return dispatch => {
        dispatch({
            type: POST_DUPLICATE_MANUAL_EVENT
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request.post(`${config.apiUrl}/manualEvents?token=${token}&duplicateId=${duplicateId}`).end((err, res) => {
            if (err) {
                return dispatch({
                    type: POST_DUPLICATE_MANUAL_EVENT_ERROR,
                    error: err
                });
            }

            dispatch({
                type: POST_DUPLICATE_MANUAL_EVENT_SUCCESS,
                payload: res.body
            });

            setTimeout(() => {
                dispatch({
                    type: RESET_DUPLICATE_MANUAL_EVENT_STATUS,
                    payload: res.body
                });
            });

            var a = new MouseEvent('refreshCalendar', {});
            document.dispatchEvent(a);
        });
    };
}

export function deleteManualEvent(values) {
    return dispatch => {
        dispatch({
            type: DELETE_MANUAL_EVENT
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request.delete(`${config.apiUrl}/manualEvents?token=${token}`).send(values).end((err, res) => {
            if (err) {
                return dispatch({
                    type: DELETE_MANUAL_EVENT_ERROR,
                    error: err
                });
            }

            dispatch({
                type: DELETE_MANUAL_EVENT_SUCCESS,
                payload: res.body
            });

            var a = new MouseEvent('refreshCalendar', {});
            document.dispatchEvent(a);
        });
    };
}

export function addNewEvent() {
    return dispatch => {
        dispatch(reset('manualEventsForm'));

        dispatch({
            type: ADD_NEW_EVENT
        });

    };
}

export function openNewEventForm() {
    return {
        type: OPEN_NEW_EVENT_FORM
    };
}

export function closeNewEventForm() {
    return {
        type: CLOSE_NEW_EVENT_FORM
    };
}
