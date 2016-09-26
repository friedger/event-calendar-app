const renderConfig = require('../renderConfig');

module.exports = (req, res, next) => {
    if (req.originalUrl.indexOf('iframe') > -1) {
        Object.assign(renderConfig, {isIframe: true})
    }

    res.render('index.hbs', renderConfig);
}
