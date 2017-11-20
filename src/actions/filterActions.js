import request from 'superagent';
const config = require('../../config');
var cookieUtil = require('../utils/cookieUtil').default;

export const GET_AVAILABLE_FILTERS = 'GET_AVAILABLE_FILTERS';
export const GET_AVAILABLE_FILTERS_SUCCESS = 'GET_AVAILABLE_FILTERS_SUCCESS';
export const GET_AVAILABLE_FILTERS_ERROR = 'GET_AVAILABLE_FILTERS_ERROR';

export const ASSIGN_FILTERS = 'ASSIGN_FILTERS';
export const ASSIGN_FILTERS_SUCCESS = 'ASSIGN_FILTERS_SUCCESS';
export const ASSIGN_FILTERS_ERROR = 'ASSIGN_FILTERS_ERROR';

export const POST_FILTER = 'POST_FILTER';
export const POST_FILTER_SUCCESS = 'POST_FILTER_SUCCESS';
export const POST_FILTER_ERROR = 'POST_FILTER_ERROR';

export const DELETE_FILTER = 'DELETE_FILTER';
export const DELETE_FILTER_SUCCESS = 'DELETE_FILTER_SUCCESS';
export const DELETE_FILTER_ERROR = 'DELETE_FILTER_ERROR';

export function getAvailableFilters() {
    return (dispatch) => {
        dispatch({
            type: GET_AVAILABLE_FILTERS
        });

        const token = cookieUtil.getItem('eventcal-admin');
        request.get(`${config.apiUrl}/filters?token=${token}`)
        .end((err, res) => {
            if (err) {
                return dispatch({
                    type: GET_AVAILABLE_FILTERS_ERROR,
                    error: err
                });
            }

            dispatch({
                type: GET_AVAILABLE_FILTERS_SUCCESS,
                payload: res
            });
        });
    };
}

export function postFilter(data) {
    return (dispatch) => {
        dispatch({
            type: POST_FILTER
        });

        const token = cookieUtil.getItem('eventcal-admin');
        request.post(`${config.apiUrl}/filters?token=${token}`)
        .send(data)
        .end((err, res) => {
            if (err) {
                return dispatch({
                    type: POST_FILTER_ERROR,
                    error: err
                });
            }

            dispatch({
                type: POST_FILTER_SUCCESS,
                payload: res
            });

            getAvailableFilters()(dispatch);
            var a = new MouseEvent('refreshCalendar', {});
            document.dispatchEvent(a);
        });
    };
}

export function deleteFilter(data) {
    return (dispatch) => {
        dispatch({
            type: DELETE_FILTER
        });

        const token = cookieUtil.getItem('eventcal-admin');
        request.delete(`${config.apiUrl}/filters?token=${token}`)
        .send(data)
        .end((err, res) => {
            if (err) {
                return dispatch({
                    type: DELETE_FILTER_ERROR,
                    error: err
                });
            }

            dispatch({
                type: DELETE_FILTER_SUCCESS,
                payload: res
            });

            getAvailableFilters()(dispatch);
            var a = new MouseEvent('refreshCalendar', {});
            document.dispatchEvent(a);
        });
    };
}

export function assignFilter(filterData) {
    return (dispatch) => {
        dispatch({
            type: ASSIGN_FILTERS
        });

        const token = cookieUtil.getItem('eventcal-admin');
        request.put(`${config.apiUrl}/assign-filter?token=${token}`)
        .send(filterData)
        .end((err, res) => {
            if (err) {
                return dispatch({
                    type: ASSIGN_FILTERS_ERROR,
                    error: err
                });
            }

            dispatch({
                type: ASSIGN_FILTERS_SUCCESS,
                payload: {
                    filterData: filterData
                }
            });
        });
    };
}
