const request = require('superagent');
const config = require('../../config');
const renderConfig = require('../renderConfig');
const logger = require('../../logger');

module.exports = function (req, res) {

    function getConnections() {
        return new Promise((resolve, reject) => {
            request
                .get(`${config.apiUrl}/connections?token=${req.cookies['eventcal-admin']}`)
                .end((err, response) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(response);
                });
        });
    }

    function getOnboarding() {
        return new Promise((resolve, reject) => {
            request
                .get(`${config.apiUrl}/onboarding?token=${req.cookies['eventcal-admin']}`)
                .end((err, response) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(response);
                });
        });
    }

    Promise.all([getConnections(), getOnboarding()]).then((apiResponses) => {
        const connectionsResonse = apiResponses[0];
        const onboardingResponse = apiResponses[1];

        if (!connectionsResonse) {
            logger.error('A user saw the network error. The api was down', {
                url: req.originalUrl
            });
            return res.redirect('/dashboard/network-error');
        }

        const userChoseManualEvents = onboardingResponse.body.selected_manual_events;

        if ((connectionsResonse.body.length === 0) && !userChoseManualEvents) {
            return res.redirect('/link-calendar');
        }

        res.render('index.hbs', renderConfig);
    }).catch(err => {
        logger.error('A user saw the account error', {
            url: req.originalUrl,
            cookies: req.cookies,
            err: err
        });
        return res.redirect('/dashboard/account-error');
    });

}
