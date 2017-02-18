const request = require('superagent');
const config = require('../../config');
const renderConfig = require('../renderConfig');

module.exports = function (req, res) {

    request
        .get(`${config.apiUrl}/connections?token=${req.cookies['eventcal-admin']}`)
        .end((err, apiResponse) => {
            if (err) {
                return res.json({error: 'No api response'});
            }

            if (!apiResponse) {
                return res.json({error: 'No api response'});
            }

            if (apiResponse.body.length === 0) {
                return res.redirect('/link-calendar');
            }

            res.render('index.hbs', renderConfig);

        });
}
