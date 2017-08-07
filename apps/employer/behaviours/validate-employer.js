'use strict';
const logger = require('../../../lib/logger');
const {getMdcForHeader} = require('../../../lib/logger-mdc');
const ValidateModel = require('../models/validate');

module.exports = superclass => class extends superclass {

  saveValues(req, res, callback) {
    const brp = req.body['applicant-brp'] || '';
    const securityCode = req.body['access-code'] || '';

    // get correlation and session ID
    const queryInfo = getMdcForHeader() || {};

    logger.info('Validating employer for BRP: ' + brp + ', security code: '
      + securityCode, { documentId: brp, sessionId: queryInfo.sessionId, correlationId: queryInfo.correlationId });
// eslint-disable-next-line complexity
    new ValidateModel({brp: brp, securityCode: securityCode, queryInfo: queryInfo}).save((statusErr) => {
      if (statusErr) {
        if (statusErr.status === 400 || statusErr.status === 401 || statusErr.status === 404) {

          // brp / code mismatch error
          if (statusErr.errorType && statusErr.errorType === 'SECURITY_CODE_NOT_MATCH') {
            logger.info('Redirecting to error page because of return code ' + statusErr.errorType
              + ' for BRP ' + brp
              + ', security code: ' + securityCode,
              { documentId: brp, sessionId: queryInfo.sessionId, correlationId: queryInfo.correlationId });
            // set error page to display
            req.sessionModel.set('errorDetails', {
              'errorToDisplay': 'brpCodeMismatch',
              'brp': brp,
              'securityCode': securityCode
            });
            res.redirect('error');
            return;
          }

          // code expired error
          if (statusErr.errorType && statusErr.errorType === 'SECURITY_CODE_EXPIRED') {
            logger.info('Redirecting to error page because of return code ' + statusErr.errorType
              + ' for BRP ' + brp
              + ', security code: ' + securityCode,
              { documentId: brp, sessionId: queryInfo.sessionId, correlationId: queryInfo.correlationId });
            // set error page to display
            req.sessionModel.set('errorDetails', {
              'errorToDisplay': 'codeExpired'
            });
            res.redirect('error');
            return;
          }

          // account locked out error
          if (statusErr.errorType && statusErr.errorType === 'ACCOUNT_LOCKED_OUT') {
            logger.info('Redirecting to error page because of return code ' + statusErr.errorType
              + ' for BRP ' + brp
              + ', security code: ' + securityCode,
              { documentId: brp, sessionId: queryInfo.sessionId, correlationId: queryInfo.correlationId });
            // set error page to display
            req.sessionModel.set('errorDetails', {
              'errorToDisplay': 'attemptsLockout'
            });
            res.redirect('error');
            return;
          }

          // default error
          if (statusErr.errorType && statusErr.errorType !== '') {
            logger.info('Redirecting to error page because of return code ' + statusErr.errorType
              + ' for BRP ' + brp
              + ', security code: ' + securityCode,
              { documentId: brp, sessionId: queryInfo.sessionId, correlationId: queryInfo.correlationId });
            // set error page to display
            req.sessionModel.set('errorDetails', {
              'errorToDisplay': 'cantfind'
            });
            res.redirect('error');
            return;
          }
        }

        logger.error('Unable to validate employer', statusErr);
        const err = new Error('Unable to validate employer');
        err.template = 'cookie-error';
        return callback(err);
      }

      super.saveValues(req, res, callback);
    });
  }
};

