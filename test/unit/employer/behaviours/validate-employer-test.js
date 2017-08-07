const ValidateController = require('../../../../apps/employer/behaviours/validate-employer');
const ValidateModel = require('../../../../apps/employer/models/validate');
const controllers = require('hof-form-wizard').Controller;
const BaseController = controllers.BaseController;

describe('apps/employer/behaviours/validate-employer', function() {

  describe('.saveValues', function() {

    let controller;
    let req;
    let res;
    let callback;

    beforeEach(function() {
      req = {
        body: {
          'applicant-brp': '123412341',
          'access-code': '1234'
        },
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
      controller = ValidateController(BaseController);
      sinon.stub(BaseController.prototype, 'saveValues');
      sinon.stub(ValidateModel.prototype, 'save');
    });

    afterEach(function() {
      BaseController.prototype.saveValues.restore();
      ValidateModel.prototype.save.restore();
    });

    it('calls the validate model', function() {
      ValidateModel.prototype.save.yields(null, {status: 'success'});
      controller.prototype.saveValues(req, res, () => {
        ValidateModel.prototype.save.should.have.been.calledOnce;
      });
    });

    it('throws an error if unable to validate employer', function() {
      ValidateModel.prototype.save.yields({
        'description': 'Failure reason',
        'errorType': 'FAILED'
      });
      controller.prototype.saveValues(req, res, callback);

      callback.should.have.been.calledOnce;
      callback.args[0][0].message.should.equal('Unable to validate employer');
    });

    it('throws an error if 400 and errorType SECURITY_CODE_NOT_MATCH set', function() {
      ValidateModel.prototype.save.yields({
        'status': 400,
        'description': 'Failure reason',
        'errorType': 'SECURITY_CODE_NOT_MATCH'
      });
      controller.prototype.saveValues(req, res, callback);
      req.sessionModel.set.should.have.been.calledWith('errorDetails', { errorToDisplay: 'brpCodeMismatch',
        'brp': '123412341',
        'securityCode': '1234'});
      res.redirect.should.have.been.calledOnce;
      res.redirect.should.have.been.calledWith('error');
      callback.should.not.have.been.called;
    });

    it('throws an error if 400 and errorType SECURITY_CODE_EXPIRED set', function() {
      ValidateModel.prototype.save.yields({
        'status': 400,
        'description': 'Failure reason',
        'errorType': 'SECURITY_CODE_EXPIRED'
      });
      controller.prototype.saveValues(req, res, callback);
      req.sessionModel.set.should.have.been.calledWith('errorDetails', { errorToDisplay: 'codeExpired'});
      res.redirect.should.have.been.calledOnce;
      res.redirect.should.have.been.calledWith('error');
      callback.should.not.have.been.called;
    });

    it('throws an error if 400 and errorType set to FAILED', function() {
      ValidateModel.prototype.save.yields({
        'status': 400,
        'description': 'Failure reason',
        'errorType': 'FAILED'
      });
      controller.prototype.saveValues(req, res, callback);

      req.sessionModel.set.should.have.been.calledWith('errorDetails', { errorToDisplay: 'cantfind' });
      res.redirect.should.have.been.calledOnce;
      res.redirect.should.have.been.calledWith('error');
      callback.should.not.have.been.called;
    });

    it('throws an error if 400 and errorType set to ACCOUNT_LOCKED_OUT', function() {
      ValidateModel.prototype.save.yields({
        'status': 400,
        'errorType': 'ACCOUNT_LOCKED_OUT'
      });
      controller.prototype.saveValues(req, res, callback);

      req.sessionModel.set.should.have.been.calledWith('errorDetails', { errorToDisplay: 'attemptsLockout' });
      res.redirect.should.have.been.calledOnce;
      res.redirect.should.have.been.calledWith('error');
      callback.should.not.have.been.called;
    });

  });
});
