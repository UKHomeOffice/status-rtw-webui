const ThisModel = require('../../../../apps/employer/models/validate');
const thisModel = new ThisModel();

// Mock data
thisModel.attributes = {
  brp: 'GT1234123',
  queryInfo: {
    sessionId: '1234',
    correlationId: 'asdf1234'
  }
};


describe('apps/employer/models/validate', () => {
  describe('.prepare', () => {
    it('should take correlationId and sessionId out of queryInfo', () => {
      thisModel.prepare();
      JSON.stringify(thisModel.attributes).should.equal(JSON.stringify({ brp: 'GT1234123' }));
    });
  });

  describe('.url', () => {
    it('should take correlationId and sessionId out of queryInfo', () => {
      JSON.stringify(thisModel.url()).should.equal(JSON.stringify({
        'uri': 'http://localhost:8001/status/GT1234123/validateEmployer',
        'headers': {
          'sessionid': '1234',
          'correlationid': 'asdf1234'
        }
      }));
      // console.log(data);
    });
  });
});
