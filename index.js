/* eslint-disable camelcase */
'use strict';
const {mdcSetup} = require('./lib/logger-mdc');
const path = require('path');
const hof = require('hof');
const config = require('./config');

const winston = require('winston');
const expressWinston = require('express-winston');
const logFormat = require('./lib/custom-log-format');

const settings = require('./hof.settings');

settings.routes = settings.routes.map(route => require(route));
settings.root = __dirname;
settings.start = false;
settings.views = path.resolve(__dirname, './apps/common/views');


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

const loggingMiddleware = expressWinston.logger({
  transports: [
    logstash
  ],
  meta: false,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: false,
// eslint-disable-next-line no-unused-vars
  ignoreRoute: (req, res) => {
   return false;
  }
});


if (config.logExpressEvents !== 'false') {
  settings.middleware = [loggingMiddleware];
}

const app = hof(settings);

app.use('/healthz', (req, res) => {
  res.send('status-rtw-webui healthy');
});

app.use('/readiness', (req, res) => {
  res.send('status-rtw-webui ready');
});

app.use((req, res, next) => {
// eslint-disable-next-line quotes
  res.setHeader("Content-Security-Policy", "img-src www.google-analytics.com 'self' data:");
  // eslint-disable-next-line quotes
  res.setHeader("Cache-Control", "private, no-cache, no-store, must-revalidate");
  // eslint-disable-next-line quotes
  res.setHeader("Pragma", "no-cache");
  // eslint-disable-next-line quotes
  res.setHeader("Expires", "-1");
  return next();
});

// must be after session since we need session
app.use(mdcSetup);

module.exports = app;
