/* eslint-disable camelcase */
/* eslint no-process-env: 0*/
'use strict';

process.env.REDIS_PORT = 6379;
process.env.REDIS_HOST = '127.0.0.1';

// set to 'development' if need to show stack traces
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
const env = process.env.NODE_ENV;

// for use when running in docker
// process.env.REDIS_HOST = process.env.REDIS_PORT_6379_TCP_ADDR;

module.exports = {
  env: env,
  port: process.env.PORT || 8080,
  rtwApi: process.env.BASE_RTW_API || 'http://localhost:8001',
  environment: process.env.ENVIRONMENT || 'status',
  instance_id: process.env.INSTANCE_ID || 'instance_id',
  subsystem: process.env.SUBSYSTEM || 'web-ui',
  logHost: process.env.LOG_HOST || 'localhost',
  logPort: process.env.LOG_PORT || 28777,
  logSSLEnable: process.env.LOG_SSL_ENABLE || false,
  logSSLKey: process.env.LOG_SSL_KEY || '',
  logSSLCert: process.env.LOG_SSL_CERT || '',
  logSSLPassphrase: process.env.LOG_SSL_PASSPHRASE || '',
  logExpressEvents: process.env.LOG_EXPRESS_EVENTS || 'false'
};
