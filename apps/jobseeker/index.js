'use strict';

module.exports = {
  name: 'jobseeker',
  baseUrl: '/view',
  steps: {
    '/': {
      behaviours: require('./behaviours/start'),
      next: '/start'
    },
    '/error': {
      template: 'error-jobseeker',
      behaviours: require('../common/behaviours/error'),
      next: '/start'
    },
    '/start': {
      next: '/brp-number'
    },
    '/privacy': {
      next: '/brp-number',
      backLink: '/view/start'
    },
    '/brp-number': {
      behaviours: [require('../common/behaviours/authenticate'), require('./behaviours/clear-brp')],
      fields: ['brp', 'authenticate'],
      next: '/personal-details'
    },
    '/personal-details': {
      behaviours: [require('./behaviours/clear-dob')],
      fields: ['dob'],
      next: '/profile'
    },
    '/profile': {
      behaviours: [require('../common/behaviours/finish-link'), require('./behaviours/profile'),
        require('./behaviours/calculate')],
      backLink: false,
      next: '/share-email'
    },
    '/share-email': {
      behaviours: [require('../common/behaviours/finish-link')],
      fields: ['employer-email'],
      backLink: false,
      next: '/confirm-employer-email'
    },
    '/create-security-code': {
      behaviours: [require('./behaviours/create-security-code')],
      backLink: '/share-email',
      next: '/view-security-code'
    },
    '/view-security-code': {
      behaviours: [require('./behaviours/view-security-code'), require('../common/behaviours/finish-link')],
      backLink: false
    },
    '/confirm-employer-email': {
      behaviours: [require('../common/behaviours/finish-link'), require('./behaviours/share-status')],
      backLink: false,
      next: '/email-sent'
    },
    '/email-sent': {
      backLink: false,
      behaviours: [require('../common/behaviours/finish-link'), 'complete']
    }
  }
};
