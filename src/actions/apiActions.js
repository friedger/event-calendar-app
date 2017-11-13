import request from 'superagent';
const cookieUtil = require('../utils/cookieUtil').default;
const config = require('../../config');

export const postUsers = (formState, location) => {
    return new Promise((resolve, reject) => {
        const postData = {
            username: formState.username,
            password: formState.password,
            email: formState.email
        };

        if (location.query && location.query.shop) {
            postData.shop = location.query.shop;
        }

        request
            .post(`${config.apiUrl}/users`)
            .send(postData)
            .end((err, res) => {
                if (err) {
                    const error = { _error: 'Login Failed.' };
                    if (res.body.error === 'This username already exists') {
                        error.username = res.body.error;
                    }
                    if (res.body.error === 'This email already exists') {
                        error.email = res.body.error;
                    }
                    return reject(error);
                }
                resolve();
            });
    });
};

export const postLogin = formState => {
    return new Promise((resolve, reject) => {
        request
            .post(`${config.apiUrl}/login`)
            .send({ username: formState.username, password: formState.password })
            .end((err, res) => {
                if (err) {
                    return reject();
                }

                cookieUtil.setItem('eventcal-admin', res.body.token, 2333000); // Expires in roughly 27 days
                resolve();
            });
    });
};

export const postCalendars = (formState, eventCalWidgetUuid) => {
    const token = cookieUtil.getItem('eventcal-admin');
    var endpoint = `${config.apiUrl}/calendars?token=${token}`;
    if (eventCalWidgetUuid) {
        endpoint += `&widgetUuid=${eventCalWidgetUuid}`;
    }
    return new Promise((resolve, reject) => {
        request
            .post(endpoint)
            .send({
                calendarUrl: formState.calendarurl,
                calendarName: formState.calendarname,
                selected: formState.selected
            })
            .end((err, res) => {
                if (err) {
                    return reject();
                }
                resolve();
            });
    });
};

export const deleteCalendarApiCall = data => {
    const token = cookieUtil.getItem('eventcal-admin');

    return new Promise((resolve, reject) => {
        request
            .delete(`${config.apiUrl}/calendars?token=${token}`)
            .send(data)
            .end((err, res) => {
                if (err) {
                    return reject();
                }
                resolve();
            });
    });
};

export const postOnboarding = update => {
    return new Promise((resolve, reject) => {
        const token = cookieUtil.getItem('eventcal-admin');

        request
            .post(`${config.apiUrl}/onboarding?token=${token}`)
            .send(update)
            .end((err) => {
                if (err) {
                    return reject();
                }
                resolve();
            });
    });
};

export const postResetPassword = data => {
    return new Promise((resolve, reject) => {
        request
            .post(`${config.apiUrl}/reset-password`)
            .send(data)
            .end((err, res) => {
                if (err) {
                    var error = { _error: 'There was an error' };
                    if (res.body.message === 'Email does not exist') {
                        error = { _error: 'This email does not exist' };
                    }
                    return reject(error);
                }
                resolve();
            });
    });
};

export const putResetPassword = data => {
    return new Promise((resolve, reject) => {
        request
            .put(`${config.apiUrl}/reset-password`)
            .send(data)
            .end((err, res) => {
                if (err) {
                    var error = { _error: 'There was an error' };
                    if (res.body.message === 'Email does not exist') {
                        error = { _error: 'This email does not exist' };
                    }
                    return reject(error);
                }
                resolve();
            });
    });
};
