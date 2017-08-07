const ShareStatusController = require('../../../../apps/jobseeker/behaviours/share-status');
const ShareStatusModel = require('../../../../apps/jobseeker/models/share-status');
const controllers = require('hof-form-wizard').Controller;
const BaseController = controllers.BaseController;

describe('apps/jobseeker/behaviours/share-status', function() {

  describe('.saveValues', function() {

    let controller;
    let req;
    let res;
    let callback;

    beforeEach(function() {
      req = {
        sessionModel: {
          set: sinon.spy(),
          get: sinon.stub(),
          unset: sinon.spy(),
          toJSON: sinon.spy()
        }
      };
      res = {
        redirect: sinon.stub()
      };
      callback = sinon.stub();
      controller = ShareStatusController(BaseController);
      sinon.stub(BaseController.prototype, 'saveValues');
      sinon.stub(ShareStatusModel.prototype, 'save');
      req.sessionModel.get.withArgs('currentcase').returns('1234');
    });

    afterEach(function() {
      BaseController.prototype.saveValues.restore();
      ShareStatusModel.prototype.save.restore();
    });

    it('calls the Share Status model', function() {
      ShareStatusModel.prototype.save.yields(null, {status: 'success'});
      controller.prototype.saveValues(req, res, () => {
        ShareStatusModel.prototype.save.should.have.been.calledOnce;
      });
    });

    it('throws an error if unable to share status', function() {
      ShareStatusModel.prototype.save.yields({
        'description': 'Failure reason',
        'errorType': 'FAILED'
      });
      controller.prototype.saveValues(req, res, callback);

      callback.should.have.been.calledOnce;
      console.log(callback.args[0]);
      callback.args[0][0].message.should.equal('Unable to share status');
    });

    it('throws an error if problem with security code', function() {
      ShareStatusModel.prototype.save.yields({status: 400, errorType: 'SECURITY_CODE_FAILED_GENERATION'});
      controller.prototype.saveValues(req, res, callback);

      req.sessionModel.set.should.have.been.calledWith('errorDetails', {
        'errorToDisplay': 'sharefailed'
      });
      res.redirect.should.have.been.calledOnce;
    });
  });
});
