import request from 'superagent';
const config = require('../../config');
var cookieUtil = require('../utils/cookieUtil').default;

export const GET_AVAILABLE_FILTERS = 'GET_AVAILABLE_FILTERS';
export const GET_AVAILABLE_FILTERS_SUCCESS = 'GET_AVAILABLE_FILTERS_SUCCESS';
export const GET_AVAILABLE_FILTERS_ERROR = 'GET_AVAILABLE_FILTERS_ERROR';
export const ASSIGN_FILTERS = 'ASSIGN_FILTERS';
export const ASSIGN_FILTERS_SUCCESS = 'ASSIGN_FILTERS_SUCCESS';
export const ASSIGN_FILTERS_ERROR = 'ASSIGN_FILTERS_ERROR';

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
