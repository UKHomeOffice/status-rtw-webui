'use strict';

module.exports = {
  name: 'employer',
  baseUrl: '/check',
  steps: {
    '/': {
      behaviours: require('./behaviours/start'),
      next: '/start'
    },
    '/privacy': {
      next: '/start',
      backLink: '/check/start'
    },
    '/error': {
      template: 'error-employer',
      behaviours: require('../common/behaviours/error'),
      next: '/start'
    },
    '/start': {
      next: '/applicant-details'
    },
    '/applicant-details': {
      fields: ['applicant-brp', 'access-code', 'authenticate'],
      behaviours: [require('./behaviours/validate-employer'), require('../common/behaviours/authenticate'),
        require('./behaviours/clear-applicant-details')],
      next: '/company-details'
    },
    '/company-details': {
      fields: ['employee-name', 'company-name'],
      behaviours: [require('./behaviours/clear-company-details')],
      next: '/profile'
    },
    '/profile': {
      behaviours: [require('../common/behaviours/finish-link'), require('./behaviours/profile'),
        require('./behaviours/get-status')],
      backLink: false
    }
  }
};
