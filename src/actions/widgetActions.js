export const GET_WIDGETS = 'GET_WIDGETS';
export const GET_WIDGETS_SUCCESS = 'GET_WIDGETS_SUCCESS';
export const GET_WIDGETS_ERROR = 'GET_WIDGETS_ERROR';

export const GET_WIDGET = 'GET_WIDGET';
export const GET_WIDGET_SUCCESS = 'GET_WIDGET_SUCCESS';
export const GET_WIDGET_ERROR = 'GET_WIDGET_ERROR';

export const POST_WIDGETS = 'POST_WIDGETS';
export const POST_WIDGETS_SUCCESS = 'POST_WIDGETS_SUCCESS';
export const POST_WIDGETS_ERROR = 'POST_WIDGETS_ERROR';

export const DELETE_WIDGET = 'DELETE_WIDGET';
export const DELETE_WIDGET_SUCCESS = 'DELETE_WIDGET_SUCCESS';
export const DELETE_WIDGET_ERROR = 'DELETE_WIDGET_ERROR';

export const PUT_WIDGET_PUBLICLY_AVAILABLE = 'PUT_WIDGET_PUBLICLY_AVAILABLE';
export const PUT_WIDGET_PUBLICLY_AVAILABLE_SUCCESS =
    'PUT_WIDGET_PUBLICLY_AVAILABLE_SUCCESS';
export const PUT_WIDGET_PUBLICLY_AVAILABLE_ERROR =
    'PUT_WIDGET_PUBLICLY_AVAILABLE_ERROR';

export const PUT_WIDGET = 'PUT_WIDGET';
export const PUT_WIDGET_SUCCESS = 'PUT_WIDGET_SUCCESS';
export const PUT_WIDGET_ERROR = 'PUT_WIDGET_ERROR';

export const WIDGET_ERROR_ACKNOWLEDGED = 'WIDGET_ERROR_ACKNOWLEDGED';

var cookieUtil = require('../utils/cookieUtil').default;
import request from 'superagent';
const config = require('../../config');

export function getWidgets() {
    return dispatch => {
        dispatch({
            type: GET_WIDGETS
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request
            .get(`${config.apiUrl}/widgets?token=${token}`)
            .end((err, res) => {
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

export function getWidget(uuid) {
    return dispatch => {
        dispatch({
            type: GET_WIDGET
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request
            .get(`${config.apiUrl}/widget?token=${token}&uuid=${uuid}`)
            .end((err, res) => {
                if (err) {
                    return dispatch({
                        type: GET_WIDGET_ERROR,
                        error: err
                    });
                }

                return dispatch({
                    type: GET_WIDGET_SUCCESS,
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
        request
            .post(`${config.apiUrl}/widgets?token=${token}`)
            .end((err, res) => {
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
        request
            .delete(`${config.apiUrl}/widgets?token=${token}`)
            .send({ uuid })
            .end((err, res) => {
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

export function putWidgetPubliclyAvailable(makePublic, uuid) {
    return dispatch => {
        dispatch({
            type: PUT_WIDGET_PUBLICLY_AVAILABLE
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request
            .put(`${config.apiUrl}/widgets?token=${token}`)
            .send({ public: makePublic, uuid })
            .end((err, res) => {
                if (err) {
                    return dispatch({
                        type: PUT_WIDGET_PUBLICLY_AVAILABLE_ERROR,
                        error: err
                    });
                }

                dispatch({
                    type: PUT_WIDGET_PUBLICLY_AVAILABLE_SUCCESS,
                    payload: res.body
                });
            });
    };
}

export function putWidgetAlias(alias, uuid) {
    return dispatch => {
        dispatch({
            type: PUT_WIDGET
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request
            .put(`${config.apiUrl}/widget?token=${token}&uuid=${uuid}`)
            .send({ alias })
            .end((err, res) => {
                if (err) {
                    return dispatch({
                        type: PUT_WIDGET_ERROR,
                        error: err,
                        status: res.status
                    });
                }

                console.log(alias)

                dispatch({
                    type: PUT_WIDGET_SUCCESS,
                    payload: res.body,
                    successfulAlias: alias
                });
            });
    };
}

export function widgetErrorAcknowledged() {
    return {
        type: WIDGET_ERROR_ACKNOWLEDGED
    };
}
