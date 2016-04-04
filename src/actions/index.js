export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const ADD_USER = 'GET_USER';
export const ADD_USER_SUCCESS = 'GET_USER_SUCCESS';
export const ADD_USER_FAILURE = 'GET_USER_FAILURE';

import request from 'superagent';

import { browserHistory } from 'react-router'

if (typeof window !== 'undefined') {
    var cookieUtil = require('../utils/cookieUtil').default;
}

export function login(context, formState) {
    return (dispatch) => {
        dispatch({
            type: LOGIN
        });
        request
            .post('http://localhost:3000/login')
            .send({username: formState.username.value, password: formState.password.value})
            .end((err, res) => {
                if (err) {
                    return dispatch({
                        type: LOGIN_ERROR,
                        error: err
                    })
                }

                cookieUtil.setItem('eventcal-admin', res.body.token, 2333000); //Expires in roughly 27 days

                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res
                });

                context.router.push('/dashboard');

            });
    }
}

export function getUser() {
    return (dispatch) => {

        const token = cookieUtil.getItem('eventcal-admin');

        dispatch({
            type: GET_USER
        });
        request
            .get(`http://localhost:3000/user?token=${token}`)
            .end((err, res) => {
                if (err) {
                    return dispatch({
                        type: GET_USER_FAILURE,
                        error: err
                    })
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
            .post('http://localhost:3000/users')
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
