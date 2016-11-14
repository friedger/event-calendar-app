const cookieUtil = require('./cookieUtil').default;
const config = require('../../config');

module.exports = () => `${config.apiUrl}/authenticate?token=${cookieUtil.getItem('eventcal-admin')}`;
