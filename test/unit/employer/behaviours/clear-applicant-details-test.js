const StartController = require('../../../../apps/employer/behaviours/clear-applicant-details');
const controllers = require('hof-form-wizard').Controller;
const BaseController = controllers.BaseController;

describe('apps/employer/behaviours/clear-applicant-details', function() {

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

    it('resets the brp and access code', function() {
      controller.prototype.getValues(req, res, callback);
      req.sessionModel.unset.should.have.been.calledWith('applicant-brp');
      req.sessionModel.unset.should.have.been.calledWith('access-code');
    });

    it('removes the page from the steps list', function() {
      controller.prototype.getValues(req, res, callback);
      req.sessionModel.set.should.have.been.calledWith('steps', ['page1', 'page3']);
    });
  });
});
