'use strict';
const logger = require('../../../lib/logger');
const {getMdcForHeader} = require('../../../lib/logger-mdc');
const GetStatusModel = require('../models/get-status');

module.exports = superclass => class extends superclass {

  getValues(req, res, next) {
    const brp = req.sessionModel.get('applicant-brp') || '';
    const securityCode = req.sessionModel.get('access-code') || '';
    const employeeName = req.sessionModel.get('employee-name') || '';
    const companyName = req.sessionModel.get('company-name') || '';

    // get correlation and session ID
    const queryInfo = getMdcForHeader() || {};

    logger.info('Getting status for BRP: ' + brp,
      { documentId: brp, sessionId: queryInfo.sessionId, correlationId: queryInfo.correlationId });

    new GetStatusModel(
      { brp: brp,
        securityCode: securityCode,
        employeeName: employeeName,
        companyName: companyName,
        queryInfo: queryInfo
      }).save((statusErr, employeeStatusData) => {
        if (statusErr) {
          logger.error('Unable to retrieve status', statusErr);
          const err = new Error('Unable to retrieve status');
          err.template = 'cookie-error';
          return next(err);
      }

      // if no photo in returned data, show employer error page
      // if (!employeeStatusData.photo || employeeStatusData.photo === '') {
      //   req.sessionModel.set('errorToDisplay', 'cantfind');
      //   res.redirect('error');
      //   return next();
      // }

      // if status change message received, redirect to error page
      if (employeeStatusData.infoType === 'RTW_STATUS_CHANGED') {
        logger.error('Status has changed between share and check - redirecting to error page');
        req.sessionModel.set('errorDetails', {
          'errorToDisplay': 'statusChange'
        });
        res.redirect('error');
        return next();
      }


      // if no workStatus code, redirect to error page
      if (!employeeStatusData.workStatus || employeeStatusData.workStatus === '') {
        logger.error('No workStatus in returned data - redirecting to error page');
        req.sessionModel.set('errorDetails', {
          'errorToDisplay': 'cantfind'
        });
        res.redirect('error');
        return next();
      }

      // if no full name, redirect to error page
      if (!employeeStatusData.fullName || employeeStatusData.fullName === '') {
        logger.error('No fullName in returned data - redirecting to error page');
        req.sessionModel.set('errorDetails', {
          'errorToDisplay': 'cantfind'
        });
        res.redirect('error');
        return next();
      }

      // set possessive fullname
      if (employeeStatusData.fullName.slice(-1) === 's') {
        employeeStatusData.possessiveFullname = employeeStatusData.fullName + '\'';
      } else {
        employeeStatusData.possessiveFullname = employeeStatusData.fullName + '\'s';
      }

      // set a variable to be picked up by mustache to display the correct template partial
      employeeStatusData[employeeStatusData.workStatus] = true;
      if (employeeStatusData.gender.toLowerCase() === '') {
        employeeStatusData.pronoun = 'they';
        employeeStatusData.pronounUpper = 'They';
        employeeStatusData.possessivePronoun = 'their';
        employeeStatusData.personalPronoun = 'them';
      } else if (employeeStatusData.gender.toLowerCase() === 'm') {
        employeeStatusData.pronoun = 'he';
        employeeStatusData.pronounUpper = 'He';
        employeeStatusData.possessivePronoun = 'his';
        employeeStatusData.personalPronoun = 'him';
      } else {
        employeeStatusData.pronoun = 'she';
        employeeStatusData.pronounUpper = 'She';
        employeeStatusData.possessivePronoun = 'her';
        employeeStatusData.personalPronoun = 'her';
      }

      req.sessionModel.set('employeeStatusData', employeeStatusData);
      super.getValues(req, res, next);
    });
  }
};
