import request from 'superagent';
const config = require('../../config');

export const CHECK_DETAILS = 'CHECK_DETAILS';
export const CHECK_DETAILS_SUCCESS = 'CHECK_DETAILS_SUCCESS';
export const CHECK_DETAILS_ERROR = 'CHECK_DETAILS_ERROR';

export function checkDetails(values) {
    return (dispatch) => {
        dispatch({
            type: CHECK_DETAILS
        });

        request.get(`${config.apiUrl}/reset-password?code=${values.code}&email=${values.email}`)
        .end((err, res) => {
            if (err) {
                return dispatch({
                    type: CHECK_DETAILS_ERROR,
                    error: err
                });
            }

            dispatch({
                type: CHECK_DETAILS_SUCCESS,
                payload: res
            });
        });
    };
}
