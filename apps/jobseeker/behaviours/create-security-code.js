'use strict';
const logger = require('../../../lib/logger');
const {getMdcForHeader} = require('../../../lib/logger-mdc');
const CreateSecurityCodeModel = require('../models/create-security-code');

module.exports = superclass => class extends superclass {

    saveValues(req, res, next) {
      const brp = req.sessionModel.get('brp') || '';
      const dob = req.sessionModel.get('dob') || '';

      // get correlation and session ID
      const queryInfo = getMdcForHeader() || {};

      logger.info('Creating security code for BRP ' + brp,
        { documentId: brp, sessionId: queryInfo.sessionId, correlationId: queryInfo.correlationId });

      const securityCodeModel = new CreateSecurityCodeModel({brp: brp, dob: dob});

      securityCodeModel.save((statusErr, shareData) => {
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

          logger.error('Unable to create security code', statusErr);
          const err = new Error('Unable to create security code.');
          err.template = 'cookie-error';
          return next(err);
        }

        req.sessionModel.set('shareData', shareData);

        super.saveValues(req, res, next);
      });
    }

};
