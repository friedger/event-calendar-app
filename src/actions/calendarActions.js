export const GET_CALENDARS = 'GET_CALENDARS';
export const GET_CALENDARS_SUCCESS = 'GET_CALENDARS_SUCCESS';
export const GET_CALENDARS_ERROR = 'GET_CALENDARS_ERROR';

export const PUT_CALENDARS = 'PUT_CALENDARS';
export const PUT_CALENDARS_SUCCESS = 'PUT_CALENDARS_SUCCESS';
export const PUT_CALENDARS_ERROR = 'PUT_CALENDARS_ERROR';

if (typeof window !== 'undefined') {
    var cookieUtil = require('../utils/cookieUtil').default;
}

import request from 'superagent';
const config = require('../../config');

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
                console.log(err)
                console.log(res)
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
