'use strict';
const logger = require('../../../lib/logger');

module.exports = superclass => class extends superclass {

  saveValues(req, res, callback) {
    const brp = req.body.brp || req.body['applicant-brp'];
    const origin = (req.baseUrl.indexOf('jobseeker') !== -1) ? 'jobseeker' : 'employer';
    const honeypot = req.body.authenticate || '';
    if (honeypot !== '') {
      logger.info('an authentication attempt was made using BRP ' + brp + ' through the ' + origin
        + ' authentication screen that invokes the honeypot control', { sessionID: req.sessionID, isSecurity: true });
      // set error page to display
      req.sessionModel.set('errorDetails', {
        'errorToDisplay': 'authenticate'
      });
      res.redirect('error');
      return;
    }

    super.saveValues(req, res, callback);
  }
};

