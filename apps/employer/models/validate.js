'use strict';
const config = require('../../../config');
const Model = require('hof-model');
let correlationId;
let sessionId;

module.exports = class Status extends Model {
  constructor(attrs, options) {
    super(attrs, options);
  }

  prepare() {
    if (this.attributes.queryInfo) {
      correlationId = this.attributes.queryInfo.correlationId;
      sessionId = this.attributes.queryInfo.sessionId;
      delete this.attributes.queryInfo;
    }
    return Promise.resolve(this.toJSON());
  }

  url() {
    return {
      uri: `${config.rtwApi}/status/${this.get('brp')}/validateEmployer`,
      headers: {sessionid: sessionId, correlationid: correlationId}
    };
  }
};
