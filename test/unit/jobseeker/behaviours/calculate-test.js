const CalculateController = require('../../../../apps/jobseeker/behaviours/calculate');
const GetStatusModel = require('../../../../apps/jobseeker/models/status');
const controllers = require('hof-form-wizard').Controller;
const BaseController = controllers.BaseController;

describe('apps/jobseeker/behaviours/calculate', function() {

  describe('.getValues', function() {

    let controller;
    let req;
    let res;
    let next;
    let statusData = {
      fullName: 'Alexis Korner',
      workStatus: 'WORK_RES_STU_DES',
      is3C: true,
      validUntil: '2019-12-25',
      gender: 'F',
      photo: 'data:image/jpeg;base64,qwerqwerqwer'
    };

    beforeEach(function() {
      req = {
        body: {
          dob: '1999-01-01'
        },
        sessionModel: {
          brp: '123412341',
          dob: '1999-01-01',
          set: sinon.spy(),
          get: function(arg) {
            if (arg === 'brp') {
              return '123412341';
            }
            if (arg === 'dob') {
              return '1999-01-01';
            }
          },
          unset: sinon.spy(),
          toJSON: sinon.spy()
        }
      };
      res = {
        redirect: sinon.stub()
      };
      next = sinon.stub();
      controller = CalculateController(BaseController);
      sinon.stub(BaseController.prototype, 'getValues');
      sinon.stub(GetStatusModel.prototype, 'save');
    });

    afterEach(function() {
      BaseController.prototype.getValues.restore();
      GetStatusModel.prototype.save.restore();
    });

    it('sets sessionmodel with data when a valid BRP and dob are present', function() {
      GetStatusModel.prototype.save.yields(null, statusData);
      controller.prototype.getValues(req, res, next);
      GetStatusModel.prototype.save.should.have.been.calledOnce;
      req.sessionModel.set.should.have.been.calledOnce;
      req.sessionModel.set.should.have.been.calledWith('statusData', statusData);
      BaseController.prototype.getValues.should.have.been.calledOnce;
    });

    it('redirects to jobseeker error page when an errorType is returned', function() {
      GetStatusModel.prototype.save.yields({status: 400, errorType: 'FAILED'});
      controller.prototype.getValues(req, res, () => {
        // req.sessionModel.set.should.have.been.calledWith('errorToDisplay', 'cantfind');
        req.sessionModel.set.should.have.been.calledWith('errorDetails', {
          'errorToDisplay': 'cantfind'
        });
        res.redirect.should.have.been.calledOnce;
      });
    });

    it('redirects to jobseeker error page when BRP_CARD_INACTIVE is returned', function() {
      GetStatusModel.prototype.save.yields({status: 400, errorType: 'BRP_CARD_INACTIVE'});
      controller.prototype.getValues(req, res, () => {
        req.sessionModel.set.should.have.been.calledWith('errorDetails', {
          'errorToDisplay': 'notvalid'
        });
        res.redirect.should.have.been.calledOnce;
      });
    });

    it('redirects to jobseeker error page when INCORRECT_BIOGRAPHIC is returned', function() {
      GetStatusModel.prototype.save.yields({status: 400, errorType: 'INCORRECT_BIOGRAPHIC'});
      controller.prototype.getValues(req, res, () => {
        req.sessionModel.set.should.have.been.calledWith('errorDetails', {
          'errorToDisplay': 'cantfind'
        });
        res.redirect.should.have.been.calledOnce;
      });
    });

    it('redirects to jobseeker error page when ACCOUNT_LOCKED_OUT is returned', function() {
      GetStatusModel.prototype.save.yields({status: 400, errorType: 'ACCOUNT_LOCKED_OUT'});
      controller.prototype.getValues(req, res, () => {
        req.sessionModel.set.should.have.been.calledWith('errorDetails', {
          'errorToDisplay': 'attemptsLockout'
        });
        res.redirect.should.have.been.calledOnce;
      });
    });

    it('throws an error when an unknown error is returned', function() {
      GetStatusModel.prototype.save.yields({status: 400});
      controller.prototype.getValues(req, res, next);
      next.should.have.been.calledOnce;
      res.redirect.should.not.have.been.called;
    });

    it('redirects to jobseeker error page when an exception workstatus is returned', function() {
      GetStatusModel.prototype.save.yields(null, {
        fullName: 'Alexis Korner',
        workStatus: 'EXCEPTION_CONDITIONS',
        is3C: true,
        validUntil: '2019-12-25',
        gender: 'F',
        photo: 'data:image/jpeg;base64,qwerqwerqwer'
      });
      controller.prototype.getValues(req, res, () => {
        req.sessionModel.set.should.have.been.calledWith('errorDetails', {
          'errorToDisplay': 'cantfind'
        });
        res.redirect.should.have.been.calledOnce;
      });

    });

    // it('redirects to jobseeker error page when no photo data returned', function() {
    //   GetStatusModel.prototype.save.yields(null, {
    //     fullName: 'Alexis Korner',
    //     workStatus: 'WORK_RES_STU_DES',
    //     is3C: true,
    //     validUntil: '2019-12-25',
    //     gender: 'F',
    //     photo: ''
    //   });
    //   controller.prototype.saveValues(req, res, next);
    //   req.sessionModel.set.should.have.been.calledWith('errorToDisplay', 'cantfind');
    //   res.redirect.should.have.been.calledOnce;
    // });

    it('redirects to jobseeker error page when no fullName returned', function() {
      GetStatusModel.prototype.save.yields(null, {
        fullName: '',
        workStatus: 'WORK_RES_STU_DES',
        is3C: true,
        validUntil: '2019-12-25',
        gender: 'F',
        photo: 'data:image/jpeg;base64,qwerqwerqwer'
      });
      controller.prototype.getValues(req, res, next);
      req.sessionModel.set.should.have.been.calledWith('errorDetails', {
        'errorToDisplay': 'cantfind'
      });
      res.redirect.should.have.been.calledOnce;
    });

    it('redirects to jobseeker error page when no workstatus returned', function() {
      GetStatusModel.prototype.save.yields(null, {
        fullName: 'Alexis Korner',
        is3C: true,
        validUntil: '2019-12-25',
        gender: 'F',
        photo: 'data:image/jpeg;base64,qwerqwerqwer'
      });
      controller.prototype.getValues(req, res, next);
      req.sessionModel.set.should.have.been.calledWith('errorDetails', {
        'errorToDisplay': 'cantfind'
      });
      res.redirect.should.have.been.calledOnce;
    });

    it('redirects to special cases error page when appropriate exception status returned', function() {
      GetStatusModel.prototype.save.yields(null, {
        fullName: 'Alexis Korner',
        workStatus: 'EXCEPTION_NOWORKSTATUS_FOUND',
        is3C: true,
        validUntil: '2029-12-25',
        gender: 'F',
        photo: 'data:image/jpeg;base64,qwerqwerqwer'
      });
      controller.prototype.getValues(req, res, next);
      req.sessionModel.set.should.have.been.calledWith('errorDetails', {
        'errorToDisplay': 'specialCases'
      });
      res.redirect.should.have.been.calledOnce;
    });

    it('sets hideShareButton flag', function() {
      GetStatusModel.prototype.save.yields(null, {
        fullName: 'Alexis Korner',
        workStatus: 'NO_WORK',
        is3C: true,
        validUntil: '2019-12-25',
        gender: 'F',
        photo: 'data:image/jpeg;base64,qwerqwerqwer'
      });
      controller.prototype.getValues(req, res, next);
      req.sessionModel.set.should.have.been.calledWith('statusData', {
        NO_WORK: true,
        fullName: 'Alexis Korner',
        gender: 'F',
        hideShareButton: true,
        is3C: true,
        photo: 'data:image/jpeg;base64,qwerqwerqwer',
        validUntil: '2019-12-25',
        workStatus: 'NO_WORK'
      });
    });

    it('sets correct flags when leave is curtailed and expired', function() {
      GetStatusModel.prototype.save.yields(null, {
        fullName: 'Lisa Harris',
        workStatus: 'WORK_RES_SELF_NO_DR_SPORTS',
        is3C: true,
        validUntil: '2018-01-15',
        gender: 'F',
        isCurtailed: true,
        photo: 'data:image/jpeg;base64,qwerqwerqwer'
      });
      controller.prototype.getValues(req, res, next);
      req.sessionModel.set.should.have.been.calledWith('statusData', {
        LEAVE_EXPIRED: true,
        fullName: 'Lisa Harris',
        gender: 'F',
        hideShareButton: true,
        is3C: true,
        isCurtailed: true,
        photo: 'data:image/jpeg;base64,qwerqwerqwer',
        validUntil: '2018-01-15',
        workStatus: 'WORK_RES_SELF_NO_DR_SPORTS'
      });
    });

  });
});
