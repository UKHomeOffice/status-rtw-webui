'use strict';
const logger = require('../../../lib/logger');
const {getMdcForHeader} = require('../../../lib/logger-mdc');
const GetStatusModel = require('../models/share-status');

module.exports = superclass => class extends superclass {

  saveValues(req, res, next) {
    const brp = req.sessionModel.get('brp') || '';
    const dob = req.sessionModel.get('dob') || '' || '';
    const empEmail = req.sessionModel.get('employer-email') || '';

    // get correlation and session ID
    const queryInfo = getMdcForHeader() || {};

    logger.info('Sharing status for BRP ' + brp + ' with ' + empEmail,
      { documentId: brp, sessionId: queryInfo.sessionId, correlationId: queryInfo.correlationId });
    new GetStatusModel({brp: brp, dob: dob, email: empEmail, queryInfo: queryInfo}).save((statusErr) => {

      if (statusErr) {

        if ((statusErr.errorType === 'SECURITY_CODE_FAILED_GENERATION'
                   || statusErr.errorType === 'SECURITY_CODE_EMPTY_BRP'
                   || statusErr.errorType === 'SECURITY_CODE_INVALID_EMAIL')) {
          logger.info('Redirecting to error page with return code ' + statusErr.errorType
          + ' for BRP ' + brp,
            { documentId: brp, sessionId: queryInfo.sessionId, correlationId: queryInfo.correlationId });

          // set error page to display and any data needed for message
          req.sessionModel.set('errorDetails', {
            'errorToDisplay': 'sharefailed'
          });
          res.redirect('error');
          return next();
        }

        logger.error('Unable to share status', statusErr);
        const err = new Error('Unable to share status');
        err.template = 'cookie-error';
        return next(err);
      }

      super.saveValues(req, res, next);
    });
  }
};
