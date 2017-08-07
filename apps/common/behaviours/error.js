'use strict';

module.exports = superclass => {
  return class extends superclass {
    locals(req, res) {
      const locals = super.locals(req, res);

      const errorDetails = req.sessionModel.get('errorDetails');

      const key = errorDetails.errorToDisplay;
      let errorObj = {};
      errorObj[key] = true;

      return Object.assign({}, locals, {errorObj}, {errorDetails});
    }
  };
};

