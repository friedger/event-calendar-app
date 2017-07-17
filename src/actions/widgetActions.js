export const GET_WIDGETS = 'GET_WIDGETS';
export const GET_WIDGETS_SUCCESS = 'GET_WIDGETS_SUCCESS';
export const GET_WIDGETS_ERROR = 'GET_WIDGETS_ERROR';

export const POST_WIDGETS = 'POST_WIDGETS';
export const POST_WIDGETS_SUCCESS = 'POST_WIDGETS_SUCCESS';
export const POST_WIDGETS_ERROR = 'POST_WIDGETS_ERROR';

export const DELETE_WIDGET = 'DELETE_WIDGET';
export const DELETE_WIDGET_SUCCESS = 'DELETE_WIDGET_SUCCESS';
export const DELETE_WIDGET_ERROR = 'DELETE_WIDGET_ERROR';

var cookieUtil = require('../utils/cookieUtil').default;
import request from 'superagent';
const config = require('../../config');

export function getWidgets() {
    return dispatch => {
        dispatch({
            type: GET_WIDGETS
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request.get(`${config.apiUrl}/widgets?token=${token}`).end((err, res) => {
            if (err) {
                return dispatch({
                    type: GET_WIDGETS_ERROR,
                    error: err
                });
            }

            return dispatch({
                type: GET_WIDGETS_SUCCESS,
                payload: res.body
            });
        });
    };
}

export function postWidgets() {
    return dispatch => {
        dispatch({
            type: POST_WIDGETS
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request.post(`${config.apiUrl}/widgets?token=${token}`).end((err, res) => {
            if (err) {
                return dispatch({
                    type: POST_WIDGETS_ERROR,
                    error: err
                });
            }

            dispatch({
                type: POST_WIDGETS_SUCCESS,
                payload: res.body
            });

            return getWidgets()(dispatch);
        });
    };
}

export function deleteWidget(uuid) {
    return dispatch => {
        dispatch({
            type: DELETE_WIDGET
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request.delete(`${config.apiUrl}/widgets?token=${token}`).send({ uuid }).end((err, res) => {
            if (err) {
                return dispatch({
                    type: DELETE_WIDGET_ERROR,
                    error: err
                });
            }

            dispatch({
                type: DELETE_WIDGET_SUCCESS,
                payload: res.body
            });

            return getWidgets()(dispatch);
        });
    };
}
