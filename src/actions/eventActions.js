export const EVENT_SELECTED = 'EVENT_SELECTED';
export const EXIT_EVENT_SETTINGS = 'EXIT_EVENT_SETTINGS';

export const DEMO_EVENT_SELECTED = 'DEMO_EVENT_SELCTED';

export const PUT_EVENT = 'PUT_EVENT';
export const PUT_EVENT_SUCCESS = 'PUT_EVENT_SUCCESS';
export const PUT_EVENT_ERROR = 'PUT_EVENT_ERROR';

export const EVENT_SAVED = 'EVENT_SAVED';

export const GET_EVENT = 'GET_EVENT';
export const GET_EVENT_SUCCESS = 'GET_EVENT_SUCCESS';
export const GET_EVENT_ERROR = 'GET_EVENT_ERROR';

export const RESET_EVENT = 'RESET_EVENT';

import request from 'superagent';
var cookieUtil = require('../utils/cookieUtil').default;
import triggerWidgetRefresh from '../utils/triggerWidgetRefresh';
const config = require('../../config');
import { destroy, reset } from 'redux-form';

export function eventSelected(details) {
    return dispatch => {
        dispatch({
            type: GET_EVENT
        });

        var endpoint = `${config.apiUrl}/event?uuid=${details.uuid}&calendarId=${details.calendar_id}`;

        if (details.manualEvent) {
            endpoint += `&manualEvent=${details.manualEvent}`;
        }

        request.get(endpoint).end((err, res) => {
            if (err) {
                return dispatch({
                    type: GET_EVENT_ERROR,
                    error: err
                });
            }
            dispatch(destroy('availableFilters'));
            dispatch(reset('eventSettingsForm'));

            dispatch({
                type: GET_EVENT_SUCCESS,
                payload: {
                    responseBody: res.body,
                    eventDetail: details,
                    manualEvent: details.manualEvent
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

export function eventSaved() {
    return {
        type: EVENT_SAVED
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

            triggerWidgetRefresh({ breakCache: true });
        });
    };
}
