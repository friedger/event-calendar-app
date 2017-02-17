export const GET_CALENDARS = 'GET_CALENDARS';
export const GET_CALENDARS_SUCCESS = 'GET_CALENDARS_SUCCESS';
export const GET_CALENDARS_ERROR = 'GET_CALENDARS_ERROR';

export const GET_SETTINGS = 'GET_SETTINGS';
export const GET_SETTINGS_SUCCESS = 'GET_SETTINGS_SUCCESS';
export const GET_SETTINGS_ERROR = 'GET_SETTINGS_ERROR';

export const PUT_CALENDARS = 'PUT_CALENDARS';
export const PUT_CALENDARS_SUCCESS = 'PUT_CALENDARS_SUCCESS';
export const PUT_CALENDARS_ERROR = 'PUT_CALENDARS_ERROR';

export const PUT_SETTINGS = 'PUT_SETTINGS';
export const PUT_SETTINGS_SUCCESS = 'PUT_SETTINGS_SUCCESS';
export const PUT_SETTINGS_ERROR = 'PUT_SETTINGS_ERROR';

export const GET_CONNECTIONS = 'GET_CONNECTIONS';
export const GET_CONNECTIONS_SUCCESS = 'GET_CONNECTIONS_SUCCESS';
export const GET_CONNECTIONS_ERROR = 'GET_CONNECTIONS_ERROR';

export const DELETE_CALENDAR = 'DELETE_CALENDAR';
export const DELETE_CALENDAR_SUCCESS = 'DELETE_CALENDAR_SUCCESS';
export const DELETE_CALENDAR_ERROR = 'DELETE_CALENDAR_ERROR';

if (typeof window !== 'undefined') {
    var cookieUtil = require('../utils/cookieUtil').default;
}

import request from 'superagent';
import { deleteCalendarApiCall } from './apiActions';

const config = require('../../config');

export function getSettings() {
    return (dispatch) => {
        dispatch({
            type: GET_SETTINGS
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request.get(`${config.apiUrl}/settings?token=${token}`)
        .end((err, res) => {
            if (err) {
                return dispatch({
                    type: GET_SETTINGS_ERROR,
                    error: err
                })
            }

            dispatch({
                type: GET_SETTINGS_SUCCESS,
                payload: res
            });
        });
    }
}

export function putSettings(values) {
    return (dispatch) => {
        dispatch({
            type: PUT_SETTINGS
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request
            .put(`${config.apiUrl}/settings?token=${token}`)
            .send(values)
            .end((err, res) => {
                if (err) {
                    return dispatch({
                        type: PUT_SETTINGS_ERROR,
                        error: err
                    })
                }

                dispatch({
                    type: PUT_SETTINGS_SUCCESS,
                    payload: res
                });

                var a = new MouseEvent('refreshCalendar', {});
                document.dispatchEvent(a);

            });
    }
}

export function getCalendars() {
    return (dispatch) => {
        dispatch({
            type: GET_CALENDARS
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request.get(`${config.apiUrl}/calendars?token=${token}`)
        .end((err, res) => {
            if (err) {
                return dispatch({
                    type: GET_CALENDARS_ERROR,
                    error: err
                })
            }

            dispatch({
                type: GET_CALENDARS_SUCCESS,
                payload: res
            });
        });
    }
}

export function putCalendars(calendarId, selected) {
    return (dispatch) => {
        dispatch({
            type: PUT_CALENDARS
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request
            .put(`${config.apiUrl}/calendars?token=${token}`)
            .send({calendarId: calendarId, selected: selected})
            .end((err, res) => {
                if (err) {
                    return dispatch({
                        type: PUT_CALENDARS_ERROR,
                        error: err
                    })
                }

                dispatch({
                    type: PUT_CALENDARS_SUCCESS,
                    payload: res
                });

                var a = new MouseEvent('refreshCalendar', {});
                document.dispatchEvent(a);

            });
    }
}

export function getConnections() {
    console.log('calling get connections');
    return (dispatch) => {
        dispatch({
            type: GET_CONNECTIONS
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request.get(`${config.apiUrl}/connections?token=${token}`)
        .end((err, res) => {
            if (err) {
                console.log('get connections err', err);
                return dispatch({
                    type: GET_CONNECTIONS_ERROR,
                    error: err
                })
            }

            console.log('dispatching');

            dispatch({
                type: GET_CONNECTIONS_SUCCESS,
                payload: res.body
            });
        });
    }
}

export function deleteCalendar(data) {
    return (dispatch) => {

        dispatch({
            type: DELETE_CALENDAR,
            payload: data
        });

        deleteCalendarApiCall(data).then(() => {
            dispatch({
                type: DELETE_CALENDAR_SUCCESS
            });
        })
        .then(() => getConnections()(dispatch))
        .catch(err => {
            return dispatch({
                type: DELETE_CALENDAR_ERROR,
                error: err
            })
        });

    }
}
