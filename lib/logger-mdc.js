const uuid = require('uuid');
const cls = require('continuation-local-storage');

cls.createNamespace('uk.gov.digital.ho.status.rtw');

function mdcSetup(req, res, next) {
  const MDC = {
    sessionId: req.sessionID,
    correlationId: uuid.v4()
  };
  const mdcNamespace = cls.getNamespace('uk.gov.digital.ho.status.rtw');
  mdcNamespace.bindEmitter(req);
  mdcNamespace.bindEmitter(res);
  mdcNamespace.run(() => {
    mdcNamespace.set('MDC', MDC);
    next();
  });
}

function getMdcForHeader() {
  const mdcNamespace = cls.getNamespace('uk.gov.digital.ho.status.rtw');
  if (!mdcNamespace) {
    return {};
  }
  return mdcNamespace.get('MDC');
}

module.exports = {mdcSetup, getMdcForHeader};
