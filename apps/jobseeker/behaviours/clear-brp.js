'use strict';

module.exports = (superclass) => class extends superclass {

  getValues(req, res, next) {
    req.sessionModel.unset('brp');

    // take current page out of steps
    let steps = req.sessionModel.get('steps');
    if (steps) {
      let index = steps.indexOf(req.url);
      if (index !== -1) {
        steps.splice(index, 1);
      }
      req.sessionModel.set('steps', steps);
    }

    super.getValues(req, res, next);
  }
};
