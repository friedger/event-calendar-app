const winston = require('winston');
// const config = require('./config')[process.env.NODE_ENV];
require('winston-logstash');
var logzioWinstonTransport = require('winston-logzio');

if (process.env.NODE_ENV === 'production') {
    var loggerOptions = {
        token: 'RRpldniikekWDEywgAZzLYClsKikyyae',
        host: 'listener.logz.io',
        type: 'YourLogType' // OPTIONAL (If none is set, it will be 'nodejs')
    };
    winston.add(logzioWinstonTransport, loggerOptions);
}

module.exports = winston;
