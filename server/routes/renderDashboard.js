const request = require('superagent');
const config = require('../../config');
const renderConfig = require('../renderConfig');
const logger = require('../../logger');

module.exports = function (req, res) {

    request
        .get(`${config.apiUrl}/connections?token=${req.cookies['eventcal-admin']}`)
        .end((err, apiResponse) => {

            if (!apiResponse) {
                logger.error('A user saw the network error. The api was down', {
                    url: req.originalUrl
                });
                return res.redirect('/dashboard/network-error');
            }

            if (err) {
                logger.error('A user saw the account error', {
                    url: req.originalUrl,
                    cookies: req.cookies
                });
                return res.redirect('/dashboard/account-error');
            }

            if (apiResponse.body.length === 0) {
                return res.redirect('/link-calendar');
            }

            res.render('index.hbs', renderConfig);

        });
}
