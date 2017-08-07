/* eslint-disable camelcase */
const MDCAwareLogger = require('./mdc-aware-logger');
const logFormat = require('./custom-log-format');

const winston = require('winston');
require('winston-logstash');
const config = require('../config');
const loggingTransports = [];
const exceptionTransports = [];
const notProd = (config.env === 'development' || config.env === 'ci');
const colors = {
  info: 'green',
  email: 'magenta',
  warn: 'yellow',
  error: 'red'
};


loggingTransports.push(
  new (winston.transports.Console)({
    json: (notProd === true) ? false : true,
    timestamp: true,
    colorize: true,
    stringify: logFormat.customLogFormat
  })
);

let logstash = new winston.transports.Logstash({
  port: config.logPort,
  host: config.logHost,
  timestamp: true,
  max_connect_retries: 4,
  transform: logFormat.customLogFormat_tcp,
  ssl_enable: config.logSSLEnable,
  ssl_key: config.logSSLKey,
  ssl_cert: config.logSSLCert,
  ssl_passphrase: config.logSSLPassphrase
});
logstash.on('error', (err) => {
// eslint-disable-next-line no-console
  console.error(err);
});

loggingTransports.push(
  logstash
);

exceptionTransports.push(
  new (winston.transports.Console)({
    json: (notProd === true) ? false : true,
    logstash: true,
    timestamp: true,
    colorize: true,
    stringify: function stringify(obj) {
      return JSON.stringify(obj);
    }
  })
);

const transports = {
  transports: loggingTransports,
  exceptionHandlers: exceptionTransports,
  exitOnError: true
};

if (notProd) {
  delete transports.exceptionHandlers;
}

const logger = new (winston.Logger)(transports);


winston.addColors(colors);

module.exports = new MDCAwareLogger(logger);
