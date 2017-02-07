var path = require('path');
var winston = require('winston');
require('winston-daily-rotate-file');
var fse = require('fs-extra');

var dir = 'logs';

try {
    fse.ensureDirSync(dir);
} catch (err) {
    console.log('Error creating log directory: ' + err);
}

var transports = [];

var fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/statistics_service.log',
    datePattern: 'yyyy-MM-dd.',
    prepend: true,
    level: process.env.ENV === 'development' ? 'debug' : 'debug'
});

transports.push(fileRotateTransport);

if(process.env.NODE_ENV !== 'production') {    
    var consoleTransport = new (winston.transports.Console)({'timestamp': true, 'colorize': true, level: 'debug'});
    transports.push(consoleTransport);
}

var logger = new (winston.Logger)({
    transports: transports
});

logger.debug("Environment is:" + process.env.NODE_ENV);
logger.debug('Logging is now setup');

module.exports = logger;