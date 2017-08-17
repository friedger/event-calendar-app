export const GET_FACEBOOK_PAGES = 'GET_FACEBOOK_PAGES';
export const GET_FACEBOOK_PAGES_SUCCESS = 'GET_FACEBOOK_PAGES_SUCCESS';
export const GET_FACEBOOK_PAGES_ERROR = 'GET_FACEBOOK_PAGES_ERROR';

export const POST_FACEBOOK_PAGE = 'POST_FACEBOOK_PAGE';
export const POST_FACEBOOK_PAGE_SUCCESS = 'POST_FACEBOOK_PAGE_SUCCESS';
export const POST_FACEBOOK_PAGE_ERROR = 'POST_FACEBOOK_PAGE_ERROR';

var cookieUtil = require('../utils/cookieUtil').default;
import request from 'superagent';
const config = require('../../config');
import { browserHistory } from 'react-router';

export function getFacebookPages() {
    return dispatch => {
        dispatch({
            type: GET_FACEBOOK_PAGES
        });
        const token = cookieUtil.getItem('eventcal-admin');
        request.get(`${config.apiUrl}/facebook/pages?token=${token}`).end((err, res) => {
            if (err) {
                return dispatch({
                    type: GET_FACEBOOK_PAGES_ERROR,
                    error: err
                });
            }

            return dispatch({
                type: GET_FACEBOOK_PAGES_SUCCESS,
                payload: res.body
            });
        });
    };
}

export const postFacebookCalendarUrl = (formState, eventCalWidgetUuid) => {
    const token = cookieUtil.getItem('eventcal-admin');
    var endpoint = `${config.apiUrl}/facebook/calendars?token=${token}`;
    if (eventCalWidgetUuid) {
        endpoint += `&widgetUuid=${eventCalWidgetUuid}`;
    }

    return new Promise((resolve, reject) => {
        request.post(endpoint).send({ url: formState.pageUrl, selected: true }).end((err, res) => {
            if (err) {
                return reject();
            }
            resolve();
        });
    });
};

export const postFacebookCalendar = (pageDetails, redirectToEditor) => {
    return dispatch => {
        dispatch({
            type: POST_FACEBOOK_PAGE
        });

        const token = cookieUtil.getItem('eventcal-admin');
        request
            .post(`${config.apiUrl}/facebook/calendars?token=${token}`)
            .send({ name: pageDetails.name, pageId: pageDetails.id })
            .end((err, res) => {
                if (err) {
                    return dispatch({
                        type: POST_FACEBOOK_PAGE_ERROR,
                        error: err
                    });
                }

                dispatch({
                    type: POST_FACEBOOK_PAGE_SUCCESS,
                    payload: res
                });

                if (redirectToEditor) {
                    browserHistory.push('/editor');
                }

            });
    };
};
