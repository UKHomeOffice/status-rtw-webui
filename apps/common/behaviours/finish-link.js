'use strict';

module.exports = superclass => class extends superclass {
  locals(req, res) {
    const locals = super.locals(req, res);

    return Object.assign({}, locals, { showFinishLink: true });
  }
};

