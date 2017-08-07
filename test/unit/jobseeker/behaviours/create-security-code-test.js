const CreateSecurityCodeController = require('../../../../apps/jobseeker/behaviours/create-security-code');
const CreateSecurityCodeModel = require('../../../../apps/jobseeker/models/create-security-code');
const controllers = require('hof-form-wizard').Controller;
const BaseController = controllers.BaseController;

describe('apps/jobseeker/behaviours/create-security-code', function() {

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
      controller = CreateSecurityCodeController(BaseController);
      sinon.stub(BaseController.prototype, 'saveValues');
      sinon.stub(CreateSecurityCodeModel.prototype, 'save');
      req.sessionModel.get.withArgs('currentcase').returns('1234');
    });

    afterEach(function() {
      BaseController.prototype.saveValues.restore();
      CreateSecurityCodeModel.prototype.save.restore();
    });

    it('calls the create security model', function() {
      CreateSecurityCodeModel.prototype.save.yields(null, {status: 'success'});
      controller.prototype.saveValues(req, res, () => {
        CreateSecurityCodeModel.prototype.save.should.have.been.calledOnce;
      });
    });

    it('throws an error if unable to create security code', function() {
      CreateSecurityCodeModel.prototype.save.yields({
        'description': 'Failure reason',
        'errorType': 'FAILED'
      });
      controller.prototype.saveValues(req, res, callback);

      callback.should.have.been.calledOnce;
      console.log(callback.args[0]);
      callback.args[0][0].message.should.equal('Unable to create security code.');
    });

    it('throws an error if problem with security code', function() {
      CreateSecurityCodeModel.prototype.save.yields({status: 400, errorType: 'SECURITY_CODE_FAILED_GENERATION'});
      controller.prototype.saveValues(req, res, callback);

      req.sessionModel.set.should.have.been.calledWith('errorDetails', {
        'errorToDisplay': 'sharefailed'
      });
      res.redirect.should.have.been.calledOnce;
    });
  });
});
