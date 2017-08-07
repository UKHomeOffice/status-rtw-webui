'use strict';
const moment = require('moment');

function getFormattedValues(req) {
  return {
    'validUntilDisplay': moment(req.sessionModel.attributes.employeeStatusData.validUntil).format('DD MMMM YYYY')
  };
}

module.exports = (superclass) => class extends superclass {
  locals(req) {
    let statusData = { statusData: req.sessionModel.get('employeeStatusData') };
    let formattedValues = getFormattedValues(req);

    return Object.assign({}, super.locals(...arguments), formattedValues, statusData);
  }
};
