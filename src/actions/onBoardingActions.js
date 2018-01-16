export const POST_ONBOARDING = 'POST_ONBOARDING';
export const POST_ONBOARDING_SUCCESS = 'POST_ONBOARDING_SUCCESS';
export const POST_ONBOARDING_ERROR = 'POST_ONBOARDING_ERROR';

export const GET_ONBOARDING = 'GET_ONBOARDING';
export const GET_ONBOARDING_SUCCESS = 'GET_ONBOARDING_SUCCESS';
export const GET_ONBOARDING_ERROR = 'GET_ONBOARDING_ERROR';

var cookieUtil = require('../utils/cookieUtil').default;
const config = require('../../config');
import request from 'superagent';

export function getOnboarding() {
    return (dispatch) => {
        const token = cookieUtil.getItem('eventcal-admin');

        dispatch({
            type: GET_ONBOARDING
        });
        request
            .get(`${config.apiUrl}/onboarding?token=${token}`)
            .end((err, res) => {
                if (err) {
                    return dispatch({
                        type: GET_ONBOARDING_ERROR,
                        error: err
                    });
                }

                dispatch({
                    type: GET_ONBOARDING_SUCCESS,
                    payload: res.body
                });

            });
    };
}

export function postOnBoarding(values, fetchAfterUpdating) {
    return dispatch => {
        dispatch({
            type: POST_ONBOARDING
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request.post(`${config.apiUrl}/onboarding?token=${token}`).send(values).end((err, res) => {
            if (err) {
                return dispatch({
                    type: POST_ONBOARDING_ERROR,
                    error: err
                });
            }

            dispatch({
                type: POST_ONBOARDING_SUCCESS,
                payload: res.body
            });
            if (fetchAfterUpdating) {
                getOnboarding()(dispatch);
            }
        });
    };
}
