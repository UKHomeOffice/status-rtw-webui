const StartController = require('../../../../apps/employer/behaviours/start');
const controllers = require('hof-form-wizard').Controller;
const BaseController = controllers.BaseController;

describe('apps/employer/behaviours/start', function() {

  describe('.saveValues', function() {

    let controller;
    let req;
    let res;
    let callback;

    beforeEach(function() {
      req = {
        sessionModel: {
          reset: sinon.stub()
    }
    }
      ;
      res = {};
      callback = sinon.stub();
      controller = StartController(BaseController);
      sinon.stub(BaseController.prototype, 'successHandler');
    });

    it('resets the session', function() {
      controller.prototype.getValues(req, res, callback);
      req.sessionModel.reset.should.have.been.called;
      BaseController.prototype.successHandler.should.have.been.calledOnce;
    });
  });
});
