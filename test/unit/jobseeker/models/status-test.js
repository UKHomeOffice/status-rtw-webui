const StatusModel = require('../../../../apps/jobseeker/models/status');
const statusModel = new StatusModel();

// Mock data
statusModel.attributes = {
  brp: 'GT1234123',
  queryInfo: {
    sessionId: '1234',
    correlationId: 'asdf1234'
  }
};

describe('apps/jobseeker/models/status', () => {
  describe('.prepare', () => {
    it('should take correlationId and sessionId out of queryInfo', () => {
      statusModel.prepare();
     // console.log(data);
      JSON.stringify(statusModel.attributes).should.equal(JSON.stringify({ brp: 'GT1234123' }));
    });
  });

  describe('.url', () => {
    it('should take correlationId and sessionId out of queryInfo', () => {
      JSON.stringify(statusModel.url()).should.equal(JSON.stringify({
        'uri': 'http://localhost:8001/status/GT1234123/jobseeker/calculate',
        'headers': {
          'sessionid': '1234',
          'correlationid': 'asdf1234'
        }
      }));
      // console.log(data);
    });
  });
});
