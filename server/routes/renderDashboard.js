const request = require('superagent');
const config = require('../../config');
const renderConfig = require('../renderConfig');

module.exports = function (req, res) {

    request
        .get(`${config.apiUrl}/user?token=${req.cookies['eventcal-admin']}`)
        .end((err, apiResponse) => {
            if (err) {

            }

            if (!apiResponse.body.calendarAuthorised) {
                return res.redirect('/link-calendar');
            }

            res.render('index.hbs', renderConfig);

        });
}