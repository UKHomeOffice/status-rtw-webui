'use strict';

module.exports = (superclass) => class extends superclass {

  getValues(req, res, callback) {
    req.sessionModel.reset();
    super.successHandler(req, res, callback);
  }
};
