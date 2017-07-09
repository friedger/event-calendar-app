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
                    const error = {_error: 'Login Failed.'};
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
}

export const postLogin = (formState) => {
    return new Promise((resolve, reject) => {
        request
        .post(`${config.apiUrl}/login`)
        .send({username: formState.username, password: formState.password})
        .end((err, res) => {
            if (err) {
                return reject();
            }

            cookieUtil.setItem('eventcal-admin', res.body.token, 2333000); //Expires in roughly 27 days
            resolve()
        });
    });
}

export const postCalendars = (formState, eventCalWidgetUuid) => {
    const token = cookieUtil.getItem('eventcal-admin');

    return new Promise((resolve, reject) => {
        request
        .post(`${config.apiUrl}/calendars?token=${token}&widgetUuid=${eventCalWidgetUuid}`)
        .send({calendarUrl: formState.calendarurl, calendarName: formState.calendarname, selected: formState.selected})
        .end((err, res) => {
            if (err) {
                return reject();
            }
            resolve()
        });
    });
}

export const deleteCalendarApiCall = (data) => {
    const token = cookieUtil.getItem('eventcal-admin');

    return new Promise((resolve, reject) => {
        request
        .delete(`${config.apiUrl}/calendars?token=${token}`)
        .send(data)
        .end((err, res) => {
            if (err) {
                return reject();
            }
            resolve()
        });
    });
}
