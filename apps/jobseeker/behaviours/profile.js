'use strict';
const moment = require('moment');

function getFormattedValues(req) {
  return {
    'validUntilDisplay': moment(req.sessionModel.attributes.statusData.validUntil).format('DD MMMM YYYY')
  };
}

module.exports = (superclass) => class extends superclass {
  locals(req) {
    let statusData = { statusData: req.sessionModel.get('statusData') };
    let formattedValues = getFormattedValues(req);

    req.sessionModel.unset('statusData');
    return Object.assign({}, super.locals(...arguments), formattedValues, statusData);
  }
};
