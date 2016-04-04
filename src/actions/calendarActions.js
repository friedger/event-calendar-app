export const GET_CALENDARS = 'GET_CALENDARS';
export const GET_CALENDARS_SUCCESS = 'GET_CALENDARS_SUCCESS';
export const GET_CALENDARS_ERROR = 'GET_CALENDARS_ERROR';

if (typeof window !== 'undefined') {
    var cookieUtil = require('../utils/cookieUtil').default;
}

import request from 'superagent';

export function getCalendars() {
    return (dispatch) => {
        dispatch({
            type: GET_CALENDARS
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request.get(`http://localhost:3000/calendars?token=${token}`)
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
