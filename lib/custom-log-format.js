/* eslint-disable camelcase */
'use strict';
const config = require('../config');

module.exports = {
  customLogFormat: (logStatement) => {
    const logstashLogStatement = Object.assign({}, logStatement);

    logstashLogStatement.namespace = config.environment;
    logstashLogStatement.instanceId = config.instance_id;
    logstashLogStatement.subsystem = config.subsystem;
    logstashLogStatement.sessionId = logStatement.sessionId;
    logstashLogStatement.correlationId = logStatement.correlationId;
    logstashLogStatement.documentId = logStatement.documentId;
    logstashLogStatement.timestamp = logStatement.timestamp || new Date();
    logstashLogStatement.severity = logStatement.level;
    logstashLogStatement.message = logStatement.message;

    delete logstashLogStatement.level;

    return JSON.stringify(logstashLogStatement);
  },

// eslint-disable-next-line no-unused-vars
  customLogFormat_tcp: (level, message, meta, self) => {
    const logstashLogStatement = Object.assign({});

    logstashLogStatement.namespace = config.environment;
    logstashLogStatement.instanceId = config.instance_id;
    logstashLogStatement.subsystem = config.subsystem;
    logstashLogStatement.sessionId = meta.sessionId;
    logstashLogStatement.correlationId = meta.correlationId;
    logstashLogStatement.documentId = meta.documentId;
    logstashLogStatement.timestamp = meta.timestamp || new Date();
    logstashLogStatement.severity = level;
    logstashLogStatement.message = message;

    return JSON.stringify(logstashLogStatement);
  }
};
