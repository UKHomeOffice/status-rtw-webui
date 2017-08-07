const GetStatus = require('../../../../apps/employer/behaviours/get-status');
const GetStatusModel = require('../../../../apps/employer/models/get-status');
const controllers = require('hof-form-wizard').Controller;
const BaseController = controllers.BaseController;

describe('apps/employer/behaviours/get-status', function() {

  describe('.saveValues', function() {

    let controller;
    let req;
    let res;
    let callback;

    beforeEach(function() {
      req = {
        body: {
          'employee-name': 'Tim',
          'company-name': 'Acme'
        },
        sessionModel: {
          'applicant-brp': '123412341',
          'access-code': '1234',
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
      controller = GetStatus(BaseController);

      sinon.stub(BaseController.prototype, 'saveValues');
      sinon.stub(GetStatusModel.prototype, 'save');
    });

    afterEach(function() {
      BaseController.prototype.saveValues.restore();
      GetStatusModel.prototype.save.restore();
    });

    it('calls the get status model', function() {
      GetStatusModel.prototype.save.yields(null, {status: 'success', gender: 'm'});
      controller.prototype.saveValues(req, res, () => {
        GetStatusModel.prototype.save.should.have.been.calledOnce;
      });
    });

    it('throws an error if unable to get status', function() {

      // .yields({sessionId: '123abc', correlationId: '1234-qwer-2345'});
      GetStatusModel.prototype.save.yields({
        'description': 'Failure reason',
        'errorType': 'FAILED'
      });

      controller.prototype.getValues(req, res, callback);

      callback.args[0][0].message.should.equal('Unable to retrieve status');
      callback.should.have.been.calledOnce;
    });

    it('throws an error if No workStatus', function() {
      GetStatusModel.prototype.save.yields(null, {
        fullName: 'Alexis Korner',
        is3C: true,
        validUntil: '2019-12-25',
        gender: 'F',
        photo: 'data:image/jpeg;base64,qwerqwerqwer'
      });
      controller.prototype.getValues(req, res, callback);

      req.sessionModel.set.should.have.been.calledWith('errorDetails', {
        'errorToDisplay': 'cantfind'
      });
      res.redirect.should.have.been.calledOnce;
    });

    it('throws an error if No fullname', function() {
      GetStatusModel.prototype.save.yields(null, {
        fullName: '',
        workStatus: 'WORK_RES_STU_DES',
        is3C: true,
        validUntil: '2019-12-25',
        gender: 'F',
        photo: 'data:image/jpeg;base64,qwerqwerqwer'
      });
      controller.prototype.getValues(req, res, callback);

      req.sessionModel.set.should.have.been.calledWith('errorDetails', {
        'errorToDisplay': 'cantfind'
      });
      res.redirect.should.have.been.calledOnce;
    });

    it('throws an error if status has changeed', function() {
      GetStatusModel.prototype.save.yields(null, {
        infoType: 'RTW_STATUS_CHANGED'
      });
      controller.prototype.getValues(req, res, callback);

      req.sessionModel.set.should.have.been.calledWith('errorDetails', {
        'errorToDisplay': 'statusChange'
      });
      res.redirect.should.have.been.calledOnce;
    });

    // it('shows error if no photo data in status', function() {
    //   GetStatusModel.prototype.save.yields(null, {
    //     'photo': ''
    //   });
    //   controller.prototype.saveValues(req, res, callback);
    //
    //   req.sessionModel.set.should.have.been.calledWith('errorToDisplay', 'cantfind');
    //   res.redirect.should.have.been.calledOnce;
    //   res.redirect.should.have.been.calledWith('error');
    // });

    it('sets variable to display correct status and sets pronouns', function() {
      const initialData = {
        workStatus: 'test',
        gender: 'M',
        fullName: 'Cecil Smythe',
        'photo': 'photodata'
      };
      const transformedData = {
        gender: 'M',
        personalPronoun: 'him',
        fullName: 'Cecil Smythe',
        possessiveFullname: 'Cecil Smythe\'s',
        photo: 'photodata',
        possessivePronoun: 'his',
        pronoun: 'he',
        pronounUpper: 'He',
        test: true,
        workStatus: 'test'
      };
      GetStatusModel.prototype.save.yields(null, initialData);
      controller.prototype.getValues(req, res, callback);
      req.sessionModel.set.should.have.been.calledWith('employeeStatusData', transformedData);
    });

    it('sets correct pronouns when no gender is given', function() {
      const initialData = {
        workStatus: 'test',
        gender: '',
        fullName: 'Cecil Smythe',
        'photo': 'photodata'
      };
      const transformedData = {
        gender: '',
        personalPronoun: 'them',
        photo: 'photodata',
        fullName: 'Cecil Smythe',
        possessiveFullname: 'Cecil Smythe\'s',
        possessivePronoun: 'their',
        pronoun: 'they',
        pronounUpper: 'They',
        test: true,
        workStatus: 'test'
      };
      GetStatusModel.prototype.save.yields(null, initialData);
      controller.prototype.getValues(req, res, callback);
      req.sessionModel.set.should.have.been.calledWith('employeeStatusData', transformedData);
    });

    it('sets correct female pronouns', function() {
      const initialData = {
        workStatus: 'test',
        gender: 'F',
        fullName: 'Cecil Harris',
        'photo': 'photodata'
      };
      const transformedData = {
        fullName: 'Cecil Harris',
        possessiveFullname: 'Cecil Harris\'',
        gender: 'F',
        personalPronoun: 'her',
        photo: 'photodata',
        possessivePronoun: 'her',
        pronoun: 'she',
        pronounUpper: 'She',
        test: true,
        workStatus: 'test'
      };
      GetStatusModel.prototype.save.yields(null, initialData);
      controller.prototype.getValues(req, res, callback);
      req.sessionModel.set.should.have.been.calledWith('employeeStatusData', transformedData);
    });
  });
});
