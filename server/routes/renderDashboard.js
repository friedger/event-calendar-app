const request = require('superagent');
const config = require('../../config');
const renderConfig = require('../renderConfig');

module.exports = function (req, res) {

    request
        .get(`${config.apiUrl}/connections?token=${req.cookies['eventcal-admin']}`)
        .end((err, apiResponse) => {

            if (!apiResponse) {
                return res.redirect('/dashboard/network-error');
            }

            if (err) {
                return res.redirect('/dashboard/account-error');
            }

            if (apiResponse.body.length === 0) {
                return res.redirect('/link-calendar');
            }

            res.render('index.hbs', renderConfig);

        });
}
