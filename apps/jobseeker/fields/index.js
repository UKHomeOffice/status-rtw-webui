'use strict';
const dateComponent = require('hof-component-date');

module.exports = {
  brp: {
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
  authenticate: {
    formGroupClassName: 'hidden'
  },
  dob: dateComponent('dob', {
    legend: {
      className: ['form-label-bold']
    },
    validate: [
      'required', 'before'
    ]
  }),
  nationality: {
    'className': ['form-control typeahead'],
    validate: ['required'],
    mixin: 'select'
  },
  'employer-email': {
    validate: ['required', 'email']
  }
};
