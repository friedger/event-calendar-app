const cookieUtil = require('./cookieUtil').default;
const config = require('../../config');

module.exports = () => `${config.apiUrl}/facebook?token=${cookieUtil.getItem('eventcal-admin')}`;
