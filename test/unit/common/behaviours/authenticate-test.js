const AuthenticateController = require('../../../../apps/common/behaviours/authenticate');
const controllers = require('hof-form-wizard').Controller;
const BaseController = controllers.BaseController;

describe('apps/common/behaviours/authenticate', function() {

  describe('.saveValues', function() {

    let controller;
    let req;
    let res;
    let callback;

    beforeEach(function() {
      req = {
        body: {
          authenticate: ''
        },
        sessionModel: {
          set: sinon.spy(),
          get: sinon.stub(),
          unset: sinon.spy(),
          toJSON: sinon.spy()
        }
      };
      res = {
        redirect: sinon.spy()
      };
      callback = sinon.stub();
      controller = AuthenticateController(BaseController);
      sinon.stub(BaseController.prototype, 'saveValues');
      req.sessionModel.get.withArgs('currentcase').returns('1234');
    });

    afterEach(function() {
      BaseController.prototype.saveValues.restore();
    });

    it('redirects when honeypot field is filled', function() {
      req.body.authenticate = '1234';
      req.baseUrl = '/jobseeker';
      controller.prototype.saveValues(req, res, callback);
      req.sessionModel.set.should.have.been.calledWith('errorDetails', { errorToDisplay: 'authenticate' });
      res.redirect.should.have.been.calledWith('error');
      BaseController.prototype.saveValues.should.not.have.been.called;

    });

    it('redirects when honeypot field is empty', function() {
      req.body.authenticate = '';
      req.baseUrl = '/jobseeker';
      controller.prototype.saveValues(req, res, callback);
      req.sessionModel.set.should.not.have.been.called;
      res.redirect.should.not.have.been.called;
      BaseController.prototype.saveValues.should.have.been.calledOnce;
    });
  });
});
