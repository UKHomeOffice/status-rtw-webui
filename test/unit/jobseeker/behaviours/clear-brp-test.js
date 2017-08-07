const StartController = require('../../../../apps/jobseeker/behaviours/clear-brp');
const controllers = require('hof-form-wizard').Controller;
const BaseController = controllers.BaseController;

describe('apps/jobseeker/behaviours/clear-brp', function() {

  describe('.getValues', function() {

    let controller;
    let req;
    let res;
    let callback;

    beforeEach(function() {
      req = {
        url: 'page2',
        sessionModel: {
          unset: sinon.stub(),
          set: sinon.stub(),
          get: function() {
            return ['page1', 'page2', 'page3'];
          }
        }
      };
      res = {};
      callback = sinon.stub();
      controller = StartController(BaseController);
    });

    it('resets the brp number', function() {
      controller.prototype.getValues(req, res, callback);
      req.sessionModel.unset.should.have.been.calledWith('brp');
    });

    it('removes the page from the steps list', function() {
      controller.prototype.getValues(req, res, callback);
      req.sessionModel.set.should.have.been.calledWith('steps', ['page1', 'page3']);
    });
  });
});
