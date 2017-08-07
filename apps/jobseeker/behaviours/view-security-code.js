'use strict';

module.exports = superclass => class extends superclass {

  locals(req) {

    let shareData = req.sessionModel.get('shareData');
    req.sessionModel.unset('shareData');

    return Object.assign({}, super.locals(...arguments), shareData);
  }

};
