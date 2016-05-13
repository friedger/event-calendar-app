const renderConfig = require('../renderConfig');

module.exports = (req, res, next) => {
    res.render('index.hbs', renderConfig);
}
