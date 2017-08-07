'use strict';

module.exports = {
  'employer-email': {
    validate: ['required', 'email']
  },
  'applicant-brp': {
    validate: [
      'required',
      function maxlength(value) {
        return value && value.length < 10;
      },
      function minlength(value) {
        return value && value.length > 8;
      }
    ]
  },
  'access-code': {
    validate: [
      'required',
      function maxlength(value) {
        return value && value.length < 5;
      },
      function minlength(value) {
        return value && value.length > 3;
      }
    ]
  },
  'employee-name': {
    validate: [
      'required'
    ]
  },
  'company-name': {
    validate: [
      'required'
    ]
  }
};
