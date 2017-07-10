export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const ADD_USER = 'GET_USER';
export const ADD_USER_SUCCESS = 'GET_USER_SUCCESS';
export const ADD_USER_FAILURE = 'GET_USER_FAILURE';

export const POPULATE_REGISTER_FORM = 'POPULATE_REGISTER_FORM';

export const TOGGLE_SUGESSTIONS = 'TOGGLE_SUGESSTIONS';
export const EVENTCAL_REMOVED = 'EVENTCAL_REMOVED';

export const BLOW_STATE = 'BLOW_STATE';

import request from 'superagent';
const config = require('../../config');

import { browserHistory } from 'react-router'

if (typeof window !== 'undefined') {
    var cookieUtil = require('../utils/cookieUtil').default;
}

export function blowState() {
    return {
        type: 'BLOW_STATE'
    }
}

export function getUser() {
    return (dispatch) => {

        const token = cookieUtil.getItem('eventcal-admin');

        dispatch({
            type: GET_USER
        });
        request
            .get(`${config.apiUrl}/user?token=${token}`)
            .end((err, res) => {
                if (err) {
                    return dispatch({
                        type: GET_USER_FAILURE,
                        error: err
                    })
                }

                if (window.location.href && window.location.href.indexOf('weebly-iframe') === -1 && config.intercom) {
                    window.Intercom('boot', {
                        app_id: config.intercom,
                        email: res.body.email,
                        created_at: res.body.userCreatedTime,
                        status: res.body.status,
                        user_id: res.body.userId
                    });
                }

                dispatch({
                    type: GET_USER_SUCCESS,
                    payload: res
                });

            });
    }
}

export function addUser(formState) {
    return (dispatch) => {
        dispatch({
            type: ADD_USER
        });
        request
            .post(`${config.apiUrl}/users`)
            .send({username: formState.username.value, password: formState.password.value, email: formState.email.value})
            .end((err, res) => {
                if (err) {
                    return dispatch({
                        type: ADD_USER_FAILURE,
                        error: err
                    })
                }

                dispatch({
                    type: ADD_USER_SUCCESS,
                    payload: res
                });

            });
    }
}

export function popuplateRegisterFormFromQuery(query) {
    return {
        type: POPULATE_REGISTER_FORM,
        payload: query
    }
}

export function toggleSugesstions(){
    return {
        type: TOGGLE_SUGESSTIONS
    }
}

export function eventcalRemoved() {
    return {
        type: EVENTCAL_REMOVED
    }
}

export function logOut() {
    cookieUtil.removeItem('eventcal-admin');
    cookieUtil.removeItem('eventcal-admin', '/', '.eventcalendarapp.com');
    cookieUtil.removeItem('eventcal-admin', '/', 'localhost');

    if (window.Intercom) {
        Intercom('shutdown');
    }
    window.location.href='/';
}
