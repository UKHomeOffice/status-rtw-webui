'use strict';

module.exports = {
  name: 'jobseeker',
  baseUrl: '/',
  steps: {
    '/': {
      behaviours: require('./behaviours/start'),
      next: '/view/start'
    }
  }
};
