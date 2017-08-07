'use strict';
const logger = require('../../../lib/logger');
const {getMdcForHeader} = require('../../../lib/logger-mdc');
const GetStatusModel = require('../models/status');
const moment = require('moment');

module.exports = superclass => class extends superclass {

  getValues(req, res, next) {
    const brp = req.sessionModel.get('brp') || '';
    const dob = req.sessionModel.get('dob') || '';

    // get correlation and session ID
    const queryInfo = getMdcForHeader() || {};
    logger.info('Getting status for BRP ' + brp,
      { documentId: brp, sessionId: queryInfo.sessionId, correlationId: queryInfo.correlationId });
    // eslint-disable-next-line complexity,max-statements
    new GetStatusModel({brp: brp, dob: dob, queryInfo: queryInfo}).save((statusErr, statusData) => {
      if (statusErr && (statusErr.status === 400 || statusErr === 401)) {
        if ((statusErr.errorType === 'FAILED'
            || statusErr.errorType === 'NO_PERSON_FOUND'
            || statusErr.errorType === 'MORE_THAN_ONE_MATCH'
            || statusErr.errorType === 'RESTRICTED_CASE')) {
          logger.info('Redirecting to error page with return code ' + statusErr.errorType + ' for BRP ' + brp,
            { documentId: brp, sessionId: queryInfo.sessionId, correlationId: queryInfo.correlationId });
          // set error page to display and any data needed for message
          req.sessionModel.set('errorDetails', {
            'errorToDisplay': 'cantfind'
          });
          res.redirect('error');
          return next();
        }

        if (statusErr.errorType === 'ACCOUNT_LOCKED_OUT') {
          logger.info('Redirecting to error page with return code ' + statusErr.errorType + ' for BRP ' + brp
            + ', DOB ' + dob,
            { documentId: brp, sessionId: queryInfo.sessionId, correlationId: queryInfo.correlationId });
          // set error page to display and any data needed for message
          req.sessionModel.set('errorDetails', {
            'errorToDisplay': 'attemptsLockout'
          });
          res.redirect('error');
          return next();
        }

        if (statusErr.errorType === 'INCORRECT_BIOGRAPHIC') {
          logger.info('Redirecting to error page with return code ' + statusErr.errorType + ' for BRP ' + brp
            + ', DOB ' + dob,
            { documentId: brp, sessionId: queryInfo.sessionId, correlationId: queryInfo.correlationId });
          // set error page to display and any data needed for message
          req.sessionModel.set('errorDetails', {
            'errorToDisplay': 'cantfind'
          });
          res.redirect('error');
          return next();
        }

        if (statusErr.errorType === 'BRP_CARD_INACTIVE') {
          logger.info('Redirecting to error page with return code ' + statusErr.errorType + ' for BRP ' + brp,
            { documentId: brp, sessionId: queryInfo.sessionId, correlationId: queryInfo.correlationId });
          // set error page to display and any data needed for message
          req.sessionModel.set('errorDetails', {
            'errorToDisplay': 'notvalid'
          });
          res.redirect('error');
          return next();
        }
      }


      // generic error page
      if (statusErr) {
        logger.error('Unable to retrieve BRP status', statusErr);
        const err = new Error('Unable to retrieve BRP status');
        err.template = 'cookie-error';
        return next(err);
      }

      // if no status code, redirect to error page
      if (!statusData.workStatus || statusData.workStatus === '') {
        logger.error('No workStatus in returned data - redirecting to error page');
        // set error page to display and any data needed for message
        req.sessionModel.set('errorDetails', {
          'errorToDisplay': 'cantfind'
        });
        res.redirect('error');
        return next();
      }

      // special cases exception codes,
      const workStatus = statusData.workStatus;
      const specialCases = ['EXCEPTION_LONGRES',
        'EXCEPTION_RDL',
        'EXCEPTION_OTR',
        'EXCEPTION_TOC',
        'EXCEPTION_NOGRANT_FOUND',
        'EXCEPTION_NOWORKSTATUS_FOUND',
        'EXCEPTION_BRC'];
      if (specialCases.includes(workStatus)) {
        logger.error('workStatus of form ' + workStatus + ' in returned data - redirecting to error page');
        req.sessionModel.set('errorDetails', {
          'errorToDisplay': 'specialCases'
        });
        res.redirect('error');
        return next();
      }

      // if no full name, redirect to error page
      if (!statusData.fullName || statusData.fullName === '') {
        logger.error('No fullName in returned data - redirecting to error page');
        req.sessionModel.set('errorDetails', {
          'errorToDisplay': 'cantfind'
        });
        res.redirect('error');
        return next();
      }

      // if status code is one of the exception codes, also show jobseeker error page
      if (workStatus.indexOf('EXCEPTION_') === 0) {
        logger.error('workStatus of form EXCEPTION_* in returned data - redirecting to error page');
        req.sessionModel.set('errorDetails', {
          'errorToDisplay': 'cantfind'
        });
        res.redirect('error');
        return next();
      }

      // if no photo in returned data, also show jobseeker error page=======
      // if (!statusData.photo || statusData.photo === '') {
      //   logger.error('No photo in returned data - redirecting to error page');
      //   req.sessionModel.set('errorToDisplay', 'cantfind');
      //   res.redirect('error');
      //   return next();
      // }

      // eslint-disable-next-line no-console
      // console.log('Status data returned back is...');
      // eslint-disable-next-line no-console
      // console.log(statusData);
      // eslint-disable-next-line no-console
      // console.log('End of status data.');

      // set a variable to be picked up by mustache to display the correct template partial
      statusData[statusData.workStatus] = true;

      // determine if leave is curtailed and expired
      if (statusData.isCurtailed) {
        if (moment(statusData.validUntil).diff(moment()) < 0) {
          statusData.LEAVE_EXPIRED = true;
          statusData.hideShareButton = true;
          delete statusData[statusData.workStatus];
        }
      }

      // decide whether to show 'share information' button
      if (statusData.workStatus === 'NO_WORK') {
          statusData.hideShareButton = true;
      }

      req.sessionModel.set('statusData', statusData);
      super.getValues(req, res, next);
    });
  }
};

